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

export const dynamic = 'force-static';

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
    landingPages = files
      .filter((dirent) => dirent.isDirectory() && dirent.name !== 'giessen')
      .map((dirent) => dirent.name);
  } catch (e) {
    console.error('Failed to read landingpages directory');
  }

  return (
    <main className="bg-background-light min-h-dvh pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-12">
          {locale === 'en'
            ? 'Coday Web Design Sitemap'
            : 'Sitemap & Seitenübersicht der Coday Agentur'}
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
                  locale="de"
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
                    locale="de"
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
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Handwerker
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gesundheitswesen"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Gesundheitswesen
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gastronomie"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Gastronomie
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/dienstleistung"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Dienstleistung
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/immobilien"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Immobilien
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/immobilien-makler"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Immobilienmakler
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/public-sector"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Public Sector
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gesundheitswesen/arzt-giessen"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Arzt Website Gießen
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/gesundheitswesen/arzt-wetzlar"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Arzt Website Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/handwerker/wetzlar"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Handwerker Website Wetzlar
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/automobil/kfz-werkstatt"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  KFZ Werkstatt
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/automobil/autohaendler"
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Autohändler
                </Link>
              </li>
              <li>
                <Link
                  href="/branchen/automobil/kfz-mechatroniker"
                  locale="de"
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

          {/* Work / Portfolio */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
              {locale === 'en' ? 'Work & Portfolio' : 'Work & Portfolio'}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/work" className="text-text-light hover:text-primary transition-colors">
                  {locale === 'en' ? 'All Projects' : 'Alle Projekte'}
                </Link>
              </li>
              <li>
                <Link
                  href="/work/hey-fede"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Hey Fede – Case Study
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
                  locale="de"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Standort Gießen
                </Link>
              </li>
              <li>
                <Link
                  href="/standorte/hessen"
                  locale="de"
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

        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h3 className="text-3xl font-display font-bold mb-6">
            {locale === 'en'
              ? 'Coday Digital Services & Solutions Overview'
              : 'Übersicht: Coday Digitale Leistungen & Lösungen'}
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            {locale === 'en' ? (
              <>
                <p>
                  This sitemap provides a comprehensive overview of the Coday Web Design agency
                  website. Here you will find quick links to all main pages, detailed web design and
                  development services, industry-specific solutions, portfolio case studies, and
                  local landing pages designed for optimal search engine visibility. We continuously
                  update this directory to ensure you can easily navigate the entire Coday website
                  and discover how our premium digital solutions can help elevate your brand. Every
                  link on this page is structured to reduce click depth and help both users and
                  search engine crawlers find content efficiently.
                </p>
                <p>
                  Whether you are looking for local SEO strategies, custom React development, or a
                  complete brand overhaul, our structured sitemap helps you find the right
                  information efficiently. As a dedicated web engineering partner, Coday ensures
                  that all digital touchpoints are built for maximum performance, accessibility, and
                  exceptional user experience across all devices. From our portfolio showcasing real
                  client projects to our industry pages covering healthcare, automotive, real
                  estate, and more — every section of this website is crafted to give you a
                  transparent view of what Coday can deliver.
                </p>
                <p>
                  Our web design services are tailored for businesses of every size across Wetzlar,
                  Hesse, and beyond. This page overview includes direct access to our specialized
                  service pages — covering everything from UX/UI design and brand identity to
                  generative engine optimization (GEO) and technical SEO audits. We also list all
                  regional landing pages and location-specific content to help local businesses find
                  exactly what they need. Coday&apos;s sitemap is not just an index; it is a
                  navigational tool designed to connect you with the right service as quickly as
                  possible.
                </p>
                <p>
                  Transparency and discoverability are core principles at Coday. That is why we
                  maintain this detailed page overview as a living document. As we add new services,
                  publish new case studies, or expand into additional regions, this sitemap is
                  updated accordingly. If you cannot find what you are looking for, do not hesitate
                  to contact us directly. We are always happy to help you navigate our offerings and
                  find the perfect solution for your digital project. Explore the full Coday Web
                  Design sitemap above and take the next step toward a stronger online presence.
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
                  Klicktiefe reduziert wird und sowohl Nutzer als auch Suchmaschinen-Crawler Inhalte
                  effizient finden.
                </p>
                <p>
                  Egal, ob Sie nach lokalen SEO-Strategien, individueller React-Entwicklung oder
                  einer kompletten Markenüberarbeitung suchen – unsere strukturierte Seitenübersicht
                  hilft Ihnen, die gewünschten Informationen schnell zu finden. Als Ihr
                  zuverlässiger Partner für Web-Engineering stellt Coday sicher, dass alle digitalen
                  Berührungspunkte auf maximale Performance, Barrierefreiheit und eine herausragende
                  User Experience auf allen Geräten optimiert sind. Von unserem Portfolio, das echte
                  Kundenprojekte zeigt, bis hin zu unseren Branchenseiten für Gesundheitswesen,
                  Automobil, Immobilien und mehr – jeder Bereich dieser Website ist darauf
                  ausgelegt, Ihnen einen transparenten Einblick in die Leistungsfähigkeit von Coday
                  Webdesign zu geben.
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
                  neue Dienstleistungen hinzufügen, neue Fallstudien veröffentlichen oder in weitere
                  Regionen expandieren, wird diese Sitemap entsprechend aktualisiert. Falls Sie
                  nicht finden, was Sie suchen, zögern Sie nicht, uns direkt zu kontaktieren. Wir
                  helfen Ihnen gerne, sich in unserem Angebot zurechtzufinden und die perfekte
                  Lösung für Ihr digitales Projekt zu entdecken. Erkunden Sie die vollständige Coday
                  Webdesign Sitemap oben und machen Sie den nächsten Schritt zu einer stärkeren
                  Online-Präsenz.
                </p>
              </>
            )}
          </div>
        </section>
      </div>
      <SeoContentBlock />
    </main>
  );
}
