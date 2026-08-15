// Generates the 301 redirect rules for vercel.json from the real old-URL
// inventory (scripts/old-urls.mjs) using the mapping in scripts/redirect-rules.mjs.
//
// Why explicit rules (not wildcards): the new site serves a few real dynamic
// sub-routes (e.g. /servers/<slug>, /glossary/<slug>). A broad "/servers/:slug*"
// redirect would also catch the NEW site's own live pages, so we emit one
// explicit rule per old URL. Safe and verifiable.
//
// Run: node scripts/build-redirects.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { OLD_URLS } from './old-urls.mjs';
import { mapOldToNew, normalizePath } from './redirect-rules.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const vercelPath = join(root, 'vercel.json');

// 1) Host canonical: non-www → www (fixes the duplicate-host indexing issue
//    called out in the performance report). Vercel upgrades to HTTPS.
const redirects = [
  {
    source: '/(.*)',
    has: [{ type: 'host', value: 'mcpserver.in' }],
    destination: 'https://www.mcpserver.in/$1',
    permanent: true
  }
];

// 2) Keep the legacy directory alias (already present on the new site).
redirects.push({
  source: '/mcp-server-directory',
  destination: '/directory',
  permanent: true,
  statusCode: 301
});

// 3) One explicit 301 per old URL (www only; non-www handled by host rule).
const seen = new Set();
for (const url of OLD_URLS) {
  let u;
  try { u = new URL(url); } catch { continue; }
  if (u.hostname !== 'www.mcpserver.in') continue;     // host canonical covers non-www
  const path = normalizePath(u.pathname);
  const dest = mapOldToNew(path);
  if (!dest) continue;                                  // already canonical
  if (dest === path) continue;                          // no-op
  const key = path;
  if (seen.has(key)) continue;
  seen.add(key);
  redirects.push({ source: path, destination: dest, permanent: true, statusCode: 301 });
}

// Merge into existing vercel.json, keeping redirects at the TOP.
const current = JSON.parse(readFileSync(vercelPath, 'utf8'));
const next = { ...current, redirects };
delete next.redirects;                                  // re-add first
const ordered = { $schema: next.$schema, buildCommand: next.buildCommand, outputDirectory: next.outputDirectory, cleanUrls: next.cleanUrls, trailingSlash: next.trailingSlash, redirects, rewrites: next.rewrites, headers: next.headers };

writeFileSync(vercelPath, JSON.stringify(ordered, null, 2) + '\n');
writeFileSync(join(here, 'redirects.generated.json'), JSON.stringify(redirects, null, 2) + '\n');
console.log(`Generated ${redirects.length} redirect rules (1 host canonical + 1 directory alias + ${seen.size} old-URL redirects).`);
