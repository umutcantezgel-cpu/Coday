import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getOrganizationSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';
import { getBlogPosts } from '@/features/blog/model/data';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Sitemap & Overview of All Pages · Coday Web Design',
      description:
        'Complete page directory and sitemap of Coday Web Design agency with all services, industry solutions, tools, and local landing pages.',
      keywords: [
        'Coday Directory',
        'Website Sitemap',
        'Web Design Hesse Locations',
        'Coday Web Agency Overview',
      ],
      path: '/en/uebersicht',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Übersicht aller Seiten & Standorte · Coday Webdesign',
    description:
      'Vollständige Seitenübersicht der Coday Webdesign Agentur mit allen Leistungen, Branchenlösungen, Tools und Standorten in Hessen.',
    keywords: [
      'Coday Web Übersicht',
      'Webdesign Standorte Hessen',
      'Webentwicklung Leistungsübersicht',
      'Sitemap Coday Agentur',
    ],
    path: '/de/uebersicht',
    type: 'default',
  });
}

const localTowns = [
  { href: '/webdesign-agentur-wetzlar', label: 'Website erstellen lassen in Wetzlar' },
  { href: '/webdesign-giessen', label: 'Webdesign Gießen' },
  { href: '/webdesign-marburg', label: 'Webdesign Marburg' },
  { href: '/webdesign-herborn', label: 'Webdesign Herborn' },
  { href: '/webdesign-limburg', label: 'Webdesign Limburg' },
  { href: '/webdesign-weilburg', label: 'Webdesign Weilburg' },
  { href: '/webdesign-loehnberg', label: 'Webdesign Löhnberg' },
  { href: '/webdesign-dillenburg', label: 'Webdesign Dillenburg' },
  { href: '/webdesign-friedberg', label: 'Webdesign Friedberg' },
  { href: '/webdesign-frankfurt', label: 'Webdesign Frankfurt am Main' },
  { href: '/webdesign-wiesbaden', label: 'Webdesign Wiesbaden' },
  { href: '/webdesign-darmstadt', label: 'Webdesign Darmstadt' },
  { href: '/webdesign-kassel', label: 'Webdesign Kassel' },
  { href: '/webdesign-offenbach', label: 'Webdesign Offenbach' },
  { href: '/webdesign-hanau', label: 'Webdesign Hanau' },
  { href: '/webdesign-fulda', label: 'Webdesign Fulda' },
  { href: '/webdesign-bad-homburg', label: 'Webdesign Bad Homburg' },
  { href: '/webdesign-oberursel', label: 'Webdesign Oberursel' },
  { href: '/webdesign-bad-vilbel', label: 'Webdesign Bad Vilbel' },
  { href: '/webdesign-hofheim', label: 'Webdesign Hofheim' },
  { href: '/webdesign-ruesselsheim', label: 'Webdesign Rüsselsheim' },
  { href: '/webdesign-bensheim', label: 'Webdesign Bensheim' },
  { href: '/webdesign-rodgau', label: 'Webdesign Rodgau' },
  { href: '/webdesign-dietzenbach', label: 'Webdesign Dietzenbach' },
  { href: '/standorte/hessen', label: 'Webdesign Hessen Übersicht' },
  { href: '/landingpages/nextjsmigration', label: 'Next.js Migration Service' },
];

const localDistricts = [
  { href: '/regionen/landkreis-lahn-dill', label: 'Landkreis Lahn-Dill' },
  { href: '/regionen/landkreis-giessen', label: 'Landkreis Gießen' },
  { href: '/regionen/wetteraukreis', label: 'Wetteraukreis' },
  { href: '/regionen/hochtaunuskreis', label: 'Hochtaunuskreis' },
  { href: '/regionen/main-taunus-kreis', label: 'Main-Taunus-Kreis' },
  { href: '/regionen/kreis-offenbach', label: 'Kreis Offenbach' },
  { href: '/regionen/main-kinzig-kreis', label: 'Main-Kinzig-Kreis' },
  { href: '/regionen/landkreis-marburg-biedenkopf', label: 'Landkreis Marburg-Biedenkopf' },
  { href: '/regionen/landkreis-limburg-weilburg', label: 'Landkreis Limburg-Weilburg' },
  { href: '/regionen/rheingau-taunus-kreis', label: 'Rheingau-Taunus-Kreis' },
  { href: '/regionen/landkreis-darmstadt-dieburg', label: 'Landkreis Darmstadt-Dieburg' },
  { href: '/regionen/landkreis-fulda', label: 'Landkreis Fulda' },
  { href: '/regionen/landkreis-kassel', label: 'Landkreis Kassel' },
];

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Overview' : 'Übersicht', url: `/${_locale}/uebersicht` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/uebersicht`,
        name: isEn ? 'Coday Sitemap & Directory' : 'Coday Seitenübersicht',
        description: isEn
          ? 'Directory of all services, locations and solutions.'
          : 'Übersicht aller Leistungen, Standorte und Branchenlösungen der Coday Webagentur.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        id="schema-sitemap"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background-light min-h-dvh pt-4 pb-16 md:pt-6 md:pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-12">
            {locale === 'en'
              ? 'Coday Web Design Directory & Sitemap'
              : 'Sitemap & Seitenübersicht der Coday Agentur'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Main Pages */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en' ? 'Main Navigation & Core Pages' : 'Hauptseiten & Navigation'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-text-light hover:text-primary transition-colors">
                    {locale === 'en' ? 'Startseite (Homepage)' : 'Startseite'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'About Coday & Umutcan Tezgel'
                      : 'Über Umutcan Emre Tezgel & Coday'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Development Process' : 'Entwicklungsprozess'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Pricing & Packages' : 'Preise & Pakete'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Contact & Inquiry' : 'Kontakt & Projektanfrage'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'References & Case Studies' : 'Referenzen & Case Studies'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/hey-fede"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: Hey Fede
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/schluesseldienst-wetzlar"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: Schlüsseldienst Wetzlar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/batherm"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: Batherm
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/lindener-ratsstuben"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: Lindener Ratsstuben
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/talia-boutique"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: Talia Boutique
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/memobaut"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: MemoBau
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work/memo-baut"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Case Study: Memo Baut
                  </Link>
                </li>
              </ul>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en'
                  ? 'Web Design & Engineering Services'
                  : 'Webdesign & Webentwicklung Services'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/services"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'All Services Overview' : 'Alle Leistungen im Überblick'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/web-design"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign Leistungen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/web-development"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webentwicklung Leistungen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ecommerce-development"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    E-Commerce Onlineshops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/enterprise-web"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Enterprise Webentwicklung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/design/ui-ux"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    UI & UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/design/brand-identity"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Brand Identity & Corporate Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/design/design-systems"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Design Systems
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/design/ux-audit"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    UX & Usability Audit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/development/api-integration"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    API & Schnittstellen Integration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/development/headless-cms"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Headless CMS Integration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/development/migration"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    CMS & Website Migration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/development/web-apps"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Web App Entwicklung
                  </Link>
                </li>
              </ul>
            </section>

            {/* Growth & SEO */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en'
                  ? 'Search Engine Optimization & Performance'
                  : 'SEO & Performance Optimierung'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/services/seo"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Suchmaschinenoptimierung (SEO)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/performance"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    PageSpeed Optimierung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/consulting"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Digitale Strategieberatung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/generative-engine-optimization"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Generative Engine Optimization (GEO)
                  </Link>
                </li>
              </ul>
            </section>

            {/* Industries */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en'
                  ? 'Industry-Specific Web Solutions'
                  : 'Branchenspezifische Weblösungen'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/branchen"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Branchenübersicht
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/handwerk-bau"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Handwerker & Bau
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/aerzte-gesundheit"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Ärzte & Praxen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/gastronomie"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Gastronomie & Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/dienstleistung"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Dienstleister
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/immobilien"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Immobilienmakler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/anwaelte-kanzleien"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Anwälte & Kanzleien
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/unternehmensberatung"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Unternehmensberatung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/startups-tech"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Startups & Tech
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/retail"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Einzelhandel & Retail
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/public-sector"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Öffentlichen Sektor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/automobil"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign für Automobilbranche
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/handwerk-bau/wetzlar"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign Handwerk & Bau Wetzlar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/handwerk-bau/giessen"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Webdesign Handwerk & Bau Gießen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/aerzte-gesundheit/wetzlar"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Praxis-Webdesign für Ärzte Wetzlar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/branchen/aerzte-gesundheit/giessen"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Praxis-Webdesign für Ärzte Gießen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/angebot-handwerker"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Exklusiv-Angebot Handwerker
                  </Link>
                </li>
              </ul>
            </section>

            {/* Local Cities */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en'
                  ? 'Regional Locations & Cities in Hesse'
                  : 'Städte & Regionale Standorte'}
              </h2>
              <ul className="space-y-2 text-sm">
                {localTowns.map((town) => (
                  <li key={town.href}>
                    <Link
                      href={town.href}
                      className="text-text-light hover:text-primary transition-colors"
                    >
                      {town.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Regional Districts */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en'
                  ? 'Administrative Districts & Counties'
                  : 'Landkreise & Regionen in Mittelhessen'}
              </h2>
              <ul className="space-y-2 text-sm">
                {localDistricts.map((district) => (
                  <li key={district.href}>
                    <Link
                      href={district.href}
                      className="text-text-light hover:text-primary transition-colors"
                    >
                      {district.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tools & Resources */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en'
                  ? 'Digital Tools, Calculators & Resources'
                  : 'Tools, Rechner & Fachwissen'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/calculator"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Interactive Website Cost Calculator & Audit'
                      : 'Kostenloser Website Kostenrechner & Audit'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Book a Free Strategy Consultation'
                      : 'Strategiegespräch buchen'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge/blog"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Coday Web & SEO Blog' : 'Coday Tech & SEO Blog'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge/faq"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Frequently Asked Questions (FAQ)'
                      : 'Häufig gestellte Fragen (FAQ)'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge/academy"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Web Design Academy & Video Masterclasses'
                      : 'Webdesign Academy & Video-Masterclasses'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge/wikihub"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Tech Wiki & Digital Glossary'
                      : 'Tech-Wiki & Digital-Glossar'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge/whitepapers"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Whitepapers & Studies' : 'Whitepapers & Studien'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge/newsletter"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Newsletter: Web Design Trends'
                      : 'Newsletter: Webdesign-Trends'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/strobi"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Strobi World: Interactive AI Avatar'
                      : 'Strobi World: Interaktiver KI-Avatar'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garantie"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? '100% Performance Guarantee' : '100% Performance-Garantie'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/presse"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Press & Media Coverage' : 'Presse & Medien'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partnerschaft"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en' ? 'Agency Partnership Program' : 'Agentur Partnerschaften'}
                  </Link>
                </li>
              </ul>
            </section>

            {/* Blog Articles — full index so every post has a stable second inlink */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en' ? 'Blog Articles' : 'Blog-Artikel'}
              </h2>
              <ul className="space-y-2 text-sm">
                {getBlogPosts(locale).map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/knowledge/blog/${post.slug}`}
                      className="text-text-light hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Careers */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en' ? 'Careers & Jobs' : 'Karriere & Stellenangebote'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/career"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Careers at Coday (Overview & Opportunities)'
                      : 'Karriere bei Coday (Übersicht & Einstieg)'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career/jobs"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Open Positions & Job Openings (Web Design & Dev)'
                      : 'Offene Stellen & Jobangebote (Webdesign & Dev)'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career/culture"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Team Culture & Agency Philosophy'
                      : 'Teamkultur & Agentur-Philosophie'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career/benefits"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {locale === 'en'
                      ? 'Benefits & Work Model (Remote & Hardware Setup)'
                      : 'Benefits & Arbeitsmodell (Remote & Hardware-Setup)'}
                  </Link>
                </li>
              </ul>
            </section>

            {/* Legal */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                {locale === 'en' ? 'Legal Information & Compliance' : 'Rechtliches & Compliance'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/legal/impressum"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/datenschutz"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Datenschutzerklärung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/agb"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Allgemeine Geschäftsbedingungen
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
            <h2 className="text-3xl font-display font-bold mb-6">
              {locale === 'en'
                ? 'Comprehensive Digital Services & Directory Overview'
                : 'Ausführliche Übersicht aller digitalen Leistungen & Standorte'}
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              {locale === 'en' ? (
                <>
                  <p>
                    This sitemap provides a comprehensive overview of the Coday Web Design agency
                    website. Here you will find quick links to all main pages, detailed web design
                    and development services, industry-specific solutions, portfolio case studies,
                    and local landing pages designed for optimal search engine visibility. We
                    continuously update this directory to ensure you can easily navigate the entire
                    Coday website and discover how our premium digital solutions can help elevate
                    your brand. Every link on this page is structured to reduce click depth and help
                    both users and search engine crawlers find content efficiently.
                  </p>
                  <p>
                    Whether you are looking for local SEO strategies, custom React development, or a
                    complete brand overhaul, our structured sitemap helps you find the right
                    information efficiently. As a dedicated web engineering partner, Coday ensures
                    that all digital touchpoints are built for maximum performance, accessibility,
                    and exceptional user experience across all devices. From our portfolio
                    showcasing real client projects to our industry pages covering healthcare,
                    automotive, real estate, and more — every section of this website is crafted to
                    give you a transparent view of what Coday can deliver.
                  </p>
                  <p>
                    Our web design services are tailored for businesses of every size across
                    Wetzlar, Hesse, and beyond. This page overview includes direct access to our
                    specialized service pages — covering everything from UX/UI design and brand
                    identity to generative engine optimization (GEO) and technical SEO audits. We
                    also list all regional landing pages and location-specific content to help local
                    businesses find exactly what they need. Coday&apos;s sitemap is not just an
                    index; it is a navigational tool designed to connect you with the right service
                    as quickly as possible.
                  </p>
                  <p>
                    Transparency and discoverability are core principles at Coday. That is why we
                    maintain this detailed page overview as a living document. As we add new
                    services, publish new case studies, or expand into additional regions, this
                    sitemap is updated accordingly. If you cannot find what you are looking for, do
                    not hesitate to contact us directly. We are always happy to help you navigate
                    our offerings and find the perfect solution for your digital project. Explore
                    the full Coday Web Design sitemap above and take the next step toward a stronger
                    online presence.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Diese Sitemap bietet eine umfassende Seitenübersicht der Website der Coday
                    Webdesign Agentur. Hier finden Sie direkte Links zu allen Hauptseiten,
                    detaillierten Webdesign- und Entwicklungsleistungen, branchenspezifischen
                    Lösungen, Portfolio-Fallstudien sowie unseren lokalen Landingpages, die für
                    optimale Suchmaschinen-Sichtbarkeit konzipiert sind. Wir aktualisieren dieses
                    Verzeichnis kontinuierlich, damit Sie die gesamte Coday-Website problemlos
                    navigieren und herausfinden können, wie unsere Premium-Weblösungen Ihre Marke
                    stärken können. Jeder Link auf dieser Seite ist so strukturiert, dass die
                    Klicktiefe reduziert wird und sowohl Nutzer als auch Suchmaschinen-Crawler
                    Inhalte effizient finden.
                  </p>
                  <p>
                    Egal, ob Sie nach lokalen SEO-Strategien, individueller React-Entwicklung oder
                    einer kompletten Markenüberarbeitung suchen – unsere strukturierte
                    Seitenübersicht hilft Ihnen, die gewünschten Informationen schnell zu finden.
                    Als Ihr zuverlässiger Partner für Web-Engineering stellt Coday sicher, dass alle
                    digitalen Berührungspunkte auf maximale Performance, Barrierefreiheit und eine
                    herausragende User Experience auf allen Geräten optimiert sind. Von unserem
                    Portfolio, das echte Kundenprojekte zeigt, bis hin zu unseren Branchenseiten für
                    Gesundheitswesen, Automobil, Immobilien und mehr – jeder Bereich dieser Website
                    ist darauf ausgelegt, Ihnen einen transparenten Einblick in die
                    Leistungsfähigkeit von Coday Webdesign zu geben.
                  </p>
                  <p>
                    Unsere Webdesign-Dienstleistungen sind auf Unternehmen jeder Größe in Wetzlar,
                    Hessen und darüber hinaus zugeschnitten. Diese Seitenübersicht bietet direkten
                    Zugang zu unseren spezialisierten Serviceseiten – von UX/UI-Design und
                    Markenidentität über Generative Engine Optimization (GEO) bis hin zu technischen
                    SEO-Audits. Wir listen außerdem alle regionalen Landingpages und
                    standortspezifischen Inhalte auf, damit lokale Unternehmen genau das finden, was
                    sie brauchen. Die Coday Sitemap ist nicht nur ein Index, sondern ein
                    Navigationsinstrument, das Sie so schnell wie möglich mit dem richtigen Service
                    verbindet.
                  </p>
                  <p>
                    Transparenz und Auffindbarkeit sind Kernprinzipien bei Coday Webdesign. Deshalb
                    pflegen wir diese detaillierte Seitenübersicht als lebendiges Dokument. Wenn wir
                    neue Dienstleistungen hinzufügen, neue Fallstudien veröffentlichen oder in
                    weitere Regionen expandieren, wird diese Sitemap entsprechend aktualisiert.
                    Falls Sie nicht finden, was Sie suchen, zögern Sie nicht, uns direkt zu
                    kontaktieren. Wir helfen Ihnen gerne, sich in unserem Angebot zurechtzufinden
                    und die perfekte Lösung für Ihr digitales Projekt zu entdecken. Erkunden Sie die
                    vollständige Coday Webdesign Sitemap oben und machen Sie den nächsten Schritt zu
                    einer stärkeren Online-Präsenz.
                  </p>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
