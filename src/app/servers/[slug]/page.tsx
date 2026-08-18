import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servers } from '@/data/servers';
import { buildSoftwareApplicationSchema, buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { EvidenceTable } from '@/components/EvidenceTable';
import { SITE } from '@/config/site';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  return servers.map(server => ({ slug: server.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const server = servers.find(s => s.slug === params.slug);
  if (!server) return {};
  return {
    title: server.name,
    description: server.summary,
  };
}

export default function ServerPage({ params }: { params: { slug: string } }) {
  const server = servers.find(s => s.slug === params.slug);
  if (!server) notFound();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Servers', href: '/servers' },
    { label: server.name, href: `/servers/${server.slug}` },
  ];

  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/servers/${server.slug}`, title: server.name, description: server.summary, breadcrumbs })} />
      <SchemaJsonLd schema={buildSoftwareApplicationSchema({ name: server.name, description: server.summary, version: server.latestVerifiedVersion ?? '1.0.0', category: server.categories[0] })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{server.name}</h1>
            <p className="mt-2 text-slate-400">{server.summary}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs ${
            server.verificationStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
          }`}>
            {server.verificationStatus}
          </span>
        </div>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="mt-2 text-slate-300">{server.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Installation</h2>
            <pre className="mt-2 rounded-lg bg-white/5 p-4 font-mono text-sm text-slate-300">{server.installation}</pre>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Capabilities</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {server.capabilities.map(cap => (
                <span key={cap} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{cap}</span>
              ))}
            </div>
          </div>
          <EvidenceTable evidence={server.evidence} />
        </section>
      </div>
    </div>
  );
}
