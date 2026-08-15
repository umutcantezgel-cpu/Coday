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
  Heartbeat,
  Package,
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
      title: 'Web Design Wetterau District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js development in the Wetterau district (Friedberg, Bad Nauheim, Butzbach, Bad Vilbel). 100/100 PageSpeed & leads!',
      path: '/en/regionen/wetteraukreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wetteraukreis | Next.js Agentur – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung im Wetteraukreis (Friedberg, Bad Nauheim, Butzbach, Bad Vilbel). 100/100 PageSpeed & Leads!',
    path: '/de/regionen/wetteraukreis',
    type: 'money',
  });
}

export default async function WetteraukreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Friedberg (Kreisstadt)',
      link: '/webdesign-friedberg',
      highlight: true,
      note: 'THM Campus & B2B-Zentrum',
    },
    {
      name: 'Bad Nauheim',
      link: '/webdesign-friedberg',
      highlight: true,
      note: 'Gesundheits- & Kurstadt',
    },
    {
      name: 'Bad Vilbel',
      link: '/webdesign-bad-vilbel',
      highlight: true,
      note: 'Quellen- & Medienstadt',
    },
    {
      name: 'Butzbach',
      link: '/webdesign-friedberg',
      highlight: true,
      note: 'Industrie & Handwerk an der B3',
    },
    {
      name: 'Karben',
      link: '/webdesign-bad-vilbel',
      highlight: false,
      note: 'Hightech & Automotive',
    },
    {
      name: 'Rosbach vor der Höhe',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Logistik & Dienstleistung',
    },
    {
      name: 'Büdingen',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Mittelstand & Bauwirtschaft',
    },
    {
      name: 'Nidda',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handel & regionales Gewerbe',
    },
    {
      name: 'Florstadt',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Gewerbegebiet an der A45',
    },
    {
      name: 'Reichelsheim',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerk & Flugplatz-Gewerbe',
    },
    {
      name: 'Münzenberg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Autobahnkreuz A45/A5',
    },
    {
      name: 'Rockenberg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerks- & Bauunternehmen',
    },
    { name: 'Ober-Mörlen', link: '/webdesign-friedberg', highlight: false, note: 'Gewerbepark A5' },
    {
      name: 'Wölfersheim',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Logistik- & Gewerbepark',
    },
    {
      name: 'Echzell',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Regionales Handwerk',
    },
    {
      name: 'Ranstadt',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'B2B-Betriebe & Handel',
    },
    {
      name: 'Glauburg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Tourismus & Dienstleistung',
    },
    {
      name: 'Ortenberg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerk & Holzbau',
    },
    {
      name: 'Gedern',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Vogelsberg-Mittelstand',
    },
    {
      name: 'Hirzenhain',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Guss & Fertigungstechnik',
    },
    { name: 'Kefenrod', link: '/webdesign-friedberg', highlight: false, note: 'Lokales Gewerbe' },
    {
      name: 'Altenstadt',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Logistikdrehkreuz A45',
    },
    {
      name: 'Limeshain',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerk & B2B-Dienstleistung',
    },
    {
      name: 'Niddatal',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Gewerbe & Bauhandwerk',
    },
    {
      name: 'Wöllstadt',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'B3-Achse & Handwerksbetriebe',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/wetteraukreis#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Wetteraukreis',
        url: `${BASE_URL}/${_locale}/regionen/wetteraukreis`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Wetteraukreis / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.3355,
          longitude: 8.7547,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Wetteraukreis' },
          { '@type': 'City', name: 'Friedberg' },
          { '@type': 'City', name: 'Bad Nauheim' },
          { '@type': 'City', name: 'Bad Vilbel' },
          { '@type': 'City', name: 'Butzbach' },
          { '@type': 'City', name: 'Karben' },
          { '@type': 'City', name: 'Rosbach vor der Höhe' },
          { '@type': 'City', name: 'Büdingen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/wetteraukreis#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Wetteraukreis',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'Klinik- & Healthcare Webportale',
          'B2B-Logistik & Dienstleister Websites',
          'Handwerk 60-Sekunden Recruiting',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für den Wetteraukreis',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Healthcare- & Klinik-Plattformen',
                description:
                  'Barrierefreie, DSGVO-konforme Portale mit Terminbuchung und Patientenführung für den Gesundheitscluster Bad Nauheim.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B-Logistik & Dienstleister Portale',
                description:
                  'Subsekundäre Webauftritte für Unternehmen an den Verkehrsachsen A5 / A45 / B3.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Handwerk & Bauwirtschaft Recruiting',
                description:
                  '60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern und Meistern im Wetteraukreis.',
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
            WIRTSCHAFTS- & GESUNDHEITSREGION WETTERAUKREIS
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign im Wetteraukreis:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed an der Achse Frankfurt–Mittelhessen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Vom Gesundheits- und Reha-Cluster in Bad Nauheim über die Kreisstadt Friedberg und den
            Medienstandort Bad Vilbel bis nach Butzbach und Büdingen: Wir bauen maßgeschneiderte
            Next.js-Websites mit messbarer B2B-Leadgenerierung und planbarem Mitarbeiter-Recruiting.
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
            <Link href="/webdesign-friedberg" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Hub Friedberg & Bad Nauheim
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">25 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">via A45 / B3</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">25 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: WETTERAUER WIRTSCHAFTS- & PENDLER-DNA */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen im Wetteraukreis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites den Wetterauer Wettbewerbsvorteil verspielen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen der Metropole Frankfurt und Mittelhessen stehen Wetterauer Unternehmen in
              einem intensiven Wettbewerb um Fachkräfte und Premium-Aufträge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Heartbeat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Unzureichende Patienten- & Healthcare-Führung
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Kliniken und Facharztpraxen in Bad Nauheim und Friedberg verlieren Patienten durch
                schlecht optimierte, unübersichtliche Webseiten ohne Online-Terminvergabe.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräfte-Abwanderung nach Frankfurt
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Wetterauer Handwerks- und B2B-Betriebe verlieren Bewerber an die Metropole.
                60-Sekunden Mobile-Recruiting holt Fachkräfte direkt am Smartphone ab.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wartungsfrust & Sicherheitsrisiken
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                WordPress-Sicherheitslücken und Plugin-Abstürze kosten Zeit. Next.js schützt Ihre
                Website durch statische Vorkompilierung ohne offene Datenbanken.
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
              Next.js Edge & Sanity CMS: Hochleistungs-Standard für den Wetteraukreis
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
                Unter 0,3 Sekunden Ladezeit. Praxis-Informationen, Produktkataloge und Formulare
                öffnen augenblicklich auf allen Geräten.
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
                Verwalten Sie Leistungen, News und Stellenangebote eigenständig in einer modernen,
                übersichtlichen Redaktionsumgebung.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR DEN WETTERAUKREIS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Wetterauer Spitzenbranchen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Gesundheitsdienstleister, B2B-Logistiker und
              Handwerksbetriebe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Bad Nauheim & Friedberg
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Gesundheitswirtschaft & Kliniken
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Barrierefreie, hochmoderne Plattformen für Rehazentren, Kliniken und Ärzte mit
                  DSGVO-konformer Online-Terminbuchung und Patienten-Onboarding.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Barrierefreiheit nach BITV / WCAG
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  DSGVO-konforme Patientenportale
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Bad Vilbel, Karben & Rosbach
                </div>
                <h3 className="text-xl font-bold text-white mb-4">B2B-Dienstleister & Medien</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Seriöse, interaktive Webauftritte für IT-Systemhäuser, Medienagenturen und
                  Unternehmensberater im direkten Frankfurter Einzugsgebiet.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  High-End Corporate Branding
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Automatisierte B2B-Leadstrecken
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Butzbach, Büdingen & Nidda
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Handwerk & Baubetriebe</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern,
                  Meistern und Azubis sowie lokale Suchmaschinen-Dominanz.
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

      {/* 5. GEMEINDE-GRID: ALLE 25 KOMMUNEN DES WETTERAUKREISES */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 25 Städten & Gemeinden des Wetteraukreises
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Friedberg, Bad Nauheim, Bad Vilbel oder die Kommunen im östlichen
              Wetteraukreis: Wir sind Ihr regionaler High-Tech Webpartner.
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

      {/* 6. PROXIMITY & TRUST: 25 MIN VIA A45 / B3 */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse A45 & B3
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 25 Minuten vor Ort im gesamten Wetteraukreis
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die A45 und die B3 erreichen wir Butzbach, Bad Nauheim, Friedberg und Rosbach
                in rund 25 Minuten ab unserem Headquarter in Wetzlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Software-Architekt Umutcan Emre Tezgel zusammen:
                Ohne Agentur-Wasserkopf, mit voller Kostentransparenz und zum garantierten
                Festpreis.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Betreuung direkt im Wetteraukreis</span>
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
                A45 / B3 • 25 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für den Wetteraukreis
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen digitale Werkzeuge, die Ihre Marktführerschaft festigen und planbar
                qualifizierte Anfragen sichern.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Direktzugang zu den Wetterauer Money-Pages:
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <Link
                    href="/webdesign-friedberg"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Hub Friedberg & Bad Nauheim
                  </Link>
                  <Link
                    href="/webdesign-bad-vilbel"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Hub Bad Vilbel & Karben
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
            Bereit für den digitalen Spitzenplatz im Wetteraukreis?
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
                Persönliches Treffen bei Ihnen im Wetteraukreis oder via Video-Call.
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
            Regionale Vernetzung & Standorte im Wetteraukreis & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Wetterau Standorte</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-friedberg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Friedberg & Bad Nauheim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-bad-vilbel"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Bad Vilbel
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
                    href="/regionen/landkreis-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Landkreis Gießen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/regionen/landkreis-lahn-dill"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Lahn-Dill-Kreis
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-hanau" className="hover:text-amber-400 transition-colors">
                    Webdesign Hanau & Main-Kinzig
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Rhein-Main & Taunus</div>
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
                    href="/webdesign-bad-homburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Bad Homburg
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-oberursel"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Oberursel
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
                    B2B SEO Wetteraukreis
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
