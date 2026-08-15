// Evidence Ledger v2 — indexability contract.
//
// Single source of truth for whether a server record may be indexed by search
// engines and listed in public machine-readable feeds. The predicate is
// intentionally conservative: a record is only indexable when it is explicitly
// published, carries at least one evidence item, and is not flagged
// `unverified`.
//
// NOTE: This module is data-driven. It does NOT hardcode counts. The "75
// entities tracked · 3 evidence-reviewed profiles published" style badge is
// computed from the real dataset at render time (see lib/site.js), so it can
// never drift from or exceed the actual records.

/**
 * Publication lifecycle states for a server record.
 * - `published`       — reviewed and cleared for public indexing.
 * - `needs-evidence`  — present in the ledger but not yet evidence-backed;
 *                        rendered for editors, blocked from crawlers.
 * - `draft`           — internal only.
 * @typedef {'published'|'needs-evidence'|'draft'} PublicationStatus
 */

/**
 * A single supporting evidence item attached to a record.
 * @typedef {Object} Evidence
 * @property {string} source         - Where the fact is verified (URL or registry id).
 * @property {string} [description]  - Human-readable note about what is evidenced.
 * @property {string} [capturedAt]   - ISO date the evidence was captured.
 */

/**
 * Server record shape consumed by the indexability predicate.
 * @typedef {Object} ServerRecord
 * @property {PublicationStatus} [publicationStatus]
 * @property {Evidence[]}       [evidence]
 * @property {string}           [verificationStatus]
 */

/**
 * isServerIndexable — the Evidence Ledger v2 gate.
 *
 * A server becomes indexable ONLY when:
 *   1. publicationStatus === 'published'
 *   2. evidence is a non-empty array
 *   3. verificationStatus !== 'unverified'
 *
 * @param {ServerRecord} server
 * @returns {boolean}
 */
export function isServerIndexable(server) {
  if (!server || typeof server !== 'object') return false;
  const published = server.publicationStatus === 'published';
  const hasEvidence = Array.isArray(server.evidence) && server.evidence.length > 0;
  const verified = server.verificationStatus !== 'unverified';
  return Boolean(published && hasEvidence && verified);
}

/**
 * Count helpers — derived, never hardcoded. Used by the directory badge and
 * public feeds so the displayed totals always match the dataset.
 *
 * @param {ServerRecord[]} servers
 * @returns {{ total: number, published: number, needsEvidence: number }}
 */
export function ledgerCounts(servers = []) {
  let published = 0;
  let needsEvidence = 0;
  for (const s of servers) {
    if (s.publicationStatus === 'published') published += 1;
    else if (s.publicationStatus === 'needs-evidence') needsEvidence += 1;
  }
  return { total: servers.length, published, needsEvidence };
}

/**
 * Directory badge string, computed from real counts.
 * @param {ServerRecord[]} servers
 * @returns {string}
 */
export function ledgerBadge(servers = []) {
  const { total, published } = ledgerCounts(servers);
  return `${total} entities tracked · ${published} evidence-reviewed profiles published`;
}
