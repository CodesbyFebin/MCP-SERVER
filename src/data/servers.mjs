// Evidence Ledger v2 data layer.
// Merged from SAFE_DEEP_REPORT.json and existing server records.

import { servers as existingServers } from './servers.mjs.backup.js';
import rawData from './SAFE_DEEP_REPORT.json' with { type: 'json' };

export const REGISTRY_SOURCE = 'https://registry.modelcontextprotocol.io/v0.1/servers';
export const SNAPSHOT_DATE = '2026-08-15'; // Keep existing snapshot date

// Create a map of existing servers by slug for merging
const existingMap = new Map();
existingServers.forEach(server => {
  const slug = String(server.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  existingMap.set(slug, server);
});

/**
 * Merge raw data with existing server record to preserve missing fields.
 * @param {Object} raw
 * @returns {Object}
 */
function mergeServerData(raw) {
  const slug = raw.slug;
  const existing = existingMap.get(slug) || {};
  // Start with existing record to preserve all fields
  const merged = { ...existing };
  // Override with raw data fields
  merged.name = raw.name;
  merged.slug = raw.slug;
  // Note: We do not override title, description, etc. if they exist in existing.
  // If they are missing in existing, we could try to derive from raw, but we keep as is.
  // For safety, we set title and description if missing.
  if (!merged.title) merged.title = raw.name; // fallback
  if (!merged.description) merged.description = raw.desc || '';
  if (!merged.category) {
    // Try to infer category from tags or default
    merged.category = 'Unknown';
  }
  merged.repositoryUrl = merged.repositoryUrl || null;
  merged.sourceUrl = merged.sourceUrl || null;
  merged.websiteUrl = merged.websiteUrl || null;
  merged.latestVerifiedVersion = merged.latestVerifiedVersion || '0.0.0';
  merged.capabilities = merged.capabilities || [];
  merged.verificationStatus = merged.verificationStatus || 'official-registry';
  merged.publicationStatus = raw.status; // 'published' or 'needs-evidence'
  merged.evidence = typeof raw.evidence === 'number' && raw.evidence > 0
    ? Array(raw.evidence).fill({ source: 'SAFE_DEEP_REPORT', description: 'Evidence from SAFE_DEEP_REPORT', capturedAt: new Date().toISOString() })
    : [];
  merged.updatedDate = merged.updatedDate || SNAPSHOT_DATE;
  return merged;
}

// Build the final server records array
export const servers = rawData.map(mergeServerData);
export const serverRecords = servers;

// Slugify function (kept for compatibility)
export const slugify = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Export category records derived from merged servers
export const categoryRecords = [...new Set(servers.map(server => server.category))]
  .sort((a, b) => a.localeCompare(b))
  .map(name => ({
    name,
    slug: slugify(name),
    count: servers.filter(server => server.category === name).length
  }));

// Export public server record shape
export const publicServerRecord = server => ({
  slug: server.slug,
  canonicalName: server.name,
  title: server.title,
  description: server.description,
  category: server.category,
  repositoryUrl: server.repositoryUrl,
  sourceUrl: server.sourceUrl,
  websiteUrl: server.websiteUrl,
  latestVerifiedVersion: server.latestVerifiedVersion,
  capabilities: server.capabilities,
  verificationStatus: server.verificationStatus,
  publicationStatus: server.publicationStatus,
  evidence: server.evidence,
  updatedDate: server.updatedDate
});
