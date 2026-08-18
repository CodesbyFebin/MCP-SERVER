import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

const CLIENTS = [
  { slug: 'claude-desktop', name: 'Claude Desktop', description: 'Native desktop client for Claude with MCP support.' },
  { slug: 'cursor', name: 'Cursor', description: 'AI-first code editor with MCP integration.' },
  { slug: 'continue', name: 'Continue', description: 'Open-source IDE extension for MCP.' },
];

export async function generateStaticParams() {
  return CLIENTS.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = CLIENTS.find(i => i.slug === params.slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default function ClientPage({ params }: { params: { slug: string } }) {
  const item = CLIENTS.find(i => i.slug === params.slug);
  if (!item) notFound();

  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/clients/${item.slug}`, title: item.name, description: item.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{item.name}</h1>
        <p className="mt-2 text-slate-400">{item.description}</p>
      </div>
    </div>
  );
}
