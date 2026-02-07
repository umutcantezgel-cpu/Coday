import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

const SUPPORTED_LANGUAGES = ['de', 'en'];
const DEFAULT_LANGUAGE = 'de';
const BASE_URL = 'https://coday.de';

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'Coday | Der Agentur-Killer',
  description = 'Wir beenden Ineffizienz. High-End Webentwicklung & Design für Agenturen und Unternehmen.',
  image = 'https://coday.de/images/og-image.jpg',
  noIndex = false,
}) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Helper to get clean path without language prefix
  const getPathWithoutLang = (path: string) => {
    const segments = path.split('/').filter(Boolean);
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

  const links: { rel: string; href: string; hreflang?: string }[] = [
    { rel: 'canonical', href: canonicalUrl },
    ...SUPPORTED_LANGUAGES.map((lang) => ({
      rel: 'alternate',
      hreflang: lang,
      href: getLocalizedUrl(lang),
    })),
    // Add x-default
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: getLocalizedUrl(DEFAULT_LANGUAGE),
    },
  ];



  // Manual Helmet workaround for links/meta removed. Using Helmet directly.

  return (
    <Helmet htmlAttributes={{ lang: currentLang, dir: i18n.dir(currentLang) }}>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical & Hreflang */}
      {links.map((link, index) => (
        <link key={index} rel={link.rel} href={link.href} hrefLang={link.hreflang} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : 'de_DE'} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noIndex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};
