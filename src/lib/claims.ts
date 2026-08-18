const BANNED_CLAIMS = [
  'sub-12ms',
  'sub-15ms',
  'mumbai edge',
  'bengaluru edge',
  'hyderabad edge',
  'india edge',
  'soc 2',
  'iso 27001',
  'iso certified',
  'drdp compliant',
  'rbi compliant',
  '99.99% uptime',
  '99.9% uptime',
  'guaranteed uptime',
  'largest',
  'number one',
  '#1',
  'best in class',
  'world class',
  'enterprise-grade',
  'award-winning',
  'trusted by thousands',
  'trusted by millions',
  'used by millions',
  '500k deployments',
  '10,000+ servers',
  '300k+ stars',
  '72-hour breach',
  '4.9/5',
  '150 reviews',
  '₹0 price',
];

export function scanClaims(content: string, context = ''): string[] {
  const lower = content.toLowerCase();
  const hits: string[] = [];
  for (const phrase of BANNED_CLAIMS) {
    if (lower.includes(phrase)) {
      hits.push(phrase);
    }
  }
  return hits;
}
