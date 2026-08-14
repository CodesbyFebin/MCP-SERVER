import { paths, html, canonical, ogUrl } from './verify-lib.mjs';
for (const path of paths){
  const markup=html(path);
  const c=canonical(markup), o=ogUrl(markup);
  if(!c||!o) throw new Error(`Missing canonical or og:url: ${path}`);
  if(c!==o) throw new Error(`canonical != og:url: ${path}`);
  if(!c.startsWith('https://www.mcpserver.in/')) throw new Error(`Wrong canonical origin: ${path} -> ${c}`);
}
console.log(`verify-og-canonical: ${paths.length} routes valid`);
