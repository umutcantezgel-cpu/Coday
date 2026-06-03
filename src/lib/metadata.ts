import type { Metadata } from 'next';

const BASE_URL = 'https://www.codayweb.de';

/**
 * Generate robots meta based on page type and environment.
 * Non-production environments are always noindex.
 */
export function generateRobotsMeta(opts: {
  type: 'money' | 'legal' | 'studio' | 'preview' | 'article' | 'default';
}): Metadata['robots'] {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  if (!isProduction) {
    return { index: false, follow: false };
  }

  switch (opts.type) {
    case 'money':
    case 'article':
    case 'default':
      return { index: true, follow: true };
    case 'legal':
      return { index: false, follow: true };
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

  // Handle localized routing maps
  if (cleanPath.startsWith('/branchen')) {
    enPath = `/en${cleanPath.replace(/^\/branchen/, '/industries')}`;
  } else if (cleanPath.startsWith('/industries')) {
    dePath = `/de${cleanPath.replace(/^\/industries/, '/branchen')}`;
  }

  // Canonical points to self (the actual path passed in)
  const canonicalPath = path.startsWith('/en') ? enPath : dePath;

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
  type: 'money' | 'legal' | 'studio' | 'preview' | 'article' | 'default';
  openGraph?: Metadata['openGraph'];
}): Metadata {
  const fullTitle = opts.title.includes('Coday')
    ? opts.title
    : `${opts.title} | Coday`;

  return {
    title: fullTitle,
    description: opts.description,
    robots: generateRobotsMeta({ type: opts.type }),
    alternates: generateAlternates(opts.path),
    ...(opts.openGraph ? { openGraph: opts.openGraph } : {}),
  };
}
