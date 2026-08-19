'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { JsonLd, SchemaData } from '@/shared/ui/JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  /** Optional breadcrumbs for JSON-LD BreadcrumbList */
  breadcrumbs?: BreadcrumbItem[];
  /** Page type for JSON-LD schema selection */
  pageType?: 'home' | 'service' | 'contact' | 'article' | 'job' | 'faq' | 'about' | 'default';
  /** Optional image URL to preload for LCP optimization */
  preloadImage?: string;
  /** Schema data passed to JsonLd */
  schemaData?: SchemaData;
  /** Optional override for alternate language links (hreflang) */
  alternateLinks?: { hreflang: string; href: string }[];
}

const SUPPORTED_LANGUAGES = ['de', 'en'];
const DEFAULT_LANGUAGE = 'de';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codayweb.de';

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'Coday | High-End Webentwicklung & Next.js 15 Architekturen',
  description = 'Maßgeschneiderte Webentwicklung, High-End UI/UX Design & 100/100 Core Web Vitals für anspruchsvolle Unternehmen.',
  image = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codayweb.de'}/images/og-image.jpg`,
  noIndex = false,
  breadcrumbs,
  pageType = 'default',
  preloadImage,
  schemaData,
  ...props
}) => {
  const currentPathname = usePathname() || '';
  const currentLang = useLocale();

  // Global override: Always noindex English pages to save crawl budget
  const effectiveNoIndex = noIndex;

  // Helper to get clean path without language prefix
  const getPathWithoutLang = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (SUPPORTED_LANGUAGES.includes(segments[0])) {
      return '/' + segments.slice(1).join('/');
    }
    return path === '/' ? '/' : path;
  };

  const cleanPath = getPathWithoutLang(currentPathname);

  // Helper function to build localized URLs
  const getLocalizedUrl = (targetLocale: string) => {
    let path = cleanPath;
    // Don't append trailing slash for the root path when locale prefix is added
    if (path === '/') path = '';
    return `${BASE_URL}/${targetLocale}${path}`;
  };

  const rawPath = cleanPath;
  const canonicalPathWithoutLocale =
    rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

  // Include locale in canonical to avoid middleware redirects
  const canonicalPath = canonicalPathWithoutLocale === '/' ? '' : canonicalPathWithoutLocale;
  const canonicalUrl = `${BASE_URL}/${currentLang}${canonicalPath}`;

  const localPathsRegex =
    /^\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker|branchen\/[^/]+\/[^/]+)(\/.*)?$/;
  const isLocalPath = localPathsRegex.test(cleanPath);
  const isBlogPath = /^\/knowledge\/blog\/.+/.test(cleanPath);

  // Default links based on current path (assumes same slug)
  const defaultLinks = SUPPORTED_LANGUAGES.filter((lang) => {
    // Do not output 'en' alternate links for local SEO pages since they redirect to 'de'
    if (lang === 'en' && isLocalPath) {
      return false;
    }
    // Do not output cross-language alternate links for blog posts since slugs differ
    if (isBlogPath && lang !== currentLang) {
      return false;
    }
    return true;
  }).map((lang) => ({
    rel: 'alternate',
    hreflang: lang,
    href: getLocalizedUrl(lang),
  }));

  // Merge default links with provided alternateLinks
  // If alternateLinks provides a link for a lang, use it instead of default
  const mergedLinks = defaultLinks.map((link) => {
    const customLink = props.alternateLinks?.find((l) => l.hreflang === link.hreflang);
    return customLink ? { ...link, href: customLink.href } : link;
  });

  const links: { rel: string; href: string; hreflang?: string }[] = [
    { rel: 'canonical', href: canonicalUrl },
    ...mergedLinks,
    // Add x-default (usually points to default lang version)
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href:
        mergedLinks.find((l) => l.hreflang === DEFAULT_LANGUAGE)?.href ||
        getLocalizedUrl(DEFAULT_LANGUAGE),
    },
  ];

  // Manual Helmet workaround for links/meta removed. Using Helmet directly.

  return (
    <JsonLd
      pageUrl={canonicalUrl}
      breadcrumbs={breadcrumbs}
      pageType={pageType}
      data={schemaData}
    />
  );
};
