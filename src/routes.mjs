export const integrations = [
  ['GitHub','Developer Tools','OAuth Safe','Search repositories, review pull requests, manage issues, releases, and code workflows.'],
  ['PostgreSQL','Databases','Secure API','Expose relational data to agents with controlled schema discovery and query workflows.'],
  ['Slack','Productivity','OAuth Safe','Read channels, search threads, and post automation updates into team workflows.'],
  ['Google Drive','Productivity','OAuth Safe','Search and organize documents, spreadsheets, slides, and shared folders.'],
  ['Notion','Productivity','Secure API','Query workspaces, append notes, and connect structured project knowledge to agents.'],
  ['Stripe','Finance','Secure API','Inspect payments, invoices, subscription events, and billing operations.'],
  ['AWS','Cloud','Secure API','Inspect cloud resources, logs, permissions, and operational metrics.'],
  ['Browser Automation','Web Tools','Secure API','Browse, click, extract, and interact with web applications through agent tools.'],
  ['Figma','Design','OAuth Safe','Connect design files, components, variables, and review workflows.'],
  ['Jira','Developer Tools','OAuth Safe','Search issues, update tickets, and coordinate engineering project work.'],
  ['MongoDB','Databases','Secure API','Expose document collections and controlled read workflows to AI agents.'],
  ['Docker','DevOps','Secure API','Inspect images, containers, compose projects, and deployment state.']
];

const common = {
  indexable: true,
  changefreq: 'weekly',
  priority: 0.8
};

export const routes = [
  {
    ...common, path: '/', priority: 1.0, kind: 'home',
    title: 'MCP Server Directory & Hosting for AI Agents | MCPserver.in',
    description: 'Discover MCP servers, integrations, clients and developer guides. Test locally, deploy hosted servers, and connect AI agents to tools, databases and APIs.'
  },
  {
    ...common, path: '/directory', priority: 0.95, kind: 'directory',
    title: 'MCP Server Directory — Browse Integrations | MCPserver.in',
    description: 'Browse a curated Model Context Protocol server directory across developer tools, databases, productivity, cloud, finance and automation.'
  },
  {
    ...common, path: '/integrations', kind: 'integrations',
    title: 'MCP Integrations & Connectors | MCPserver.in',
    description: 'Explore MCP integrations for GitHub, PostgreSQL, Slack, Google Drive, Notion, Stripe, AWS and more.'
  },
  {
    ...common, path: '/clients', kind: 'clients',
    title: 'MCP Clients — Claude, Cursor, Windsurf & More | MCPserver.in',
    description: 'Learn how MCP clients and AI hosts connect to servers, discover capabilities, and invoke tools over stdio or Streamable HTTP.'
  },
  {
    ...common, path: '/docs', kind: 'docs',
    title: 'MCP Documentation — Build, Test & Deploy | MCPserver.in',
    description: 'Technical documentation for Model Context Protocol servers, transports, tools, resources, prompts, authentication and deployment.'
  },
  {
    ...common, path: '/tools/mcp-playground', kind: 'playground',
    title: 'MCP Playground — Test JSON-RPC Tools in Browser | MCPserver.in',
    description: 'Test MCP server schemas and JSON-RPC tool calls in an interactive browser playground before connecting production clients.'
  },
  {
    ...common, path: '/what-is-mcp', kind: 'what-is-mcp',
    title: 'What Is MCP? Model Context Protocol Explained | MCPserver.in',
    description: 'Understand Model Context Protocol, its host-client-server architecture, tools, resources, prompts, transports and JSON-RPC message flow.'
  },
  {
    ...common, path: '/learn', kind: 'learn',
    title: 'Learn MCP — Tutorials & Developer Guides | MCPserver.in',
    description: 'Learn Model Context Protocol with practical tutorials for building, connecting, securing, testing and deploying MCP servers.'
  },
  {
    ...common, path: '/security', kind: 'security', priority: 0.9,
    title: 'MCP Security — Sandboxing, Auth & Access Controls | MCPserver.in',
    description: 'Security guidance for MCP servers including least privilege, secret isolation, authentication, audit trails, sandboxing and deployment controls.'
  },
  {
    ...common, path: '/state-of-mcp', kind: 'research', priority: 0.9,
    title: 'State of MCP 2026 — Ecosystem Research | MCPserver.in',
    description: 'Research and technical observations on Model Context Protocol adoption, tooling, deployment patterns, clients and infrastructure.'
  },
  {
    ...common, path: '/blog', kind: 'blog',
    title: 'MCP Blog — Guides, Security & Ecosystem Updates | MCPserver.in',
    description: 'Technical articles about MCP servers, AI agent integrations, security, deployment, developer workflows and ecosystem changes.'
  },
  {
    ...common, path: '/pricing', kind: 'pricing', priority: 0.9,
    title: 'MCP Server Hosting Pricing | MCPserver.in',
    description: 'Compare free local MCP tooling with hosted server plans for developers, teams and enterprises.'
  },
  {
    ...common, path: '/about', kind: 'about',
    title: 'About MCPserver.in — Model Context Protocol Platform',
    description: 'Learn about MCPserver.in, an independent directory, developer knowledge hub and hosting platform for Model Context Protocol servers.'
  },
  {
    ...common, path: '/contact', kind: 'contact',
    title: 'Contact MCPserver.in',
    description: 'Contact MCPserver.in for directory feedback, technical questions, security reports and enterprise deployment discussions.'
  },
  {
    ...common, path: '/research/mcp-directories', kind: 'research-directories',
    title: 'MCP Directory Landscape — Research & Methodology | MCPserver.in',
    description: 'Research on MCP server directories, discovery sources, verification approaches, coverage tradeoffs and ecosystem quality signals.'
  },
  {
    ...common, path: '/status', kind: 'status',
    title: 'MCPserver.in Service Status',
    description: 'Current status information for the MCPserver.in website, directory, playground and hosted infrastructure surfaces.'
  },
  {
    ...common, path: '/hosting', kind: 'hosting',
    title: 'Hosted MCP Servers — India-Region Infrastructure | MCPserver.in',
    description: 'Deploy and operate remote Model Context Protocol servers with managed runtime, monitoring, security controls and India-region options.'
  },
  {
    ...common, path: '/editorial-policy', kind: 'policy',
    title: 'Editorial Policy | MCPserver.in',
    description: 'How MCPserver.in evaluates sources, uses AI assistance, handles corrections, verifies claims and manages directory inclusion.'
  },
  {
    ...common, path: '/privacy', kind: 'policy',
    title: 'Privacy Policy | MCPserver.in',
    description: 'Privacy information for visitors and users of MCPserver.in services.'
  },
  {
    ...common, path: '/terms', kind: 'policy',
    title: 'Terms of Service | MCPserver.in',
    description: 'Terms governing use of MCPserver.in websites, developer tools and hosted services.'
  },
  {
    path: '/mcp-server-directory', indexable: false, redirectTo: '/directory', kind: 'redirect',
    title: 'MCP Server Directory', description: 'Permanent alias for the MCP server directory.'
  }
];
