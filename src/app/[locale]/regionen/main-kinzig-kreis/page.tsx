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
  Factory,
  Package,
  Wrench,
  Flask,
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
      title: 'Web Design Main-Kinzig District | B2B Agency MKK · Coday',
      description:
        'Web development & SEO for the Main-Kinzig district. Next.js websites for industry & SME in Hanau, Maintal & Gelnhausen. Fixed prices on request.',
      keywords: [
        'Web Design Main-Kinzig District',
        'Web Agency Hanau Maintal',
        'Website Creation Gelnhausen Bruchköbel',
        'Web Development MKK',
        'Coday Web Main-Kinzig',
      ],
      path: '/en/regionen/main-kinzig-kreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Main-Kinzig-Kreis | B2B Webagentur MKK · Coday',
    description:
      'Webentwicklung & SEO für den Main-Kinzig-Kreis. Next.js Websites für Industrie & Mittelstand in Hanau, Maintal & Gelnhausen. Festpreise auf Anfrage.',
    keywords: [
      'Webdesign Main-Kinzig-Kreis',
      'Webagentur Hanau Maintal',
      'Website erstellen Gelnhausen Bruchköbel',
      'Webentwicklung MKK',
      'Coday Web Main-Kinzig',
    ],
    path: '/de/regionen/main-kinzig-kreis',
    type: 'money',
  });
}

export default async function MainKinzigKreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Hanau (Sonderstatusstadt)',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'Brüder-Grimm-Stadt, Materialtechnik & Chemie',
    },
    {
      name: 'Gelnhausen (Kreisstadt)',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'Barbarossastadt, Verwaltung & Feinwerktechnik',
    },
    {
      name: 'Maintal',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'Industrie, Logistik & Main-Anbindung',
    },
    {
      name: 'Bruchköbel',
      link: '/webdesign-hanau',
      highlight: true,
      note: 'B2B-Handel & Handwerks-Cluster',
    },
    {
      name: 'Nidderau',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Wohnen & wachsender Mittelstand',
    },
    {
      name: 'Schlüchtern',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Mittelstands- & Bildungszentrum Bergwinkel',
    },
    {
      name: 'Langenselbold',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Logistik-Hub am Kinzigtal-Dreieck',
    },
    {
      name: 'Freigericht',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Mittelstand, Metallverarbeitung & Handwerk',
    },
    {
      name: 'Rodenbach',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Wohnstandort & lokales Gewerbe',
    },
    {
      name: 'Bad Orb',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Kur-, Wellness- & Gesundheitswirtschaft',
    },
    {
      name: 'Schöneck',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Gewerbe & Frankfurt-Nähe',
    },
    {
      name: 'Wächtersbach',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Messe-, Kultur- & Handelsstandort',
    },
    {
      name: 'Biebergemünd',
      link: '/webdesign-hanau',
      highlight: false,
      note: 'Workwear-Zentrale & mittelständisches Gewerbe',
    },
  ];

  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/regionen/main-kinzig-kreis`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // The root layout is the single source of the Organization node.
    '@graph': [
      getPyramidBreadcrumbs(2, { countySlug: 'main-kinzig-kreis' }, _locale),
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Web Design Main-Kinzig District | B2B Agency MKK · Coday'
          : 'Webdesign Main-Kinzig-Kreis | B2B Webagentur MKK · Coday',
        description: isEn
          ? 'Web development & SEO for the Main-Kinzig district. Next.js websites for industry & SME in Hanau, Maintal & Gelnhausen. Fixed prices on request.'
          : 'Webentwicklung & SEO für den Main-Kinzig-Kreis. Next.js Websites für Industrie & Mittelstand in Hanau, Maintal & Gelnhausen. Festpreise auf Anfrage.',
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      ...(getCountyHierarchySchema('main-kinzig-kreis', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website im Main-Kinzig-Kreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Materialtechnik-Unternehmen in Hanau, Industriebetriebe in Maintal und Mittelständler im Kinzigtal transparente Festpreise nach technischer Leistungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform im Main-Kinzig-Kreis online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Hanau, Maintal, Gelnhausen oder Schlüchtern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A45 und A66 sind wir von unserem Wetzlarer HQ in rund 45 Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Entwickeln Sie B2B-Kataloge und Lead-Systeme für die Material- und Feinwerktechnik im MKK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir programmieren interaktive Next.js 15 Produktkataloge mit ERP-Schnittstellen und automatisierten Lead-Funnels.',
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
        badgeText="REGIONALER MASTER-HUB · MAIN-KINZIG-KREIS (MKK)"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Main-Kinzig-Kreis"
        description="Ihre High-End B2B Webagentur für Hanau, Maintal, Gelnhausen, Bruchköbel und den gesamten MKK. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte B2B-Leads für Materialtechnik, Industrie und Mittelstand. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Main-Kinzig-Kreis"
        sourceTag="local_seo_main_kinzig_kreis"
        formHeading="Kostenlose Bedarfsanalyse für Main-Kinzig-Kreis"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="MKK Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR MAIN-KINZIG-KREIS */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Main-Kinzig-Kreis
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
              Wirtschaftskraft MKK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Industrie, Chemie & Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Materialtechnik, Feinwerkbau und Logistik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im MKK</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für globale B2B-Kunden und mobile Nutzer.
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
              Warum Industrieunternehmen im MKK auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Main-Kinzig-Kreis)
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
                Maßgeschneiderte Webentwicklung für Materialtechnik, Industrie & Handwerk im MKK
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler baue ich Ihre Webpräsenz für den gesamten MKK:
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

      {/* 7. SERVICES BENTO SHOWCASE (MKK-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Main-Kinzig-Kreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Von Materialtechnik-Websites bis zur Präzisionsbau- & Handwerks-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Flask className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Materialtechnik- & Chemie-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enterprise-fähige Next.js Plattformen für Konzerne und High-Tech-Zulieferer im
                Industriepark Wolfgang in Hanau und Maintal.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Factory className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Feinwerktechnik & Präzisionsbau
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Interaktive Produktkataloge, 3D-Showcases und automatisierte B2B-Anfrage-Funnels für
                den Mittelstand in Gelnhausen und Biebergemünd.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Main-Kinzig-Kreis Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 13 Kommunen des
                Main-Kinzig-Kreises.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Handwerk, Bau & Logistik-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Moderne Plattformen mit 60-Sekunden-Express-Recruiting für Betriebe in Bruchköbel,
                Langenselbold, Schlüchtern und Freigericht.
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
              Wirtschaftsregion Main-Kinzig-Kreis
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Brüder-Grimm-Stadt Hanau, Barbarossastadt Gelnhausen, Kinzigtal-Achse
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Main-Kinzig-Kreis (MKK)</strong> ist der flächengrößte Landkreis Hessens
              und verbindet das Rhein-Main-Gebiet mit Osthessen. Er zeichnet sich durch
              Weltmarktführer der Material- und Chemiebranche in <strong>Hanau</strong> (Heraeus,
              Umicore, Evonik), traditionsreiche Feinmechanik in der Kreisstadt{' '}
              <strong>Gelnhausen</strong>, starke Industrie in <strong>Maintal</strong>
              sowie dynamische Logistik- und Gewerbeparks in{' '}
              <strong>Langenselbold, Bruchköbel und Schlüchtern</strong>
              aus. Über die <strong>Bundesautobahnen A66 und A45</strong> ist der Kreis optimal
              angebunden.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über A45 / A66
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A45 oder A66</strong> sind wir in rund 45 Fahrminuten
              direkt bei Ihnen vor Ort im gesamten Main-Kinzig-Kreis. Wir garantieren Ihnen
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
              Fragen & Antworten zu Webdesign im Main-Kinzig-Kreis
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website im Main-Kinzig-Kreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Materialtechnik-Unternehmen in Hanau, Industriebetriebe in
                Maintal und Mittelständler im Kinzigtal transparente Festpreise nach technischer
                Leistungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform im Main-Kinzig-Kreis online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Hanau, Maintal, Gelnhausen oder Schlüchtern?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A45 und A66 sind wir von unserem Wetzlarer HQ in rund 45
                Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Entwickeln Sie B2B-Kataloge und Lead-Systeme für die Material- und Feinwerktechnik
                im MKK?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir programmieren interaktive Next.js 15 Produktkataloge mit ERP-Schnittstellen
                und automatisierten Lead-Funnels.
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
            Digitale Spitzenklasse für Ihr Unternehmen im Main-Kinzig-Kreis sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort im Main-Kinzig-Kreis.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Erstgespräch für den Main-Kinzig-Kreis anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
