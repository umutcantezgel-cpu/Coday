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
  Truck,
  Wrench,
  Scales,
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
      title: 'Web Design Limburg-Weilburg District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js development in the Limburg-Weilburg district (Limburg, Weilburg, Bad Camberg, Hadamar). 100/100 PageSpeed!',
      path: '/en/regionen/landkreis-limburg-weilburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Limburg-Weilburg | Next.js Agentur – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung im Landkreis Limburg-Weilburg (Limburg, Weilburg, Bad Camberg, Hadamar). 100/100 PageSpeed!',
    path: '/de/regionen/landkreis-limburg-weilburg',
    type: 'money',
  });
}

export default async function LandkreisLimburgWeilburgPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Limburg an der Lahn (Kreisstadt)',
      link: '/webdesign-limburg',
      highlight: true,
      note: 'ICE-City, Großhandel & B2B-Drehscheibe',
    },
    {
      name: 'Weilburg',
      link: '/webdesign-limburg',
      highlight: true,
      note: 'Residenzstadt, Maschinenbau & Tourismus',
    },
    {
      name: 'Bad Camberg',
      link: '/webdesign-limburg',
      highlight: true,
      note: 'Kneippkurort, Kliniken & Goldener Grund',
    },
    {
      name: 'Hadamar',
      link: '/webdesign-limburg',
      highlight: true,
      note: 'Glasfachzentrum & Mittelstand',
    },
    {
      name: 'Runkel',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Lahntal-Handwerk & Tourismus',
    },
    {
      name: 'Elz',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Gewerbegebiet an der A3 / B8',
    },
    {
      name: 'Beselich',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Handwerk & B49-Anbindung',
    },
    {
      name: 'Villmar',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Marmor & B2B-Bauwirtschaft',
    },
    {
      name: 'Selters (Taunus)',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Mineralwasser & Gewerbe',
    },
    {
      name: 'Weilmünster',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Gesundheitswirtschaft & Handwerk',
    },
    {
      name: 'Hünfelden',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Mittelstand an der B417',
    },
    {
      name: 'Brechen',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Handwerks- & Baubetriebe',
    },
    {
      name: 'Waldbrunn (Westerwald)',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Holzbau & Westerwald-Handwerk',
    },
    {
      name: 'Dornburg',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Gewerbe & Basaltabbau',
    },
    {
      name: 'Mengerskirchen',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Ton- & Keramikindustrie',
    },
    {
      name: 'Merenberg',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'B49 Gewerbe & Maschinenbau',
    },
    {
      name: 'Löhnberg',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Industrie & B2B-Handel',
    },
    {
      name: 'Weinbach',
      link: '/webdesign-limburg',
      highlight: false,
      note: 'Lokales Handwerk & Tourismus',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-limburg-weilburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Landkreis Limburg-Weilburg',
        url: `${BASE_URL}/${_locale}/regionen/landkreis-limburg-weilburg`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Limburg-Weilburg / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.3845,
          longitude: 8.0647,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Landkreis Limburg-Weilburg' },
          { '@type': 'City', name: 'Limburg an der Lahn' },
          { '@type': 'City', name: 'Weilburg' },
          { '@type': 'City', name: 'Bad Camberg' },
          { '@type': 'City', name: 'Hadamar' },
          { '@type': 'City', name: 'Elz' },
          { '@type': 'City', name: 'Beselich' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/landkreis-limburg-weilburg#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Limburg-Weilburg',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'B2B-Großhandel & Logistik Webportale',
          'Bauwirtschaft & Handwerk Recruiting Limburg-Weilburg',
          'Kanzlei- & Beratungs-Websites',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für den Landkreis Limburg-Weilburg',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B-Großhandel & Logistik Webportale',
                description:
                  'Subsekundäre Headless-Produktkataloge und ERP-Schnittstellen für Großhändler an A3 und B49.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Bauwirtschaft & Technisches Handwerk Recruiting',
                description:
                  '60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Facharbeitern im Landkreis Limburg-Weilburg.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kanzleien & Beratung Plattformen',
                description:
                  'Seriöse, DSGVO-konforme Webauftritte für Rechtsanwälte, Notare und Steuerberater im Lahntal und Goldenen Grund.',
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
            LOGISTIK- & WIRTSCHAFTSREGION LIMBURG-WEILBURG
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign im Kreis Limburg-Weilburg:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed an der B49 & A3
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Von der ICE-City und den Großhandelszentren in Limburg und Elz über die Residenzstadt
            Weilburg bis nach Bad Camberg und Hadamar: Wir entwickeln maßgeschneiderte
            Next.js-Websites für B2B-Mittelstand, Bauwirtschaft und regionales Handwerk.
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
            <Link href="/webdesign-limburg" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Hub Limburg ansehen
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
              <div className="text-xs sm:text-sm text-slate-400 font-medium">via B49 ab HQ</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">19 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: REGIONALE B2B-HANDELS- & HANDWERKSSTRUKTUR */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen im Kreis Limburg-Weilburg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Baukasten-Websites regionalen Marktführern schaden
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen Rhein-Main, Westerwald und Mittelhessen verlangen B2B-Einkäufer und
              Auftraggeber moderne, blitzschnelle digitale Schnittstellen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Umsatzverluste im B2B-Großhandel
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Träge Ladezeiten bei großen Produktkatalogen und unübersichtliche Datenblätter
                führen zu Abbrüchen bei Einkäufern. Next.js liefert B2B-Kataloge verzögerungsfrei
                aus.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Akuter Mangel an Handwerkern & Monteuren
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Konventionelle Stellenanzeigen erreichen junge Fachkräfte nicht mehr. 60-Sekunden
                Mobile-Bewerbungsstrecken sichern planbaren Mitarbeiter-Nachwuchs.
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
                Veraltete WordPress-Installationen sind anfällig für Hackerangriffe und
                Plugin-Ausfälle. Next.js schützt Ihre Präsenz durch statische Vorkompilierung.
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
              Next.js Edge & Sanity CMS: Hochleistungs-Standard für Limburg-Weilburg
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
                Unter 0,3 Sekunden Ladezeit. Technische Produktdaten, Referenzgalerien und Formulare
                öffnen ohne jede Verzögerung.
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

      {/* 4. BRANCHENLÖSUNGEN FÜR DEN KREIS LIMBURG-WEILBURG */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Spitzenbranchen in Limburg-Weilburg
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Großhändler, Bauunternehmen und Kanzleien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Limburg, Elz & Beselich
                </div>
                <h3 className="text-xl font-bold text-white mb-4">B2B-Großhandel & Logistik</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ultraschnelle Headless E-Commerce Frontends mit flexiblen Produktfiltern und
                  automatisierter ERP-Anbindung für den regionalen und überregionalen Vertrieb.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Subsekundäre Produktfilter & Datenblätter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  B2B-Leadgenerierung & Händlerportale
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Weilburg, Hadamar & Westerwald
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Bauwirtschaft & Technisches Handwerk
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur planbaren Gewinnung von Monteuren,
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
                  Regionale SEO-Dominanz im Lahntal
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Bad Camberg & Goldener Grund
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Kanzleien & Beratung</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Seriöse, DSGVO-konforme Plattformen für Rechtsanwälte, Notare, Steuerberater und
                  Kliniken mit nahtloser Online-Terminvergabe.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  DSGVO- & Barrierefreiheit-Konformität
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Integrierte Terminbuchungs-Workflows
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEMEINDE-GRID: ALLE 19 KOMMUNEN DES KREISES LIMBURG-WEILBURG */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 19 Städten & Gemeinden des Kreises Limburg-Weilburg
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Kreisstadt Limburg, Oberlahn-Zentrum Weilburg, Bad Camberg oder der
              Westerwald-Rand: Wir sind Ihr regionaler High-Tech Webpartner.
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
                  Standort Limburg ansehen →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: 25 MIN VIA B49 */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse B49 Lahntal
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 25 Minuten vor Ort im gesamten Kreis Limburg-Weilburg
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die durchgehend vierspurig ausgebaute B49 erreichen wir Weilburg, Löhnberg,
                Beselich und Limburg in nur rund 20 bis 30 Minuten ab unserem Headquarter in
                Wetzlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Lead-Architekt Umutcan Emre Tezgel zusammen:
                Keine Agentur-Zwischenhändler, garantierte Termintreue und transparente Festpreise.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Vor-Ort-Betreuung in Limburg-Weilburg</span>
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
                B49 DIREKT • 25 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Limburg-Weilburg
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen digitale Werkzeuge, die Ihre Marktführerschaft festigen und planbar
                qualifizierte Anfragen sichern.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Direktzugang zur zentralen Money-Page:
                </div>
                <div className="mt-2">
                  <Link
                    href="/webdesign-limburg"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Zur Hauptseite Webdesign Limburg an der Lahn
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
            Bereit für den digitalen Spitzenplatz in Limburg-Weilburg?
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
                Persönliches Treffen bei Ihnen in Limburg-Weilburg oder via Video-Call.
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
            Regionale Vernetzung & Standorte in Limburg-Weilburg & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Limburg Standorte</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-limburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Limburg an der Lahn
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
                    href="/webdesign-herborn"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Herborn
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
                  <Link
                    href="/regionen/main-taunus-kreis"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Main-Taunus-Kreis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Rhein-Main & Taunus</div>
              <ul className="space-y-2">
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
                    B2B SEO Limburg-Weilburg
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
