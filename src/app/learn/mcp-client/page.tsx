import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'MCP Client',
  description: 'How MCP clients consume server capabilities.',
};

export default function McpClientPage() {
  return (
    <div className="max-w-4xl py-12">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'MCP Client', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">MCP Client</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <div className="mt-8 space-y-6 text-slate-300">
        <p>An MCP client is an AI application that connects to one or more MCP servers. It discovers available tools, resources, and prompts, and invokes them on behalf of the model.</p>
        <h2 className="text-xl font-semibold text-white">Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Connection lifecycle management</li>
          <li>Capability negotiation</li>
          <li>Request routing and error handling</li>
          <li>Security context propagation</li>
        </ul>
      </div>
    </div>
  );
}
