import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
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
  Cpu,
  ShoppingCart,
  Wrench,
  Airplane,
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
      title: 'Web Design Offenbach District | Web Agency & SEO · Coday',
      description:
        'Professional web design in the Offenbach district. Ultra-fast websites for Rodgau, Dietzenbach, Dreieich & Neu-Isenburg. Fixed prices on request.',
      keywords: [
        'Web Design Offenbach District',
        'Web Agency Rodgau Dietzenbach',
        'Website Creation Dreieich Neu-Isenburg',
        'Web Development District Offenbach',
        'Coday Web Offenbach',
      ],
      path: '/en/regionen/kreis-offenbach',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Kreis Offenbach | Webagentur & SEO · Coday',
    description:
      'Professionelles Webdesign im Kreis Offenbach. Ultraschnelle Websites für Rodgau, Dietzenbach, Dreieich & Neu-Isenburg. Verbindlicher Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Kreis Offenbach',
      'Webagentur Rodgau Dietzenbach',
      'Website erstellen Dreieich Neu-Isenburg',
      'Webentwicklung Kreis Offenbach',
      'Coday Web Offenbach',
    ],
    path: '/de/regionen/kreis-offenbach',
    type: 'money',
  });
}

export default async function KreisOffenbachPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Dietzenbach (Kreisstadt)',
      link: '/webdesign-dietzenbach',
      highlight: true,
      note: 'Verwaltungs- & Gewerbezentrum',
    },
    {
      name: 'Rodgau',
      link: '/webdesign-rodgau',
      highlight: true,
      note: 'Größte Stadt im Kreis & B2B-Mittelstand',
    },
    {
      name: 'Dreieich',
      link: '/webdesign-dietzenbach',
      highlight: true,
      note: 'Dreieich Plaza, Mode & IT-Hub',
    },
    {
      name: 'Neu-Isenburg',
      link: '/webdesign-dietzenbach',
      highlight: true,
      note: 'Konzernzentralen, IT & Airport-City',
    },
    {
      name: 'Langen (Hessen)',
      link: '/webdesign-dietzenbach',
      highlight: true,
      note: 'Flugsicherung DFS & Paul-Ehrlich-Institut',
    },
    {
      name: 'Seligenstadt',
      link: '/webdesign-rodgau',
      highlight: false,
      note: 'Historische Einhardstadt & Handwerk',
    },
    {
      name: 'Obertshausen',
      link: '/webdesign-rodgau',
      highlight: false,
      note: 'Lederwaren-Tradition & Logistik',
    },
    {
      name: 'Rödermark',
      link: '/webdesign-dietzenbach',
      highlight: false,
      note: 'Mittelstand, IT & Gewerbeparks',
    },
    {
      name: 'Mühlheim am Main',
      link: '/webdesign-rodgau',
      highlight: false,
      note: 'Mainlage, Handwerk & Industrie',
    },
    {
      name: 'Heusenstamm',
      link: '/webdesign-dietzenbach',
      highlight: false,
      note: 'Schlossstadt, IT & Logistik',
    },
    {
      name: 'Egelsbach',
      link: '/webdesign-dietzenbach',
      highlight: false,
      note: 'Flugplatz Egelsbach & Gewerbe',
    },
    {
      name: 'Mainhausen',
      link: '/webdesign-rodgau',
      highlight: false,
      note: 'Handel, Gewerbe & Seenlandschaft',
    },
    {
      name: 'Hainburg',
      link: '/webdesign-rodgau',
      highlight: false,
      note: 'Main-Gewerbe & Handwerksbetriebe',
    },
  ];
  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(2, { countySlug: 'kreis-offenbach' }, _locale),
      ...(getCountyHierarchySchema('kreis-offenbach', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website für Unternehmen im Kreis Offenbach?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Betriebe in Rodgau, Dietzenbach, Dreieich und Neu-Isenburg transparente Festpreise nach technischer Bedarfsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform im Kreis Offenbach online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Rodgau, Dietzenbach, Dreieich oder Neu-Isenburg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5, A3 und A661 sind wir von unserem Wetzlarer HQ in rund 40 Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie integrierte Recruiting-Funnels für Unternehmen im Kreis Offenbach an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir integrieren 60-Sekunden-Express-Bewerbungsstrecken zur automatisierten Mitarbeiter- und Azubigewinnung auf allen Mobilgeräten.',
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
        badgeText="REGIONALER MASTER-HUB · KREIS OFFENBACH"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Kreis Offenbach"
        description="Ihre High-Performance Webagentur für Rodgau, Dietzenbach, Dreieich, Neu-Isenburg und den gesamten Kreis Offenbach. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte B2B-Leads für Mittelstand, Handwerk und Corporate-Hubs. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Kreis Offenbach"
        sourceTag="local_seo_kreis_offenbach"
        formHeading="Kostenlose Bedarfsanalyse für Kreis Offenbach"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Kreis Offenbach Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR KREIS OFFENBACH */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Kreis Offenbach
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
              Wirtschaftskraft Kreis Offenbach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Mittelstand, Handwerk & Corporate
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Rodgauer Mittelstand, Gewerbezentren und Airport-Hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Kreis</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für regionale Kunden, B2B-Partner und mobile Nutzer.
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
              Warum Unternehmen im Kreis Offenbach auf Next.js setzen
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
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings im Kreis Offenbach)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Account Manager
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt in Hessen
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
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
                Maßgeschneiderte Webentwicklung für Mittelstand & Handwerk im Kreis Offenbach
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler baue ich Ihre Webpräsenz für den gesamten Kreis
                Offenbach: Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x effizienter
                als traditionelle Agentur-Wasserköpfe.
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

      {/* 7. SERVICES BENTO SHOWCASE (KREIS-OFFENBACH-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Kreis Offenbach
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Handwerks-Portal bis zur Corporate- & Airport-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Handwerks- & B2B-Mittelstand-Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-optimierte Plattformen mit 60-Sekunden-Express-Recruiting für Betriebe in
                Rodgau, Dietzenbach und Seligenstadt.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Cpu className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Corporate-, IT- & Airport-Plattformen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hochsichere Next.js Architekturen für internationale Konzern- und IT-Standorte in
                Neu-Isenburg und Dreieich Plaza.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Kreis Offenbach Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Spitzenrankings in allen 13 Kommunen des
                Kreises Offenbach.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Airplane className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Aviation-, Pharma- & Wissenschafts-Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Skalierbare Webauftritte für High-Tech, Medizintechnik und Behörden im Umfeld von
                Langen (DFS, Paul-Ehrlich-Institut).
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
              Wirtschaftsregion Kreis Offenbach
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Kreisstadt Dietzenbach, Mittelstandszentrum Rodgau, Airport-Hub Neu-Isenburg
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Kreis Offenbach</strong> verbindet starke handwerkliche und
              mittelständische Wurzeln in <strong>Rodgau und Dietzenbach</strong> mit global
              ausgerichteten Unternehmenszentralen in <strong>Neu-Isenburg und Dreieich</strong>{' '}
              sowie systemkritischer Luftfahrt- und Gesundheitsinfrastruktur in{' '}
              <strong>Langen</strong> (Deutsche Flugsicherung, Paul-Ehrlich-Institut). Ergänzt wird
              der Landkreis durch florierenden Tourismus und traditionsreiches Handwerk in der
              Einhardstadt <strong>Seligenstadt</strong> sowie Gewerbeparks in{' '}
              <strong>Rödermark, Obertshausen und Mühlheim</strong>. Durch die{' '}
              <strong>Autobahnen A3 und A661</strong> sowie die <strong>Bundesstraße B45</strong>{' '}
              ist der Kreis optimal vernetzt.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über A5 / A3 / A661
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Autobahnen A5, A3 oder A661</strong> sind wir in rund 40 Fahrminuten
              direkt bei Ihnen vor Ort im gesamten Kreis Offenbach. Wir garantieren Ihnen
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
              Fragen & Antworten zu Webdesign im Kreis Offenbach
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website für Unternehmen im Kreis Offenbach?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Betriebe in Rodgau, Dietzenbach, Dreieich und Neu-Isenburg
                transparente Festpreise nach technischer Bedarfsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform im Kreis Offenbach online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Rodgau, Dietzenbach, Dreieich oder Neu-Isenburg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5, A3 und A661 sind wir von unserem Wetzlarer HQ in rund
                40 Minuten direkt bei Ihnen vor Ort im Betrieb oder Büro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie integrierte Recruiting-Funnels für Unternehmen im Kreis Offenbach an?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir integrieren 60-Sekunden-Express-Bewerbungsstrecken zur automatisierten
                Mitarbeiter- und Azubigewinnung auf allen Mobilgeräten.
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
            Digitale Spitzenklasse für Ihr Unternehmen im Kreis Offenbach sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort im Kreis Offenbach.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Erstgespräch für den Kreis Offenbach anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
