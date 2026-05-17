import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://www.codayweb.de';

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'Coday | Der Agentur-Killer',
  description = 'Wir beenden Ineffizienz. High-End Webentwicklung & Design für Agenturen und Unternehmen.',
  image = `${import.meta.env.VITE_SITE_URL || 'https://www.codayweb.de'}/images/og-image.jpg`,
  noIndex = false,
  breadcrumbs,
  pageType = 'default',
  preloadImage,
  schemaData,
  ...props
}) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Helper to get clean path without language prefix
  const getPathWithoutLang = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    // @ts-expect-error
    if (SUPPORTED_LANGUAGES.includes(segments[0])) {
      return '/' + segments.slice(1).join('/');
    }
    return path === '/' ? '/' : path;
  };

  const cleanPath = getPathWithoutLang(location.pathname);

  // Generate URLs
  const getLocalizedUrl = (lang: string) => {
    // Handle root path specially if needed, but usually /de or /en
    const path = cleanPath === '/' ? '' : cleanPath;
    return `${BASE_URL}/${lang}${path}`;
  };

  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  // Default links based on current path (assumes same slug)
  const defaultLinks = SUPPORTED_LANGUAGES.map((lang) => ({
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
    <>
      <Helmet htmlAttributes={{ lang: currentLang, dir: i18n.dir(currentLang) }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="qkqa8A5TESjhVg1kESd65TRfn9HBiSMrMnNBTXAoOko"
        />

        {/* LCP Optimization */}
        {preloadImage && (
          <link
            rel="preload"
            as="image"
            href={preloadImage}
            // @ts-expect-error - fetchPriority is standard but React types might complain
            fetchpriority="high"
          />
        )}

        {/* Canonical & Hreflang */}
        {links.map((link, index) => (
          <link key={index} rel={link.rel} href={link.href} hrefLang={link.hreflang} />
        ))}

        {/* Open Graph */}
        <meta property="og:site_name" content="Coday" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : 'de_DE'} />
        <meta property="og:locale:alternate" content={currentLang === 'en' ? 'de_DE' : 'en_US'} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {noIndex && <meta name="robots" content="noindex, follow" />}
      </Helmet>
      <JsonLd
        pageUrl={canonicalUrl}
        breadcrumbs={breadcrumbs}
        pageType={pageType}
        data={schemaData}
      />
    </>
  );
};
