import fs from 'fs';
import path from 'path';

const files = [
  { name: 'llms.txt', path: 'public/llms.txt' },
  { name: 'llms-full.txt', path: 'public/llms-full.txt' },
  { name: 'ai.txt', path: 'public/ai.txt' },
  { name: 'security.txt', path: 'public/.well-known/security.txt' },
  { name: 'humans.txt', path: 'public/humans.txt' },
];

let passed = 0;
let failed = 0;

files.forEach(file => {
  const filePath = path.join(process.cwd(), file.path);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.length > 0) {
        console.log(`✓ ${file.name} exists and is non-empty`);
        passed++;
      } else {
        console.log(`✗ ${file.name} is empty`);
        failed++;
      }
    } else {
      console.log(`✗ ${file.name} not found`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ ${file.name}: ${err.message}`);
    failed++;
  }
});

console.log(`\nResult: ${passed}/${files.length} passed`);
if (failed > 0) {
  console.error('FAILED');
  process.exit(1);
} else {
  console.log('PASSED');
}
