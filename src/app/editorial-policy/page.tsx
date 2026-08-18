import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Editorial Policy',
  description: 'Content, evidence, and publication rules for MCPserver.in.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/editorial-policy`, title: 'Editorial Policy', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Editorial Policy</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 space-y-6 text-slate-300">
          <p>Publication requires evidence. Claims without verified sources are not published as facts.</p>
          <h2 className="text-xl font-semibold text-white">Corrections</h2>
          <p>Published records are corrected when new evidence is available. Corrections are applied to the record and reflected in review timestamps.</p>
          <h2 className="text-xl font-semibold text-white">Prohibited content</h2>
          <p>Unsupported performance, compliance, hosting, or popularity claims are not published unless accompanied by verifiable evidence.</p>
        </div>
      </div>
    </div>
  );
}
