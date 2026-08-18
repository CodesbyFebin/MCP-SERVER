import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Security',
  description: 'Platform security and responsible disclosure.',
};

export default function SecurityPage() {
  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/security`, title: 'Security', description: metadata.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Security</h1>
        <p className="mt-2 text-slate-400">{metadata.description}</p>
        <div className="mt-8 space-y-6 text-slate-300">
          <p>This platform applies standard web security controls and minimizes data collection. No sensitive personal data is collected without explicit consent.</p>
          <h2 className="text-xl font-semibold text-white">Responsible disclosure</h2>
          <p>Report vulnerabilities to hello@codemicro.dev. We follow coordinated disclosure and do not publish findings before remediation.</p>
          <h2 className="text-xl font-semibold text-white">Data handling</h2>
          <p>Registry metadata, evidence records, and contact submissions are processed with the minimum necessary permissions.</p>
        </div>
      </div>
    </div>
  );
}
