import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Contact',
  description: 'Contact the MCPserver.in team.',
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/contact`, title: 'Contact', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Contact</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 space-y-4 text-slate-300">
          <p>Email: hello@codemicro.dev</p>
          <p>GitHub: https://github.com/codemicro/mcpserver</p>
        </div>
      </div>
    </div>
  );
}
