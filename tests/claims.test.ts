import { describe, it, expect } from 'vitest';
import { scanClaims } from '@/lib/claims';

describe('scanClaims', () => {
  it('detects banned latency claim', () => {
    expect(scanClaims('sub-12ms latency')).toContain('sub-12ms');
  });
  it('detects banned uptime claim', () => {
    expect(scanClaims('99.99% uptime')).toContain('99.99% uptime');
  });
  it('returns empty for clean text', () => {
    expect(scanClaims('MCP servers directory')).toHaveLength(0);
  });
});
