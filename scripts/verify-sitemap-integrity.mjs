import { readFile } from 'node:fs/promises'; import path from 'node:path';
const dir=process.argv.includes('--dir')?process.argv[process.argv.indexOf('--dir')+1]:'dist'; const xml=await readFile(path.join(dir,'sitemap.xml'),'utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]); const errors=[];
if(urls.some(u=>u.includes('/mcp-server-directory')))errors.push('redirect source /mcp-server-directory is present');
if(urls.some(u=>!u.startsWith('https://www.mcpserver.in')))errors.push('non-canonical hostname present');
if(new Set(urls).size!==urls.length)errors.push('duplicate URL present');
for(const u of urls){const p=new URL(u).pathname;const f=p==='/'?path.join(dir,'index.html'):path.join(dir,p.slice(1)+'.html');try{const h=await readFile(f,'utf8');const c=h.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];if(c!==u)errors.push(`${p}: canonical mismatch (${c})`)}catch{errors.push(`${p}: generated file missing`)}}
if(errors.length){errors.forEach(e=>console.error('[FAIL]',e));process.exit(1)}console.log(`Sitemap integrity passed for ${urls.length} canonical URLs`);
