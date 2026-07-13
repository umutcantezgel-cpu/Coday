import type { Metadata } from 'next';

const BASE_URL = 'https://www.codayweb.de';

/**
 * Generate robots meta based on page type and environment.
 * Non-production environments are always noindex.
 */
export function generateRobotsMeta(opts: {
  type: 'money' | 'legal' | 'studio' | 'preview' | 'article' | 'default' | 'noindex';
}): Metadata['robots'] {
  switch (opts.type) {
    case 'money':
    case 'article':
    case 'default':
      return { index: true, follow: true };
    case 'legal':
    case 'noindex':
      return { index: false, follow: false };
    case 'studio':
    case 'preview':
      return { index: false, follow: false };
  }
}

/**
 * Generate canonical + hreflang alternates from a locale-prefixed path.
 * The canonical always points to the current page's absolute URL.
 * Hreflang includes de, en, and x-default (pointing to de).
 */
export function generateAlternates(path: string): Metadata['alternates'] {
  // Strip locale prefix to get the route segment
  const cleanPath = path.replace(/^\/(en|de)/, '').replace(/\/$/, '') || '';

  let dePath = `/de${cleanPath}`;
  let enPath = `/en${cleanPath}`;

  // Both locales use /branchen/ paths (legacy /industries/ routes redirect to /branchen/)

  // Canonical points to the current locale's path
  const isEn = path.startsWith('/en');
  const canonicalPath = isEn ? enPath : dePath;

  return {
    canonical: `${BASE_URL}${canonicalPath}`,
    languages: {
      de: `${BASE_URL}${dePath}`,
      en: `${BASE_URL}${enPath}`,
      'x-default': `${BASE_URL}${dePath}`,
    },
  };
}

/**
 * Generate complete page metadata with title, description, robots, and alternates.
 * Title format: "{Page Title} | Coday" (max ~58 chars recommended).
 */
export function generatePageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type: 'money' | 'legal' | 'studio' | 'preview' | 'article' | 'default' | 'noindex';
  openGraph?: Metadata['openGraph'];
}): Metadata {
  const fullTitle = opts.title.includes('Coday') ? opts.title : `${opts.title} | Coday`;

  const defaultOg: Metadata['openGraph'] = {
    title: fullTitle,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    siteName: 'Coday',
    locale: opts.path.startsWith('/en') ? 'en_US' : 'de_DE',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Coday Webdesign Agentur Wetzlar',
      },
    ],
  };

  return {
    title: fullTitle,
    description: opts.description,
    robots: generateRobotsMeta({ type: opts.type }),
    alternates: generateAlternates(opts.path),
    openGraph: opts.openGraph ? { ...defaultOg, ...opts.openGraph } : defaultOg,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
  };
}
