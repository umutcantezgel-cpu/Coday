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
  Broadcast,
  Drop,
  Cpu,
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
      title: 'Web Design Bad Vilbel: Get Your Website Built at a Fixed Price | Coday',
      description:
        'A new website for your business in Bad Vilbel: fixed price, live in 10 to 14 business days, built personally by the developer. Free call, reply within 24 hours.',
      keywords: [
        'Web Design Bad Vilbel',
        'Web Agency Bad Vilbel',
        'Website Creation Bad Vilbel',
        'Web Development Wetterau',
        'Coday Web Bad Vilbel',
      ],
      path: '/en/webdesign-bad-vilbel',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Bad Vilbel: Website erstellen lassen zum Festpreis | Coday',
    description:
      'Neue Website für Ihr Unternehmen in Bad Vilbel: fester Preis, in 10 bis 14 Werktagen online, persönlich vom Entwickler. Kostenloses Gespräch, Antwort innerhalb von 24 Stunden.',
    keywords: [
      'Webdesign Bad Vilbel',
      'Webagentur Bad Vilbel',
      'Website erstellen Bad Vilbel',
      'Webentwicklung Wetterau',
      'Coday Web Bad Vilbel',
    ],
    path: '/de/webdesign-bad-vilbel',
    type: 'money',
  });
}

export default async function WebdesignBadVilbelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/webdesign-bad-vilbel`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // The root layout supplies the Organization node, so it stays out of this graph.
    '@graph': [
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-bad-vilbel' }, _locale),
      // The WebPage names the one entity this URL answers for: the #localbusiness
      // node from getCityHierarchySchema below. Nothing else on the site may
      // claim that @id as its mainEntity.
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Bad Vilbel | Web Development & SEO · Coday'
          : 'Webdesign Bad Vilbel | Webentwicklung & SEO · Coday',
        description: isEn
          ? 'Professional web design in Bad Vilbel. Modern websites, top PageSpeed & local Google rankings for mid-market & services. Fixed price on request.'
          : 'Webdesign in Bad Vilbel: Schnelle Next.js Websites, Top-PageSpeed & lokale Google-Rankings für Mittelstand & Dienstleister. Verbindlicher Festpreis.',
        locale: _locale,
        mainEntityId: `${pageUrl}#localbusiness`,
      }),
      ...(getCityHierarchySchema('webdesign-bad-vilbel', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website in Bad Vilbel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Medienunternehmen, Pharma-Dienstleister in Dortelweil und Betriebe am Quellenpark transparente Festpreise nach einer detaillierten Anforderungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Website in Bad Vilbel online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Bad Vilbel, Dortelweil oder Massenheim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die B3 und A5 erreichen wir Sie von unserem Wetzlarer Büro aus in rund 35 Minuten direkt vor Ort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie Headless CMS Lösungen für Medien- und Rundfunkportale in Bad Vilbel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir integrieren Sanity CMS für intuitive, blitzschnelle Redaktions-Workflows ohne Programmieraufwand.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser fester technischer Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel berät und entwickelt direkt mit 24h-Support.',
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
        badgeText="MEDIEN-, PHARMA- & MITTELSTANDS-WEBAGENTUR BAD VILBEL"
        headline={isEn ? 'Web Design Bad Vilbel:' : 'Webdesign Bad Vilbel:'}
        headlineGradient={
          isEn
            ? 'Next.js Performance for Media, Pharma & SMEs'
            : 'Next.js Performance für Medien, Pharma & Mittelstand'
        }
        description="Speziell für Medienunternehmen, Pharma-, Healthcare- und B2B-Dienstleister in Bad Vilbel, Dortelweil und Massenheim. Subsekundäre Ladezeiten unter 500ms, perfekte Google-Rankings und planbare Leadgenerierung. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Bad Vilbel"
        sourceTag="local_seo_bad_vilbel"
        formHeading="Kostenlose Bedarfsanalyse für Bad Vilbel"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Bad Vilbeler Referenzen ansehen"
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
              Performance & Wirkung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Bad Vilbeler Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Medien, Pharma und regionale Dienstleister.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Bad Vilbel</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für vielbeschäftigte B2B-Kunden und Medienkonsumenten.
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
                Transparente Festpreise ohne versteckte Kosten oder unvorhersehbare
                Agentur-Stundensätze.
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
              Warum Bad Vilbeler Unternehmen auf Next.js umsteigen
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
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Compliance</td>
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
                    Garantiert 100/100 (Top-Rankings in Bad Vilbel)
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
                Maßgeschneiderte Webentwicklung für Medien & Pharma in Bad Vilbel
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für Bad
                Vilbel, Dortelweil und die südliche Wetterau: Technisch perfekt, kompromisslos
                schnell und wirtschaftlich kalkulierbar mit garantierten Festpreisen ohne teuren
                Agentur-Overhead.
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

      {/* 6. SERVICES BENTO SHOWCASE (BAD VILBEL-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Bad Vilbel & die Wetterau
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Medien-Portal bis zur Pharma- & Mittelstands-Website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Broadcast className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Medien-, Rundfunk- & Kreativ-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Medienhäuser, Rundfunk-Sender und Kulturinitiativen in Bad Vilbel.
                Dynamische Headless-Workflows mit Sanity CMS und sekundenschnelle
                Veröffentlichungen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Cpu className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Pharma & Mittelstands-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Repräsentative Unternehmenswebsites für Pharmaunternehmen und Mittelständler im
                Gewerbegebiet Dortelweil mit voller Barrierefreiheit (BITV 2.0 / WCAG).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Wetterau Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Bad Vilbel, Dortelweil,
                Massenheim, Karben und im Frankfurter Norden.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Drop className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Quellenpark & Dienstleister Webauftritte
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Moderne Webseiten für Praxen, Kanzleien und Dienstleister rund um den Quellenpark
                zur automatisierten Neukunden- und Terminbuchung.
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
              Wirtschafts- & Medienstandort Bad Vilbel
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Quellenpark, Gewerbegebiet Dortelweil & B3-Achse nach Frankfurt
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Bad Vilbel verbindet als traditionsreiche <strong>Quellenstadt</strong> höchste
              Lebensqualität mit außergewöhnlicher Wirtschaftskraft. Neben dem modernen{' '}
              <strong>Quellenpark</strong> und dem florierenden{' '}
              <strong>Gewerbegebiet Dortelweil</strong> hat sich Bad Vilbel als führender{' '}
              <strong>Medienstandort</strong> und Heimat global agierender{' '}
              <strong>Pharma- und Gesundheitsunternehmen</strong> etabliert. Über die{' '}
              <strong>B3-Schnellstraße</strong> und die <strong>S6-Bahnlinie</strong> besteht eine
              nahtlose Verbindung nach Frankfurt am Main und Mittelhessen.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte B3- / A5-Achse nach Wetzlar
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesstraße B3 und die Autobahn A5</strong> ist unser Wetzlarer Büro
              in rund 35 Fahrminuten direkt bei Ihnen vor Ort in Bad Vilbel, Dortelweil oder
              Massenheim. Wir bieten Ihnen persönliche Betreuung auf Augenhöhe ohne zeitraubende
              Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign in Bad Vilbel
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website in Bad Vilbel?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Medienunternehmen, Pharma-Dienstleister in Dortelweil und
                Betriebe am Quellenpark transparente Festpreise nach einer detaillierten
                Anforderungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Website in Bad Vilbel online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Bad Vilbel, Dortelweil oder Massenheim?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die B3 und A5 erreichen wir Sie von unserem Wetzlarer Büro aus
                in rund 35 Minuten direkt vor Ort.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie Headless CMS Lösungen für Medien- und Rundfunkportale in Bad Vilbel?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir integrieren Sanity CMS für intuitive, blitzschnelle Redaktions-Workflows
                ohne Programmieraufwand.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser fester technischer Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel berät und entwickelt direkt mit 24h-Support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <LocalConversionBlock
        cityName="Bad Vilbel"
        sourceTag="local_seo_webdesign_bad_vilbel_bottom"
      />

      <RegionalSilo citySlug="webdesign-bad-vilbel" locale={_locale} />
    </div>
  );
}
