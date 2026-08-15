import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
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
      title: 'Web Design Friedberg | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Friedberg & Bad Nauheim. 100/100 PageSpeed, maximum security & B2B leads. Request your free audit now!',
      path: '/en/webdesign-friedberg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Friedberg | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Friedberg & Bad Nauheim. 100/100 PageSpeed, maximale Sicherheit & B2B-Leads. Jetzt Audit anfordern!',
    path: '/de/webdesign-friedberg',
    type: 'money',
  });
}

export default async function WebdesignFriedbergPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/webdesign-friedberg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Friedberg',
        url: `${BASE_URL}/${_locale}/webdesign-friedberg`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Mittelhessen / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.3355,
          longitude: 8.7547,
        },
        areaServed: [
          { '@type': 'City', name: 'Friedberg (Hessen)' },
          { '@type': 'City', name: 'Bad Nauheim' },
          { '@type': 'City', name: 'Butzbach' },
          { '@type': 'City', name: 'Rosbach vor der Höhe' },
          { '@type': 'City', name: 'Karben' },
          { '@type': 'City', name: 'Bad Vilbel' },
          { '@type': 'AdministrativeArea', name: 'Wetteraukreis' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Darmstadt' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-friedberg#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Friedberg',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Webentwicklung',
          'B2B Unternehmens-Webdesign',
          'Klinik- & Gesundheitsportale',
          'WordPress Relaunch & Headless-Migration',
          'Core Web Vitals Optimierung',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dienstleistungen für Friedberg, Bad Nauheim & Wetterau',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js B2B Webentwicklung',
                description:
                  'Maßgeschneiderte Webplattformen für Mittelstand, Ingenieurbüros und Logistiker in der Wetterau mit subsekundären Ladezeiten.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Gesundheits- & Klinik-Webdesign',
                description:
                  'Barrierefreie, performante und DSGVO-sichere Portale für Fachkliniken und medizinische Zentren in Bad Nauheim & Friedberg.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'WordPress & Typo3 Relaunch',
                description:
                  'Ablösung überladener Monolithen durch zukunftssichere, statisch vorkompilierte Edge-Architekturen mit Sanity CMS.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500/30 selection:text-rose-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/25 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-rose-400" />
            NEXT-GEN WEBENTWICKLUNG FÜR FRIEDBERG, BAD NAUHEIM & WETTERAU
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Friedberg:{' '}
            <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
              Digitale Exzellenz mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir befreien etablierte Mittelständler, B2B-Dienstleister, Kliniken und
            Handwerksbetriebe im Wetteraukreis von langsamen WordPress-Installationen und
            wartungsintensiven Baukästen. Durch blitzschnelle Next.js-Architekturen, subsekundäre
            Ladezeiten und lückenlose Sicherheit verschaffen wir Ihnen maximale Sichtbarkeit
            gegenüber dem Rhein-Main-Markt und sichern planbare Fachkräftegewinnung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-8 py-4 text-base shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02]"
              >
                Kostenloses Audit anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/work" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-850 text-slate-200 px-8 py-4 text-base"
              >
                Fallstudien ansehen
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                CMS-Sicherheitsrisiko
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 mb-1">30 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Reaktionszeit via A45 / B3
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Made in Hessen</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: WIRTSCHAFTS-DNA FRIEDBERG & WETTERAU */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Standort-Analyse Wetteraukreis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites den Wetterauer Mittelstand im Wettbewerb mit Frankfurt bremsen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Die Wetterau ist das Bindeglied zwischen Mittelhessen und der Metropolregion
              Rhein-Main. Wer hier digital nicht auf Champions-League-Niveau spielt, verliert
              Mandate und Fachkräfte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Frankfurt vor der Tür vs. unsichtbare Websites
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Unternehmen in Friedberg Süd oder Görbelheimer Mühle konkurrieren direkt mit
                Anbietern aus Frankfurt und Bad Homburg. Wer mit langsamen, altbackenen
                WordPress-Websites auftritt, geht digital unter und signalisiert B2B-Kunden
                mangelnde Innovationskraft.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräfte-Abfluss ins Rhein-Main-Gebiet
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Qualifizierte Absolventen der THM Friedberg (IT, Wirtschaftsingenieurwesen,
                Logistik) und Facharbeiter pendeln nach Frankfurt, weil regionale Arbeitgeber auf
                trägen Karriereseiten ohne 60-Sekunden-Smartphone-Bewerbung keine moderne Employer
                Brand bieten.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Verlust lukrativer B2B-Mandate & Leads
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Über 50 % der gewerblichen Entscheider springen ab, wenn Ladezeiten 4 Sekunden
                überschreiten. Veraltete Theme-Systeme mit dutzenden Plugins vernichten wertvolle
                B2B-Anfragen und werden von Google bei regionalen Suchanfragen abgestraft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS VS. WORDPRESS / TYPO3 */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Architektur-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Headless Next.js & Sanity CMS statt wartungsintensiver Monolithen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Maximale Sicherheit für sensible Daten von Kliniken und B2B-Dienstleistern bei voller
              redaktioneller Flexibilität.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Unknackbare Unternehmenssicherheit
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Statische Edge-Auslieferung ohne öffentlich erreichbare SQL-Datenbank. Vollkommener
                Schutz für vertrauliche Mandanten-, Klinik- und Unternehmensdaten – immun gegen
                Brute-Force-Attacken und Bot-Scans.
              </p>
              <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
                0% CMS-Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% DSGVO-Konformität</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Lokales Hosting sämtlicher Schriftarten, Icons und Medien ohne externe US-Tracker
                oder unsichere Drittanbieter-Plugins. Absolute Rechtssicherheit für Unternehmen im
                Wetteraukreis.
              </p>
              <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
                Self-Hosted Privacy
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intuitive Sanity CMS Pflege</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ihr Marketing-Team pflegt Leistungen, Stellenanzeigen und Fachbeiträge eigenständig
                in Echtzeit – fehlersicher, visuell geführt und ohne Programmierkenntnisse.
              </p>
              <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
                Sanity CMS Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR FRIEDBERG & BAD NAUHEIM */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Regionale Branchen-Kompetenz
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Branchenspezifische High-End Lösungen für die Wetterau
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Digitale Architekturen, die exakt zu den wirtschaftlichen Stärken von Friedberg und
              Bad Nauheim passen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  Gesundheitszentrum Bad Nauheim & Friedberg
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Gesundheitswirtschaft, Fachkliniken & Medizintechnik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochgradig barrierefreie, extrem performante Portale mit intuitiver Termin- und
                  Leistungsübersicht, klaren Patienten-Funnels und rechtssicherer Datenverarbeitung.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  Barrierefreiheit nach BITV / WCAG 2.1
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  Sichere Patienten- & Terminstrecken
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  Friedberg Süd & Görbelheimer Mühle
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  B2B-Dienstleister, Ingenieure & Logistik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Digitale Vertriebskanäle mit interaktiven Service-Präsentationen,
                  Framer-Motion-Interaktionen und direkter B2B-Leadqualifizierung zur Abgrenzung vom
                  Frankfurter Wettbewerb.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  Interaktive Projekt- & Leistungsübersichten
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  Direkte CRM- & Lead-Schnittstellen
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  Butzbach, Rosbach, Karben & Bad Vilbel
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Handwerks- & Bauunternehmen</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Mobile-First-Recruiting-Funnels zur Direktgewinnung von Meistern, Monteuren und
                  Auszubildenden in unter 60 Sekunden direkt über das Smartphone ohne
                  Lebenslauf-Barrieren.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  60-Sekunden Express-Bewerbung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  Lokale Google-Search Dominanz in der Wetterau
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PERFORMANCE VERGLEICHSTABELLE */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbare Fakten
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Klassische Agentur vs. Coday High-End Webentwicklung
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der direkte technische Vergleich zwischen überladenen Theme-Baukästen und unserer
              maßgeschneiderten Next.js-Architektur.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-6 font-bold">Kriterium</th>
                  <th className="p-4 sm:p-6 font-bold text-red-400">
                    Standard-Agentur (WordPress / Elementor)
                  </th>
                  <th className="p-4 sm:p-6 font-bold text-rose-400 bg-rose-950/30">
                    Coday (Next.js / Headless)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google PageSpeed (Mobil)</td>
                  <td className="p-4 sm:p-6 text-red-400">30 – 50 / 100 (Mangelhaft)</td>
                  <td className="p-4 sm:p-6 text-rose-400 bg-rose-950/20 font-bold">
                    98 – 100 / 100 (Perfekt)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">First Contentful Paint</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,0 – 5,0 Sekunden</td>
                  <td className="p-4 sm:p-6 text-rose-400 bg-rose-950/20 font-bold">
                    Unter 0,5 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Wartungsaufwand & Risiken</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Wöchentliche manuelle Plugin-Updates
                  </td>
                  <td className="p-4 sm:p-6 text-rose-400 bg-rose-950/20 font-bold">
                    Wartungsfrei & stabil
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsrisiko</td>
                  <td className="p-4 sm:p-6 text-red-400">
                    Hoch (Dauerhaftes Ziel von Botnetzen & Scans)
                  </td>
                  <td className="p-4 sm:p-6 text-rose-400 bg-rose-950/20 font-bold">
                    0% Angriffsfläche (Statische Edge-Dateien)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Hosting & Skalierbarkeit</td>
                  <td className="p-4 sm:p-6 text-slate-400">Server-Überlastung bei Lastspitzen</td>
                  <td className="p-4 sm:p-6 text-rose-400 bg-rose-950/20 font-bold">
                    Weltweite Edge CDN Verteilung
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: WETTERAU-MITTELHESSEN-ACHSE */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-rose-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Regionale Partnerschaft
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                30 Minuten via A45 / A5 / B3: Direkte Nähe und Vor-Ort-Präsenz
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Von unserem Headquarter in Wetzlar trennen uns lediglich 42 Kilometer und 28 bis 30
                Minuten Fahrtzeit von Friedberg und Bad Nauheim. Wir bieten persönliche
                Partnerschaft auf Augenhöhe direkt in Ihrem Betrieb.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Ob für strategische Konzeptions-Workshops in Friedberg Süd, Bad Nauheim oder
                Butzbach: Sie arbeiten direkt mit dem leitenden Software-Architekten und
                Digitalstrategen Umutcan Emre Tezgel zusammen – ohne Agentur-Wasserkopf.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>
                    Vor-Ort-Termine in Friedberg, Bad Nauheim & Wetterau innerhalb von 30 Minuten
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>Direkter Draht zum Senior-Entwickler ohne Reibungsverluste</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>100 % Eigentum an Quellcode und Design – kein Vendor-Lock-in</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-rose-400 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/40">
                A45/B3 • 30 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für den Wetteraukreis
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir behandeln Ihre digitale Infrastruktur nicht als isoliertes Projekt, sondern als
                geschäftskritisches Vertriebs-Asset. Sie erhalten erstklassige Handwerksqualität zum
                garantierten Festpreis.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">Einsatzgebiet Wetteraukreis:</div>
                Friedberg, Bad Nauheim, Butzbach, Rosbach vor der Höhe, Karben, Bad Vilbel,
                Wölfersheim, Florstadt & Niddatal.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & AUDIT FUNNEL */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-rose-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
            Kostenloses Website-Audit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für den digitalen Vorsprung in Friedberg & Wetterau?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Erfahren Sie in einer konkreten Schwachstellenanalyse, wie viel Umsatzpotenzial und
            qualifizierte Bewerber Ihre aktuelle Website durch Ladezeiten und veraltete Strukturen
            verliert.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns die Web-Adresse Ihres Unternehmens via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                Wir erstellen eine 10-minütige Schwachstellen-Analyse mit konkreten
                Handlungsschritten.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Friedberg oder digital per Video-Call.
              </div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-rose-500/25 transition-all hover:scale-[1.02]"
            >
              Jetzt kostenloses Audit anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 8. SEMANTISCHE VERLINKUNG / PROXIMITY CROSS-LINKS */}
      <footer className="py-16 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 font-semibold mb-6 uppercase tracking-wider">
            Regionale Vernetzung & Standorte Mittelhessen & Wetterau
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Headquarter & Nordwesten</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-rose-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar (A45)
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-rose-400 transition-colors">
                    Webentwicklung Hessen Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Universitätsachse Nord</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/webdesign-giessen" className="hover:text-rose-400 transition-colors">
                    Webdesign Gießen (B3 Nord)
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-marburg" className="hover:text-rose-400 transition-colors">
                    Webdesign Marburg
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Metropolregion Süd</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-rose-400 transition-colors">
                    Webdesign Frankfurt (A5 Süd)
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-rose-400 transition-colors">
                    Local SEO Wetteraukreis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Wetterau & Bad Nauheim</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-rose-400 transition-colors">
                    Webdesign Bad Nauheim & Butzbach
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-rose-400 transition-colors">
                    Webdesign Karben & Bad Vilbel
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Coday Webagentur. Alle Rechte vorbehalten.</div>
            <div className="flex gap-6">
              <Link href="/legal/impressum" className="hover:text-slate-200 transition-colors">
                Impressum
              </Link>
              <Link href="/legal/datenschutz" className="hover:text-slate-200 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
