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
  Flask,
  Factory,
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
      title: 'Web Design Marburg-Biedenkopf District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js development in Marburg-Biedenkopf (Marburg, Biedenkopf, Stadtallendorf, Gladenbach). 100/100 PageSpeed!',
      path: '/en/regionen/landkreis-marburg-biedenkopf',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Marburg-Biedenkopf | Next.js Agentur – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Marburg-Biedenkopf (Marburg, Biedenkopf, Stadtallendorf, Gladenbach). 100/100 PageSpeed!',
    path: '/de/regionen/landkreis-marburg-biedenkopf',
    type: 'money',
  });
}

export default async function LandkreisMarburgBiedenkopfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Marburg (Universitätsstadt)',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Behringwerke, Biotech & Uni-Klinikum',
    },
    {
      name: 'Stadtallendorf',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Industrie-Schwergewicht & Süßwaren',
    },
    {
      name: 'Biedenkopf',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Hinterland-Zentrum & Formenbau',
    },
    {
      name: 'Gladenbach',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Gewerbe & Maschinenbau',
    },
    {
      name: 'Kirchhain',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Handel, Handwerk & Wohratal-Tor',
    },
    {
      name: 'Neustadt (Hessen)',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Gewerbeparks & Ostkreis-Hub',
    },
    {
      name: 'Wetter (Hessen)',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Mittelstand an der B252',
    },
    {
      name: 'Dautphetal',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Werkzeugbau, Kunststoff & Automotive',
    },
    {
      name: 'Breidenbach',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Modell- & Formenbau',
    },
    {
      name: 'Steffenberg',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Hinterland-Fertigung',
    },
    {
      name: 'Angelburg',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Präzisionsfertigung & Handwerk',
    },
    {
      name: 'Bad Endbach',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Kurort & Medizintechnik',
    },
    { name: 'Lahntal', link: '/webdesign-marburg', highlight: false, note: 'Handwerk & B62-Achse' },
    {
      name: 'Cölbe',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Erneuerbare Energien & Gewerbe',
    },
    {
      name: 'Ebsdorfergrund',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Mittelstand & Bauhandwerk',
    },
    {
      name: 'Fronhausen',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'B3-Achse & Handwerksbetriebe',
    },
    {
      name: 'Weimar (Lahn)',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Gewerbeparks an der Lahn',
    },
    {
      name: 'Amöneburg',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Handwerk & Tourismus',
    },
    { name: 'Rauschenberg', link: '/webdesign-marburg', highlight: false, note: 'Lokales Gewerbe' },
    {
      name: 'Wohratal',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Holzbau & Handwerksbetriebe',
    },
    {
      name: 'Münchhausen',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Fertigung an der B252',
    },
    {
      name: 'Cölbe-Bürgeln',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Regionaler Mittelstand',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-marburg-biedenkopf#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Landkreis Marburg-Biedenkopf',
        url: `${BASE_URL}/${_locale}/regionen/landkreis-marburg-biedenkopf`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Marburg-Biedenkopf / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.8021,
          longitude: 8.7667,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Landkreis Marburg-Biedenkopf' },
          { '@type': 'City', name: 'Marburg' },
          { '@type': 'City', name: 'Stadtallendorf' },
          { '@type': 'City', name: 'Biedenkopf' },
          { '@type': 'City', name: 'Gladenbach' },
          { '@type': 'City', name: 'Kirchhain' },
          { '@type': 'City', name: 'Dautphetal' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-marburg-biedenkopf#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Marburg-Biedenkopf',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'Biotech & Pharma Webportale Behringwerke',
          'Formenbau & Industrie Websites Hinterland',
          'Handwerk 60-Sekunden Recruiting Marburg-Biedenkopf',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für Marburg-Biedenkopf',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Biotech & Pharma Webportale',
                description:
                  'Hochsichere, barrierefreie Plattformen für Life-Science-Unternehmen und Medizintechnik am Standort Marburg.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Formenbau & Industrie Webportale',
                description:
                  'Subsekundäre Produkt- und Leistungspräsentationen für Maschinenbauer und Formenbauer im Hessischen Hinterland.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Handwerk & Bautechnik Recruiting',
                description:
                  '60-Sekunden Express-Bewerbungsstrecken zur planbaren Mitarbeitergewinnung in Marburg-Biedenkopf.',
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
            PHARMA-, BIOTECH- & INDUSTRIEREGION MARBURG-BIEDENKOPF
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Marburg-Biedenkopf:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed für Biotech & Industrie
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Vom Weltklasse-Pharmastandort Behringwerke in Marburg über die Industriezentren in
            Stadtallendorf bis zum Werkzeug- und Formenbau im Hessischen Hinterland: Wir entwickeln
            maßgeschneiderte Next.js-Websites mit maximaler Sicherheit und messbaren B2B-Leads.
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
            <Link href="/webdesign-marburg" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Hub Marburg ansehen
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">30 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">via B3 ab HQ</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">22 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: REGIONALE WIRTSCHAFTSSTRUKTUR */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen in Marburg-Biedenkopf
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites die Marburger Innovationskraft bremsen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen Weltklasse-Forschung und hochspezialisierter Hinterland-Industrie dürfen
              Websites keine technischen Kompromisse eingehen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Flask className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fehlende Compliance im Life-Science-Sektor
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Biotech- und Pharma-Unternehmen unterliegen strengen Sicherheits- und
                Datenschutzanforderungen. Next.js schützt ohne angreifbare Plugins.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräftemangel in Industrie & Handwerk
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Große Industriezentren und der ländliche Raum im Hinterland suchen händeringend
                Zerspaner, Formenbauer und Meister. 60-Sekunden Mobile-Recruiting löst dieses
                Problem.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wartungsaufwand & Ladezeitverluste
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Langsame Ladezeiten bei technischen Spezifikationen und ständige Plugin-Konflikte
                frustrieren B2B-Kunden. Next.js lädt in unter 0,3 Sekunden.
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
              Next.js Edge & Sanity CMS: Hochleistungs-Standard für Marburg-Biedenkopf
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
                Unter 0,3 Sekunden Ladezeit. Technische Datenblätter, Forschungsberichte und
                Produktgalerien laden ohne spürbare Latenz.
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
                Verwalten Sie Publikationen, Produkte und Stellenangebote eigenständig in einer
                modernen, übersichtlichen Redaktionsumgebung.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR MARBURG-BIEDENKOPF */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Spitzenbranchen in Marburg-Biedenkopf
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Life-Science, Formenbau und regionales Handwerk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Marburg & Behringwerke
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Biotech, Pharma & Healthcare</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Barrierefreie, hochmoderne Portale für forschende Pharmaunternehmen,
                  Biotech-Startups und Kliniken mit intuitiver Nutzerführung.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Barrierefreiheit nach BITV / WCAG
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  DSGVO- & Compliance-Sicherheit
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Biedenkopf, Dautphetal & Stadtallendorf
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Formenbau & Großindustrie</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Leistungsstarke B2B-Plattformen für Werkzeug- und Formenbauer, Zerspaner und
                  Industriebetriebe mit internationaler Ausrichtung.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Technische Produkt- & Leistungsfilter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Internationale B2B-Leadgenerierung
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Gladenbach, Kirchhain & Wetter
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Handwerk & Bautechnik</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern,
                  Meistern und Azubis im Landkreis Marburg-Biedenkopf.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mobile 60-Sekunden Mitarbeiter-Gewinnung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Lokale SEO-Dominanz in Mittelhessen
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEMEINDE-GRID: ALLE 22 KOMMUNEN DES KREISES MARBURG-BIEDENKOPF */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 22 Städten & Gemeinden in Marburg-Biedenkopf
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Universitätsstadt Marburg, Industriestadt Stadtallendorf, das Hessische
              Hinterland oder der Ostkreis: Wir sind Ihr regionaler High-Tech Webpartner.
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
                  Standort Marburg ansehen →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: 30 MIN VIA B3 */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse B3 Lahntal
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 30 Minuten vor Ort in Marburg-Biedenkopf
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die autobahnähnlich ausgebaute B3 erreichen wir Fronhausen, Weimar und Marburg
                in nur rund 25 bis 35 Minuten ab unserem Headquarter in Wetzlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Software-Architekt Umutcan Emre Tezgel zusammen:
                Keine Agentur-Zwischenhändler, garantierte Termintreue und transparente Festpreise.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Vor-Ort-Betreuung in Marburg-Biedenkopf</span>
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
                B3 DIREKT • 30 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Marburg-Biedenkopf
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen digitale Werkzeuge, die Ihre Marktposition festigen und planbar
                qualifizierte Anfragen sichern.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Direktzugang zur zentralen Money-Page:
                </div>
                <div className="mt-2">
                  <Link
                    href="/webdesign-marburg"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Zur Hauptseite Webdesign Marburg
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
            Bereit für den digitalen Spitzenplatz in Marburg-Biedenkopf?
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
                Persönliches Treffen bei Ihnen in Marburg-Biedenkopf oder via Video-Call.
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
            Regionale Vernetzung & Standorte in Marburg-Biedenkopf & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Marburg Standorte</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-marburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Marburg (Zentrum)
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
                <li>
                  <Link
                    href="/webdesign-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Gießen
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Nachbarregionen</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/regionen/landkreis-lahn-dill"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Lahn-Dill-Kreis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/regionen/landkreis-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Landkreis Gießen
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-kassel" className="hover:text-amber-400 transition-colors">
                    Webdesign Kassel & Nordhessen
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Mittelhessen & Rhein-Main</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-frankfurt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Frankfurt am Main
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-friedberg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wetteraukreis
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-fulda" className="hover:text-amber-400 transition-colors">
                    Webdesign Fulda
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
                    B2B SEO Marburg-Biedenkopf
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
