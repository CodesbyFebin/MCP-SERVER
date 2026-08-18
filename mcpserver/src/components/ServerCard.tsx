import { Link } from 'react-router-dom';
import { ServerRecord } from '../data/servers';

interface ServerCardProps {
  server: ServerRecord;
}

export function ServerCard({ server }: ServerCardProps) {
  return (
    <Link
      to={`/servers/${server.id}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all hover:border-brand-cyan/50"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white group-hover:text-brand-cyan transition-colors">
            {server.title}
          </h3>
          <span className="inline-block mt-1 rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-300 capitalize">
            {server.category}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          server.verificationStatus === 'verified'
            ? 'bg-brand-green/20 text-brand-green'
            : 'bg-brand-amber/20 text-brand-amber'
        }`}>
          {server.verificationStatus}
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {server.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {server.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
