import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import { TrustBar } from '@/shared/ui/TrustBar';
import { LazyQuickContactForm } from '@/widgets/home/LazyQuickContactForm';
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
  Package,
  Wrench,
  Gauge,
  Truck,
  ChartBar,
  Star,
  MapPin,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
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
      title: 'Web Design Fulda | High-Performance Web Agency · Coday',
      description:
        'Web design & SEO for Fulda and East Hesse. Ultra-fast websites, B2B lead generation for industry, logistics & trade. Fixed prices on request.',
      keywords: [
        'Web Design Fulda',
        'Web Agency Fulda',
        'Website Creation Fulda',
        'Web Development East Hesse',
        'Coday Web Fulda',
      ],
      path: '/en/webdesign-fulda',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Fulda | High-Performance Webagentur · Coday',
    description:
      'Webdesign & SEO für Fulda und Osthessen. Blitzschnelle Websites, B2B-Lead-Generierung für Industrie, Logistik & Handwerk. Festpreise auf Anfrage.',
    keywords: [
      'Webdesign Fulda',
      'Webagentur Fulda',
      'Website erstellen Fulda',
      'Webentwicklung Osthessen',
      'Coday Web Fulda',
    ],
    path: '/de/webdesign-fulda',
    type: 'money',
  });
}

export default async function WebdesignFuldaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Locations' : 'Standorte', url: `/${_locale}/uebersicht` },
    { name: 'Fulda', url: `/${_locale}/webdesign-fulda` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/webdesign-fulda#localbusiness`,
        name: 'Coday – Webdesign Agentur Fulda & Osthessen',
        url: `${BASE_URL}/${_locale}/webdesign-fulda`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49-176-41195301',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Osthessen / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.5558,
          longitude: 9.6808,
        },
        areaServed: [
          { '@type': 'City', name: 'Fulda' },
          { '@type': 'City', name: 'Petersberg' },
          { '@type': 'City', name: 'Künzell' },
          { '@type': 'City', name: 'Eichenzell' },
          { '@type': 'City', name: 'Hünfeld' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Fulda' },
          { '@type': 'AdministrativeArea', name: 'Osthessen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-fulda#service`,
        name: 'Industrie, Logistik & Handwerk Webentwicklung Fulda',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Industrie- & Sensorik Webportale',
          'Logistik- & Großhandels Webdesign',
          'Next.js 15 Webentwicklung',
          'Local SEO Osthessen',
          'Sanity Headless CMS',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dienstleistungen für Fulda & Osthessen',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Industrie- & Maschinenbau-Webportale',
                description:
                  'Performante B2B-Plattformen für Sensortechnik und Industrieunternehmen in Fulda-West und Münsterfeld.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Logistik- & Großhandels-Plattformen',
                description:
                  'Websysteme mit ERP- und Schnittstellenanbindung für Logistiker im Rhön-Logistikpark Eichenzell und an der A7/A66.',
              },
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/${_locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Standorte',
            item: `${BASE_URL}/${_locale}/standorte/hessen`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Fulda',
            item: `${BASE_URL}/${_locale}/webdesign-fulda`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine neue Website in Fulda?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-Workflows sind wir 5–10x günstiger als traditionelle Großagenturen bei signifikant höherer Performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Website in Fulda online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für ein Beratungsgespräch direkt nach Fulda?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5/A7 oder A66 sind wir von unserem Wetzlarer HQ schnell direkt bei Ihnen vor Ort in Fulda-West, Münsterfeld oder Eichenzell.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites alle DSGVO- und Sicherheitsstandards?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Durch den Einsatz moderner Headless-Architekturen (Next.js & Supabase) gibt es keine offenen PHP- oder WordPress-Sicherheitslücken. Alle Daten werden DSGVO-konform in ISO-zertifizierten deutschen Rechenzentren gehostet.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser fester Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel persönlich mit direktem 24h-Support.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen selection:bg-amber-500/20 selection:text-amber-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#fafafa]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-sm">
            <Sparkle className="w-4 h-4 text-amber-600" />
            INDUSTRIE-, LOGISTIK- & HANDWERKS-WEBAGENTUR FULDA & OSTHESSEN
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Webdesign & Next.js Entwicklung in{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-teal-700 bg-clip-text text-transparent">
              Fulda & Osthessen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Speziell für Industrie, Maschinenbau, Großhandel, Logistik und Meisterbetriebe in Fulda,
            Künzell, Petersberg und Eichenzell. Subsekundäre Ladezeiten unter 500ms,
            ausdrucksstarkes B2B-Design und planbare Kundenanfragen. Verbindlicher Festpreis nach
            kostenloser Bedarfsanalyse.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-primary-700 hover:bg-primary-800 text-white font-bold px-8 py-4 text-base shadow-lg shadow-primary-700/25 transition-all hover:scale-[1.02]"
              >
                Kostenloses Erstgespräch anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/work" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 text-base shadow-sm"
              >
                Fuldaer Referenzen ansehen
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">&lt; 0.4s</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Ladezeit via Edge</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">A7 / A66</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Direkt vor Ort</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                DSGVO & Deutsches Hosting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. 4-PILLAR STATS BENTO GRID */}
      <section className="py-24 bg-[#fafafa] border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Präzision & Zuverlässigkeit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Fuldas Wirtschaft
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Industrie, Sensorik, Logistik und Handwerk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Osthessen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für weltweite B2B-Kunden und mobile Nutzer.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende Hierarchien.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">5-10x</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Kosteneffizienter</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Günstiger als traditionelle Großagenturen durch automatisierte
                KI-Engineering-Workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum Fuldaer Unternehmen auf Next.js setzen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Der direkte Vergleich zwischen klassischem WordPress und zukunftssicherer
              Headless-Architektur.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-5 text-sm font-semibold text-slate-700">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-700">
                    WordPress / Typo3 Agentur-Monolith
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Headless Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Ladezeit & TTFB</td>
                  <td className="p-5 text-slate-600">
                    2.5s – 4.5s (Plugin-Ballast & Datenbank-Verzögerung)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    &lt; 0.4s (Globales deutsches Edge-CDN)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Datenschutz</td>
                  <td className="p-5 text-slate-600">
                    Permanente Angriffsfläche durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare Datenbank)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Fulda)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Account Manager
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt in Hessen
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Preisstruktur</td>
                  <td className="p-5 text-slate-600">
                    Fünfstellige Stundensätze & monatliche Retainer
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Echtes Handwerk statt Agentur-Overhead für Fulda
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für
                Fulda, Künzell, Petersberg, Eichenzell und ganz Osthessen: Technisch perfekt,
                ausdrucksstark und wirtschaftlich 5–10x effizienter als traditionelle
                Agentur-Wasserköpfe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Voller Quellcode-Besitz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">5-10x günstiger als Großagenturen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES BENTO SHOWCASE (FULDA-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Fulda & Osthessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Industrie- & Sensorik-Portal bis zur Logistik- & Handwerks-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Gauge className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Industrie- & Sensorik-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für den Industriepark Fulda-West und das Münsterfeld. Next.js 15,
                interaktive Produktkonfiguratoren und mehrsprachige B2B-Architekturen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Package className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Logistik- & Großhandels-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochperformante Webarchitekturen für den Rhön-Logistikpark Eichenzell und
                Speditionsunternehmen an der zentralen A7/A66-Verkehrsachse.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Osthessen Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Fulda, Künzell, Petersberg,
                Eichenzell, Hünfeld und Neuhof.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Handwerks- & Meisterbetrieb-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-optimierte Websites mit 60-Sekunden-Express-Bewerbungsfunnels für Bau-
                und Handwerksbetriebe in der Region Fulda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschafts- & ICE-Knotenpunkt Fulda
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Industriepark Fulda-West, Münsterfeld & Rhön-Logistikpark Eichenzell
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Die <strong>Barockstadt Fulda</strong> ist das wirtschaftliche Kraftzentrum
              Osthessens. Mit dem <strong>Industriepark Fulda-West</strong>, dem traditionsreichen
              Gewerbegebiet
              <strong>Münsterfeld</strong> und dem hochmodernen{' '}
              <strong>Rhön-Logistikpark in Eichenzell</strong>
              verbindet Fulda weltmarktführende Sensorik-, Textil- und Maschinenbau-Unternehmen mit
              erstklassiger Verkehrslogistik am Autobahnknotenpunkt von <strong>
                A7 und A66
              </strong>{' '}
              sowie dem ICE-Knotenbahnhof.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte Erreichbarkeit in Osthessen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A5/A7 und A66</strong> ist unser Wetzlarer Büro schnell
              direkt bei Ihnen vor Ort in Fulda, Künzell oder Petersberg. Wir bieten Ihnen
              persönliche Betreuung auf Augenhöhe ohne zeitraubende Agentur-Umwege.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Projekt: Nach einer kostenlosen Bedarfsanalyse
              erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten oder teuren
              Agentur-Overhead.
            </p>
          </div>
        </div>
      </section>

      {/* 8. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zu Webdesign in Fulda
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine neue Website in Fulda?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und
                verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-Workflows sind wir
                5–10x günstiger als traditionelle Großagenturen bei signifikant höherer Performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Website in Fulda online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für ein Beratungsgespräch direkt nach Fulda?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5/A7 oder A66 sind wir von unserem Wetzlarer HQ schnell
                direkt bei Ihnen vor Ort in Fulda-West, Münsterfeld oder Eichenzell.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites alle DSGVO- und Sicherheitsstandards?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Durch den Einsatz moderner Headless-Architekturen (Next.js & Supabase) gibt es
                keine offenen PHP- oder WordPress-Sicherheitslücken. Alle Daten werden DSGVO-konform
                in ISO-zertifizierten deutschen Rechenzentren gehostet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser fester Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel persönlich mit direktem 24h-Support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den digitalen Vorsprung in Fulda?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Kostenloses Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
