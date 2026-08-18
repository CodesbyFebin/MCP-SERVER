import { Link } from 'react-router-dom';

interface TopicCardProps {
  topic: {
    title: string;
    slug: string;
    description?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  };
}

export function TopicCard({ topic }: TopicCardProps) {
  const difficulty = topic.difficulty || 'beginner';
  return (
    <Link
      to={`/topics/${topic.slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors hover:border-brand-cyan/50"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full capitalize ${
          difficulty === 'beginner'
            ? 'bg-brand-green/20 text-brand-green'
            : difficulty === 'intermediate'
            ? 'bg-brand-amber/20 text-brand-amber'
            : 'bg-brand-danger/20 text-brand-danger'
        }`}>
          {difficulty}
        </span>
      </div>
      <h3 className="font-semibold text-white group-hover:text-brand-cyan transition-colors mb-2">
        {topic.title}
      </h3>
      {topic.description && (
        <p className="text-sm text-gray-400 leading-relaxed">
          {topic.description}
        </p>
      )}
    </Link>
  );
}
