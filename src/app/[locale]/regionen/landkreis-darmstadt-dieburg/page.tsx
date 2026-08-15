import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import {
  ArrowRight,
  Lightning,
  ShieldCheck,
  Code,
  Buildings,
  Users,
  Check,
  Sparkle,
  LockKey,
  CheckCircle,
  Cpu,
  Storefront,
  Wrench,
  MapPin,
} from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Darmstadt-Dieburg District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js development in Darmstadt-Dieburg (Griesheim, Weiterstadt, Pfungstadt, Dieburg). 100/100 PageSpeed!',
      path: '/en/regionen/landkreis-darmstadt-dieburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Darmstadt-Dieburg | Next.js Agentur – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung im Landkreis Darmstadt-Dieburg (Griesheim, Weiterstadt, Pfungstadt, Dieburg). 100/100 PageSpeed!',
    path: '/de/regionen/landkreis-darmstadt-dieburg',
    type: 'money',
  });
}

export default async function LandkreisDarmstadtDieburgPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Dieburg (Ehemalige Kreisstadt)',
      link: '/webdesign-darmstadt',
      highlight: true,
      note: 'Hochschule Darmstadt Campus & Medien-Hub',
    },
    {
      name: 'Griesheim',
      link: '/webdesign-darmstadt',
      highlight: true,
      note: 'Größte Stadt im Kreis & Technologiezentrum',
    },
    {
      name: 'Weiterstadt',
      link: '/webdesign-darmstadt',
      highlight: true,
      note: 'Großhandels-, Shopping- & Logistik-Achse A5',
    },
    {
      name: 'Pfungstadt',
      link: '/webdesign-darmstadt',
      highlight: true,
      note: 'Industrie, Brautradition & Gewerbeparks',
    },
    {
      name: 'Groß-Umstadt',
      link: '/webdesign-darmstadt',
      highlight: true,
      note: 'Odenwälder Weininsel, Lebensmittel & Maschinenbau',
    },
    {
      name: 'Reinheim',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Tor zum Odenwald & B2B-Mittelstand',
    },
    {
      name: 'Babenhausen',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Continental-Standort, Automotive & Handwerk',
    },
    {
      name: 'Ober-Ramstadt',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'DAW SE / Caparol HQ & Farbenindustrie',
    },
    {
      name: 'Seeheim-Jugenheim',
      link: '/webdesign-bensheim',
      highlight: false,
      note: 'Bergstraße, Lufthansa Training Center & Wohnen',
    },
    {
      name: 'Alsbach-Hähnlein',
      link: '/webdesign-bensheim',
      highlight: false,
      note: 'Bergstraße & Handwerksbetriebe',
    },
    {
      name: 'Bickenbach',
      link: '/webdesign-bensheim',
      highlight: false,
      note: 'Alnatura HQ & Bio-Logistik',
    },
    {
      name: 'Roßdorf',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Gewerbe & Darmstadt-Nähe',
    },
    {
      name: 'Münster (Hessen)',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Mittelstand & Bauwirtschaft',
    },
    {
      name: 'Erzhausen',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Wohn- & Gewerbestandort',
    },
    {
      name: 'Messel',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'UNESCO Welterbe & Handwerk',
    },
    {
      name: 'Modautal',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Odenwald-Handwerk & Tourismus',
    },
    {
      name: 'Mühltal',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Riese & Müller HQ & E-Bike-Pionier',
    },
    {
      name: 'Otzberg',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Veste Otzberg & regionales Handwerk',
    },
    {
      name: 'Fischbachtal',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Schloss Lichtenberg & Gewerbe',
    },
    {
      name: 'Eppertshausen',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Baugewerbe & Handwerk',
    },
    {
      name: 'Schaafheim',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Grenzregion Bayern & Handwerk',
    },
    {
      name: 'Dieburg-Nord',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Industriegebiet an der B26',
    },
    {
      name: 'Weiterstadt-Riedbahn',
      link: '/webdesign-darmstadt',
      highlight: false,
      note: 'Handels- & B2B-Park',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-darmstadt-dieburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Landkreis Darmstadt-Dieburg',
        url: `${BASE_URL}/${_locale}/regionen/landkreis-darmstadt-dieburg`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Darmstadt-Dieburg / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 49.8986,
          longitude: 8.8419,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Landkreis Darmstadt-Dieburg' },
          { '@type': 'City', name: 'Dieburg' },
          { '@type': 'City', name: 'Griesheim' },
          { '@type': 'City', name: 'Weiterstadt' },
          { '@type': 'City', name: 'Pfungstadt' },
          { '@type': 'City', name: 'Groß-Umstadt' },
          { '@type': 'City', name: 'Ober-Ramstadt' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-darmstadt-dieburg#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Darmstadt-Dieburg',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Enterprise Webentwicklung',
          'Hightech-, Sensorik- & Maschinenbau-Portale',
          'Großhandels- & E-Commerce Plattformen Weiterstadt',
          'Handwerk & SHK 60-Sekunden Recruiting Darmstadt-Dieburg',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für Darmstadt-Dieburg',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Hightech & Sensorik Unternehmensportale',
                description:
                  'Hochperformante Next.js-Webseiten für Technologieunternehmen im Umfeld der Wissenschaftsstadt Darmstadt.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Großhandels- & B2B-Katalogplattformen',
                description:
                  'Subsekundäre Produktkataloge und ERP-Schnittstellen für Distributionszentren in Weiterstadt und Pfungstadt.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Handwerk & Bautechnik Express-Recruiting',
                description:
                  '60-Sekunden Mobile-Recruiting Strecken zur planbaren Mitarbeitergewinnung in Darmstadt-Dieburg.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/25 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-amber-400" />
            HIGHTECH- & WIRTSCHAFTSREGION DARMSTADT-DIEBURG
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Darmstadt-Dieburg:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed für Griesheim, Weiterstadt & Dieburg
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Von den großen Handels- und Distributionszentren in Weiterstadt über die Hightech- und
            Maschinenbaubetriebe in Griesheim und Pfungstadt bis zum starken Handwerksmittelstand an
            der Bergstraße und im Odenwald: Wir bauen Next.js-Websites mit maximaler Performance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02]"
              >
                Kostenloses Website-Audit anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/webdesign-darmstadt" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Hub Darmstadt ansehen
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">CMS-Risiko</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">55 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">via A5 ab HQ</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">23 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: REGIONALE INDUSTRIE- & TECHNOLOGIE-DNA */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen in Darmstadt-Dieburg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites im südhessischen Hightech-Gürtel scheitern
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen der Wissenschaftsstadt Darmstadt und der Rhein-Neckar-Metropolregion herrscht
              ein intensiver Wettbewerb um B2B-Aufträge und hochqualifizierte Fachkräfte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Widerspruch zwischen Hightech & Webauftritt
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Präzisionsfertiger und Sensorik-Pioniere präsentieren sich mit langsamen
                WordPress-Themes. Next.js spiegelt Ihren technologischen Qualitätsanspruch 1:1
                wider.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräfte-Wettbewerb mit Großkonzernen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Der Mittelstand in Darmstadt-Dieburg konkurriert mit Merck, Software AG und DAW.
                60-Sekunden Mobile-Recruiting gewinnt Gesellen und Ingenieure direkt am Smartphone.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wartungsaufwand & Sicherheitsrisiken
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                PHP- und Plugin-Updates verursachen ständige Ausfälle und Sicherheitslecks. Next.js
                schützt Ihre Website durch serverseitige Vorkompilierung ohne offene Datenbanken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS EDGE VS. WORDPRESS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Enterprise-Architektur
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js Edge & Sanity CMS: Hochleistungs-Standard für Darmstadt-Dieburg
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Statische Vorkompilierung, maximale Stabilität und intuitive Redaktions-Workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subsekundärer Seitenaufbau</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Unter 0,3 Sekunden Ladezeit. Technische Spezifikationen, Produktfilter und
                Recruiting-Strecken öffnen verzögerungsfrei.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100/100 Core Web Vitals
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise-Sicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Keine angreifbare MySQL-Datenbank im Netz. Immun gegen Brute-Force, DDoS und
                automatisierte Hacker-Angriffe.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                0% CMS Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sanity Headless CMS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Verwalten Sie Produkte, News und Stellenangebote eigenständig in einer modernen,
                übersichtlichen Redaktionsumgebung.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR DARMSTADT-DIEBURG */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Spitzenbranchen in Darmstadt-Dieburg
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Hightech, Großhandel und regionales Handwerk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Griesheim, Pfungstadt & Dieburg
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Hightech, Sensorik & Maschinenbau
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochmoderne B2B-Plattformen für Sondermaschinenbauer, Sensorikhersteller und
                  IT-Entwickler mit weltweitem Vertriebsfokus.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Technische Spezifikations- & Produktfilter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Internationale Leadgenerierung
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Weiterstadt, Bickenbach & Babenhausen
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Großhandel & Distributionszentren
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ultraschnelle Headless E-Commerce Frontends mit ERP-Anbindung für die großen
                  Handels- und Distributionszentren an der Autobahn A5.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Subsekundärer Checkout & Produktkatalog
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  B2B-Händlerportale & Kundenkonten
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Groß-Umstadt, Ober-Ramstadt & Seeheim
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Handwerk & Bautechnik</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern,
                  Meistern und Azubis im gesamten Landkreis Darmstadt-Dieburg.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mobile 60-Sekunden Mitarbeiter-Gewinnung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Lokale SEO-Dominanz in Südhessen
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEMEINDE-GRID: ALLE 23 KOMMUNEN DES LANDKREISES DARMSTADT-DIEBURG */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 23 Städten & Gemeinden in Darmstadt-Dieburg
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Griesheim, Weiterstadt, Pfungstadt, Dieburg, die Bergstraße oder der Vorderer
              Odenwald: Wir sind Ihr regionaler High-Tech Webpartner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {kommunen.map((k) => (
              <div
                key={k.name}
                className={`p-5 rounded-xl border transition-all ${
                  k.highlight
                    ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">{k.name}</span>
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                </div>
                <div className="text-xs text-slate-400 mb-3">{k.note}</div>
                <Link
                  href={k.link}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                >
                  Regionales Hub ansehen →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: 55 MIN VIA A5 */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse Autobahn A5
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 55 Minuten vor Ort im Landkreis Darmstadt-Dieburg
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die Autobahn A5 erreichen wir Weiterstadt, Griesheim, Pfungstadt und Dieburg in
                rund 50 bis 60 Minuten ab unserem Headquarter in Wetzlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Lead-Architekt Umutcan Emre Tezgel zusammen:
                Keine Agentur-Zwischenhändler, garantierte Termintreue und transparente Festpreise.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Vor-Ort-Betreuung in Darmstadt-Dieburg</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkter Draht zur technischen Leitung</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>100 % Sourcecode- und Design-Eigentum</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A5 DIREKT • 55 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Darmstadt-Dieburg
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen digitale Werkzeuge, die Ihre Marktposition festigen und planbar
                qualifizierte Anfragen sichern.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Direktzugang zu den lokalen Hubs:
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <Link
                    href="/webdesign-darmstadt"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Hub Darmstadt (Wissenschaftsstadt)
                  </Link>
                  <Link
                    href="/webdesign-bensheim"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Hub Bensheim & Hessische Bergstraße
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & AUDIT FUNNEL */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
            Kostenloses Website-Audit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für den digitalen Spitzenplatz in Darmstadt-Dieburg?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie Ihre aktuelle Website auf Core Web Vitals, Architektur-Schwachstellen und
            Conversion-Potenziale analysieren – transparent, fundiert und unverbindlich.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns die Web-Adresse Ihres Unternehmens via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                10-minütige Analyse mit konkreten Handlungsschritten für Ladezeit und B2B-Leads.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen bei Ihnen in Darmstadt-Dieburg oder via Video-Call.
              </div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02]"
            >
              Jetzt kostenloses Audit anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 8. SEMANTISCHE VERLINKUNG / PROXIMITY CROSS-LINKS */}
      <footer className="py-16 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 font-semibold mb-6 uppercase tracking-wider">
            Regionale Vernetzung & Standorte in Darmstadt-Dieburg & Hessen
          </div>
          <div grid-cols-2 className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Darmstadt & Bergstraße</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-darmstadt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Darmstadt (Zentrum)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-bensheim"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Bensheim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar (HQ)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Nachbarregionen</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/regionen/kreis-offenbach"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Kreis Offenbach
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-ruesselsheim"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Rüsselsheim & Groß-Gerau
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-frankfurt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Frankfurt am Main
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Südhessen Hubs</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-dietzenbach"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Dietzenbach & Dreieich
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-rodgau" className="hover:text-amber-400 transition-colors">
                    Webdesign Rodgau
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-hanau" className="hover:text-amber-400 transition-colors">
                    Webdesign Hanau
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Enterprise & Services</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/enterprise-web"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Enterprise B2B-Webentwicklung
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Darmstadt-Dieburg
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Hessen Standorte Übersicht
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Coday Webagentur. Alle Rechte vorbehalten.</div>
            <div className="flex gap-6">
              <Link href="/legal/impressum" className="hover:text-slate-200 transition-colors">
                Impressum
              </Link>
              <Link href="/legal/datenschutz" className="hover:text-slate-200 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
