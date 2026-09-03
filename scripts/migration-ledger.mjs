// Migration Ledger — historical URL + GSC canonical recovery
// Phase 1 artifact for OMNI-LOOP production completion.
//
// Each record represents a historical URL with its GSC evidence and
// migration action. G7/G8/G9 blocker decisions applied.
//
// Fields (per G9):
//   historical_gsc_status: what GSC reported historically
//   publication_authority: editorial publication decision (isContentIndexable)
//   current_indexability: current indexable status
//   migration_action: KEEP | 301 | REBUILD | NOINDEX | 410 | REVIEW
//
// Historical GSC state must never control current publication authority.

/**
 * @typedef {Object} MigrationRecord
 * @property {string} historical_path
 * @property {string|null} proposed_destination
 * @property {string} historical_gsc_status
 * @property {string} publication_authority
 * @property {string} current_indexability
 * @property {string} migration_action
 * @property {string} reason
 * @property {string} evidence
 */

/** @type {MigrationRecord[]} */
export const MIGRATION_LEDGER = [
  // ─── G7: mcp-soc-2 / mcp-iso-27001 ─────────────────────────────
  {
    historical_path: '/glossary/mcp-soc-2',
    proposed_destination: null,
    historical_gsc_status: 'indexed',
    publication_authority: 'evidence-review',
    current_indexability: 'noindex',
    migration_action: 'REVIEW',
    reason: 'G7: Set to EVIDENCE_REVIEW. No generic redirect. Only assign 301 if exact equivalent canonical proven, else REBUILD or 410.',
    evidence: 'Semantic numeric path; protection contract requires explicit decision.'
  },
  {
    historical_path: '/glossary/mcp-iso-27001',
    proposed_destination: null,
    historical_gsc_status: 'indexed',
    publication_authority: 'evidence-review',
    current_indexability: 'noindex',
    migration_action: 'REVIEW',
    reason: 'G7: Set to EVIDENCE_REVIEW. No generic redirect. Only assign 301 if exact equivalent canonical proven, else REBUILD or 410.',
    evidence: 'Semantic numeric path; protection contract requires explicit decision.'
  },

  // ─── G8: /directory/* subcategory URLs ─────────────────────────
  {
    historical_path: '/directory/iot',
    proposed_destination: null,
    historical_gsc_status: 'discovered-not-indexed',
    publication_authority: 'review',
    current_indexability: 'pending',
    migration_action: 'REVIEW',
    reason: 'G8: Initial action REVIEW. Map one-hop to equivalent category if exists, otherwise preserve/rebuild rather than mass-redirect to /servers/.',
    evidence: 'No equivalent /categories/iot found in current registry. Awaiting evidence.'
  },
  {
    historical_path: '/directory/databases',
    proposed_destination: null,
    historical_gsc_status: 'discovered-not-indexed',
    publication_authority: 'review',
    current_indexability: 'pending',
    migration_action: 'REVIEW',
    reason: 'G8: Initial action REVIEW. Map one-hop to equivalent category if exists, otherwise preserve/rebuild rather than mass-redirect to /servers/.',
    evidence: 'No equivalent /categories/databases found in current registry. Awaiting evidence.'
  },
  {
    historical_path: '/directory/devops',
    proposed_destination: null,
    historical_gsc_status: 'discovered-not-indexed',
    publication_authority: 'review',
    current_indexability: 'pending',
    migration_action: 'REVIEW',
    reason: 'G8: Initial action REVIEW. Map one-hop to equivalent category if exists, otherwise preserve/rebuild rather than mass-redirect to /servers/.',
    evidence: 'No equivalent /categories/devops found in current registry. Awaiting evidence.'
  },
  {
    historical_path: '/directory/monitoring',
    proposed_destination: null,
    historical_gsc_status: 'discovered-not-indexed',
    publication_authority: 'review',
    current_indexability: 'pending',
    migration_action: 'REVIEW',
    reason: 'G8: Initial action REVIEW. Map one-hop to equivalent category if exists, otherwise preserve/rebuild rather than mass-redirect to /servers/.',
    evidence: 'No equivalent /categories/monitoring found in current registry. Awaiting evidence.'
  }
];

/**
 * Get migration record by historical path.
 * @param {string} path
 * @returns {MigrationRecord|null}
 */
export function getMigrationRecord(path) {
  return MIGRATION_LEDGER.find(r => r.historical_path === path) || null;
}

/**
 * Check if a path is in the migration ledger.
 * @param {string} path
 * @returns {boolean}
 */
export function isInMigrationLedger(path) {
  return MIGRATION_LEDGER.some(r => r.historical_path === path);
}

/**
 * Get migration action for a path.
 * @param {string} path
 * @returns {string|null}
 */
export function getMigrationAction(path) {
  const record = getMigrationRecord(path);
  return record ? record.migration_action : null;
}