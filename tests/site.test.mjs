import test from 'node:test';
import assert from 'node:assert/strict';
import {ORIGIN,ROUTES,REDIRECTS,metadata,renderHtml,renderSitemap,robotsFor} from '../lib/site.js';

test('canonical and og:url always match across indexable routes',()=>{for(const r of ROUTES){const m=metadata(r.path,'www.mcpserver.in');assert.equal(m.canonical,m.ogUrl,r.path);assert.ok(m.canonical.startsWith(ORIGIN))}});
test('preview and unknown hosts fail closed to noindex',()=>{assert.equal(robotsFor('www.mcpserver.in'),'index, follow');assert.equal(robotsFor('mcp-server-projects555.vercel.app'),'noindex, follow');assert.equal(robotsFor('mcpserver-in-v2.cyberteckmaster.chatgpt.site'),'noindex, follow');assert.equal(robotsFor(''),'noindex, follow')});
test('research page includes og:url',()=>{const m=metadata('/research/mcp-directories','www.mcpserver.in');const html=renderHtml(m.path,'www.mcpserver.in');assert.equal(m.canonical,`${ORIGIN}/research/mcp-directories`);assert.match(html,/property="og:url" content="https:\/\/www\.mcpserver\.in\/research\/mcp-directories"/)});
test('redirect source is excluded from sitemap',()=>{assert.equal(REDIRECTS.get('/mcp-server-directory'),'/directory');assert.equal(ROUTES.some(r=>r.path==='/mcp-server-directory'),false);assert.doesNotMatch(renderSitemap(),/mcp-server-directory/)});
test('sitemap contains exactly 20 unique canonical URLs',()=>{const urls=[...renderSitemap().matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,20);assert.equal(new Set(urls).size,20);assert.ok(urls.every(u=>u.startsWith(ORIGIN)))});
