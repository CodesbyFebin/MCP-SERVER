import Link from 'next/link';

const DOCS_NAV = [
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'Protocol', href: '/docs/protocol' },
  { label: 'Transports', href: '/docs/transports' },
  { label: 'Security', href: '/docs/security' },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <aside className="lg:col-span-1">
            <nav aria-label="Docs" className="space-y-1">
              {DOCS_NAV.map(item => (
                <Link key={item.href} to={item.href} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="lg:col-span-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
