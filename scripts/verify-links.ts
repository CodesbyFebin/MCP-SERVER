import fs from 'fs';
import path from 'path';

const APP = path.join(process.cwd(), 'src', 'app');
let issues = 0;

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileDescriptors: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      walk(full);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      check(full);
    }
  }
}

function check(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const hrefs = Array.from(content.matchAll(/href="([^"]+)"/g)).map(m => m[1]);
  for (const href of hrefs) {
    if (href.startsWith('http://')) {
      console.warn(`External http link in ${filePath}: ${href}`);
      issues++;
    }
  }
}

walk(APP);

if (issues > 0) {
  console.error(`Link verification found ${issues} external http links`);
  process.exit(1);
}
console.log('Link verification passed');
