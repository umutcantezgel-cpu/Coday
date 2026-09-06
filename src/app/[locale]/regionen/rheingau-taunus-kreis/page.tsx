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
  Wine,
  Cpu,
  Wrench,
  GraduationCap,
  MapPin,
  ChartBar,
  Star,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  ShoppingBag,
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
      title: 'Web Design Rheingau-Taunus District | Agency · Coday',
      description:
        'Web design & SEO in the Rheingau-Taunus district. Premium websites for viticulture, tourism & services in Taunusstein, Idstein & Eltville. Fixed price.',
      keywords: [
        'Web Design Rheingau-Taunus District',
        'Web Agency Taunusstein Idstein',
        'Website Creation Eltville Rüdesheim',
        'Web Development Rheingau',
        'Coday Web Rheingau-Taunus',
      ],
      path: '/en/regionen/rheingau-taunus-kreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Rheingau-Taunus-Kreis | Webagentur · Coday',
    description:
      'Webdesign & SEO im Rheingau-Taunus-Kreis. Hochwertige Websites für Weinbau, Tourismus & Dienstleister in Taunusstein, Idstein & Eltville. Festpreis.',
    keywords: [
      'Webdesign Rheingau-Taunus-Kreis',
      'Webagentur Taunusstein Idstein',
      'Website erstellen Eltville Rüdesheim',
      'Webentwicklung Rheingau',
      'Coday Web Rheingau-Taunus',
    ],
    path: '/de/regionen/rheingau-taunus-kreis',
    type: 'money',
  });
}

export default async function RheingauTaunusKreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Taunusstein (Größte Stadt)',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Wirtschaftszentrum im Untertaunus',
    },
    {
      name: 'Idstein (Hochschulstadt)',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Campus Fresenius, IT-Hub & A3-Knotenpunkt',
    },
    {
      name: 'Eltville am Rhein (Wein- & Rosenstadt)',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Rheingau-Mittelzentrum & Spitzenweingüter',
    },
    {
      name: 'Rüdesheim am Rhein',
      link: '/webdesign-wiesbaden',
      highlight: true,
      note: 'Welterbe Oberes Mittelrheintal & Tourismus',
    },
    {
      name: 'Geisenheim (Hochschulstadt)',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Hochschule für Weinbau & Getränketechnologie',
    },
    {
      name: 'Oestrich-Winkel',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'EBS Business School & Weinwirtschaft',
    },
    {
      name: 'Bad Schwalbach (Kreisstadt)',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Heilbad, Verwaltung & Gesundheit',
    },
    {
      name: 'Walluf',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Pforte des Rheingaus & Gewerbegebiet',
    },
    {
      name: 'Hünstetten',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Handwerksbetriebe & Wohnstandort',
    },
    {
      name: 'Hohenstein',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Mittelstand im Aartal',
    },
    {
      name: 'Aarbergen',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Gießerei- & Industriestandort',
    },
    {
      name: 'Lorch am Rhein',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Steillagen-Weinbau & Rheintourismus',
    },
    {
      name: 'Heidenrod',
      link: '/webdesign-wiesbaden',
      highlight: false,
      note: 'Flächengemeinde, Natur & Handwerk',
    },
  ];

  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/regionen/rheingau-taunus-kreis`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // No Organization node here: the root layout already emits it site-wide.
    '@graph': [
      getPyramidBreadcrumbs(2, { countySlug: 'rheingau-taunus-kreis' }, _locale),
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Rheingau-Taunus District | Agency · Coday'
          : 'Webdesign Rheingau-Taunus-Kreis | Webagentur · Coday',
        description: isEn
          ? 'Web design & SEO in the Rheingau-Taunus district. Premium websites for viticulture, tourism & services in Taunusstein, Idstein & Eltville. Fixed price.'
          : 'Webdesign & SEO im Rheingau-Taunus-Kreis. Hochwertige Websites für Weinbau, Tourismus & Dienstleister in Taunusstein, Idstein & Eltville. Festpreis.',
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      ...(getCountyHierarchySchema('rheingau-taunus-kreis', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website im Rheingau-Taunus-Kreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Weingüter in Eltville, Bildungsträger in Idstein und Betriebe in Taunusstein transparente Festpreise nach technischer Leistungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist ein Weinguts-Shop oder eine Plattform im Rheingau online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Taunusstein, Idstein, Eltville oder Rüdesheim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A3 und B54 sind wir von unserem Wetzlarer HQ in rund 40 Minuten direkt bei Ihnen vor Ort im Betrieb oder Weingut.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie integrierte Shopsysteme für Weinverkauf und Event-Buchungen an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln performante Headless-E-Commerce-Lösungen mit Altersverifikation, Weinpaket-Konfiguratoren und Event-Ticketing.',
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
        badgeText="REGIONALER MASTER-HUB · RHEINGAU-TAUNUS-KREIS"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Rheingau-Taunus-Kreis"
        description="Ihre High-End Webagentur für Taunusstein, Idstein, Eltville, Rüdesheim und den gesamten Untertaunus & Rheingau. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte Leads für Weinbau, Tourismus, Bildung und Dienstleister. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Rheingau-Taunus-Kreis"
        sourceTag="local_seo_rheingau_taunus_kreis"
        formHeading="Kostenlose Bedarfsanalyse für Rheingau-Taunus"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Rheingau Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR RHEINGAU-TAUNUS-KREIS */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Rheingau-Taunus-Kreis
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
              Wirtschaftskraft Rheingau-Taunus
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Weinbau, Bildung & Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Spitzenweingüter, Hochschulen und Untertaunus-Gewerbe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Rheingau</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für weltweite Genießer, Weinkäufer und mobile Touristen.
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
              Warum Betriebe im Rheingau-Taunus auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Rheingau-Taunus-Kreis)
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
                Maßgeschneiderte Webentwicklung für Weinbau, Bildung & Untertaunus-Mittelstand
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für den
                gesamten Rheingau-Taunus-Kreis: Technisch perfekt, ausdrucksstark und wirtschaftlich
                5–10x effizienter als traditionelle Agentur-Wasserköpfe.
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

      {/* 7. SERVICES BENTO SHOWCASE (RHEINGAU-TAUNUS-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Rheingau-Taunus-Kreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Von Weinguts-Shops bis zu Hochschul- und Unternehmens-Portalen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wine className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Weinguts- & Sektkellerei-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Designstarke Next.js Onlineshops, exklusive Wein-Präsentationen und Buchungssysteme
                für Verkostungen in Eltville, Rüdesheim und Geisenheim.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <GraduationCap className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Bildungs- & IT-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochperformante, barrierefreie Plattformen für Institute, Akademien und
                Tech-Dienstleister in Idstein und Oestrich-Winkel.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Rheingau-Taunus Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 13 Kommunen des
                Rheingau-Taunus-Kreises.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Untertaunus Mittelstand & Handwerk
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Moderne Plattformen mit 60-Sekunden-Express-Recruiting für Betriebe in Taunusstein,
                Bad Schwalbach, Hünstetten und Hohenstein.
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
              Wirtschaftsregion Rheingau-Taunus-Kreis
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Kulturland Rheingau, Bildungsstandort Idstein, Untertaunus-Metropole Taunusstein
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Rheingau-Taunus-Kreis</strong> vereint zwei starke Wirtschaftsräume: Den
              weltbekannten
              <strong>Rheingau</strong> mit erstklassigem Weinbau, Sekttradition und
              Spitzenforschung an der
              <strong>Hochschule Geisenheim</strong> sowie der{' '}
              <strong>EBS Universität in Oestrich-Winkel</strong>, und den prosperierenden{' '}
              <strong>Untertaunus</strong> mit dem Mittelzentrum <strong>Taunusstein</strong>
              und der Hochschul- und Technologiestadt <strong>Idstein</strong> (Hochschule
              Fresenius, IT-Gewerbe). Über die <strong>Bundesautobahn A3</strong> sowie die{' '}
              <strong>Bundesstraßen B42 und B54</strong>
              ist der Kreis optimal an das Rhein-Main-Gebiet und Wiesbaden angebunden.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über A3 / B54
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahn A3 oder die Bundesstraße B54</strong> sind wir in rund 40
              Fahrminuten direkt bei Ihnen vor Ort im gesamten Rheingau-Taunus-Kreis. Wir
              garantieren Ihnen persönliche Betreuung auf Augenhöhe ohne zeitraubende
              Agentur-Umwege.
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
              Fragen & Antworten zu Webdesign im Rheingau-Taunus-Kreis
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website im Rheingau-Taunus-Kreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Weingüter in Eltville, Bildungsträger in Idstein und Betriebe in
                Taunusstein transparente Festpreise nach technischer Leistungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist ein Weinguts-Shop oder eine Plattform im Rheingau online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Taunusstein, Idstein, Eltville oder Rüdesheim?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A3 und B54 sind wir von unserem Wetzlarer HQ in rund 40
                Minuten direkt bei Ihnen vor Ort im Betrieb oder Weingut.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie integrierte Shopsysteme für Weinverkauf und Event-Buchungen an?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln performante Headless-E-Commerce-Lösungen mit Altersverifikation,
                Weinpaket-Konfiguratoren und Event-Ticketing.
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
        cityName="Rheingau-Taunus-Kreis"
        sourceTag="local_seo_rheingau_taunus_kreis_bottom"
      />

      <CountySilo countySlug="rheingau-taunus-kreis" locale={_locale} />
    </div>
  );
}
