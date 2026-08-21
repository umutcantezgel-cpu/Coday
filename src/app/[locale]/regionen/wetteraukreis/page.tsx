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
  Heartbeat,
  Package,
  Wrench,
  GraduationCap,
  FirstAid,
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
      title: 'Web Design Wetterau District | Web Agency & SEO · Coday',
      description:
        'Web design for Wetterau district: Next.js websites for Friedberg, Bad Nauheim, Butzbach & Karben. Fixed price quotes on request.',
      keywords: [
        'Web Design Wetterau District',
        'Web Agency Wetterau',
        'Website Creation Bad Nauheim Butzbach Karben',
        'Web Development Central Hesse',
        'Coday Web Wetterau',
      ],
      path: '/en/regionen/wetteraukreis',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wetteraukreis | Webagentur & SEO · Coday',
    description:
      'Webdesign für den Wetteraukreis: Next.js Websites für Friedberg, Bad Nauheim, Butzbach & Karben. Verbindliche Festpreise auf Anfrage.',
    keywords: [
      'Webdesign Wetteraukreis',
      'Webagentur Wetterau',
      'Website erstellen Bad Nauheim Butzbach Karben',
      'Webentwicklung Mittelhessen',
      'Coday Web Wetterau',
    ],
    path: '/de/regionen/wetteraukreis',
    type: 'money',
  });
}

export default async function WetteraukreisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const kommunen = [
    {
      name: 'Friedberg (Kreisstadt)',
      link: '/webdesign-friedberg',
      highlight: true,
      note: 'THM Campus & B2B-Zentrum',
    },
    {
      name: 'Bad Nauheim',
      link: '/webdesign-friedberg',
      highlight: true,
      note: 'Gesundheits-, Klinik- & Kurstadt',
    },
    {
      name: 'Bad Vilbel',
      link: '/webdesign-bad-vilbel',
      highlight: true,
      note: 'Quellen-, Medien- & Pharmastadt',
    },
    {
      name: 'Butzbach',
      link: '/webdesign-friedberg',
      highlight: true,
      note: 'Industrie & Handwerk an der B3',
    },
    {
      name: 'Karben',
      link: '/webdesign-bad-vilbel',
      highlight: true,
      note: 'Hightech, Automotive & Gewerbe',
    },
    {
      name: 'Rosbach vor der Höhe',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Logistik & Dienstleistung an der A5',
    },
    {
      name: 'Büdingen',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Mittelstand, Kultur & Handwerk',
    },
    {
      name: 'Nidda',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handels- & Handwerkszentrum Ost-Wetterau',
    },
    {
      name: 'Altenstadt',
      link: '/webdesign-bad-vilbel',
      highlight: false,
      note: 'Gewerbe & Industrie an der A45',
    },
    {
      name: 'Wölfersheim',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Logistik- & Gewerbestandort',
    },
    {
      name: 'Florstadt',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerk & lokales Gewerbe',
    },
    {
      name: 'Münzenberg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Gewerbe, Geschichte & Handwerk',
    },
    {
      name: 'Rockenberg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerksbetriebe & Wohnen',
    },
    {
      name: 'Reichelsheim',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Flugplatz, Gewerbe & Dienstleistung',
    },
    {
      name: 'Gedern',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Vogelsberg-Tourismus & Handwerk',
    },
    {
      name: 'Ortenberg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerk & Gewerbebetriebe',
    },
    {
      name: 'Ranstadt',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Lokales Gewerbe & Dienstleistung',
    },
    {
      name: 'Glauburg',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Kultur, Tourismus & Handwerk',
    },
    {
      name: 'Hirzenhain',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Gusstechnik & Industrie',
    },
    {
      name: 'Limeshain',
      link: '/webdesign-bad-vilbel',
      highlight: false,
      note: 'Gewerbeparks & Handwerk',
    },
    {
      name: 'Ober-Mörlen',
      link: '/webdesign-friedberg',
      highlight: false,
      note: 'Handwerk & A5-Gewerbeanbindung',
    },
  ];

  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(2, { countySlug: 'wetteraukreis' }, _locale),
      ...(getCountyHierarchySchema('wetteraukreis', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne Website im Wetteraukreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir vereinbaren für Facharztpraxen in Bad Nauheim, THM-Spin-offs in Friedberg und Industrieunternehmen in Butzbach oder Bad Vilbel transparente Festpreise nach technischer Leistungsanalyse.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine Next.js Plattform im Wetteraukreis online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online erreichbar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Vor-Ort-Termine nach Friedberg, Bad Nauheim, Butzbach oder Bad Vilbel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, sehr gerne. Über die A5 und B3 sind wir von unserem Wetzlarer HQ in rund 25 Minuten direkt bei Ihnen vor Ort im Betrieb, der Klinik oder dem Büro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie barrierefreie Lösungen nach BITV 2.0 für Rehakliniken und Praxen im Wetteraukreis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir programmieren barrierefreie (WCAG / BITV 2.0 konforme) Patientenportale mit hochsicheren Online-Formularen.',
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
        badgeText="REGIONALER MASTER-HUB · WETTERAUKREIS"
        headline="Webdesign & Next.js Entwicklung im"
        headlineGradient="Wetteraukreis"
        description="Ihre regionale High-End Webagentur für Friedberg, Bad Nauheim, Bad Vilbel und den gesamten Wetteraukreis. Blitzschnelle Next.js Webapplikationen, modernste Headless-Systeme und automatisierte B2B-Leads für Praxen, Handwerk und Mittelstand. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Wetteraukreis"
        sourceTag="local_seo_wetteraukreis"
        formHeading="Kostenlose Bedarfsanalyse für Wetteraukreis"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Wetterauer Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. INTERAKTIVER STÄDTE-NAVIGATOR WETTERAUKREIS */}
      <section className="py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Städte & Gemeinden im Wetteraukreis
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
              Wirtschaftskraft Wetterau
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Praxen, Mittelstand & Industrie
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-End Webentwicklung für Gesundheitswirtschaft, THM-Spin-offs und Gewerbe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit im Wetteraukreis</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für Patienten, B2B-Kunden und mobile Nutzer.
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
              Warum Unternehmen im Wetteraukreis auf Next.js setzen
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
                    Garantiert 100/100 (Top-Rankings im Wetteraukreis)
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
                Maßgeschneiderte Webentwicklung für Gesundheitswirtschaft, THM-Spin-offs &
                Wetterauer Mittelstand
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Als
                spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Ihre Webpräsenz für den
                gesamten Wetteraukreis: Technisch perfekt, ausdrucksstark und wirtschaftlich 5–10x
                effizienter als traditionelle Agentur-Wasserköpfe.
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

      {/* 7. SERVICES BENTO SHOWCASE (WETTERAUKREIS-FOKUS) */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für den Wetteraukreis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Klinik-Portal bis zur Industrie- & Medien-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <FirstAid className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Facharztpraxen & Klinik-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Barrierefrei nach BITV 2.0 / WCAG für Praxen, Rehakliniken und Gesundheitszentren in
                Bad Nauheim und Friedberg mit geschützter Online-Terminvergabe.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <GraduationCap className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. THM-Tech & B2B-Mittelstand
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Skalierbare Next.js Systeme für IT-Unternehmen, Ingenieurdienstleister und Spin-offs
                am Hochschulstandort Friedberg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO Wetteraukreis Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in allen 21 Kommunen des
                Wetteraukreises.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Buildings className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Industrie, Medien & Handwerk
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Performante Webportale für Butzbach, Bad Vilbel, Karben und Rosbach mit
                60-Sekunden-Express-Recruiting für Fachkräfte.
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
              Wirtschaftsregion Wetteraukreis
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Kreisstadt Friedberg, Gesundheitsstadt Bad Nauheim, Medienstandort Bad Vilbel
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Der <strong>Wetteraukreis</strong> ist eine der wirtschaftlich dynamischsten Regionen
              Hessens. Er verbindet universitäre Ingenieursausbildung am{' '}
              <strong>THM-Campus Friedberg</strong> mit international renommierter Spitzenmedizin in{' '}
              <strong>Bad Nauheim</strong> (Kerckhoff-Klinik), starker Medien- und Pharmawirtschaft
              in <strong>Bad Vilbel</strong> sowie solidem Industriemittelstand in{' '}
              <strong>Butzbach, Karben und Rosbach</strong>. Durch die
              <strong>Bundesautobahn A5</strong> und die <strong>Bundesstraße B3</strong> ist der
              Kreis direkt an das Rhein-Main-Gebiet und Mittelhessen angebunden.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Schnelle Erreichbarkeit über B3 / A5
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesstraße B3 oder die Autobahn A5</strong> sind wir in rund 25
              Fahrminuten direkt bei Ihnen vor Ort im gesamten Wetteraukreis. Wir garantieren Ihnen
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
              Fragen & Antworten zu Webdesign im Wetteraukreis
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne Website im Wetteraukreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir vereinbaren für Facharztpraxen in Bad Nauheim, THM-Spin-offs in Friedberg und
                Industrieunternehmen in Butzbach oder Bad Vilbel transparente Festpreise nach
                technischer Leistungsanalyse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine Next.js Plattform im Wetteraukreis online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online erreichbar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Vor-Ort-Termine nach Friedberg, Bad Nauheim, Butzbach oder Bad
                Vilbel?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die A5 und B3 sind wir von unserem Wetzlarer HQ in rund 25
                Minuten direkt bei Ihnen vor Ort im Betrieb, der Klinik oder dem Büro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie barrierefreie Lösungen nach BITV 2.0 für Rehakliniken und Praxen im
                Wetteraukreis?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir programmieren barrierefreie (WCAG / BITV 2.0 konforme) Patientenportale mit
                hochsicheren Online-Formularen.
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
            Digitale Spitzenklasse für Ihr Unternehmen im Wetteraukreis sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort im Wetteraukreis.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Erstgespräch für den Wetteraukreis anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
