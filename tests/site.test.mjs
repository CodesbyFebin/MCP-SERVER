import test from 'node:test';
import assert from 'node:assert/strict';
import { ORIGIN, REDIRECTS, metadata, renderHtml, renderSitemap, robotsFor, allIndexablePaths, renderRegistryJson } from '../lib/site.js';

test('canonical and og:url always match across indexable routes',()=>{
  for(const path of allIndexablePaths()){
    const m=metadata(path,'www.mcpserver.in');
    assert.ok(m,path);
    assert.equal(m.canonical,m.ogUrl,path);
    assert.ok(m.canonical.startsWith(ORIGIN));
  }
});

test('preview and unknown hosts fail closed to noindex',()=>{
  assert.equal(robotsFor('www.mcpserver.in'),'index, follow');
  assert.equal(robotsFor('mcp-server-projects555.vercel.app'),'noindex, follow');
  assert.equal(robotsFor(''),'noindex, follow');
  assert.match(renderHtml('/','mcp-server-projects555.vercel.app'),/<meta name="robots" content="noindex, follow">/);
});

test('research page includes og:url',()=>{
  const m=metadata('/research/mcp-directories','www.mcpserver.in');
  const html=renderHtml(m.path,'www.mcpserver.in');
  assert.equal(m.canonical,`${ORIGIN}/research/mcp-directories`);
  assert.match(html,/property="og:url" content="https:\/\/www\.mcpserver\.in\/research\/mcp-directories"/);
});

test('redirect source is excluded from sitemap',()=>{
  assert.equal(REDIRECTS.get('/mcp-server-directory'),'/directory');
  assert.doesNotMatch(renderSitemap(),/mcp-server-directory/);
});

test('sitemap exactly matches the unique indexable route set',()=>{
  const urls=[...renderSitemap().matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert.equal(urls.length,new Set(allIndexablePaths()).size);
  assert.equal(new Set(urls).size,urls.length);
  assert.ok(urls.every(u=>u.startsWith(ORIGIN)));
});

test('machine-readable registry contains derived count and required fields',()=>{
  const payload=JSON.parse(renderRegistryJson());
  assert.equal(payload.count,payload.servers.length);
  assert.ok(payload.servers.length>0);
  for(const server of payload.servers){
    for(const key of ['slug','canonicalName','description','category','sourceUrl','latestVerifiedVersion','capabilities','verificationStatus','updatedDate']) assert.ok(key in server,`${server.slug}: ${key}`);
  }
});
