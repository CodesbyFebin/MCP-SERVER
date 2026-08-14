# MCP-SERVER

MCPserver.in is a Model Context Protocol directory, developer knowledge hub, and hosting-oriented platform for AI agents connecting to tools, databases, and APIs.

This repository contains two independent production surfaces:

- **Public website** — dependency-free static build with route-level metadata, schema, sitemap, robots policy, clean URLs, and Vercel host protection.
- **Registry ingestion** — `mcpserver_ingest.py`, which imports the Official MCP Registry and deterministic enrichment candidates. Dry-run is the default; `--live` is required for database writes.

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
