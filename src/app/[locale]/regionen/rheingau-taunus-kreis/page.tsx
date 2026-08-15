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
  Wine,
  Cpu,
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
      title: 'Web Design Rheingau-Taunus District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js development in Rheingau-Taunus (Taunusstein, Idstein, Eltville, Rüdesheim). 100/100 PageSpeed!',
      path: '/en/regionen/rheingau-taunus-kreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Rheingau-Taunus-Kreis | Next.js – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung im Rheingau-Taunus-Kreis (Taunusstein, Idstein, Eltville, Rüdesheim). 100/100 PageSpeed!',
    path: '/de/regionen/rheingau-taunus-kreis',
    type: 'money',
  });
}

export default async function RheingauTaunusKreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Taunusstein (Größte Stadt)',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Wirtschaftszentrum im Untertaunus',
    },
    {
      name: 'Idstein (Hochschulstadt)',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Campus Fresenius, IT-Hub & A3-Knotenpunkt',
    },
    {
      name: 'Eltville am Rhein (Wein- & Rosenstadt)',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Rheingau-Mittelzentrum & Spitzenweingüter',
    },
    {
      name: 'Rüdesheim am Rhein',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Welterbe Oberes Mittelrheintal & Tourismus',
    },
    {
      name: 'Geisenheim (Hochschulstadt)',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Hochschule für Weinbau & Getränketechnologie',
    },
    {
      name: 'Oestrich-Winkel',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'EBS Business School & Weinwirtschaft',
    },
    {
      name: 'Bad Schwalbach (Kreisstadt)',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Kreisverwaltung, Kurwesen & Gesundheit',
    },
    {
      name: 'Hünstetten',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Gewerbeparks an der Hühnerstraße / B417',
    },
    {
      name: 'Niedernhausen',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'A3-Anbindung, Kanzleien & Dienstleistung',
    },
    {
      name: 'Aarbergen',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Gießereitradition, Metall & Handwerk',
    },
    {
      name: 'Hohenstein',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Lokaler Mittelstand im Aartal',
    },
    {
      name: 'Heidenrod',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Erneuerbare Energien & Handwerksbetriebe',
    },
    {
      name: 'Waldems',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Gewerbegebiet an der B275',
    },
    {
      name: 'Kiedrich',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Gotisches Weindorf & Premium-Riesling',
    },
    {
      name: 'Walluf',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Pforte des Rheingaus & Gewerbe am Rhein',
    },
    {
      name: 'Lorch',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Steillagenweinbau & Mittelrheintal',
    },
    {
      name: 'Schlangenbad',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Thermalbad, Kliniken & Reha-Medizin',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/rheingau-taunus-kreis#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Rheingau-Taunus-Kreis',
        url: `${BASE_URL}/${_locale}/regionen/rheingau-taunus-kreis`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Rheingau-Taunus / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.1444,
          longitude: 8.1608,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Rheingau-Taunus-Kreis' },
          { '@type': 'City', name: 'Taunusstein' },
          { '@type': 'City', name: 'Idstein' },
          { '@type': 'City', name: 'Eltville am Rhein' },
          { '@type': 'City', name: 'Rüdesheim am Rhein' },
          { '@type': 'City', name: 'Geisenheim' },
          { '@type': 'City', name: 'Bad Schwalbach' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/rheingau-taunus-kreis#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Rheingau-Taunus-Kreis',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'B2B-Dienstleister & IT-Portale Idstein / Taunusstein',
          'Spitzenweingüter & Headless E-Commerce Rheingau',
          'Handwerk & Bauwirtschaft 60-Sekunden Recruiting',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für den Rheingau-Taunus-Kreis',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B & IT Unternehmensportale',
                description:
                  'Hochperformante Next.js-Webseiten für Technologieunternehmen und Kanzleien an den Achsen A3 und B417.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless E-Commerce für Spitzenweingüter',
                description:
                  'Subsekundäre Shop-Systeme für VDP-Weingüter und Weinerzeuger im Rheingau mit blitzschnellem Checkout.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Handwerk & Bau Express-Recruiting',
                description:
                  '60-Sekunden Mobile-Recruiting Strecken zur planbaren Mitarbeitergewinnung im Rheingau-Taunus-Kreis.',
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
            WIRTSCHAFTS- & KULTURREGION RHEINGAU-TAUNUS
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign im Rheingau-Taunus-Kreis:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed für Taunusstein, Idstein & Eltville
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Von den technologieorientierten B2B-Unternehmen in Idstein und Taunusstein über die
            Spitzenweingüter im Rheingau bis zum starken Handwerksmittelstand: Wir entwickeln
            maßgeschneiderte Next.js-Websites für messbare B2B-Leads und planbares Recruiting.
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
            <Link href="/webdesign-wiesbaden" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Hub Wiesbaden ansehen
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">40 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">via A3/B417 ab HQ</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">17 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: REGIONALE DIENSTLEISTUNGS-, WEIN- & HANDWERKSSTRUKTUR */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen im Rheingau-Taunus-Kreis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites die Ertragskraft im Kreis dämpfen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen der Metropolregion Wiesbaden/Frankfurt und dem idyllischen Rheingau erwarten
              Kunden und Fachkräfte digitale Perfektion statt verstaubter Baukästen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Wine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Kaufabbrüche bei Premium-Weingütern & Shops
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Träge WooCommerce-Shops führen auf Smartphones zu massiven Absprüngen kaufkräftiger
                Kunden. Next.js lädt Shop-Seiten in unter 0,3 Sekunden.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräfte-Abwanderung nach Wiesbaden & FFM
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Handwerks- und Industrieunternehmen im Taunus verlieren Gesellen an die Großstädte.
                60-Sekunden Mobile-Recruiting holt Talente direkt am Smartphone ab.
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
                PHP-Updates und Plugin-Inkompatibilitäten kosten Nerven und Geld. Next.js schützt
                Ihre Webseite durch serverseitige Vorkompilierung ohne offene Datenbanken.
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
              Next.js Edge & Sanity CMS: Hochleistungs-Standard für den Rheingau-Taunus-Kreis
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
                Unter 0,3 Sekunden Ladezeit. Weinflaschen-Kataloge, Zimmerbuchungen und
                B2B-Leistungsübersichten öffnen ohne Wartezeit.
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
                Verwalten Sie Weinjahrgänge, Speisekarten, Referenzen und Stellenangebote
                eigenständig in einer modernen Redaktionsumgebung.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR DEN RHEINGAU-TAUNUS-KREIS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Spitzenbranchen im Rheingau-Taunus-Kreis
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für IT-Unternehmen, Spitzenweingüter und regionale
              Handwerksbetriebe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Idstein & Taunusstein
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  B2B-Dienstleister & IT-Systeme
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochmoderne Plattformen für Kanzleien, Beratungsunternehmen, Hochschulpartner und
                  IT-Dienstleister entlang der Autobahn A3.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  B2B-Leadgenerierung & Qualifizierungs-Funnel
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  DSGVO- & Barrierefreiheits-Sicherheit
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Eltville, Rüdesheim & Geisenheim
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Spitzenweingüter & Tourismus</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ultraschnelle Headless E-Commerce Frontends mit intuitivem Weinflaschen-Filter,
                  Event-Buchungskalendern und exzellentem Smartphone-Erlebnis.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Subsekundärer Wein-Checkout
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Internationale Mehrsprachigkeit (DE/EN)
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Bad Schwalbach, Hünstetten & Aarbergen
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Handwerk, Bau & Gesundheit</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern,
                  Meistern und Reha-Fachkräften im gesamten Kreisgebiet.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mobile 60-Sekunden Mitarbeiter-Gewinnung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Lokale SEO-Dominanz im Rheingau-Taunus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEMEINDE-GRID: ALLE 17 KOMMUNEN DES RHEINGAU-TAUNUS-KREISES */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 17 Städten & Gemeinden des Rheingau-Taunus-Kreises
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Hochschulstadt Idstein, Taunusstein, die Rosenstadt Eltville oder das
              Welterbetal Rüdesheim: Wir sind Ihr regionaler High-Tech Webpartner.
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
                  Standort Wiesbaden ansehen →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: 40 MIN VIA A3 / B417 */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse A3 & B417 Hühnerstraße
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 40 Minuten vor Ort im gesamten Rheingau-Taunus-Kreis
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die Autobahn A3 und die B417 erreichen wir Idstein, Hünstetten und Taunusstein
                in nur rund 35 bis 45 Minuten ab unserem Headquarter in Wetzlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Lead-Architekt Umutcan Emre Tezgel zusammen:
                Keine Agentur-Zwischenhändler, garantierte Termintreue und transparente Festpreise.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Vor-Ort-Betreuung im Rheingau-Taunus-Kreis</span>
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
                A3 / B417 • 40 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Rheingau-Taunus
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
                    href="/webdesign-wiesbaden"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Zur Hauptseite Webdesign Wiesbaden
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
            Bereit für den digitalen Spitzenplatz im Rheingau-Taunus-Kreis?
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
                Persönliches Treffen bei Ihnen im Rheingau-Taunus-Kreis oder via Video-Call.
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
            Regionale Vernetzung & Standorte im Rheingau-Taunus-Kreis & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Wiesbaden & Rheingau</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-wiesbaden"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wiesbaden (Landeshauptstadt)
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
                    href="/webdesign-limburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Limburg an der Lahn
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Nachbarregionen</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/regionen/main-taunus-kreis"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Main-Taunus-Kreis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/regionen/landkreis-limburg-weilburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Limburg-Weilburg
                  </Link>
                </li>
                <li>
                  <Link
                    href="/regionen/hochtaunuskreis"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Hochtaunuskreis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Rhein-Main Zentren</div>
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
                    href="/webdesign-ruesselsheim"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Rüsselsheim & Groß-Gerau
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-darmstadt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Darmstadt
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Enterprise & Services</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/ecommerce-development"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Headless E-Commerce Shops
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Rheingau-Taunus
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
