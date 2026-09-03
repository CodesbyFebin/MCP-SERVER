# MCPserver.in — 55→69 Reconciliation Audit Plan

## Goal
Produce exact reconciliation reports (no production changes) to:
1. Resolve the "335+ glossary redirects" discrepancy against the 94-candidate handoff
2. Map current editorial implementation to target 69-pillar authority contract without destroying GSC equity
3. Separate historical GSC status from editorial publication authority
4. Provide exact integer counts for every locked fact

## Locked Facts
- Current implementation: 5 pillars + 6 topics + 9 glossary + 5 comparisons = 25 editorial taxonomy items (from `lib/site.js` lines 31-63)
- Target 69 = 6×10 primary + 9 additional
- 904 = 675 submitted + 229 indexed-not-submitted = 699 normalized + 205 collapsed
- Glossary: 103 numeric-ending = 2 semantic + 101 generated
- Handoff: 94 = 92 glossary + 2 legacy

## Current State Inventory
- `lib/site.js` (199 lines): 20 static pages + 5 pillars + 6 topics + 9 glossary + 5 comparisons + server/category routes
- `scripts/old-urls.mjs` (101 lines): 91 old URLs (matches the 91 "Pages with redirects" seed)
- `scripts/redirects.generated.json` (193 lines): 31 redirect rules (12 glossary, 19 other)
- `scripts/redirect-rules.mjs` (133 lines): mapping logic with NEW_INDEX_ROUTES, slug sets
- `src/data/servers.mjs`: server registry data
- `src/lib/indexability.mjs`: isServerIndexable, isContentIndexable

## Tasks

### 1. Read & Inventory (READ-ONLY)
- Read `lib/site.js` to extract exact taxonomy counts
- Read `scripts/old-urls.mjs` to count old URLs (91)
- Read `scripts/redirects.generated.json` to count generated redirects (31)
- Read `scripts/redirect-rules.mjs` to understand mapping rules
- Read `src/data/servers.mjs` to count server records
- Read `src/lib/indexability.mjs` to understand indexability gates

### 2. Redirect Census
- Count total REDIRECT_301 rows in `redirects.generated.json` by category
- Match 92 supplied glossary candidates against generated suffix list
- Identify 9 unresolved generated suffixes
- Output: `reports/redirect-action-census.csv`

### 3. Glossary Classification
- 2 SEMANTIC_NUMERIC (protected): `/glossary/mcp-soc-2`, `/glossary/mcp-iso-27001`
- 101 GENERATED_SUFFIX → classify: REDIRECT / MERGE / REBUILD / RETIRE / UNRESOLVED
- Currently only 9 glossary items in `lib/site.js`; need to generate full 101 to verify

### 4. 55 → 69 Map
- Current 55 claim: learn(13) + guides(22) + build(6) + clients(10) + security(4)
- Actual current: 5 pillars + 6 topics + 9 glossary + 5 comparisons = 25 (not 55)
- RECONCILE: where is the 55? The "55 factory pillars" claim does not match `lib/site.js`
- Map current 25 to P01-P69 with match_type
- Output: `reports/55-to-69-pillar-map.csv` (69 rows)

### 5. Verify Specific Redirects
- `/directory/{databases,devops,iot}` → `/servers` (check if narrower canonical exists)
- `/mcp-host` → `/learn/mcp-architecture` (verify target exists and is indexable)
- `/what-is-mcp` → `/learn/model-context-protocol` (verify target exists)

### 6. Decouple Publication Authority
- `isContentIndexable()` → editorial publication
- `isServerIndexable()` → server publication
- GSC historical status → equity evidence only
- Add fields: `historical_gsc_status`, `migration_action`, `publication_status`, `publication_eligible`

### 7. Reconciliation Tests
- `13+22+6+10+4 = 55` (cannot verify - not present in current code)
- `60+9 = 69` (target contract)
- `675+229 = 904`, `699+205 = 904` (GSC data, not in repo)
- `101+2 = 103`, `92+9 = 101`, `92+2 = 94` (glossary/redirect arithmetic)

### 8. Final Report
- Output reconciliation report with exact integers
- Mark FINAL: PASS / HOLD + blockers
- Flag: current implementation has 25 taxonomy items, not 55

## Output Files
- `reports/redirect-action-census.csv`
- `reports/55-to-69-pillar-map.csv`
- `reports/reconciliation-test-results.txt`
- `reports/reconciliation-report.md`

## Constraints
- READ-ONLY: no production mutations
- Exact integers only (no "335+", "most", "roughly")
- Preserve GSC equity: do not rename established canonical owners
- Do not couple GSC status to publication authority
- No semantic numeric glossary path may be damaged

## Pass Rule
- Every count exact
- 335+ claim proven or corrected
- 94 handoff candidates reconcile exactly
- 103/101/2 glossary census reconciles
- 55 implementation separated from 69 target (or corrected if 55 is not the actual current state)
- GSC ≠ publication authority
- Every redirect has semantic justification
- No semantic numeric path damaged
