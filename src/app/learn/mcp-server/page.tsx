import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'MCP Server',
  description: 'How MCP servers expose tools, resources, and prompts.',
};

export default function McpServerPage() {
  return (
    <div className="max-w-4xl py-12">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'MCP Server', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">MCP Server</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <div className="mt-8 space-y-6 text-slate-300">
        <p>An MCP server is a backend process that exposes capabilities to AI clients. It implements the Model Context Protocol over JSON-RPC 2.0.</p>
        <h2 className="text-xl font-semibold text-white">Core primitives</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Tools: callable functions with JSON Schema inputs</li>
          <li>Resources: data sources identified by URI</li>
          <li>Prompts: reusable prompt templates</li>
        </ul>
        <h2 className="text-xl font-semibold text-white">Transports</h2>
        <p>Servers support stdio for local integrations and HTTP+SSE for remote deployments.</p>
      </div>
    </div>
  );
}
