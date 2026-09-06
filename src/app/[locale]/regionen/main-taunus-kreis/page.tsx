import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getWebPageSchema } from '@/lib/schema';
import {
  getCountyHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
import LocalConversionBlock from '@/features/local-seo/ui/LocalConversionBlock';
import { CountySilo } from '@/features/local-seo/ui/CountySilo';
import { Link } from '@/i18n/navigation';
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
  CurrencyCircleDollar,
  Briefcase,
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
      title: 'Web Design Main-Taunus District | B2B Agency MTK · Coday',
      description:
        'Web design in Main-Taunus district: Next.js websites for Hofheim, Eschborn, Bad Soden & Kelkheim. Fast load times & fixed pricing.',
      keywords: [
        'Web Design Main-Taunus District',
        'Web Agency Eschborn Hofheim',
        'Website Creation Bad Soden Kelkheim',
        'Web Development MTK',
        'Coday Web Main-Taunus',
      ],
      path: '/en/regionen/main-taunus-kreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Main-Taunus-Kreis | B2B Agentur MTK · Coday',
    description:
      'Webdesign im Main-Taunus-Kreis: Next.js Websites für Hofheim, Eschborn, Bad Soden & Kelkheim. Schnelle Ladezeiten & feste Preise.',
    keywords: [
      'Webdesign Main-Taunus-Kreis',
      'Webagentur Eschborn Hofheim',
      'Website erstellen Bad Soden Kelkheim',
      'Webentwicklung MTK',
      'Coday Web Main-Taunus',
    ],
    path: '/de/regionen/main-taunus-kreis',
    type: 'money',
  });
}

export default async function MainTaunusKreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Eschborn',
      link: '/webdesign-hofheim',
      highlight: true,
      note: 'Finanzplatz, IT-Hub & Großkonzerne',
    },
    {
      name: 'Hofheim am Taunus (Kreisstadt)',
      link: '/webdesign-hofheim',
      highlight: true,
      note: 'Wirtschafts- & Verwaltungszentrum',
    },
    {
      name: 'Bad Soden am Taunus',
      link: '/webdesign-hofheim',
      highlight: true,
      note: 'Spitzenkaufkraft & Privatpraxen',
    },
    {
      name: 'Kelkheim (Taunus)',
      link: '/webdesign-hofheim',
      highlight: true,
      note: 'Möbelstadt & B2B-Mittelstand',
    },
    {
      name: 'Schwalbach am Taunus',
      link: '/webdesign-hofheim',
      highlight: true,
      note: 'Tech-Hub & Deutschland-Zentralen',
    },
    {
      name: 'Flörsheim am Main',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Logistik, Chemie & Hafen',
    },
    {
      name: 'Hattersheim am Main',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Rechenzentren & B2B-Gewerbe',
    },
    {
      name: 'Kriftel',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Obstgarten des Taunus & Handwerk',
    },
    {
      name: 'Hochheim am Main',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Rheingau-Weinbau & Dienstleistung',
    },
    {
      name: 'Eppstein',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Burgstadt, Natur & Gewerbe',
    },
    {
      name: 'Liederbach am Taunus',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Wohnen & Dienstleistungen',
    },
    {
      name: 'Sulzbach (Taunus)',
      link: '/webdesign-hofheim',
      highlight: false,
      note: 'Main-Taunus-Zentrum (MTZ) & Handel',
    },
  ];

  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/regionen/main-taunus-kreis`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization node is provided by the root layout for every page.
    '@graph': [
      getPyramidBreadcrumbs(2, { countySlug: 'main-taunus-kreis' }, _locale),
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Main-Taunus District | B2B Agency MTK · Coday'
          : 'Webdesign Main-Taunus-Kreis | B2B Agentur MTK · Coday',
        description: isEn
          ? 'Web design in Main-Taunus district: Next.js websites for Hofheim, Eschborn, Bad Soden & Kelkheim. Fast load times & fixed pricing.'
          : 'Webdesign im Main-Taunus-Kreis: Next.js Websites für Hofheim, Eschborn, Bad Soden & Kelkheim. Schnelle Ladezeiten & feste Preise.',
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      ...(getCountyHierarchySchema('main-taunus-kreis', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine High-End Website im Main-Taunus-Kreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Finanzberater in Eschborn, Privatpraxen in Bad Soden und Unternehmen in Hofheim transparente Festpreise nach technischer Leistungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform im MTK online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für ein persönliches Beratungsgespräch direkt zu uns nach Eschborn, Hofheim oder Bad Soden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, absolut. Über die A5 und A66 sind wir von unserem Wetzlarer HQ in rund 35 Minuten direkt bei Ihnen vor Ort im Unternehmen oder Büro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Entwickeln Sie barrierefreie und hochsichere Portale für Kanzleien und Privatpraxen im Taunus?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir programmieren barrierefreie (BITV 2.0 / WCAG) und DSGVO-konforme Patienten- und Mandantenportale mit exklusiver UX.',
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
        badgeText="REGIONALER MASTER-HUB · MAIN-TAUNUS-KREIS (MTK)"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Main-Taunus-Kreis"
        description="Ihre B2B High-End Webagentur für Hofheim, Eschborn, Bad Soden, Kelkheim und den gesamten MTK. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte B2B-Leads für Finanzdienstleister, Tech-Unternehmen und anspruchsvollen Mittelstand. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Main-Taunus-Kreis"
        sourceTag="local_seo_main_taunus_kreis"
        formHeading="Kostenlose Bedarfsanalyse für Main-Taunus-Kreis"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="MTK Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR MAIN-TAUNUS-KREIS */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Main-Taunus-Kreis
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
                    <p className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-base">
                      {k.name}
                    </p>
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
              Wirtschaftskraft MTK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für B2B, Finance & Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für DAX-Umfeld, Tech-Zentralen und dynamischen Mittelstand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im MTK</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für anspruchsvolle B2B-Entscheider und mobile Nutzer.
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
                Transparente Festpreis-Garantie ohne versteckte Nachforderungen oder unkalkulierbare
                Stundensätze.
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
              Warum B2B-Unternehmen im MTK auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Main-Taunus-Kreis)
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
                Maßgeschneiderte Webentwicklung für Finance, Tech & High-End Praxen im MTK
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler baue ich Ihre Webpräsenz für den gesamten MTK:
                Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x effizienter als
                traditionelle Agentur-Wasserköpfe.
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
                  <span className="text-slate-700">Festpreis & volle Kostensicherheit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICES BENTO SHOWCASE (MTK-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Main-Taunus-Kreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Finance- & Tech-Portal bis zur Praxis- & Mittelstand-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <CurrencyCircleDollar className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Finanz-, Consulting- & Corporate-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochsichere, diskrete und extrem performante Webarchitekturen für Unternehmen im
                Finanzplatz Eschborn und Schwalbach.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Privatpraxen & Kanzlei-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Barrierefreie Patientenportale und Kanzlei-Websites für anspruchsvolle Mandanten in
                Bad Soden am Taunus und Hofheim.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Main-Taunus-Kreis Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 12 Kommunen des
                Main-Taunus-Kreises.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Handwerk, Möbelbau & B2B-Mittelstand
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-starke Websites mit 60-Sekunden-Express-Recruiting für Betriebe in
                Kelkheim, Kriftel, Flörsheim und Hattersheim.
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
              Wirtschaftsregion Main-Taunus-Kreis
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Finanzplatz Eschborn, Kreisstadt Hofheim, Spitzenkaufkraft Bad Soden
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Main-Taunus-Kreis (MTK)</strong> ist das wirtschaftliche Kraftzentrum im
              direkten Westen Frankfurts. Er beherbergt führende Finanz- und IT-Konzerne in{' '}
              <strong>Eschborn</strong>
              (Deutsche Börse Umfeld, SAP, EY), globale Tech-Zentralen in{' '}
              <strong>Schwalbach</strong>
              (Samsung, P&G), Spitzenkaufkraft und hochspezialisierte Praxen in{' '}
              <strong>Bad Soden und Hofheim</strong>, traditionsreichen Möbelbau in{' '}
              <strong>Kelkheim</strong> sowie renommierten Weinbau in
              <strong>Hochheim am Main</strong>. Über die <strong>Autobahnen A66 und A3</strong>{' '}
              sowie das Frankfurter Kreuz ist der MTK ideal vernetzt.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über A5 / A66
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesautobahn A5 und A66</strong> sind wir in rund 35 Fahrminuten
              direkt bei Ihnen vor Ort im gesamten Main-Taunus-Kreis. Wir garantieren Ihnen
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

      {/* 9. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zu Webdesign im Main-Taunus-Kreis
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine High-End Website im Main-Taunus-Kreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Finanzberater in Eschborn, Privatpraxen in Bad Soden und
                Unternehmen in Hofheim transparente Festpreise nach technischer Leistungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform im MTK online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für ein persönliches Beratungsgespräch direkt zu uns nach Eschborn,
                Hofheim oder Bad Soden?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, absolut. Über die A5 und A66 sind wir von unserem Wetzlarer HQ in rund 35
                Minuten direkt bei Ihnen vor Ort im Unternehmen oder Büro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Entwickeln Sie barrierefreie und hochsichere Portale für Kanzleien und Privatpraxen
                im Taunus?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir programmieren barrierefreie (BITV 2.0 / WCAG) und DSGVO-konforme Patienten-
                und Mandantenportale mit exklusiver UX.
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

      {/* 10. BOTTOM CTA */}
      <LocalConversionBlock
        cityName="Main-Taunus-Kreis"
        sourceTag="local_seo_main_taunus_kreis_bottom"
      />

      <CountySilo countySlug="main-taunus-kreis" locale={_locale} />
    </div>
  );
}
