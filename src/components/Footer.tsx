import Link from 'next/link';
import { SITE } from '@/config/site';

const FOOTER = [
  {
    title: 'Platform',
    links: [
      { label: 'Servers', href: '/servers' },
      { label: 'Docs', href: '/docs' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Evidence', href: '/evidence' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'What is MCP', href: '/learn/what-is-mcp' },
      { label: 'Protocol', href: '/docs/protocol' },
      { label: 'Security', href: '/docs/security' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Editorial Policy', href: '/editorial-policy' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0b1120]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER.map(group => (
            <div key={group.title}>
              <div className="text-sm font-semibold text-white">{group.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                {group.links.map(link => (
                  <li key={link.href}>
                    <Link to={link.href} className="hover:text-white">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="text-sm font-semibold text-white">Canonical</div>
            <p className="mt-3 text-sm text-slate-400">{SITE.origin}</p>
            <p className="text-xs text-slate-500">One source of truth.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
