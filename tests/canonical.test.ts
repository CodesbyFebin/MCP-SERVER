import { describe, it, expect } from 'vitest';
import { canonicalUrl, normalizePath, isCanonicalHost, SITE } from '@/config/site';

describe('canonical helpers', () => {
  it('normalizes trailing slash', () => {
    expect(normalizePath('/servers/')).toBe('/servers');
  });
  it('returns root for empty path', () => {
    expect(normalizePath('')).toBe('/');
  });
  it('builds canonical URL for root', () => {
    expect(canonicalUrl('/')).toBe(`${SITE.origin}/`);
  });
  it('builds canonical URL for nested path', () => {
    expect(canonicalUrl('/servers/github')).toBe(`${SITE.origin}/servers/github`);
  });
  it('recognizes canonical host', () => {
    expect(isCanonicalHost('www.mcpserver.in')).toBe(true);
  });
  it('rejects non-canonical host', () => {
    expect(isCanonicalHost('mcp-servers-three.vercel.app')).toBe(false);
  });
});
