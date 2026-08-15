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
  Heartbeat,
  FirstAid,
  CalendarCheck,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  UserCheck,
  Wheelchair,
  PhoneSlash,
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
      title: 'Web Design for Doctors & Practices Wetzlar | Coday Healthcare',
      description:
        'GDPR-compliant practice websites in Wetzlar. Online appointment booking, accessible design & patient acquisition with Next.js. Fixed price on request.',
      path: '/en/branchen/gesundheitswesen/arzt-wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen Wetzlar | Coday Healthcare',
    description:
      'DSGVO-konforme Praxis-Websites in Wetzlar. Online-Terminbuchung, barrierefreies Design & Patientengewinnung mit Next.js. Festpreise auf Anfrage.',
    path: '/de/branchen/gesundheitswesen/arzt-wetzlar',
    type: 'money',
  });
}

export default async function ArztWetzlarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const specialties = [
    {
      title: 'Hausärzte & Allgemeinmedizin',
      desc: 'Rezept-Vorbestellung, Überweisungs-Formulare & digitale Sprechstunden-Übersicht.',
      icon: FirstAid,
    },
    {
      title: 'Zahnärzte & Kieferorthopädie',
      desc: 'Ästhetische Leistungspräsentation, Behandlungs-Vorher-Nachher & Online-Terminkalender.',
      icon: Sparkle,
    },
    {
      title: 'Fachärzte & MVZ',
      desc: 'Strukturierte Leistungsseiten für Orthopädie, Kardiologie, Dermatologie & Augenheilkunde.',
      icon: Heartbeat,
    },
    {
      title: 'Therapeuten & Physiotherapie',
      desc: 'Leichte Terminbuchung für Kassen- & Privatpatienten, barrierefreie Navigation.',
      icon: Wheelchair,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-wetzlar#localbusiness`,
        name: 'Coday – Healthcare Webdesign für Ärzte & Praxen Wetzlar',
        url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-wetzlar`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Healthcare Division',
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
          { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
          { '@type': 'AdministrativeArea', name: 'Mittelhessen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-wetzlar#service`,
        name: 'Webdesign & Digitalisierung für Arztpraxen Wetzlar',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Praxis-Webdesign Wetzlar',
          'Online-Terminbuchung (Doctolib / Jameda / CGM / Custom)',
          '100% DSGVO-Sicherheit für Patientendaten',
          'Barrierefreies Webdesign (BITV 2.0 / BFSG 2025)',
          'MFA & Praxispersonal Express-Recruiting',
          'Local SEO für Ärzte in Wetzlar',
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
            name: 'Gesundheitswesen',
            item: `${BASE_URL}/${_locale}/branchen/gesundheitswesen`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Ärzte & Praxen Wetzlar',
            item: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-wetzlar`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie werden Online-Terminsysteme wie Doctolib oder Jameda integriert?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir binden bestehende Tools wie Doctolib, Jameda, CGM, Turbomed oder Medatixx nahtlos und datenschutzkonform per Iframe oder nativer API in Ihre Website ein. Alternativ erstellen wir DSGVO-konforme, individuelle Termin- und Rezept-Anfrageformulare.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sind Ihre Praxis-Websites 100% DSGVO- und rechtssicher?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, absolut. Wir verzichten auf externe US-Schriften (Google Fonts lokal eingebunden), setzen auf sicheres deutsches Edge-Hosting in ISO-27001 zertifizierten Rechenzentren und integrieren rechtssichere Patienten-Einwilligungsbanner sowie verschlüsselte Kontaktkanäle.',
            },
          },
          {
            '@type': 'Question',
            name: 'Erfüllen die Websites die neuen Vorgaben des Barrierefreiheitsstärkungsgesetzes (BFSG 2025)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln alle Praxis-Websites nach den Standards der BITV 2.0 und WCAG 2.1 AA. Dazu gehören hohe Kontraste, skalierbare Schriftgrößen, Screenreader-Kompatibilität und barrierefreie Tastaturbedienung.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hilft die neue Website gegen den MFA- und Fachkräftemangel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir integrieren ein mobiles 60-Sekunden-Express-Recruiting-Formular. Medizinische Fachangestellte (MFA) und Zahnmedizinische Fachangestellte (ZFA) können sich ohne Anschreiben oder Lebenslauf direkt vom Smartphone aus bei Ihrer Praxis bewerben.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine neue Praxis-Website in Wetzlar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren transparent und verbindlich als Festpreis auf Anfrage nach einer kostenlosen Praxis-Bedarfsanalyse. Dank moderner KI-gestützter Entwicklung sind wir 5–10x günstiger als traditionelle Großagenturen.',
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
            <Heartbeat className="w-4 h-4 text-amber-400" />
            HEALTHCARE WEBDESIGN · WETZLAR & LAHN-DILL
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Webdesign für Ärzte & Praxen in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Wetzlar
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            DSGVO-konforme Praxis-Websites, automatisierte Online-Terminbuchung und barrierefreies
            Next.js Webdesign für Fachärzte, Zahnärzte und Therapeuten in Wetzlar und im
            Lahn-Dill-Kreis. Weniger Telefon-Chaos am Empfang, mehr qualifizierte Privatpatienten
            und schnelles MFA-Recruiting. Verbindlicher Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4 text-center">
              Kostenlose Praxis-Bedarfsanalyse für Wetzlar anfordern
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                DSGVO & Patientenschutz
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">BITV 2.0</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Barrierefrei & BFSG 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <TrustBar />
      </section>

      {/* 3. 4-SÄULEN PRAXIS STATS BENTO GRID */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbarer Praxis-Erfolg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Entlastung für Ihr Praxisteam in Wetzlar
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Weniger Telefonklingeln am Empfang, mehr Zeit für Patientenbehandlung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">-75%</div>
              <h3 className="text-lg font-bold text-white mb-2">Telefon-Aufkommen</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Durch automatisierte Online-Terminvergabe und digitale Rezept- &
                Überweisungsanfragen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">+150%</div>
              <h3 className="text-lg font-bold text-white mb-2">Privatpatienten</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gezielte Anfragen für hochwertige Selbstzahler- und IGeL-Leistungen durch seriöses
                Design.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">100%</div>
              <h3 className="text-lg font-bold text-white mb-2">Barrierefreiheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Optimiert für ältere und sehbeeinträchtigte Patienten nach BITV 2.0 und BFSG 2025.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors group">
              <div className="text-4xl font-black text-amber-400 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Ladezeit</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Blitzschnell ladende Seiten auf allen Smartphones, wo über 75% aller Arztsuchen
                stattfinden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS HEALTHCARE VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum moderne Praxen in Wetzlar auf Next.js setzen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der direkte Vergleich zwischen klassischem WordPress und zukunftssicherer
              Headless-Architektur.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-5 text-sm font-semibold text-slate-300">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-400">
                    Veraltete WordPress / Baukasten Praxis-Homepage
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-400 bg-amber-950/30">
                    Coday Next.js 15 Healthcare Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Patientendatenschutz & DSGVO</td>
                  <td className="p-5 text-slate-400">
                    Riskant durch Drittanbieter-Plugins & offene PHP-Schwachstellen
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    100% Sicher (Keine offene Angriffsfläche, ISO-27001)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Termin- & Rezept-Automatisierung</td>
                  <td className="p-5 text-slate-400">
                    Veraltete Kontaktformulare führen zu manuellem Telefon-Chaos
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Doctolib/Jameda oder smarte Custom-Termin-Funnels
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Barrierefreiheit (BFSG 2025)</td>
                  <td className="p-5 text-slate-400">
                    Schlechte Kontraste, unleserlich auf Handys
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Garantiert BITV 2.0 & BFSG 2025 konform
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">MFA-Personal-Recruiting</td>
                  <td className="p-5 text-slate-400">
                    Statische PDF-Stellenausschreibungen (Keine Bewerbungen)
                  </td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    60-Sekunden-Express-Bewerbung via Smartphone
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-white">Preis & Transparenz</td>
                  <td className="p-5 text-slate-400">Teure Monats-Abos & Baukasten-Gebühren</td>
                  <td className="p-5 font-bold text-amber-400 bg-amber-950/20">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. HEALTHCARE CORE FEATURES BENTO SHOWCASE */}
      <section className="py-24 bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Healthcare Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Funktionen, die den Praxisalltag in Wetzlar revolutionieren
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Maßgeschneiderte Module für Praxisteam und Patienten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group">
              <CalendarCheck className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                1. Nahtlose Online-Terminvergabe
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Direkte Anbindung von Doctolib, Jameda, CGM, Turbomed, Medatixx oder unserem
                hauseigenen DSGVO-Termin-Assistenten. Rund um die Uhr Termine vergeben, ohne das
                Praxistelefon zu belasten.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group">
              <ShieldCheck className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                2. 100% DSGVO-Sicherheit & Patientenschutz
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Keine Datenübertragung an unsichere Drittländer. Deutsche ISO-27001-Server,
                verschlüsselte Übertragung sensibler Rezept- und Befundanfragen und rechtssichere
                Cookie-Lösungen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group">
              <Wheelchair className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                3. Barrierefreiheit (BITV 2.0 & BFSG 2025)
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Klare Typografie, hohe Kontraste, Screenreader-Freundlichkeit und intuitive
                Navigation. Garantiert uneingeschränkt nutzbar für alle Patientengruppen in Wetzlar.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group">
              <UserCheck className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                4. MFA- & Fachkräfte-Express-Recruiting
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gewinnen Sie qualifizierte Medizinische Fachangestellte (MFA) und Praxispersonal
                über conversion-optimierte 60-Sekunden-Bewerbungen direkt vom Smartphone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FACHGRUPPEN-MATRIX WETZLAR */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialisierte Lösungen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Maßgeschneidert für Ihre medizinische Fachrichtung
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Webdesign, das exakt auf die Bedürfnisse Ihrer Patienten und Behandlungsschwerpunkte
              abgestimmt ist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 transition-all"
                >
                  <Icon className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2 mb-6">
                Echtes Handwerk & direkter Entwickler-Kontakt für Wetzlarer Ärzte
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz in Wetzlar kenne ich die medizinische
                Versorgungslandschaft im Lahn-Dill-Kreis genau. Sie arbeiten bei Coday direkt mit
                mir – <strong>Umutcan Emre Tezgel</strong>. Keine Callcenter, keine Junior-Berater,
                sondern fundierte IT- und Webdesign-Expertise für Ihre Praxis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">100% DSGVO-Rechtssicherheit</span>
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
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Gesundheitsstandort Wetzlar & Lahn-Dill
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-6">
              Praxis-Websites für Wetzlar, Braunfels, Aßlar & den Lahn-Dill-Kreis
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              Die Dom- und Optikstadt <strong>Wetzlar</strong> bildet zusammen mit dem
              <strong>Klinikum Lahn-Dill</strong> und zahlreichen renommierten Ärztehäusern das
              medizinische Zentrum für über 250.000 Menschen im Lahn-Dill-Kreis. Ob in der Wetzlarer
              Kernstadt, in <strong>Braunfels, Aßlar, Solms, Schwalbach oder Ehringshausen</strong>:
              Anspruchsvolle Patienten informieren sich vor der ersten Terminvereinbarung online.
              Eine moderne, barrierefreie und vertrauenserweckende Praxis-Website sichert Ihnen
              einen klaren Wettbewerbsvorteil bei der Gewinnung von Privat- und Kassenpatienten.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Persönliche Vor-Ort-Beratung in Ihrer Praxis in Wetzlar
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Mit unserem Hauptsitz in Wetzlar sind wir in wenigen Minuten direkt bei Ihnen vor Ort.
              Wir stimmen alle Details mit Ihrem Praxisteam und Ihren Praxisverwaltungssystemen ab.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Budget: Nach einer kostenlosen
              Praxis-Bedarfsanalyse erhalten Sie ein transparentes Festpreisangebot ohne versteckte
              Kosten oder monatliche Lizenzfallen.
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
              Fragen & Antworten zu Praxis-Webdesign in Wetzlar
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie werden Online-Terminsysteme wie Doctolib oder Jameda integriert?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir binden bestehende Tools wie Doctolib, Jameda, CGM, Turbomed oder Medatixx
                nahtlos und datenschutzkonform per Iframe oder nativer API in Ihre Website ein.
                Alternativ erstellen wir DSGVO-konforme, individuelle Termin- und
                Rezept-Anfrageformulare.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Sind Ihre Praxis-Websites 100% DSGVO- und rechtssicher?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ja, absolut. Wir verzichten auf externe US-Schriften (Google Fonts lokal
                eingebunden), setzen auf sicheres deutsches Edge-Hosting in ISO-27001 zertifizierten
                Rechenzentren und integrieren rechtssichere Patienten-Einwilligungsbanner sowie
                verschlüsselte Kontaktkanäle.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Erfüllen die Websites die neuen Vorgaben des Barrierefreiheitsstärkungsgesetzes
                (BFSG 2025)?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ja. Wir entwickeln alle Praxis-Websites nach den Standards der BITV 2.0 und WCAG 2.1
                AA. Dazu gehören hohe Kontraste, skalierbare Schriftgrößen,
                Screenreader-Kompatibilität und barrierefreie Tastaturbedienung.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie hilft die neue Website gegen den MFA- und Fachkräftemangel?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir integrieren ein mobiles 60-Sekunden-Express-Recruiting-Formular. Medizinische
                Fachangestellte (MFA) und Zahnmedizinische Fachangestellte (ZFA) können sich ohne
                Anschreiben oder Lebenslauf direkt vom Smartphone aus bei Ihrer Praxis bewerben.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">
                Wie viel kostet eine neue Praxis-Website in Wetzlar?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir kalkulieren transparent und verbindlich als Festpreis auf Anfrage nach einer
                kostenlosen Praxis-Bedarfsanalyse. Dank moderner KI-gestützter Entwicklung sind wir
                5–10x günstiger als traditionelle Großagenturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-t from-amber-950/40 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für eine moderne, entlastende Praxis-Website in Wetzlar?
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
              Kostenlose Praxis-Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
