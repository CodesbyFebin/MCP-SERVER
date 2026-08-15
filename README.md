# MCP-SERVER

MCPserver.in is a Model Context Protocol directory, developer knowledge hub, and hosting-oriented platform for AI agents connecting to tools, databases, and APIs.

This repository contains two independent production surfaces:

- **Public website** — dependency-free static build with route-level metadata, schema, sitemap, robots policy, clean URLs, and Vercel host protection.
- **Registry ingestion** — `mcpserver_ingest.py`, which imports the Official MCP Registry and deterministic enrichment candidates. Dry-run is the default; `--live` is required for database writes.

## Evidence Ledger (v2+)

Catalog records are governed by an explicit publication contract in `src/lib/indexability.mjs`:

- A server is **indexable** only when `publicationStatus === 'published'`, it carries at least one `evidence` item, and `verificationStatus !== 'unverified'`.
- `isServerIndexable()` drives **every** public surface: `sitemap.xml`, `llms.txt` / `llms-full.txt`, `/api/servers.json`, `/mcp-registry.json`, server detail pages (non-indexable → `noindex, follow`), the homepage, and the directory.
- All counts are **computed** from the dataset (`ledgerCounts` / `ledgerBadge`), never hardcoded. The directory badge reads, e.g., "N entities tracked · M evidence-reviewed profiles published" derived from the data.

To add a record, drop a normalized array (with `publicationStatus`, `evidence[]`, `verificationStatus`) into `src/data/servers.mjs`. Records without `published` + `evidence` remain in the ledger but are excluded from crawlers and public feeds.

## Sitemap canonical migration (legacy mcpserver.in)

SEO equity from the legacy deployment is preserved with permanent 301 redirects:

- `scripts/old-urls.mjs` lists the real previously-indexed URLs (sourced from Google Search Console).
- `scripts/redirect-rules.mjs` maps each old path to the closest **existing** canonical route.
- `scripts/build-redirects.mjs` emits the redirect rules into `vercel.json` (explicit per-URL rules, so the new site's own live sub-pages are never clobbered) and adds a non-www → www host canonical.
- `scripts/verify-redirects.mjs` asserts every old URL maps to a valid new route.

Regenerate the full URL list from a fresh GSC export:

```bash
node scripts/extract-old-urls.mjs path/to/gsc-export.md
```

`npm run production:gate` runs `build:redirects` automatically, so `vercel.json` is always regenerated before deploy verification.

## Website

```bash
npm test
npm run build
npm run verify:all
```

The site is emitted to `dist/` and deployed by Vercel. Canonicals always target `https://www.mcpserver.in`; non-canonical Vercel hosts receive `X-Robots-Tag: noindex, follow` through host-conditional routing rules.

`/mcp-server-directory` is a permanent alias of `/directory` and is intentionally excluded from `sitemap.xml`.

## Registry ingestion

See [`MCPServer-Ingestion-README.md`](./MCPServer-Ingestion-README.md).
