import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import {
  getCountyHierarchySchema,
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
  GearSix,
  Wrench,
  Eye,
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
      title: 'Web Design Lahn-Dill District | Regional Web Agency · Coday',
      description:
        'Your local web agency for the Lahn-Dill district. High-performance websites & SEO for SME & trade in Wetzlar, Herborn & Dillenburg. Fixed prices.',
      keywords: [
        'Web Design Lahn-Dill District',
        'Web Agency Lahn-Dill',
        'Website Creation Wetzlar Herborn Dillenburg',
        'Web Development Hesse',
        'Coday Web Lahn-Dill',
      ],
      path: '/en/regionen/landkreis-lahn-dill',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Lahn-Dill-Kreis | Regionale Webagentur · Coday',
    description:
      'Ihre lokale Webagentur für den Lahn-Dill-Kreis. High-Performance Websites & SEO für Mittelstand & Handwerk in Wetzlar, Herborn & Dillenburg. Festpreise.',
    keywords: [
      'Webdesign Lahn-Dill-Kreis',
      'Webagentur Lahn-Dill',
      'Website erstellen Wetzlar Herborn Dillenburg',
      'Webentwicklung Mittelhessen',
      'Coday Web Lahn-Dill',
    ],
    path: '/de/regionen/landkreis-lahn-dill',
    type: 'money',
  });
}

export default async function LandkreisLahnDillPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Wetzlar (Kreisstadt & HQ)',
      link: '/webdesign-agentur-wetzlar',
      highlight: true,
      note: 'Optik-, Photonik- & Sensorikzentrum',
    },
    {
      name: 'Herborn',
      link: '/webdesign-herborn',
      highlight: true,
      note: 'Schaltschrankbau, Hightech & B45',
    },
    {
      name: 'Dillenburg',
      link: '/webdesign-dillenburg',
      highlight: true,
      note: 'Kaltwalzwerke, Stahl & Werkzeugbau',
    },
    {
      name: 'Haiger',
      link: '/webdesign-dillenburg',
      highlight: false,
      note: 'Schweißtechnik & Maschinenbau',
    },
    {
      name: 'Braunfels',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Kurstadt, Kliniken & Gastgewerbe',
    },
    {
      name: 'Solms',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Präzisionsfertigung & Handwerk',
    },
    {
      name: 'Aßlar',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Vakuumtechnologie & Zerspanung',
    },
    {
      name: 'Ehringshausen',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Industrie, Medtech & Logistik',
    },
    {
      name: 'Sinn',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Metallverarbeitung & Gewerbe',
    },
    {
      name: 'Mittenaar',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Gewerbe & Fertigungstechnik',
    },
    {
      name: 'Dietzhölztal',
      link: '/webdesign-dillenburg',
      highlight: false,
      note: 'Gusstechnik & Industrie',
    },
    {
      name: 'Eschenburg',
      link: '/webdesign-dillenburg',
      highlight: false,
      note: 'Kunststoff & Metallverarbeitung',
    },
    {
      name: 'Lahnau',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Handwerk & B2B-Dienstleister',
    },
    {
      name: 'Hüttenberg',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Handwerksbetriebe & Baugewerbe',
    },
    {
      name: 'Schöffengrund',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Handwerk & Dienstleistungen',
    },
    {
      name: 'Waldsolms',
      link: '/webdesign-agentur-wetzlar',
      highlight: false,
      note: 'Handwerk, Natur & Tourismus',
    },
    {
      name: 'Greifenstein',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Tourismus, Handwerk & Gewerbe',
    },
    {
      name: 'Driedorf',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Handwerk & Westerwald-Gewerbe',
    },
    {
      name: 'Breitscheid',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Tonindustrie, Luftfahrt & Gewerbe',
    },
    {
      name: 'Bischoffen',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Aartalsee-Tourismus & Handwerk',
    },
    {
      name: 'Siegbach',
      link: '/webdesign-herborn',
      highlight: false,
      note: 'Handwerk & lokale Betriebe',
    },
  ];

  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(2, { countySlug: 'landkreis-lahn-dill' }, _locale),
      ...(getCountyHierarchySchema('landkreis-lahn-dill', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine neue Website im Lahn-Dill-Kreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und verbindlich als Festpreis auf Anfrage. Durch unsere schlanken Next.js Architekturen und direkte Inhaber-Realisierung bieten wir maximale Kosteneffizienz bei höchster technischer Performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Website im Lahn-Dill-Kreis online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für ein Beratungsgespräch direkt zu uns in den Betrieb?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, selbstverständlich. Da Coday seinen Sitz direkt in Wetzlar hat, sind wir in wenigen Minuten bei Ihnen vor Ort – ob in Herborn, Dillenburg, Haiger, Braunfels oder Ehringshausen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites alle DSGVO- und Sicherheitsstandards?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Durch den Einsatz moderner Headless-Architekturen (Next.js & Supabase) gibt es keine offenen PHP- oder WordPress-Sicherheitslücken. Alle Daten werden DSGVO-konform in ISO-zertifizierten deutschen Rechenzentren gehostet.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser fester Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel persönlich mit direktem 24h-Support.',
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
        badgeText="REGIONALER MASTER-HUB · LAHN-DILL-KREIS"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Lahn-Dill-Kreis"
        description="Ihre lokale High-End Webagentur mit Sitz in Wetzlar. Maßgeschneiderte Next.js Websites, top PageSpeed unter 500ms und automatisierte B2B-Leads für Industrie, Handwerk und Mittelstand im gesamten Landkreis. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Lahn-Dill-Kreis"
        sourceTag="local_seo_lahn_dill"
        formHeading="Kostenlose Bedarfsanalyse für Lahn-Dill"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Lahn-Dill Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR LAHN-DILL-KREIS */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Lahn-Dill-Kreis
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
                    <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-base">
                      {k.name}
                    </h3>
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
              Wirtschaftskraft Lahn-Dill
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Unternehmen an Lahn & Dill
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Optik, Maschinenbau, Werkzeugbau und Handwerk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Landkreis</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für B2B-Kunden, Einkäufer und mobile Nutzer.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne zeitraubende Hierarchien.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">5-10x</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Kosteneffizienter</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Günstiger als traditionelle Großagenturen durch automatisierte
                KI-Engineering-Workflows.
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
              Warum Unternehmen im Lahn-Dill-Kreis auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Lahn-Dill-Kreis)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Account Manager
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt vor Ort in Wetzlar
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
                Heimvorteil Lahn-Dill
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Echtes Handwerk statt Agentur-Overhead für den Lahn-Dill-Kreis
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für den
                gesamten Lahn-Dill-Kreis: Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x
                effizienter als traditionelle Agentur-Wasserköpfe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt in Wetzlar</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Voller Quellcode-Besitz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">5-10x günstiger als Großagenturen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICES BENTO SHOWCASE (LAHN-DILL-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Lahn-Dill-Kreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Optik-Showcase bis zur Werkzeugbau- & Handwerks-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Eye className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Optik- & Photonik-Portale (Wetzlar)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Präzisionswebdesign für Weltmarktführer und Spezialisten der Optik-, Feinmechanik-
                und Sensorikbranche in der Kreisstadt Wetzlar.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <GearSix className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Schaltschrank- & Werkzeugbau (Dilltal)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Performante B2B-Plattformen mit digitalen Produktkatalogen für Herborn, Dillenburg,
                Haiger und Eschenburg entlang der A45.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Lahn-Dill Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in allen 23 Kommunen des
                Lahn-Dill-Kreises.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Handwerks- & Bauwirtschafts-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-starke Webauftritte mit 60-Sekunden-Express-Bewerbungsfunnels für
                Meisterbetriebe an Lahn und Dill.
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
              Wirtschaftsregion Lahn-Dill
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Optikstadt Wetzlar, Dilltal-Industrie & Handwerk an der Lahn
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Lahn-Dill-Kreis</strong> vereint weltweit anerkannte Spitzentechnologie in
              der
              <strong>Kreisstadt Wetzlar</strong> (Optik, Sensorik, Medizintechnik) mit geballter
              Industriekompetenz im <strong>Dilltal</strong> (Herborn, Dillenburg, Haiger,
              Dietzhölztal) und einer traditionsreichen Handwerkskultur entlang der Lahn (Braunfels,
              Solms, Aßlar, Hüttenberg). Mit der{' '}
              <strong>Bundesautobahn A45 (Sauerlandlinie)</strong> und der{' '}
              <strong>Bundesstraße B49</strong>
              verfügt der Kreis über eine erstklassige überregionale Verkehrsanbindung.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Lokale Nähe & persönliche Betreuung
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Unser Hauptsitz liegt direkt in <strong>Wetzlar</strong>. Das bedeutet für Sie:
              Maximale Nähe, persönliche Vor-Ort-Termine innerhalb weniger Minuten und direkte
              Kommunikation ohne zeitraubende Agentur-Wasserköpfe.
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
              Fragen & Antworten zu Webdesign im Lahn-Dill-Kreis
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine neue Website im Lahn-Dill-Kreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und
                verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-Workflows sind wir
                5–10x günstiger als traditionelle Großagenturen bei signifikant höherer Performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Website im Lahn-Dill-Kreis online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für ein Beratungsgespräch direkt zu uns in den Betrieb?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, selbstverständlich. Da Coday seinen Sitz direkt in Wetzlar hat, sind wir in
                wenigen Minuten bei Ihnen vor Ort – ob in Herborn, Dillenburg, Haiger, Braunfels
                oder Ehringshausen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites alle DSGVO- und Sicherheitsstandards?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Durch den Einsatz moderner Headless-Architekturen (Next.js & Supabase) gibt es
                keine offenen PHP- oder WordPress-Sicherheitslücken. Alle Daten werden DSGVO-konform
                in ISO-zertifizierten deutschen Rechenzentren gehostet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser fester Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel persönlich mit direktem 24h-Support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den digitalen Vorsprung im Lahn-Dill-Kreis?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel in Wetzlar.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Kostenloses Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
