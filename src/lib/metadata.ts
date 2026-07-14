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

  // Canonical points to the current locale's path
  const isEn = path.startsWith('/en');
  const canonicalPath = isEn ? enPath : dePath;

  const localPathsRegex = /^\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker)(\/.*)?$/;
  const isLocalPath = localPathsRegex.test(cleanPath);
  const isBlogPath = /^\/knowledge\/blog\/.+/.test(cleanPath);

  if (isBlogPath) {
    return {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        [isEn ? 'en' : 'de']: `${BASE_URL}${canonicalPath}`,
      },
    };
  }

  const languages: Record<string, string> = {
    de: `${BASE_URL}${dePath}`,
    'x-default': `${BASE_URL}${dePath}`,
  };

  if (!isLocalPath) {
    languages.en = `${BASE_URL}${enPath}`;
  }

  return {
    canonical: `${BASE_URL}${canonicalPath}`,
    languages,
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

  let finalDescription = opts.description;
  const isEn = opts.path.startsWith('/en');

  // Fix short or duplicate meta descriptions by padding them uniquely
  if (finalDescription.length < 110) {
    const cleanTitle = opts.title.split('|')[0].trim();
    const appendDe = ` Erfahren Sie mehr über ${cleanTitle} bei Coday, Ihrer Webdesign Agentur Wetzlar. Wir bieten Headless CMS, SEO & Next.js.`;
    const appendEn = ` Learn more about ${cleanTitle} at Coday, your web design agency in Wetzlar. We specialize in Headless CMS, SEO & Next.js.`;
    finalDescription = `${finalDescription}${isEn ? appendEn : appendDe}`;
  }

  const defaultOg: Metadata['openGraph'] = {
    title: fullTitle,
    description: finalDescription,
    url: `${BASE_URL}${opts.path}`,
    siteName: 'Coday',
    locale: isEn ? 'en_US' : 'de_DE',
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

  let finalType = opts.type;

  return {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description: finalDescription,
    robots: generateRobotsMeta({ type: finalType }),
    alternates: generateAlternates(opts.path),
    openGraph: opts.openGraph ? { ...defaultOg, ...opts.openGraph } : defaultOg,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: finalDescription,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
  };
}
