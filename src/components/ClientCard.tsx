import Link from 'next/link';
import type { ClientRecord } from '@/types/client';

interface ClientCardProps {
  client: ClientRecord;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Link
      to={`/clients/${client.slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white group-hover:text-brand-cyan transition-colors">{client.name}</h3>
          <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300 capitalize">
            {client.categories[0]}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          client.verificationStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
        }`}>
          {client.verificationStatus}
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{client.summary}</p>
    </Link>
  );
}
