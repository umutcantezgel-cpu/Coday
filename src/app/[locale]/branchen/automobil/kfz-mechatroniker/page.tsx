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
  Gauge,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  UserCheck,
  Cpu,
  Speedometer,
  BatteryCharging,
  SlidersHorizontal,
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
      title: 'Web Design for Auto Mechanics Hesse | Coday Auto-Tech',
      description:
        'Web development & SEO for auto mechanics & diagnostic centers in Hesse. Modern UI/UX design & more inquiries. Fixed prices on request.',
      path: '/en/branchen/automobil/kfz-mechatroniker',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für KFZ-Mechatroniker Hessen | Coday Auto-Tech',
    description:
      'Webentwicklung & SEO für KFZ-Mechatroniker & Diagnose-Betriebe in Hessen. Modernes UI/UX-Design & mehr Werkstattanfragen. Festpreise auf Anfrage.',
    path: '/de/branchen/automobil/kfz-mechatroniker',
    type: 'money',
  });
}

export default async function KfzMechatronikerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const disciplines = [
    {
      title: 'Chiptuning & Software-Optimierung',
      desc: 'Interaktive Leistungs-Konfiguratoren mit Vorher-Nachher PS- und Drehmoment-Kurven für alle Fahrzeugmodelle.',
      icon: Speedometer,
    },
    {
      title: 'Tiefendiagnose & Steuergeräte-Reparatur',
      desc: 'Visualisierung moderner Messtechnik (Oszilloskop, CAN-Bus) zur Gewinnung kniffliger Elektronik-Fälle.',
      icon: Cpu,
    },
    {
      title: 'E-Mobilität & Hochvolt-Systeme',
      desc: 'Zertifizierte DGUV-Fachbetriebe-Präsentation für Batterie-Diagnose, Wallboxen & Hybrid-Reparaturen.',
      icon: BatteryCharging,
    },
    {
      title: 'Getriebespülung & Motorinstandsetzung',
      desc: 'Spezialisierte Anfrage-Funnels für Automatikgetriebe-Spülung (nach Tim Eckart Methode) & Revisionen.',
      icon: SlidersHorizontal,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/branchen/automobil/kfz-mechatroniker#localbusiness`,
        name: 'Coday – Auto-Tech & KFZ-Mechatroniker Webentwicklung Hessen',
        url: `${BASE_URL}/${_locale}/branchen/automobil/kfz-mechatroniker`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Auto-Tech Division',
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
        '@id': `${BASE_URL}/${_locale}/branchen/automobil/kfz-mechatroniker#service`,
        name: 'Webdesign & Lead-Funnels für KFZ-Spezialbetriebe & Mechatroniker Hessen',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Chiptuning & Performance Webdesign Hessen',
          'Diagnose-Zentrum & Steuergeräte Portale',
          'E-Mobilität & Hochvolt-Service Funnels',
          '60-Sekunden-Recruiting für Servicetechniker & Diagnostiker',
          'Local SEO für KFZ-Spezialbetriebe',
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
            name: 'KFZ-Mechatroniker & Tuning Hessen',
            item: `${BASE_URL}/${_locale}/branchen/automobil/kfz-mechatroniker`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie gewinnen wir mehr lukrative Chiptuning- und Diagnose-Aufträge?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch interaktive Leistungsrechner und Vorher-Nachher-Leistungsdiagramme. Kunden sehen direkt das Leistungspotenzial für ihr Fahrzeugmodell und können eine verbindliche Tuning- oder Diagnoseanfrage stellen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hilft die Website gegen den Mangel an qualifizierten Diagnosetechnikern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir binden einen mobilen 60-Sekunden-Recruiting-Funnel ein. Top-Mechatroniker und Diagnostiker bewerben sich ohne Anschreiben oder PDF-Upload direkt per Fingertipp vom Smartphone aus.',
            },
          },
          {
            '@type': 'Question',
            name: 'Können wir unsere Hochvolt- und E-Mobilitäts-Zertifizierungen einbinden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir heben Ihre DGUV-Zertifikate, Hochvoltarbeitsplätze und Spezialwerkzeuge prominent hervor, um Fahrzeughaltern von E-Autos und Plug-in-Hybriden maximale Sicherheit zu vermitteln.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie lange dauert die Umsetzung einer Spezialbetrieb-Website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig fertiggestellt und online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine professionelle Auto-Tech Website in Hessen?',
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
            <Cpu className="w-4 h-4 text-amber-400" />
            AUTO-TECH, TUNING & DIAGNOSE · HESSENWEIT
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Webdesign für KFZ-Mechatroniker & Diagnose in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Hessen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Performante Next.js Webapplikationen für KFZ-Mechatroniker, Chiptuning-Experten,
            Steuergeräte-Diagnostiker und Hochvolt-Spezialisten in ganz Hessen. Mehr lukrative
            High-Ticket-Aufträge, interaktive Leistungsrechner und 60-Sekunden-Recruiting für
            Top-Techniker. Verbindlicher Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4 text-center">
              Kostenlose Auto-Tech Bedarfsanalyse anfordern
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
                Tuning & E-Auto
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Spezialisierte Module
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">&lt; 60s</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Techniker Recruiting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <TrustBar />
      </section>

      {/* 3. 4-SÄULEN AUTO-TECH STATS BENTO GRID */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbare Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Mehr High-Ticket-Aufträge für Spezialbetriebe in Hessen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Positionieren Sie Ihren Betrieb als erste Adresse für anspruchsvolle Fahrzeugtechnik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">+210%</div>
              <h3 className="text-lg font-bold text-white mb-2">High-Ticket-Aufträge</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gezielte Anfragen für Chiptuning, Getriebespülung und komplexe
                Elektronik-Fehlersuchen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">&lt; 60s</div>
              <h3 className="text-lg font-bold text-white mb-2">Recruiting-Dauer</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Diagnosetechniker und Meister bewerben sich barrierefrei direkt per Smartphone.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">100%</div>
              <h3 className="text-lg font-bold text-white mb-2">Code-Eigentum</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Volle Kontrolle über Ihre Plattform ohne teure Monatsgebühren von Tuning-Portalen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Ladezeit</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für Tuning-Enthusiasten und Werkstattkunden auf allen
                Endgeräten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS AUTO-TECH VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Mechatronik-Profis in Hessen auf Next.js setzen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der direkte Vergleich zwischen Standard-Baukästen und spezialisierter Webentwicklung.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-5 text-sm font-semibold text-slate-300">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-400">
                    Veraltete WordPress / Baukasten Website
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-400 bg-amber-950/30">
                    Coday Next.js 15 Auto-Tech Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Leistungs- & Tuning-Präsentation</td>
                  <td className="p-5 text-slate-400">
                    Statische Tabellen ohne interaktive Filterung
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Interaktive Rechner mit Vorher-Nachher Diagrammen
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Diagnostiker-Recruiting</td>
                  <td className="p-5 text-slate-400">
                    Statische PDF-Dateien (0 Bewerbungen von Experten)
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    60-Sekunden-Express-Recruiting via Smartphone
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Geschwindigkeit & Ladezeit</td>
                  <td className="p-5 text-slate-400">
                    3.5s – 5.0s (Hohe Absprungraten bei Performance-Fans)
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    &lt; 0.4s (Sofortige Anzeige auf deutschen Edge-Servern)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Google Sichtbarkeit Hessen</td>
                  <td className="p-5 text-slate-400">Nur unter dem Firmennamen auffindbar</td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Top-Rankings für „Chiptuning", „Getriebespülung" & „Diagnose"
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Preisstruktur</td>
                  <td className="p-5 text-slate-400">Monatliche Lizenzgebühren & Abhängigkeiten</td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. SPEZIALDISZIPLINEN-MATRIX HESSEN */}
      <section className="py-24 bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialdisziplinen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Perfektion für moderne Fahrzeugtechnik in Hessen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Vom Chiptuning-Rechner bis zum Hochvolt-Serviceportal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {disciplines.map((d) => {
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
                Echtes digitales Engineering für KFZ-Technik-Pioniere in Hessen
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz in Wetzlar entwickle ich
                Webapplikationen, die dem hohen technischen Anspruch moderner Mechatroniker gerecht
                werden: Blitzschnell, technisch makellos und kompromisslos conversion-optimiert. Sie
                arbeiten bei Coday direkt mit mir – <strong>Umutcan Emre Tezgel</strong>.
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
              Fahrzeugtechnik- & Tuningregion Hessen
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-6">
              Spezialwerkstätten in Wetzlar, Frankfurt, Gießen, Kassel & ganz Hessen
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              Ob High-End Chiptuning im Rhein-Main-Gebiet (
              <strong>Frankfurt, Wiesbaden, Offenbach, Hanau</strong>), renommierte Diagnosezentren
              in Mittelhessen (<strong>Wetzlar, Gießen, Marburg, Limburg</strong>) oder
              spezialisierte Getriebe- und E-Mobilitätsbetriebe in{' '}
              <strong>Kassel, Fulda und Darmstadt</strong>: Kunden fahren für echte Experten und
              Meisterqualität gerne weite Strecken. Eine Website, die Ihre Spezialwerkzeuge,
              Prüfstands-Ergebnisse und Hochvolt-Zertifikate überzeugend darstellt, zieht lukrative
              Aufträge aus ganz Hessen an.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Persönliche Beratung vor Ort in Ihrem Betrieb
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Wir besuchen Ihren Betrieb vor Ort, erfassen Ihre technischen Alleinstellungsmerkmale
              und setzen Ihr Know-how in messbare Kundenanfragen um.
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
              Fragen & Antworten zu Webdesign für KFZ-Mechatroniker in Hessen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie gewinnen wir mehr lukrative Chiptuning- und Diagnose-Aufträge?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Durch interaktive Leistungsrechner und Vorher-Nachher-Leistungsdiagramme. Kunden
                sehen direkt das Leistungspotenzial für ihr Fahrzeugmodell und können eine
                verbindliche Tuning- oder Diagnoseanfrage stellen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie hilft die Website gegen den Mangel an qualifizierten Diagnosetechnikern?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir binden einen mobilen 60-Sekunden-Recruiting-Funnel ein. Top-Mechatroniker und
                Diagnostiker bewerben sich ohne Anschreiben oder PDF-Upload direkt per Fingertipp
                vom Smartphone aus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Können wir unsere Hochvolt- und E-Mobilitäts-Zertifizierungen einbinden?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ja. Wir heben Ihre DGUV-Zertifikate, Hochvoltarbeitsplätze und Spezialwerkzeuge
                prominent hervor, um Fahrzeughaltern von E-Autos und Plug-in-Hybriden maximale
                Sicherheit zu vermitteln.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie lange dauert die Umsetzung einer Spezialbetrieb-Website?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                In der Regel ist Ihr Webprojekt innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig fertiggestellt und online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie viel kostet eine professionelle Auto-Tech Website in Hessen?
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
            Bereit für mehr High-Ticket-Aufträge in Ihrem Spezialbetrieb?
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
              Kostenlose Auto-Tech Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
