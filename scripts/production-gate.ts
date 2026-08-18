import { execSync } from 'child_process';

const steps = [
  { name: 'typecheck', command: 'npm run typecheck' },
  { name: 'lint', command: 'npm run lint' },
  { name: 'test', command: 'npm run test' },
  { name: 'build', command: 'npm run build' },
  { name: 'verify:seo', command: 'npm run verify:seo' },
  { name: 'verify:claims', command: 'npm run verify:claims' },
  { name: 'verify:sitemap', command: 'npm run verify:sitemap' },
  { name: 'verify:links', command: 'npm run verify:links' },
  { name: 'verify:schema', command: 'npm run verify:schema' },
  { name: 'verify:robots', command: 'npm run verify:robots' },
  { name: 'verify:preview', command: 'npm run verify:preview' },
];

let failed = 0;
for (const step of steps) {
  try {
    execSync(step.command, { stdio: 'pipe' });
    console.log(`✓ ${step.name}`);
  } catch (err) {
    console.error(`✗ ${step.name}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`production:gate failed: ${failed} step(s)`);
  process.exit(1);
}
console.log('production:gate passed');
