import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
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
  Flask,
  Factory,
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
      title: 'Web Design Marburg-Biedenkopf District | Agency · Coday',
      description:
        'Web design in the Marburg-Biedenkopf district. High-performance websites for pharma, crafts & SME in Marburg, Biedenkopf & Gladenbach. Fixed price.',
      keywords: [
        'Web Design Marburg-Biedenkopf District',
        'Web Agency Marburg Biedenkopf',
        'Website Creation Biedenkopf Gladenbach',
        'Web Development Central Hesse',
        'Coday Web Marburg',
      ],
      path: '/en/regionen/landkreis-marburg-biedenkopf',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Landkreis Marburg-Biedenkopf | Agentur · Coday',
    description:
      'Webdesign im Landkreis Marburg-Biedenkopf. Performante Websites für Pharma, Handwerk & Mittelstand in Marburg, Biedenkopf & Gladenbach. Festpreis.',
    keywords: [
      'Webdesign Landkreis Marburg-Biedenkopf',
      'Webagentur Marburg Biedenkopf',
      'Website erstellen Biedenkopf Gladenbach',
      'Webentwicklung Mittelhessen',
      'Coday Web Marburg',
    ],
    path: '/de/regionen/landkreis-marburg-biedenkopf',
    type: 'money',
  });
}

export default async function LandkreisMarburgBiedenkopfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Marburg (Universitätsstadt)',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Behringwerke, Biotech & Uni-Klinikum',
    },
    {
      name: 'Stadtallendorf',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Industrie-Schwergewicht & Süßwaren (Ferrero)',
    },
    {
      name: 'Biedenkopf',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Hinterland-Zentrum & Formenbau',
    },
    {
      name: 'Gladenbach',
      link: '/webdesign-marburg',
      highlight: true,
      note: 'Gewerbe, Handwerk & Maschinenbau',
    },
    {
      name: 'Kirchhain',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Handel, Handwerk & Wohratal-Tor',
    },
    {
      name: 'Neustadt (Hessen)',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Gewerbeparks & Ostkreis-Hub',
    },
    {
      name: 'Wetter (Hessen)',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Grenzgangstadt, Gewerbe & Handwerk',
    },
    {
      name: 'Dautphetal',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Starker Formen- & Werkzeugbau',
    },
    {
      name: 'Cölbe',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Solar-Pionier, Gewerbe & Pharma-Nähe',
    },
    {
      name: 'Ebsdorfergrund',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Handwerk, Bau & erneuerbare Energien',
    },
    {
      name: 'Lahntal',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Dienstleistung, Handwerk & Wohnen',
    },
    {
      name: 'Steffenberg',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Mittelständische Industrie & Handwerk',
    },
    {
      name: 'Weimar (Lahn)',
      link: '/webdesign-marburg',
      highlight: false,
      note: 'Kiesindustrie, Gewerbe & B3-Achse',
    },
  ];

  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/regionen/landkreis-marburg-biedenkopf`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization already ships from the root layout, so this graph starts at the breadcrumbs.
    '@graph': [
      getPyramidBreadcrumbs(2, { countySlug: 'landkreis-marburg-biedenkopf' }, _locale),
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Marburg-Biedenkopf District | Agency · Coday'
          : 'Webdesign Landkreis Marburg-Biedenkopf | Agentur · Coday',
        description: isEn
          ? 'Web design in the Marburg-Biedenkopf district. High-performance websites for pharma, crafts & SME in Marburg, Biedenkopf & Gladenbach. Fixed price.'
          : 'Webdesign im Landkreis Marburg-Biedenkopf. Performante Websites für Pharma, Handwerk & Mittelstand in Marburg, Biedenkopf & Gladenbach. Festpreis.',
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      ...(getCountyHierarchySchema('landkreis-marburg-biedenkopf', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website im Landkreis Marburg-Biedenkopf?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Biotech-Unternehmen in Marburg, Industriebetriebe in Stadtallendorf und den Werkzeugbau im Hinterland transparente Festpreise nach technischer Leistungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform in Marburg-Biedenkopf online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Marburg, Biedenkopf, Gladenbach oder Stadtallendorf?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die B3 oder B255 sind wir von unserem Wetzlarer HQ in rund 30 Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie GMP- und datenschutzkonforme Lösungen für Pharma- und Laborunternehmen am Standort Behringwerke?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln hochsichere, DSGVO-konforme Headless-Architekturen mit Next.js und zertifiziertem EU-Hosting.',
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
        badgeText="REGIONALER MASTER-HUB · LANDKREIS MARBURG-BIEDENKOPF"
        headline="Webdesign & Next.js Entwicklung in"
        headlineGradient="Marburg-Biedenkopf"
        description="Ihre lokale High-End Webagentur für Marburg, Biedenkopf, Stadtallendorf, Gladenbach und den gesamten Landkreis. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte B2B-Leads für Pharma, Industrie und Handwerk. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Landkreis Marburg-Biedenkopf"
        sourceTag="local_seo_marburg_biedenkopf"
        formHeading="Kostenlose Bedarfsanalyse für Marburg-Biedenkopf"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Marburger Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR LANDKREIS MARBURG-BIEDENKOPF */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Landkreis Marburg-Biedenkopf
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
              Wirtschaftskraft Marburg-Biedenkopf
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Pharma, Industrie & Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Spitzenforschung, Großindustrie und
              Hinterland-Werkzeugbau.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Landkreis</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für globale Partner, Patienten und mobile Fachkräfte.
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

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende Hierarchien.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 transition-all group">
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
              Warum Unternehmen in Marburg-Biedenkopf auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Landkreis Marburg-Biedenkopf)
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
                Maßgeschneiderte Webentwicklung für Biotech, Industrie & Hinterland in
                Marburg-Biedenkopf
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für den
                gesamten Landkreis Marburg-Biedenkopf: Technisch perfekt, ausdrucksstark und
                wirtschaftlich 5–10x effizienter als traditionelle Agentur-Wasserköpfe.
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

      {/* 7. SERVICES BENTO SHOWCASE (MARBURG-BIEDENKOPF-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Landkreis Marburg-Biedenkopf
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Von Pharma- & Biotech-Portalen bis zum Formenbau im Hinterland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Flask className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Pharma-, Biotech- & Labor-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                DSGVO-konforme, hochsichere Webplattformen für Unternehmen am Standort Behringwerke
                Marburg und Life-Science-Dienstleister.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Factory className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Schwerindustrie & Werkzeugbau
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Skalierbare Produktkataloge und B2B-Plattformen für Stadtallendorf und den präzisen
                Formenbau im Hessischen Hinterland (Biedenkopf, Dautphetal).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Marburg-Biedenkopf Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 13 Kommunen des
                Landkreises Marburg-Biedenkopf.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Handwerk, Bau & Mittelstand
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-starke Websites mit 60-Sekunden-Express-Recruiting für Betriebe in
                Gladenbach, Kirchhain, Lahntal und Ebsdorfergrund.
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
              Wirtschaftsregion Landkreis Marburg-Biedenkopf
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Universitätsstadt Marburg, Behringwerke, Industrie in Stadtallendorf & Hinterland
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Landkreis Marburg-Biedenkopf</strong> ist einer der forschungs- und
              industriestärksten Standorte Hessens. Er vereint weltweite Spitzenforschung am
              Biopharmastandort <strong>Behringwerke Marburg</strong> (CSL Behring, GSK, BioNTech)
              mit global agierender Industrie in <strong>Stadtallendorf</strong> (Ferrero, Fritz
              Winter) sowie international führendem Werkzeug- und Formenbau im{' '}
              <strong>Hessischen Hinterland</strong>
              rund um <strong>Biedenkopf, Dautphetal und Gladenbach</strong>. Ergänzt wird die
              Region durch starkes Handwerk in{' '}
              <strong>Kirchhain, Wetter und im Ebsdorfergrund</strong>. Über die
              <strong>Bundesstraßen B3, B62, B255</strong> und die <strong>A49</strong> ist der
              Landkreis hervorragend angebunden.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über B3 / B255
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesstraßen B3 oder B255</strong> sind wir in rund 30 Fahrminuten
              direkt bei Ihnen vor Ort im gesamten Landkreis Marburg-Biedenkopf. Wir garantieren
              Ihnen persönliche Betreuung auf Augenhöhe ohne zeitraubende Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign in Marburg-Biedenkopf
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website im Landkreis Marburg-Biedenkopf?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Biotech-Unternehmen in Marburg, Industriebetriebe in
                Stadtallendorf und den Werkzeugbau im Hinterland transparente Festpreise nach
                technischer Leistungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform in Marburg-Biedenkopf online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Marburg, Biedenkopf, Gladenbach oder
                Stadtallendorf?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die B3 oder B255 sind wir von unserem Wetzlarer HQ in rund 30
                Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie GMP- und datenschutzkonforme Lösungen für Pharma- und Laborunternehmen am
                Standort Behringwerke?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln hochsichere, DSGVO-konforme Headless-Architekturen mit Next.js
                und zertifiziertem EU-Hosting.
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
        cityName="Landkreis Marburg-Biedenkopf"
        sourceTag="local_seo_landkreis_marburg_biedenkopf_bottom"
      />

      <CountySilo countySlug="landkreis-marburg-biedenkopf" locale={_locale} />
    </div>
  );
}
