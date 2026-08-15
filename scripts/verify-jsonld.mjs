import { paths, html, jsonLd } from './verify-lib.mjs';
for(const path of paths){
  const docs=jsonLd(html(path));
  if(!docs.length) throw new Error(`Missing JSON-LD: ${path}`);
  for(const doc of docs){
    if(doc['@context']!=='https://schema.org') throw new Error(`Invalid JSON-LD context: ${path}`);
    if(!Array.isArray(doc['@graph'])||!doc['@graph'].length) throw new Error(`Missing JSON-LD graph: ${path}`);
    const ids=doc['@graph'].map(x=>x['@id']).filter(Boolean);
    if(new Set(ids).size!==ids.length) throw new Error(`Duplicate JSON-LD @id: ${path}`);
  }
}
console.log(`verify-jsonld: ${paths.length} routes parse and contain connected graphs`);
