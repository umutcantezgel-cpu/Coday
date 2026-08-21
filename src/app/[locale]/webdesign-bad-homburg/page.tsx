import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import {
  getCityHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
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
  Stethoscope,
  TrendUp,
  CurrencyEur,
  Crown,
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
      title: 'Web Design Bad Homburg | High-End Web Agency · Coday',
      description:
        'Web design in Bad Homburg: Elegant UX design, maximum performance & discretion for family offices, practices & B2B. Fixed price on request.',
      keywords: [
        'Web Design Bad Homburg',
        'Web Agency Bad Homburg',
        'Website Creation Bad Homburg',
        'Web Development Hochtaunus',
        'Coday Web Bad Homburg',
      ],
      path: '/en/webdesign-bad-homburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Bad Homburg | High-End Webagentur · Coday',
    description:
      'Webdesign in Bad Homburg: Elegantes UX-Design, maximale Performance & Diskretion für Family Offices, Praxen & B2B. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Bad Homburg',
      'Webagentur Bad Homburg',
      'Website erstellen Bad Homburg',
      'Webentwicklung Hochtaunus',
      'Coday Web Bad Homburg',
    ],
    path: '/de/webdesign-bad-homburg',
    type: 'money',
  });
}

export default async function WebdesignBadHomburgPage({
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
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-bad-homburg' }, _locale),
      ...(getCityHierarchySchema('webdesign-bad-homburg', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine Website für Family Offices & Praxen in Bad Homburg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Family Offices, Vermögensverwalter und Healthcare-Spezialisten im Hochtaunus transparente Festpreise nach einer individuellen Anforderungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Website in Bad Homburg online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für persönliche Meetings nach Bad Homburg oder Friedrichsdorf?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5 und A661 sind wir in rund 30 Minuten direkt bei Ihnen vor Ort an der Kaiser-Friedrich-Promenade oder im Gewerbegebiet Mitte/Süd.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie garantieren Sie Diskretion und DSGVO-Sicherheit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch entkoppelte Headless-Architekturen ohne offene Datenbankzugriffe und Hosting in deutschen ISO-27001 zertifizierten Hochsicherheitsrechenzentren.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser fester persönlicher Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel berät und entwickelt direkt mit 24h-Support ohne Zwischeninstanzen.',
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
        badgeText="FAMILY OFFICES, PHARMA & HEALTHCARE WEBAGENTUR BAD HOMBURG"
        headline="Webdesign & Next.js Entwicklung in"
        headlineGradient="Bad Homburg vor der Höhe"
        description="Elegantes UX-Design, kompromisslose Performance und maximale Diskretion für Family Offices, Pharma, Healthcare-Spezialisten und B2B-Unternehmen im Hochtaunus. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Bad Homburg"
        sourceTag="local_seo_bad_homburg"
        formHeading="Kostenlose Bedarfsanalyse für Bad Homburg"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Bad Homburger Referenzen ansehen"
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
              Exklusivität & Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Bad Homburger Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Family Offices, Pharma und gehobene Dienstleister.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Taunus</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für anspruchsvolle Investoren, B2B-Kunden und Patienten.
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
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne Agentur-Warteschleifen.
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
              Warum Bad Homburger Marktführer auf Next.js setzen
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
                    WordPress / Agentur-Monolith
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
                  <td className="p-5 font-medium text-slate-900">Diskretion & Datenschutz</td>
                  <td className="p-5 text-slate-600">
                    Ständige Sicherheitslücken durch unsichere Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine offene SQL-Datenbank)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Bad Homburg)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Ansprechpartner
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt in Hessen
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Preisstruktur</td>
                  <td className="p-5 text-slate-600">
                    Versteckte Zusatzkosten & monatliche Wartungsverträge
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
                Elegantes Webdesign & höchste Diskretion für Bad Homburg
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für Bad
                Homburg vor der Höhe, Friedrichsdorf und den Hochtaunuskreis: Technisch perfekt,
                visuell exklusiv und wirtschaftlich kalkulierbar mit garantierten Festpreisen ohne
                teuren Agentur-Overhead.
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

      {/* 6. SERVICES BENTO SHOWCASE (BAD HOMBURG-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Bad Homburg & den Hochtaunuskreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Von diskreten Family-Office-Portalen bis zu Pharma-Unternehmensauftritten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <TrendUp className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Family Office & Private Wealth Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Family Offices und Vermögensverwalter im Taunus. Höchste Diskretion,
                elegantes Minimalismus-Design und geschützte Mandantenbereiche.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Pharma & Healthcare Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Barrierefrei und compliance-konform (BITV 2.0 / WCAG) für globale Medizintechnik-
                und Gesundheitsunternehmen mit Sitz im Hochtaunuskreis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Hochtaunus Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Bad Homburg, Friedrichsdorf,
                Oberursel, Kronberg und Königstein im Taunus.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. B2B Corporate Portale (Gewerbe Mitte & Süd)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Repräsentative Unternehmenswebsites für Firmenzentralen in den Gewerbegebieten Bad
                Homburgs zur automatisierten Leadgenerierung.
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
              Wirtschaftsstandort Bad Homburg v. d. H.
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Kurpark, Kaiser-Friedrich-Promenade & Gewerbegebiete Mitte und Süd
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Bad Homburg vor der Höhe vereint das historische Ambiente des{' '}
              <strong>Kurparks</strong> und der <strong>Kaiser-Friedrich-Promenade</strong> mit
              außergewöhnlicher wirtschaftlicher Dynamik. Als führender Standort für{' '}
              <strong>Pharma, Healthcare, Medizintechnik</strong> und exklusive{' '}
              <strong>Family Offices</strong> verlangen ansässige Unternehmen nach kompromissloser
              digitaler Präzision, absoluter Diskretion und erstklassigem Design Engineering.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte A5- / A661-Verbindung von unserem Wetzlarer HQ
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A5 und A661</strong> ist unser Büro in weniger als 30
              Fahrminuten direkt bei Ihnen vor Ort in Bad Homburg oder Friedrichsdorf. Wir bieten
              Ihnen den entscheidenden Vorteil eines persönlichen Ansprechpartners und maximaler
              Flexibilität im gesamten Hochtaunuskreis.
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
              Fragen & Antworten zu Webdesign in Bad Homburg
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine Website für Family Offices & Praxen in Bad Homburg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Family Offices, Vermögensverwalter und Healthcare-Spezialisten
                im Hochtaunus transparente Festpreise nach einer individuellen Anforderungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Website in Bad Homburg online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für persönliche Meetings nach Bad Homburg oder Friedrichsdorf?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5 und A661 sind wir in rund 30 Minuten direkt bei Ihnen
                vor Ort an der Kaiser-Friedrich-Promenade oder im Gewerbegebiet Mitte/Süd.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie garantieren Sie Diskretion und DSGVO-Sicherheit?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Durch entkoppelte Headless-Architekturen ohne offene Datenbankzugriffe und Hosting
                in deutschen ISO-27001 zertifizierten Hochsicherheitsrechenzentren.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser fester persönlicher Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel berät und entwickelt direkt mit 24h-Support ohne
                Zwischeninstanzen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenklasse für Ihr Unternehmen in Bad Homburg sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort in Bad Homburg und im Hochtaunuskreis.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Bad Homburger Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
