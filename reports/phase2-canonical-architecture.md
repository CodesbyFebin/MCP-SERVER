# OMNI-LOOP Phase 2 — Canonical Architecture

## Gate Status

| Item | Status | Evidence |
|------|--------|----------|
| Trailing-slash policy | **PASS** | `trailingSlash: false` in `vercel.json` (consistent with `normalizePath()` in `lib/site.js`) |
| HSTS | **PASS** | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` added |
| CSP / Sentry compatibility | **PASS** | CSP includes `connect-src https://*.sentry.io https://*.ingest.sentry.io`; allows inline styles for current site |
| Canonical convergence (apex→www) | **PASS** | Host canonical redirect: `mcpserver.in` → `https://www.mcpserver.in/$1` |
| Canonical convergence (HTTP→HTTPS) | **PASS** | Vercel auto-upgrades HTTP→HTTPS |
| Canonical convergence (slash variants) | **PASS** | `trailingSlash: false` + `normalizePath()` strips trailing slashes; no `/path/` variants in sitemap |
| Frame protection | **PASS** | `X-Frame-Options: DENY` added; `frame-ancestors 'none'` in CSP |
| Production gate | **PASS** | typecheck, 19/19 tests, build, verify:all (54 routes) |

## Changes Made

### `vercel.json` — Headers

Added to the global `(.*)` header block:

1. **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload`
   - 1-year HSTS with subdomain inclusion and preload eligibility

2. **Content-Security-Policy**:
   ```
   default-src 'self';
   script-src 'self' 'unsafe-inline';
   style-src 'self' 'unsafe-inline';
   img-src 'self' data: https:;
   font-src 'self' data:;
   connect-src 'self' https://*.sentry.io https://*.ingest.sentry.io;
   frame-ancestors 'none';
   base-uri 'self';
   form-action 'self'
   ```
   - Compatible with Sentry error reporting (connect-src allows sentry.io endpoints)
   - Allows inline styles (current site uses inline `<style>` block)
   - No `unsafe-eval` (no eval-based code)

3. **X-Frame-Options**: `DENY`
   - Defense-in-depth alongside CSP `frame-ancestors 'none'`

## Canonical Convergence Verification

- **Apex→www**: `redirects[0]` matches host `mcpserver.in` and redirects to `https://www.mcpserver.in/$1`
- **HTTP→HTTPS**: Vercel platform handles this automatically
- **Trailing slash**: `trailingSlash: false` ensures no `/path/` variants are served
- **Canonical tag**: Every page emits `<link rel="canonical" href="https://www.mcpserver.in{path}">` via `canonicalFor()` in `lib/site.js`

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
verify:jsonld:    PASS (54 routes parse)
verify:links:     PASS (54 routes, 0 broken, 0 orphans)
verify:claims:    PASS (54 routes clear)
verify:redirects: PASS (31 rules, 29 old URLs mapped)
```

## Next Step

Phase 2 Reviewer = **PASS**.

Ready to advance to **Phase 3: Evidence Ledger Completion** upon explicit approval.

---

**Branch**: `codex/omni-loop-phase1-g7-g8-g9` (continuing on Phase 1 branch)
**Files modified**: `vercel.json` (headers block)
