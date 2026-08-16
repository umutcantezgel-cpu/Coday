import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
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
  Crown,
  Bank,
  Wrench,
  Stethoscope,
  MapPin,
  ChartBar,
  Star,
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
      title: 'Web Design Hochtaunus District | Web Agency · Coday',
      description:
        'Exclusive web design for the Hochtaunus district. High-performance websites & discreet service for Bad Homburg, Oberursel & Kronberg. Fixed prices.',
      path: '/en/regionen/hochtaunuskreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Hochtaunuskreis | Premium Webagentur · Coday',
    description:
      'Exklusives Webdesign für den Hochtaunuskreis. High-Performance Websites & diskreter Service für Bad Homburg, Oberursel & Kronberg. Festpreis auf Anfrage.',
    path: '/de/regionen/hochtaunuskreis',
    type: 'money',
  });
}

export default async function HochtaunuskreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Bad Homburg vor der Höhe (Kreisstadt)',
      link: '/webdesign-bad-homburg',
      highlight: true,
      note: 'Medizintechnik, DAX & Spitzenkaufkraft',
    },
    {
      name: 'Oberursel (Taunus)',
      link: '/webdesign-oberursel',
      highlight: true,
      note: 'B2B-Consulting & IT-Hub',
    },
    {
      name: 'Friedrichsdorf',
      link: '/webdesign-bad-homburg',
      highlight: true,
      note: 'Zwiebackstadt & B2B-Mittelstand',
    },
    {
      name: 'Kronberg im Taunus',
      link: '/webdesign-oberursel',
      highlight: true,
      note: 'Finanzdienstleistung & Braun-Design',
    },
    {
      name: 'Königstein im Taunus',
      link: '/webdesign-bad-homburg',
      highlight: true,
      note: 'Heilklima, Privatkliniken & Villen',
    },
    {
      name: 'Usingen',
      link: '/webdesign-bad-homburg',
      highlight: false,
      note: 'Buchfinkenland-Zentrum & Handwerk',
    },
    {
      name: 'Neu-Anspach',
      link: '/webdesign-bad-homburg',
      highlight: false,
      note: 'Gewerbeparks & Hessenpark',
    },
    {
      name: 'Wehrheim',
      link: '/webdesign-bad-homburg',
      highlight: false,
      note: 'Apfeldorf & mittelständisches Gewerbe',
    },
    {
      name: 'Schmitten im Taunus',
      link: '/webdesign-oberursel',
      highlight: false,
      note: 'Feldberg-Tourismus & Handwerk',
    },
    {
      name: 'Glashütten',
      link: '/webdesign-bad-homburg',
      highlight: false,
      note: 'Exklusives Wohnen & Dienstleistungen',
    },
    {
      name: 'Grävenwiesbach',
      link: '/webdesign-bad-homburg',
      highlight: false,
      note: 'Handwerk & regionales Gewerbe',
    },
    {
      name: 'Weilrod',
      link: '/webdesign-bad-homburg',
      highlight: false,
      note: 'Natur, Handwerk & Kleinbetriebe',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/regionen/hochtaunuskreis#localbusiness`,
        name: 'Coday – Exklusive Webagentur Hochtaunuskreis',
        url: `${BASE_URL}/${_locale}/regionen/hochtaunuskreis`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Regionalbüro Mittelhessen & Taunus',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.2287,
          longitude: 8.6105,
        },
        areaServed: [
          { '@type': 'City', name: 'Bad Homburg vor der Höhe' },
          { '@type': 'City', name: 'Oberursel (Taunus)' },
          { '@type': 'City', name: 'Kronberg im Taunus' },
          { '@type': 'City', name: 'Königstein im Taunus' },
          { '@type': 'City', name: 'Friedrichsdorf' },
          { '@type': 'AdministrativeArea', name: 'Hochtaunuskreis' },
          { '@type': 'AdministrativeArea', name: 'Taunus' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/regionen/hochtaunuskreis#service`,
        name: 'Premium Webdesign & Kanzlei Webentwicklung Hochtaunuskreis',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Family Office & Kanzlei Webportale',
          'Privatklinik & MedTech Webdesign',
          'Next.js 15 Webentwicklung',
          'Local SEO Hochtaunuskreis',
          'Sanity Headless CMS',
        ],
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
            name: 'Regionen',
            item: `${BASE_URL}/${_locale}/standorte/hessen`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Hochtaunuskreis',
            item: `${BASE_URL}/${_locale}/regionen/hochtaunuskreis`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine neue Website im Hochtaunuskreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-Workflows sind wir 5–10x günstiger als traditionelle Großagenturen bei signifikant höherer Performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Website im Hochtaunuskreis online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für ein Beratungsgespräch direkt zu uns in den Betrieb oder die Praxis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, selbstverständlich. Über die A5 oder A661 sind wir von unserem Wetzlarer HQ in rund 30 Minuten direkt bei Ihnen vor Ort in Bad Homburg, Oberursel, Kronberg oder Königstein.',
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

      {/* 1. HERO SECTION MIT LEAD CAPTURE */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#fafafa]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-sm">
            <Sparkle className="w-4 h-4 text-amber-600" />
            REGIONALER MASTER-HUB · HOCHTAUNUSKREIS
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Webdesign & Next.js Entwicklung im{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-teal-700 bg-clip-text text-transparent">
              Hochtaunuskreis
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Ihre exklusive High-End Webagentur für Bad Homburg, Oberursel, Kronberg, Königstein und
            den gesamten Taunus. Maßgeschneiderte Webentwicklung, diskreter Service und
            kompromisslose Performance für Kanzleien, Privatkliniken und Premium-Unternehmen.
            Verbindlicher Festpreis nach kostenloser Bedarfsanalyse.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
              Kostenlose Bedarfsanalyse im Hochtaunuskreis anfordern
            </h2>
            <LazyQuickContactForm />
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
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">30 Min</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Vor Ort via A5 / A661
              </div>
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

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR HOCHTAUNUSKREIS */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Hochtaunuskreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Wählen Sie Ihren Standort für maßgeschneiderte lokale Weblösungen und
              Branchenexpertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kommunen.map((k) => (
              <Link
                key={k.name}
                href={k.link}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  k.highlight
                    ? 'bg-white border-amber-500/40 hover:border-amber-500 hover:shadow-md'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      className={`w-4 h-4 ${k.highlight ? 'text-amber-600' : 'text-slate-400'}`}
                    />
                    <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-base">
                      {k.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{k.note}</p>
                </div>
                <CaretRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 4-PILLAR STATS BENTO GRID */}
      <section className="py-24 relative bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschaftskraft Hochtaunus
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Kanzleien, Privatpraxen & Family Offices
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Spitzenkaufkraft, Villenlagen und anspruchsvolle
              Mandanten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Taunus</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für anspruchsvolle Mandanten und mobile Entscheider.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende Hierarchien.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
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

      {/* 5. COMPARISON TABLE: NEXT.JS VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-white border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum Premium-Unternehmen im Hochtaunus auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Hochtaunuskreis)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Account Manager
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt in Mittelhessen
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

      {/* 6. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 relative bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Echtes Handwerk statt Agentur-Overhead für den Hochtaunuskreis
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler baue ich Ihre Webpräsenz für den gesamten
                Hochtaunuskreis: Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x
                effizienter als traditionelle Agentur-Wasserköpfe.
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

      {/* 7. SERVICES BENTO SHOWCASE (HOCHTAUNUSKREIS-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Hochtaunuskreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Family Office Webauftritt bis zur MedTech- & Kanzlei-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Bank className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Family Offices, Vermögensverwaltung & Kanzleien
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Diskrete, hochgradig geschützte und ästhetisch makellose Webpräsenzen für Kronberg,
                Königstein und Bad Homburg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Privatkliniken & MedTech-Unternehmen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Barrierefreie Patientenportale und B2B-Plattformen für Medizintechnik-Konzerne und
                renommierte Fachkliniken in Bad Homburg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Hochtaunuskreis Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 12 Kommunen des
                Hochtaunuskreises.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. IT-, Consulting- & Mittelstand-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochperformante Webanwendungen für Unternehmensberatungen in Oberursel und das
                Usinger Land mit 60-Sekunden-Express-Recruiting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschaftsregion Hochtaunuskreis
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Kurstadt Bad Homburg, IT-Standort Oberursel, Villenlagen Kronberg & Königstein
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Hochtaunuskreis</strong> zählt zu den kaufkraftstärksten Regionen Europas.
              Er beherbergt Weltkonzerne der Gesundheitswirtschaft in{' '}
              <strong>Bad Homburg vor der Höhe</strong>, führende IT- und Consulting-Häuser in{' '}
              <strong>Oberursel</strong> sowie traditionsreiche Privatbankiers, Family Offices und
              Kanzleien in den exklusiven Hanglagen von
              <strong>Kronberg und Königstein im Taunus</strong>. Ergänzt wird die Region durch
              starkes Handwerk und Gewerbe im{' '}
              <strong>Usinger Land (Usingen, Neu-Anspach, Wehrheim)</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über A5 / A661
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesautobahn A5 oder die A661</strong> sind wir in rund 30
              Fahrminuten direkt bei Ihnen vor Ort im gesamten Hochtaunuskreis. Wir garantieren
              Ihnen absolute Diskretion und persönliche Betreuung auf Augenhöhe.
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

      {/* 9. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zu Webdesign im Hochtaunuskreis
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine neue Website im Hochtaunuskreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und
                verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-Workflows sind wir
                5–10x günstiger als traditionelle Großagenturen bei signifikant höherer Performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Website im Hochtaunuskreis online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für ein Beratungsgespräch direkt zu uns in den Betrieb oder die Praxis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, selbstverständlich. Über die A5 oder A661 sind wir von unserem Wetzlarer HQ in
                rund 30 Minuten direkt bei Ihnen vor Ort in Bad Homburg, Oberursel, Kronberg oder
                Königstein.
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

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den digitalen Vorsprung im Hochtaunuskreis?
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
