import test from 'node:test'; import assert from 'node:assert/strict';
import { buildPageMetadata } from '../lib/metadata.mjs'; import { resolveRobots } from '../lib/hostname-guard.mjs'; import { buildSitemapXml } from '../lib/sitemap.mjs';

test('canonical and og:url always match across route types',()=>{for(const p of ['/','/directory','/research/mcp-directories','/tools/mcp-playground']){const m=buildPageMetadata({path:p,title:'x',description:'y'});assert.equal(m.canonical,m.ogUrl);assert.ok(m.canonical.startsWith('https://www.mcpserver.in'))}});
test('indexable=false emits noindex',()=>{assert.equal(buildPageMetadata({path:'/x',title:'x',description:'y',indexable:false}).robots,'noindex, follow')});
test('non-canonical hosts fail closed to noindex',()=>{assert.equal(resolveRobots('mcpserver-in-v2.cyberteckmaster.chatgpt.site',true),'noindex, follow');assert.equal(resolveRobots('mcp-server-projects555.vercel.app',true),'noindex, follow');assert.equal(resolveRobots('',true),'noindex, follow')});
test('canonical host preserves page indexability and ports normalize',()=>{assert.equal(resolveRobots('www.mcpserver.in:443',true),'index, follow');assert.equal(resolveRobots('www.mcpserver.in:443',false),'noindex, follow')});
test('sitemap excludes redirect sources and non-indexable routes',()=>{const xml=buildSitemapXml([{path:'/',indexable:true},{path:'/directory',indexable:true},{path:'/alias',indexable:false,redirectTo:'/directory'}]);assert.match(xml,/\/directory/);assert.doesNotMatch(xml,/\/alias/)})
