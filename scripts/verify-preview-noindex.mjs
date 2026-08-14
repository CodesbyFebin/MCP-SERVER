import { readFile } from 'node:fs/promises';
import { html, robots, previewHost, canonicalHost } from './verify-lib.mjs';
const config=JSON.parse(await readFile('vercel.json','utf8'));
const guard=(config.headers||[]).find(rule=>Array.isArray(rule.missing)&&rule.missing.some(x=>x.type==='host'&&x.value==='www.mcpserver.in')&&Array.isArray(rule.headers)&&rule.headers.some(h=>h.key.toLowerCase()==='x-robots-tag'&&/noindex, follow/i.test(h.value)));
if(!guard) throw new Error('Missing noncanonical-host X-Robots-Tag guard');
if(robots(html('/',canonicalHost))!=='index, follow') throw new Error('Canonical host must be indexable');
if(robots(html('/',previewHost))!=='noindex, follow') throw new Error('Preview HTML meta robots must be noindex, follow');
console.log('verify-preview-noindex: canonical index + preview meta/header noindex passed');
