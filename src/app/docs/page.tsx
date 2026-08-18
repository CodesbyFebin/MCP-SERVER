import Link from 'next/link';
import { SITE } from '@/config/site';
import { DocCard } from '@/components/DocCard';
import { buildTechArticleSchema, buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Documentation',
  description: 'Copy-pasteable setup commands and SDK examples for MCP.',
};

export default function DocsPage() {
  const docs = [
    { title: 'Getting Started', href: '/docs/getting-started', description: 'Install an MCP client and connect your first server.' },
    { title: 'Protocol', href: '/docs/protocol', description: 'Tools, resources, prompts, and JSON-RPC foundations.' },
    { title: 'Transports', href: '/docs/transports', description: 'stdio, HTTP, and SSE transport options.' },
    { title: 'Security', href: '/docs/security', description: 'Authentication, authorization, and input validation.' },
  ];

  return (
    <>
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/docs`, title: 'Documentation', description: metadata.description })} />
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'Documentation', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <div>
        <h1 className="text-3xl font-bold text-white">Documentation</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {docs.map(doc => (
            <DocCard key={doc.href} {...doc} />
          ))}
        </div>
      </div>
    </>
  );
}
