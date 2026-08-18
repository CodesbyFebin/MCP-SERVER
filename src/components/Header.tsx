import Link from 'next/link';
import { SITE } from '@/config/site';
import { NAV } from '@/data/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030508]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-white">
            {SITE.name}
          </Link>
          <nav className="hidden gap-6 text-sm md:flex" aria-label="Main">
            {NAV.map(item => (
              <Link key={item.href} to={item.href} className="text-slate-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
