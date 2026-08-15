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
  GearSix,
  Wrench,
  Eye,
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
      title: 'Web Design Lahn-Dill District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js web development in the Lahn-Dill district (Wetzlar, Dillenburg, Herborn, Haiger). 100/100 PageSpeed & qualified industrial leads!',
      path: '/en/regionen/landkreis-lahn-dill',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Lahn-Dill-Kreis | Next.js Agentur – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung im Lahn-Dill-Kreis (Wetzlar, Dillenburg, Herborn, Haiger). 100/100 PageSpeed & planbare Industrie-Leads!',
    path: '/de/regionen/landkreis-lahn-dill',
    type: 'money',
  });
}

export default async function LandkreisLahnDillPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Wetzlar (Kreisstadt)',
      link: '/webdesign-agentur-wetzlar',
      highlight: true,
      note: 'Optik- & Photonikzentrum',
    },
    {
      name: 'Herborn',
      link: '/webdesign-herborn',
      highlight: true,
      note: 'Schaltanlagen & Hightech',
    },
    {
      name: 'Dillenburg',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Kaltwalzwerke & Stahl',
    },
    {
      name: 'Haiger',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Schweißtechnik & Maschinenbau',
    },
    {
      name: 'Braunfels',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Kurort & Gastgewerbe',
    },
    {
      name: 'Solms',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Präzisionsfertigung & Handwerk',
    },
    {
      name: 'Aßlar',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Vakuum- & Industrietechnik',
    },
    {
      name: 'Sinn',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Metallverarbeitung & Gewerbe',
    },
    {
      name: 'Ehringshausen',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Medizintechnik & Handwerk',
    },
    {
      name: 'Hüttenberg',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Mittelstand & Bauwirtschaft',
    },
    {
      name: 'Schöffengrund',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Handwerk & Dienstleistung',
    },
    {
      name: 'Waldsolms',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Gewerbe & Taunus-Rand',
    },
    {
      name: 'Eschenburg',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Heiztechnik & Formenbau',
    },
    {
      name: 'Dietzhölztal',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Industrie & Guss',
    },
    {
      name: 'Mittenaar',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Gewerbeparks & Handwerk',
    },
    { name: 'Siegbach', link: '/webdesign-herborn', highlight: false, note: 'Präzisionsmechanik' },
    { name: 'Driedorf', link: '/webdesign-herborn', highlight: false, note: 'Westerwald-Gewerbe' },
    {
      name: 'Breitscheid',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Ton- & Mineralindustrie',
    },
    {
      name: 'Greifenstein',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Handwerk & Holzbau',
    },
    {
      name: 'Leun',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Industriepark Lahntal',
    },
    {
      name: 'Bischoffen',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Aartalsee & Tourismus',
    },
    {
      name: 'Hohenahr',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Gewerbe & Dienstleistung',
    },
    {
      name: 'Lahnau',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Optik-Zulieferer & B2B',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-lahn-dill#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Lahn-Dill-Kreis',
        url: `${BASE_URL}/${_locale}/regionen/landkreis-lahn-dill`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Headquarter Wetzlar / Lahn-Dill-Kreis',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.5658,
          longitude: 8.5028,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
          { '@type': 'City', name: 'Wetzlar' },
          { '@type': 'City', name: 'Herborn' },
          { '@type': 'City', name: 'Dillenburg' },
          { '@type': 'City', name: 'Haiger' },
          { '@type': 'City', name: 'Braunfels' },
          { '@type': 'City', name: 'Solms' },
          { '@type': 'City', name: 'Aßlar' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-lahn-dill#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Lahn-Dill-Kreis',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'Optik & Photonik Webportale',
          'Kaltwalzwerk & Maschinenbau Websites',
          'Handwerk 60-Sekunden Recruiting',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für den Lahn-Dill-Kreis',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Optik- & Photonik Showcases',
                description:
                  'Präzise technische Leistungsdarstellung für den Weltmarktführer-Cluster Wetzlar/Lahnau.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Maschinenbau & Dilltal-Industrieportale',
                description:
                  'Subsekundäre Produktfilter und interaktive CAD-Spezifikationen für Industrie-Einkäufer.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Handwerk & Haustechnik Recruiting-Funnels',
                description:
                  '60-Sekunden Bewerbungsstrecken zur planbaren Gewinnung von Gesellen und Meistern im Lahn-Dill-Kreis.',
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
            HEIMATKREIS & INDUSTRIEREGION LAHN-DILL
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign im Lahn-Dill-Kreis:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed ab HQ Wetzlar
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Vom Weltzentrum der Optik in Wetzlar über die Kaltwalz- und Maschinenbau-Pioniere des
            Dilltals bis zum starken Handwerk: Wir entwickeln kompromisslos schnelle
            Next.js-Websites für den gesamten Lahn-Dill-Kreis – direkt vor Ort, ohne
            Agentur-Wasserkopf.
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
            <Link href="/webdesign-agentur-wetzlar" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                HQ Wetzlar entdecken
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">HQ Wetzlar</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Direkt vor Ort</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">23 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: INDUSTRIE- & HANDWERKS-DNA LAHN-DILL */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Digitale Realität im Lahn-Dill-Kreis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites die regionale Marktführerschaft gefährden
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der Lahn-Dill-Kreis beherbergt globale Marktführer und hochspezialisierte
              Handwerksbetriebe. Veraltete PHP-Websites werden diesem Anspruch nicht gerecht.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräftemangel im regionalen Handwerk
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Junge Gesellen und Meister im Dill- und Lahntal bewerben sich nicht mehr über
                komplizierte PDFs. Wer wachsen will, braucht 60-Sekunden Mobile-Recruiting.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Ladezeitverluste bei technischen Katalogen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Internationale OEM-Einkäufer erwarten sofortige Produktdaten. Schleppende Ladezeiten
                führen zum Abbruch und stärken den Wettbewerb.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wartungskosten & Sicherheitsrisiken
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ständige WordPress-Updates und Sicherheitslücken binden wertvolle Ressourcen.
                Next.js liefert statisch gehärtete, 100% wartungsfreie Web-Systeme.
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
              Engineering-Architektur
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js Edge & Sanity CMS: Technologie auf Weltklasse-Niveau
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Statische Vorkompilierung, blitzschnelles Edge-Routing und intuitive
              Inhaltsverwaltung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subsekundäre Ladezeiten</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Unter 0,3 Sekunden Latenz weltweit. Technische Dokumentationen und interaktive
                Renderings öffnen augenblicklich.
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
                automatisierte Exploit-Skripte.
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
                Pflege von Zertifikaten, Maschinenparks und Stellenanzeigen in Echtzeit über eine
                hochmoderne, strukturierte Content-Plattform.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR DEN LAHN-DILL-KREIS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Industrie- & Wirtschaftsschwerpunkte
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Maßgeschneiderte Web-Lösungen für die Lahn-Dill-Wirtschaft
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Optik-Pioniere, Schwerindustrie und meisterhaftes Handwerk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Wetzlar, Lahnau & Aßlar
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Optik, Photonik & Feinmechanik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Präzise technische Showcases für globale OEM-Kunden mit ISO-Zertifikaten,
                  CAD-Download-Bereichen und mehrsprachiger Next.js-Architektur.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte Spezifikations-Showcases
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mehrsprachige B2B-Architektur
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Dillenburg, Herborn & Haiger
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Maschinenbau, Kaltwalzwerke & Stanztechnik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochperformante Produktfilter und reaktive Anfrage-Funnels für die
                  traditionsreiche Dilltaler Stahl- und Industriefertigung.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Subsekundäre Produktfilter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Automatisierte B2B-Anfragestrecken
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Kreisweit (23 Kommunen)
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Handwerk, SHK & Elektrotechnik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern
                  und Meistern sowie regionale Google-Dominanz.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mobile 60-Sekunden Mitarbeiter-Gewinnung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Lokale Suchmaschinen-Dominanz
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEMEINDE-GRID: ALLE 23 KOMMUNEN DES LAHN-DILL-KREISES */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 23 Städten & Gemeinden des Lahn-Dill-Kreises
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Kreisstadt Wetzlar, Wirtschaftsmetropole Herborn oder die Gemeinden im
              Westerwald und Taunus: Wir sind Ihr verlässlicher Technologiepartner vor Ort.
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

      {/* 6. PROXIMITY & TRUST: HEIMATVORTEIL WETZLAR */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Heimatstandort HQ Wetzlar
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                Ihr digitaler Vor-Ort-Partner im Lahn-Dill-Kreis
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Mit unserem Headquarter in Wetzlar sind wir in wenigen Minuten bei Ihnen vor Ort –
                ob in Dillenburg, Herborn, Haiger, Braunfels oder Aßlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Chefentwickler Umutcan Emre Tezgel zusammen:
                Keine Agentur-Zwischenhändler, keine Verzögerungen, volle Kostentransparenz und 100
                % handwerkliche Präzision.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Betreuung direkt im Lahn-Dill-Kreis</span>
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
                HQ WETZLAR • LOKAL VOR ORT
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für den Lahn-Dill-Kreis
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen digitale Werkzeuge, die Ihre handwerkliche und industrielle Kompetenz
                sichtbar machen und planbar qualifizierte Anfragen sichern.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Direktzugang zu den regionalen Zentren:
                </div>
                <div className="flex gap-4 mt-2">
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Hub Wetzlar
                  </Link>
                  <Link
                    href="/webdesign-herborn"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Hub Herborn
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
            Bereit für den digitalen Spitzenplatz im Lahn-Dill-Kreis?
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
                Persönliches Treffen bei Ihnen vor Ort im Lahn-Dill-Kreis oder via Video-Call.
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
            Regionale Vernetzung & Standorte im Lahn-Dill-Kreis & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Lahn-Dill Kernzentren</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wetzlar (HQ)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-herborn"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Herborn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Gießen (B49)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Nachbarkreise & Mittelhessen</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-marburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Marburg-Biedenkopf
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-limburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Limburg-Weilburg
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
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Rhein-Main Achse</div>
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
                    href="/webdesign-wiesbaden"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wiesbaden
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-bad-homburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Bad Homburg
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
                    B2B SEO Lahn-Dill
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
