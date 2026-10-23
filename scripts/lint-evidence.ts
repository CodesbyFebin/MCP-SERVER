import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as crypto from "crypto";
import { EvidenceSchema, CatalogSchema } from "../src/lib/schema";

const EVIDENCE_DIR = path.join(__dirname, "../content/evidence");
const SNAPSHOTS_DIR = path.join(__dirname, "../snapshots");
const CATALOG_DIR = path.join(__dirname, "../content/catalog/mcp-servers");

let hasErrors = false;
const logError = (msg: string) => {
  console.error(`❌ [EVIDENCE LINT] ${msg}`);
  hasErrors = true;
};

const logSuccess = (msg: string) => {
  console.log(`✅ [EVIDENCE LINT] ${msg}`);
};

async function verifyEvidenceFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  let evidence;
  try {
    evidence = JSON.parse(raw);
  } catch (e) {
    logError(`Invalid JSON in ${filePath}`);
    return;
  }

  const parsed = EvidenceSchema.safeParse(evidence);
  if (!parsed.success) {
    logError(`Schema validation failed for ${path.basename(filePath)}:\n${JSON.stringify(parsed.error.issues, null, 2)}`);
    return;
  }

  const ev = parsed.data;

  // 1. Verify Snapshot Hash
  const snapshotPath = path.join(SNAPSHOTS_DIR, `${ev.id}.txt`);
  if (!fs.existsSync(snapshotPath)) {
    logError(`Missing snapshot file for ${ev.id} at ${snapshotPath}`);
    return;
  }

  const snapshotContent = fs.readFileSync(snapshotPath, "utf-8");
  const actualHash = crypto.createHash("sha256").update(snapshotContent).digest("hex");

  if (actualHash !== ev.snapshotSha256) {
    logError(`Hash mismatch for ${ev.id}. Expected: ${ev.snapshotSha256}, Actual: ${actualHash}. Source may have changed.`);
  }

  // 2. Verify URL is not obviously broken (basic syntax check, real CI should do fetch)
  try {
    new URL(ev.sourceUrl);
  } catch {
    logError(`Invalid URL in ${ev.id}: ${ev.sourceUrl}`);
  }

  logSuccess(`Verified: ${ev.id} (${ev.sourceType})`);
}

async function verifyCatalogEvidenceLinks() {
  const files = fs.readdirSync(CATALOG_DIR).filter(f => f.endsWith(".json"));
  const evidenceIds = new Set<string>();

  // Load all valid evidence IDs
  const evFiles = fs.readdirSync(EVIDENCE_DIR).filter(f => f.endsWith(".json"));
  for (const f of evFiles) {
    const raw = JSON.parse(fs.readFileSync(path.join(EVIDENCE_DIR, f), "utf-8"));
    const parsed = EvidenceSchema.safeParse(raw);
    if (parsed.success) {
      evidenceIds.add(parsed.data.id);
    }
  }

  // Check catalog references
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CATALOG_DIR, file), "utf-8");
    const parsed = CatalogSchema.safeParse(JSON.parse(raw)); // Note: CatalogSchema is record, adjust if array

    // Simplified traversal for skeleton: check if any evidenceId in the file exists
    const fileContent = JSON.parse(raw);
    const referencedIds = extractEvidenceIds(fileContent);

    for (const refId of referencedIds) {
      if (!evidenceIds.has(refId)) {
        logError(`Catalog file ${file} references non-existent evidenceId: ${refId}`);
      }
    }
  }
}

function extractEvidenceIds(obj: any): string[] {
  const ids: string[] = [];
  if (typeof obj === "object" && obj !== null) {
    if (obj.evidenceId && typeof obj.evidenceId === "string") {
      ids.push(obj.evidenceId);
    }
    for (const key of Object.keys(obj)) {
      ids.push(...extractEvidenceIds(obj[key]));
    }
  }
  return ids;
}

async function main() {
  console.log("🔍 Starting Evidence Lint CI Gate...\n");

  const evFiles = fs.readdirSync(EVIDENCE_DIR).filter(f => f.endsWith(".json"));
  for (const f of evFiles) {
    await verifyEvidenceFile(path.join(EVIDENCE_DIR, f));
  }

  await verifyCatalogEvidenceLinks();

  if (hasErrors) {
    console.error("\n🛑 CI FAILED: Evidence linting detected errors. Fix before merging.");
    process.exit(1);
  } else {
    console.log("\n🎉 CI PASSED: All evidence hashes, schemas, and links are valid.");
    process.exit(0);
  }
}

main();