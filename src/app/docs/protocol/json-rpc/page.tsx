import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'JSON-RPC in MCP',
  description: 'Request/response and notification semantics for MCP.',
};

export default function JsonRpcPage() {
  return (
    <div className="max-w-4xl">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'JSON-RPC in MCP', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">JSON-RPC</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <pre className="mt-6 rounded-lg bg-white/5 p-4 font-mono text-sm text-slate-300">{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { "name": "list_servers" }
}`}</pre>
    </div>
  );
}
