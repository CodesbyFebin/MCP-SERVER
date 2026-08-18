import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Blog',
  description: 'Updates and notes from the MCPserver.in team.',
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/blog`, title: 'Blog', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
      </div>
    </div>
  );
}
