import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function Hero({ title, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {ctaPrimary && (
            <Link
              to={ctaPrimary.href}
              className="rounded-lg bg-brand-cyan px-8 py-3 font-semibold text-brand-bg hover:bg-brand-cyan/90 transition-colors"
            >
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link
              to={ctaSecondary.href}
              className="rounded-lg border border-white/10 px-8 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
