import test from 'node:test';
import assert from 'node:assert/strict';
import { isServerIndexable, ledgerCounts, ledgerBadge } from '../src/lib/indexability.mjs';
import { serverRecords } from '../src/data/servers.mjs';
import { renderSitemap, renderLlms, renderServersJson, renderHtml, metadata } from '../lib/site.js';
import { OLD_URLS } from '../scripts/old-urls.mjs';
import { mapOldToNew, normalizePath, VALID_DESTINATIONS } from '../scripts/redirect-rules.mjs';

test('every server record carries Evidence Ledger fields', () => {
  for (const s of serverRecords) {
    assert.ok('publicationStatus' in s, `${s.slug}: missing publicationStatus`);
    assert.ok(Array.isArray(s.evidence), `${s.slug}: evidence must be an array`);
    assert.ok('verificationStatus' in s, `${s.slug}: missing verificationStatus`);
  }
});

test('needs-evidence records are NOT indexable', () => {
  for (const s of serverRecords) {
    if (s.publicationStatus !== 'published') assert.equal(isServerIndexable(s), false);
  }
});

test('isServerIndexable gate enforces published + evidence + verified', () => {
  assert.equal(isServerIndexable({ publicationStatus: 'published', evidence: [], verificationStatus: 'x' }), false);
  assert.equal(isServerIndexable({ publicationStatus: 'needs-evidence', evidence: [{ source: 'x' }], verificationStatus: 'x' }), false);
  assert.equal(isServerIndexable({ publicationStatus: 'published', evidence: [{ source: 'x' }], verificationStatus: 'unverified' }), false);
  assert.equal(isServerIndexable({ publicationStatus: 'published', evidence: [{ source: 'x' }], verificationStatus: 'official-registry' }), true);
});

test('ledger badge is computed, never hardcoded', () => {
  const badge = ledgerBadge(serverRecords);
  const { total, published } = ledgerCounts(serverRecords);
  assert.match(badge, /^\d+ entities tracked · \d+ evidence-reviewed profiles published$/);
  assert.ok(badge.startsWith(`${total} entities tracked · ${published} evidence-reviewed profiles published`));
});

test('sitemap includes only indexable server URLs', () => {
  const urls = [...renderSitemap().matchAll(/<loc>.*?\/servers\/([^<]+)<\/loc>/g)].map(m => m[1]);
  const publishedSlugs = new Set(serverRecords.filter(isServerIndexable).map(s => s.slug));
  assert.deepEqual(new Set(urls), publishedSlugs);
});

test('llms.txt and server JSON feed exclude needs-evidence records', () => {
  const feed = JSON.parse(renderServersJson());
  const publishedSlugs = new Set(serverRecords.filter(isServerIndexable).map(s => s.slug));
  for (const s of feed) assert.ok(publishedSlugs.has(s.slug), `${s.slug} leaked into feed`);
  const llms = renderLlms(true);
  for (const s of serverRecords) {
    if (!isServerIndexable(s)) assert.doesNotMatch(llms, new RegExp(`/servers/${s.slug}`));
  }
});

test('needs-evidence server pages render with noindex', () => {
  const ne = serverRecords.find(s => !isServerIndexable(s));
  if (!ne) return; // no needs-evidence sample in dataset
  const html = renderHtml(`/servers/${ne.slug}`, 'www.mcpserver.in');
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
});

test('all provided old URLs map to a valid new route', () => {
  let mapped = 0;
  for (const url of OLD_URLS) {
    let u; try { u = new URL(url); } catch { continue; }
    if (u.hostname !== 'www.mcpserver.in') continue; // non-www handled by host canonical
    const dest = mapOldToNew(normalizePath(u.pathname));
    if (!dest) continue;
    assert.ok(VALID_DESTINATIONS.has(dest), `Old ${url} → unknown destination ${dest}`);
    mapped += 1;
  }
  assert.ok(mapped > 0, 'expected at least some old URLs to map');
});
