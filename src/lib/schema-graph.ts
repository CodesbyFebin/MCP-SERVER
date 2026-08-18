import { SITE } from '@/config/site';

export interface JsonLdBase {
  '@context'?: string;
  '@type': string;
  '@id'?: string;
  [key: string]: unknown;
}

export interface OrganizationSchema extends JsonLdBase {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface WebSiteSchema extends JsonLdBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbListSchema extends JsonLdBase {
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

export interface SoftwareApplicationSchema extends JsonLdBase {
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  softwareVersion: string;
}

export interface TechArticleSchema extends JsonLdBase {
  '@type': 'TechArticle';
  headline: string;
  description: string;
  author: { '@type': 'Organization'; name: string; url: string };
  datePublished: string;
  dateModified: string;
}

export interface FAQPageSchema extends JsonLdBase {
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }[];
}

export function buildOrganizationSchema(overrides?: Partial<OrganizationSchema>): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.origin}/#organization`,
    name: SITE.name,
    url: SITE.origin,
    logo: `${SITE.origin}/logo.png`,
    sameAs: [],
    ...overrides,
  };
}

export function buildWebSiteSchema(overrides?: Partial<WebSiteSchema>): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.origin}/#website`,
    name: SITE.name,
    url: SITE.origin,
    description: 'Evidence-backed Model Context Protocol directory and developer platform.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.origin}/servers?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    ...overrides,
  };
}

export function buildWebPageSchema(overrides: {
  id: string;
  title: string;
  description: string;
  breadcrumbs?: { name: string; href: string }[];
}): JsonLdBase & { '@type': 'WebPage'; name: string; description: string } {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': overrides.id,
    name: overrides.title,
    description: overrides.description,
    ...(overrides.breadcrumbs && {
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: overrides.breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: new URL(crumb.href, SITE.origin).href,
        })),
      },
    }),
  };
}

export function buildSoftwareApplicationSchema(server: {
  name: string;
  description: string;
  version: string;
  category: string;
}): SoftwareApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE.origin}/servers/${server.name.toLowerCase()}/#application`,
    name: server.name,
    description: server.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    softwareVersion: server.version,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function buildTechArticleSchema(overrides: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}): TechArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: overrides.headline,
    description: overrides.description,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.origin },
    datePublished: overrides.datePublished,
    dateModified: overrides.dateModified,
  };
}

export interface HowToSchema extends JsonLdBase {
  '@type': 'HowTo';
  name: string;
  description: string;
  step: { '@type': 'HowToStep'; name: string; text: string }[];
}

export function buildHowToSchema(overrides: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: overrides.name,
    description: overrides.description,
    step: overrides.steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildFAQPageSchema(faqs: { question: string; answer: string }[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildFullGraph(pageSchema?: JsonLdBase): JsonLdBase[] {
  const graph: JsonLdBase[] = [buildOrganizationSchema(), buildWebSiteSchema()];
  if (pageSchema) graph.push(pageSchema);
  return graph;
}
