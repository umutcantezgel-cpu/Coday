import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import { TrustBar } from '@/shared/ui/TrustBar';
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
  Wrench,
  Stethoscope,
  ChartBar,
  Star,
  MapPin,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  Eye,
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
      title: 'Web Design Agency Wetzlar | High-End Websites & SEO · Coday',
      description:
        'Your local web agency in Wetzlar. Next.js 15, <0.5s load time & measurable B2B leads for mid-market, optics & craft enterprises. Fixed price on request.',
      path: '/en/webdesign-agentur-wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Agentur Wetzlar | High-End Websites & SEO · Coday',
    description:
      'Ihre lokale Webagentur in Wetzlar. Next.js 15, <0.5s Ladezeit & messbare B2B-Leads für Mittelstand, Optik & Handwerk. Verbindlicher Festpreis auf Anfrage.',
    path: '/de/webdesign-agentur-wetzlar',
    type: 'money',
  });
}

export default async function WebdesignWetzlarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/webdesign-agentur-wetzlar#localbusiness`,
        name: 'Coday – Webdesign Agentur Wetzlar (HQ)',
        url: `${BASE_URL}/${_locale}/webdesign-agentur-wetzlar`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lessingstraße 4',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.5558,
          longitude: 8.5076,
        },
        areaServed: [
          { '@type': 'City', name: 'Wetzlar' },
          { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
          { '@type': 'AdministrativeArea', name: 'Mittelhessen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-agentur-wetzlar#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Wetzlar',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js 15 Webentwicklung',
          'Optik & Medizintechnik B2B Portale',
          'Handwerker Webdesign Wetzlar',
          'Lokales Silo-SEO Lahn-Dill',
          'Sanity Headless CMS',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web-Lösungen für Wetzlar & Lahn-Dill',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'High-Performance Next.js Webentwicklung',
                description:
                  'Serverlose Webanwendungen mit statischer Vorabgenerierung, Ladezeiten unter 500ms und 100/100 Core Web Vitals.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Lead-Generierung & Local SEO',
                description:
                  'Konversionsstarke Webdesigns und automatisierte Mitarbeitergewinnung für den Wetzlarer Mittelstand.',
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
            name: 'Wetzlar',
            item: `${BASE_URL}/${_locale}/webdesign-agentur-wetzlar`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine professionelle Website in Wetzlar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-gestützten Workflows sind wir 5–10x günstiger als traditionelle Großagenturen bei signifikant höherer technischer Performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie lange dauert die Umsetzung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel 10 bis 14 Werktage bis zum schlüsselfertigen Go-Live Ihrer neuen Website.',
            },
          },
          {
            '@type': 'Question',
            name: 'Können wir uns persönlich in Wetzlar treffen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Unser Agentur-HQ befindet sich direkt in Wetzlar. Wir kommen für ein persönliches Beratungsgespräch direkt zu Ihnen in den Betrieb.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie eine Zufriedenheits- und Performance-Garantie?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, vertraglich garantierte Lighthouse-Scores von über 90 Punkten und perfekte Google Core Web Vitals.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer betreut die Website nach dem Launch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel persönlich mit garantiertem 24h-Support.',
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
            AGENTUR-HQ WETZLAR · HIGH-END WEBENTWICKLUNG
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Webdesign & Next.js Entwicklung in{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-teal-700 bg-clip-text text-transparent">
              Wetzlar & Lahn-Dill
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            High-End Webentwicklung, blitzschnelle Ladezeiten unter 500ms und automatisierte
            Lead-Generierung für den Wetzlarer Mittelstand, Optikunternehmen und Handwerksbetriebe.
            Verbindlicher Festpreis nach kostenloser Bedarfsanalyse.
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
                Wetzlarer Referenzen ansehen
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
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">HQ Wetzlar</div>
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

      {/* 2. TRUSTBAR (REAL CLIENT PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. 4-PILLAR STATS BENTO GRID */}
      <section className="py-24 bg-[#fafafa] border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Performance & Transparenz
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Unternehmen in Wetzlar
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Keine leeren Marketing-Floskeln, sondern nachweisbare technische und wirtschaftliche
              Vorteile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Wetzlar</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                TTFB unter 50ms via deutsches Edge-Netzwerk. Perfekt für mobile Kunden und
                Top-Google-Rankings.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Keine monatlichen Lizenzgebühren, kein Vendor-Lock-in. Der Quellcode gehört
                vollständig Ihnen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Lokale Reaktionszeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Inhaber Umutcan Emre Tezgel in Wetzlar ohne
                Callcenter-Warteschleifen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">5-10x</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Kosteneffizienter</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Günstiger als traditionelle Großagenturen dank hochgradig optimierter
                KI-Ingenieursworkflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS VS TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Modernes Next.js vs. Träge WordPress-Monolithen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Warum der Wetzlarer Mittelstand auf serverlose Headless-Architektur umsteigt.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-5 text-sm font-semibold text-slate-700">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-700">
                    Traditionelles WordPress / Agentur-Monolith
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Architektur
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Ladezeit & TTFB</td>
                  <td className="p-5 text-slate-600">
                    3.0s – 5.0s (Plugin-Ballast & Datenbank-Verzögerung)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    &lt; 0.4s (Globales deutsches Edge-CDN)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Sicherheitsarchitektur</td>
                  <td className="p-5 text-slate-600">
                    Ständige Sicherheitsrisiken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Immun gegen traditionelle Exploits
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Lead-Conversion & UX</td>
                  <td className="p-5 text-slate-600">Durchschnittliche Baukasten-Conversion</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    +300% Conversion-Potenzial & 60s Funnels
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Projektmanager
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Persönlich vor Ort in Wetzlar mit Inhaber
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Preisstruktur</td>
                  <td className="p-5 text-slate-600">
                    Hohe Beratertage & monatliche Wartungsverträge
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
                Inhabergeführte Handwerkskunst
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Echtes Handwerk statt Agentur-Overhead in Wetzlar
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday sprechen Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Keine
                ahnungslosen Junior-Projektmanager, keine verdeckten Subunternehmer. Reine
                Ingenieurskunst und KI-gestützte Entwicklungsgeschwindigkeit für maximale Ergebnisse
                in Wetzlar und im gesamten Lahn-Dill-Kreis.
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

      {/* 6. SERVICES BENTO SHOWCASE (LOKAL ZUGESCHNITTEN) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Lösungen für Wetzlar & Lahn-Dill
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie aus Wetzlar für Spitzenleistungen im Web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Code className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. High-Performance Webentwicklung
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Maßgeschneiderte Webentwicklung mit Next.js 15, React 19 und TypeScript.
                Subsekundäre Ladezeiten und garantierte 100/100 Core Web Vitals für maximale
                Google-Sichtbarkeit.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Eye className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. B2B-Webdesign & UX-Design
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Optik-, Medizintechnik- und Mittelstands-Fokus. Seriöse, ästhetische Interfaces, die
                Vertrauen bei anspruchsvollen B2B-Entscheidern schaffen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Lokales Silo-SEO & Google-Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Wetzlar, Hermannstein,
                Nauborn, Dutenhofen und dem gesamten Lahn-Dill-Kreis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <FileCode className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Headless CMS & Automatisierung
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Integration von Sanity CMS für kinderleichte Content-Pflege ohne
                Programmierkenntnisse und automatisierte Lead-Erfassung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CASE STUDIES & LOCAL PROOF */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Echte Kundenreferenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Erfolgsgeschichten aus Wetzlar & Mittelhessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Reale Ergebnisse für regionale Unternehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold uppercase mb-4 border border-amber-200/50">
                Case Study · Handwerk & Sanitär
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Batherm Wetzlar</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Relaunch der gesamten Webpräsenz auf Next.js. Erzielte einen perfekten 100/100
                Mobile Score, eine Reduktion der Ladezeit auf unter 400ms und ein Plus von{' '}
                <strong>+340%</strong> an qualifizierten Kundenanfragen aus dem Raum Wetzlar.
              </p>
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <span>100/100 Core Web Vitals</span> · <span>+340% Anfragen</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold uppercase mb-4 border border-amber-200/50">
                Case Study · Lokaler Notdienst
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">MS Schlüsseldienst Wetzlar</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Entwicklung einer ultraschnellen mobilen Landingpage für 24/7 Notöffnungen.
                Dominante Spitzenpositionen bei lokalen Suchanfragen in Mittelhessen und
                signifikante Steigerung der täglichen Direktanrufe.
              </p>
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <span>Top-3 Google Ranking</span> · <span>24/7 Conversion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCAL GEO-SEMANTIC CONTENT SILO (P1–P3) */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschaftsstandort Wetzlar
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              P1: Wetzlar als weltweites Zentrum für Optik, Feinmechanik & Mittelstand
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Wetzlar ist international bekannt als Wiege der optischen Industrie. Namen wie Leica
              und Zeiss haben die Stadt geprägt. Heute versammelt das <em>Wetzlar Network</em>{' '}
              hochinnovative Präzisionsfertiger, Medizintechnik-Spezialisten und B2B-Unternehmen in
              den Gewerbeparks
              <strong>Spilburg</strong>, <strong>Dillfeld</strong> und{' '}
              <strong>Altenberger Straße</strong>. Diese hochspezialisierten Betriebe benötigen
              digitale Auftritte, die ihre technologische Exzellenz millimetergenau widerspiegeln.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              P2: Technologische Überlegenheit für den Lahn-Dill-Kreis
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Veraltete WordPress-Websites mit 4-Sekunden-Ladezeiten und ständigen Plugin-Updates
              passen nicht zum Qualitätsanspruch des heimischen Mittelstands. Mit Next.js 15 bieten
              wir Wetzlarer Firmen eine serverlose Enterprise-Architektur, die
              Google-Spitzenplatzierungen sichert und B2B-Kunden sofort überzeugt.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              P3: Zentrale Lage & erstklassige Verkehrsanbindung
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Mit direkter Anbindung an die <strong>B49</strong> und die{' '}
              <strong>A45 (Sauerlandlinie)</strong>
              verbindet Wetzlar Mittelhessen mit dem Rhein-Main-Gebiet und Nordrhein-Westfalen. Als
              lokale Webagentur mit Sitz in der Lessingstraße sind wir innerhalb von Minuten bei
              Ihnen vor Ort in Hermannstein, Nauborn, Garbenheim, Dutenhofen oder Steindorf.
            </p>
          </div>
        </div>
      </section>

      {/* 9. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zu Webdesign in Wetzlar
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine professionelle Website in Wetzlar?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und
                verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-gestützten
                Workflows sind wir 5–10x günstiger als traditionelle Großagenturen bei signifikant
                höherer technischer Performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie lange dauert die Umsetzung unseres Webprojekts?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel 10 bis 14 Werktage bis zum schlüsselfertigen Go-Live Ihrer neuen
                Website.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Können wir uns persönlich in Wetzlar treffen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Unser Agentur-HQ befindet sich direkt in Wetzlar. Wir kommen für ein
                persönliches Beratungsgespräch direkt zu Ihnen in den Betrieb.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie eine Zufriedenheits- und Performance-Garantie?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, vertraglich garantierte Lighthouse-Scores von über 90 Punkten und perfekte
                Google Core Web Vitals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer betreut die Website nach dem Launch?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel persönlich mit garantiertem 24h-Support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 text-center border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den digitalen Vorsprung in Wetzlar?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches 20-Minuten-Strategiegespräch direkt mit
            Inhaber Umutcan Emre Tezgel in Wetzlar.
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
