import Link from 'next/link';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export default function ClientsPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/clients`, title: 'Clients', description: 'MCP client applications.' })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Clients</h1>
        <p className="mt-2 text-slate-400">Applications that consume MCP servers.</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {['Claude Desktop', 'Cursor', 'Continue'].map(name => (
            <Link key={name} to={`/clients/${name.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <h3 className="font-semibold text-white">{name}</h3>
              <p className="mt-2 text-sm text-slate-400">Client configuration and compatibility notes.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
