import { SITE } from '@/config/site';
import { servers } from '@/data/servers';
import { isPublicIndexable } from '@/lib/evidence';

export const dynamic = 'force-static';

export async function GET() {
  const publishedServers = servers.filter(isPublicIndexable);
  const lines = [
    `# ${SITE.name}`,
    '',
    SITE.name + ' is the evidence-backed Model Context Protocol directory and developer platform.',
    '',
    '## Sections',
    `- Servers: ${SITE.origin}/servers`,
    `- Documentation: ${SITE.origin}/docs`,
    `- Methodology: ${SITE.origin}/methodology`,
    `- Editorial Policy: ${SITE.origin}/editorial-policy`,
    `- Evidence Ledger: ${SITE.origin}/evidence`,
    '',
    '## Verified Servers',
    ...publishedServers.map(s => `- ${s.name}: ${SITE.origin}/servers/${s.slug}`),
    '',
    `Generated: 2026-08-18`,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
