import { SITE } from '@/config/site';
import { buildTechArticleSchema } from '@/lib/schema-graph';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';

export const metadata = {
  title: 'What is the Model Context Protocol?',
  description: 'An overview of MCP architecture, clients, servers, hosts, and transports.',
};

export default function WhatIsMcpPage() {
  return (
    <div className="max-w-4xl py-12">
      <SchemaJsonLd schema={buildTechArticleSchema({ headline: 'What is the Model Context Protocol?', description: metadata.description, datePublished: '2026-08-01', dateModified: '2026-08-18' })} />
      <h1 className="text-3xl font-bold text-white">What is the Model Context Protocol?</h1>
      <p className="mt-2 text-slate-400">{metadata.description}</p>
      <div className="mt-8 space-y-6 text-slate-300">
        <p>The Model Context Protocol is an open standard for connecting AI assistants to external tools and data sources. It standardizes tool invocation, resource access, and prompt management across clients and servers.</p>
        <p>MCP replaces ad-hoc integrations with a common protocol, reducing development time and improving reliability across the AI ecosystem.</p>
        <h2 className="text-xl font-semibold text-white">Key components</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Clients: AI applications that consume server capabilities</li>
          <li>Servers: Backend processes that expose tools, resources, and prompts</li>
          <li>Hosts: Applications that orchestrate clients and servers</li>
          <li>Transports: Communication layers such as stdio and HTTP+SSE</li>
        </ul>
      </div>
    </div>
  );
}
