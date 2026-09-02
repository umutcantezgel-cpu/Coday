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
  Flask,
  GraduationCap,
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
      title: 'Web Design Marburg | High-Performance Web Agency · Coday',
      description:
        'Web design & Next.js development in Marburg. Fast load times, accessible UX design & top SEO for pharma, practices & mid-market. Fixed price on request.',
      keywords: [
        'Web Design Marburg',
        'Web Agency Marburg',
        'Website Creation Marburg',
        'Web Development Marburg',
        'Coday Web Marburg',
      ],
      path: '/en/webdesign-marburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Marburg | High-Performance Webagentur · Coday',
    description:
      'Webdesign & Next.js Entwicklung in Marburg. Schnelle Ladezeiten, barrierefreies UX-Design & Top-SEO für Pharma, Praxen & Mittelstand. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Marburg',
      'Webagentur Marburg',
      'Website erstellen Marburg',
      'Webentwicklung Marburg',
      'Coday Web Marburg',
    ],
    path: '/de/webdesign-marburg',
    type: 'money',
  });
}

export default async function WebdesignMarburgPage({
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
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-marburg' }, _locale),
      ...(getCityHierarchySchema('webdesign-marburg', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie werden die Kosten für ein Webprojekt in Marburg kalkuliert?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren nach einer strukturierten Bedarfsanalyse einen verbindlichen Festpreis. Pharma-Unternehmen in den Behringwerken sowie Kanzleien und Mittelständler in Cappel und Wehrda profitieren von voller Transparenz ohne versteckte Agenturgebühren.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Next.js Website in Marburg online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel steht Ihre neue digitale Präsenz in Marburg innerhalb von 10 bis 14 Werktagen schlüsselfertig im Netz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sind Vor-Ort-Termine in Marburg, Cappel oder Wehrda möglich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die B3 erreichen wir Sie von unserem Wetzlarer Büro aus in weniger als 25 Minuten für ein persönliches Strategiegespräch.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites die Barrierefreiheitsstandards nach BITV 2.0 & WCAG 2.2?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln semantisch saubere, tastaturbedienbare und screenreader-optimierte Webanwendungen gemäß BITV 2.0 und WCAG 2.2, ideal für Praxen, Institute und forschungsnahe Einrichtungen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist während des gesamten Projekts mein direkter Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gründer und Lead Engineer Umutcan Emre Tezgel berät Sie persönlich und setzt alle Anforderungen ohne Zwischeninstanzen um.',
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
        badgeText="PHARMA, BIOTECH & B2B WEBAGENTUR MARBURG"
        headline={isEn ? 'Web Design Marburg:' : 'Webdesign Marburg:'}
        headlineGradient={
          isEn
            ? 'Digital Excellence for Pharma, Biotech & SMEs'
            : 'Digitale Exzellenz für Pharma, Biotech & Mittelstand'
        }
        description="Als spezialisierte High-Performance Webagentur für Marburg realisieren wir maßgeschneiderte Next.js Entwicklung und verkaufsstarke B2B-Websites für Pharma-, Biotech- und mittelständische Unternehmen in den Behringwerken und ganz Mittelhessen. Maximale Ladezeiten unter 500ms, barrierefreie UX und planbare Neukunden."
        cityName="Marburg"
        sourceTag="local_seo_marburg"
        formHeading="Kostenlose Bedarfsanalyse für Marburg"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Marburger Referenzen ansehen"
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
              Performance & Sicherheit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Marburger Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Enterprise-Technologie für Pharma, Biotech, Forschung und Mittelstand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Marburg</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für internationale Partner, Forscher und B2B-Entscheider.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Abhängigkeiten.
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
              Next.js Entwicklung: Warum Marburger Firmen & B2B-Websites auf Next.js umsteigen
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
                    WordPress / Typo3 Monolith
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
                    Ständige Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare PHP-Schnittstelle)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Barrierefreiheit (BITV 2.0)</td>
                  <td className="p-5 text-slate-600">
                    Oft mangelhaft und nachträglich schwer anpassbar
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Vollständig standardkonform nach WCAG 2.2 / BITV
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Ansprechpartner
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt in Mittelhessen
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
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
                Spezialisierte Next.js Entwicklung für Marburger Spitzenunternehmen
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Für
                Marburger Biotech-Firmen, Kanzleien und mittelständische Unternehmen realisiere ich
                performante, barrierefreie Webanwendungen ohne bürokratischen Agentur-Wasserkopf:
                technisch kompromisslos, ästhetisch überzeugend und planbar im Zeitrahmen.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Persönliche Betreuung durch den Gründer</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">100% Quellcode-Eigentum</span>
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

      {/* 6. SERVICES BENTO SHOWCASE (MARBURG-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Marburg & den Landkreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom hochsicheren Pharma-Portal bis zur barrierefreien Klinik-Homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Flask className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Pharma & Biotech Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für die Behringwerke und Life-Science-Pioniere. Entkoppelte
                Headless-Architekturen, strikter Datenschutz und kompromisslose Ausfallsicherheit
                bei Publikationen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <ShieldCheck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Barrierefreie Praxis- & Kanzleiportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                100% barrierefrei nach BITV 2.0 und WCAG 2.2 für Praxen, Kliniken, Kanzleien und
                öffentliche Einrichtungen in Marburg, Cappel und Wehrda.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & B3-Achse Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Marburg, Cölbe, Kirchhain,
                Stadtallendorf und dem gesamten Landkreis Marburg-Biedenkopf.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Users className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Campus Recruiting Funnels
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                60-Sekunden-Bewerbungsverfahren ohne Anschreiben zur Gewinnung von Absolventen der
                Philipps-Universität Marburg.
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
              Wirtschafts- & Wissenschaftsstandort Marburg
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Pharma-Exzellenz, Philipps-Universität & Tradition an der Lahn
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Marburg an der Lahn vereint die reiche Tradition der{' '}
              <strong>Philipps-Universität</strong> und der historischen <strong>Oberstadt</strong>{' '}
              mit weltweiter Spitzenforschung im Pharma- und Biotech-Sektor. An den{' '}
              <strong>Behringwerken</strong> und im <strong>Görzhain</strong> forschen und
              produzieren Weltmarktführer. In den Gewerbegebieten <strong>Wehrda</strong> und{' '}
              <strong>Cappel</strong>
              floriert zudem ein starker, innovativer Mittelstand.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte B3-Achse Marburg-Gießen-Kassel
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die ausgebaute <strong>Bundesstraße B3</strong> ist unser Wetzlarer Büro in rund
              25 Fahrminuten direkt bei Ihnen vor Ort in Marburg. Wir bieten Ihnen den
              entscheidenden Vorteil einer persönlichen Betreuung und kurzen Wegen im gesamten
              Landkreis Marburg-Biedenkopf.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Absolute Planungssicherheit für Ihr Projekt: Nach unserer kostenlosen Bedarfsanalyse
              erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten.
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
              Fragen & Antworten zu Webdesign in Marburg
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie werden die Kosten für ein Webprojekt in Marburg kalkuliert?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren nach einer strukturierten Bedarfsanalyse einen verbindlichen
                Festpreis. Pharma-Unternehmen in den Behringwerken sowie Kanzleien und
                Mittelständler in Cappel und Wehrda profitieren von voller Transparenz ohne
                versteckte Agenturgebühren.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Next.js Website in Marburg online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel steht Ihre neue digitale Präsenz in Marburg innerhalb von 10 bis 14
                Werktagen schlüsselfertig im Netz.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Sind Vor-Ort-Termine in Marburg, Cappel oder Wehrda möglich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die B3 erreichen wir Sie von unserem Wetzlarer Büro aus in
                weniger als 25 Minuten für ein persönliches Strategiegespräch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites die Barrierefreiheitsstandards nach BITV 2.0 & WCAG 2.2?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln semantisch saubere, tastaturbedienbare und
                screenreader-optimierte Webanwendungen gemäß BITV 2.0 und WCAG 2.2, ideal für
                Praxen, Institute und forschungsnahe Einrichtungen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist während des gesamten Projekts mein direkter Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gründer und Lead Engineer Umutcan Emre Tezgel berät Sie persönlich und setzt alle
                Anforderungen ohne Zwischeninstanzen um.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenposition für Ihr Marburger Unternehmen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Strategiegespräch direkt mit Inhaber
            Umutcan Emre Tezgel für Ihren Standort in Marburg und Umgebung.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Marburger Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
