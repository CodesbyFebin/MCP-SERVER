# MCPserver.in — OMNI-LOOP Phase 1–4 + Infrastructure Execution Plan (Revised per Reviewer Comments)

## Goal
Execute OMNI-LOOP phases with reviewer-mandated corrections, preserving frozen release SHA `cefe13167c563151ff4c3c565807e231f3b763e1` as immutable evidence. Highest achievable state after listed tasks is 🟡 RELEASE CANDIDATE (requires external staging and Master Reviewer for production).

## Phase Gate Corrections & Requirements

### PRE-FLIGHT (Non-negotiable invariants)
- Repository: authoritative `CodesbyFebin/MCP-SERVERS` origin
- GSC data: label any mock/fabricated as `MOCK_GSC` (never reuse as real)
- Migration mode: `A_ADDITIVE` only (no `A_OVERWRITE`)
- India equity: preserve `/glossary/mcp-india-ecommerce*` (current canonical owner)
- One-hop redirect: no redirect chains; all historical URLs resolve in one external hop

### G7/G8/G9 (Revised per Reviewer)
- **G7** (`mcp-soc-2` / `mcp-iso-27001`):
  - Remove generic redirect to `/glossary/`
  - Set to `EVIDENCE_REVIEW` (not `DRAFT`)
  - Only assign 301 if exact/genuinely equivalent canonical destination proven
  - If no equivalent after review, prefer `REBUILD` or `410` (not semantic-loss redirect)
- **G8** (`/directory/iot`, `/directory/databases`, `/directory/devops`, `/directory/monitoring`):
  - Add explicit migration-ledger rows
  - Initial action: `REVIEW`
  - If equivalent current category exists, map one-hop to that category
  - Otherwise preserve/rebuild rather than mass-redirecting to `/servers/`
- **G9** (`DEFER_NOINDEX` decoupling):
  - Split into independent fields: `historical_gsc_status`, `publication_authority`, `current_indexability`, `migration_action`
  - **Historical GSC MUST NOT determine publication_status** (test: published rows may have `historical_gsc_status: absent`)
  - Historical GSC MUST NOT determine current_indexability
  - Valid record: `{historical_gsc_status: "absent", publication_status: "published", current_indexability: "indexable", migration_action: "KEEP"}`

### PHASE 1 — Historical URL + GSC Canonical Recovery (Artifacts Required)
Generate these four deliverables:
- `data/historical-url-inventory.json` (raw inventory from Git history, sitemaps, GSC coverage)
- `data/gsc-coverage-evidence.json` (GSC coverage exports with `coverageStatus`, `searchVisibility`)
- `data/gsc-canonical-entities.json` (normalized canonical entities with `canonicalCandidate`, `observedVariants[]`, `currentCanonical`, `migrationPriority`, `migrationAction`, `destination`, `evidence[]`)
- `data/legacy-redirect-map.json` (legacy redirect map from GSC performance exports)
All must comply with G7/G8/G9 decisions above.

### PHASE 2 — Canonical Architecture (Revised per Reviewer)
- **Trailing-slash policy**: `trailingSlash: false` + `normalizePath()` strips slashes (consistent)
- **HSTS**: `Strict-Transport-Security: max-age=31536000; includeSubDomains` (NO `preload` until full HTTPS verification)
- **CSP**: 
  - `script-src 'self'` ONLY (remove `unsafe-inline`; bundle Sentry SDK if needed, do not load scripts from sentry.io)
  - `connect-src 'self' https://*.sentry.io https://*.ingest.sentry.io` (valid wildcard, not partial-host)
  - `style-src 'self' 'unsafe-inline'` (only if required; aim to eliminate)
  - `frame-ancestors 'none'` + `X-Frame-Options: DENY`
- **Canonicalization authority**: Use edge (Caddy) for scheme+host+legacy canonicalization; Next.js middleware for application-specific path redirects only (prove one-hop via tests)
- **DNS**: Outside current session (staging/Master Reviewer/DNS handled later)

### 69-PILLAR UI INTEGRATION (Mandatory Gate)
- **Header**: governed pillar groups only (from `getPublicHeaderGroups()`)
- **Landing page**: published/indexable pillars only
- **/pillars**: all public pillar authorities
- **Draft/review**: never public navigation
- **No hardcoded duplicate pillar arrays** outside registry

### MACHINE-READABLE COHORT SURFACES
- Shared projection function: `getPublishedServerProjection()`
- Feeds consume this projection:
  - `registry.json`
  - `api/servers.json`
  - `mcp-registry.json`
  - `sitemap`
  - `llms.txt`
  - `llms-full.txt`
  - `search`
- **Invariant**: public server slugs == sitemap slugs == api/servers.json slugs == llms slugs == search server slugs == related-server public cohort

### DOCKER + CADDY (Revised per Reviewer)
- **Healthcheck**: no extra packages; use Node `fetch`:
  ```dockerfile
  HEALTHCHECK CMD node -e \
    "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
  ```
- **Port exposure**: `expose: ["3000"]` in compose (do not publish Next.js port 3000 to host)
- **APP_VERSION**: set to exact git SHA in production Docker deployment

### GITHUB AUTHORITY
- After runtime stability: upgrade README, CONTRIBUTING.md, SECURITY.md, etc.
- GitHub Pages = rendered `/docs/`; Wiki = operational/community knowledge only
- No five duplicated documentation systems

## Execution Order

```text
PRE-FLIGHT
  ↓
G7 / G8 / G9 (with G9 historical GSC ≠ publication test)
  ↓
Phase 1 artifacts (historical-url-inventory.json, gsc-coverage-evidence.json, gsc-canonical-entities.json, legacy-redirect-map.json)
  ↓
INDEPENDENT REVIEWER PASS (Phase 1)
  ↓
Phase 2 canonical/security hardening (HSTS no preload, CSP script-src 'self', edge canonicalization)
  ↓
69-pillar Header + landing integration
  ↓
Route completion (200/noindex vs 404 determined truthfully; never 200/noindex stub for unpublished entities)
  ↓
Machine-readable cohort surfaces (shared projection)
  ↓
Docker + Caddy (healthcheck without curl, expose not publish)
  ↓
GitHub authority
  ↓
Full local runtime verification (curl -I checks for headers, SHA, redirects, sitemap, noindex/404)
  ↓
NEW SHA (exact git SHA from production Docker deployment)
  ↓
🟡 RELEASE CANDIDATE
  ↓
external staging in later phase
  ↓
MASTER REVIEWER
```

## Constraints
- No repository changes while plan mode is active
- Evidence-backed claims only; unknown valid state (`null`, `[]`, `"unknown"`)
- Zero-fabrication: no invented metrics, certifications, adoption, users, traffic, etc.
- Frozen release SHA preserved; new work on new branch with new SHA
- Highest valid state after listed tasks: 🟡 RELEASE CANDIDATE

## Output Files (Phase 1–4)
- `reports/preflight-checks.md`
- `data/historical-url-inventory.json`
- `data/gsc-coverage-evidence.json`
- `data/gsc-canonical-entities.json`
- `data/legacy-redirect-map.json`
- `reports/phase1-artifacts-report.md`
- `reports/phase2-canonical-architecture.md`
- `reports/phase3-evidence-ledger.md`
- `reports/phase4-infrastructure.md`
- `reports/release-candidate-status.md`