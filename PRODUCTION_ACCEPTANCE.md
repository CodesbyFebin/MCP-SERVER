# Production Acceptance

## Repository
- Branch: feat/consolidation-foundation
- Commit SHA: pending actual git commit in target environment
- Node: 20+
- Framework: Next.js 16.2.10

## Foundation Status: PASS / BUILD HOLD

### Completed
- [x] `src/config/site.ts` — canonical origin locked to `https://www.mcpserver.in`
- [x] `scripts/production-gate.mjs` — preflight checks implemented
- [x] `package.json` — scripts restructured to avoid `build ↔ production:gate` recursion
- [x] `src/lib/evidence.ts` — publication/indexability gate ported
- [x] `src/lib/claims.ts` — banned-claim scanner implemented
- [x] `src/lib/schema-graph.ts` — JSON-LD graph builders
- [x] `src/app/robots.ts` — single robots implementation
- [x] `src/app/sitemap.ts` — publication-gated sitemap
- [x] `src/app/llms.txt/route.ts` and `llms-full.txt/route.ts` — AI discovery files
- [x] Evidence-backed seed data in `src/data/servers.ts`
- [x] Legacy URL map in `src/data/legacy-url-map.ts`
- [x] Unit tests for canonical helpers, evidence gate, claims, schema builders
- [x] CI workflow in `.github/workflows/ci.yml`
- [x] Documentation: README.md, ARCHITECTURE.md, EVIDENCE_POLICY.md, SEO_CONTRACT.md

### Pending Execution Evidence
- [ ] `npm ci` — not executed in this sandbox
- [ ] `npm run typecheck` — pending
- [ ] `npm run test` — pending
- [ ] `npm run build` — pending
- [ ] `npm run verify:preflight` — pending
- [ ] `npm run verify:postbuild` — pending
- [ ] Vercel deployment ID — pending
- [ ] Vercel deployment URL — pending
- [ ] Deployed smoke tests — pending
- [ ] Search Console verification — pending

## Actual Evidence
This file will be updated with real command output, real deployment IDs, and real commit SHAs after execution in an environment with shell and network access.
