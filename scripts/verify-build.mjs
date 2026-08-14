import { access, readFile } from 'node:fs/promises';
for (const file of ['dist/index.html','dist/sitemap.xml','dist/llms.txt','dist/mcp-registry.json','dist/build-manifest.json']) await access(file);
const manifest=JSON.parse(await readFile('dist/build-manifest.json','utf8'));
if(!Array.isArray(manifest.indexablePaths)||!manifest.indexablePaths.length) throw new Error('Build manifest has no indexable routes');
console.log(`verify-build: ${manifest.indexablePaths.length} routes present`);
