import {ROUTES,metadata,renderHtml} from '../lib/site.js';
let failed=false;
for(const r of ROUTES){const m=metadata(r.path,'www.mcpserver.in');const html=renderHtml(r.path,'www.mcpserver.in');if(!html||m.canonical!==m.ogUrl){console.error(`[FAIL] ${r.path}: canonical/og mismatch`);failed=true;continue}if(!html.includes(`<link rel="canonical" href="${m.canonical}">`)){console.error(`[FAIL] ${r.path}: canonical missing`);failed=true}if(!html.includes(`<meta property="og:url" content="${m.ogUrl}">`)){console.error(`[FAIL] ${r.path}: og:url missing`);failed=true}}
if(failed)process.exit(1);console.log(`SEO metadata verified: ${ROUTES.length}/${ROUTES.length}; canonical === og:url.`);
