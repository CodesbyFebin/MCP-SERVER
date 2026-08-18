import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { servers } from '@/data/servers';
import Link from 'next/link';
import { EvidenceTable } from '@/components/EvidenceTable';

export const metadata = {
  title: 'Evidence Ledger',
  description: 'Evidence-backed publication status for MCPserver.in records.',
};

export default function EvidencePage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/evidence`, title: 'Evidence Ledger', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Evidence Ledger</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 space-y-6">
          {servers.map(server => (
            <div key={server.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link to={`/servers/${server.slug}`} className="font-semibold text-white hover:text-brand-cyan">{server.name}</Link>
                  <div className="text-sm text-slate-400">{server.summary}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  server.verificationStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {server.verificationStatus}
                </span>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Last reviewed: {server.lastReviewedAt ?? '—'} · Updated: {server.updatedAt}
              </div>
              <EvidenceTable evidence={server.evidence} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
