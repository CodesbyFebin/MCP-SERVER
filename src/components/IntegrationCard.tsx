import Link from 'next/link';
import type { IntegrationRecord } from '@/types/integration';

interface IntegrationCardProps {
  integration: IntegrationRecord;
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <Link
      to={`/integrations/${integration.slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white group-hover:text-brand-cyan transition-colors">{integration.name}</h3>
          <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300 capitalize">
            {integration.categories[0]}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          integration.verificationStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
        }`}>
          {integration.verificationStatus}
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{integration.summary}</p>
    </Link>
  );
}
