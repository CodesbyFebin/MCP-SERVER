import { useParams, Link } from 'react-router-dom';
import { TopicPageTemplate } from '../components/TopicPageTemplate';
import { SchemaJsonLd } from '../components/SchemaJsonLd';
import { buildTechArticleSchema } from '../lib/schema';
import { topics } from '../data/topics';

export function TopicPage() {
  const { slug } = useParams();
  const topic = topics.find(t => t.slug === slug);

  if (!topic) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Topic not found.</p>
          <Link to="/" className="text-brand-cyan hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const techSchema = buildTechArticleSchema({
    headline: topic.title,
    description: topic.description,
    datePublished: '2026-08-01',
    dateModified: '2026-08-18',
  });

  const relatedTopics = topics
    .filter(t => t.id !== topic.id && t.relatedPillars.some(p => topic.relatedPillars.includes(p)))
    .map(t => ({ id: t.id, title: t.title, slug: t.slug, description: t.description, difficulty: t.difficulty }));

  return (
    <>
      <SchemaJsonLd schema={techSchema} />
      <TopicPageTemplate
        title={topic.title}
        description={topic.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Learn', href: '/learn' },
          { label: topic.title, href: `/topics/${topic.slug}` },
        ]}
        checklist={topic.checklist}
        relatedTopics={relatedTopics}
      />
    </>
  );
}
