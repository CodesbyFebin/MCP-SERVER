import { SITE } from '@/config/site';
import { servers } from '@/data/servers';
import { isPublicIndexable } from '@/lib/evidence';

export const dynamic = 'force-static';

export async function GET() {
  const publishedServers = servers.filter(isPublicIndexable);
  const lines = [
    `# ${SITE.name} - Full LLM Summary`,
    '',
    '## Platform Description',
    SITE.name + ' is the Model Context Protocol (MCP) Server Directory and Developer Platform. It provides an evidence-backed registry of MCP servers, documentation, and methodology.',
    '',
    '## Verified Server Registry',
    ...publishedServers.map(s => `- ${s.name} (${s.slug}): ${s.summary}`),
    '',
    '## Documentation',
    `- Getting Started: ${SITE.origin}/docs/getting-started`,
    `- Protocol: ${SITE.origin}/docs/protocol`,
    `- Transports: ${SITE.origin}/docs/transports`,
    `- Security: ${SITE.origin}/docs/security`,
    '',
    '## Methodology',
    `- Methodology: ${SITE.origin}/methodology`,
    `- Editorial Policy: ${SITE.origin}/editorial-policy`,
    `- Evidence Ledger: ${SITE.origin}/evidence`,
    '',
    '## Contact',
    `- Email: hello@mcp-server.in`,
    `- GitHub: https://github.com/codemicro/mcpserver`,
    '',
    `Generated: 2026-08-18`,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
