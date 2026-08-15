// Extracts every mcpserver.in URL from a Google Search Console export (markdown
// or plain text) and writes scripts/old-urls.mjs.
//
// Usage (run on your machine, where the GSC export lives):
//   node scripts/extract-old-urls.mjs path/to/gsc-export.md
//
// The shell is unavailable inside some sandboxes, so this is the portable way to
// (re)generate the source list for the 301 migration from a fresh GSC pull.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const [, , inputPath] = process.argv;
if (!inputPath) {
  console.error('Usage: node scripts/extract-old-urls.mjs <path-to-gsc-export.md>');
  process.exit(1);
}

const text = readFileSync(inputPath, 'utf8');
const re = /https?:\/\/[a-z0-9.-]*mcpserver\.in[^\s|`)]*/gi;
const found = new Set();
for (const m of text.matchAll(re)) found.add(m[0]);

const urls = [...found].sort();
const out = join(dirname(fileURLToPath(import.meta.url)), 'old-urls.mjs');
const banner = `// Auto-generated from a Google Search Console URL inventory (old mcpserver.in).
// Regenerate with: node scripts/extract-old-urls.mjs <gsc-export.md>
// These are the REAL previously-indexed URLs that require 301 redirects.
export const OLD_URLS = [
${urls.map(u => `  ${JSON.stringify(u)}`).join(',\n')}
];
`;
writeFileSync(out, banner);
console.log(`Wrote ${urls.length} old URLs to ${out}`);
