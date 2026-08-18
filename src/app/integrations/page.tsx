import Link from 'next/link';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export default function IntegrationsPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/integrations`, title: 'Integrations', description: 'MCP integration ecosystem overview.' })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Integrations</h1>
        <p className="mt-2 text-slate-400">Explore integrations with popular developer tools, databases, and services.</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {['GitHub', 'PostgreSQL', 'Slack', 'Notion', 'Stripe', 'Docker'].map(name => (
            <Link key={name} to={`/integrations/${name.toLowerCase()}`} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <h3 className="font-semibold text-white">{name}</h3>
              <p className="mt-2 text-sm text-slate-400">Integration details and setup guidance.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
