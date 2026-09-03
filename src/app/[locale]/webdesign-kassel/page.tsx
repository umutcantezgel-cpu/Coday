import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import {
  getCityHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
import { RegionalSilo } from '@/features/local-seo/ui/RegionalSilo';
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
  GearSix,
  Sun,
  Truck,
  Cube,
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
      title: 'Web Design Kassel | Next.js Agency · Coday',
      description:
        'Web design & web development in Kassel. Next.js 15 platforms for industry, logistics & SME in North Hesse. Fixed prices on request.',
      keywords: [
        'Web Design Kassel',
        'Web Agency Kassel',
        'Website Creation Kassel',
        'Web Development North Hesse',
        'Coday Web Kassel',
      ],
      path: '/en/webdesign-kassel',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Kassel | High-Performance Agentur · Coday',
    description:
      'Webdesign & Webentwicklung in Kassel. Next.js 15 Plattformen für Industrie, Logistik & Mittelstand in Nordhessen. Verbindliche Festpreise auf Anfrage.',
    keywords: [
      'Webdesign Kassel',
      'Webagentur Kassel',
      'Website erstellen Kassel',
      'Webentwicklung Nordhessen',
      'Coday Web Kassel',
    ],
    path: '/de/webdesign-kassel',
    type: 'money',
  });
}

export default async function WebdesignKasselPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization node is emitted once site-wide by the root layout.
    '@graph': [
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-kassel' }, _locale),
      ...(getCityHierarchySchema('webdesign-kassel', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website für Industrie & Mittelstand in Kassel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Industrieunternehmen im Waldau, Startups im Science Park und Logistiker im GVZ transparente Festpreise nach technischer Bedarfsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform in Kassel online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine in den Science Park oder nach Waldau?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A7 oder A49 erreichen wir Sie von unserem Wetzlarer HQ aus schnell direkt vor Ort in Kassel, Baunatal oder Lohfelden.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie interaktive Produktkataloge für Kasseler Maschinenbauer an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln dynamische, blitzschnelle Produktkataloge mit Filterfunktionen und direkter B2B-Anfragefunktion.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser persönlicher Entwickler & Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel persönlich berät und entwickelt direkt ohne zwischengeschaltete Agentur-Mitarbeiter.',
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

      {/* 1. SPLIT-HERO SECTION MIT ABOVE-THE-FOLD KONTAKTFORMULAR */}
      <LocalSplitHero
        badgeText="INDUSTRIE-, LOGISTIK- & B2B-WEBAGENTUR KASSEL & NORDHESSEN"
        headline={isEn ? 'Web Design Kassel:' : 'Webdesign Kassel:'}
        headlineGradient={
          isEn
            ? 'Next.js Performance for Industry, Logistics & North Hesse'
            : 'Next.js Performance für Industrie, Logistik & Nordhessen'
        }
        description="Als spezialisierte High-Performance Webagentur für Kassel und Nordhessen realisieren wir zukunftssichere Next.js Entwicklung und maßgeschneiderte B2B-Websites für Industrie, Logistik und den Mittelstand. Ladezeiten unter 500ms, 100/100 Core Web Vitals und automatisierte Neukundengewinnung."
        cityName="Kassel"
        sourceTag="local_seo_kassel"
        formHeading="Kostenlose Bedarfsanalyse für Kassel"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Kasseler Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. 4-PILLAR STATS BENTO GRID */}
      <section className="py-24 bg-[#fafafa] border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Industrie & Zukunft
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Nordhessens Wirtschaft
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Maschinenbau, Logistik, Erneuerbare Energien und
              Mittelstand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Nordhessen</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für weltweite B2B-Kunden und mobile Nutzer.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende Hierarchien.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">Festpreis</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Volle Kostensicherheit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparente Festpreise ohne versteckte Kosten oder unerwartete Agentur-Aufschläge.
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
              Next.js Entwicklung: Warum Kasseler Betriebe auf moderne B2B-Websites setzen
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
                    Garantiert 100/100 (Top-Rankings in Kassel)
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
                Maßgeschneiderte Webentwicklung für Industrie & Logistik in Kassel
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für
                Kassel, Baunatal, Lohfelden und Nordhessen: Technisch perfekt, ausdrucksstark und
                mit transparenter Festpreis-Struktur ohne teure Agentur-Wasserköpfe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">100% Quellcode-Besitz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Verbindliche Festpreis-Garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES BENTO SHOWCASE (KASSEL-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Kassel & Nordhessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Industrie-Katalog bis zur Logistik- & CleanTech-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <GearSix className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Industrie- & Maschinenbau-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für das Gewerbegebiet Waldau und Baunatal. Next.js 15, interaktive
                Produktkataloge und internationale Mehrsprachigkeit.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Truck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Logistik- & Speditions-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochperformante Webarchitekturen für das Güterverkehrszentrum Kassel (GVZ) und
                Logistikdienstleister an der zentralen A7-Achse.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Nordhessen Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Kassel, Baunatal, Lohfelden,
                Vellmar und der gesamten Region.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Sun className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Science Park & CleanTech-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zukunftssichere Webauftritte für Startups im Science Park Kassel und Unternehmen im
                Bereich Erneuerbare Energien.
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
              Wirtschaftszentrum Kassel & Nordhessen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Science Park Kassel, Gewerbegebiet Waldau & Güterverkehrszentrum (GVZ)
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Die <strong>documenta-Stadt Kassel</strong> ist das wirtschaftliche Kraftzentrum
              Nordhessens. Mit dem <strong>Science Park Kassel</strong> an der Universität,
              traditionsreichen Industriestandorten im <strong>Gewerbegebiet Waldau</strong> und in{' '}
              <strong>Baunatal</strong> sowie dem hochmodernen{' '}
              <strong>Güterverkehrszentrum (GVZ)</strong> am Autobahnknotenpunkt von{' '}
              <strong>A7, A44 und A49</strong> bietet Kassel eine herausragende Infrastruktur für
              Industrie, Mobilität und CleanTech.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte Erreichbarkeit in Hessen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A7 und A49</strong> ist unser Wetzlarer Büro schnell
              direkt bei Ihnen vor Ort in Kassel, Baunatal oder Lohfelden. Wir bieten Ihnen
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
              Fragen & Antworten zu Webdesign in Kassel
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website für Industrie & Mittelstand in Kassel?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Industrieunternehmen im Waldau, Startups im Science Park und
                Logistiker im GVZ transparente Festpreise nach technischer Bedarfsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform in Kassel online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine in den Science Park oder nach Waldau?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A7 oder A49 erreichen wir Sie von unserem Wetzlarer HQ aus
                schnell direkt vor Ort in Kassel, Baunatal oder Lohfelden.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie interaktive Produktkataloge für Kasseler Maschinenbauer an?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln dynamische, blitzschnelle Produktkataloge mit Filterfunktionen
                und direkter B2B-Anfragefunktion.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser persönlicher Entwickler & Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel persönlich berät und entwickelt direkt ohne
                zwischengeschaltete Agentur-Mitarbeiter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenklasse für Ihr Unternehmen in Kassel sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort in Kassel und ganz Nordhessen.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Kasseler Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <RegionalSilo citySlug="webdesign-kassel" locale={_locale} />
    </div>
  );
}
