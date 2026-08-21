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
  CurrencyEur,
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
      title: 'Web Design Frankfurt | High-End Next.js Web Agency · Coday',
      description:
        'Enterprise web design in Frankfurt am Main. Next.js 15, <0.4s load time & B2B leads for FinTech, law firms & mid-market. Fixed price.',
      keywords: [
        'Web Design Frankfurt',
        'Web Agency Frankfurt am Main',
        'Next.js Agency Frankfurt',
        'Website Creation Frankfurt',
        'Coday Web Frankfurt',
      ],
      path: '/en/webdesign-frankfurt',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Frankfurt | High-End Next.js Webagentur · Coday',
    description:
      'Enterprise Webdesign in Frankfurt am Main. Next.js 15, <0.4s Ladezeit & B2B-Leads für FinTech, Kanzleien & Mittelstand. Verbindlicher Festpreis.',
    keywords: [
      'Webdesign Frankfurt',
      'Webagentur Frankfurt am Main',
      'Next.js Agentur Frankfurt',
      'Website erstellen Frankfurt',
      'Coday Web Frankfurt',
    ],
    path: '/de/webdesign-frankfurt',
    type: 'money',
  });
}

export default async function WebdesignFrankfurtPage({
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
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-frankfurt' }, _locale),
      ...(getCityHierarchySchema('webdesign-frankfurt', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine Enterprise-Website in Frankfurt am Main?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Frankfurter FinTechs, Kanzleien im Westend und B2B-Unternehmen transparente Festpreise nach einer detaillierten Scope-Definition.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform in Frankfurt einsatzbereit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und über globale Edge-Server live.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für persönliche Meetings ins Bankenviertel oder Westend?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5 sind wir in unter 40 Minuten direkt bei Ihnen vor Ort in Frankfurt, am Westhafen oder in Gateway Gardens.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie garantiert Coday Compliance & Datensicherheit für Frankfurter Kanzleien?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch entkoppelte Headless-Architekturen ohne SQL-Angriffsflächen und Hosting in deutschen ISO-27001 zertifizierten Rechenzentren.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer leitet die technische Entwicklung meines Projekts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel entwickelt Ihre Webapplikation persönlich als erfahrener Senior Engineer.',
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
        badgeText="ENTERPRISE NEXT.JS WEBAGENTUR FRANKFURT AM MAIN"
        headline="Webdesign & Enterprise Next.js Entwicklung in"
        headlineGradient="Frankfurt am Main"
        description="Als spezialisierte High-Performance Webagentur für Frankfurt am Main entwickeln wir enterprise-fähige Next.js Entwicklung und konversionsstarke B2B-Websites für FinTechs, Kanzleien, Family Offices und Marktführer. Subsekundäre Ladezeiten, 100/100 Core Web Vitals und garantierte Festpreise."
        cityName="Frankfurt am Main"
        sourceTag="local_seo_frankfurt"
        formHeading="Kostenlose Bedarfsanalyse für Frankfurt"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Frankfurter Referenzen ansehen"
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
              Performance & Skalierbarkeit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Frankfurter Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Enterprise-Architektur für FinTechs, Kanzleien und anspruchsvolle B2B-Marktführer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Frankfurt</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für vielbeschäftigte B2B-Entscheider und Investoren im
                Bankenviertel.
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
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende
                Agentur-Hierarchien.
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
              Next.js Entwicklung: Warum Frankfurter Unternehmen auf moderne B2B-Websites setzen
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
                    Permanente Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Banken-Grade (Keine angreifbare Datenbank)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Frankfurt)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Account Manager
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Kontakt mit dem Lead-Architekten
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
                Enterprise Next.js Webentwicklung für den Finanzplatz Frankfurt
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Für
                Frankfurter FinTechs, Kanzleien im Westend und B2B-Unternehmen konzipiere und
                programmiere ich skalierbare Webplattformen mit extremen Ladezeiten unter 0,4
                Sekunden, höchster Datensicherheit und messbarem Conversion-Impact.
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

      {/* 6. SERVICES BENTO SHOWCASE (FRANKFURT-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Frankfurt & das Rhein-Main-Gebiet
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom FinTech-Kundenportal bis zur Wirtschaftskanzlei-Corporate-Website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <CurrencyEur className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. FinTech & Finance Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für FinTechs, Family Offices und M&A-Boutiquen im Bankenviertel.
                Entkoppelte Headless-Sicherheit, strikte DSGVO-Compliance und reibungslose
                Schnittstellen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Scales className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Wirtschaftskanzlei & Beratung Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Repräsentative, minimalistische Webdesigns für Kanzleien und Managementberatungen im
                Westend zur Stärkung von Reputation und Mandantengewinnung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Lightning className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. DE-CIX Edge-Performance & Scale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre weltweite Ladezeiten durch globale Edge-Verteilung mit unter 20ms
                Time-to-First-Byte am Internetknoten Frankfurt.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Local SEO & Rhein-Main Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenplatzierungen in Frankfurt am Main,
                Eschborn, Bad Homburg, Oberursel und Offenbach.
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
              Wirtschafts- & Finanzmetropole Frankfurt am Main
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Bankenviertel, Westend, Westhafen & DE-CIX Internetknoten
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Frankfurt am Main ist das pulsierende Herz der europäischen Finanzwelt und mit dem
              <strong>DE-CIX</strong> der weltgrößte Datenknotenpunkt. Vom ikonischen{' '}
              <strong>Bankenviertel</strong> über das renommierte <strong>Westend</strong> und den
              modernen <strong>Westhafen</strong> bis zum <strong>Industriepark Höchst</strong> und{' '}
              <strong>Gateway Gardens</strong> am Flughafen verlangen Unternehmen nach absolut
              kompromissloser digitaler Performance, Zuverlässigkeit und Sicherheit.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte A5-Verbindung von unserem Wetzlarer HQ
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesautobahn A5</strong> ist unser Büro in weniger als 40
              Fahrminuten direkt bei Ihnen vor Ort in Frankfurt. Wir bieten Ihnen den entscheidenden
              Vorteil eines persönlichen Ansprechpartners und maximaler Flexibilität im gesamten
              Rhein-Main-Gebiet.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Enterprise-Projekt: Nach einer kostenlosen
              Bedarfsanalyse erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten
              oder teuren Agentur-Overhead.
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
              Fragen & Antworten zu Webdesign in Frankfurt
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine Enterprise-Website in Frankfurt am Main?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Frankfurter FinTechs, Kanzleien im Westend und B2B-Unternehmen
                transparente Festpreise nach einer detaillierten Scope-Definition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform in Frankfurt einsatzbereit?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und über globale Edge-Server live.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für persönliche Meetings ins Bankenviertel oder Westend?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5 sind wir in unter 40 Minuten direkt bei Ihnen vor Ort in
                Frankfurt, am Westhafen oder in Gateway Gardens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie garantiert Coday Compliance & Datensicherheit für Frankfurter Kanzleien?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Durch entkoppelte Headless-Architekturen ohne SQL-Angriffsflächen und Hosting in
                deutschen ISO-27001 zertifizierten Rechenzentren.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer leitet die technische Entwicklung meines Projekts?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel entwickelt Ihre Webapplikation persönlich als erfahrener
                Senior Engineer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenposition für Ihr Frankfurter Unternehmen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Strategiegespräch direkt mit Inhaber
            Umutcan Emre Tezgel für Ihren Standort in Frankfurt am Main.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Frankfurter Strategiegespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
