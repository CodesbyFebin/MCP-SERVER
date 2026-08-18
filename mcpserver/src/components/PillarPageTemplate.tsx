import { Link } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { CTA } from './CTA';
import { RelatedPages } from './RelatedPages';

interface PillarPageTemplateProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
  children: React.ReactNode;
  relatedLinks?: { title: string; href: string; description: string }[];
}

export function PillarPageTemplate({
  title,
  description,
  breadcrumbs,
  children,
  relatedLinks = [],
}: PillarPageTemplateProps) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-400 mb-8">{description}</p>
          <div className="text-gray-300 leading-relaxed space-y-6">
            {children}
          </div>
        </article>
        <CTA />
        {relatedLinks.length > 0 && (
          <RelatedPages links={relatedLinks} title="Related Topics" />
        )}
      </div>
    </div>
  );
}
