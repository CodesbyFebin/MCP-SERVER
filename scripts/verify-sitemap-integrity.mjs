import { sitemapPaths, paths, html, canonical } from './verify-lib.mjs';
const sitemap=sitemapPaths();
const expected=[...new Set(paths)];
const errors=[];
if(sitemap.includes('/mcp-server-directory')) errors.push('redirect source is present');
if(new Set(sitemap).size!==sitemap.length) errors.push('duplicate URL present');
for(const path of sitemap){
  if(!expected.includes(path)) errors.push(`${path}: not an indexable route`);
  const c=canonical(html(path));
  const expectedCanonical=path==='/'?'https://www.mcpserver.in/':`https://www.mcpserver.in${path}`;
  if(c!==expectedCanonical) errors.push(`${path}: canonical mismatch ${c}`);
}
for(const path of expected) if(!sitemap.includes(path)) errors.push(`${path}: missing from sitemap`);
if(errors.length) throw new Error(errors.join('\n'));
console.log(`verify-sitemap-integrity: ${sitemap.length} canonical URLs valid`);
