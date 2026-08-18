import fs from 'fs';
import path from 'process';

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const content = fs.readFileSync(sitemapPath, 'utf-8');

const checks = [
  { name: 'XML declaration', test: () => content.includes('<?xml version="1.0"') },
  { name: 'urlset root', test: () => content.includes('<urlset') },
  { name: 'Contains / loc', test: () => content.includes('<loc>') },
  { name: 'Contains lastmod', test: () => content.includes('<lastmod>') },
  { name: 'Contains changefreq', test: () => content.includes('<changefreq>') },
  { name: 'Contains priority', test: () => content.includes('<priority>') },
  { name: 'Homepage included', test: () => content.includes('https://www.codemicro.dev/</loc>') },
  { name: 'Directory included', test: () => content.includes('/directory') },
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
  try {
    if (check.test()) {
      console.log(`✓ ${check.name}`);
      passed++;
    } else {
      console.log(`✗ ${check.name}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ ${check.name}: ${err.message}`);
    failed++;
  }
});

console.log(`\nResult: ${passed}/${checks.length} passed`);
if (failed > 0) {
  console.error('FAILED');
  process.exit(1);
} else {
  console.log('PASSED');
}
