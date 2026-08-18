import Link from 'next/link';
import { SITE } from '@/config/site';
import { ServerCard } from '@/components/ServerCard';
import { RelatedPages } from '@/components/RelatedPages';
import { servers } from '@/data/servers';
import { buildWebPageSchema, buildFAQPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

const quickAnswer =
  SITE.name +
  ' is the evidence-backed Model Context Protocol directory. Discover verified MCP servers, inspect provenance, review installation guidance, and learn the protocol through documentation and methodology.';

export default function HomePage() {
  const featured = servers.slice(0, 3);
  const faqs = [
    { question: 'What is the Model Context Protocol?', answer: 'MCP is an open standard that enables AI assistants to connect to data sources and tools through a standardized protocol.' },
    { question: 'How do I add an MCP server?', answer: 'Use a compatible client such as Claude Desktop or Cursor and add the server configuration under mcpServers with command and args.' },
    { question: 'How are servers verified?', answer: 'Each published server record carries evidence sourced from official repositories or documentation, with a verification status and review date.' },
  ];

  const relatedLinks = [
    { title: 'Browse Servers', href: '/servers', description: 'Evidence-reviewed MCP servers with provenance and setup guidance.' },
    { title: 'Documentation', href: '/docs', description: 'Copy-pasteable setup commands and SDK examples.' },
    { title: 'Methodology', href: '/methodology', description: 'How records are sourced, verified, and published.' },
    { title: 'Evidence Ledger', href: '/evidence', description: 'Publication status and evidence for every indexed record.' },
    { title: 'Security', href: '/docs/security', description: 'Authentication, authorization, and input validation guidance.' },
    { title: 'Learn MCP', href: '/learn', description: 'Conceptual guides for clients, hosts, and servers.' },
  ];

  return (
    <div className="py-20 sm:py-32">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/`, title: SITE.name, description: quickAnswer })} />
      <SchemaJsonLd schema={buildFAQPageSchema(faqs)} />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{SITE.name}</h1>
        <p className="mt-4 text-lg text-slate-400">{quickAnswer}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/servers" className="rounded-lg bg-brand-cyan px-6 py-3 font-semibold text-brand-bg hover:bg-brand-cyan/90">Browse Servers</Link>
          <Link to="/docs" className="rounded-lg border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/5">Read Documentation</Link>
        </div>
      </div>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white">Verified Servers</h2>
        <p className="mt-2 text-slate-400">Evidence-reviewed MCP integrations with provenance and setup guidance.</p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(server => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/servers" className="text-brand-cyan hover:underline">View all servers</Link>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white">Learn</h2>
        <p className="mt-2 text-slate-400">Conceptual guides and protocol documentation.</p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'What is MCP?', href: '/learn/what-is-mcp', description: 'Overview of the Model Context Protocol.' },
            { title: 'MCP Server', href: '/learn/mcp-server', description: 'How servers expose tools, resources, and prompts.' },
            { title: 'MCP Client', href: '/learn/mcp-client', description: 'How clients consume server capabilities.' },
            { title: 'MCP Host', href: '/learn/mcp-host', description: 'How hosts orchestrate clients and servers.' },
            { title: 'Protocol', href: '/docs/protocol', description: 'JSON-RPC, tools, resources, and prompts.' },
            { title: 'Methodology', href: '/methodology', description: 'How records are sourced and verified.' },
          ].map(item => (
            <Link key={item.href} to={item.href} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-brand-cyan/50">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <RelatedPages title="Explore More" links={relatedLinks} />
    </div>
  );
}
