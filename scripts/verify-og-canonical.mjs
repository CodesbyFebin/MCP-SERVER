import { readdir, readFile } from 'node:fs/promises'; import path from 'node:path';
const dir=process.argv.includes('--dir')?process.argv[process.argv.indexOf('--dir')+1]:'dist';
async function walk(d){const out=[];for(const ent of await readdir(d,{withFileTypes:true})){const p=path.join(d,ent.name);ent.isDirectory()?out.push(...await walk(p)):out.push(p)}return out}
let failed=0;for(const file of (await walk(dir)).filter(f=>f.endsWith('.html')&&!f.endsWith('404.html'))){const h=await readFile(file,'utf8');const c=h.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];const o=h.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];if(!c||!o||c!==o){console.error(`[FAIL] ${file}: canonical=${c} og:url=${o}`);failed++}}
if(failed)process.exit(1);console.log('canonical === og:url for every generated page');
