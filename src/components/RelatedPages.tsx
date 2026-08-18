import Link from 'next/link';

interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedPagesProps {
  title: string;
  links: RelatedLink[];
}

export function RelatedPages({ title, links }: RelatedPagesProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map(link => (
          <Link key={link.href} to={link.href} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-brand-cyan/50">
            <h3 className="font-semibold text-white">{link.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
