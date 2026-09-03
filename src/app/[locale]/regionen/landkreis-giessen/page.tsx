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
  ShoppingCart,
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
      title: 'Web Design Gießen District | Web Agency · Coday',
      description:
        'Web design in the Gießen district. Ultra-fast websites for clinics, trade & SME in Linden, Pohlheim, Lich & Grünberg. Fixed prices on request.',
      keywords: [
        'Web Design Giessen District',
        'Web Agency District Giessen',
        'Website Creation Linden Pohlheim Lich',
        'Web Development Central Hesse',
        'Coday Web Giessen',
      ],
      path: '/en/regionen/landkreis-giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Landkreis Gießen | Webagentur · Coday',
    description:
      'Webdesign im Landkreis Gießen. Ultraschnelle Websites für Praxen, Handwerk & Mittelstand in Linden, Pohlheim, Lich & Grünberg. Festpreise auf Anfrage.',
    keywords: [
      'Webdesign Landkreis Gießen',
      'Webagentur Kreis Gießen',
      'Website erstellen Linden Pohlheim Lich Grünberg',
      'Webentwicklung Mittelhessen',
      'Coday Web Gießen',
    ],
    path: '/de/regionen/landkreis-giessen',
    type: 'money',
  });
}

export default async function LandkreisGiessenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Gießen (Universitätsstadt)',
      link: '/webdesign-giessen',
      highlight: true,
      note: 'Bildungs-, Medizin- & Dienstleistungszentrum',
    },
    {
      name: 'Linden',
      link: '/webdesign-giessen',
      highlight: true,
      note: 'IT, Handwerk & Lindener Ratsstuben',
    },
    {
      name: 'Pohlheim',
      link: '/webdesign-giessen',
      highlight: true,
      note: 'Gewerbeparks, B2B-Handel & Batherm',
    },
    {
      name: 'Lich',
      link: '/webdesign-giessen',
      highlight: true,
      note: 'Gesundheitswirtschaft, Kliniken & Brauwesen',
    },
    {
      name: 'Grünberg',
      link: '/webdesign-giessen',
      highlight: true,
      note: 'Mittelstand & Maschinenbau',
    },
    {
      name: 'Buseck',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Logistik & Industrie an der A5',
    },
    {
      name: 'Reiskirchen',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Autobahn-Hub A5 & Gewerbe',
    },
    {
      name: 'Wettenberg',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Hightech, Handwerk & Gewerbe',
    },
    {
      name: 'Heuchelheim',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Industrieparks & Gewerbe',
    },
    {
      name: 'Fernwald',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Gewerbegebiet A5 / Ansheim',
    },
    {
      name: 'Hungen',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Schäferstadt, Handwerk & Handel',
    },
    {
      name: 'Laubach',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Tourismus, Kultur & Handwerk',
    },
    {
      name: 'Lollar',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Heiztechnik & metallverarbeitende Industrie',
    },
    {
      name: 'Staufenberg',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Gewerbe & Dienstleistungen',
    },
    {
      name: 'Allendorf (Lumda)',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Handwerk & lokales Gewerbe',
    },
    {
      name: 'Biebertal',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Handwerksbetriebe & Wohnen',
    },
    {
      name: 'Rabenau',
      link: '/webdesign-giessen',
      highlight: false,
      note: 'Handwerk & mittelständische Betriebe',
    },
  ];

  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/regionen/landkreis-giessen`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // Skip the Organization node - the root layout renders it on every page.
    '@graph': [
      getPyramidBreadcrumbs(2, { countySlug: 'landkreis-giessen' }, _locale),
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Gießen District | Web Agency · Coday'
          : 'Webdesign Landkreis Gießen | Webagentur · Coday',
        description: isEn
          ? 'Web design in the Gießen district. Ultra-fast websites for clinics, trade & SME in Linden, Pohlheim, Lich & Grünberg. Fixed prices on request.'
          : 'Webdesign im Landkreis Gießen. Ultraschnelle Websites für Praxen, Handwerk & Mittelstand in Linden, Pohlheim, Lich & Grünberg. Festpreise auf Anfrage.',
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      ...(getCountyHierarchySchema('landkreis-giessen', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website im Landkreis Gießen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Arztpraxen in Lich, Handwerksbetriebe in Linden und Pohlheim sowie Unternehmen in Gießen transparente Festpreise nach Bedarfsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform im Landkreis Gießen online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine direkt nach Gießen, Linden, Pohlheim oder Lich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, absolut. Über die B49 und A485 sind wir in maximal 15 Minuten bei Ihnen vor Ort in der Praxis, Kanzlei oder im Handwerksbetrieb.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites die Barrierefreiheits-Standards nach BFSG / BITV 2.0 für Praxen und Kliniken?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Alle Websites erfüllen modernste Barrierefreiheits-Richtlinien (WCAG 2.2 / BFSG) und werden datenschutzkonform in deutschen Rechenzentren gehostet.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer ist mein persönlicher Ansprechpartner?',
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

      <LocalSplitHero
        badgeText="REGIONALER MASTER-HUB · LANDKREIS GIESSEN"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Landkreis Gießen"
        description="Ihre lokale High-End Webagentur für Universitätsstadt und Umland. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte B2B-Leads für Praxen, Handwerk und Mittelstand im gesamten Landkreis. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Landkreis Gießen"
        sourceTag="local_seo_landkreis_giessen"
        formHeading="Kostenlose Bedarfsanalyse für Landkreis Gießen"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Gießener Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR LANDKREIS GIESSEN */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Landkreis Gießen
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
              Wirtschaftskraft Gießen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Praxen, Handwerk & Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Universitätsstadt, Gewerbeparks und Mittelstand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Landkreis</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für Patienten, B2B-Kunden und mobile Nutzer.
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
              Warum Unternehmen im Landkreis Gießen auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Landkreis Gießen)
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
                Maßgeschneiderte Webentwicklung für Praxen, Mittelstand & Handwerk im Landkreis
                Gießen
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für den
                gesamten Landkreis Gießen: Technisch perfekt, ausdrucksstark und wirtschaftlich
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

      {/* 7. SERVICES BENTO SHOWCASE (LANDKREIS-GIESSEN-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Landkreis Gießen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Praxis-Portal bis zur Handwerks- & Industrie-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Facharztpraxen & Klinik-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Barrierefrei nach BITV 2.0 / WCAG für Praxen und Gesundheitszentren in Gießen, Lich
                und Linden mit geschützter Online-Terminvergabe.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Handwerks- & Meisterbetrieb-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-optimierte Webpräsenzen mit 60-Sekunden-Express-Recruiting für Bau- und
                Handwerksbetriebe in Linden, Pohlheim und Grünberg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Landkreis Gießen Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in allen 18 Kommunen des
                Landkreises Gießen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. B2B-Mittelstand & Logistik-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Skalierbare Next.js Systeme für Industrie- und Handelsunternehmen entlang der A5-
                und A485-Verkehrsachsen Reiskirchen, Buseck und Fernwald.
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
              Wirtschaftsregion Landkreis Gießen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Universitätsstadt Gießen, Handwerk in Linden & Pohlheim, Gesundheitsstadt Lich
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Landkreis Gießen</strong> verbindet Spitzenforschung und Bildungskraft
              rund um die <strong>Justus-Liebig-Universität</strong> und den{' '}
              <strong>THM-Campus Gießen</strong> mit florierendem Handwerk und mittelständischem
              Gewerbe in <strong>Linden und Pohlheim</strong> (Batherm, Lindener Ratsstuben),
              erstklassiger Gesundheitsversorgung in <strong>Lich</strong> sowie innovativen
              Maschinenbau- und Logistikstandorten in{' '}
              <strong>Grünberg, Reiskirchen und Buseck</strong>. Durch das{' '}
              <strong>Gießener Ring-Autobahnnetz (A485, A480, B49, A5)</strong> ist die Region
              hervorragend angebunden.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte Nachbarschaft zu unserem Wetzlarer Büro
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesstraße B49 oder die A485</strong> sind wir in unter 15
              Fahrminuten direkt bei Ihnen vor Ort im gesamten Landkreis Gießen. Wir garantieren
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
              Fragen & Antworten zu Webdesign im Landkreis Gießen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website im Landkreis Gießen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Arztpraxen in Lich, Handwerksbetriebe in Linden und Pohlheim
                sowie Unternehmen in Gießen transparente Festpreise nach Bedarfsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform im Landkreis Gießen online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine direkt nach Gießen, Linden, Pohlheim oder Lich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, absolut. Über die B49 und A485 sind wir in maximal 15 Minuten bei Ihnen vor Ort
                in der Praxis, Kanzlei oder im Handwerksbetrieb.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites die Barrierefreiheits-Standards nach BFSG / BITV 2.0 für
                Praxen und Kliniken?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Alle Websites erfüllen modernste Barrierefreiheits-Richtlinien (WCAG 2.2 / BFSG)
                und werden datenschutzkonform in deutschen Rechenzentren gehostet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer ist mein persönlicher Ansprechpartner?
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
            Digitale Spitzenklasse für Ihr Unternehmen im Landkreis Gießen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort im Landkreis Gießen.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Erstgespräch für den Landkreis Gießen anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <CountySilo countySlug="landkreis-giessen" locale={_locale} />
    </div>
  );
}
