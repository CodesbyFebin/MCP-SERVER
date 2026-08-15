// Evidence Ledger v2 data layer.
//
// The records below are the live seed snapshot from the Official MCP Registry.
// To migrate to a provided dataset (e.g. a normalized export placed at
// src/data/SAFE_DEEP_REPORT.json), replace `servers` with the normalized array
// and ensure every record carries: slug, canonicalName, publicationStatus,
// evidence[], and verificationStatus. The rest of the site is data-driven and
// will recompute all counts, badge text, sitemap, and feeds from this array.
//
// No counts are hardcoded anywhere — they are derived in lib/indexability.mjs.

export const REGISTRY_SOURCE = 'https://registry.modelcontextprotocol.io/v0.1/servers';
export const SNAPSHOT_DATE = '2026-08-15';

// Default Evidence Ledger fields applied to every seed record. A record is only
// promoted to `published` when a real dataset supplies publicationStatus +
// evidence[]. Seed records start as `needs-evidence` with no evidence, so they
// are rendered for editors but excluded from the sitemap and public feeds.
const withLedgerDefaults = (server) => ({
  publicationStatus: 'needs-evidence',
  evidence: [],
  ...server
});

export const servers = [
  {
    name: 'ac.inference.sh/mcp',
    title: 'inference.sh',
    description: 'Run AI models and compose agent workflows through a remote MCP server.',
    category: 'AI Models',
    repositoryUrl: null,
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=ac.inference.sh%2Fmcp',
    websiteUrl: null,
    latestVerifiedVersion: '2.0.1',
    capabilities: ['streamable-http'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-07-27'
  },
  {
    name: 'ac.tandem/docs-mcp',
    title: 'Tandem Docs MCP',
    description: 'Remote MCP server for Tandem documentation, install guides, SDKs, workflows, and agent setup help.',
    category: 'Documentation',
    repositoryUrl: 'https://github.com/frumu-ai/tandem',
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=ac.tandem%2Fdocs-mcp',
    websiteUrl: 'https://tandem.ac/docs-mcp',
    latestVerifiedVersion: '0.3.2',
    capabilities: ['streamable-http'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-04-22'
  },
  {
    name: 'ag.hood/name-service',
    title: '.hood Name Service',
    description: 'Resolve .hood names on Robinhood Chain, including forward and reverse lookups, text records, availability, and pricing.',
    category: 'Blockchain',
    repositoryUrl: null,
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=ag.hood%2Fname-service',
    websiteUrl: 'https://www.hood.ag/docs',
    latestVerifiedVersion: '0.1.0',
    capabilities: ['streamable-http'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-07-10'
  },
  {
    name: 'agency.goji/goji',
    title: 'Goji',
    description: 'AEO, SEO, web, and brand answers sourced from the publisher’s glossary, guides, and pricing.',
    category: 'Marketing',
    repositoryUrl: 'https://github.com/goji-agency/website',
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=agency.goji%2Fgoji',
    websiteUrl: 'https://goji.agency',
    latestVerifiedVersion: '1.0.0',
    capabilities: ['streamable-http'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-08-03'
  },
  {
    name: 'agency.kesey/pretrip',
    title: 'Pre-Trip Compliance Scanner',
    description: 'Screen regulated-health marketing copy against source-cited rulesets.',
    category: 'Compliance',
    repositoryUrl: null,
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=agency.kesey%2Fpretrip',
    websiteUrl: 'https://scan.kesey.agency/developers/',
    latestVerifiedVersion: '1.0.1',
    capabilities: ['stdio', 'npm'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-07-26'
  },
  {
    name: 'agency.lona/trading',
    title: 'Lona Trading MCP',
    description: 'Trading strategy development with backtesting, market data, and portfolio analysis.',
    category: 'Finance',
    repositoryUrl: 'https://github.com/mindsightventures/lona',
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=agency.lona%2Ftrading',
    websiteUrl: 'https://lona.agency',
    latestVerifiedVersion: '2.0.0',
    capabilities: ['streamable-http'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-02-24'
  },
  {
    name: 'ai.abmeter/abmeter',
    title: 'ABMeter',
    description: 'Feature flagging and A/B testing with AI-first experimentation workflows.',
    category: 'Developer Tools',
    repositoryUrl: 'https://github.com/abmeter/abmeter',
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=ai.abmeter%2Fabmeter',
    websiteUrl: 'https://abmeter.ai',
    latestVerifiedVersion: '0.1.0',
    capabilities: ['streamable-http'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-04-19'
  },
  {
    name: 'ai.adeu/adeu',
    title: 'Adeu',
    description: 'Automated DOCX redlining engine exposed through an MCP package.',
    category: 'Documents',
    repositoryUrl: 'https://github.com/dealfluence/adeu',
    sourceUrl: 'https://registry.modelcontextprotocol.io/?q=ai.adeu%2Fadeu',
    websiteUrl: null,
    latestVerifiedVersion: '1.7.1',
    capabilities: ['stdio', 'npm'],
    verificationStatus: 'official-registry',
    updatedDate: '2026-05-16'
  }
];

export const slugify = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const serverRecords = servers.map(server => ({ ...server, slug: slugify(server.name) }));
export const categoryRecords = [...new Set(serverRecords.map(server => server.category))]
  .sort((a, b) => a.localeCompare(b))
  .map(name => ({ name, slug: slugify(name), count: serverRecords.filter(server => server.category === name).length }));

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
  updatedDate: server.updatedDate
});
