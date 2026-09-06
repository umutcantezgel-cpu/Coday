import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import {
  getCityHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
import LocalConversionBlock from '@/features/local-seo/ui/LocalConversionBlock';
import { RegionalSilo } from '@/features/local-seo/ui/RegionalSilo';
import { TrustBar } from '@/shared/ui/TrustBar';
import {
  Lightning,
  ShieldCheck,
  Code,
  Buildings,
  Users,
  Check,
  Sparkle,
  LockKey,
  CheckCircle,
  Stethoscope,
  Cpu,
  Wine,
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
      title: 'Web Design Bensheim: Get Your Website Built at a Fixed Price | Coday',
      description:
        'A new website for your business in Bensheim: fixed price, live in 10 to 14 business days, built personally by the developer. Free call, reply within 24 hours.',
      keywords: [
        'Web Design Bensheim',
        'Web Agency Bensheim',
        'Website Creation Bensheim',
        'Web Development Bergstraße',
        'Coday Web Bensheim',
      ],
      path: '/en/webdesign-bensheim',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Bensheim: Website erstellen lassen zum Festpreis | Coday',
    description:
      'Neue Website für Ihr Unternehmen in Bensheim: fester Preis, in 10 bis 14 Werktagen online, persönlich vom Entwickler. Kostenloses Gespräch, Antwort innerhalb von 24 Stunden.',
    keywords: [
      'Webdesign Bensheim',
      'Webagentur Bensheim',
      'Website erstellen Bensheim',
      'Webentwicklung Bergstraße',
      'Coday Web Bensheim',
    ],
    path: '/de/webdesign-bensheim',
    type: 'money',
  });
}

export default async function WebdesignBensheimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/webdesign-bensheim`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization intentionally omitted: the root layout renders it on every page.
    '@graph': [
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-bensheim' }, _locale),
      // The WebPage names the one entity this URL answers for: the #localbusiness
      // node from getCityHierarchySchema below. Nothing else on the site may
      // claim that @id as its mainEntity.
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Bensheim | Web Agency Bergstraße · Coday'
          : 'Webdesign Bensheim | Webagentur Bergstraße · Coday',
        description: isEn
          ? 'Web design in Bensheim & Bergstraße: Fast load times, top Google rankings & more customer inquiries for businesses. Fixed price.'
          : 'Webdesign in Bensheim & an der Bergstraße: Schnelle Ladezeiten, top Google-Rankings & mehr Kunden für den Mittelstand. Festpreis.',
        locale: _locale,
        mainEntityId: `${pageUrl}#localbusiness`,
      }),
      ...(getCityHierarchySchema('webdesign-bensheim', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine Website für Dentaltechnik & Mittelstand in Bensheim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Medtech-Unternehmen im Stubenwald, Weingüter an der Bergstraße und Dienstleister transparente Festpreise nach genauer Leistungsdefinition.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine moderne Next.js Website in Bensheim online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sind Vor-Ort-Termine im Stubenwald oder im Gewerbepark Süd möglich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5 erreichen wir Sie von unserem Wetzlarer Büro aus in rund 50 Minuten direkt in Bensheim, Heppenheim oder Zwingenberg.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites die DSGVO- und Sicherheitsstandards für Medizintechnik?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Entkoppelte Headless-Architekturen ohne offene Angriffsflächen sowie deutsches ISO-27001 zertifiziertes Hosting garantieren absolute Datensicherheit.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser fester Ansprechpartner & Entwickler?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel persönlich berät und entwickelt direkt ohne zwischengeschaltete Agentur-Hierarchien.',
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
        badgeText="DENTAL-, MITTELSTANDS- & B2B-WEBAGENTUR BENSHEIM & BERGSTRASSE"
        headline={isEn ? 'Web Design Bensheim:' : 'Webdesign Bensheim:'}
        headlineGradient={
          isEn
            ? 'Next.js Performance for Bergstrasse, Dental & SMEs'
            : 'Next.js Performance für Bergstraße, Dental & Mittelstand'
        }
        description="Speziell für Dental- & Medizintechnik, Mittelstand, Tourismus & Weinbau sowie anspruchsvolle Dienstleister in Bensheim, Heppenheim, Zwingenberg und dem Kreis Bergstraße. Subsekundäre Ladezeiten unter 500ms, ausdrucksstarkes B2B-Design und planbare Kundenanfragen. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Bensheim"
        sourceTag="local_seo_bensheim"
        formHeading="Kostenlose Bedarfsanalyse für Bensheim"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Referenzen ansehen"
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
              Präzision & Wirtschaftlichkeit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Bensheimer Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Dentaltechnik, Gewerbe, Tourismus und Dienstleister.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit an der Bergstraße</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für B2B-Kunden, Patienten und Gäste.
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
              Warum Bensheimer Mittelständler auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings an der Bergstraße)
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
                Maßgeschneiderte Webentwicklung für Bensheim & die Bergstraße
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für
                Bensheim, Heppenheim, Zwingenberg und den Kreis Bergstraße: Technisch perfekt,
                ausdrucksstark und mit transparenter Festpreis-Struktur ohne teure
                Agentur-Wasserköpfe.
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

      {/* 6. SERVICES BENTO SHOWCASE (BENSHEIM-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Bensheim & die Bergstraße
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Dental-Showcase bis zur Tourismus- & Weingut-Präsenz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Dental- & Medizintechnik-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Medtech-Unternehmen und Zulieferer im Stubenwald und Gewerbepark Süd.
                Next.js 15, modulare API-Architekturen und blitzschnelle Ladezeiten weltweit.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wine className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Tourismus-, Weinbau- & Hotel-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Elegantes UI/UX-Design und mobile Optimierung für Weingüter, Hotels und Gastronomie
                an der sonnenverwöhnten hessischen Bergstraße.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Kreis Bergstraße Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Bensheim, Heppenheim,
                Zwingenberg, Lorsch und Seeheim-Jugenheim.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. B2B-Mittelstand & Dienstleister
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochkonvertierende Webplattformen für Handwerksbetriebe, Kanzleien und
                Ingenieurbüros an der Nahtstelle von Rhein-Main und Rhein-Neckar.
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
              Wirtschaftsstandort Bensheim & Bergstraße
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Größte Stadt des Kreises Bergstraße, Gewerbepark Süd & Stubenwald
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              <strong>Bensheim</strong> ist die wirtschaftlich stärkste und bevölkerungsreichste
              Stadt des <strong>Kreises Bergstraße</strong>. Mit weltweit führenden Medizintechnik-
              und Dentalunternehmen, hochmodernen Gewerbegebieten im <strong>Stubenwald</strong> und{' '}
              <strong>Gewerbepark Süd</strong> sowie einer unverwechselbaren Lebensqualität durch
              Weinbau und Tourismus bildet Bensheim das Bindeglied zwischen der{' '}
              <strong>Metropolregion Frankfurt Rhein-Main</strong> und der{' '}
              <strong>Metropolregion Rhein-Neckar</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte A5 / A67 / B3-Verbindung nach Wetzlar
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A5 und A67</strong> ist unser Wetzlarer Büro in rund 50
              Fahrminuten direkt bei Ihnen vor Ort in Bensheim, Heppenheim oder Zwingenberg. Wir
              bieten Ihnen persönliche Betreuung auf Augenhöhe ohne zeitraubende Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign in Bensheim
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine Website für Dentaltechnik & Mittelstand in Bensheim?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Medtech-Unternehmen im Stubenwald, Weingüter an der Bergstraße
                und Dienstleister transparente Festpreise nach genauer Leistungsdefinition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine moderne Next.js Website in Bensheim online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Sind Vor-Ort-Termine im Stubenwald oder im Gewerbepark Süd möglich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5 erreichen wir Sie von unserem Wetzlarer Büro aus in rund
                50 Minuten direkt in Bensheim, Heppenheim oder Zwingenberg.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites die DSGVO- und Sicherheitsstandards für Medizintechnik?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Entkoppelte Headless-Architekturen ohne offene Angriffsflächen sowie deutsches
                ISO-27001 zertifiziertes Hosting garantieren absolute Datensicherheit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser fester Ansprechpartner & Entwickler?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel persönlich berät und entwickelt direkt ohne
                zwischengeschaltete Agentur-Hierarchien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <LocalConversionBlock cityName="Bensheim" sourceTag="local_seo_webdesign_bensheim_bottom" />

      <RegionalSilo citySlug="webdesign-bensheim" locale={_locale} />
    </div>
  );
}
