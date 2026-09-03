# OMNI-LOOP Phase 1 — Historical URL + GSC Canonical Recovery

## Gate Status

| Gate | Status | Evidence |
|------|--------|----------|
| G7 — `mcp-soc-2` / `mcp-iso-27001` | **PASS** | Removed generic redirect; both set to EVIDENCE_REVIEW in migration ledger |
| G8 — four `/directory/*` URLs | **PASS** | Explicit migration-ledger rows created; all set to REVIEW (no mass-redirect to /servers/) |
| G9 — `DEFER_NOINDEX` decoupled | **PASS** | Fields separated: `historical_gsc_status`, `publication_authority`, `current_indexability`, `migration_action` |
| Phase 1 artifacts generated | **PASS** | This report, `scripts/migration-ledger.mjs`, updated `scripts/redirect-rules.mjs` |
| Production gate | **PASS** | typecheck, 19/19 tests, build, verify:all (54 routes, 0 broken, 0 orphans) |

## G7 Details — `mcp-soc-2` / `mcp-iso-27001`

- **Action taken**: Removed from `NEW_GLOSSARY_SLUGS` set; added to `REVIEW_PATHS` set.
- **Result**: `mapOldToNew()` returns `null` for these paths → no 301 redirect emitted.
- **Migration action**: `REVIEW` (EVIDENCE_REVIEW)
- **Rule**: Only assign 301 if exact or genuinely equivalent canonical destination is proven. If no equivalent exists after review, prefer `REBUILD` or `410`, not a semantic-loss redirect.

## G8 Details — four `/directory/*` URLs

Paths added to `REVIEW_PATHS`:
- `/directory/iot`
- `/directory/databases`
- `/directory/devops`
- `/directory/monitoring`

- **Initial action**: `REVIEW`
- **Rule**: If an equivalent current category exists, map one-hop to that category. Otherwise preserve/rebuild rather than mass-redirecting to `/servers/`.

## G9 Details — Decoupled `DEFER_NOINDEX`

The `DEFER_NOINDEX` concept is decomposed into four independent fields in `scripts/migration-ledger.mjs`:

| Field | Meaning |
|-------|---------|
| `historical_gsc_status` | What GSC reported historically (indexed, discovered-not-indexed, etc.) |
| `publication_authority` | Editorial publication decision (isContentIndexable) |
| `current_indexability` | Current indexable status (published, noindex, pending) |
| `migration_action` | KEEP \| 301 \| REBUILD \| NOINDEX \| 410 \| REVIEW |

**Invariant**: Historical GSC state must never control current publication authority. A currently published/evidence-qualified page stays published even if its historical GSC row was "deferred".

## Redirect Census

- **Total redirect rules**: 31
  - 1 host canonical (mcpserver.in → www.mcpserver.in)
  - 1 directory alias (/mcp-server-directory → /directory)
  - 29 old-URL redirects (down from 31 — G7/G8 paths correctly excluded)
- **G7/G8 paths excluded from generic redirects**: 6 paths
- **No semantic numeric glossary path damaged**: confirmed (`mcp-soc-2`, `mcp-iso-27001` protected)

## Production Gate Results

```
typecheck:        PASS
tests:            19/19 PASS
build:            PASS
verify:build:     PASS (54 routes)
verify:routes:    PASS
verify:seo:       PASS
verify:sitemap:   PASS
verify:preview:   PASS
verify:jsonld:    PASS (54 routes parse, connected graphs)
verify:links:     PASS (54 routes, 0 broken, 0 orphans)
verify:claims:    PASS (54 routes clear)
verify:redirects: PASS (31 rules, 29 old URLs mapped)
```

## Next Step

Phase 1 Reviewer = **PASS**.

Ready to advance to **Phase 2: Canonical Architecture** (trailing-slash policy, HSTS, CSP/Sentry compatibility, canonical convergence) upon explicit approval.

---

**SHA**: New branch `codex/omni-loop-phase1-g7-g8-g9` created from immutable evidence HEAD.
**Branch**: `codex/omni-loop-phase1-g7-g8-g9`
**Base**: `e201946` (treated as immutable evidence; `cefe131…` not present in this repository history)
