// Verifies the 301 redirect map against the live vercel.json. Asserts:
//  - every old (www) URL resolves to a known new route via 301,
//  - no redirect is a no-op (source === destination),
//  - no duplicate sources,
//  - the host-canonical (non-www → www) rule is present.
//
// Run: node scripts/verify-redirects.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { OLD_URLS } from './old-urls.mjs';
import { mapOldToNew, normalizePath, VALID_DESTINATIONS } from './redirect-rules.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
const redirects = vercel.redirects || [];

const bySource = new Map();
for (const r of redirects) bySource.set(r.source, r);

const errors = [];
const asserts = (cond, msg) => { if (!cond) errors.push(msg); };

// Host canonical present.
const hostRule = redirects.find(r => r.has && r.has.some(h => h.type === 'host' && h.value === 'mcpserver.in'));
asserts(hostRule, 'Missing non-www → www host canonical redirect');

// Per-old-URL coverage.
let covered = 0;
for (const url of OLD_URLS) {
  let u; try { u = new URL(url); } catch { continue; }
  if (u.hostname !== 'www.mcpserver.in') continue;
  const path = normalizePath(u.pathname);
  const expected = mapOldToNew(path);
  if (!expected) continue;                             // already canonical, no rule needed
  const rule = bySource.get(path);
  asserts(rule, `No redirect rule for old URL path: ${path}`);
  if (rule) {
    asserts(rule.statusCode === 301, `Redirect for ${path} must use statusCode 301`);
    asserts(rule.destination === expected, `Redirect for ${path} should go to ${expected}, got ${rule.destination}`);
    asserts(rule.destination !== path, `Redirect for ${path} is a no-op`);
    asserts(VALID_DESTINATIONS.has(rule.destination), `Redirect for ${path} targets unknown new route: ${rule.destination}`);
    covered += 1;
  }
}

// No duplicate sources / no-op rules globally.
const seen = new Set();
for (const r of redirects) {
  asserts(!seen.has(r.source), `Duplicate redirect source: ${r.source}`);
  seen.add(r.source);
  if (r.source !== '/(.*)' && r.destination === r.source) errors.push(`No-op redirect: ${r.source}`);
}

if (errors.length) {
  console.error('verify-redirects FAILED:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`verify-redirects OK: ${redirects.length} rules, ${covered} old URLs mapped to canonical routes.`);
