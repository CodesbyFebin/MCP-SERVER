import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

const TERMS = [
  { slug: 'mcp', term: 'MCP', definition: 'Model Context Protocol: an open standard for connecting AI assistants to tools and data.' },
  { slug: 'json-rpc', term: 'JSON-RPC', definition: 'Remote procedure call protocol encoded in JSON.' },
  { slug: 'tool', term: 'Tool', definition: 'A callable function exposed by an MCP server.' },
  { slug: 'resource', term: 'Resource', definition: 'A data source exposed by an MCP server.' },
  { slug: 'prompt', term: 'Prompt', definition: 'A reusable prompt template exposed by an MCP server.' },
];

export async function generateStaticParams() {
  return TERMS.map(item => ({ term: item.slug }));
}

export async function generateMetadata({ params }: { params: { term: string } }) {
  const item = TERMS.find(t => t.slug === params.term);
  if (!item) return {};
  return { title: item.term, description: item.definition };
}

export default function GlossaryTermPage({ params }: { params: { term: string } }) {
  const item = TERMS.find(t => t.slug === params.term);
  if (!item) notFound();

  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/glossary/${item.slug}`, title: item.term, description: item.definition })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{item.term}</h1>
        <p className="mt-2 text-slate-400">{item.definition}</p>
      </div>
    </div>
  );
}
