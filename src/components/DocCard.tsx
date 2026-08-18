import Link from 'next/link';

interface DocCardProps {
  title: string;
  href: string;
  description: string;
}

export function DocCard({ title, href, description }: DocCardProps) {
  return (
    <Link to={href} className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-brand-cyan/50">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </Link>
  );
}
