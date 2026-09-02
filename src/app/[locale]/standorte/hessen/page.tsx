import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import {
  getHessenMasterSchema,
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
  MapPin,
  ChartBar,
  Star,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  Factory,
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
      title: 'Web Design Hesse | Leading Next.js Web Agency · Coday',
      description:
        'High-end web design & Next.js development across Hesse. 100/100 Core Web Vitals, blazing fast load times & measurable leads for German SMEs.',
      keywords: [
        'Web Design Hesse',
        'Web Agency Hesse',
        'Website Creation Hesse',
        'Next.js Agency Hesse',
        'Coday Web Hesse',
      ],
      path: '/en/standorte/hessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Hessen | Führende Next.js Webagentur · Coday',
    description:
      'High-End Webdesign & Next.js Entwicklung in ganz Hessen. 100/100 Core Web Vitals, blitzschnelle Ladezeiten & messbare Leads für den hessischen Mittelstand.',
    keywords: [
      'Webdesign Hessen',
      'Webagentur Hessen',
      'Website erstellen Hessen',
      'Next.js Agentur Hessen',
      'Coday Web Hessen',
    ],
    path: '/de/standorte/hessen',
    type: 'money',
  });
}

export default async function HessenMasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const regions = [
    {
      title: 'Mittelhessen (HQ Region)',
      badge: 'Agentur-Hauptsitz Wetzlar',
      desc: 'Optik, Feinmechanik, Medizintechnik & universitärer Mittelstand.',
      locations: [
        {
          name: 'Wetzlar (Agentur-HQ)',
          link: '/webdesign-agentur-wetzlar',
          highlight: true,
          note: 'Optik- & MedTech-Zentrum',
        },
        {
          name: 'Gießen',
          link: '/webdesign-giessen',
          highlight: true,
          note: 'Universitätsstadt & Kliniken',
        },
        {
          name: 'Marburg',
          link: '/webdesign-marburg',
          highlight: true,
          note: 'Behringwerke & Biotech',
        },
        {
          name: 'Herborn',
          link: '/webdesign-herborn',
          highlight: false,
          note: 'Schaltschrankbau & Industrie',
        },
        {
          name: 'Dillenburg',
          link: '/webdesign-dillenburg',
          highlight: false,
          note: 'Kupfer, Stahl & Maschinenbau',
        },
        {
          name: 'Limburg an der Lahn',
          link: '/webdesign-limburg',
          highlight: true,
          note: 'ICE-City & Großhandel',
        },
        {
          name: 'Weilburg',
          link: '/webdesign-weilburg',
          highlight: false,
          note: 'Residenzstadt & Maschinenbau',
        },
        {
          name: 'Löhnberg',
          link: '/webdesign-loehnberg',
          highlight: false,
          note: 'Handwerk & Mittelstand im Lahntal',
        },
        {
          name: 'Landkreis Lahn-Dill',
          link: '/regionen/landkreis-lahn-dill',
          highlight: false,
          note: 'Master-Kreis-Hub (23 Kommunen)',
        },
        {
          name: 'Landkreis Gießen',
          link: '/regionen/landkreis-giessen',
          highlight: false,
          note: 'Master-Kreis-Hub (18 Kommunen)',
        },
        {
          name: 'Landkreis Marburg-Biedenkopf',
          link: '/regionen/landkreis-marburg-biedenkopf',
          highlight: false,
          note: 'Master-Kreis-Hub (13 Kommunen)',
        },
        {
          name: 'Landkreis Limburg-Weilburg',
          link: '/regionen/landkreis-limburg-weilburg',
          highlight: false,
          note: 'Master-Kreis-Hub (15 Kommunen)',
        },
      ],
    },
    {
      title: 'Rhein-Main & Taunus',
      badge: 'Wirtschaftsmetropole',
      desc: 'Finanzplatz, Großkonzerne, Beratung, Kanzleien & High-Tech.',
      locations: [
        {
          name: 'Frankfurt am Main',
          link: '/webdesign-frankfurt',
          highlight: true,
          note: 'FinTech, Enterprise & B2B',
        },
        {
          name: 'Wiesbaden',
          link: '/webdesign-wiesbaden',
          highlight: true,
          note: 'Landeshauptstadt, Kanzleien & Praxen',
        },
        {
          name: 'Bad Homburg',
          link: '/webdesign-bad-homburg',
          highlight: true,
          note: 'MedTech & Family Offices',
        },
        {
          name: 'Oberursel',
          link: '/webdesign-oberursel',
          highlight: false,
          note: 'IT & Consulting Hub',
        },
        {
          name: 'Bad Vilbel',
          link: '/webdesign-bad-vilbel',
          highlight: false,
          note: 'Medien & Pharma-Drehscheibe',
        },
        {
          name: 'Offenbach am Main',
          link: '/webdesign-offenbach',
          highlight: true,
          note: 'Kreativwirtschaft & Automotive',
        },
        {
          name: 'Hanau',
          link: '/webdesign-hanau',
          highlight: true,
          note: 'Materialtechnik & Chemie',
        },
        {
          name: 'Hofheim am Taunus',
          link: '/webdesign-hofheim',
          highlight: false,
          note: 'Kreisstadt MTK & Mittelstand',
        },
        {
          name: 'Rüsselsheim am Main',
          link: '/webdesign-ruesselsheim',
          highlight: false,
          note: 'Mobilität & Ingenieurbau',
        },
        {
          name: 'Rodgau',
          link: '/webdesign-rodgau',
          highlight: false,
          note: 'B2B-Gewerbe & Logistik',
        },
        {
          name: 'Dietzenbach',
          link: '/webdesign-dietzenbach',
          highlight: false,
          note: 'Kreisstadt Offenbach & IT',
        },
        {
          name: 'Wetteraukreis',
          link: '/regionen/wetteraukreis',
          highlight: false,
          note: 'Master-Kreis-Hub (21 Kommunen)',
        },
        {
          name: 'Hochtaunuskreis',
          link: '/regionen/hochtaunuskreis',
          highlight: false,
          note: 'Master-Kreis-Hub (12 Kommunen)',
        },
        {
          name: 'Main-Taunus-Kreis',
          link: '/regionen/main-taunus-kreis',
          highlight: false,
          note: 'Master-Kreis-Hub (12 Kommunen)',
        },
        {
          name: 'Kreis Offenbach',
          link: '/regionen/kreis-offenbach',
          highlight: false,
          note: 'Master-Kreis-Hub (13 Kommunen)',
        },
        {
          name: 'Main-Kinzig-Kreis',
          link: '/regionen/main-kinzig-kreis',
          highlight: false,
          note: 'Master-Kreis-Hub (13 Kommunen)',
        },
        {
          name: 'Rheingau-Taunus-Kreis',
          link: '/regionen/rheingau-taunus-kreis',
          highlight: false,
          note: 'Master-Kreis-Hub (13 Kommunen)',
        },
      ],
    },
    {
      title: 'Südhessen & Bergstraße',
      badge: 'Wissenschaft & Innovation',
      desc: 'Software-Cluster, Raumfahrt, TU-Spin-offs, Chemie & Weinbau.',
      locations: [
        {
          name: 'Darmstadt',
          link: '/webdesign-darmstadt',
          highlight: true,
          note: 'Wissenschaftsstadt & Tech-Hub',
        },
        {
          name: 'Bensheim',
          link: '/webdesign-bensheim',
          highlight: true,
          note: 'Medizintechnik & Bergstraße',
        },
        {
          name: 'Friedberg',
          link: '/webdesign-friedberg',
          highlight: false,
          note: 'Kreisstadt Wetterau & THM-Campus',
        },
        {
          name: 'Landkreis Darmstadt-Dieburg',
          link: '/regionen/landkreis-darmstadt-dieburg',
          highlight: false,
          note: 'Master-Kreis-Hub (12 Kommunen)',
        },
      ],
    },
    {
      title: 'Nordhessen & Osthessen',
      badge: 'Mobilität & Logistik',
      desc: 'Automotive, Güterverkehrszentren, Erneuerbare Energien & IT.',
      locations: [
        {
          name: 'Kassel',
          link: '/webdesign-kassel',
          highlight: true,
          note: 'Mobilität, Maschinenbau & Science Park',
        },
        {
          name: 'Landkreis Kassel',
          link: '/regionen/landkreis-kassel',
          highlight: false,
          note: 'Baunatal VW-Werk & GVZ Lohfelden',
        },
        {
          name: 'Fulda',
          link: '/webdesign-fulda',
          highlight: true,
          note: 'Osthessen-Zentrum & ICE-Knoten',
        },
        {
          name: 'Landkreis Fulda',
          link: '/regionen/landkreis-fulda',
          highlight: false,
          note: 'Industriepark Rhön & Hünfeld IT',
        },
      ],
    },
  ];

  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(1, {}, _locale),
      ...(getHessenMasterSchema(_locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine professionelle Website bei Coday in Hessen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und verbindlich als Festpreis auf Anfrage. Durch unsere schlanken Next.js Architekturen und direkte Inhaber-Realisierung bieten wir maximale Kosteneffizienz bei höchster technischer Performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Website in Hessen online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie Vor-Ort-Termine in ganz Hessen an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, absolut. Durch unsere zentrale Lage in Wetzlar an den Autobahnen A45 und A5 erreichen wir Frankfurt, Wiesbaden, Gießen, Marburg, Limburg, Darmstadt, Fulda und Kassel schnell für persönliche Termine vor Ort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen Ihre Websites alle DSGVO- und Barrierefreiheits-Standards?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Alle Webapplikationen werden DSGVO-konform auf deutschen Servern gehostet und erfüllen moderne Barrierefreiheits-Standards (BITV 2.0 / WCAG 2.1 AA).',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer betreut mein Projekt persönlich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber Umutcan Emre Tezgel persönlich ohne zwischengeschaltete Account Manager oder Callcenter.',
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
        badgeText="HESSEN MASTER-HUB · ALLE 23 STÄDTE & REGIONEN"
        headline="Webdesign & Next.js Entwicklung in"
        headlineGradient="ganz Hessen"
        description="Ihre High-End Webagentur mit Hauptsitz in Wetzlar. Blitzschnelle Next.js Architekturen, moderne Headless-Systeme und automatisierte Leads für Mittelstand, Industrie und Tech-Unternehmen in allen Regionen Hessens. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Hessen"
        sourceTag="local_seo_hessen"
        formHeading="Kostenlose Bedarfsanalyse für Hessen"
        formSubtitle="Direkte Prüfung Ihrer Anforderungen durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Hessenweite Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER HESSEN-NAVIGATOR MIT REGIONAL-CLUSTERN */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Hessenweiter Standort-Navigator
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Wählen Sie Ihre Stadt oder Ihren Landkreis in Hessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Direktzugriff auf alle 23 Städte-Flaggschiffe und 10 Landkreis-Hubs im Coday Netzwerk.
            </p>
          </div>

          <div className="space-y-16">
            {regions.map((reg) => (
              <div
                key={reg.title}
                className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      <Compass className="w-6 h-6 text-amber-600" />
                      {reg.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">{reg.desc}</p>
                  </div>
                  <span className="self-start sm:self-auto px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                    {reg.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reg.locations.map((loc) => (
                    <Link
                      key={loc.name}
                      href={loc.link}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                        loc.highlight
                          ? 'bg-white border-amber-500/40 hover:border-amber-500 hover:shadow-md'
                          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin
                            className={`w-4 h-4 ${loc.highlight ? 'text-amber-600' : 'text-slate-400'}`}
                          />
                          <p className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-sm sm:text-base">
                            {loc.name}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{loc.note}</p>
                      </div>
                      <CaretRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 4-PILLAR STATS BENTO GRID */}
      <section className="py-24 relative bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Performance-Metriken
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für hessische Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Next.js 15 Architekturen setzen den Maßstab für Ladezeiten, Sicherheit und
              Lead-Generierung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Hessen</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten via deutsches Edge-Hosting für maximale Conversion-Rates.
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
              Warum Unternehmen in Hessen auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings in ganz Hessen)
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
                Echtes Handwerk statt Agentur-Overhead für Hessen
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Hauptsitz in Wetzlar baue ich Ihre Webpräsenz
                für ganz Hessen: Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x
                effizienter als traditionelle Agentur-Wasserköpfe.
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
                  <span className="text-slate-700">Festpreis & volle Kostensicherheit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICES BENTO SHOWCASE (HESSENWEIT) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den hessischen Mittelstand
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Maßgeschneiderte Webentwicklung für anspruchsvolle Unternehmen in ganz Hessen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Code className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Enterprise- & Headless-Webentwicklung
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Modernste Next.js 15 Architekturen mit Sanity Headless CMS für maximale Ladezeiten,
                höchste Sicherheit und intuitive Content-Pflege.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Local SEO & Hessen-Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Strukturierte Schema.org-Daten, semantisches Content-Design und Generative Engine
                Optimization (GEO) für Spitzenrankings bei Google & KI-Suchmaschinen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Users className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. B2B-Leadgenerierung & Express-Recruiting
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conversion-optimierte Funnels mit 60-Sekunden-Bewerbungen für qualifizierte
                Fachkräfte ohne zeitraubende Anschreiben.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <ShieldCheck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. 100% DSGVO & Deutsche Hochsicherheit
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Datenschutzkonforme Infrastruktur ohne US-Tracking-Abhängigkeiten in
                ISO-zertifizierten deutschen Rechenzentren (Frankfurt am Main).
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
              Wirtschaftsstandort Hessen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Vom Rhein-Main-Gebiet über Mittelhessen bis nach Nord- und Osthessen
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Das Bundesland <strong>Hessen</strong> zählt zu den stärksten Wirtschaftsräumen
              Europas. Es gliedert sich in die drei Regierungsbezirke{' '}
              <strong>Gießen (Mittelhessen)</strong>,
              <strong>Darmstadt (Rhein-Main & Südhessen)</strong> und{' '}
              <strong>Kassel (Nord- & Osthessen)</strong>. Vom globalen Finanzplatz{' '}
              <strong>Frankfurt am Main</strong> und der Landeshauptstadt <strong>Wiesbaden</strong>
              über die weltweiten Optik- und MedTech-Pioniere in{' '}
              <strong>Wetzlar, Gießen und Marburg</strong>
              bis zu den Automobil- und Logistikdrehkreuzen in{' '}
              <strong>Kassel, Baunatal und Fulda</strong> – über die{' '}
              <strong>Bundesautobahnen A3, A5, A7, A45 und A66</strong> bieten wir Ihnen persönliche
              Betreuung direkt vor Ort.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Zentrale Lage in Wetzlar & Schnelle Vor-Ort-Erreichbarkeit
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Durch unseren <strong>Hauptsitz in Wetzlar</strong> im Herzen Hessens sind wir
              innerhalb von 30 bis 75 Fahrminuten in praktisch jeder hessischen Stadt direkt bei
              Ihnen im Unternehmen.
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
              Fragen & Antworten zu Webdesign in Hessen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine professionelle Website bei Coday in Hessen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren jedes Projekt nach einem kostenlosen Erstgespräch transparent und
                verbindlich als Festpreis auf Anfrage. Durch unsere hochgradig optimierten
                KI-Workflows sind wir 5–10x günstiger als traditionelle Großagenturen bei
                signifikant höherer Performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Website in Hessen online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie Vor-Ort-Termine in ganz Hessen an?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, absolut. Durch unsere zentrale Lage in Wetzlar an den Autobahnen A45 und A5
                erreichen wir Frankfurt, Wiesbaden, Gießen, Marburg, Limburg, Darmstadt, Fulda und
                Kassel schnell für persönliche Termine.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen Ihre Websites alle DSGVO- und Barrierefreiheits-Standards?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Alle Webapplikationen werden DSGVO-konform auf deutschen Servern gehostet und
                erfüllen moderne Barrierefreiheits-Standards (BITV 2.0 / WCAG 2.1 AA).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer betreut mein Projekt persönlich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber Umutcan Emre Tezgel persönlich ohne zwischengeschaltete Account Manager oder
                Callcenter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenklasse für Ihr Unternehmen in ganz Hessen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihr hessenweites Webprojekt.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Erstgespräch für Hessen anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
