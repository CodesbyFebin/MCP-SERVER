import { servers } from '../data/servers';
import { topics } from '../data/topics';
import { pillars } from '../data/pillars';

interface Linkable {
  id: string;
  tags: string[];
  category?: string;
}

function tagOverlapScore(a: Linkable, b: Linkable): number {
  const tagsA = new Set(a.tags.map(t => t.toLowerCase()));
  const tagsB = new Set(b.tags.map(t => t.toLowerCase()));
  let overlap = 0;
  for (const tag of tagsA) {
    if (tagsB.has(tag)) overlap++;
  }
  return overlap;
}

function categoryMatchScore(a: Linkable, b: Linkable): number {
  if (a.category && b.category && a.category === b.category) return 2;
  return 0;
}

export function getRelatedLinks(item: Linkable, limit = 8): string[] {
  const scored = servers
    .filter(s => s.id !== item.id)
    .map(s => ({
      id: s.id,
      score: tagOverlapScore(item, s) * 3 + categoryMatchScore(item, s),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(s => `/servers/${s.id}`);
}
