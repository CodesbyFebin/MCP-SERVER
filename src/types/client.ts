export interface ClientRecord {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  publisher: string | null;
  repositoryUrl: string | null;
  documentationUrl: string | null;
  homepageUrl: string | null;
  latestVerifiedVersion: string | null;
  transports: string[];
  authentication: string[];
  capabilities: string[];
  categories: string[];
  installation: string | null;
  securityNotes: string | null;
  limitations: string | null;
  publicationStatus: 'draft' | 'review' | 'published' | 'retired';
  verificationStatus: 'verified' | 'partial' | 'unverified';
  evidence: { id: string; sourceUrl: string; sourceType: string; status: string; capturedAt: string; notes?: string | null }[];
  noindex?: boolean;
  updatedAt: string;
  lastReviewedAt?: string;
}
