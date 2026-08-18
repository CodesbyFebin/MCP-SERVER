import { Link } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { CTA } from './CTA';
import { TopicCard } from './TopicCard';

interface TopicPageTemplateProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
  checklist: string[];
  relatedTopics: { id: string; title: string; slug: string; description?: string; difficulty?: 'beginner' | 'intermediate' | 'advanced' }[];
  children?: React.ReactNode;
}

export function TopicPageTemplate({
  title,
  description,
  breadcrumbs,
  checklist,
  relatedTopics,
  children,
}: TopicPageTemplateProps) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <article>
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-400 mb-8">{description}</p>
          {children}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Checklist</h2>
            <ul className="space-y-4">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`check-${idx}`}
                    className="mt-1 h-4 w-4 rounded border-gray-600 bg-brand-bg text-brand-cyan focus:ring-brand-cyan"
                  />
                  <label htmlFor={`check-${idx}`} className="text-gray-300 leading-relaxed">
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <CTA />
        {relatedTopics.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
