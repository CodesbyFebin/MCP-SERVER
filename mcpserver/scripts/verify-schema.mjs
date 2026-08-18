import fs from 'fs';
import path from 'path';

const schemaPath = path.join(process.cwd(), 'src', 'lib', 'schema.ts');
const content = fs.readFileSync(schemaPath, 'utf-8');

const checks = [
  { name: 'Organization schema builder', test: () => content.includes('buildOrganizationSchema') },
  { name: 'WebSite schema builder', test: () => content.includes('buildWebSiteSchema') },
  { name: 'WebPage schema builder', test: () => content.includes('buildWebPageSchema') },
  { name: 'SoftwareApplication schema builder', test: () => content.includes('buildSoftwareApplicationSchema') },
  { name: 'FAQPage schema builder', test: () => content.includes('buildFAQPageSchema') },
  { name: 'TechArticle schema builder', test: () => content.includes('buildTechArticleSchema') },
  { name: 'HowTo schema builder', test: () => content.includes('buildHowToSchema') },
  { name: 'Full graph builder', test: () => content.includes('buildFullGraph') },
  { name: 'SearchAction potentialAction', test: () => content.includes('SearchAction') },
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
