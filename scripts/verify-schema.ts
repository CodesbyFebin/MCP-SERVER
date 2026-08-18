import fs from 'fs';
import path from 'path';

const schemaPath = path.join(process.cwd(), 'src', 'lib', 'schema-graph.ts');
const content = fs.readFileSync(schemaPath, 'utf-8');

const checks = [
  'buildOrganizationSchema',
  'buildWebSiteSchema',
  'buildWebPageSchema',
  'buildSoftwareApplicationSchema',
  'buildTechArticleSchema',
  'buildFAQPageSchema',
  'buildFullGraph',
];

let failed = 0;
for (const name of checks) {
  if (!content.includes(name)) {
    console.error(`Missing schema builder: ${name}`);
    failed++;
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log('Schema verification passed');
