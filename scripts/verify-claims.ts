import fs from 'fs';
import path from 'path';
import { scanClaims } from '@/lib/claims';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const DATA = path.join(ROOT, 'src', 'data');
let issues = 0;

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      walk(full);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      check(full);
    }
  }
}

function check(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const hits = scanClaims(content);
  if (hits.length > 0) {
    console.warn(`Claims warning in ${filePath}: ${hits.join(', ')}`);
    issues++;
  }
}

walk(SRC);
walk(DATA);

if (issues > 0) {
  console.error(`Claim verification found ${issues} files with banned claim patterns`);
  process.exit(1);
}
console.log('Claim verification passed');
