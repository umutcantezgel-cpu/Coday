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
import { CountySilo } from '@/features/local-seo/ui/CountySilo';
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
  Package,
  Cpu,
  Wrench,
  Truck,
  MapPin,
  ChartBar,
  Star,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  Factory,
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
      title: 'Web Design Fulda District | B2B & SEO Agency · Coday',
      description:
        'Web development & web design for the Fulda district & East Hesse. High-performance platforms for logistics, crafts & industry. Fixed price.',
      keywords: [
        'Web Design Fulda District',
        'Web Agency Hünfeld Petersberg',
        'Website Creation Künzell Eichenzell',
        'Web Development East Hesse',
        'Coday Web Fulda',
      ],
      path: '/en/regionen/landkreis-fulda',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Landkreis Fulda | B2B & SEO Agentur · Coday',
    description:
      'Webentwicklung & Webdesign für den Landkreis Fulda & Osthessen. Performante Plattformen für Logistik, Handwerk & Industrie. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Landkreis Fulda',
      'Webagentur Hünfeld Petersberg',
      'Website erstellen Künzell Eichenzell',
      'Webentwicklung Osthessen',
      'Coday Web Fulda',
    ],
    path: '/de/regionen/landkreis-fulda',
    type: 'money',
  });
}

export default async function LandkreisFuldaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Fulda (Oberzentrum & Sonderstatusstadt)',
      link: '/webdesign-fulda',
      highlight: true,
      note: 'Barockstadt, ICE-Knotenpunkt & Industrie',
    },
    {
      name: 'Hünfeld (Konrad-Zuse-Stadt)',
      link: '/webdesign-fulda',
      highlight: true,
      note: 'IT-Zentrum, Justizdaten & Bundespolizei',
    },
    {
      name: 'Petersberg',
      link: '/webdesign-fulda',
      highlight: true,
      note: 'Handels-, Gewerbe- & Dienstleistungszentrum',
    },
    {
      name: 'Künzell',
      link: '/webdesign-fulda',
      highlight: true,
      note: 'B2B-Mittelstand & Tagungshotellerie',
    },
    {
      name: 'Eichenzell',
      link: '/webdesign-fulda',
      highlight: true,
      note: 'Industriepark Rhön & Logistik-Drehkreuz',
    },
    {
      name: 'Neuhof',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Kalisalz-Tradition & Gewerbeparks an der A66',
    },
    {
      name: 'Flieden',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Königreich Flieden & Mittelstand',
    },
    {
      name: 'Großenlüder',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Handwerk, Bau & Lüderaue',
    },
    {
      name: 'Eiterfeld',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Maschinenbau, Automation & Handwerk',
    },
    {
      name: 'Gersfeld (Rhön)',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Wasserkuppe, Tourismus & Reha-Zentren',
    },
    {
      name: 'Tann (Rhön)',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Luftkurort, Gastronomie & Handwerk',
    },
    {
      name: 'Hilders',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Rhön-Mittelzentrum & Urlaubsregion',
    },
    {
      name: 'Hofbieber',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Tourismus, Golf & mittelständisches Gewerbe',
    },
    {
      name: 'Kalbach',
      link: '/webdesign-fulda',
      highlight: false,
      note: 'Gewerbegebiet an der A7 / Rhön',
    },
  ];

  const pageUrl = `${BASE_URL}/${_locale}/regionen/landkreis-fulda`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization lives in the root layout; this graph only adds page nodes.
    '@graph': [
      getPyramidBreadcrumbs(2, { countySlug: 'landkreis-fulda' }, _locale),
      getWebPageSchema({
        url: pageUrl,
        name:
          _locale === 'en'
            ? 'Web Design Fulda District | B2B & SEO Agency · Coday'
            : 'Webdesign Landkreis Fulda | B2B & SEO Agentur · Coday',
        description:
          _locale === 'en'
            ? 'Web development & web design for the Fulda district & East Hesse. High-performance platforms for logistics, crafts & industry. Fixed price.'
            : 'Webentwicklung & Webdesign für den Landkreis Fulda & Osthessen. Performante Plattformen für Logistik, Handwerk & Industrie. Festpreis auf Anfrage.',
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      ...(getCountyHierarchySchema('landkreis-fulda', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website für Unternehmen im Landkreis Fulda?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Logistikunternehmen im Industriepark Rhön, Tech-Firmen in Hünfeld und Betriebe in Petersberg transparente Festpreise nach Bedarfsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform im Landkreis Fulda online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Fulda, Hünfeld, Petersberg oder Eichenzell?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5 und A7 sind wir von unserem Wetzlarer HQ in rund 60 Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie integrierte Recruiting-Strecken für Logistik- und Industrieunternehmen in Osthessen an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir integrieren 60-Sekunden-Express-Bewerbungsfunnels zur schnellen Gewinnung von Fachkräften, Kraftfahrern und Spezialisten auf allen Mobilgeräten.',
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
        badgeText="REGIONALER MASTER-HUB · LANDKREIS FULDA (OSTHESSEN)"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Landkreis Fulda"
        description="Ihre High-End B2B Webagentur für Fulda, Hünfeld, Eichenzell, Petersberg, Künzell und ganz Osthessen. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte Leads für Logistik, Maschinenbau, Handwerk und Industrie. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Landkreis Fulda"
        sourceTag="local_seo_landkreis_fulda"
        formHeading="Kostenlose Bedarfsanalyse für Landkreis Fulda"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Osthessen Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR LANDKREIS FULDA */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Landkreis Fulda
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
              Wirtschaftskraft Osthessen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Logistik, IT & Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Osthessens Logistikdrehscheiben und Maschinenbauer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Osthessen</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für B2B-Partner, Speditionen und globale Kunden.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende Hierarchien.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
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
              Warum Betriebe im Landkreis Fulda auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Landkreis Fulda)
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
                Maßgeschneiderte Webentwicklung für Logistik & Industrie im Landkreis Fulda
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler baue ich Ihre Webpräsenz für den gesamten Landkreis
                Fulda und Osthessen: Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x
                effizienter als traditionelle Agentur-Wasserköpfe.
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

      {/* 7. SERVICES BENTO SHOWCASE (FULDA-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Landkreis Fulda & Osthessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Von Logistik- und Industrie-Portalen bis zu IT- und Handwerks-Websites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Truck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Logistik-, Speditions- & Hub-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Leistungsstarke Plattformen für Logistiker und Frachtzentren im Industriepark Rhön
                in Eichenzell und am Autobahnknoten A7 / A66.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Cpu className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. IT-, Medizintechnik- & Software-Webdesign
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Next.js 15 Webapplikationen, Behörden-Portale und SaaS-Lösungen für Unternehmen in
                der Konrad-Zuse-Stadt Hünfeld.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Landkreis Fulda Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 14 Kommunen des
                Landkreises Fulda.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Handwerk, Bau & Rhön-Tourismus
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Moderne Plattformen mit 60-Sekunden-Express-Recruiting für Betriebe in Petersberg,
                Künzell, Neuhof, Flieden und Gersfeld.
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
              Wirtschaftsregion Landkreis Fulda & Osthessen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Barockstadt Fulda, Industriepark Rhön Eichenzell, Konrad-Zuse-Stadt Hünfeld
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Landkreis Fulda</strong> ist der wirtschaftliche und infrastrukturelle
              Herzschlag Osthessens. Er verbindet das dynamische Oberzentrum <strong>Fulda</strong>{' '}
              mit seiner barocken Pracht und industriellen Stärke mit dem gigantischen{' '}
              <strong>Industriepark Rhön in Eichenzell</strong> (Drehscheibe für bundesweite
              Logistik und Spedition), der traditionsreichen{' '}
              <strong>IT- und Behördenstadt Hünfeld</strong> (Konrad-Zuse-Stadt) sowie florierenden
              Gewerbezentren in <strong>Petersberg, Künzell und Neuhof</strong>. Ergänzt wird der
              Landkreis durch den UNESCO-Biosphärenreservat-Tourismus in{' '}
              <strong>Gersfeld, Tann und Hilders</strong>. Über die{' '}
              <strong>Bundesautobahnen A7 und A66</strong> sowie die <strong>B27</strong> ist die
              Region hervorragend erschlossen.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über A5 / A7
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A5 oder A7</strong> sind wir in rund 60 Fahrminuten direkt
              bei Ihnen vor Ort im gesamten Landkreis Fulda. Wir garantieren Ihnen persönliche
              Betreuung auf Augenhöhe ohne zeitraubende Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign im Landkreis Fulda
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website für Unternehmen im Landkreis Fulda?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Logistikunternehmen im Industriepark Rhön, Tech-Firmen in
                Hünfeld und Betriebe in Petersberg transparente Festpreise nach Bedarfsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform im Landkreis Fulda online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Fulda, Hünfeld, Petersberg oder Eichenzell?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5 und A7 sind wir von unserem Wetzlarer HQ in rund 60
                Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie integrierte Recruiting-Strecken für Logistik- und Industrieunternehmen in
                Osthessen an?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir integrieren 60-Sekunden-Express-Bewerbungsfunnels zur schnellen Gewinnung
                von Fachkräften, Kraftfahrern und Spezialisten auf allen Mobilgeräten.
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
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenklasse für Ihr Unternehmen im Landkreis Fulda sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort im Landkreis Fulda.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Erstgespräch für den Landkreis Fulda anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <CountySilo countySlug="landkreis-fulda" locale={_locale} />
    </div>
  );
}
