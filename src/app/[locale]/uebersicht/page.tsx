import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { industriesData } from '@/shared/data/industries';
import { servicesData } from '@/shared/data/services';
import fs from 'fs';
import path from 'path';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Sitemap | Coday Web Design',
      description:
        'Overview of all pages, services, industries, and locations of Coday Web Design.',
      path: '/en/uebersicht',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Sitemap | Coday Webdesign',
    description:
      'Übersicht aller Seiten, Leistungen, Branchen und Standorte der Coday Webdesign Agentur.',
    path: '/de/uebersicht',
    type: 'default',
  });
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'common' });

  // Get local landing pages dynamically from the actual route folder
  const landingPagesDir = path.join(process.cwd(), 'src', 'app', '[locale]', 'landingpages');
  let landingPages: string[] = [];
  try {
    const files = fs.readdirSync(landingPagesDir, { withFileTypes: true });
    landingPages = files.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
  } catch (e) {
    console.error('Failed to read landingpages directory');
  }

  return (
    <main className="bg-background-light min-h-dvh pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-12">
          {locale === 'en' ? 'Sitemap' : 'Seitenübersicht'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Pages */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Main Pages' : 'Hauptseiten'}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-light hover:text-primary transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-text-light hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Preise
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Prozess
                </Link>
              </li>
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
                  href="/services"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Alle Leistungen
                </Link>
              </li>
              {locale === 'de' && (
                <li>
                  <Link
                    href="/angebot-handwerker"
                    locale="de"
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    Angebot für Handwerker
                  </Link>
                </li>
              )}
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Services' : 'Leistungen'}
            </h2>
            <ul className="space-y-2">
              {Object.entries(servicesData).map(([category, categoryData]) => (
                <React.Fragment key={category}>
                  {Object.keys(categoryData as any).map((slug) => {
                    let href = `/services/${category}/${slug}`;
                    if (slug === 'design-systems') href = '/services/design/design-systems';
                    if (slug === 'ux-ui-design') href = '/services/design/ui-ux';

                    return (
                      <li key={slug}>
                        <Link
                          href={href}
                          className="text-text-light hover:text-primary transition-colors"
                        >
                          {slug
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </Link>
                      </li>
                    );
                  })}
                </React.Fragment>
              ))}
              <li>
                <Link
                  href="/services/generative-engine-optimization"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Generative Engine Optimization (GEO)
                </Link>
              </li>
              <li>
                <Link
                  href="/services/design/brand-identity"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link
                  href="/services/design/ux-audit"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  UX Audit
                </Link>
              </li>
            </ul>
          </section>

          {/* Industries */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Industries' : 'Branchen'}
            </h2>
            <ul className="space-y-2">
              {Object.values(industriesData).map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/branchen/${industry.slug}`}
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {industry.slug
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/branchen/handwerker"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Handwerker
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gesundheitswesen"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Gesundheitswesen
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gastronomie"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Gastronomie
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/dienstleistung"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Dienstleistung
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/immobilien"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Immobilien
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/public-sector"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Public Sector
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gesundheitswesen/arzt-giessen"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Arzt Website Gießen
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gesundheitswesen/arzt-wetzlar"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Arzt Website Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/handwerker/wetzlar"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Handwerker Website Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/automobil/kfz-werkstatt"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  KFZ Werkstatt
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/automobil/autohaendler"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Autohändler
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/automobil/kfz-mechatroniker"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  KFZ Mechatroniker Recruiting
                </Link>
              </li>
            </ul>
          </section>

          {/* Tools */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Tools' : 'Tools'}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/analyzer"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Website Analyzer
                </Link>
              </li>
            </ul>
          </section>

          {/* Locations & Landingpages */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Locations & Landing Pages' : 'Standorte & Landingpages'}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/webdesign-agentur-wetzlar"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Webdesign Wetzlar (Agentur)
                </Link>
              </li>
              <li>
                <Link
                  href="/webdesign-agentur-wetzlar"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Standort Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  href="/standorte/giessen"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Standort Gießen
                </Link>
              </li>
              <li>
                <Link
                  href="/standorte/hessen"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Standort Hessen
                </Link>
              </li>
              {landingPages.map((city) => {
                const formattedCity =
                  city.toLowerCase() === 'giessen'
                    ? 'Gießen'
                    : city.charAt(0).toUpperCase() + city.slice(1);
                return (
                  <li key={`lp-${city}`}>
                    <Link
                      href={`/landingpages/${city}`}
                      locale="de"
                      className="text-text-light hover:text-primary transition-colors"
                    >
                      Landingpage {formattedCity}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Legal' : 'Rechtliches'}
            </h2>
            <ul className="space-y-2">
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
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/agb"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <SeoContentBlock />
    </main>
  );
}
