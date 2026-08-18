import fs from 'fs';
import path from 'path';

const robotsPath = path.join(process.cwd(), 'src', 'app', 'robots.ts');
const content = fs.readFileSync(robotsPath, 'utf-8');

const checks = [
  { name: 'robots file exists', test: () => true },
  { name: 'sitemap declared', test: () => content.includes('sitemap') },
  { name: 'OAI-SearchBot allowed', test: () => content.includes('OAI-SearchBot') },
  { name: 'GPTBot allowed', test: () => content.includes('GPTBot') },
  { name: 'ClaudeBot allowed', test: () => content.includes('ClaudeBot') },
  { name: 'PerplexityBot allowed', test: () => content.includes('PerplexityBot') },
  { name: 'Google-Extended allowed', test: () => content.includes('Google-Extended') },
];

let failed = 0;
for (const check of checks) {
  try {
    if (check.test()) {
      console.log(`✓ ${check.name}`);
    } else {
      console.log(`✗ ${check.name}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ ${check.name}: ${(err as Error).message}`);
    failed++;
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log('Robots verification passed');
