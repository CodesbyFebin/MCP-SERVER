import { Link } from 'react-router-dom';

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
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
          >
            <h3 className="font-semibold text-white mb-2">{link.title}</h3>
            <p className="text-sm text-gray-400">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
