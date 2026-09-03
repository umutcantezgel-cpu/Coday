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
  Truck,
  Briefcase,
  Scales,
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
      title: 'Web Design Limburg | Next.js Agency & SEO · Coday',
      description:
        'Professional web design in Limburg an der Lahn. Modern websites, top loading times & SEO for services, trade & law firms. Fixed price on request.',
      keywords: [
        'Web Design Limburg',
        'Web Agency Limburg',
        'Website Creation Limburg',
        'Web Development Limburg an der Lahn',
        'Coday Web Limburg',
      ],
      path: '/en/webdesign-limburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Limburg | Next.js Agentur & SEO · Coday',
    description:
      'Professionelles Webdesign in Limburg an der Lahn. Moderne Websites, Top-Ladezeiten & SEO für Dienstleister, Handel & Kanzleien. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Limburg',
      'Webagentur Limburg',
      'Website erstellen Limburg',
      'Webentwicklung Limburg an der Lahn',
      'Coday Web Limburg',
    ],
    path: '/de/webdesign-limburg',
    type: 'money',
  });
}

export default async function WebdesignLimburgPage({
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
    // The Organization node already ships from the root layout, so it is not repeated here.
    '@graph': [
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-limburg' }, _locale),
      ...(getCityHierarchySchema('webdesign-limburg', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine professionelle Website in Limburg an der Lahn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Limburger Handels- und Logistikbetriebe, Kanzleien und Arztpraxen transparente Festpreise nach einer kostenlosen Analyse Ihres Projektumfangs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine moderne Next.js Website in Limburg online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Limburg, Diez oder Elz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, gerne. Über die vierspurige B49 erreichen wir Sie von unserem Wetzlarer Büro aus in rund 20 bis 25 Minuten direkt vor Ort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie auch Lösungen für Kanzleien, Notare und Praxen in Limburg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln barrierefreie Websites mit 100% DSGVO-konformen Buchungs- und Kontaktstrecken für maximale Mandanten- und Patientengewinnung.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist mein fester Entwickler und Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel berät und entwickelt direkt ohne wechselnde Projektmanager.',
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
        badgeText="HANDEL, LOGISTIK & DIENSTLEISTER WEBAGENTUR LIMBURG"
        headline={isEn ? 'Web Design Limburg:' : 'Webdesign Limburg:'}
        headlineGradient={
          isEn
            ? 'Digital Excellence for Retail, Logistics & Services'
            : 'Digitale Exzellenz für Handel, Logistik & Dienstleistung'
        }
        description="Speziell für Handel, Logistik, Kanzleien, Praxen und Dienstleister am ICE-Knotenpunkt Limburg, Diez und Elz. Maximale Ladezeiten unter 500ms, perfekte Google-Rankings und planbare Neukundengewinnung. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Limburg"
        sourceTag="local_seo_limburg"
        formHeading="Kostenlose Bedarfsanalyse für Limburg"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Limburger Referenzen ansehen"
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
              Performance & ROI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Limburger Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Handel, Logistik, Kanzleien und Mittelstand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Limburg</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für überregionale Kunden, Einkäufer und mobile Nutzer.
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
              Warum Limburger Marktführer auf Next.js setzen
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
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Datenschutz</td>
                  <td className="p-5 text-slate-600">
                    Ständige Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare Datenbank)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Limburg)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Ansprechpartner
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt im Lahntal
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
                Maßgeschneiderte Webentwicklung für Handel & Kanzleien in Limburg
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Für
                Limburger Handels- und Logistikbetriebe, Fachkanzleien und medizinische Praxen baue
                ich hochmoderne Webanwendungen mit Ladezeiten unter 0,4 Sekunden, voller
                DSGVO-Konformität und messbarer Leadgenerierung.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">100% Quellcode-Besitz ohne Abo</span>
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

      {/* 6. SERVICES BENTO SHOWCASE (LIMBURG-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Limburg & das Lahntal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Handels- und Logistikportal bis zur Kanzlei-Website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Truck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Logistik- & Handels-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Handels- und Logistikunternehmen an der Dietkircher Höhe und am
                ICE-Bahnhof. Schnelle Ladezeiten, API-Integrationen und B2B-Kundenportale.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Scales className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Kanzlei- & Praxis-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Seriöse, barrierefreie Auftritte für Rechtsanwälte, Notare, Steuerberater und
                Fachärzte in Limburg und Diez mit Online-Terminvereinbarung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & A3/B49/B54 Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenplatzierungen in Limburg, Diez, Elz,
                Hadamar, Bad Camberg und an der Schnittstelle Hessen / Rheinland-Pfalz.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Users className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. 60s Mitarbeiter-Funnel</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bewerbungsprozesse ohne Anschreiben für maximale Bewerberzahlen unter Fachkräften,
                Logistikern und kaufmännischem Personal.
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
              Wirtschaftsstandort Limburg
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              ICE-Knotenpunkt, Handelszentrum & Limburger Kreuz
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Limburg an der Lahn nimmt mit dem <strong>ICE-Bahnhof Limburg Süd</strong> und dem{' '}
              <strong>Limburger Kreuz (A3 / B49 / B54)</strong> eine herausragende strategische
              Position an der Schnittstelle zwischen Hessen und Rheinland-Pfalz ein. Im
              Gewerbegebiet <strong>Dietkircher Höhe</strong> sowie in den Nachbargemeinden{' '}
              <strong>Diez</strong>, <strong>Elz</strong> und <strong>Hadamar</strong> floriert ein
              starker Handels-, Logistik- und Dienstleistungssektor.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte Anbindung über die vierspurige B49
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die ausgebaute <strong>Bundesstraße B49</strong> ist unser Wetzlarer Büro in rund
              25 Fahrminuten direkt bei Ihnen vor Ort in Limburg. Wir bieten Ihnen persönliche
              Betreuung ohne weite Wege im gesamten Landkreis Limburg-Weilburg.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Projekt: Nach einer kostenlosen Bedarfsanalyse
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
              Fragen & Antworten zu Webdesign in Limburg
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine professionelle Website in Limburg an der Lahn?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Limburger Handels- und Logistikbetriebe, Kanzleien und
                Arztpraxen transparente Festpreise nach einer kostenlosen Analyse Ihres
                Projektumfangs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine moderne Next.js Website in Limburg online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Limburg, Diez oder Elz?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, gerne. Über die vierspurige B49 erreichen wir Sie von unserem Wetzlarer Büro aus
                in rund 20 bis 25 Minuten direkt vor Ort.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie auch Lösungen für Kanzleien, Notare und Praxen in Limburg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln barrierefreie Websites mit 100% DSGVO-konformen Buchungs- und
                Kontaktstrecken für maximale Mandanten- und Patientengewinnung.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist mein fester Entwickler und Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel berät und entwickelt direkt ohne wechselnde
                Projektmanager.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Marktführerschaft für Limburg & das Lahntal sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Strategiegespräch direkt mit Inhaber
            Umutcan Emre Tezgel für Ihren Standort in Limburg und Umgebung.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Limburger Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <RegionalSilo citySlug="webdesign-limburg" locale={_locale} />
    </div>
  );
}
