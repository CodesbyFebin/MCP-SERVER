import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="mt-16 rounded-2xl border border-brand-cyan/30 bg-brand-cyan/5 p-8 text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Ready to build with MCP?
      </h2>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
        Explore 100+ MCP servers, browse documentation, and test integrations in our interactive playground.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/directory"
          className="rounded-lg bg-brand-cyan px-6 py-3 font-semibold text-brand-bg hover:bg-brand-cyan/90 transition-colors"
        >
          Browse Directory
        </Link>
        <Link
          to="/docs"
          className="rounded-lg border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
        >
          Read Documentation
        </Link>
      </div>
    </section>
  );
}
