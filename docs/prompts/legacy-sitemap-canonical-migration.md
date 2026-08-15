# MCPserver.in — Legacy Sitemap Canonical URL Migration Prompt

## Purpose

Use this prompt in Codex or another coding agent to reconstruct the historical canonical URL inventory from the production `MCP-SERVERS` repository and the `projects555/mcp-servers` Vercel project, then generate a safe migration/redirect ledger for the experimental `MCP-SERVER` project.

> **Critical boundary:** `CodesbyFebin/MCP-SERVERS` remains the authoritative production repository. `CodesbyFebin/MCP-SERVER` remains experimental/reference-only unless a later explicit production contract changes that. Do not move `mcpserver.in` or `www.mcpserver.in` to the singular project as part of this task.

---

# MASTER PROMPT — RECONSTRUCT OLD SITEMAP + CANONICAL URL LEDGER

You are the technical SEO migration engineer for MCPserver.in.

Your job is to reconstruct, verify, and preserve the historical canonical URL surface that has existed in:

- Production source repository: `https://github.com/CodesbyFebin/MCP-SERVERS`
- Production Vercel project: `projects555/mcp-servers`
- Canonical production domains: `https://www.mcpserver.in` and `https://mcpserver.in`

The destination repository for this migration artifact is:

- Experimental/reference repository: `https://github.com/CodesbyFebin/MCP-SERVER`
- Vercel preview/reference project: `projects555/mcp-server`

Do **not** treat the singular repository/project as production.

## Primary objective

Create a machine-readable and human-readable ledger of every historical URL that was emitted by the old sitemap/canonical system, classify each URL, determine its current canonical destination, and generate redirect rules/tests where a redirect is actually required.

The result must preserve SEO equity without fabricating indexation status.

## Absolute truth rule

A URL appearing in a sitemap does **not** prove Google indexed it.

Therefore classify separately:

- `discoveredInSitemap: true|false`
- `canonicalObserved: true|false`
- `liveStatus: 200|301|308|404|410|other`
- `indexStatus: indexed|not-indexed|unknown`

Only mark `indexStatus: indexed` when supported by actual Search Console export, URL Inspection evidence, or another explicit authoritative indexing source supplied to the task.

If no indexing evidence exists, use:

```json
"indexStatus": "unknown"
```

Never infer indexed status from sitemap membership, ranking assumptions, or URL age.

---

## PHASE 0 — BASELINE BOTH REPOSITORIES

Inspect:

### Production source

`CodesbyFebin/MCP-SERVERS`

Capture:

- default branch
- current production branch
- current HEAD
- recent commits
- sitemap generators
- sitemap index routes/files
- canonical helper(s)
- redirects
- rewrites
- trailing-slash policy
- robots.txt generation
- route inventories
- old sitemap verification scripts
- historical sitemap/canonical-related commits

### Experimental destination

`CodesbyFebin/MCP-SERVER`

Capture:

- default branch
- current HEAD
- existing redirect logic
- existing sitemap logic
- canonical engine
- Vercel routing config
- release gates

Create:

`reports/legacy-url-migration-baseline.md`

Do not modify production during discovery.

---

## PHASE 1 — DISCOVER EVERY HISTORICAL SITEMAP SOURCE

Do not assume there was only one sitemap.

Search `MCP-SERVERS` current source and git history for:

- `/sitemap.xml`
- `/sitemap-index.xml`
- `/sitemap_index.xml`
- segmented sitemaps
- server sitemaps
- content sitemaps
- blog sitemaps
- glossary sitemaps
- location/category sitemaps
- static `public/*.xml`
- generated sitemap scripts
- route inventory exports

Also inspect historical commits that materially changed sitemap size, route families, canonical host, redirects, or trailing slash behavior.

Where accessible, fetch historical/live sitemap endpoints from:

- `https://www.mcpserver.in/sitemap.xml`
- `https://mcpserver.in/sitemap.xml`
- `https://mcp-servers-projects555.vercel.app/sitemap.xml`
- branch/deployment URLs from `projects555/mcp-servers` when they correspond to relevant historical commits

Do not trust a Vercel alias merely because it exists. Record the deployment SHA when possible.

---

## PHASE 2 — EXTRACT ALL URLS

Create a normalized URL inventory from every verified sitemap source.

For each URL record:

```ts
type LegacyUrlRecord = {
  sourceUrl: string;
  sourcePath: string;
  sourceSitemap: string;
  sourceCommitSha: string | null;
  firstSeen: string | null;
  lastSeen: string | null;

  discoveredInSitemap: boolean;
  canonicalObserved: boolean;
  observedCanonical: string | null;

  currentStatus: number | null;
  redirectLocation: string | null;
  finalUrl: string | null;

  indexStatus: "indexed" | "not-indexed" | "unknown";
  indexEvidence: string | null;

  routeFamily: string;
  migrationAction:
    | "keep"
    | "redirect"
    | "canonicalize"
    | "gone"
    | "review";

  destinationPath: string | null;
  reason: string;
};
```

Normalize:

- scheme
- host
- trailing slash
- duplicate query variants
- percent encoding
- case differences

Never collapse two semantically different pages merely because their slugs look similar.

---

## PHASE 3 — BUILD ROUTE-FAMILY CLASSIFICATION

Group historical URLs by route family, for example:

- `/servers/`
- `/servers/{slug}/`
- `/mcp-server-directory/`
- `/categories/`
- `/categories/{slug}/`
- `/integrations/`
- `/clients/`
- `/docs/`
- `/learn/`
- `/glossary/`
- `/blog/`
- `/state-of-mcp/`
- legacy generated/pSEO families
- legacy aliases
- redirects

For each family report:

- historical count
- currently live count
- canonical destination pattern
- redirect requirement
- evidence quality
- duplicate/collision risk

---

## PHASE 4 — DETERMINE CURRENT CANONICAL DESTINATION

For every historical URL, determine one of:

### KEEP

The same path remains canonical and should continue returning 200.

### REDIRECT

A direct replacement exists.

Example:

```text
/mcp-server-directory/  ->  /servers/
```

Use permanent redirects only when there is a genuine replacement.

### CANONICALIZE

The content is intentionally accessible under a variant but canonicalizes to one URL.

### GONE

The content has no replacement and should be removed with 404/410 when that is more truthful than a weak redirect.

### REVIEW

Destination cannot be determined safely from evidence.

Do not mass-redirect irrelevant retired URLs to `/`, `/servers/`, or another generic parent merely to avoid 404s.

A redirect must preserve user intent.

---

## PHASE 5 — PRESERVE THE VERIFIED CANONICAL ENGINE

Canonical production host:

```text
https://www.mcpserver.in
```

Apex:

```text
https://mcpserver.in
```

should converge according to the already-verified production redirect policy.

Do not regress:

- HTTPS
- absolute canonical URLs
- one canonical per page
- trailing slash convention
- redirect policy
- sitemap canonicalization
- canonical/OG URL agreement

---

## PHASE 6 — BUILD OUTPUT ARTIFACTS

Generate:

### 1. `data/legacy-canonical-urls.json`

All normalized historical URLs and classification.

### 2. `data/legacy-redirect-map.json`

Only records where `migrationAction === "redirect"`.

Example:

```json
[
  {
    "source": "/mcp-server-directory/",
    "destination": "/servers/",
    "statusCode": 308,
    "reason": "Legacy directory consolidated into canonical server registry"
  }
]
```

### 3. `reports/legacy-canonical-url-report.md`

Include:

- sitemap sources discovered
- commits/deployments inspected
- total unique historical URLs
- duplicates removed
- current 200 URLs
- redirects
- 404/410 URLs
- review-required URLs
- route-family counts
- canonical conflicts
- index-status evidence coverage

### 4. `reports/legacy-index-status-gap.md`

Explicitly list URLs whose `indexStatus` remains `unknown` because no Search Console/URL Inspection evidence was provided.

---

## PHASE 7 — REDIRECT IMPLEMENTATION

Implement redirects only in the project where they are actually needed.

For the experimental `MCP-SERVER` project, add migration redirects using its existing routing architecture. Do not assume `vercel.json` is authoritative until the repo is inspected.

Rules:

- permanent redirect
- one hop only
- no loops
- no chains
- destination must be canonical
- redirect source excluded from sitemap
- query handling explicit
- trailing slash behavior consistent

Do not create redirects that conflict with production `MCP-SERVERS` canonical behavior.

---

## PHASE 8 — ADD AUTOMATED MIGRATION TESTS

Create tests that load `legacy-canonical-urls.json` and verify:

1. no duplicate source paths
2. every redirect destination is canonical
3. no redirect destination is itself a redirect source
4. no redirect loops
5. no redirect chains
6. every `keep` URL is present in the intended canonical inventory
7. redirect sources are absent from sitemap output
8. canonical URLs use `https://www.mcpserver.in`
9. trailing slash policy is consistent
10. `indexStatus` is never inferred from sitemap membership

Add the test to the existing release gate.

---

## PHASE 9 — OPTIONAL SEARCH CONSOLE IMPORT

If a Google Search Console export is supplied, import it as a separate evidence source.

Accept at minimum:

- URL/page
- clicks
- impressions
- average position
- optional inspection/indexing status

Join by normalized canonical URL.

Never infer `indexed` merely from non-zero impressions unless the task explicitly defines that as an operational proxy. Prefer actual URL Inspection/index coverage evidence when available.

Produce:

`data/legacy-search-console-evidence.json`

and update `indexStatus` only when evidence supports it.

---

## PHASE 10 — FINAL VERIFICATION

Run the experimental repo's full production gate.

Verify:

- sitemap integrity
- canonical integrity
- redirect integrity
- route integrity
- preview noindex behavior
- internal links
- JSON-LD
- unsupported-claim gate

Then produce:

`reports/legacy-migration-readiness.md`

with status:

- `READY FOR REFERENCE/PREVIEW`
- or `RED / HOLD`

Do not call the singular project production-ready for `mcpserver.in` unless a later explicit production contract changes the authoritative production repository.

---

# FINAL DELIVERABLE

Return:

1. exact source commits inspected from `MCP-SERVERS`
2. sitemap sources inspected
3. total unique historical canonical URLs
4. exact legacy URL ledger path
5. exact redirect map path
6. count of KEEP / REDIRECT / GONE / REVIEW
7. canonical-conflict count
8. index-status evidence coverage
9. unresolved URL mappings
10. tests added
11. production-gate result for `MCP-SERVER`
12. exact experimental branch SHA
13. Vercel preview deployment result

Never fabricate indexed status.
Never mass-redirect irrelevant URLs.
Never move production domains as part of this task.

BEGIN NOW.
