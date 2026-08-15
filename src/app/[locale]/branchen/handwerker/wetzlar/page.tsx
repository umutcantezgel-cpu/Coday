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
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION MIT LEAD CAPTURE */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/25 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Wrench className="w-4 h-4 text-amber-400" />
            HANDWERK & MEISTERBETRIEBE · WETZLAR & LAHN-DILL
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Webdesign für Handwerker & Meister in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Wetzlar
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Performante Next.js Websites für SHK, Elektro, Dachdecker und Bauhandwerk im
            Lahn-Dill-Kreis. Mehr lukrative Privat- und Gewerbeaufträge, automatisierte
            Vorqualifizierung und 60-Sekunden-Recruiting für Gesellen und Azubis. Verbindlicher
            Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4 text-center">
              Kostenlose Handwerker-Bedarfsanalyse für Wetzlar anfordern
            </h2>
            <LazyQuickContactForm />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">&lt; 0.4s</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Ladezeit via Edge</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">Batherm</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Echte Wetzlarer Referenz
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">&lt; 60s</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Express-Bewerbung</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <TrustBar />
      </section>

      {/* 3. CASE STUDY HIGHLIGHT: BATHERM WETZLAR */}
      <section className="py-20 bg-amber-950/20 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Echte Kundenreferenz Wetzlar
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Batherm – Sanitär & Heizung Wetzlar
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Für Batherm haben wir eine hochmoderne Next.js Webpräsenz entwickelt, die das
                Unternehmen als führenden Experten für Badsanierung und nachhaltige Heizsysteme im
                Lahn-Dill-Kreis positioniert. Das Ergebnis: Top-Google-Rankings und ein
                kontinuierlicher Strom qualifizierter Projektanfragen.
              </p>
            </div>
            <Link href="/work/batherm">
              <Button
                variant="primary"
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold whitespace-nowrap shadow-lg shadow-amber-500/20"
              >
                Case Study ansehen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 4-SÄULEN HANDWERK STATS BENTO GRID */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbarer Handwerks-Erfolg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Schlagkraft für Ihren Meisterbetrieb in Wetzlar
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Mehr Wertschöpfung pro Auftrag und qualifizierte Fachkräfte aus der Region.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">+180%</div>
              <h3 className="text-lg font-bold text-white mb-2">Komplettaufträge</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Vorqualifizierte Projektanfragen für Badsanierungen, Wärmepumpen und PV-Anlagen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">&lt; 60s</div>
              <h3 className="text-lg font-bold text-white mb-2">Bewerbungsdauer</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gesellen und Azubis bewerben sich ohne Hürden direkt vom Smartphone aus.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">100%</div>
              <h3 className="text-lg font-bold text-white mb-2">Code-Eigentum</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Keine monatlichen Lizenz-Abos wie bei MyHammer, Handwerker-Portalen oder Baukästen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Ladezeit</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Optimiert für Kunden und Bauherren, die Angebote direkt mobil vergleichen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE: NEXT.JS HANDWERK VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Meisterbetriebe in Wetzlar auf Next.js setzen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der direkte Vergleich zwischen trägem WordPress/Baukasten und moderner Webentwicklung.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-5 text-sm font-semibold text-slate-300">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-400">
                    Veraltete WordPress / Wix Handwerker-Website
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-400 bg-amber-950/30">
                    Coday Next.js 15 Handwerk Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Mitarbeiter-Recruiting</td>
                  <td className="p-5 text-slate-400">
                    Statische PDF-Dateien (0 Bewerbungen von Gesellen)
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    60-Sekunden-Express-Recruiting via Smartphone
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Auftrags-Vorqualifizierung</td>
                  <td className="p-5 text-slate-400">
                    Einfaches Kontaktformular führt zu unrentablen Preisanfragen
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Interaktive Projekt-Funnels filtern Premium-Aufträge
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Ladezeit auf Smartphones</td>
                  <td className="p-5 text-slate-400">
                    3.5s – 5.0s (Kunden springen sofort wieder ab)
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    &lt; 0.4s (Sofortige Anzeige von Projekten & Notdienst)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Google Sichtbarkeit Wetzlar</td>
                  <td className="p-5 text-slate-400">Auf Seite 3 oder 4 versteckt</td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Garantiert Seite 1 bei lokalen Suchbegriffen
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Preisstruktur</td>
                  <td className="p-5 text-slate-400">
                    Monatliche Abo-Kosten & teure Portal-Provisionen
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. HANDWERKS-GEWERKE-MATRIX WETZLAR */}
      <section className="py-24 bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Gewerke-Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Spezialisierte Weblösungen für jedes Gewerk in Wetzlar
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Von der Badsanierung bis zum Dachausbau: Maßgeschneidert für Ihren Betrieb.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trades.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group"
                >
                  <Icon className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3">{t.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2 mb-6">
                Echtes digitales Handwerk für Handwerksmeister in Wetzlar
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz direkt in Wetzlar verstehe ich die
                Realität des Handwerks: Sie brauchen keine leeren Marketing-Versprechen, sondern
                eine Website, die Ihnen das Telefon von unrentablen Kleinstaufträgen freihält,
                hochwertige Projekte bringt und Gesellen anzieht. Bei Coday arbeiten Sie direkt mit
                mir – <strong>Umutcan Emre Tezgel</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">Voller Quellcode-Besitz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">Festpreis & Go-Live in 10-14 Tagen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-slate-900/20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Handwerksstandort Wetzlar & Lahn-Dill
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-6">
              Starke Meisterbetriebe in Wetzlar, Dillfeld, Spilburg & Umgebung
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
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
            <h3 className="text-2xl font-bold text-white mb-4">
              Persönliche Beratung direkt bei Ihnen im Betrieb oder auf der Baustelle
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Mit unserem Hauptsitz in Wetzlar sind wir in wenigen Minuten bei Ihnen vor Ort. Wir
              fotografieren Ihre Referenzprojekte, erfassen Ihre Schwerpunkte und setzen alles
              schlüsselfertig um.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihren Betrieb: Nach einer kostenlosen Bedarfsanalyse
              erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten oder monatliche
              Lizenzfallen.
            </p>
          </div>
        </div>
      </section>

      {/* 9. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Fragen & Antworten zu Handwerker-Webdesign in Wetzlar
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie hilft eine neue Website gegen den Gesellen- und Fachkräftemangel?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir binden ein mobiles 60-Sekunden-Express-Bewerbungsformular ein. Gesellen, Meister
                und Azubis können sich ohne Anschreiben oder PDF-Lebenslauf in unter einer Minute
                direkt vom Smartphone aus bewerben.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Können wir unsere bisherigen Kundenreferenzen wie bei Batherm sehen?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ja! Für unseren Kunden Batherm (Sanitär & Heizung Wetzlar) haben wir eine
                maßgeschneiderte Next.js Plattform gebaut, die erstklassige Suchmaschinen-Rankings
                erzielt und kontinuierlich lukrative Komplettsanierungs-Anfragen generiert.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie filtert die Website unlukrative Kleinreparaturen heraus?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Durch interaktive Angebots- und Projekt-Funnels fragen wir gezielt Gewerk, Budget
                und Projektumfang (z.B. Komplettbad, Heizungstausch ab 15.000 €) im Vorfeld ab,
                sodass Sie nur vorqualifizierte Premiumanfragen erhalten.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie lange dauert die Umsetzung einer Handwerker-Website?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ihr schlüsselfertiger Webauftritt ist in der Regel innerhalb von 10 bis 14 Werktagen
                komplett online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie viel kostet eine professionelle Handwerker-Website in Wetzlar?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir kalkulieren verbindlich als Festpreis auf Anfrage nach einer kostenlosen
                Bedarfsanalyse. Durch schlanke KI-Workflows sind wir 5–10x günstiger als
                traditionelle Großagenturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-t from-amber-950/40 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für mehr Komplettaufträge & neue Gesellen in Wetzlar?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches Erstgespräch direkt mit Inhaber Umutcan Emre
            Tezgel.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
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
