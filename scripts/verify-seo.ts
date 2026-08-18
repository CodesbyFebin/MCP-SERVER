import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'src', 'app');
const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      walk(full);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      checkFile(full);
    }
  }
}

function checkFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const name = path.basename(filePath);
  if (name === 'layout.tsx' || name === 'page.tsx') {
    if (!content.includes('metadata') && !content.includes('generateMetadata')) {
      warnings.push(`Missing metadata export in ${filePath}`);
    }
    if (!content.includes('canonical') && !content.includes('SchemaJsonLd')) {
      warnings.push(`Missing canonical/schema signal in ${filePath}`);
    }
    if (!content.includes('<h1') && !content.includes('h1=')) {
      warnings.push(`Missing H1 in ${filePath}`);
    }
  }
}

walk(APP_DIR);

if (errors.length > 0) {
  console.error('SEO verification failed:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
if (warnings.length > 0) {
  console.warn('SEO warnings:');
  warnings.forEach(w => console.warn(`  - ${w}`));
} else {
  console.log('SEO verification passed');
}
