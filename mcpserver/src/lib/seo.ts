import { SITE_URL, SITE_NAME } from './constants';

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noIndex?: boolean;
}

export function buildPageMetadata(meta: PageMetadata) {
  return {
    title: meta.title,
    meta: {
      description: meta.description,
      robots: meta.noIndex ? 'noindex, nofollow' : 'index, follow',
      canonical: meta.canonical,
      'og:type': meta.ogType || 'website',
      'og:site_name': SITE_NAME,
      'og:title': meta.title,
      'og:description': meta.description,
      'og:url': meta.canonical,
      'og:image': meta.ogImage || `${SITE_URL}/og-default.png`,
      'twitter:card': 'summary_large_image',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
    },
  };
}
