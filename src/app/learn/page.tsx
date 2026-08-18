import Link from 'next/link';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Learn MCP',
  description: 'Conceptual guides for understanding the Model Context Protocol.',
};

export default function LearnPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/learn`, title: 'Learn MCP', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Learn</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { title: 'What is MCP?', href: '/learn/what-is-mcp' },
            { title: 'MCP Server', href: '/learn/mcp-server' },
            { title: 'MCP Client', href: '/learn/mcp-client' },
            { title: 'MCP Host', href: '/learn/mcp-host' },
          ].map(item => (
            <Link key={item.href} to={item.href} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <h3 className="font-semibold text-white">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
