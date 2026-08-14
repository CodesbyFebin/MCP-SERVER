import { mkdir, writeFile, rm } from 'node:fs/promises';
import { allIndexablePaths, renderSitemap, renderLlms, renderRegistryJson, renderServersJson, renderHtml } from '../lib/site.js';

await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await writeFile('dist/sitemap.xml',renderSitemap());
await writeFile('dist/llms.txt',renderLlms(false));
await writeFile('dist/llms-full.txt',renderLlms(true));
await writeFile('dist/mcp-registry.json',renderRegistryJson());
await mkdir('dist/api',{recursive:true});
await writeFile('dist/api/servers.json',renderServersJson());
await writeFile('dist/index.html',renderHtml('/','www.mcpserver.in'));
await writeFile('dist/build-manifest.json',JSON.stringify({generatedAt:new Date().toISOString(),indexablePaths:allIndexablePaths()},null,2));
console.log(`Built ${allIndexablePaths().length} indexable routes plus crawler and registry artifacts.`);
