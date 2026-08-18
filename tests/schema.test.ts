import { describe, it, expect } from 'vitest';
import { buildOrganizationSchema, buildWebSiteSchema, buildWebPageSchema, buildSoftwareApplicationSchema, buildTechArticleSchema, buildFAQPageSchema, buildFullGraph } from '@/lib/schema-graph';
import { SITE } from '@/config/site';

describe('schema-graph builders', () => {
  it('builds organization schema', () => {
    expect(buildOrganizationSchema().name).toBe(SITE.name);
  });
  it('builds website schema with search action', () => {
    const schema = buildWebSiteSchema();
    expect(schema.potentialAction?.['@type']).toBe('SearchAction');
  });
  it('builds webpage schema with breadcrumbs', () => {
    const schema = buildWebPageSchema({ id: `${SITE.origin}/test`, title: 'Test', description: 'Desc', breadcrumbs: [{ name: 'Home', href: '/' }] });
    expect(schema['@type']).toBe('WebPage');
  });
  it('builds software application schema with offer', () => {
    const schema = buildSoftwareApplicationSchema({ name: 'Test', description: 'Desc', version: '1.0.0', category: 'devtools' });
    expect(schema.offers?.priceCurrency).toBe('USD');
  });
  it('builds tech article schema', () => {
    const schema = buildTechArticleSchema({ headline: 'Test', description: 'Desc', datePublished: '2026-08-18', dateModified: '2026-08-18' });
    expect(schema['@type']).toBe('TechArticle');
  });
  it('builds full graph with page schema', () => {
    const graph = buildFullGraph(buildWebPageSchema({ id: `${SITE.origin}/test`, title: 'Test', description: 'Desc' }));
    expect(graph.length).toBe(3);
  });
});
