export const CANONICAL_ORIGIN = 'https://www.mcpserver.in';

export function normalizePath(path = '/') {
  const clean = String(path).split(/[?#]/, 1)[0] || '/';
  if (clean === '/') return '/';
  return `/${clean.replace(/^\/+|\/+$/g, '')}`;
}

export function buildPageMetadata({ path = '/', title, description, indexable = true, image = '/og-default.png' }) {
  const pathname = normalizePath(path);
  const canonical = new URL(pathname, CANONICAL_ORIGIN).toString();
  return {
    path: pathname,
    title,
    description,
    canonical,
    ogUrl: canonical,
    image: new URL(image, CANONICAL_ORIGIN).toString(),
    robots: indexable ? 'index, follow' : 'noindex, follow'
  };
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderMetaTags(meta) {
  const robots = meta.robots;
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${meta.canonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="MCPserver.in">`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:url" content="${meta.ogUrl}">`,
    `<meta property="og:image" content="${meta.image}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="theme-color" content="#05070a">`
  ].join('\n    ');
}
