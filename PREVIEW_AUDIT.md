# PREVIEW_AUDIT.md — v2 remediation

**Audit date:** 2026-08-14  
**Original audited origin:** `mcpserver-in-v2.cyberteckmaster.chatgpt.site`  
**Canonical origin:** `https://www.mcpserver.in`

## Launch-blocker remediation

- **F1 fixed:** canonical and `og:url` are produced by one metadata function from the same route path.
- **F2 fixed:** `/mcp-server-directory` is an alias only and redirects permanently to `/directory`.
- **F3 fixed:** redirect sources are excluded from the generated sitemap by construction.
- **F4 fixed:** any hostname other than `www.mcpserver.in` receives `noindex, follow` in both HTML and `X-Robots-Tag`.
- **F5 fixed:** `/research/mcp-directories` uses the same metadata path as every other page and always includes `og:url`.
- **F6 tracked:** this deployment restores the audited 20-route v2 surface; per-server/entity route expansion remains a separate ingestion/content phase.
- **F7 fixed:** `robots.txt` includes application-route disallows for `/profile`, `/dashboard`, `/api/`, and `/admin`.

## Regression gates

```bash
npm test
npm run verify:seo
npm run verify:sitemap
npm run verify:preview
npm run verify:all
```

The gates fail if canonical and Open Graph URLs diverge, preview hosts become indexable, the legacy redirect enters the sitemap, or the sitemap drifts from the route registry.
