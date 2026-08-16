import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
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
  Wrench,
  Hammer,
  Drop,
  Fire,
  Lightbulb,
  HouseLine,
  HardHat,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  UserCheck,
  Briefcase,
  Star,
  ClipboardText,
  Images,
  MapPin,
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
      title: 'Web Design for Craftsmen Wetzlar | Master Websites · Coday',
      description:
        'Websites for craft businesses in Wetzlar. More lucrative orders & qualified journeymen through top Google rankings. Fixed prices on request.',
      path: '/en/branchen/handwerker/wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker Wetzlar | Meister-Websites · Coday',
    description:
      'Websites für Handwerksbetriebe in Wetzlar. Mehr lukrative Komplettaufträge & qualifizierte Azubis/Gesellen durch Top-Google-Rankings. Festpreis auf Anfrage.',
    path: '/de/branchen/handwerker/wetzlar',
    type: 'money',
  });
}

export default async function HandwerkerWetzlarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const trades = [
    {
      title: 'SHK, Bäder & Heizungstausch',
      desc: 'Badsanierungs-Konfiguratoren, Wärmepumpen-Funnels & Notdienst-Rufnummern.',
      icon: Drop,
    },
    {
      title: 'Elektrotechnik & Photovoltaik',
      desc: 'Smart-Home-Lösungen, PV-Ertragsrechner & Wallbox-Installationsanfragen.',
      icon: Lightbulb,
    },
    {
      title: 'Dachdecker & Zimmerei',
      desc: 'Dachsanierungs-Visualisierung, Photovoltaik-Vorbereitung & Sturmschaden-Notfall-Formulare.',
      icon: HouseLine,
    },
    {
      title: 'Bauunternehmen & Innenausbau',
      desc: 'Projekt-Showcases für Rohbau, Sanierung, Fliesen & schlüsselfertiges Bauen.',
      icon: HardHat,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/branchen/handwerker/wetzlar#localbusiness`,
        name: 'Coday – Webagentur für Handwerker & Meisterbetriebe Wetzlar',
        url: `${BASE_URL}/${_locale}/branchen/handwerker/wetzlar`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Handwerks-Division',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.5558,
          longitude: 8.5022,
        },
        areaServed: [
          { '@type': 'City', name: 'Wetzlar' },
          { '@type': 'City', name: 'Gießen' },
          { '@type': 'City', name: 'Braunfels' },
          { '@type': 'City', name: 'Aßlar' },
          { '@type': 'City', name: 'Solms' },
          { '@type': 'City', name: 'Herborn' },
          { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
          { '@type': 'AdministrativeArea', name: 'Mittelhessen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/branchen/handwerker/wetzlar#service`,
        name: 'Webdesign & Mitarbeitergewinnung für Handwerksbetriebe Wetzlar',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Handwerker-Webdesign Wetzlar',
          '60-Sekunden-Express-Recruiting für Gesellen & Azubis',
          'Projekt- & Auftrags-Konfiguratoren (Bad, Heizung, PV)',
          'Local SEO für Handwerksbetriebe im Lahn-Dill-Kreis',
          'Next.js 15 High-Performance Webentwicklung',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/${_locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Branchen',
            item: `${BASE_URL}/${_locale}/branchen`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Handwerk & Bau',
            item: `${BASE_URL}/${_locale}/branchen/handwerker`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Handwerker Wetzlar',
            item: `${BASE_URL}/${_locale}/branchen/handwerker/wetzlar`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie hilft eine neue Website gegen den Gesellen- und Fachkräftemangel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir binden ein mobiles 60-Sekunden-Express-Bewerbungsformular ein. Gesellen, Meister und Azubis können sich ohne Anschreiben oder PDF-Lebenslauf in unter einer Minute direkt vom Smartphone aus bewerben.',
            },
          },
          {
            '@type': 'Question',
            name: 'Können wir unsere bisherigen Kundenreferenzen wie bei Batherm sehen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja! Für unseren Kunden Batherm (Sanitär & Heizung Wetzlar) haben wir eine maßgeschneiderte Next.js Plattform gebaut, die erstklassige Suchmaschinen-Rankings erzielt und kontinuierlich lukrative Komplettsanierungs-Anfragen generiert.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie filtert die Website unlukrative Kleinreparaturen heraus?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch interaktive Angebots- und Projekt-Funnels fragen wir gezielt Gewerk, Budget und Projektumfang (z.B. Komplettbad, Heizungstausch ab 15.000 €) im Vorfeld ab, sodass Sie nur vorqualifizierte Premiumanfragen erhalten.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie lange dauert die Umsetzung einer Handwerker-Website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ihr schlüsselfertiger Webauftritt ist in der Regel innerhalb von 10 bis 14 Werktagen komplett online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine professionelle Handwerker-Website in Wetzlar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren verbindlich als Festpreis auf Anfrage nach einer kostenlosen Bedarfsanalyse. Durch schlanke KI-Workflows sind wir 5–10x günstiger als traditionelle Großagenturen.',
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

      {/* 1. HERO SECTION MIT LEAD CAPTURE */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#fafafa]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-sm">
            <Wrench className="w-4 h-4 text-amber-600" />
            HANDWERK & MEISTERBETRIEBE · WETZLAR & LAHN-DILL
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Webdesign für Handwerker & Meister in{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Wetzlar
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Maßgeschneiderte Next.js Websites für Meisterbetriebe, Bauunternehmen, SHK- &
            Elektro-Fachbetriebe in Wetzlar und im Lahn-Dill-Kreis. Mehr profitable
            Komplettsanierungen, vorqualifizierte Kundenanfragen und automatisiertes
            Gesellen-Recruiting. Verbindlicher Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
              Kostenlose Handwerker-Bedarfsanalyse anfordern
            </h2>
            <LazyQuickContactForm />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">PageSpeed Score</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">&lt; 0.4s</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Ladezeit mobil</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">Top-3</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Google Maps Ranking
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">60s</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Express-Bewerbung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. 4-SÄULEN STATS BENTO GRID */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbarer Handwerker-Erfolg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Auftrags- und Personalgewinnung für Wetzlar
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Weniger unlukrative Kleinaufträge, mehr rentable Komplettsanierungen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">+240%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Großaufträge</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Vorqualifizierte Projektanfragen für Badsanierungen, Dacheindeckungen &
                Heizungsmodernisierungen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">3-5x</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mehr Bewerbungen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Qualifizierte Gesellen & Meister bewerben sich direkt in 60 Sekunden via Smartphone
                ohne Anschreiben.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">#1</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Regionale Dominanz</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Führende Google Maps und Suchmaschinen-Platzierungen für Wetzlar und den
                Lahn-Dill-Kreis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ladezeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                100/100 Core Web Vitals auf modernen Next.js 15 Serverless-Architekturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS HANDWERK VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum moderne Handwerksbetriebe auf Next.js setzen
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
                    Veraltete WordPress / Baukasten Handwerker-Seite
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Handwerker-Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Auftrags-Vorqualifizierung</td>
                  <td className="p-5 text-slate-600">
                    Klassisches Kontaktformular überflutet Betrieb mit unrentablen Kleinanfragen
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Interaktiver Projekt-Funnel mit Budget-Filter ab 10.000 €
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Mitarbeiter-Recruiting</td>
                  <td className="p-5 text-slate-600">
                    PDF-Stellenanzeigen ohne mobile Bewerbungsmöglichkeit
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    60-Sekunden-Express-Bewerbung ohne Lebenslauf & Anschreiben
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">PageSpeed & Google Ranking</td>
                  <td className="p-5 text-slate-600">
                    Langsam (3-6s Ladezeit), verliert Google Maps Top-Positionen
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    &lt; 0.4s Ladezeit, garantierte 100/100 Core Web Vitals
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Wartung & Updates</td>
                  <td className="p-5 text-slate-600">
                    Permanente Plugin-Updates, Sicherheitslücken, Hackerangriffe
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Zero Maintenance (Wartungsfrei, 100% Hacker-Immun)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Preis & Transparenz</td>
                  <td className="p-5 text-slate-600">Teure Monats-Abos & Baukasten-Gebühren</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. HANDWERK CORE FEATURES BENTO SHOWCASE */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Meisterhafte Funktionen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Funktionen für Handwerksbetriebe in Wetzlar
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Funktionen, die Zeit sparen und messbare Anfragen generieren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <ClipboardText className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Interaktiver Projekt- & Kosten-Funnel
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bauherren wählen ihr Gewerk, Budget und den Zeitplan mit wenigen Klicks aus. Sie
                erhalten nur noch detailliert vorqualifizierte Anfragen für Komplettbäder,
                Heizungsanlagen oder Neubauten.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <UserCheck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. 60-Sekunden-Mitarbeiter-Bewerbung
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gesellen und Meister können sich direkt vom Smartphone aus in unter 60 Sekunden bei
                Ihnen bewerben — ohne lästigen Papierkram, Lebenslauf oder Anschreiben.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <Images className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Vorher/Nachher-Projektgalerien
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Präsentieren Sie Ihre hochwertigen Referenzen mit interaktiven
                Vorher-Nachher-Slidern. Beweisen Sie Ihre Handwerksqualität auf den ersten Blick.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <MapPin className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Lokale Google Maps SEO-Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mit strukturierten Handwerker-Schemas, Google Unternehmensprofil-Optimierung und
                lokalen Landingpages für Wetzlar, Braunfels, Aßlar & Solms sichern wir Top-3
                Platzierungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GEWERKE-MATRIX */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Alle Gewerke
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Maßgeschneidert für Wetzlars Meisterbetriebe
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Webdesign, das exakt auf Ihr Handwerk und Ihre Zielgruppe abgestimmt ist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trades.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all"
                >
                  <Icon className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-white border-y border-slate-200 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Echtes digitales Handwerk für Wetzlars Meisterbetriebe
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz in Wetzlar verstehe ich die
                Herausforderungen des regionalen Handwerks. Bei Coday arbeiten Sie direkt mit mir –{' '}
                <strong>Umutcan Emre Tezgel</strong>. Keine Callcenter, keine Junior-Berater,
                sondern ehrliche Beratung und handgeschriebener Code zum garantierten Festpreis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">100% DSGVO & Quellcode-Besitz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Festpreis & Go-Live in 10-14 Tagen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Handwerksstandort Wetzlar & Lahn-Dill
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Starke Meisterbetriebe in Wetzlar, Dillfeld, Spilburg & Umgebung
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Das Handwerk ist das wirtschaftliche Rückgrat der Region{' '}
              <strong>Wetzlar und Lahn-Dill</strong>. Ob traditionsreiche Meisterbetriebe in den
              Gewerbegebieten <strong>Dillfeld, Spilburg oder Westend</strong>, oder
              Handwerksunternehmen in{' '}
              <strong>Braunfels, Aßlar, Solms, Schwalbach und Ehringshausen</strong>: Bauherren und
              Privatkunden suchen Fachbetriebe heute online. Eine moderne Webpräsenz, die Ihr
              Können, Ihre Meister-Qualifikation und Ihre abgeschlossenen Bauprojekte perfekt
              visualisiert, sorgt für das entscheidende Vertrauen vor der Auftragsvergabe.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Persönliche Beratung direkt bei Ihnen im Betrieb oder auf der Baustelle
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Mit unserem Hauptsitz in Wetzlar sind wir in wenigen Minuten bei Ihnen vor Ort. Wir
              fotografieren Ihre Referenzprojekte, erfassen Ihre Schwerpunkte und setzen alles
              schlüsselfertig um.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihren Betrieb: Nach einer kostenlosen Bedarfsanalyse
              erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten oder monatliche
              Lizenzfallen.
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
              Fragen & Antworten zu Handwerker-Webdesign in Wetzlar
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie hilft eine neue Website gegen den Gesellen- und Fachkräftemangel?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir binden ein mobiles 60-Sekunden-Express-Bewerbungsformular ein. Gesellen, Meister
                und Azubis können sich ohne Anschreiben oder PDF-Lebenslauf in unter einer Minute
                direkt vom Smartphone aus bewerben.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Können wir unsere bisherigen Kundenreferenzen wie bei Batherm sehen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja! Für unseren Kunden Batherm (Sanitär & Heizung Wetzlar) haben wir eine
                maßgeschneiderte Next.js Plattform gebaut, die erstklassige Suchmaschinen-Rankings
                erzielt und kontinuierlich lukrative Komplettsanierungs-Anfragen generiert.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie filtert die Website unlukrative Kleinreparaturen heraus?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Durch interaktive Angebots- und Projekt-Funnels fragen wir gezielt Gewerk, Budget
                und Projektumfang (z.B. Komplettbad, Heizungstausch ab 15.000 €) im Vorfeld ab,
                sodass Sie nur vorqualifizierte Premiumanfragen erhalten.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie lange dauert die Umsetzung einer Handwerker-Website?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ihr schlüsselfertiger Webauftritt ist in der Regel innerhalb von 10 bis 14 Werktagen
                komplett online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine professionelle Handwerker-Website in Wetzlar?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren verbindlich als Festpreis auf Anfrage nach einer kostenlosen
                Bedarfsanalyse. Durch schlanke KI-Workflows sind wir 5–10x günstiger als
                traditionelle Großagenturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für mehr Komplettaufträge & neue Gesellen in Wetzlar?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches Erstgespräch direkt mit Inhaber Umutcan Emre
            Tezgel.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Kostenlose Handwerker-Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
