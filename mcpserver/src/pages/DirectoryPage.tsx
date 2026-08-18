import { useState, useMemo } from 'react';
import { ServerCard } from '../components/ServerCard';
import { SchemaJsonLd } from '../components/SchemaJsonLd';
import { buildFAQPageSchema, buildWebPageSchema } from '../lib/schema';
import { servers } from '../data/servers';
import { CATEGORIES, CategoryId } from '../data/categories';
import { SITE_CONFIG } from '../data/site';
import { faqs } from '../data/faqs';

export function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  const filtered = useMemo(() => {
    return servers.filter((server) => {
      const matchesSearch = server.name.toLowerCase().includes(search.toLowerCase()) ||
        server.description.toLowerCase().includes(search.toLowerCase()) ||
        server.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || server.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const quickAnswer = `The MCP Server Directory lists verified Model Context Protocol servers that enable AI assistants to connect to external tools and data sources. Browse ${servers.length}+ servers across databases, devtools, AI, storage, and more.`;

  const pageSchema = buildWebPageSchema({
    id: `${SITE_CONFIG.url}/directory`,
    title: 'MCP Server Directory',
    description: quickAnswer,
  });

  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <div className="min-h-screen bg-brand-bg">
      <SchemaJsonLd schema={pageSchema} />
      <SchemaJsonLd schema={faqSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">MCP Server Directory</h1>
          <div className="text-lg text-gray-300 max-w-3xl mb-4">
            {quickAnswer}
          </div>
          <p className="text-sm text-gray-500">
            Last updated: 2026-08-18 · {servers.length} servers indexed
          </p>
        </div>
        <div className="mb-8 space-y-4">
          <input
            type="search"
            placeholder="Search servers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-brand-cyan text-brand-bg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors capitalize ${
                  activeCategory === cat.id
                    ? 'bg-brand-cyan text-brand-bg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-12">No servers found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
