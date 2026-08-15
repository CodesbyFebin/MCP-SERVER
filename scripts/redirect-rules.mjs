// Redirect mapping for the legacy mcpserver.in → new canonical mcpserver.in migration.
//
// Every OLD URL from the Google Search Console inventory is mapped to the
// CLOSEST EXISTING route on the new canonical site. We never invent URLs: the
// destinations below are all real routes defined in lib/site.js / vercel.json.
//
// IMPORTANT: the new site only serves a small set of real sub-routes. To avoid
// clobbering those real pages, redirects are emitted as EXPLICIT per-URL rules
// (one per old URL) by scripts/build-redirects.mjs — never as broad `/x/:slug*`
// wildcards, which would also catch the new site's own live sub-pages.

// Index routes that already exist on the new canonical site. An old URL that
// resolves to one of these needs NO redirect (it already is the canonical).
export const NEW_INDEX_ROUTES = new Set([
  '/',
  '/directory',
  '/integrations',
  '/clients',
  '/docs',
  '/tools/mcp-playground',
  '/what-is-mcp',
  '/learn',
  '/security',
  '/state-of-mcp',
  '/blog',
  '/pricing',
  '/about',
  '/contact',
  '/research/mcp-directories',
  '/status',
  '/hosting',
  '/editorial-policy',
  '/verification-methodology',
  '/privacy',
  '/terms'
]);

// Real dynamic sub-routes that DO exist on the new site. Map an old URL here
// only when its slug exactly matches one of these.
const NEW_SERVER_SLUGS = new Set([
  'ac-inference-sh-mcp', 'ac-tandem-docs-mcp', 'ag-hood-name-service',
  'agency-goji-goji', 'agency-kesey-pretrip', 'agency-lona-trading',
  'ai-abmeter-abmeter', 'ai-adeu-adeu'
]);
const NEW_COMPARE_SLUGS = new Set(['mcp-vs-rest']);
const NEW_TOOL_SLUGS = new Set(['mcp-playground']);
const NEW_RESEARCH_SLUGS = new Set(['mcp-directories']);
const NEW_GLOSSARY_SLUGS = new Set(['mcp-server', 'mcp-client', 'mcp-host']);
const NEW_TOPIC_SLUGS = new Set(['streamable-http', 'stdio-transport']);

export function normalizePath(path = '/') {
  const clean = String(path).split(/[?#]/, 1)[0] || '/';
  if (clean === '/') return '/';
  return `/${clean.replace(/^\/+|\/+$/g, '')}`;
}

/**
 * Map an old URL path to its new canonical destination.
 * @param {string} rawPath - pathname from an old mcpserver.in URL.
 * @returns {string|null} destination path, or null if no redirect is needed.
 */
export function mapOldToNew(rawPath) {
  const path = normalizePath(rawPath);
  if (path === '/') return null;                       // root handled by host canonical
  if (NEW_INDEX_ROUTES.has(path)) return null;         // already canonical

  const segments = path.split('/').filter(Boolean);
  const top = '/' + (segments[0] || '');
  const slug = segments[1] || '';

  switch (top) {
    case '/blog':
    case '/docs':
    case '/clients':
    case '/integrations':
    case '/security':
      return top;                                       // index exists on new site

    case '/servers':
    case '/directory':
    case '/categories':
    case '/databases':
    case '/best':
    case '/official-mcp-servers':
    case '/mcp-marketplace':
    case '/mcp-marketplaces':
    case '/mcp-categories':
    case '/mcp-list':
      return '/directory';                             // catalog parent

    case '/compare':
      return NEW_COMPARE_SLUGS.has(slug) ? `/compare/${slug}` : '/learn';
    case '/glossary':
      return NEW_GLOSSARY_SLUGS.has(slug) ? `/glossary/${slug}` : '/learn';
    case '/tools':
      return NEW_TOOL_SLUGS.has(slug) ? `/tools/${slug}` : '/learn';
    case '/research':
      return NEW_RESEARCH_SLUGS.has(slug) ? `/research/${slug}` : '/learn';
    case '/topics':
    case '/pillars':
      return '/learn';
    case '/deployment':
    case '/frameworks':
    case '/sdk':
    case '/community':
    case '/authors':
      return '/learn';
    case '/api':
    case '/sitemap':
      return '/';                                      // blocked/special → root
    case '/enterprise':
    case '/enterprise-mcp':
    case '/features':
    case '/mcp-india':
      return '/learn';
    default:
      // Any other top-level /mcp-* informational page → learning hub.
      if (top.startsWith('/mcp-')) return '/learn';
      return '/learn';                                 // safe informational fallback
  }
}

// Destinations that are valid new-site routes (used by the verifier).
export const VALID_DESTINATIONS = new Set([
  ...NEW_INDEX_ROUTES,
  '/directory', '/learn', '/',
  ...[...NEW_SERVER_SLUGS].map(s => `/servers/${s}`),
  ...[...NEW_COMPARE_SLUGS].map(s => `/compare/${s}`),
  ...[...NEW_TOOL_SLUGS].map(s => `/tools/${s}`),
  ...[...NEW_RESEARCH_SLUGS].map(s => `/research/${s}`),
  ...[...NEW_GLOSSARY_SLUGS].map(s => `/glossary/${s}`),
  ...[...NEW_TOPIC_SLUGS].map(s => `/topics/${s}`)
]);
