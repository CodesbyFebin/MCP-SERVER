export const CANONICAL_HOSTS = new Set(['www.mcpserver.in', 'mcpserver.in']);

export function normalizeHost(host) {
  return String(host || '').trim().toLowerCase().split(':')[0];
}

export function resolveRobots(host, pageIndexable = true) {
  const normalized = normalizeHost(host);
  if (!CANONICAL_HOSTS.has(normalized)) return 'noindex, follow';
  return pageIndexable ? 'index, follow' : 'noindex, follow';
}

export function isCanonicalHost(host) {
  return CANONICAL_HOSTS.has(normalizeHost(host));
}
