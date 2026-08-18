import type { PublicRecordBase, EvidenceRecord } from './evidence';

export interface ServerRecord extends PublicRecordBase {
  kind: 'server';
  publisher: string | null;
  maintainer: string | null;
  repositoryUrl: string | null;
  documentationUrl: string | null;
  registryUrl: string | null;
  homepageUrl: string | null;
  latestVerifiedVersion: string | null;
  transports: string[];
  authentication: string[];
  capabilities: string[];
  categories: string[];
  integrations: string[];
  clients: string[];
  installation: string | null;
  securityNotes: string | null;
  limitations: string | null;
  indiaRelevance: 'publisher' | 'hosting' | 'integration' | 'compliance-context' | 'documentation' | 'community' | 'none' | 'unknown';
}
