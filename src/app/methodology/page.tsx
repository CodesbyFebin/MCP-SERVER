import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Methodology',
  description: 'How MCPserver.in sources, verifies, and publishes records.',
};

export default function MethodologyPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/methodology`, title: 'Methodology', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Methodology</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 space-y-6 text-slate-300">
          <p>Records are published only when they have at least one verified or measured evidence item and a non-unverified verification status.</p>
          <h2 className="text-xl font-semibold text-white">Evidence states</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Verified: supported by an official source with stable URL and publisher.</li>
            <li>Measured: supported by reproducible measurement with methodology.</li>
            <li>Unknown: recorded as unknown; never inferred.</li>
            <li>Unverified: excluded from public index.</li>
          </ul>
          <p>Unknown values remain unknown. No factual value is inferred without evidence.</p>
        </div>
      </div>
    </div>
  );
}
