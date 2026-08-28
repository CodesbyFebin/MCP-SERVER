# Content Expansion Plan (MCPserver.in Evidence Ledger site)

## Goal
Expand the developer-knowledge content on the MCPserver.in site by growing the four taxonomy arrays
(`glossary`, `topics`, `pillars`, `comparisons`), adding proper listing pages and individual item pages for
each, while keeping the full production gate green (typecheck, 19 tests, build, `verify:all` including
`verify:links`). All content must stay factual with zero fabricated metrics/certifications, consistent with the
Evidence Ledger v2 constraint.

## Current state (verified by reading `lib/site.js`)
- Arrays (lines 31-46): `pillars`=2, `topics`=2, `glossary`=3, `comparisons`=1 (base state; earlier expansions were reverted).
- `resolve()` (90-101) has individual `:slug` routes for `/pillars/`, `/topics/`, `/glossary/`, `/compare/`
  (kind `'pillar'|'topic'|'glossary'|'compare'`) but NO listing routes (e.g. `/glossary`).
- `genericBody()` (132-142) has NO branch for those kinds, so individual taxonomy pages currently render the
  generic "MCP developer resource" fallback. There are no listing pages at all.
- `allIndexablePaths()` (153-165) only enumerates individual `:slug` routes, never listing routes.
- `related()` (105-108) returns only the first **9** links and is used by `relatedHtml()` on many pages.
- `FOOT` (126) links a few specific taxonomy slugs (e.g. `/pillars/mcp-security`, `/glossary/mcp-client`,
  `/compare/mcp-vs-rest`) but NOT the listing roots.
- Quality gate: `verify:links` (`scripts/verify-internal-links.mjs`) fails any indexable page (except `/`)
  with 0 inbound internal links, AND fails on broken internal links / links to the redirect alias
  `/mcp-server-directory`.

## Key design decisions
1. **Add 4 listing pages** (`/glossary`, `/topics`, `/pillars`, `/compare`). Each renders a card grid linking to
   every individual item, guaranteeing inbound links for all item pages (solves the orphan problem structurally
   rather than relying on the 9-item `related()` slice).
2. **Inbound links for the listing pages themselves**: add the 4 listing roots to `FOOT` (rendered on every page),
   so every listing page has inbound links and is not an orphan. Do NOT depend on `related()` (it is sliced to 9).
3. **Add explicit `genericBody` branches** for the four individual item kinds and the four listing kinds, replacing
   the generic fallback for these routes. Keep them consistent with existing `directoryBody`/`cards` styling.
4. **Net-new content from base** (earlier "expansion" was reverted). Expand arrays with factual entries only.
5. No new redirect aliases; none of the new paths collide with `isRedirectSource` base paths.

## Implementation steps
1. **Expand the four arrays** (near top of `lib/site.js`, lines 31-46). Add factual entries, e.g.:
   - `glossary`: +`json-rpc`, `transport`, `resource`, `prompt`, `tool`, `sampling`.
   - `topics`: +`http`, `websocket`, `stdio-stderr`, `auth`, `sampling`.
   - `pillars`: +`mcp-architecture`, `mcp-transports`, `mcp-governance`.
   - `comparisons`: +`mcp-vs-graphql`, `mcp-vs-openapi`, `mcp-vs-grpc`, `mcp-vs-webhooks`.
   Keep each as `{ slug, title, description }`; descriptions must avoid invented metrics/certs/latency/SLA claims.
2. **`resolve()` (90-101)**: add exact-match branches (before or after the `:slug` branches — no conflict) for
   `/glossary`, `/topics`, `/pillars`, `/compare` returning
   `{ path, title, description, kind:'glossaryList'|'topicList'|'pillarList'|'comparisonList', item:{}, indexable:true }`.
   Use exact patterns `/^\/glossary$/`, `/^\/topics$/`, `/^\/pillars$/`, `/^\/compare$/`
   (no trailing-slash, matching `normalizePath` output).
3. **`genericBody()` (132-142)**: add branches:
   - For `'glossary'`, `'topic'`, `'pillar'`, `'comparison'`: render an "answer-first" hero + a single card/definition
     block for `r.item` (reuse `esc`, `link`). Keep it simple and on-brand.
   - For `'glossaryList'`, `'topicList'`, `'pillarList'`, `'comparisonList'`: render a hero + a grid of cards, each
     linking to `/<type>/<slug>` (reuse `link`/`esc`), then `relatedHtml(r.path)`.
4. **`allIndexablePaths()` (153-165)**: append the four listing paths to the `paths` array:
   `...['/glossary','/topics','/pillars','/compare']` (ensure comma after the preceding `comparisons.map(...)` line).
   The existing `filter(path => !isRedirectSource(path))` keeps them indexable.
5. **`FOOT` (126)**: append links to the four listing roots so they are never orphans, e.g.
   `${link('/glossary','Glossary')}${link('/topics','Topics')}${link('/pillars','Pillars')}${link('/compare','Comparisons')}`.
6. **(Optional, low risk)** Enrich JSON-LD: add the four `*List` kinds to the `['pillar','topic','research','blog']`
   TechArticle list in `schemaFor` (line 120) if desired; not required for the gate.
7. **(Optional)** Improve `related()` order so taxonomy listing links appear within the first 9 for broader cross-linking
   (not required since `FOOT` already guarantees inbound links).

## Validation
- `npm run typecheck` (node --check on `lib/site.js` etc.) must pass.
- `npm test` — expect 19/19 still passing (sitemap-exactly-matches and verify:links depend on the new routes being
  linked; the FOOT + listing-grid strategy satisfies this).
- `npm run production:gate` (typecheck → test → build:redirects → build → verify:all) must complete with no errors.
  Pay special attention to `verify:links`: every new individual item and every listing page must have ≥1 inbound link.
- Manual sanity: `node -e` render `/glossary`, `/pillars`, `/glossary/json-rpc`, `/compare/mcp-vs-rest` and confirm
  `metadata().canonical === metadata().ogUrl` and that the HTML contains links to the new slugs.

## Risks / open questions
- **`related()` 9-item slice**: do NOT rely on it for new pages; `FOOT` is the reliable inbound-link source.
- **Trailing slash**: `normalizePath` strips trailing slashes; listing exact-match patterns must not include one.
- **Content accuracy**: descriptions must remain evidence-backed / clearly editorial; no fabricated numbers.
- **Scope**: only the 4 taxonomy arrays + listing/item pages are in scope; server catalog records stay governed by
  `SAFE_DEEP_REPORT.json` and are not expanded here.
