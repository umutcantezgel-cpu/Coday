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
      title: 'Practice Web Design Gießen | Doctors & Clinics · Coday',
      description:
        'Modern medical practice websites for Gießen. Fast load times, seamless online booking & top Google rankings. Fixed prices on request.',
      path: '/en/branchen/gesundheitswesen/arzt-giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Praxis Webdesign Gießen | Ärzte & Kliniken · Coday',
    description:
      'Moderne Praxis-Homepages für Gießen. Schnelle Ladezeiten, reibungslose Online-Terminvergabe & Top-Google-Rankings. Festpreise auf Anfrage.',
    path: '/de/branchen/gesundheitswesen/arzt-giessen',
    type: 'money',
  });
}

export default async function ArztGiessenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const specialties = [
    {
      title: 'Fachärzte & Spezialisten',
      desc: 'Strukturierte Leistungsseiten für Kardiologie, Orthopädie, Dermatologie & Onkologie im UKGM-Umfeld.',
      icon: Heartbeat,
    },
    {
      title: 'Zahnärzte & Kieferorthopädie',
      desc: 'Ästhetische Leistungspräsentation, Behandlungs-Visualisierung & Online-Terminkalender.',
      icon: Sparkle,
    },
    {
      title: 'Privatpraxen & MVZ',
      desc: 'Repräsentative Auftritte für Ärztehäuser, interdisziplinäre Teams und Selbstzahler-Leistungen.',
      icon: FirstAid,
    },
    {
      title: 'Therapeuten & Reha-Zentren',
      desc: 'Leichte Terminbuchung für Physiotherapie, Ergotherapie & Logopädie, barrierefreie Navigation.',
      icon: Wheelchair,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-giessen#localbusiness`,
        name: 'Coday – Healthcare Webdesign für Ärzte & Kliniken Gießen',
        url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-giessen`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Regionalbüro Gießen',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.5872,
          longitude: 8.6755,
        },
        areaServed: [
          { '@type': 'City', name: 'Gießen' },
          { '@type': 'City', name: 'Wetzlar' },
          { '@type': 'City', name: 'Linden' },
          { '@type': 'City', name: 'Pohlheim' },
          { '@type': 'City', name: 'Buseck' },
          { '@type': 'City', name: 'Wettenberg' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Gießen' },
          { '@type': 'AdministrativeArea', name: 'Mittelhessen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-giessen#service`,
        name: 'Webdesign & Digitalisierung für Arztpraxen & Kliniken Gießen',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Praxis-Webdesign Gießen',
          'Online-Terminbuchung (Doctolib / Jameda / CGM / Custom)',
          '100% DSGVO-Sicherheit für Patientendaten',
          'Barrierefreies Webdesign (BITV 2.0 / BFSG 2025)',
          'MFA & Klinikpersonal Express-Recruiting',
          'Local SEO für Ärzte in Gießen',
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
            name: 'Ärzte & Praxen Gießen',
            item: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-giessen`,
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
            name: 'Wie viel kostet eine neue Praxis-Website in Gießen?',
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
            <Heartbeat className="w-4 h-4 text-amber-600" />
            HEALTHCARE WEBDESIGN · GIESSEN & UNIVERSITÄTSKLINIKUM
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Praxis Webdesign & Next.js Entwicklung in{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Gießen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            DSGVO-konforme Praxis-Websites, automatisierte Online-Terminbuchung und barrierefreies
            Webdesign für Fachärzte, Zahnärzte, Privatpraxen und MVZ im Universitätsmedizin-Zentrum
            Gießen. Schnelle Ladezeiten, spürbare Entlastung am Empfang und Top-Google-Rankings.
            Verbindlicher Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
              Kostenlose Praxis-Bedarfsanalyse für Gießen anfordern
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
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                DSGVO & Patientenschutz
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">BITV 2.0</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Barrierefrei & BFSG 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. 4-SÄULEN PRAXIS STATS BENTO GRID */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbarer Praxis-Erfolg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Entlastung für Ihr Praxisteam in Gießen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Weniger Telefonklingeln am Empfang, mehr Zeit für Patientenbehandlung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">-75%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Telefon-Aufkommen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Durch automatisierte Online-Terminvergabe und digitale Rezept- &
                Überweisungsanfragen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">+150%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Privatpatienten</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Anfragen für hochwertige Selbstzahler- und IGeL-Leistungen durch seriöses
                Design.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Barrierefreiheit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Optimiert für ältere und sehbeeinträchtigte Patienten nach BITV 2.0 und BFSG 2025.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-colors group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mobile Ladezeit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Blitzschnell ladende Seiten auf allen Smartphones, wo über 75% aller Arztsuchen
                stattfinden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS HEALTHCARE VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum moderne Praxen in Gießen auf Next.js setzen
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
                    Veraltete WordPress / Baukasten Praxis-Homepage
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Healthcare Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Patientendatenschutz & DSGVO</td>
                  <td className="p-5 text-slate-600">
                    Riskant durch Drittanbieter-Plugins & offene PHP-Schwachstellen
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine offene Angriffsfläche, ISO-27001)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">
                    Termin- & Rezept-Automatisierung
                  </td>
                  <td className="p-5 text-slate-600">
                    Veraltete Kontaktformulare führen zu manuellem Telefon-Chaos
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Doctolib/Jameda oder smarte Custom-Termin-Funnels
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Barrierefreiheit (BFSG 2025)</td>
                  <td className="p-5 text-slate-600">
                    Schlechte Kontraste, unleserlich auf Handys
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert BITV 2.0 & BFSG 2025 konform
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">MFA-Personal-Recruiting</td>
                  <td className="p-5 text-slate-600">
                    Statische PDF-Stellenausschreibungen (Keine Bewerbungen)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    60-Sekunden-Express-Bewerbung via Smartphone
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

      {/* 5. HEALTHCARE CORE FEATURES BENTO SHOWCASE */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Healthcare Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Funktionen für moderne Praxen & Kliniken in Gießen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Maßgeschneiderte Module für Praxisteam und Patienten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <CalendarCheck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Nahtlose Online-Terminvergabe
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Anbindung von Doctolib, Jameda, CGM, Turbomed, Medatixx oder unserem
                hauseigenen DSGVO-Termin-Assistenten. Rund um die Uhr Termine vergeben, ohne das
                Praxistelefon zu belasten.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <ShieldCheck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. 100% DSGVO-Sicherheit & Patientenschutz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Keine Datenübertragung an unsichere Drittländer. Deutsche ISO-27001-Server,
                verschlüsselte Übertragung sensibler Rezept- und Befundanfragen und rechtssichere
                Cookie-Lösungen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <Wheelchair className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Barrierefreiheit (BITV 2.0 & BFSG 2025)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Klare Typografie, hohe Kontraste, Screenreader-Freundlichkeit und intuitive
                Navigation. Garantiert uneingeschränkt nutzbar für alle Patientengruppen in Gießen
                und Mittelhessen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all group">
              <UserCheck className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. MFA- & Fachkräfte-Express-Recruiting
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gewinnen Sie qualifizierte Medizinische Fachangestellte (MFA) und Praxispersonal
                über conversion-optimierte 60-Sekunden-Bewerbungen direkt vom Smartphone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FACHGRUPPEN-MATRIX GIESSEN */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialisierte Lösungen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Maßgeschneidert für Gießens medizinische Fachrichtungen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Webdesign, das exakt auf die Anforderungen Ihrer Fachdisziplin und Ihre Patienten
              abgestimmt ist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/40 shadow-sm transition-all"
                >
                  <Icon className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
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
                Echtes Handwerk & direkter Entwickler-Kontakt für Gießener Ärzte
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Als spezialisierter Solo-Entwickler mit Sitz in der Nachbarstadt Wetzlar kenne ich
                die medizinische Versorgungslandschaft in Gießen und dem gesamten Landkreis genau.
                Sie arbeiten bei Coday direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Keine
                Callcenter, keine Junior-Berater, sondern fundierte IT- und Webdesign-Expertise für
                Ihre Praxis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">100% DSGVO-Rechtssicherheit</span>
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
              Medizin- und Universitätsstadt Gießen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Praxis-Websites für Gießen, Universitätsklinikum (UKGM) & den Landkreis
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Die Universitätsstadt <strong>Gießen</strong> ist mit dem
              <strong>Universitätsklinikum Gießen und Marburg (UKGM)</strong>, dem
              <strong>Evangelischen Krankenhaus</strong>, der <strong>Balserischen Stiftung</strong>{' '}
              sowie zahlreichen interdisziplinären Facharztpraxen und MVZ das führende medizinische
              Zentrum Mittelhessens. Ob in der Gießener Innenstadt, am Seltersberg, im
              Schiffenberger Tal oder in den Nachbargemeinden{' '}
              <strong>Linden, Pohlheim, Buseck, Heuchelheim und Wettenberg</strong>: Anspruchsvolle
              Patienten erwarten heute eine reibungslose digitale Terminvereinbarung und eine
              moderne, vertrauensvolle Webpräsenz.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Persönliche Vor-Ort-Beratung in Ihrer Praxis in Gießen
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Über den Gießener Ring oder die B49 sind wir von unserem Wetzlarer HQ in nur 15
              Fahrminuten direkt bei Ihnen vor Ort in der Praxis. Wir stimmen alle Anforderungen
              persönlich mit Ihnen ab.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Budget: Nach einer kostenlosen
              Praxis-Bedarfsanalyse erhalten Sie ein transparentes Festpreisangebot ohne versteckte
              Kosten oder monatliche Lizenzfallen.
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
              Fragen & Antworten zu Praxis-Webdesign in Gießen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie werden Online-Terminsysteme wie Doctolib oder Jameda integriert?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir binden bestehende Tools wie Doctolib, Jameda, CGM, Turbomed oder Medatixx
                nahtlos und datenschutzkonform per Iframe oder nativer API in Ihre Website ein.
                Alternativ erstellen wir DSGVO-konforme, individuelle Termin- und
                Rezept-Anfrageformulare.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Sind Ihre Praxis-Websites 100% DSGVO- und rechtssicher?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, absolut. Wir verzichten auf externe US-Schriften (Google Fonts lokal
                eingebunden), setzen auf sicheres deutsches Edge-Hosting in ISO-27001 zertifizierten
                Rechenzentren und integrieren rechtssichere Patienten-Einwilligungsbanner sowie
                verschlüsselte Kontaktkanäle.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Erfüllen die Websites die neuen Vorgaben des Barrierefreiheitsstärkungsgesetzes
                (BFSG 2025)?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln alle Praxis-Websites nach den Standards der BITV 2.0 und WCAG 2.1
                AA. Dazu gehören hohe Kontraste, skalierbare Schriftgrößen,
                Screenreader-Kompatibilität und barrierefreie Tastaturbedienung.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie hilft die neue Website gegen den MFA- und Fachkräftemangel?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir integrieren ein mobiles 60-Sekunden-Express-Recruiting-Formular. Medizinische
                Fachangestellte (MFA) und Zahnmedizinische Fachangestellte (ZFA) können sich ohne
                Anschreiben oder Lebenslauf direkt vom Smartphone aus bei Ihrer Praxis bewerben.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine neue Praxis-Website in Gießen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren transparent und verbindlich als Festpreis auf Anfrage nach einer
                kostenlosen Praxis-Bedarfsanalyse. Dank moderner KI-gestützter Entwicklung sind wir
                5–10x günstiger als traditionelle Großagenturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für eine moderne, entlastende Praxis-Website in Gießen?
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
              Kostenlose Praxis-Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
