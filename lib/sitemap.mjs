import { CANONICAL_ORIGIN, normalizePath, escapeHtml } from './metadata.mjs';

export function buildSitemapXml(routes, lastmod = new Date().toISOString().slice(0, 10)) {
  const seen = new Set();
  const rows = [];
  for (const route of routes) {
    if (!route.indexable || route.redirectTo) continue;
    const path = normalizePath(route.path);
    const loc = new URL(path, CANONICAL_ORIGIN).toString();
    if (seen.has(loc)) throw new Error(`Duplicate sitemap URL: ${loc}`);
    seen.add(loc);
    rows.push(`  <url>\n    <loc>${escapeHtml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq || 'weekly'}</changefreq>\n    <priority>${route.priority ?? (path === '/' ? '1.0' : '0.8')}</priority>\n  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
}
