import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildWebPageSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

const POSTS = [
  { slug: 'evidence-first-indexing', title: 'Evidence-First Indexing', description: 'Why publication gates improve trust.' },
  { slug: 'canonical-architecture', title: 'Canonical Architecture', description: 'One origin, one canonical, one build.' },
];

export async function generateStaticParams() {
  return POSTS.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS.find(p => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find(p => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="py-12">
      <SchemaJsonLd schema={buildWebPageSchema({ id: `${SITE.origin}/blog/${post.slug}`, title: post.title, description: post.description })} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        <p className="mt-2 text-slate-400">{post.description}</p>
      </div>
    </div>
  );
}
