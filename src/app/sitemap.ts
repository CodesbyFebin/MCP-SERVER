import { MetadataRoute } from 'next';
import { SITE, canonicalUrl } from '@/config/site';
import { servers } from '@/data/servers';
import { isPublicIndexable } from '@/lib/evidence';

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'daily' as const },
  { path: '/servers', priority: 0.9, changefreq: 'daily' as const },
  { path: '/integrations', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/clients', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/docs', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/docs/getting-started', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/docs/protocol', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/docs/protocol/json-rpc', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/docs/protocol/tools', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/docs/protocol/resources', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/docs/protocol/prompts', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/docs/transports', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/docs/security', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/learn', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/learn/what-is-mcp', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/learn/mcp-server', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/learn/mcp-client', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/learn/mcp-host', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/security', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/methodology', priority: 0.5, changefreq: 'monthly' as const },
  { path: '/editorial-policy', priority: 0.5, changefreq: 'monthly' as const },
  { path: '/evidence', priority: 0.5, changefreq: 'monthly' as const },
  { path: '/glossary', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/about', priority: 0.5, changefreq: 'monthly' as const },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(route => ({
    url: canonicalUrl(route.path),
    lastModified: new Date('2026-08-18'),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  const serverEntries: MetadataRoute.Sitemap = servers
    .filter(isPublicIndexable)
    .map(server => ({
      url: canonicalUrl(`/servers/${server.slug}`),
      lastModified: new Date(server.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const glossaryEntries: MetadataRoute.Sitemap = [
    { path: '/glossary/mcp', lastmod: '2026-08-18' },
    { path: '/glossary/json-rpc', lastmod: '2026-08-18' },
    { path: '/glossary/tool', lastmod: '2026-08-18' },
    { path: '/glossary/resource', lastmod: '2026-08-18' },
    { path: '/glossary/prompt', lastmod: '2026-08-18' },
  ].map(entry => ({
    url: canonicalUrl(entry.path),
    lastModified: new Date(entry.lastmod),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = [
    { path: '/blog/evidence-first-indexing', lastmod: '2026-08-18' },
    { path: '/blog/canonical-architecture', lastmod: '2026-08-18' },
  ].map(entry => ({
    url: canonicalUrl(entry.path),
    lastModified: new Date(entry.lastmod),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...serverEntries, ...glossaryEntries, ...blogEntries];
}
