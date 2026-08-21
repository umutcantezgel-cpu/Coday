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
  Scales,
  FirstAid,
  Stethoscope,
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
      title: 'Web Design Wiesbaden | Premium Web Agency & SEO · Coday',
      description:
        'Premium web design in Wiesbaden: Fast load times, prestigious UI/UX design & SEO for law firms, practices & consultants. Fixed price.',
      keywords: [
        'Web Design Wiesbaden',
        'Web Agency Wiesbaden',
        'Website Creation Wiesbaden',
        'Web Development Wiesbaden',
        'Coday Web Wiesbaden',
      ],
      path: '/en/webdesign-wiesbaden',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wiesbaden | Premium Webagentur & SEO · Coday',
    description:
      'Webdesign in Wiesbaden: Schnelle Ladezeiten, seriöse Ästhetik & starkes SEO für Kanzleien, Praxen & Berater. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Wiesbaden',
      'Webagentur Wiesbaden',
      'Website erstellen Wiesbaden',
      'Webentwicklung Wiesbaden',
      'Coday Web Wiesbaden',
    ],
    path: '/de/webdesign-wiesbaden',
    type: 'money',
  });
}

export default async function WebdesignWiesbadenPage({
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
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-wiesbaden' }, _locale),
      ...(getCityHierarchySchema('webdesign-wiesbaden', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine neue Website in Wiesbaden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und verbindlich als Festpreis auf Anfrage. Durch unsere schlanken Next.js Architekturen bieten wir maximale Kosteneffizienz ohne teuren Agentur-Wasserkopf.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Website in Wiesbaden online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für ein Beratungsgespräch direkt nach Wiesbaden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A3 und A66 sind wir von unserem Wetzlarer HQ in unter 45 Minuten direkt bei Ihnen vor Ort an der Wilhelmstraße, in Nordenstadt oder Schierstein.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites die Barrierefreiheitsstandards nach BITV 2.0 / WCAG?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln barrierefreie Interfaces mit semantischem HTML, Tastaturnavigation und Screenreader-Unterstützung gemäß WCAG 2.2 und BITV 2.0.',
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
        badgeText="KANZLEIEN, PRAXEN & CONSULTING WEBAGENTUR WIESBADEN"
        headline="Webdesign & Next.js Entwicklung in der Landeshauptstadt"
        headlineGradient="Wiesbaden"
        description="Speziell für Wirtschaftskanzleien, Privatkliniken, Consulting-Boutiquen und Premium-Dienstleister in Wiesbaden und dem Rheingau. Maximale Ladezeiten unter 500ms, perfekte Google-Rankings und planbare Mandanten- und Patientengewinnung. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Wiesbaden"
        sourceTag="local_seo_wiesbaden"
        formHeading="Kostenlose Bedarfsanalyse für Wiesbaden"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Wiesbadener Referenzen ansehen"
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
              Performance & Renommee
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Wiesbadener Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Kanzleien, Privatkliniken und Premium-Dienstleister.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Wiesbaden</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für anspruchsvolle Mandanten, Privatpatienten und
                B2B-Kunden.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne Agentur-Warteschleifen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
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

      {/* 4. COMPARISON TABLE: NEXT.JS VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum Wiesbadener Kanzleien & Kliniken auf Next.js setzen
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
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Mandantenschutz</td>
                  <td className="p-5 text-slate-600">
                    Ständige Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare Datenbank)
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
                    Direkter Entwickler-Kontakt in Hessen
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
                Echtes Handwerk statt Agentur-Overhead für Wiesbaden
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für
                Wiesbaden, Nordenstadt und den Rheingau: Technisch perfekt, visuell prestigeträchtig
                und wirtschaftlich 5–10x effizienter als traditionelle Agentur-Wasserköpfe.
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
                  <span className="text-slate-700">5-10x günstiger als Großagenturen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES BENTO SHOWCASE (WIESBADEN-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Wiesbaden & den Rheingau
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Kanzlei-Portal bis zur barrierefreien Facharzt-Homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Scales className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Kanzlei- & Notariat-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Rechtsanwälte, Notare, Steuerberater und Wirtschaftsprüfer an der
                Wilhelmstraße. Minimalistisches Corporate Design und höchste Diskretion.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <FirstAid className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Privatklinik & Facharzt Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                100% barrierefrei (BITV 2.0 / WCAG) für Privatkliniken und renommierte
                Facharztpraxen in Sonnenberg und Biebrich mit DSGVO-konformer Online-Terminbuchung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Rheingau Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Wiesbaden, Nordenstadt,
                Schierstein, Biebrich und dem gesamten Rheingau-Taunus-Kreis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Consulting & Immobilien Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Repräsentative Webauftritte für Managementberatungen, Family Offices und
                Immobilienmakler mit interaktiven Exposés.
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
              Wirtschafts- & Landeshauptstadt Wiesbaden
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Wilhelmstraße, Kurhaus, Ministerien & Gewerbestandort Nordenstadt
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Wiesbaden vereint den Glanz des <strong>Kurhauses</strong> und der{' '}
              <strong>Wilhelmstraße</strong>
              mit der Wirtschaftskraft als hessische <strong>Landeshauptstadt</strong>. In den
              Gewerbegebieten
              <strong>Nordenstadt</strong> und <strong>Schierstein</strong> sowie am Rhein in{' '}
              <strong>Biebrich</strong>
              floriert ein anspruchsvoller Dienstleistungs-, Beratungs- und Kliniksektor, der
              höchste Maßstäbe an Design, Barrierefreiheit und Datensicherheit anlegt.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte A3- & A66-Achse nach Wetzlar
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesautobahnen A3 und A66</strong> ist unser Wetzlarer Büro in rund
              45 Fahrminuten direkt bei Ihnen vor Ort in Wiesbaden. Wir bieten Ihnen persönliche
              Betreuung auf Augenhöhe ohne zeitraubende Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign in Wiesbaden
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine neue Website in Wiesbaden?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und
                verbindlich als Festpreis auf Anfrage. Durch unsere schlanken KI-Workflows sind wir
                5–10x günstiger als traditionelle Großagenturen bei signifikant höherer Performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Website in Wiesbaden online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für ein Beratungsgespräch direkt nach Wiesbaden?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A3 und A66 sind wir von unserem Wetzlarer HQ in unter 45
                Minuten direkt bei Ihnen vor Ort an der Wilhelmstraße, in Nordenstadt oder
                Schierstein.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites die Barrierefreiheitsstandards nach BITV 2.0 / WCAG?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln barrierefreie Interfaces mit semantischem HTML,
                Tastaturnavigation und Screenreader-Unterstützung gemäß WCAG 2.2 und BITV 2.0.
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

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den digitalen Vorsprung in Wiesbaden?
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
