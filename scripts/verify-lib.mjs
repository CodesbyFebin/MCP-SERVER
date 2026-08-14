import { allIndexablePaths, renderHtml, renderSitemap, renderRegistryJson } from '../lib/site.js';

export const canonicalHost='www.mcpserver.in';
export const previewHost='mcp-server-git-main-projects555.vercel.app';
export const paths=allIndexablePaths();
export const fail=(message)=>{throw new Error(message)};
export const html=(path,host=canonicalHost)=>{const value=renderHtml(path,host);if(!value)fail(`Route did not render: ${path}`);return value};
export const attr=(markup,name)=>{const re=new RegExp(`${name}=["']([^"']+)["']`,'i');return markup.match(re)?.[1]||null};
export const canonical=(markup)=>markup.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]||null;
export const ogUrl=(markup)=>markup.match(/<meta property="og:url" content="([^"]+)"/i)?.[1]||null;
export const robots=(markup)=>markup.match(/<meta name="robots" content="([^"]+)"/i)?.[1]||null;
export const jsonLd=(markup)=>[...markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]));
export const links=(markup)=>[...markup.matchAll(/href="(\/[^"]*)"/g)].map(m=>m[1].split('#')[0]);
export const sitemapPaths=()=>[...renderSitemap().matchAll(/<loc>https:\/\/www\.mcpserver\.in([^<]*)<\/loc>/g)].map(m=>m[1]||'/');
export const registry=()=>JSON.parse(renderRegistryJson());
