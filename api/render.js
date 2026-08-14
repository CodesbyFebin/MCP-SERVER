import { REDIRECTS, normalizePath, renderHtml, renderLlms, renderRobots, renderSitemap, robotsFor } from '../lib/site.js';

export default function handler(req,res){
  const host=req.headers.host||'';
  const raw=Array.isArray(req.query?.path)?`/${req.query.path.join('/')}`:(req.query?.path||req.url||'/');
  const path=normalizePath(raw);

  if(REDIRECTS.has(path)){
    res.statusCode=308;
    res.setHeader('Location',REDIRECTS.get(path));
    res.setHeader('Cache-Control','public, max-age=0, s-maxage=3600');
    return res.end();
  }
  if(path==='/robots.txt'){
    res.statusCode=200;res.setHeader('Content-Type','text/plain; charset=utf-8');
    return res.end(renderRobots(host));
  }
  if(path==='/sitemap.xml'){
    res.statusCode=200;res.setHeader('Content-Type','application/xml; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=0, s-maxage=3600');
    return res.end(renderSitemap());
  }
  if(path==='/llms.txt'||path==='/llms-full.txt'){
    res.statusCode=200;res.setHeader('Content-Type','text/plain; charset=utf-8');
    return res.end(renderLlms(path==='/llms-full.txt'));
  }

  const html=renderHtml(path,host);
  if(!html){
    res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag','noindex, follow');
    return res.end('<!doctype html><html><head><meta name="robots" content="noindex, follow"><title>Not Found</title></head><body><h1>404</h1></body></html>');
  }
  const robots=robotsFor(host,true);
  res.statusCode=200;
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag',robots);
  res.setHeader('Cache-Control','public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
  return res.end(html);
}
