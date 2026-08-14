import { readFile } from 'node:fs/promises';

const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const rules = config.headers || [];
const guard = rules.find((rule) =>
  Array.isArray(rule.missing) &&
  rule.missing.some((item) => item.type === 'host' && item.value === 'www.mcpserver.in') &&
  rule.missing.some((item) => item.type === 'host' && item.value === 'mcpserver.in') &&
  Array.isArray(rule.headers) &&
  rule.headers.some((header) => header.key.toLowerCase() === 'x-robots-tag' && /noindex/i.test(header.value))
);

if (!guard) {
  console.error('[FAIL] vercel.json lacks a fail-closed non-canonical-host X-Robots-Tag rule');
  process.exit(1);
}

const home = await readFile('dist/index.html', 'utf8');
if (!/<meta name="robots" content="index, follow">/i.test(home)) {
  console.error('[FAIL] canonical HTML is not indexable');
  process.exit(1);
}

console.log('Host guard passed: canonical HTML is indexable; non-canonical Vercel hosts receive X-Robots-Tag: noindex, follow');
