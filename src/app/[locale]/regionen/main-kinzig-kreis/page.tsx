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
  Factory,
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
      title: 'Web Design Main-Kinzig District | Next.js Agency – Coday',
      description:
        'Custom web design & Next.js development in the Main-Kinzig district (Hanau, Gelnhausen, Maintal, Schlüchtern). 100/100 PageSpeed!',
      path: '/en/regionen/main-kinzig-kreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Main-Kinzig-Kreis | Next.js Agentur – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung im Main-Kinzig-Kreis (Hanau, Gelnhausen, Maintal, Schlüchtern). 100/100 PageSpeed!',
    path: '/de/regionen/main-kinzig-kreis',
    type: 'money',
  });
}

export default async function MainKinzigKreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Hanau (Sonderstatusstadt)',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'Brüder-Grimm-Stadt, Materialtechnik & Chemie',
    },
    {
      name: 'Gelnhausen (Kreisstadt)',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'Barbarossastadt, Verwaltung & Feinwerktechnik',
    },
    {
      name: 'Maintal',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'Industrie, Logistik & Main-Anbindung',
    },
    {
      name: 'Bruchköbel',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'B2B-Handel & Handwerks-Cluster',
    },
    {
      name: 'Nidderau',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Wohnen & wachsender Mittelstand',
    },
    {
      name: 'Schöneck',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Gewerbe & Frankfurt-Nähe',
    },
    {
      name: 'Erlensee',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Gewerbepark Fliegerhorst & Logistik',
    },
    {
      name: 'Neuberg',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Handwerk & lokales Gewerbe',
    },
    {
      name: 'Rodenbach',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Wohn- & Gewerbestandort',
    },
    {
      name: 'Großkrotzenburg',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Kraftwerksstandort & Mainhafen',
    },
    {
      name: 'Langenselbold',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Autobahndreieck A45/A66 & Industrie',
    },
    { name: 'Ronneburg', link: '/webdesign-hanau', highlight: false, note: 'Burgstadt & Handwerk' },
    {
      name: 'Gründau',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Möbel- & Handelszentrum A66',
    },
    {
      name: 'Wächtersbach',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Messe- & Handelsstadt',
    },
    {
      name: 'Biebergemünd',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Engelbert Strauss HQ & Workwear',
    },
    {
      name: 'Bad Orb',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Kur-, Reha- & Tourismuszentrum',
    },
    {
      name: 'Bad Soden-Salmünster',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Gesundheitswirtschaft & Kliniken',
    },
    {
      name: 'Steinau an der Straße',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Grimm-Stadt & Handwerk',
    },
    {
      name: 'Schlüchtern',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Bergwinkel-Zentrum & Maschinenbau',
    },
    { name: 'Sinntal', link: '/webdesign-hanau', highlight: false, note: 'Holz- & Möbelindustrie' },
    { name: 'Birstein', link: '/webdesign-hanau', highlight: false, note: 'Vogelsberg-Handwerk' },
    {
      name: 'Brachttal',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Keramiktradition & Gewerbe',
    },
    {
      name: 'Freigericht',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Vorspessart & B2B-Mittelstand',
    },
    {
      name: 'Linsengericht',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Handwerk & Dienstleistung',
    },
    {
      name: 'Jossgrund',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Spessart-Natur & Holzverarbeitung',
    },
    {
      name: 'Niederdorfelden',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Gewerbe im Speckgürtel',
    },
    {
      name: 'Hammersbach',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Logistikpark an der A45',
    },
    {
      name: 'Flörsbachtal',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Spessart-Handwerk & Tourismus',
    },
    {
      name: 'Gelnhausen-Hailer',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Gewerbegebiet A66',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/main-kinzig-kreis#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Main-Kinzig-Kreis',
        url: `${BASE_URL}/${_locale}/regionen/main-kinzig-kreis`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Main-Kinzig-Kreis / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.2037,
          longitude: 9.1867,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Main-Kinzig-Kreis' },
          { '@type': 'City', name: 'Hanau' },
          { '@type': 'City', name: 'Gelnhausen' },
          { '@type': 'City', name: 'Maintal' },
          { '@type': 'City', name: 'Bruchköbel' },
          { '@type': 'City', name: 'Schlüchtern' },
          { '@type': 'City', name: 'Bad Orb' },
          { '@type': 'City', name: 'Langenselbold' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/main-kinzig-kreis#service`,
        name: 'High-End Webdesign & Next.js Entwicklung Main-Kinzig-Kreis',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'Materialtechnologie & Industrie Webportale Hanau / Gelnhausen',
          'B2B-Logistik & E-Commerce Webportale A66',
          'Handwerk & Spessart-Gesundheit Recruiting',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für den Main-Kinzig-Kreis',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Materialtechnologie & Industrie Webportale',
                description:
                  'Hochperformante Next.js-Webseiten für Technologie-, Chemie- und Industrieunternehmen im Kinzigtal.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B-Logistik & E-Commerce Plattformen',
                description:
                  'Subsekundäre Produktkataloge und ERP-Schnittstellen für Großhändler an den Achsen A45 / A66.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Handwerk & Reha/Tourismus Recruiting',
                description:
                  '60-Sekunden Mobile-Recruiting Strecken zur planbaren Mitarbeitergewinnung im gesamten Main-Kinzig-Kreis.',
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
            INDUSTRIE- & WIRTSCHAFTSREGION MAIN-KINZIG-KREIS
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign im Main-Kinzig-Kreis:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              100/100 PageSpeed für Hanau, Gelnhausen & Kinzigtal
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Im einwohnerstärksten Landkreis Hessens – von der Materialtechnik in Hanau über die
            Präzisionsfertigung in Gelnhausen und Maintal bis zum Reha- und Handwerkszentrum im
            Spessart: Wir bauen maßgeschneiderte Next.js-Websites für messbare B2B-Leads und
            planbares Recruiting.
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
            <Link href="/webdesign-hanau" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Hub Hanau ansehen
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">48 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">via A45 ab HQ</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">29 Kommunen</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Volle Abdeckung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: INDUSTRIE- & MITTELSTANDSSTRUKTUR IM KINZIGTAL */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen im Main-Kinzig-Kreis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Baukasten-Websites dem MKK-Mittelstand schaden
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Entlang der A66 und im Kinzigtal agieren Weltmarktführer und hochspezialisierte
              Zulieferer. Veraltete WordPress-Websites bremsen Wachstum und Mitarbeitergewinnung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Umsatzverluste bei Industrie & B2B-Katalogen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Träge Ladezeiten bei technischen Spezifikationen und Produktdatenblättern treiben
                internationale Einkäufer zur Konkurrenz. Next.js lädt in unter 0,3 Sekunden.
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
                MKK-Handwerker und Industriebetriebe verlieren Talente an Frankfurt. 60-Sekunden
                Mobile-Recruiting holt Kandidaten direkt am Smartphone ab.
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
                Veraltete WordPress-Installationen verursachen Ausfälle und Sicherheitsrisiken.
                Next.js schützt Ihre Webpräsenz durch serverseitige Vorkompilierung ohne offene
                Datenbanken.
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
              Next.js Edge & Sanity CMS: Hochleistungs-Standard für den Main-Kinzig-Kreis
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
                Unter 0,3 Sekunden Ladezeit. Technische Datenblätter, Produktfilter und interaktive
                Formulare öffnen verzögerungsfrei auf jedem Endgerät.
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

      {/* 4. BRANCHENLÖSUNGEN FÜR DEN MAIN-KINZIG-KREIS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Spitzenbranchen im MKK
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Materialtechnologie, B2B-Logistik und Handwerk im Spessart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Hanau, Gelnhausen & Maintal
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Materialtechnologie & Industrie
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochsichere B2B-Plattformen für Edelmetall-, Chemie-, Feinwerk- und
                  Automotive-Unternehmen mit internationaler Ausrichtung.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Technische Produkt- & Spezifikationsfilter
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
                  Langenselbold, Erlensee & Hammersbach
                </div>
                <h3 className="text-xl font-bold text-white mb-4">B2B-Logistik & E-Commerce</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ultraschnelle Headless E-Commerce Frontends mit ERP-Anbindung für die großen
                  Logistikparks an den Autobahnknotenpunkten A45 / A66.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Subsekundärer Checkout & Produktfilter
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
                  Bad Orb, Schlüchtern & Spessart
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Handwerk & Reha / Gesundheit</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  60-Sekunden Express-Bewerbungsstrecken zur Mitarbeitergewinnung für
                  Handwerksbetriebe sowie barrierefreie Buchungsportale für Kur- und Rehakliniken.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mobile 60-Sekunden Mitarbeiter-Gewinnung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Barrierefreie Termin- & Klinikportale
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEMEINDE-GRID: ALLE 29 KOMMUNEN DES MAIN-KINZIG-KREISES */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Vollständige Kreisabdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Webdesign in allen 29 Städten & Gemeinden des Main-Kinzig-Kreises
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Egal ob Brüder-Grimm-Stadt Hanau, Barbarossastadt Gelnhausen, das Kinzigtal, der
              Spessart oder der Bergwinkel: Wir sind Ihr regionaler High-Tech Webpartner.
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
                  Standort Hanau ansehen →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: 48 MIN VIA A45 */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse A45 Sauerlandlinie
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 48 Minuten vor Ort im gesamten Main-Kinzig-Kreis
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die Autobahn A45 erreichen wir Bruchköbel, Hanau, Langenselbold und Gelnhausen
                in rund 45 bis 55 Minuten ab unserem Headquarter in Wetzlar.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Inhaber und Lead-Architekt Umutcan Emre Tezgel zusammen:
                Keine Agentur-Zwischenhändler, garantierte Termintreue und transparente Festpreise.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Betreuung im gesamten Main-Kinzig-Kreis</span>
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
                A45 DIREKT • 48 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für den Main-Kinzig-Kreis
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
                    href="/webdesign-hanau"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    → Zur Hauptseite Webdesign Hanau
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
            Bereit für den digitalen Spitzenplatz im Main-Kinzig-Kreis?
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
                Persönliches Treffen bei Ihnen im Main-Kinzig-Kreis oder via Video-Call.
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
            Regionale Vernetzung & Standorte im Main-Kinzig-Kreis & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">MKK Standorte</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/webdesign-hanau" className="hover:text-amber-400 transition-colors">
                    Webdesign Hanau
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
                  <Link href="/webdesign-fulda" className="hover:text-amber-400 transition-colors">
                    Webdesign Fulda & Osthessen
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
                    href="/regionen/wetteraukreis"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wetteraukreis
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
              <div className="text-white font-medium mb-3">Mittelhessen Hubs</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Gießen
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
                  <Link
                    href="/webdesign-friedberg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Friedberg
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
                    B2B SEO Main-Kinzig-Kreis
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
