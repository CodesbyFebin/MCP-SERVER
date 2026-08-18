export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQ[] = [
  {
    id: 'what-is-mcp',
    question: 'What is the Model Context Protocol (MCP)?',
    answer: 'MCP is an open standard that enables AI assistants to securely connect to data sources and tools. It standardizes how AI applications communicate with external systems through a universal interface for tool invocation, resource access, and prompt management.',
    category: 'general',
  },
  {
    id: 'how-to-use-mcp',
    question: 'How do I start using MCP?',
    answer: 'Start by installing an MCP-compatible client like Claude Desktop or Cursor. Then configure your first MCP server by adding its configuration to your client settings. Many servers are available in our directory with copy-paste setup commands.',
    category: 'getting-started',
  },
  {
    id: 'mcp-vs-api',
    question: 'How is MCP different from a traditional REST API?',
    answer: 'MCP provides a standardized protocol specifically designed for AI model interactions, with built-in discovery, schema validation, and streaming support. Unlike REST APIs which require custom client code for each integration, MCP servers expose capabilities that AI clients can automatically discover and invoke.',
    category: 'comparison',
  },
  {
    id: 'mcp-security',
    question: 'Is MCP secure for production use?',
    answer: 'MCP supports standard security mechanisms including OAuth 2.0, API keys, and TLS encryption. Server implementations should follow security best practices for input validation, rate limiting, and access control. Our Security page details compliance and audit information.',
    category: 'security',
  },
  {
    id: 'build-mcp-server',
    question: 'How do I build my own MCP server?',
    answer: 'Building an MCP server involves implementing the JSON-RPC protocol, defining tools with JSON schemas, and choosing a transport (stdio or HTTP+SSE). Our documentation provides TypeScript and Python SDK examples with step-by-step guides.',
    category: 'development',
  },
];
