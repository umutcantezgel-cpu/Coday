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
  Cpu,
  GraduationCap,
  Flask,
  Rocket,
  ShieldChevron,
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
      title: 'Web Design Darmstadt | Tech & Next.js Agency · Coday',
      description:
        'High-end web design in Darmstadt. Ultra-fast Next.js architecture & measurable B2B leads for tech & mid-market. Fixed price on request.',
      keywords: [
        'Web Design Darmstadt',
        'Web Agency Darmstadt',
        'Website Creation Darmstadt',
        'Tech Web Development Darmstadt',
        'Coday Web Darmstadt',
      ],
      path: '/en/webdesign-darmstadt',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Darmstadt | Tech & Next.js Webagentur · Coday',
    description:
      'High-End Webdesign in Darmstadt: Ultraschnelle Next.js Architektur & messbare B2B-Leads für Tech & Mittelstand. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Darmstadt',
      'Webagentur Darmstadt',
      'Website erstellen Darmstadt',
      'Tech Webentwicklung Darmstadt',
      'Coday Web Darmstadt',
    ],
    path: '/de/webdesign-darmstadt',
    type: 'money',
  });
}

export default async function WebdesignDarmstadtPage({
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
    // The root layout already ships the Organization node for this document.
    '@graph': [
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-darmstadt' }, _locale),
      ...(getCityHierarchySchema('webdesign-darmstadt', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine Website für Tech-Unternehmen & Start-ups in Darmstadt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren für TU Spin-offs, Scale-ups im TZ Rhein Main und etablierte Technologieunternehmen in Darmstadt verbindliche Festpreise nach technischer Spezifikation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine moderne Next.js Webanwendung in Darmstadt einsatzbereit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihre Webplattform innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig entwickelt und weltweit performant erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sind Vor-Ort-Termine im Europaviertel oder am TZ Rhein Main möglich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5 erreichen wir Sie von unserem Wetzlarer HQ in unter 45 Minuten direkt in Darmstadt, Weiterstadt oder Griesheim.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Architekturen strenge Datensicherheitsanforderungen für Tech & Pharma?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Entkoppelte Headless-Architekturen ohne SQL-Schwachstellen, DSGVO-konforme Infrastruktur und deutsches Hosting mit ISO-27001 Zertifizierung.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist unser direkter technischer Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel berät und entwickelt direkt ohne Reibungsverluste.',
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
        badgeText="WISSENSCHAFTS-, TECH- & B2B-WEBAGENTUR DARMSTADT"
        headline={isEn ? 'Web Design Darmstadt:' : 'Webdesign Darmstadt:'}
        headlineGradient={
          isEn
            ? 'Next.js Architectures for Tech, Aerospace & Science'
            : 'Next.js Architekturen für Tech, Raumfahrt & Wissenschaft'
        }
        description="Als spezialisierte High-Performance Webagentur für Darmstadt realisieren wir anspruchsvolle Next.js Entwicklung und performante B2B-Websites für Tech-Startups, TU-Spin-offs und den Mittelstand der Digitalstadt. Ladezeiten unter 500ms, Headless CMS und kompromisslose Code-Qualität zum Festpreis."
        cityName="Darmstadt"
        sourceTag="local_seo_darmstadt"
        formHeading="Kostenlose Bedarfsanalyse für Darmstadt"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Darmstädter Referenzen ansehen"
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
              Wissenschaft & Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Darmstädter Tech-Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Softwareunternehmen, Raumfahrt, TU Spin-offs und
              Chemie/Pharma.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit weltweit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für internationale Partner, Investoren und mobile Nutzer.
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
              Next.js Entwicklung: Warum Darmstädter Tech-Unternehmen auf moderne B2B-Websites
              setzen
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
                  <td className="p-5 font-medium text-slate-900">
                    Sicherheit & Cloud-Souveränität
                  </td>
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
                    Garantiert 100/100 (Top-Rankings in Darmstadt)
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
                Hochpräzise Next.js Webentwicklung für die Digitalstadt Darmstadt
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Senior Engineer entwickle ich für Darmstädter Tech-Start-ups,
                Raumfahrt-Partner und forschungsintensive Mittelständler kompromisslos schnelle
                Webarchitekturen ohne bürokratischen Agentur-Wasserkopf.
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

      {/* 6. SERVICES BENTO SHOWCASE (DARMSTADT-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Darmstadt & Südhessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom TU-Startup-Showcase bis zur Cybersecurity- & Raumfahrt-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Cpu className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Software- & Tech-Startup-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für TU Darmstadt Spin-offs und Scale-ups im TZ Rhein Main. Next.js 15,
                TypeScript und modulare API-Integrationen für schnelle Skalierung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <ShieldChevron className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Cybersecurity- & Raumfahrt-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kompromisslose Sicherheit und modernste Ästhetik für Unternehmen im Umfeld von
                ESA/ESOC, EUMETSAT und dem Nationalen Forschungszentrum ATHENE.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Südhessen Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Darmstadt, Griesheim,
                Weiterstadt, Pfungstadt und Dieburg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Flask className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Pharma-, Chemie- & B2B-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Repräsentative Webapplikationen für forschungsintensive Mittelständler und
                Industrieunternehmen im Darmstädter Norden und Europaviertel.
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
              Wissenschafts- & Digitalstadt Darmstadt
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Europaviertel, Telekom City, TZ Rhein Main & Gewerbegebiet Weiterstadt
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Die <strong>Wissenschaftsstadt Darmstadt</strong> ist das Herz der südhessischen
              High-Tech-Wirtschaft. Mit Spitzenforschung an der <strong>TU Darmstadt</strong>,
              europäischen Raumfahrtkontrollzentren (<strong>ESA / ESOC</strong>, EUMETSAT), dem
              führenden Cybersicherheits-Cluster <strong>ATHENE</strong> und weltweit führenden
              Chemie-/Pharmaunternehmen bietet Darmstadt im <strong>Europaviertel</strong>, in der{' '}
              <strong>Telekom City</strong> und am <strong>TZ Rhein Main</strong> ein
              unvergleichliches Ökosystem für technologiegetriebenes Wachstum.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte A5-Schlagader nach Wetzlar
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesautobahn A5</strong> ist unser Wetzlarer Büro in rund 45
              Fahrminuten direkt bei Ihnen vor Ort in Darmstadt, Weiterstadt oder Griesheim. Wir
              bieten Ihnen persönliche Betreuung auf Augenhöhe ohne zeitraubende Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign in Darmstadt
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine Website für Tech-Unternehmen & Start-ups in Darmstadt?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren für TU Spin-offs, Scale-ups im TZ Rhein Main und etablierte
                Technologieunternehmen in Darmstadt verbindliche Festpreise nach technischer
                Spezifikation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine moderne Next.js Webanwendung in Darmstadt einsatzbereit?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihre Webplattform innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig entwickelt und weltweit performant erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Sind Vor-Ort-Termine im Europaviertel oder am TZ Rhein Main möglich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5 erreichen wir Sie von unserem Wetzlarer HQ in unter 45
                Minuten direkt in Darmstadt, Weiterstadt oder Griesheim.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Architekturen strenge Datensicherheitsanforderungen für Tech & Pharma?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Entkoppelte Headless-Architekturen ohne SQL-Schwachstellen, DSGVO-konforme
                Infrastruktur und deutsches Hosting mit ISO-27001 Zertifizierung.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist unser direkter technischer Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel berät und entwickelt direkt ohne Reibungsverluste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Technologische Spitzenklasse für Ihr Darmstädter Unternehmen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort in Darmstadt und Südhessen.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Darmstädter Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <RegionalSilo citySlug="webdesign-darmstadt" locale={_locale} />
    </div>
  );
}
