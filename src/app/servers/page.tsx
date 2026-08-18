import Link from 'next/link';
import { ServerCard } from '@/components/ServerCard';
import { servers } from '@/data/servers';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { SITE } from '@/config/site';

export default function ServersPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/servers`, title: 'Servers', description: 'Evidence-backed MCP server directory.' })} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Servers</h1>
        <p className="mt-2 text-slate-400">
          Browse verified Model Context Protocol servers with evidence-backed provenance.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servers.map(server => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}
