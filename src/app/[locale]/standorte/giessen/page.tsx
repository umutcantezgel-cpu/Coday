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
  ChartBar,
  Star,
  MapPin,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  Cpu,
  GraduationCap,
  Briefcase,
  Compass,
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
      title: 'Web Design Giessen Location Hub | Next.js Agency & SEO · Coday',
      description:
        'High-end web design and Next.js development for Giessen. Sub-500ms load times, BITV 2.0 accessibility, measurable B2B leads & guaranteed fixed pricing.',
      keywords: [
        'Web Design Giessen',
        'Web Agency Giessen',
        'Website Creation Giessen',
        'Next.js Development Giessen',
        'Coday Web Giessen Hub',
      ],
      path: '/en/webdesign-giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Standort Gießen | Next.js Agentur & Headless CMS · Coday',
    description:
      'Offizieller Standort-Hub Gießen: Next.js 15 Webentwicklung, subsekundäre Ladezeiten, BITV 2.0 Barrierefreiheit und verbindliche Festpreise für Praxen, Startups & Mittelstand.',
    keywords: [
      'Webdesign Gießen',
      'Webagentur Gießen',
      'Website erstellen Gießen',
      'Next.js Agentur Gießen',
      'Coday Standort Gießen',
    ],
    path: '/de/webdesign-giessen',
    type: 'money',
  });
}

export default async function StandorteGiessenPage({
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
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-giessen' }, _locale),
      ...(getCityHierarchySchema('webdesign-giessen', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was zeichnet den Standort Gießen von Coday aus?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Als inhabergeführte Webagentur mit regionalem Schwerpunkt Mittelhessen bieten wir Unternehmen in Gießen direkte Ansprechpartner vor Ort, modernste Next.js 15 Technologie und kompromisslose Performance ohne Agentur-Overhead.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine professionelle Website für Gießener Unternehmen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir arbeiten mit verbindlichen Festpreisen nach einer fundierten Bedarfsanalyse. Sie erhalten volle Kostensicherheit ohne versteckte Lizenzkosten oder variable Stundensätze.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen die Websites die Richtlinien für Barrierefreiheit (BFSG / BITV 2.0)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, all unsere Webseiten werden nach den strengen WCAG 2.1 AA und BITV 2.0 Standards entwickelt. Dies ist besonders für medizinische Einrichtungen, Universitätsinstitute und B2B-Dienstleister in Gießen essenziell.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie lange dauert ein Website-Relaunch in Gießen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Typische Projekte für den Mittelstand und Praxen werden innerhalb von 10 bis 14 Werktagen schlüsselfertig realisiert.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welche Regionen im Landkreis Gießen werden betreut?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir betreuen das gesamte Stadtgebiet Gießen sowie alle Kommunen im Landkreis Gießen wie Linden, Pohlheim, Buseck, Wettenberg, Fernwald, Lich, Grünberg, Reiskirchen und Heuchelheim.',
            },
          },
        ],
      },
    ],
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'Strategie & Bedarfsanalyse',
      desc: 'Detaillierte Erfassung Ihrer Geschäftsziele, Zielgruppen in Gießen und Mittelhessen sowie technischer Anforderungen wie Barrierefreiheit, CRM-Anbindungen und SEO-Potenziale.',
    },
    {
      num: '02',
      title: 'UI/UX & Konversions-Architektur',
      desc: 'Entwicklung maßgeschneiderter Interface-Konzepte in Figma mit klarer Nutzerführung, optimierten Call-to-Actions und intuitiven Buchungs- oder Anfrageprozessen.',
    },
    {
      num: '03',
      title: 'Next.js 15 High-Performance Coding',
      desc: 'Saubere Umsetzung mit React 19, TypeScript und Tailwind CSS. Keine langsamen Themes oder aufgeblähten Pagebuilder, sondern handgeschriebener, schlanker Code.',
    },
    {
      num: '04',
      title: 'Lokales SEO & Content-Silo',
      desc: 'Strukturierte Daten, automatisierte Bildoptimierung, semantische HTML5-Architektur und tiefe lokale Verankerung für Spitzenplatzierungen bei Google Mittelhessen.',
    },
    {
      num: '05',
      title: 'Go-Live, Speed-Audit & Betreuung',
      desc: 'Umfassende Qualitätsprüfung mit 100/100 Core Web Vitals Audit, DSGVO-Konformitätsprüfung, Deployment auf deutsche Edge-Server und persönliche Nachbetreuung.',
    },
  ];

  const surroundingCommunes = [
    { name: 'Linden', note: 'Gewerbegebiete Lützellinden & Leihgestern', dist: '5 km' },
    { name: 'Pohlheim', note: 'Industrie & Dienstleistungen Garbenteich', dist: '7 km' },
    { name: 'Buseck', note: 'Gewerbepark Flößerweg & Großen-Buseck', dist: '8 km' },
    { name: 'Wettenberg', note: 'High-Tech & Handwerk Wißmar/Krofdorf', dist: '6 km' },
    { name: 'Heuchelheim', note: 'Traditionsreicher Industriestandort', dist: '4 km' },
    { name: 'Fernwald', note: 'Gewerbepark An der B49 / Steinbach', dist: '9 km' },
    { name: 'Lich', note: 'Gesundheitszentrum & mittelständische Industrie', dist: '14 km' },
    { name: 'Reiskirchen', note: 'Logistikknotenpunkt an der Autobahn A5', dist: '12 km' },
    { name: 'Grünberg', note: 'Präzisionsfertigung & Technologiepark', dist: '20 km' },
    { name: 'Lollar', note: 'Heiztechnik & metallverarbeitende Industrie', dist: '9 km' },
    { name: 'Staufenberg', note: 'Gewerbestandorte Mainzlar & Treis', dist: '11 km' },
    { name: 'Langgöns', note: 'Handwerk & B2B-Dienstleistungen', dist: '10 km' },
  ];

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen selection:bg-amber-500/20 selection:text-amber-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. SPLIT-HERO SECTION MIT ABOVE-THE-FOLD KONTAKTFORMULAR */}
      <LocalSplitHero
        badgeText="STANDORT-HUB GIESSEN · HIGH-END WEBAGENTUR"
        headline="Webdesign & Next.js Entwicklung in"
        headlineGradient="Gießen & Mittelhessen"
        description="Führende Webtechnologie für Universitätsstadt Gießen, Praxen am UKGM, Tech-Startups und den regionalen Mittelstand. Ladezeiten unter 500ms, vollständige Barrierefreiheit nach BITV 2.0 und verbindliche Festpreise mit voller Kostensicherheit."
        cityName="Gießen"
        sourceTag="standorte_giessen"
        formHeading="Kostenlose Bedarfsanalyse für Gießen"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Gießener Portfolio ansehen"
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
              Messbare Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Spitzenleistungen für Gießener Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzise Software-Architektur für messbare Kundengewinnung und maximale Sichtbarkeit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Gießen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Serverlose Edge-Auslieferung in Frankfurt für ultraschnelle Seitenaufrufe auf jedem
                Endgerät.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Voller Besitz des Quellcodes ohne monatliche Lizenzgebühren, Plugin-Abos oder
                Vendor-Lock-in.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Persönlicher Ansprechpartner direkt aus der Nachbarschaft Wetzlar ohne
                Ticket-Warteschlangen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">Festpreis</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Volle Kostensicherheit</h3>
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
              Warum Gießener Unternehmen auf moderne Webarchitektur umsteigen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Der direkte Leistungsvergleich zwischen überladenen Monolithen und moderner Next.js 15
              Headless-Technologie.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-5 text-sm font-semibold text-slate-700">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-700">
                    Veraltetes WordPress / PHP-Monolithen
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Architektur
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Ladezeit & Core Web Vitals</td>
                  <td className="p-5 text-slate-600">
                    Oft 3 bis 6 Sekunden durch viele Plugins und Datenbankabfragen
                  </td>
                  <td className="p-5 font-semibold text-amber-700 bg-amber-50/30">
                    Unter 400ms durch statische Vorkompilierung und Edge-Caching
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Sicherheitsarchitektur</td>
                  <td className="p-5 text-slate-600">
                    Ständiges Angriffsziel für Bots, SQL-Injections und Plugin-Sicherheitslücken
                  </td>
                  <td className="p-5 font-semibold text-amber-700 bg-amber-50/30">
                    Keine angreifbare Datenbank im Frontend, maximale Sicherheit
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Barrierefreiheit (BFSG 2025)</td>
                  <td className="p-5 text-slate-600">
                    Schwer umsetzbar bei fertigen Themes, oft mangelhafte Tastaturbedienbarkeit
                  </td>
                  <td className="p-5 font-semibold text-amber-700 bg-amber-50/30">
                    Vollständige Konformität nach WCAG 2.1 AA und BITV 2.0
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Ranking & Silo-SEO</td>
                  <td className="p-5 text-slate-600">
                    Aufgeblähter HTML-Code, langsame Ladezeiten belasten SEO-Scores
                  </td>
                  <td className="p-5 font-semibold text-amber-700 bg-amber-50/30">
                    Perfekter 100/100 Lighthouse-Score und strukturierte Schema.org Daten
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Wartung & Kosten</td>
                  <td className="p-5 text-slate-600">
                    Wöchentliche Plugin-Updates und teure Wartungsverträge erforderlich
                  </td>
                  <td className="p-5 font-semibold text-amber-700 bg-amber-50/30">
                    Verbindlicher Festpreis, wartungsarmer Code und null Lizenzgebühren
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. PROCESS WORKFLOW (5 SCHRITTE) */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Strukturierter Ablauf
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              In 5 Schritten zu Ihrer neuen Webpräsenz in Gießen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Ein transparenter, verbindlicher Entwicklungsplan für messbaren Projekterfolg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-amber-600/40 mb-3 block">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Echtes Handwerk statt Agentur-Overhead für Gießen
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz im benachbarten Wetzlar baue ich Ihre
                Website ohne bürokratische Reibungsverluste: Technisch perfekt, barrierefrei nach
                gesetzlichen Vorgaben und wirtschaftlich mit verbindlicher Festpreis-Garantie.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Voller Quellcode-Besitz</span>
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

      {/* 7. INDUSTRY CARDS */}
      <section className="py-24 bg-[#fafafa] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Branchenkompetenz
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Maßgeschneiderte Webentwicklung für Gießener Schlüsselbranchen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Zielgruppenorientierte Webauftritte für die führenden Wirtschaftszweige in
              Mittelhessen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kliniken, Fachärzte & Gesundheitszentren
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Entwicklung von barrierefreien Webportalen für medizinische Einrichtungen im Umfeld
                des Universitätsklinikums Gießen und Marburg (UKGM) sowie niedergelassene
                Facharztpraxen im Seltersweg und Schiffenberger Tal. Inklusive Online-Terminvergabe
                und Patienteninformationssystemen.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-amber-800">
                <span className="px-3 py-1 bg-amber-50 rounded-full">BITV 2.0 konform</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">Terminkalender-Sync</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">DSGVO-konform</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Cpu className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Tech-Startups & IT-Dienstleister
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                High-End Webentwicklung für innovative Ausgründungen der Justus-Liebig-Universität
                (JLU) und der Technischen Hochschule Mittelhessen (THM) im Technologie- und
                Innovationszentrum Gießen (TIG). Ultraschnelle Web-Apps mit Next.js 15 und
                API-Anbindung.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-amber-800">
                <span className="px-3 py-1 bg-amber-50 rounded-full">SaaS-Landingpages</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">REST/GraphQL APIs</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">Interaktive Demos</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Mittelstand, Industrie & Handwerk
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Repräsentative Unternehmenswebsites für Handwerksbetriebe und mittelständische
                Industrieunternehmen in den Gewerbegebieten West, Schiffenberger Tal und
                Europaviertel. Fokus auf Neukundengewinnung und automatisierte
                Mitarbeiter-Rekrutierung.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-amber-800">
                <span className="px-3 py-1 bg-amber-50 rounded-full">Mitarbeiter-Funnel</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">B2B-Leadgenerierung</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">Core Web Vitals 100</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Briefcase className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kanzleien, Notare & Wirtschaftsprüfer
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Exklusives Webdesign für Rechtsanwälte, Steuerberater und Notariate in Gießen.
                Seriöse Ästhetik, strukturierte Leistungsbeschreibungen und rechtssichere
                Kontaktformulare für anspruchsvolle Mandantenkommunikation.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-amber-800">
                <span className="px-3 py-1 bg-amber-50 rounded-full">Mandanten-Portale</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">SSL-Verschlüsselung</span>
                <span className="px-3 py-1 bg-amber-50 rounded-full">Vertrauensdesign</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschafts- und Wissenschaftsstandort Gießen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Universitäre Exzellenz und lebendige Wirtschaft im Herzen Mittelhessens
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Die Universitätsstadt Gießen bildet zusammen mit der Schwesterstadt Wetzlar das
              wirtschaftliche und wissenschaftliche Herzstück Mittelhessens. Mit über 40.000
              Studierenden an der Justus-Liebig-Universität (JLU) und der Technischen Hochschule
              Mittelhessen (THM) verfügt die Stadt über eine außergewöhnlich hohe Dichte an
              Fachkräften, innovativen Forschungsinstituten und agilen Neugründungen. Von den
              Biowissenschaften über die Veterinärmedizin bis hin zur angewandten Informatik
              entstehen hier wegweisende Impulse für den gesamten mitteldeutschen Raum.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Zentrale Gewerbezonen und dynamische Infrastruktur
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Gießen profitiert von etablierten Wirtschaftsclustern wie dem Gewerbegebiet West, dem
              Areal Schiffenberger Tal sowie dem Technologie- und Innovationszentrum (TIG) im
              Europaviertel. Eine erstklassige Verkehrsanbindung über den Gießener Ring (A485), die
              Bundesstraße B49 sowie die direkte Verbindung zur Autobahn A5 sorgt für schnelle Wege
              ins Rhein-Main-Gebiet und nach Nordhessen. Für lokale Betriebe ist ein
              hochperformanter Webauftritt das digitale Schaufenster, um Kunden und Fachkräfte in
              der gesamten Region gezielt anzusprechen.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Next.js 15: Technische Überlegenheit für den Gießener Mittelstand
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Viele regionale Unternehmen setzen noch auf veraltete Content-Management-Systeme, die
              durch lange Ladezeiten, mangelhafte mobile Optimierung und Sicherheitsrisiken
              wertvolle Potenziale verschenken. Mit unserer Next.js 15 Architektur erstellen wir
              Websites, die blitzschnell laden, bei Google Spitzenpositionen erzielen und
              vollständig barrierefrei nach BFSG und BITV 2.0 gestaltet sind. Dies schafft messbare
              Wettbewerbsvorteile für Handel, Handwerk, Gesundheitswesen und Dienstleister.
            </p>
          </div>
        </div>
      </section>

      {/* 9. REGIONAL HUB LINK MATRIX */}
      <section className="py-24 bg-slate-50/90 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Vernetzung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Webentwicklung für Gießen & den gesamten Landkreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Wir betreuen Kunden im gesamten Stadtgebiet sowie in allen umliegenden Kommunen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {surroundingCommunes.map((c) => (
              <div
                key={c.name}
                className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {c.dist}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">{c.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600 mb-4">
              Entdecken Sie auch unsere weiteren regionalen Schwerpunktseiten:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/webdesign-agentur-wetzlar"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-amber-400 transition-colors"
              >
                Wetzlar (Agentur-HQ)
              </Link>
              <Link
                href="/webdesign-marburg"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-amber-400 transition-colors"
              >
                Marburg (Biotech-Cluster)
              </Link>
              <Link
                href="/webdesign-herborn"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-amber-400 transition-colors"
              >
                Herborn (Industrie-Hub)
              </Link>
              <Link
                href="/regionen/landkreis-giessen"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-amber-400 transition-colors"
              >
                Landkreis Gießen Übersicht
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zum Standort Gießen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was zeichnet den Standort Gießen von Coday aus?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Als inhabergeführte Webagentur mit regionalem Schwerpunkt Mittelhessen bieten wir
                Unternehmen in Gießen direkte Ansprechpartner vor Ort, modernste Next.js 15
                Technologie und kompromisslose Performance ohne Agentur-Overhead.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine professionelle Website für Gießener Unternehmen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir arbeiten mit verbindlichen Festpreisen nach einer fundierten Bedarfsanalyse. Sie
                erhalten volle Kostensicherheit ohne versteckte Lizenzkosten oder variable
                Stundensätze.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen die Websites die Richtlinien für Barrierefreiheit (BFSG / BITV 2.0)?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, all unsere Webseiten werden nach den strengen WCAG 2.1 AA und BITV 2.0 Standards
                entwickelt. Dies ist besonders für medizinische Einrichtungen, Universitätsinstitute
                und B2B-Dienstleister in Gießen essenziell.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie lange dauert ein Website-Relaunch in Gießen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Typische Projekte für den Mittelstand und Praxen werden innerhalb von 10 bis 14
                Werktagen schlüsselfertig realisiert.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Welche Regionen im Landkreis Gießen werden betreut?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir betreuen das gesamte Stadtgebiet Gießen sowie alle Kommunen im Landkreis Gießen
                wie Linden, Pohlheim, Buseck, Wettenberg, Fernwald, Lich, Grünberg, Reiskirchen und
                Heuchelheim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den digitalen Vorsprung in Gießen?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel.
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
