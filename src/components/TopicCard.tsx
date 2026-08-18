import Link from 'next/link';

interface TopicCardProps {
  title: string;
  slug: string;
  description: string;
}

export function TopicCard({ title, slug, description }: TopicCardProps) {
  return (
    <Link
      to={`/learn/${slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
    >
      <h3 className="font-semibold text-white group-hover:text-brand-cyan transition-colors">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
    </Link>
  );
}
