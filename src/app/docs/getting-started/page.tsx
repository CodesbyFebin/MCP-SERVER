import { SITE } from '@/config/site';
import { buildTechArticleSchema, buildHowToSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'Getting Started with MCP',
  description: 'Install an MCP client and connect your first server.',
};

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'Getting Started with MCP', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <SchemaJsonLd schema={buildHowToSchema({
        name: 'Set up an MCP client',
        description: metadata.description,
        steps: [
          { name: 'Install client', text: 'Install Claude Desktop, Cursor, or another MCP client.' },
          { name: 'Add server', text: 'Add a server entry under mcpServers with command and args.' },
          { name: 'Restart', text: 'Restart the client and verify tool availability.' },
        ],
      })} />
      <h1 className="text-3xl font-bold text-white">Getting Started</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-white">What you need</h2>
          <ul className="mt-3 list-disc list-inside text-slate-300 space-y-2">
            <li>An MCP-compatible client</li>
            <li>A server command or package</li>
            <li>Optional environment variables or connection strings</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Claude Desktop example</h2>
          <pre className="mt-3 rounded-lg bg-white/5 p-4 font-mono text-sm text-slate-300">{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`}</pre>
        </section>
      </div>
    </div>
  );
}
