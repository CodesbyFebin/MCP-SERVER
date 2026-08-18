export interface Pillar {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  relatedTopics: string[];
  relatedServers: string[];
}

export const pillars: Pillar[] = [
  {
    id: 'mcp-overview',
    slug: 'mcp-overview',
    title: 'What is the Model Context Protocol?',
    description: 'A comprehensive overview of the Model Context Protocol (MCP), its architecture, and how it enables AI models to interact with external tools and data sources.',
    content: `
The Model Context Protocol (MCP) is an open standard that enables AI assistants to securely connect to data sources and tools. MCP standardizes how AI applications communicate with external systems, providing a universal interface for tool invocation, resource access, and prompt management.

Key architectural components include:
- **Servers**: Backend processes that expose tools, resources, and prompts
- **Clients**: AI applications that consume server capabilities
- **Transports**: Communication layers (stdio, HTTP+SSE) between clients and servers

MCP replaces ad-hoc integrations with a standardized protocol, reducing development time and improving reliability across the AI ecosystem.
    `,
    relatedTopics: ['mcp-basics', 'mcp-security'],
    relatedServers: ['github', 'postgres'],
  },
  {
    id: 'mcp-architecture',
    slug: 'mcp-architecture',
    title: 'MCP Architecture Deep Dive',
    description: 'Explore the technical architecture of MCP including transports, message formats, session management, and error handling patterns.',
    content: `
MCP uses a client-server architecture over JSON-RPC 2.0. The protocol defines three core primitives: Tools (callable functions), Resources (data sources), and Prompts (reusable templates).

Transport layers include:
- **stdio**: For local integrations and CLI tools
- **HTTP+SSE**: For remote servers with real-time streaming

Sessions are managed through connection lifecycle events, and errors follow JSON-RPC conventions with standardized codes.
    `,
    relatedTopics: ['mcp-basics', 'mcp-transports'],
    relatedServers: ['github', 'notion', 'postgres'],
  },
];
