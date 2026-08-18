import { SITE, canonicalUrl } from '@/config/site';

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noIndex?: boolean;
}

export function buildPageMetadata(meta: PageMetadata) {
  const canonical = canonicalUrl(meta.path);
  return {
    title: meta.title,
    description: meta.description,
    canonical,
    robots: meta.noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: meta.ogType || 'website',
      siteName: SITE.name,
      title: meta.title,
      description: meta.description,
      url: canonical,
      image: meta.ogImage || `${SITE.origin}/og-default.png`,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}
