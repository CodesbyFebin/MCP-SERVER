import Link from 'next/link';
import type { GlossaryTerm } from '@/types/glossary';

interface GlossaryCardProps {
  term: GlossaryTerm;
}

export function GlossaryCard({ term }: GlossaryCardProps) {
  return (
    <Link
      to={`/glossary/${term.slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
    >
      <h3 className="font-semibold text-white group-hover:text-brand-cyan transition-colors">{term.term}</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">{term.definition}</p>
    </Link>
  );
}
