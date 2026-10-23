import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { ComplianceResult, ComplianceResultSchema } from "../src/lib/schema";

interface ComplianceRule {
  id: string;
  category: string;
  regulation: string;
  section: string;
  requirement: string;
  applicableTo: string[];
  evidenceRequired: string;
  checkLogic: string;
}

interface ServerProfile {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  capabilities: { name: string }[];
  deployment: { sovereignCloud: boolean; onPrem: boolean }[];
}

export async function verifyCompliance(server: ServerProfile): Promise<ComplianceResult> {
  const rulesPath = path.join(__dirname, "../content/compliance/compliance-rules.json");
  const rules: ComplianceRule[] = JSON.parse(fs.readFileSync(rulesPath, "utf-8"));

  const result: Partial<ComplianceResult> = {
    lastComplianceCheck: new Date().toISOString(),
  };

  // Helper to evaluate a rule against server data
  const evaluateRule = (rule: ComplianceRule): { status: string; notes: string } => {
    const summaryLower = server.summary.toLowerCase();
    const capsLower = server.capabilities.map(c => c.name.toLowerCase()).join(" ");
    const isFinancial = capsLower.includes("payment") || capsLower.includes("bank") || capsLower.includes("transaction");
    const isSovereign = server.deployment.some(d => d.sovereignCloud || d.onPrem);

    // Deterministic logic mapping (simplified for skeleton; extend with NLP/AST parsing in production)
    if (rule.id === "rbi-2018-localization" && isFinancial) {
      // Strict RBI rule: if financial, must be india-only. We default to 'unknown' if not explicitly proven.
      return {
        status: "unknown",
        notes: `Server handles financial data. RBI 2018 mandates India-only storage. Evidence of data residency required. See rule: ${rule.id}`
      };
    }

    if (rule.id === "dpdp-sec-5") {
      if (capsLower.includes("email") || capsLower.includes("phone") || capsLower.includes("pii")) {
        return {
          status: "conditional",
          notes: `PII detected in capabilities. DPDP Sec 5 requires explicit consent mechanism. Verify tool schema includes consent parameter. See rule: ${rule.id}`
        };
      }
      return { status: "compliant", notes: "No PII processing detected in capabilities. DPDP Sec 5 N/A." };
    }

    if (rule.id === "meity-sovereign-cloud" || rule.id === "sebi-2023-cloud") {
      return {
        status: isSovereign ? "compliant" : "unknown",
        notes: isSovereign
          ? `Deployment supports sovereign/on-prem. Verify MeitY empanelment for ${server.name}. See rule: ${rule.id}`
          : `No sovereign/on-prem deployment declared. Not suitable for MeitY/SEBI regulated workloads. See rule: ${rule.id}`
      };
    }

    if (rule.id === "air-gap-defense") {
      return {
        status: "unknown",
        notes: `Air-gap readiness requires manual code review for egress blocking. Check deployment docs for network policies. See rule: ${rule.id}`
      };
    }

    return { status: "unknown", notes: `Manual review required for ${rule.category}. See rule: ${rule.id}` };
  };

  // Aggregate results (simplified mapping to ComplianceResult fields)
  const dpdpEval = evaluateRule(rules.find(r => r.id === "dpdp-sec-5")!);
  const rbiEval = evaluateRule(rules.find(r => r.id === "rbi-2018-localization")!);
  const itActEval = evaluateRule(rules.find(r => r.id === "it-act-2000-intermediary")!);

  // Determine data localization based on vendor/deployment hints
  const dataLocalization = server.deployment.some(d => d.onPrem) ? "india-only" : "unknown";

  const finalResult: ComplianceResult = {
    dpdp: dpdpEval.status as any,
    dpdpNotes: dpdpEval.notes,
    rbi: rbiEval.status as any,
    rbiNotes: rbiEval.notes,
    itAct: itActEval.status as any,
    itActNotes: itActEval.notes,
    dataLocalization,
    localizationNotes: dataLocalization === "india-only" ? "On-prem deployment declared. Data remains in India." : "Cross-border status unknown. Requires vendor confirmation.",
    airGapReady: "unknown",
    airGapNotes: "Requires network egress audit. See evidence trail for deployment architecture.",
    lastComplianceCheck: new Date().toISOString(),
  };

  // Validate against strict Zod schema before returning
  return ComplianceResultSchema.parse(finalResult);
}

// CLI Execution
if (require.main === module) {
  const mockServer: ServerProfile = {
    slug: "test-financial-mcp",
    name: "Test Financial MCP",
    kind: "mcp-server",
    summary: "Provides read access to bank transaction logs.",
    capabilities: [{ name: "get_transactions" }],
    deployment: [{ sovereignCloud: false, onPrem: false }]
  };

  verifyCompliance(mockServer).then(console.log).catch(err => {
    console.error("Compliance validation failed:", err.errors);
    process.exit(1);
  });
}