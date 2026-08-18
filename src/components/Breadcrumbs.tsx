import Link from 'next/link';

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400 mb-6">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            {idx > 0 && <span className="text-slate-600">/</span>}
            {idx === items.length - 1 ? (
              <span className="text-brand-cyan" aria-current="page">{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-brand-cyan">{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
