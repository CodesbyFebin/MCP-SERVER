import { Link } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { CTA } from './CTA';
import { RelatedPages } from './RelatedPages';
import { ServerRecord } from '../data/servers';

interface ServerIntegrationPageTemplateProps {
  server: ServerRecord;
  breadcrumbs: { label: string; href: string }[];
  relatedLinks?: { title: string; href: string; description: string }[];
  children: React.ReactNode;
}

export function ServerIntegrationPageTemplate({
  server,
  breadcrumbs,
  relatedLinks = [],
  children,
}: ServerIntegrationPageTemplateProps) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{server.title}</h1>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 capitalize">
              {server.category}
            </span>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full ${
            server.verificationStatus === 'verified'
              ? 'bg-brand-green/20 text-brand-green'
              : 'bg-brand-amber/20 text-brand-amber'
          }`}>
            {server.verificationStatus}
          </span>
        </div>
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-lg text-gray-300 leading-relaxed">{server.description}</p>
        </div>
        <div className="space-y-6">
          {children}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Capabilities</h3>
          <div className="flex flex-wrap gap-2">
            {server.capabilities.map((cap) => (
              <span key={cap} className="rounded-md bg-brand-cyan/10 px-3 py-1 text-sm text-brand-cyan">
                {cap}
              </span>
            ))}
          </div>
        </div>
        <CTA />
        {relatedLinks.length > 0 && (
          <RelatedPages links={relatedLinks} title="Related Servers" />
        )}
      </div>
    </div>
  );
}
