export const SITE = {
  name: 'MCPserver.in',
  origin: 'https://www.mcpserver.in',
  hostname: 'www.mcpserver.in',
  defaultLocale: 'en-IN',
  protocolName: 'Model Context Protocol',
} as const;

export function canonicalUrl(pathname: string): string {
  const normalized = normalizePath(pathname);
  if (normalized === '/') return `${SITE.origin}/`;
  return `${SITE.origin}${normalized}`;
}

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export function isCanonicalHost(hostname: string | undefined): boolean {
  if (!hostname) return false;
  const lower = hostname.toLowerCase();
  return lower === SITE.hostname || lower === `www.${SITE.hostname}`;
}
