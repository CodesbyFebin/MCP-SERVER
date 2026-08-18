import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

const INTEGRATIONS = [
  { slug: 'github', name: 'GitHub', description: 'Repository, issue, and pull-request integration.' },
  { slug: 'postgres', name: 'PostgreSQL', description: 'Relational database integration with schema inspection.' },
  { slug: 'slack', name: 'Slack', description: 'Workspace messaging and channel search.' },
];

export async function generateStaticParams() {
  return INTEGRATIONS.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = INTEGRATIONS.find(i => i.slug === params.slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default function IntegrationPage({ params }: { params: { slug: string } }) {
  const item = INTEGRATIONS.find(i => i.slug === params.slug);
  if (!item) notFound();

  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/integrations/${item.slug}`, title: item.name, description: item.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{item.name}</h1>
        <p className="mt-2 text-slate-400">{item.description}</p>
      </div>
    </div>
  );
}
