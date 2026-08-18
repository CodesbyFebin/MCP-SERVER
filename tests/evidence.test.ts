import { describe, it, expect } from 'vitest';
import { isPublicIndexable } from '@/lib/evidence';
import type { ServerRecord } from '@/types/server';

const makeRecord = (overrides: Partial<ServerRecord> = {}): ServerRecord => ({
  id: 'test',
  slug: 'test',
  name: 'Test',
  summary: 'Test summary',
  description: 'Test description',
  kind: 'server',
  publisher: null,
  maintainer: null,
  repositoryUrl: null,
  documentationUrl: null,
  registryUrl: null,
  homepageUrl: null,
  latestVerifiedVersion: null,
  transports: [],
  authentication: [],
  capabilities: [],
  categories: [],
  integrations: [],
  clients: [],
  installation: null,
  securityNotes: null,
  limitations: null,
  indiaRelevance: 'unknown',
  publicationStatus: 'published',
  verificationStatus: 'verified',
  evidence: [
    { id: 'e1', sourceUrl: 'https://example.com', sourceType: 'official', status: 'verified', capturedAt: '2026-08-18' },
  ],
  noindex: false,
  updatedAt: '2026-08-18',
  lastReviewedAt: '2026-08-18',
  ...overrides,
});

describe('isPublicIndexable', () => {
  it('returns true for published verified with evidence', () => {
    expect(isPublicIndexable(makeRecord())).toBe(true);
  });
  it('returns false for draft', () => {
    expect(isPublicIndexable(makeRecord({ publicationStatus: 'draft' }))).toBe(false);
  });
  it('returns false for unverified', () => {
    expect(isPublicIndexable(makeRecord({ verificationStatus: 'unverified' }))).toBe(false);
  });
  it('returns false for no evidence', () => {
    expect(isPublicIndexable(makeRecord({ evidence: [] }))).toBe(false);
  });
  it('returns false for noindex', () => {
    expect(isPublicIndexable(makeRecord({ noindex: true }))).toBe(false);
  });
});
