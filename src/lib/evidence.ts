import type { PublicRecordBase, EvidenceRecord, VerificationStatus, PublicationStatus } from '@/types/evidence';

export function isPublicIndexable(record: PublicRecordBase): boolean {
  return (
    record.publicationStatus === 'published' &&
    (record.verificationStatus === 'verified' || record.verificationStatus === 'partial') &&
    record.evidence.some(e => e.status === 'verified' || e.status === 'measured') &&
    record.noindex !== true
  );
}

export function assertEvidence(record: PublicRecordBase): void {
  if (!record.evidence || record.evidence.length === 0) {
    throw new Error(`Record ${record.id} has no evidence`);
  }
  const hasValid = record.evidence.some(e => e.status === 'verified' || e.status === 'measured');
  if (!hasValid) {
    throw new Error(`Record ${record.id} has no verified/measured evidence`);
  }
}
