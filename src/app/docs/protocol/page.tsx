import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'MCP Protocol',
  description: 'Tools, resources, prompts, and JSON-RPC foundations.',
};

export default function ProtocolPage() {
  return (
    <div className="max-w-4xl">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'MCP Protocol', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">Protocol</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          { title: 'JSON-RPC', href: '/docs/protocol/json-rpc', description: 'Request/response and notification semantics.' },
          { title: 'Tools', href: '/docs/protocol/tools', description: 'Callable functions exposed by servers.' },
          { title: 'Resources', href: '/docs/protocol/resources', description: 'Data sources exposed by servers.' },
          { title: 'Prompts', href: '/docs/protocol/prompts', description: 'Reusable prompt templates.' },
        ].map(item => (
          <a key={item.href} href={item.href} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
