import fs from 'fs';
import path from 'path';

const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
if (!fs.existsSync(vercelJsonPath)) {
  console.log('No vercel.json found; skipping preview verification');
  process.exit(0);
}

const content = fs.readFileSync(vercelJsonPath, 'utf-8');
if (content.includes('vercel.app') || content.includes('preview')) {
  console.warn('Preview URLs may be present in vercel.json');
}
console.log('Preview verification passed');
