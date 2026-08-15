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
  Car,
  CurrencyEur,
  CalendarCheck,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  UserCheck,
  Browsers,
  SteeringWheel,
  Handshake,
  MagnifyingGlass,
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
      title: 'Web Design for Car Dealerships Hesse | Coday Automotive Web',
      description:
        'High-performance websites for car dealerships in Hesse. Fast vehicle showcase, online test drive booking & SEO. Fixed prices on request.',
      path: '/en/branchen/automobil/autohaendler',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Autohändler Hessen | Coday Automotive Web',
    description:
      'Websites für Autohäuser & Fahrzeughändler in Hessen. Schnelle Fahrzeugpräsentation, mobile Probefahrt-Buchung & SEO. Festpreise auf Anfrage.',
    path: '/de/branchen/automobil/autohaendler',
    type: 'money',
  });
}

export default async function AutohaendlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const dealershipServices = [
    {
      title: 'Digitaler Showroom & Fahrzeugfilter',
      desc: 'Blitzschnelle Fahrzeugsuche nach Marke, Modell, Kraftstoffart, Getriebe und Preissegment ohne Ladezeiten.',
      icon: Browsers,
    },
    {
      title: 'Inzahlungnahme & Fahrzeugbewertung',
      desc: 'Integrierter Ankaufs-Funnel: Kunden laden Fahrzeugdaten & Fotos hoch und erhalten ein schnelles Angebot.',
      icon: Handshake,
    },
    {
      title: 'Probefahrt-Buchung & Terminkalender',
      desc: 'Direkte Online-Reservierung von Probefahrten mit Führerschein-Vorabprüfung und automatischer SMS/E-Mail-Bestätigung.',
      icon: SteeringWheel,
    },
    {
      title: 'Finanzierungs- & Leasing-Rechner',
      desc: 'Transparente monatliche Raten-Kalkulation mit flexiblen Laufzeiten, Anzahlungen und Schlussraten direkt am Inserat.',
      icon: CurrencyEur,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/branchen/automobil/autohaendler#localbusiness`,
        name: 'Coday – Webdesign & Software für Autohäuser & Autohändler Hessen',
        url: `${BASE_URL}/${_locale}/branchen/automobil/autohaendler`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Automotive Retail Division',
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
          { '@type': 'AdministrativeArea', name: 'Hessen' },
          { '@type': 'City', name: 'Wetzlar' },
          { '@type': 'City', name: 'Frankfurt am Main' },
          { '@type': 'City', name: 'Gießen' },
          { '@type': 'City', name: 'Kassel' },
          { '@type': 'City', name: 'Wiesbaden' },
          { '@type': 'City', name: 'Darmstadt' },
          { '@type': 'City', name: 'Offenbach' },
          { '@type': 'City', name: 'Hanau' },
          { '@type': 'City', name: 'Fulda' },
          { '@type': 'City', name: 'Limburg' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/branchen/automobil/autohaendler#service`,
        name: 'Webdesign & Digitale Showrooms für Autohäuser Hessen',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Autohaus Webdesign Hessen',
          'Digitaler Fahrzeug-Showroom & Filter',
          'Inzahlungnahme & Ankauf-Funnels',
          'Probefahrt-Buchungssysteme',
          'Local SEO für Autohändler & Fahrzeughäuser',
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
            name: 'Automobil',
            item: `${BASE_URL}/${_locale}/branchen/automobil`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Autohändler & Autohäuser Hessen',
            item: `${BASE_URL}/${_locale}/branchen/automobil/autohaendler`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Können Fahrzeuge automatisch aus mobile.de oder AutoScout24 importiert werden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln Schnittstellen, die Ihren Fahrzeugbestand direkt synchronisieren, sodass Sie Fahrzeuge nur einmal in Ihrer Händlersoftware pflegen müssen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie funktioniert der digitale Inzahlungnahme-Funnel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kaufinteressenten können direkt am Wunschfahrzeug die Daten ihres aktuellen Autos (Kilometerstand, Erstzulassung, Zustand, Fotos) eingeben. Sie erhalten eine vollständige Lead-Mappe zur schnellen Kalkulation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Warum ist eine eigene Website trotz Autobörsen unverzichtbar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Auf Autobörsen konkurrieren Sie direkt über den Preis und der Kunde sieht sofort Angebote von Mitbewerbern. Auf Ihrer eigenen High-Speed-Website bauen Sie Vertrauen auf, vermarkten Zusatzgarantien, Finanzierungen und binden Kunden an Ihr Autohaus.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Autohaus-Website online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ihr neuer digitaler Showroom ist in der Regel innerhalb von 10 bis 14 Werktagen schlüsselfertig online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine professionelle Autohaus-Website in Hessen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren transparent und verbindlich als Festpreis auf Anfrage nach einer kostenlosen Bedarfsanalyse. Durch schlanke KI-Workflows sind wir 5–10x günstiger als traditionelle Großagenturen.',
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
            <Car className="w-4 h-4 text-amber-400" />
            FAHRZEUGHANDEL & AUTOHÄUSER · HESSENWEIT
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Webdesign für Autohändler & Autohäuser in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Hessen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            High-Performance Next.js Websites für Mehrmarken-Autohäuser, Gebrauchtwagenhändler und
            Premium-Fahrzeughändler in ganz Hessen. Blitzschneller digitaler Showroom,
            automatisierte Inzahlungnahme-Funnels und mehr qualifizierte Probefahrt-Termine.
            Verbindlicher Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4 text-center">
              Kostenlose Autohaus-Bedarfsanalyse anfordern
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">Live Sync</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Börsen-Schnittstellen
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">10-14 Tage</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Schlüsselfertiger Go-Live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <TrustBar />
      </section>

      {/* 3. 4-SÄULEN AUTOHAUS STATS BENTO GRID */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbarer Verkaufserfolg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Mehr Fahrzeugverkäufe und höhere Marge für hessische Autohäuser
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Maximale Standzeit-Reduzierung durch direkte Käuferanfragen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">+160%</div>
              <h3 className="text-lg font-bold text-white mb-2">Probefahrt-Anfragen</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Vorqualifizierte Interessenten buchen verbindliche Besichtigungstermine direkt
                online.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">3.2x</div>
              <h3 className="text-lg font-bold text-white mb-2">Schnellere Rotation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Kürzere Standtage auf Ihrem Hof durch perfekte Auffindbarkeit in Google & Google
                Maps.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">100%</div>
              <h3 className="text-lg font-bold text-white mb-2">Kundenbindung</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Eigene Marken-Plattform statt Preiskampf und Provisionen auf externen Börsen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-white mb-2">Showroom-Ladezeit</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sofortiges Durchblättern hochauflösender Fahrzeug-Bildergalerien auf allen
                Smartphones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS AUTOHAUS VS. TRADITIONELLE HOMEPAGE */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum erfolgreiche Autohändler in Hessen Next.js wählen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der direkte Vergleich zwischen Standard-Baukästen und maßgeschneiderter
              Showroom-Technologie.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-5 text-sm font-semibold text-slate-300">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-400">
                    Veraltete Baukasten / Standard-Händlerseite
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-400 bg-amber-950/30">
                    Coday Next.js 15 Autohaus Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Fahrzeug-Präsentation</td>
                  <td className="p-5 text-slate-400">
                    Langsame iFrames externer Portale mit Fremdwerbung
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Nativ integrierter High-Speed-Showroom ohne Fremdwerbung
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Inzahlungnahme-Funnel</td>
                  <td className="p-5 text-slate-400">
                    Einfaches Mail-Formular ohne strukturierte Fahrzeugdaten
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Digitaler Bewertungs-Assistent mit Foto- & Schein-Upload
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Geschwindigkeit & Ladezeit</td>
                  <td className="p-5 text-slate-400">
                    3.5s – 6.0s (Interessenten springen bei Bildern ab)
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    &lt; 0.4s (Blitzschnelle Next/Image Optimierung)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Google Sichtbarkeit Hessen</td>
                  <td className="p-5 text-slate-400">Keine Einzel-Indexierung der Fahrzeuge</td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Google Schema.org Car & Top-Rankings für Modelle & Marken
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Preisstruktur</td>
                  <td className="p-5 text-slate-400">Laufende monatliche Lizenzkosten</td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. AUTOHAUS LEISTUNGS-MATRIX HESSEN */}
      <section className="py-24 bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Händler-Module
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Funktionen, die Interessenten zu Autokäufern machen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Vom digitalen Showroom bis zur verbindlichen Probefahrt-Terminierung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dealershipServices.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group"
                >
                  <Icon className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3">{d.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2 mb-6">
                Echtes digitales Handwerk für Autohändler & Fahrzeughäuser in Hessen
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz in Wetzlar baue ich Autohaus-Websites,
                die Fahrzeuge verkaufen: Keine schwerfälligen Baukästen, sondern maßgeschneiderte
                Showroom-Systeme mit blitzschneller Filterung, automatisiertem Ankauf und maximaler
                Unabhängigkeit von teuren Börsen. Sie arbeiten bei Coday direkt mit mir –{' '}
                <strong>Umutcan Emre Tezgel</strong>.
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

      {/* 7. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-slate-900/20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Fahrzeughandel Hessen
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-6">
              Starke Autohäuser in Wetzlar, Frankfurt, Gießen, Kassel & ganz Hessen
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              Hessen zählt zu den kaufkraftstärksten Automobilmärkten Deutschlands. Autohäuser und
              Fahrzeughändler in den Wirtschaftszentren{' '}
              <strong>
                Frankfurt am Main, Wiesbaden, Darmstadt, Kassel, Fulda, Offenbach, Hanau
              </strong>{' '}
              sowie in Mittelhessen rund um <strong>Wetzlar, Gießen und Marburg</strong> stehen im
              ständigen Wettbewerb. Wer Interessenten mit einem hochmodernen digitalen Showroom,
              sofortiger Fahrzeugverfügbarkeit und einer unkomplizierten Probefahrt-Terminierung
              empfängt, schließt Kaufverträge ab, bevor der Kunde auf externe Börsen abwandert.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Persönliche Beratung vor Ort in Ihrem Autohaus
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Wir besprechen Ihr Webprojekt direkt bei Ihnen vor Ort und passen den digitalen
              Showroom präzise an Ihre Marken, Ihr Gebrauchtwagen-Sortiment und Ihre Verkaufsberater
              an.
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

      {/* 8. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Fragen & Antworten zu Webdesign für Autohändler in Hessen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Können Fahrzeuge automatisch aus mobile.de oder AutoScout24 importiert werden?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ja. Wir entwickeln Schnittstellen, die Ihren Fahrzeugbestand direkt synchronisieren,
                sodass Sie Fahrzeuge nur einmal in Ihrer Händlersoftware pflegen müssen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie funktioniert der digitale Inzahlungnahme-Funnel?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Kaufinteressenten können direkt am Wunschfahrzeug die Daten ihres aktuellen Autos
                (Kilometerstand, Erstzulassung, Zustand, Fotos) eingeben. Sie erhalten eine
                vollständige Lead-Mappe zur schnellen Kalkulation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Warum ist eine eigene Website trotz Autobörsen unverzichtbar?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Auf Autobörsen konkurrieren Sie direkt über den Preis und der Kunde sieht sofort
                Angebote von Mitbewerbern. Auf Ihrer eigenen High-Speed-Website bauen Sie Vertrauen
                auf, vermarkten Zusatzgarantien, Finanzierungen und binden Kunden an Ihr Autohaus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie schnell ist eine neue Autohaus-Website online?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ihr neuer digitaler Showroom ist in der Regel innerhalb von 10 bis 14 Werktagen
                schlüsselfertig online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie viel kostet eine professionelle Autohaus-Website in Hessen?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir kalkulieren transparent und verbindlich als Festpreis auf Anfrage nach einer
                kostenlosen Bedarfsanalyse. Durch schlanke KI-Workflows sind wir 5–10x günstiger als
                traditionelle Großagenturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-t from-amber-950/40 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für Ihren neuen digitalen High-Speed Showroom?
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
              Kostenlose Autohaus-Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
