import { useParams, Link } from 'react-router-dom';
import { PillarPageTemplate } from '../components/PillarPageTemplate';
import { pillars } from '../data/pillars';
import { topics } from '../data/topics';

export function PillarPage() {
  const { slug } = useParams();
  const pillar = pillars.find(p => p.slug === slug);

  if (!pillar) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Pillar not found.</p>
          <Link to="/" className="text-brand-cyan hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const relatedTopics = topics
    .filter(t => pillar.relatedTopics.includes(t.id))
    .map(t => ({ title: t.title, href: `/topics/${t.slug}`, description: t.description }));

  return (
    <PillarPageTemplate
      title={pillar.title}
      description={pillar.description}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Learn', href: '/learn' },
        { label: pillar.title, href: `/pillars/${pillar.slug}` },
      ]}
      relatedLinks={relatedTopics}
    >
      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
        {pillar.content}
      </div>
    </PillarPageTemplate>
  );
}
