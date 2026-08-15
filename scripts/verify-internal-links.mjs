import { paths, html, links } from './verify-lib.mjs';
const known=new Set(paths);
const incoming=new Map(paths.map(p=>[p,0]));
for(const path of paths){
  const local=[...new Set(links(html(path)).map(x=>x.length>1?x.replace(/\/$/,''):x))];
  for(const target of local){
    if(target==='/mcp-server-directory') throw new Error(`${path}: links to redirect alias`);
    if(known.has(target)) incoming.set(target,(incoming.get(target)||0)+1);
    else if(!target.startsWith('/api/') && !['/robots.txt','/sitemap.xml','/llms.txt','/llms-full.txt','/mcp-registry.json'].includes(target)) throw new Error(`${path}: broken internal link ${target}`);
  }
}
const orphans=[...incoming.entries()].filter(([path,count])=>path!=='/'&&count===0).map(([path])=>path);
if(orphans.length) throw new Error(`Orphan indexable pages: ${orphans.join(', ')}`);
console.log(`verify-internal-links: ${paths.length} routes have no broken links or orphans`);
