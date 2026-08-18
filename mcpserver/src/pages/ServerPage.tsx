import { useParams, Link } from 'react-router-dom';
import { ServerIntegrationPageTemplate } from '../components/ServerIntegrationPageTemplate';
import { SchemaJsonLd } from '../components/SchemaJsonLd';
import { buildSoftwareApplicationSchema } from '../lib/schema';
import { servers } from '../data/servers';
import { RelatedPages } from '../components/RelatedPages';

export function ServerPage() {
  const { slug } = useParams();
  const server = servers.find(s => s.id === slug);

  if (!server) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Server not found.</p>
          <Link to="/directory" className="text-brand-cyan hover:underline">Browse Directory</Link>
        </div>
      </div>
    );
  }

  const appSchema = buildSoftwareApplicationSchema({
    name: server.title,
    description: server.description,
    version: server.latestVerifiedVersion,
    category: server.category,
  });

  const relatedLinks = servers
    .filter(s => s.id !== server.id && s.category === server.category)
    .slice(0, 3)
    .map(s => ({ title: s.title, href: `/servers/${s.id}`, description: s.description }));

  return (
    <>
      <SchemaJsonLd schema={appSchema} />
      <ServerIntegrationPageTemplate
        server={server}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Directory', href: '/directory' },
          { label: server.title, href: `/servers/${server.id}` },
        ]}
        relatedLinks={relatedLinks}
      >
        <div className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-2xl font-bold text-white">Overview</h2>
          <p className="text-gray-300 leading-relaxed">{server.description}</p>
          <h2 className="text-2xl font-bold text-white">Setup</h2>
          <p className="text-gray-300 leading-relaxed">
            Use the following command to add this server to your MCP client configuration:
          </p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <code className="text-sm text-brand-green">
              npx -y @modelcontextprotocol/server-{server.id}
            </code>
          </div>
          <h2 className="text-2xl font-bold text-white">Repository</h2>
          <a
            href={server.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:underline"
          >
            {server.repositoryUrl}
          </a>
        </div>
      </ServerIntegrationPageTemplate>
    </>
  );
}
