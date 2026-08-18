export interface Comparison {
  id: string;
  slug: string;
  title: string;
  description: string;
  against: string;
  criteria: {
    label: string;
    mcp: string;
    other: string;
  }[];
  conclusion: string;
}

export const comparisons: Comparison[] = [
  {
    id: 'mcp-vs-rest',
    slug: 'mcp-vs-rest',
    title: 'MCP vs REST APIs',
    description: 'Compare the Model Context Protocol with traditional REST APIs for AI integrations.',
    against: 'REST APIs',
    criteria: [
      { label: 'Discovery', mcp: 'Built-in capability listing', other: 'Requires OpenAPI/Swagger docs' },
      { label: 'Schema Validation', mcp: 'JSON Schema for all inputs', other: 'Optional, varies by implementation' },
      { label: 'Streaming', mcp: 'Native SSE support', other: 'Requires custom implementation' },
      { label: 'AI-Native', mcp: 'Designed for LLM tool calling', other: 'Requires adapter layers' },
      { label: 'Standardization', mcp: 'Single protocol spec', other: 'Multiple competing specs' },
    ],
    conclusion: 'MCP provides superior standardization and AI-native features for tool-calling workflows, while REST remains more widely adopted for general-purpose APIs.',
  },
];
