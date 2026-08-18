import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ServerCard } from '../components/ServerCard';
import { RelatedPages } from '../components/RelatedPages';
import { SchemaJsonLd } from '../components/SchemaJsonLd';
import { buildFAQPageSchema, buildWebPageSchema } from '../lib/schema';
import { servers } from '../data/servers';
import { CATEGORIES } from '../data/categories';
import { SITE_CONFIG } from '../data/site';
import { faqs } from '../data/faqs';

export function Home() {
  const featuredServers = servers.slice(0, 3);

  const quickAnswer = `codeMicro is the Model Context Protocol (MCP) Server Directory and Developer Platform. It helps developers discover, integrate, and deploy MCP servers through a searchable directory, interactive documentation, and JSON-RPC playground.`;

  const webPageSchema = buildWebPageSchema({
    id: `${SITE_CONFIG.url}/`,
    title: SITE_CONFIG.name,
    description: quickAnswer,
  });

  const faqSchema = buildFAQPageSchema(faqs);

  const relatedLinks = [
    { title: 'Browse All Servers', href: '/directory', description: 'Explore 100+ verified MCP servers across all categories.' },
    { title: 'Documentation', href: '/docs', description: 'Copy-pasteable setup commands and SDK examples.' },
    { title: 'Pricing Plans', href: '/pricing', description: 'Free, Pro, and Enterprise tiers with INR/USD support.' },
    { title: 'Security & Compliance', href: '/security', description: 'Infrastructure security, data protection, and vulnerability reporting.' },
    { title: 'Interactive Playground', href: '/tools', description: 'Test JSON-RPC payloads directly in your browser.' },
    { title: 'Protocol Comparisons', href: '/compare', description: 'MCP vs REST, GraphQL, and gRPC feature matrices.' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <SchemaJsonLd schema={webPageSchema} />
      <SchemaJsonLd schema={faqSchema} />
      <Hero
        title="The Model Context Protocol Directory"
        subtitle="Discover, integrate, and deploy MCP servers. Connect AI assistants to external tools and data sources with a standardized protocol."
        ctaPrimary={{ label: 'Browse Servers', href: '/directory' }}
        ctaSecondary={{ label: 'Read Docs', href: '/docs' }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-2">Featured Servers</h2>
          <p className="text-gray-400 mb-8">Top verified MCP integrations for your AI workflows.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/directory"
              className="inline-block rounded-lg border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
            >
              View all {servers.length}+ servers
            </Link>
          </div>
        </section>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-2">Browse by Category</h2>
          <p className="text-gray-400 mb-8">Explore servers organized by use case and technology.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
              >
                <div className="text-2xl font-bold text-brand-cyan mb-1">{cat.count}</div>
                <div className="text-sm text-gray-300">{cat.label}</div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold text-white mb-2">Why MCP?</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            The Model Context Protocol standardizes how AI models connect to tools and data. Instead of building custom integrations for each service, MCP provides a universal interface that works across clients, servers, and transport layers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-brand-cyan text-3xl mb-4">🔌</div>
              <h3 className="text-lg font-semibold text-white mb-2">Universal Plug</h3>
              <p className="text-gray-400 text-sm">
                One protocol to connect AI models to any tool, database, or API. No more custom client code per integration.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-brand-green text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Type-Safe</h3>
              <p className="text-gray-400 text-sm">
                JSON Schema validation for all inputs. Catch errors before they reach your production systems.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-brand-violet text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Streaming Ready</h3>
              <p className="text-gray-400 text-sm">
                Native SSE support for real-time data streaming. Build responsive AI experiences without polling.
              </p>
            </div>
          </div>
        </section>
        <RelatedPages title="Explore More" links={relatedLinks} />
      </main>
    </div>
  );
}
