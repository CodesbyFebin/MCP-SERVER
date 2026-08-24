import { serverRecords, categoryRecords, publicServerRecord, SNAPSHOT_DATE, REGISTRY_SOURCE, slugify } from '../src/data/servers.mjs';
import { isServerIndexable, ledgerBadge, ledgerCounts } from '../src/lib/indexability.mjs';

export const ORIGIN = 'https://www.mcpserver.in';
export const CANONICAL_HOST = 'www.mcpserver.in';

const STATIC = [
  ['/', 'MCP Server Directory & Developer Knowledge Hub', 'Browse an evidence-backed MCP server catalog, learn the protocol, and use developer resources without fabricated performance or certification claims.', 'home'],
  ['/directory', 'MCP Server Directory', 'Browse MCP server records backed by the Official MCP Registry snapshot used by this site.', 'directory'],
  ['/integrations', 'MCP Integrations', 'Explore MCP server capabilities and integration patterns derived from verified catalog records.', 'integrations'],
  ['/clients', 'MCP Clients', 'Understand how MCP hosts and clients connect to servers over supported transports.', 'clients'],
  ['/docs', 'MCP Documentation', 'Technical notes for MCP discovery, transports, tools, resources, prompts, and deployment.', 'docs'],
  ['/tools/mcp-playground', 'MCP Playground Examples', 'Inspect non-production JSON-RPC examples for understanding MCP request and response structure.', 'playground'],
  ['/what-is-mcp', 'What Is Model Context Protocol (MCP)?', 'Learn the MCP host-client-server architecture and how AI applications connect to tools and data.', 'learn'],
  ['/learn', 'MCP Learning Hub', 'Learn to discover, evaluate, connect, secure, and operate MCP servers.', 'learn'],
  ['/security', 'MCP Security', 'Implemented site controls, recommended MCP security practices, and explicit certification boundaries.', 'security'],
  ['/state-of-mcp', 'State of MCP 2026', 'Evidence-oriented observations about the MCP ecosystem and Official MCP Registry.', 'research'],
  ['/blog', 'MCP Blog', 'Technical implementation notes and ecosystem updates.', 'blog'],
  ['/pricing', 'MCPserver Hosting Availability', 'Current commercial availability and capability boundaries for MCPserver.in.', 'pricing'],
  ['/about', 'About MCPserver.in', 'MCPserver.in is an independent MCP directory and developer knowledge platform.', 'about'],
  ['/contact', 'Contact MCPserver.in', 'Contact the site for catalog corrections, technical feedback, or security reports.', 'contact'],
  ['/research/mcp-directories', 'MCP Directory Research', 'How downstream MCP catalogs can consume and enrich the Official MCP Registry without inventing metadata.', 'research'],
  ['/status', 'MCPserver.in Status', 'Operational transparency page. No synthetic telemetry is represented as live monitoring.', 'status'],
  ['/hosting', 'Hosted MCP Servers', 'Hosting information with no purchasable-plan claims until checkout and infrastructure are live.', 'hosting'],
  ['/editorial-policy', 'Editorial Policy', 'How MCPserver.in sources, verifies, corrects, and labels catalog and educational content.', 'trust'],
  ['/verification-methodology', 'Verification Methodology', 'How registry-backed records and editorial taxonomy are handled.', 'trust'],
  ['/privacy', 'Privacy Policy', 'Privacy policy for MCPserver.in public website use.', 'legal'],
  ['/terms', 'Terms of Service', 'Terms governing use of MCPserver.in public resources.', 'legal']
].map(([path,title,description,kind]) => ({ path, title, description, kind, indexable: true }));

const pillars = [
    { slug:'mcp-registry', title:'Official MCP Registry', description:'How the Official MCP Registry acts as a primary metadata source for public MCP servers.' },
    { slug:'mcp-security', title:'MCP Security', description:'Least privilege, secret isolation, human approval, and safe tool execution for MCP deployments.' },
    { slug:'mcp-architecture', title:'MCP Architecture', description:'Overview of the Model Context Protocol host-client-server architecture, including transports, tools, and resources.' },
    { slug:'mcp-transports', title:'MCP Transports', description:'Comparison of stdio, HTTP, WebSocket, and other transport mechanisms for MCP communication.' },
    { slug:'mcp-governance', title:'MCP Governance', description:'How the MCP protocol is governed, versioned, and evolved through community consensus.' }
];
const topics = [
    { slug:'streamable-http', title:'Streamable HTTP for MCP', description:'How remote MCP servers expose Streamable HTTP endpoints.' },
    { slug:'stdio-transport', title:'stdio Transport for MCP', description:'How local MCP processes communicate over standard input and output.' },
    { slug:'http', title:'HTTP for MCP', description:'How MCP servers can communicate over HTTP for request-response interactions.' },
    { slug:'websocket', title:'WebSocket for MCP', description:'How MCP servers can communicate over WebSocket for full-duplex communication.' },
    { slug:'stdio-stderr', title:'stdio-stderr Transport', description:'How MCP servers use standard output and error for communication in stdio transport.' }
];
const glossary = [
    { slug:'mcp-server', title:'MCP server', description:'A program that exposes tools, resources, or prompts to an MCP client.' },
    { slug:'mcp-client', title:'MCP client', description:'A protocol client that maintains a connection to one MCP server.' },
    { slug:'mcp-host', title:'MCP host', description:'An AI application that manages one or more MCP clients.' },
    { slug:'json-rpc', title:'JSON-RPC', description:'A remote procedure call protocol encoded in JSON.' },
    { slug:'transport', title:'Transport', description:'The mechanism by which MCP clients and servers communicate (e.g., stdio, HTTP).' },
    { slug:'resource', title:'Resource', description:'A piece of data or content that an MCP server can read and provide to clients.' },
    { slug:'prompt', title:'Prompt', description:'A predefined template or set of instructions that an MCP server can offer to clients.' }
];
const comparisons = [
    { slug:'mcp-vs-rest', title:'MCP vs REST', description:'MCP standardizes AI-facing capability discovery and invocation; REST is a general HTTP API architectural style.' },
    { slug:'mcp-vs-graphql', title:'MCP vs GraphQL', description:'Comparing MCP and GraphQL for APIs: MCP focuses on tool discovery while GraphQL focuses on data querying.' },
    { slug:'mcp-vs-openapi', title:'MCP vs OpenAPI', description:'How MCP differs from OpenAPI specifications: MCP is for dynamic tool execution while OpenAPI describes static APIs.' },
    { slug:'mcp-vs-grpc', title:'MCP vs gRPC', description:'MCP and gRPC for service-to-service communication: MCP is designed for AI agent tool use while gRPC is for general service communication.' },
    { slug:'mcp-vs-webhooks', title:'MCP vs Webhooks', description:'Using MCP for real-time updates vs traditional webhooks: MCP provides bidirectional tool execution while webhooks are one-way notifications.' }
];

export const REDIRECTS = new Map([['/mcp-server-directory','/directory']]);

function isRedirectSource(path) {
  const p = path.replace(/\/+$/, "");
  const basePaths = [
    "/directory",
    "/integrations",
    "/clients",
    "/docs",
    "/tools/mcp-playground",
    "/what-is-mcp",
    "/learn",
    "/security",
    "/state-of-mcp",
    "/blog",
    "/pricing",
    "/about",
    "/contact",
    "/research/mcp-directories",
    "/status",
    "/hosting",
    "/editorial-policy",
    "/verification-methodology",
    "/privacy",
    "/terms",
    "/mcp-server-directory"
  ];
  return basePaths.some(base => {
    if (p === base) return false;
    const baseWithSlash = base + "/";
    return p.startsWith(baseWithSlash) && p.length > baseWithSlash.length;
  });
}

export const normalizePath = (v='/') => { v=String(v||'/').split('?')[0].split('#')[0]; if(!v.startsWith('/')) v='/'+v; v=v.replace(/\/{2,}/g,'/'); if(v.length>1) v=v.replace(/\/$/,''); return v||'/'; };
export const normalizeHost = (h='') => String(h).trim().toLowerCase().split(':')[0];
export const canonicalFor = p => normalizePath(p)==='/' ? ORIGIN+'/' : ORIGIN+normalizePath(p);
export const robotsFor = (host,indexable=true) => normalizeHost(host)===CANONICAL_HOST && indexable ? 'index, follow' : 'noindex, follow';
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g,'\\u003c');
const link = (href,label) => `<a href="${esc(href)}">${esc(label)}</a>`;

function resolve(path){
  path=normalizePath(path);
  const base=STATIC.find(r=>r.path===path); if(base) return base;
  let m;
  if((m=path.match(/^\/servers\/([^/]+)$/))){ const item=serverRecords.find(s=>s.slug===m[1]); if(item) return {path,title:`${item.title} MCP Server`,description:item.description,kind:'server',item,indexable:isServerIndexable(item)}; }
  if((m=path.match(/^\/categories\/([^/]+)$/))){ const item=categoryRecords.find(c=>c.slug===m[1]); if(item) return {path,title:`${item.name} MCP Servers`,description:`Verified MCP server records in the ${item.name} category.`,kind:'category',item,indexable:true}; }
  if((m=path.match(/^\/pillars\/([^/]+)$/))){ const item=pillars.find(x=>x.slug===m[1]); if(item) return {path,title:item.title,description:item.description,kind:'pillar',item,indexable:true}; }
  if((m=path.match(/^\/topics\/([^/]+)$/))){ const item=topics.find(x=>x.slug===m[1]); if(item) return {path,title:item.title,description:item.description,kind:'topic',item,indexable:true}; }
  if((m=path.match(/^\/glossary\/([^/]+)$/))){ const item=glossary.find(x=>x.slug===m[1]); if(item) return {path,title:item.title,description:item.description,kind:'glossary',item,indexable:true}; }
  if((m=path.match(/^\/compare\/([^/]+)$/))){ const item=comparisons.find(x=>x.slug===m[1]); if(item) return {path,title:item.title,description:item.description,kind:'compare',item,indexable:true}; }
  if((m=path.match(/^\/pillars$/))){ return {path,title:'MCP Pillars',description:'Explore the core pillars of the Model Context Protocol.',kind:'pillars',item:{},indexable:true}; }
  if((m=path.match(/^\/compare$/))){ return {path,title:'MCP Comparisons',description:'See how MCP compares to other protocols and technologies.',kind:'comparisons',item:{},indexable:true}; }
  return null;
}

export function metadata(path,host=''){ const r=resolve(path); if(!r) return null; const canonical=canonicalFor(r.path); return {...r,canonical,ogUrl:canonical,robots:robotsFor(host,r.indexable)}; }

function related(current=''){
  const links=[['/directory','Server directory'],['/verification-methodology','Verification methodology'],['/pillars/mcp-registry','Official Registry guide'],['/what-is-mcp','What is MCP?'],['/security','MCP security'],['/topics/streamable-http','Streamable HTTP'],['/topics/stdio-transport','stdio transport'],['/glossary/mcp-server','MCP server glossary'],['/clients','MCP clients'],['/learn','Learning hub'],['/pillars','MCP Pillars'],['/compare','MCP Comparisons']];
  return links.filter(([href])=>href!==current).slice(0,9);
}

function schemaFor(r){
  const orgId=ORIGIN+'/#organization', siteId=ORIGIN+'/#website', pageId=canonicalFor(r.path)+'#webpage';
  const graph=[
    {'@type':'Organization','@id':orgId,name:'MCPserver.in',url:ORIGIN+'/'},
    {'@type':'WebSite','@id':siteId,name:'MCPserver.in',url:ORIGIN+'/',publisher:{'@id':orgId}},
    {'@type': r.path==='/directory' ? 'CollectionPage':'WebPage','@id':pageId,name:r.title,description:r.description,url:canonicalFor(r.path),isPartOf:{'@id':siteId},publisher:{'@id':orgId}}
  ];
  if(r.path==='/') graph.push({'@type':'ItemList','@id':ORIGIN+'/#featured-servers',itemListElement:serverRecords.filter(isServerIndexable).slice(0,8).map((s,i)=>({'@type':'ListItem',position:i+1,url:canonicalFor('/servers/'+s.slug),name:s.title}))});
  if(r.kind==='server') graph.push({'@type':'SoftwareApplication','@id':canonicalFor(r.path)+'#software',name:r.item.title,description:r.item.description,softwareVersion:r.item.latestVerifiedVersion,applicationCategory:'DeveloperApplication',url:r.item.websiteUrl||r.item.repositoryUrl||r.item.sourceUrl});
  if(r.kind==='glossary') graph.push({'@type':'DefinedTerm','@id':canonicalFor(r.path)+'#term',name:r.item.title,description:r.item.description,inDefinedTermSet:ORIGIN+'/glossary'});
  if(['pillar','topic','research','blog'].includes(r.kind)) graph.push({'@type':'TechArticle','@id':canonicalFor(r.path)+'#article',headline:r.title,description:r.description,mainEntityOfPage:{'@id':pageId},publisher:{'@id':orgId},dateModified:SNAPSHOT_DATE});
  return {'@context':'https://schema.org','@graph':graph};
}

const CSS=`body{margin:0;background:#071018;color:#eef5ff;font:16px/1.6 Inter,system-ui,sans-serif}a{color:#8ed8ff}.wrap{max-width:1120px;margin:auto;padding:0 22px}.nav{border-bottom:1px solid #233447;background:#071018ee;position:sticky;top:0}.nav .wrap{display:flex;gap:22px;align-items:center;min-height:66px}.nav nav{display:flex;gap:16px;flex-wrap:wrap}.brand{font-weight:800;margin-right:auto}.hero{padding:80px 0 50px}.hero h1{font-size:clamp(42px,7vw,76px);line-height:1.02;margin:.2em 0}.lead{font-size:20px;color:#a9bbcc;max-width:820px}.notice,.card,.panel{border:1px solid #263a4d;background:#0c1722;border-radius:15px;padding:20px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.section{padding:42px 0}.muted{color:#9badbd}.badge{font-size:12px;border:1px solid #34506a;border-radius:99px;padding:4px 8px}.meta{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.footer{border-top:1px solid #233447;padding:35px 0 55px;color:#9badbd}.footer-links{display:flex;gap:10px 16px;flex-wrap:wrap;margin:14px 0}.related{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.related a{border:1px solid #263a4d;padding:12px;border-radius:10px;text-decoration:none}.kicker{text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:#7cd4ff}@media(max-width:760px){.grid,.related{grid-template-columns:1fr}.nav nav{display:none}}`;
const NAV=`<header class="nav"><div class="wrap"><a class="brand" href="/">MCPserver.in</a><nav>${link('/directory','Directory')}${link('/learn','Learn')}${link('/security','Security')}${link('/verification-methodology','Verification')}${link('/status','Status')}</nav></div></header>`;
const FOOT=`<footer class="footer"><div class="wrap"><strong>Explore MCPserver.in</strong><div class="footer-links">${link('/integrations','Integrations')}${link('/docs','Docs')}${link('/tools/mcp-playground','Playground')}${link('/state-of-mcp','State of MCP')}${link('/blog','Blog')}${link('/pricing','Availability')}${link('/about','About')}${link('/research/mcp-directories','Directory research')}${link('/hosting','Hosting')}${link('/editorial-policy','Editorial policy')}${link('/pillars/mcp-security','Security pillar')}${link('/glossary/mcp-client','MCP client glossary')}${link('/glossary/mcp-host','MCP host glossary')}${link('/compare/mcp-vs-rest','MCP vs REST')}</div><div>Independent MCP directory and developer knowledge platform. Registry snapshot: ${SNAPSHOT_DATE}. ${link('/privacy','Privacy')} · ${link('/terms','Terms')} · ${link('/contact','Contact')}</div></div></footer>`;

function cards(items){ return `<div class="grid">${items.map(s=>`<article class="card"><div class="meta"><span class="badge">${esc(s.category)}</span><span class="badge">${esc(s.verificationStatus)}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><p class="muted">Version ${esc(s.latestVerifiedVersion)} · Updated ${esc(s.updatedDate)}</p>${link('/servers/'+s.slug,'View verified record →')}</article>`).join('')}</div>`; }
function relatedHtml(path){ return `<section class="section"><h2>Related pages</h2><div class="related">${related(path).map(([h,l])=>link(h,l)).join('')}</div></section>`; }
function serverBody(r){ const s=r.item; return `<section class="hero"><p class="kicker">Official Registry record</p><h1>${esc(s.title)}</h1><p class="lead">${esc(s.description)}</p></section><section class="section"><div class="panel"><h2>Verified catalog facts</h2><dl><dt>Canonical registry name</dt><dd>${esc(s.name)}</dd><dt>Latest verified version in this snapshot</dt><dd>${esc(s.latestVerifiedVersion)}</dd><dt>Category</dt><dd>${esc(s.category)} <span class="muted">(MCPserver.in editorial taxonomy)</span></dd><dt>Capabilities represented by registry metadata</dt><dd>${esc(s.capabilities.join(', '))}</dd><dt>Verification status</dt><dd>${esc(s.verificationStatus)}</dd><dt>Snapshot updated</dt><dd>${esc(s.updatedDate)}</dd></dl><p>${link(s.sourceUrl,'Official Registry source')}</p>${s.repositoryUrl?`<p>${link(s.repositoryUrl,'Repository')}</p>`:''}${s.websiteUrl?`<p>${link(s.websiteUrl,'Publisher website')}</p>`:''}</div></section>${relatedHtml(r.path)}`; }
function directoryBody(){ const published=serverRecords.filter(isServerIndexable); const list = published.length ? cards(published) : `<div class="notice"><strong>No evidence-reviewed profiles are published yet.</strong> ${ledgerBadge(serverRecords)}. Records appear here only after they pass the Evidence Ledger review (published status + at least one evidence item). See <a href="/verification-methodology">verification methodology</a>.</div>`; return `<section class="hero"><p class="kicker">Registry-backed catalog</p><h1>MCP Server Directory</h1><p class="lead">${esc(ledgerBadge(serverRecords))}. The displayed count is derived from the dataset, not hand-authored marketing copy.</p></section><section class="section"><h2>Browse evidence-reviewed records</h2>${list}</section><section class="section"><h2>Categories derived from the same dataset</h2><div class="grid">${categoryRecords.map(c=>`<article class="card"><h3>${esc(c.name)}</h3><p>${c.count} record${c.count===1?'':'s'} in this snapshot.</p>${link('/categories/'+c.slug,'Open category →')}</article>`).join('')}</div></section>${relatedHtml('/directory')}`; }
function genericBody(r){
  if(r.kind==='directory') return directoryBody();
  if(r.kind==='server') return serverBody(r);
  if(r.kind==='category'){ const matches=serverRecords.filter(s=>s.category===r.item.name); const indexableMatches=matches.filter(isServerIndexable); return `<section class="hero"><p class="kicker">Dataset taxonomy</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)} This category contains ${matches.length} record${matches.length===1?'':'s'} in the ${SNAPSHOT_DATE} snapshot.</p></section><section class="section">${cards(indexableMatches)}</section>${relatedHtml(r.path)}`; }
  if(r.kind==='pricing'||r.kind==='hosting') return `<section class="hero"><p class="kicker">Availability</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)}</p></section><section class="section"><div class="notice"><strong>No purchasable hosted plan is represented as live here.</strong> Pricing, SLA, regional infrastructure, payment methods, and quotas will be published only after they are implemented and evidenced.</div></section>${relatedHtml(r.path)}`;
  if(r.kind==='status') return `<section class="hero"><p class="kicker">Operational transparency</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)}</p></section><section class="section"><div class="notice"><strong>This is not a live telemetry dashboard.</strong> No generated latency, uptime, request volume, cluster health, or regional performance values are displayed as measurements.</div></section>${relatedHtml(r.path)}`;
  if(r.kind==='security') return `<section class="hero"><p class="kicker">Security boundaries</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)}</p></section><section class="section"><div class="grid"><article class="card"><h2>Implemented on this site</h2><p>Canonical host controls, preview noindex headers, content-type protection, referrer policy, and evidence labeling.</p></article><article class="card"><h2>Recommended for MCP operators</h2><p>Least privilege, scoped credentials, sandboxing, audit trails, human approval for high-impact tools, and secret isolation.</p></article><article class="card"><h2>Not claimed</h2><p>MCPserver.in does not claim SOC 2, ISO certification, a service SLA, uptime percentage, or DPDP legal compliance without published evidence.</p></article></div></section>${relatedHtml(r.path)}`;
  if(r.kind==='home'){ const published=serverRecords.filter(isServerIndexable); const featured = published.length ? cards(published.slice(0,6)) : `<div class="notice"><strong>${esc(ledgerBadge(serverRecords))}.</strong> Evidence-reviewed profiles will appear here as they pass review. Source of truth: <a href="${REGISTRY_SOURCE}">Official MCP Registry API</a>.</div>`; return `<section class="hero"><p class="kicker">Evidence-backed MCP catalog</p><h1>MCP server discovery without invented metrics.</h1><p class="lead">${esc(ledgerBadge(serverRecords))} from the Official MCP Registry snapshot used by this production build. Unknown values stay unknown; commercial, certification, latency, and uptime claims are not invented.</p><p>${link('/directory','Browse the directory →')}</p></section><section class="section"><h2>Featured evidence-reviewed servers</h2>${featured}</section><section class="section"><div class="notice">Source of truth: <a href="${REGISTRY_SOURCE}">Official MCP Registry API</a>. The Official Registry is currently a preview service, so records are snapshot-dated and can change.</div></section>${relatedHtml('/')}`; }
  if(r.kind==='trust') return `<section class="hero"><p class="kicker">Trust & provenance</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)}</p></section><section class="section"><div class="panel"><h2>Production rule</h2><p>VERIFIED claims include a source. MEASURED claims include methodology and date. UNVERIFIED claims are removed or explicitly labeled as examples. UNKNOWN values are not filled by AI.</p><p>Catalog source: ${link(REGISTRY_SOURCE,'Official MCP Registry API')}. Snapshot date: ${SNAPSHOT_DATE}.</p></div></section>${relatedHtml(r.path)}`;
  if(r.kind==='glossary'){ const items=glossary.map(g=>`<article class="card"><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p>${link('/glossary/'+g.slug,'View glossary entry →')}</article>`); return `<section class="hero"><p class="kicker">Glossary</p><h1>MCP Glossary</p><p class="lead">Browse definitions of key MCP terms.</p></section><section class="section"><div class="grid">${items.join('')}</div></section>${relatedHtml(r.path)}`; }
  if(r.kind==='topic'){ const items=topics.map(t=>`<article class="card"><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p>${link('/topics/'+t.slug,'View topic →')}</article>`); return `<section class="hero"><p class="kicker">Topics</p><h1>MCP Topics</p><p class="lead">Explore key concepts and transports in the MCP ecosystem.</p></section><section class="section"><div class="grid">${items.join('')}</div></section>${relatedHtml(r.path)}`; }
  if(r.kind==='pillars'){
    const items=pillars.map(p=>`<article class="card"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${link('/pillars/'+p.slug,'View pillar →')}</article>`);
    return `<section class="hero"><p class="kicker">Pillars</p><h1>MCP Pillars</p><p class="lead">Explore the foundational pillars of the MCP ecosystem.</p></section><section class="section"><div class="grid">${items.join('')}</div></section>${relatedHtml(r.path)}`;
  }
  if(r.kind==='comparisons'){
    const items=comparisons.map(c=>`<article class="card"><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p>${link('/compare/'+c.slug,'View comparison →')}</article>`);
    return `<section class="hero"><p class="kicker">Comparisons</p><h1>MCP Comparisons</p><p class="lead">See how MCP stacks up against other protocols and approaches.</p></section><section class="section"><div class="grid">${items.join('')}</div></section>${relatedHtml(r.path)}`;
  }
  return `<section class="hero"><p class="kicker">MCP developer resource</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)}</p></section><section class="section"><div class="panel"><h2>Answer first</h2><p>${esc(r.description)}</p><p>This page intentionally avoids unsupported certification, regional latency, pricing, address, star-count, uptime, and live-monitoring claims.</p></div></section>${relatedHtml(r.path)}`;
}

export function renderHtml(path,host=''){
  const r=resolve(path); if(!r) return null;
  const m=metadata(path,host); const title=`${r.title} | MCPserver.in`; const schema=schemaFor(r);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(r.description)}"><meta name="robots" content="${m.robots}"><link rel="canonical" href="${m.canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="MCPserver.in"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(r.description)}"><meta property="og:url" content="${m.ogUrl}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(r.description)}"><script type="application/ld+json">${json(schema)}</script><style>${CSS}</style></head><body>${NAV}<main class="wrap">${genericBody(r)}</main>${FOOT}</body></html>`;
}

export function renderRegistryJson(){ const published=serverRecords.filter(isServerIndexable); return JSON.stringify({ source:REGISTRY_SOURCE, snapshotDate:SNAPSHOT_DATE, count:published.length, totalTracked:serverRecords.length, servers:published.map(publicServerRecord) },null,2); }
export function renderServersJson(){ return JSON.stringify(serverRecords.filter(isServerIndexable).map(publicServerRecord),null,2); }

export function allIndexablePaths(){ 
  const paths = [
    ...STATIC.map(r=>r.path),
    ...serverRecords.filter(isServerIndexable).map(s=>'/servers/'+s.slug),
    ...categoryRecords.map(c=>'/categories/'+c.slug),
    ...pillars.map(x=>'/pillars/'+x.slug),
    ...topics.map(x=>'/topics/'+x.slug),
    ...glossary.map(x=>'/glossary/'+x.slug),
    ...comparisons.map(x=>'/compare/'+x.slug),
    ...['/pillars', '/compare'],
  ];
  // Filter out redirect sources
  return paths.filter(path => !isRedirectSource(path)); 
}

export function renderSitemap(){ const urls=[...new Set(allIndexablePaths())]; return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(p=>`<url><loc>${esc(canonicalFor(p))}</loc><lastmod>${SNAPSHOT_DATE}</lastmod></url>`).join('')}</urlset>`; }
export function renderRobots(host=''){ if(normalizeHost(host)!==CANONICAL_HOST) return `User-agent: *\nDisallow: /\n`; return `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`; }
export function renderLlms(full=false){ const lines=[`# MCPserver.in`,`Canonical: ${ORIGIN}/`,`Registry source: ${REGISTRY_SOURCE}`,`Registry snapshot: ${SNAPSHOT_DATE}`,`Published catalog records: ${ledgerCounts(serverRecords).published}`,'','## Key pages','- /directory — registry-backed server directory','- /verification-methodology — evidence rules','- /security — security guidance and certification boundaries']; if(full){ const published=serverRecords.filter(isServerIndexable); lines.push('','## Servers',...published.map(s=>`- /servers/${s.slug} — ${s.title} ${s.latestVerifiedVersion}`)); } return lines.join('\n')+'\n'; }
