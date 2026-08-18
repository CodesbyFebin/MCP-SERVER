import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'About',
  description: 'About MCPserver.in and the team behind it.',
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/about`, title: 'About', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">About</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 space-y-4 text-slate-300">
          <p>MCPserver.in is maintained by codeMicro Team.</p>
          <p>Contact: hello@codemicro.dev</p>
        </div>
      </div>
    </div>
  );
}
