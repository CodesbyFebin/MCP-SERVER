export const CATEGORIES = [
  { id: 'ai', label: 'AI & Machine Learning', count: 24 },
  { id: 'databases', label: 'Databases', count: 18 },
  { id: 'devtools', label: 'Developer Tools', count: 15 },
  { id: 'communication', label: 'Communication', count: 12 },
  { id: 'storage', label: 'Storage & Files', count: 10 },
  { id: 'security', label: 'Security & Auth', count: 8 },
  { id: 'monitoring', label: 'Monitoring & Observability', count: 7 },
  { id: 'productivity', label: 'Productivity', count: 6 },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];
