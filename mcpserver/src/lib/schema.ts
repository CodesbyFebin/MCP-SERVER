import { SITE_URL, SITE_NAME } from './constants';

export interface JsonLdBase {
  '@context': string;
  '@type': string;
  '@id'?: string;
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

export interface FAQPageSchema extends JsonLdBase {
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
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

export function buildOrganizationSchema(overrides?: Partial<OrganizationSchema>): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    ...overrides,
  };
}

export function buildWebSiteSchema(overrides?: Partial<WebSiteSchema>): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'The MCP Server Directory and Developer Platform',
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
          item: new URL(crumb.href, SITE_URL).href,
        })),
      },
    }),
  };
}

export function buildSoftwareApplicationSchema(server: {
  name: string;
  description: string;
  version: string;
}): SoftwareApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/servers/${server.name.toLowerCase()}/#application`,
    name: server.name,
    description: server.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    softwareVersion: server.version,
  };
}

export function buildFAQPageSchema(faqs: { question: string; answer: string }[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
