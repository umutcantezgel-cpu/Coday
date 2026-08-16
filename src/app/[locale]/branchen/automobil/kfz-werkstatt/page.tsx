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
  Wrench,
  CalendarCheck,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  UserCheck,
  Gauge,
  ArrowsClockwise,
  Browsers,
  Clock,
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
      title: 'Web Design for Auto Repair Shops Hesse | Coday Automotive',
      description:
        'High-performance websites for auto repair shops in Hesse. Online appointment booking for inspections & repairs. Fixed prices on request.',
      path: '/en/branchen/automobil/kfz-werkstatt',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für KFZ-Werkstätten Hessen | Coday Automotive',
    description:
      'High-Performance Websites für KFZ-Werkstätten in Hessen. Online-Terminbuchung für Inspektion, HU/AU & Reparatur. Festpreise auf Anfrage.',
    path: '/de/branchen/automobil/kfz-werkstatt',
    type: 'money',
  });
}

export default async function KfzWerkstattPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const services = [
    {
      title: 'Inspektion nach Herstellervorgabe & HU/AU',
      desc: 'Smarte Termin-Funnels mit digitaler Fahrzeugschein-Upload-Funktion und Prüfungs-Erinnerung.',
      icon: Gauge,
    },
    {
      title: 'Reifen- & Räder-Service / Saisontimer',
      desc: 'Automatisierte Buchungs-Wellen für Sommer-/Winter-Radwechsel und Reifeneinlagerung.',
      icon: ArrowsClockwise,
    },
    {
      title: 'Unfallinstandsetzung & Karosseriebau',
      desc: 'Digitale Schadensmeldung mit Foto-Upload für schnelle Kostenvoranschläge und Versicherungskontakt.',
      icon: Wrench,
    },
    {
      title: 'E-Mobilität, Diagnose & Fehlerspeicher',
      desc: 'Hochvoltschulung-Präsentation, Steuergeräte-Diagnose & Software-Updates.',
      icon: Lightning,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/branchen/automobil/kfz-werkstatt#localbusiness`,
        name: 'Coday – Webdesign & Software für KFZ-Werkstätten Hessen',
        url: `${BASE_URL}/${_locale}/branchen/automobil/kfz-werkstatt`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Automotive Division',
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
        '@id': `${BASE_URL}/${_locale}/branchen/automobil/kfz-werkstatt#service`,
        name: 'Webdesign & Digitale Werkstatt-Systeme Hessen',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'KFZ-Werkstatt Webdesign Hessen',
          'Automotive Dashboard & Online-Terminbuchung',
          '60-Sekunden-Recruiting für KFZ-Mechatroniker',
          'Inspektions- & Radwechsel-Funnels',
          'Local SEO für KFZ-Meisterbetriebe',
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
            name: 'KFZ-Werkstätten Hessen',
            item: `${BASE_URL}/${_locale}/branchen/automobil/kfz-werkstatt`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie entlastet die Website das Telefon am Werkstatt-Empfang?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kunden buchen Standardleistungen wie Inspektion nach Herstellervorgabe, HU/AU-Termine oder den saisonalen Radwechsel 24/7 online über unseren interaktiven Termin-Assistenten. Alle Fahrzeugdaten werden strukturiert erfasst.',
            },
          },
          {
            '@type': 'Question',
            name: 'Können wir das Automotive Dashboard live testen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja! Unter https://automobile-rose-five.vercel.app steht unsere voll funktionsfähige Automotive-Webapplikation für Werkstatt- und Händlersysteme als interaktive Live-Demo bereit.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hilft die Website bei der Suche nach KFZ-Mechatronikern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Über unseren integrierten 60-Sekunden-Recruiting-Funnel können sich ausgebildete Gesellen, Diagnosetechniker und Meister ohne Anschreiben oder PDF-Upload direkt vom Smartphone aus bei Ihrer Werkstatt bewerben.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Werkstatt-Website online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ihr neuer Webauftritt ist in der Regel innerhalb von 10 bis 14 Werktagen komplett betriebsbereit und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine neue Werkstatt-Website in Hessen?',
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
            <Car className="w-4 h-4 text-amber-600" />
            AUTOMOTIVE & MEISTERWERKSTÄTTEN · HESSENWEIT
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Webdesign für KFZ-Werkstätten in{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Hessen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            High-Performance Next.js Websites für freie Werkstätten, Karosserie- und Lackierzentren
            in ganz Hessen. Automatisierte Online-Terminbuchung für Inspektion & HU/AU, weniger
            Telefon-Stress und 60-Sekunden-Recruiting für KFZ-Mechatroniker. Verbindlicher Festpreis
            auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
              Kostenlose Werkstatt-Bedarfsanalyse anfordern
            </h2>
            <LazyQuickContactForm />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">&lt; 0.4s</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Ladezeit via Edge</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">Live Demo</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Automotive App bereit
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">&lt; 60s</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Mechatroniker Recruiting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. LIVE DEMO SHOWCASE: AUTOMOTIVE DASHBOARD */}
      <section className="py-20 bg-amber-50/60 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Interaktive Web-Applikation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Live-Demo: Automotive Dashboard & Buchungsportal
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Erleben Sie unsere spezialisierte Automotive-Applikation live im Einsatz. Mit
                intelligentem Inspektions-Rechner, digitaler Schadensmeldung und nahtloser
                Termin-Synchronisation für moderne KFZ-Betriebe in Hessen.
              </p>
            </div>
            <a
              href="https://automobile-rose-five.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="lg"
                className="bg-primary-700 hover:bg-primary-800 text-white font-bold whitespace-nowrap shadow-lg shadow-primary-700/20"
              >
                Dashboard Live testen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 4. 4-SÄULEN WERKSTATT STATS BENTO GRID */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbarer Werkstatt-Erfolg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Entlastung für Ihren Werkstattbetrieb in Hessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Volle Hebebühnen mit planbaren Inspektions- und Wartungsaufträgen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">-65%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Telefon-Aufkommen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kunden buchen Inspektion, HU/AU & Radwechsel online statt am Werkstatt-Tresen
                anzurufen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">+140%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Wartungsaufträge</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Lead-Funnels für profitable Inspektionen nach Herstellervorgabe mit
                Garantieerhalt.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 60s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Recruiting-Dauer</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                KFZ-Mechatroniker bewerben sich mobil in unter einer Minute ohne Anschreiben.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mobile Ladezeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sofortige Anzeige bei Pannen-Notfällen und mobilen Suchen von Autofahrern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE: NEXT.JS AUTOMOTIVE VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum moderne KFZ-Betriebe in Hessen auf Next.js setzen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Der direkte Vergleich zwischen Standard-Baukästen und maßgeschneiderter
              Webtechnologie.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-5 text-sm font-semibold text-slate-700">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-700">
                    Veraltete WordPress / Baukasten Werkstatt-Website
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Automotive Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Online-Terminbuchung</td>
                  <td className="p-5 text-slate-600">
                    Einfaches Kontaktformular führt zu ständigem Nachtelefonieren
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Smarter Funnel mit Fahrzeugschein-Upload & Wunschtermin
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Mechatroniker-Recruiting</td>
                  <td className="p-5 text-slate-600">
                    Statische PDF-Dateien (0 Bewerbungen im Monat)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    60-Sekunden-Express-Recruiting direkt via Smartphone
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Geschwindigkeit & Ladezeit</td>
                  <td className="p-5 text-slate-600">
                    3.5s – 5.0s (Pannen-Kunden springen sofort zur Konkurrenz ab)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    &lt; 0.4s (Sofortige Anzeige von Notdienst & Rufnummern)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Sichtbarkeit Hessen</td>
                  <td className="p-5 text-slate-600">Nur bei Firmennamensuche sichtbar</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Top-Rankings für „Inspektion", „HU AU" & „KFZ Werkstatt"
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Preisstruktur</td>
                  <td className="p-5 text-slate-600">Teure Monats-Abos oder Portalgebühren</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. KFZ-WERKSTATT LEISTUNGS-MATRIX */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialisierte Module
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Funktionen, die Ihren Werkstattalltag in Hessen automatisieren
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Inspektions-Fahrzeugschein-Upload bis zur digitalen Schadensmeldung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group"
                >
                  <Icon className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
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
                Echtes digitales Handwerk für Werkstattmeister in Hessen
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz in Mittelhessen baue ich
                Werkstatt-Websites, die Ihnen echte Entlastung bringen: Keine Standard-Templates,
                sondern maßgeschneiderte Systeme mit 100% DSGVO-Sicherheit, reibungsloser
                Terminbuchung und voller Unabhängigkeit von teuren Werkstattportalen. Sie arbeiten
                bei Coday direkt mit mir – <strong>Umutcan Emre Tezgel</strong>.
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
              Automobil- & Werkstattland Hessen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Starke freie Werkstätten in Wetzlar, Frankfurt, Gießen, Kassel & ganz Hessen
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Hessen ist eines der am stärksten befahrenen Bundesländer Deutschlands. Über die
              Autobahnachsen A3, A5, A7, A45 und A66 bewegen sich täglich Millionen Pendler und
              Firmenfahrzeuge. Freie Werkstätten und Karosseriebetriebe in Wetzlar, Gießen,
              Frankfurt, Wiesbaden, Darmstadt, Kassel, Fulda und Limburg profitieren enorm von
              digitaler Sichtbarkeit: Wenn Autofahrer nach einer Inspektion nach Herstellervorgabe,
              einer schnellen Unfallinstandsetzung oder einem zuverlässigen Reifenwechsel suchen,
              entscheidet die Geschwindigkeit und Professionalität Ihrer Website über die
              Terminbuchung.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Persönliche Vor-Ort-Beratung in Ihrem KFZ-Betrieb
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Von unserem Hauptsitz in Wetzlar erreichen wir Werkstattbetriebe in ganz Hessen
              schnell für persönliche Besprechungen vor Ort. Wir integrieren Ihre bestehenden
              Werkstatt-Abläufe nahtlos in das System.
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
              Fragen & Antworten zu Webdesign für KFZ-Werkstätten in Hessen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie entlastet die Website das Telefon am Werkstatt-Empfang?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kunden buchen Standardleistungen wie Inspektion nach Herstellervorgabe,
                HU/AU-Termine oder den saisonalen Radwechsel 24/7 online über unseren interaktiven
                Termin-Assistenten. Alle Fahrzeugdaten werden strukturiert erfasst.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Können wir das Automotive Dashboard live testen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja! Unter https://automobile-rose-five.vercel.app steht unsere voll funktionsfähige
                Automotive-Webapplikation für Werkstatt- und Händlersysteme als interaktive
                Live-Demo bereit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie hilft die Website bei der Suche nach KFZ-Mechatronikern?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Über unseren integrierten 60-Sekunden-Recruiting-Funnel können sich ausgebildete
                Gesellen, Diagnosetechniker und Meister ohne Anschreiben oder PDF-Upload direkt vom
                Smartphone aus bei Ihrer Werkstatt bewerben.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Werkstatt-Website online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ihr neuer Webauftritt ist in der Regel innerhalb von 10 bis 14 Werktagen komplett
                betriebsbereit und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine neue Werkstatt-Website in Hessen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren transparent und verbindlich als Festpreis auf Anfrage nach einer
                kostenlosen Bedarfsanalyse. Durch schlanke KI-Workflows sind wir 5–10x günstiger als
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
            Bereit für eine moderne, vollautomatische Werkstatt-Website?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches Erstgespräch direkt mit Inhaber Umutcan Emre
            Tezgel.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/20 transition-all hover:scale-105"
            >
              Kostenlose Werkstatt-Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
