import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'MCP Transports',
  description: 'stdio, HTTP, and SSE transport options for MCP.',
};

export default function TransportsPage() {
  return (
    <div className="max-w-4xl">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'MCP Transports', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">Transports</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
    </div>
  );
}
