import type { EvidenceRecord } from '@/types/evidence';

interface EvidenceTableProps {
  evidence: EvidenceRecord[];
}

export function EvidenceTable({ evidence }: EvidenceTableProps) {
  return (
    <div className="mt-8 overflow-x-auto">
      <h3 className="text-lg font-semibold text-white mb-3">Evidence</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-2 pr-4 text-slate-400">Source</th>
            <th className="py-2 pr-4 text-slate-400">Type</th>
            <th className="py-2 pr-4 text-slate-400">Status</th>
            <th className="py-2 pr-4 text-slate-400">Captured</th>
            <th className="py-2 text-slate-400">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {evidence.map(item => (
            <tr key={item.id}>
              <td className="py-2 pr-4">
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">
                  {item.sourceUrl}
                </a>
              </td>
              <td className="py-2 pr-4 text-slate-300">{item.sourceType}</td>
              <td className="py-2 pr-4">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-200">{item.status}</span>
              </td>
              <td className="py-2 pr-4 text-slate-400">{item.capturedAt}</td>
              <td className="py-2 text-slate-400">{item.notes ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
