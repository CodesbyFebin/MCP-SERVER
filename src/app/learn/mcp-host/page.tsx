import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'MCP Host',
  description: 'How hosts orchestrate MCP clients and servers.',
};

export default function McpHostPage() {
  return (
    <div className="max-w-4xl py-12">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'MCP Host', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">MCP Host</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <div className="mt-8 space-y-6 text-slate-300">
        <p>An MCP host is an application that manages one or more MCP clients. It handles configuration, connection lifecycle, and user intent routing.</p>
        <h2 className="text-xl font-semibold text-white">Examples</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Claude Desktop</li>
          <li>Cursor</li>
          <li>Continue</li>
        </ul>
      </div>
    </div>
  );
}
