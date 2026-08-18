export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  checklist: string[];
  relatedPillars: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const topics: Topic[] = [
  {
    id: 'mcp-basics',
    slug: 'mcp-basics',
    title: 'Getting Started with MCP',
    description: 'Learn the fundamentals of the Model Context Protocol, including setup, basic concepts, and your first integration.',
    checklist: [
      'Understand the MCP architecture and client-server model',
      'Install an MCP client (Claude Desktop, Cursor, or Continue)',
      'Configure your first MCP server connection',
      'Test a basic tool invocation',
      'Explore available resources and prompts',
    ],
    relatedPillars: ['mcp-overview'],
    difficulty: 'beginner',
  },
  {
    id: 'mcp-security',
    slug: 'mcp-security',
    title: 'MCP Security Best Practices',
    description: 'Implement security controls for MCP deployments including authentication, authorization, and input validation.',
    checklist: [
      'Review the MCP security model',
      'Implement OAuth 2.0 or API key authentication',
      'Set up input validation and sanitization',
      'Configure rate limiting and monitoring',
      'Audit tool permissions and access controls',
    ],
    relatedPillars: ['mcp-overview', 'mcp-architecture'],
    difficulty: 'intermediate',
  },
];
