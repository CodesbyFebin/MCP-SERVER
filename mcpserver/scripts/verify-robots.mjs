import fs from 'fs';
import path from 'path';

const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
const content = fs.readFileSync(robotsPath, 'utf-8');

const checks = [
  { name: 'User-agent: *', test: () => content.includes('User-agent: *') },
  { name: 'Allow: /', test: () => content.includes('Allow: /') },
  { name: 'Sitemap declaration', test: () => content.includes('Sitemap:') },
  { name: 'GPTBot allowed', test: () => content.includes('GPTBot') && content.includes('Allow: /') },
  { name: 'ClaudeBot allowed', test: () => content.includes('ClaudeBot') && content.includes('Allow: /') },
  { name: 'PerplexityBot allowed', test: () => content.includes('PerplexityBot') && content.includes('Allow: /') },
  { name: 'Google-Extended allowed', test: () => content.includes('Google-Extended') && content.includes('Allow: /') },
  { name: 'Disallow /api/', test: () => content.includes('Disallow: /api/') },
  { name: 'Disallow /admin/', test: () => content.includes('Disallow: /admin/') },
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
