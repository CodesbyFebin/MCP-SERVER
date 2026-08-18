import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const gatedPhrases = [
  'sub-15ms',
  'sub-12ms',
  'SOC 2',
  'ISO 27001',
  '99.99%',
  '99.9%',
  'enterprise-grade',
  'world-class',
  'award-winning',
  '#1',
  'number one',
  'best in class',
  'industry leading',
  'guaranteed',
  'slas',
  'uptime',
];

let issues = 0;

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      const lower = line.toLowerCase();
      gatedPhrases.forEach(phrase => {
        if (lower.includes(phrase.toLowerCase())) {
          console.log(`⚠ ${filePath}:${idx + 1} - gated phrase: "${phrase}"`);
          issues++;
        }
      });
    });
  } catch (err) {
    // skip
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      checkFile(fullPath);
    }
  }
}

walkDir(srcDir);

if (issues > 0) {
  console.log(`\nFound ${issues} potential unsupported claims. Review before deploy.`);
  console.error('WARNING');
  process.exit(1);
} else {
  console.log('✓ No gated claims found in source files');
  console.log('PASSED');
}
