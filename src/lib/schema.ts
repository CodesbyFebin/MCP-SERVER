import { z } from "zod";

// --- Custom Validators ---

const HEDGE_WORDS = [
  "reportedly", "approximately", "believed to", "maybe", "likely",
  "probably", "seems to", "might", "could be", "generally"
];

const FORBIDDEN_PHRASES = [
  "welcome to", "in this article", "our favorite", "we recommend",
  "best in class", "cutting-edge"
];

const validateCapsule = (text: string) => {
  const words = text.trim().split(/\s+/);
  if (words.length > 40) {
    return false;
  }
  const lowerText = text.toLowerCase();
  if (FORBIDDEN_PHRASES.some(phrase => lowerText.includes(phrase))) {
    return false;
  }
  return true;
};

const validateNoHedging = (text: string) => {
  const lowerText = text.toLowerCase();
  return !HEDGE_WORDS.some(word => lowerText.includes(word));
};

// --- Evidence Schema ---

export const EvidenceSchema = z.object({
  id: z.string().regex(/^ev_[a-z0-9-]+$/, "Evidence ID must be ev_<slug>"),
  claim: z.string().min(10).refine(validateNoHedging, "Claims cannot contain hedged language"),
  sourceUrl: z.string().url(),
  sourceType: z.enum(["paper", "repo", "docs", "video", "changelog", "leaderboard", "regulation"]),
  locator: z.string().optional(), // e.g., "Section 5.2", "commit: abc123"
  snapshotSha256: z.string().regex(/^[a-f0-9]{64}$/, "Invalid SHA-256 hash"),
  retrievedAt: z.string().datetime("Must be valid ISO 8601"),
  methodology: z.string().optional(),
});

export type Evidence = z.infer<typeof EvidenceSchema>;

// --- Compliance Schema ---

export const ComplianceResultSchema = z.object({
  dpdp: z.enum(["compliant", "non-compliant", "conditional", "unknown"]),
  dpdpNotes: z.string().refine(validateNoHedging, "Notes cannot contain hedged language"),
  rbi: z.enum(["compliant", "non-compliant", "conditional", "unknown"]),
  rbiNotes: z.string().refine(validateNoHedging, "Notes cannot contain hedged language"),
  itAct: z.enum(["compliant", "non-compliant", "unknown"]),
  itActNotes: z.string().refine(validateNoHedging, "Notes cannot contain hedged language"),
  dataLocalization: z.enum(["india-only", "cross-border", "mixed", "unknown"]),
  localizationNotes: z.string().refine(validateNoHedging, "Notes cannot contain hedged language"),
  airGapReady: z.union([z.boolean(), z.literal("unknown")]),
  airGapNotes: z.string().refine(validateNoHedging, "Notes cannot contain hedged language"),
  lastComplianceCheck: z.string().datetime("Must be valid ISO 8601 from pipeline"),
});

export type ComplianceResult = z.infer<typeof ComplianceResultSchema>;

// --- Agent / MCP Server Schema ---

export const AgentSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  vendor: z.string().min(2),
  kind: z.enum(["mcp-server", "framework", "gateway"]),
  capsule: z.string()
    .refine(validateCapsule, "Capsule must be <= 40 words and contain no forbidden phrases"),
  summary: z.string().min(50),
  capabilities: z.array(z.object({
    name: z.string(),
    value: z.union([z.string(), z.number(), z.literal("unknown")]),
    evidenceId: z.string().startsWith("ev_"),
  })),
  securityAudit: z.object({
    criticals: z.number().min(0),
    warnings: z.number().min(0),
    findings: z.array(z.object({
      severity: z.enum(["critical", "high", "medium", "low"]),
      text: z.string(),
      evidenceId: z.string().startsWith("ev_"),
    })),
    lastAudit: z.string().datetime(),
    auditor: z.string(),
  }),
  benchmarks: z.array(z.object({
    benchmark: z.string(),
    score: z.union([z.string(), z.number(), z.literal("unknown")]),
    date: z.string().datetime(),
    methodologyUrl: z.string().url(),
    evidenceId: z.string().startsWith("ev_"),
  })),
  pricing: z.array(z.object({
    tier: z.string(),
    cost: z.string(),
    limits: z.string(),
    evidenceId: z.string().startsWith("ev_"),
  })),
  compliance: ComplianceResultSchema,
  deployment: z.array(z.object({
    docker: z.boolean(),
    k8s: z.boolean(),
    onPrem: z.boolean(),
    sovereignCloud: z.boolean(),
    evidenceId: z.string().startsWith("ev_"),
  })),
  relations: z.object({
    uses: z.array(z.string()).optional(),
    compatibleWith: z.array(z.string()).optional(),
    isSimilarTo: z.array(z.string()).optional(),
  }),
  mcpSupport: z.boolean(),
  localSupport: z.boolean(),
  license: z.string().optional(),
  lastVerified: z.string().datetime("Must be pipeline-generated ISO 8601"),
  verifiedBy: z.string(),
  status: z.enum(["active", "renamed", "merged", "retired"]),
  redirect: z.string().optional(),
});

export type Agent = z.infer<typeof AgentSchema>;

// --- Helper: Validate entire catalog ---
export const CatalogSchema = z.record(AgentSchema);
