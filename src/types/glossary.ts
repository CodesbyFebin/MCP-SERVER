export interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  definition: string;
  relatedTerms: string[];
  publicationStatus: 'draft' | 'review' | 'published' | 'retired';
  verificationStatus: 'verified' | 'partial' | 'unverified';
  evidence: { id: string; sourceUrl: string; sourceType: string; status: string; capturedAt: string; notes?: string | null }[];
  noindex?: boolean;
  updatedAt: string;
  lastReviewedAt?: string;
}
