export type EvidenceStatus = 'verified' | 'measured' | 'unverified' | 'unknown';
export type EvidenceSourceType = 'official' | 'registry' | 'repository' | 'documentation' | 'measurement' | 'editorial';

export interface EvidenceRecord {
  id: string;
  sourceUrl: string;
  sourceType: EvidenceSourceType;
  publisher?: string | null;
  status: EvidenceStatus;
  capturedAt: string;
  notes?: string | null;
}

export type VerificationStatus = 'verified' | 'partial' | 'unverified';
export type PublicationStatus = 'draft' | 'review' | 'published' | 'retired';

export interface PublicRecordBase {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  publicationStatus: PublicationStatus;
  verificationStatus: VerificationStatus;
  evidence: EvidenceRecord[];
  noindex?: boolean;
  updatedAt: string;
  lastReviewedAt?: string;
}
