import Link from 'next/link';
import type { ServerRecord } from '@/types/server';

interface ServerCardProps {
  server: ServerRecord;
}

export function ServerCard({ server }: ServerCardProps) {
  return (
    <Link
      to={`/servers/${server.slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white group-hover:text-brand-cyan">{server.name}</h3>
          <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300 capitalize">
            {server.categories[0]}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          server.verificationStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
        }`}>
          {server.verificationStatus}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2">{server.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {server.capabilities.slice(0, 3).map(cap => (
          <span key={cap} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400">{cap}</span>
        ))}
      </div>
    </Link>
  );
}
