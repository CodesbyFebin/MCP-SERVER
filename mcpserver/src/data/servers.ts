export interface ServerRecord {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  repositoryUrl: string;
  sourceUrl: string;
  websiteUrl?: string;
  latestVerifiedVersion: string;
  capabilities: string[];
  verificationStatus: 'verified' | 'unverified' | 'community';
  updatedDate: string;
  tags: string[];
}

export const servers: ServerRecord[] = [
  {
    id: 'github',
    name: 'github',
    title: 'GitHub MCP Server',
    description: 'Interact with GitHub repositories, issues, pull requests, and code directly through MCP.',
    category: 'devtools',
    repositoryUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    sourceUrl: 'https://github.com/modelcontextprotocol/servers',
    websiteUrl: 'https://github.com',
    latestVerifiedVersion: '1.0.0',
    capabilities: ['repo-management', 'issues', 'pull-requests', 'code-search'],
    verificationStatus: 'verified',
    updatedDate: '2026-08-15',
    tags: ['git', 'version-control', 'api'],
  },
  {
    id: 'postgres',
    name: 'postgres',
    title: 'PostgreSQL MCP Server',
    description: 'Query and manage PostgreSQL databases with type-safe SQL generation and schema inspection.',
    category: 'databases',
    repositoryUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    sourceUrl: 'https://github.com/modelcontextprotocol/servers',
    websiteUrl: 'https://postgresql.org',
    latestVerifiedVersion: '1.0.0',
    capabilities: ['query', 'schema-inspection', 'migration', 'transaction'],
    verificationStatus: 'verified',
    updatedDate: '2026-08-15',
    tags: ['sql', 'database', 'relational'],
  },
  {
    id: 'slack',
    name: 'slack',
    title: 'Slack MCP Server',
    description: 'Send messages, read channels, and manage Slack workspace communications programmatically.',
    category: 'communication',
    repositoryUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
    sourceUrl: 'https://github.com/modelcontextprotocol/servers',
    websiteUrl: 'https://slack.com',
    latestVerifiedVersion: '1.0.0',
    capabilities: ['messaging', 'channels', 'users', 'search'],
    verificationStatus: 'verified',
    updatedDate: '2026-08-15',
    tags: ['chat', 'messaging', 'team'],
  },
  {
    id: 'google-drive',
    name: 'google-drive',
    title: 'Google Drive MCP Server',
    description: 'Browse, upload, download, and manage files in Google Drive with full permissions support.',
    category: 'storage',
    repositoryUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/google-drive',
    sourceUrl: 'https://github.com/modelcontextprotocol/servers',
    websiteUrl: 'https://drive.google.com',
    latestVerifiedVersion: '1.0.0',
    capabilities: ['file-browse', 'upload', 'download', 'sharing'],
    verificationStatus: 'verified',
    updatedDate: '2026-08-15',
    tags: ['files', 'cloud', 'storage'],
  },
  {
    id: 'notion',
    name: 'notion',
    title: 'Notion MCP Server',
    description: 'Read and write Notion pages, databases, and blocks with rich content support.',
    category: 'productivity',
    repositoryUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/notion',
    sourceUrl: 'https://github.com/modelcontextprotocol/servers',
    websiteUrl: 'https://notion.so',
    latestVerifiedVersion: '1.0.0',
    capabilities: ['pages', 'databases', 'blocks', 'search'],
    verificationStatus: 'verified',
    updatedDate: '2026-08-15',
    tags: ['notes', 'wiki', 'productivity'],
  },
];

export const serverRecords = servers.map(s => ({
  ...s,
  slug: s.id,
}));
