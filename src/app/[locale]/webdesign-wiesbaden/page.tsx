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
  Scales,
  FirstAid,
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
      title: 'Web Design Wiesbaden | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Wiesbaden. 100/100 PageSpeed, enterprise security & B2B leads. Request your free audit now!',
      path: '/en/webdesign-wiesbaden',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wiesbaden | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Wiesbaden. 100/100 PageSpeed, Enterprise-Sicherheit & B2B-Leads. Jetzt Audit anfordern!',
    path: '/de/webdesign-wiesbaden',
    type: 'money',
  });
}

export default async function WebdesignWiesbadenPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-wiesbaden#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Wiesbaden',
        url: `${BASE_URL}/${_locale}/webdesign-wiesbaden`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Wiesbaden-Rheingau / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.0826,
          longitude: 8.24,
        },
        areaServed: [
          { '@type': 'City', name: 'Wiesbaden' },
          { '@type': 'City', name: 'Mainz-Kastel' },
          { '@type': 'City', name: 'Mainz-Kostheim' },
          { '@type': 'City', name: 'Taunusstein' },
          { '@type': 'AdministrativeArea', name: 'Rheingau-Taunus-Kreis' },
          { '@type': 'AdministrativeArea', name: 'Metropolregion Frankfurt Rhein-Main' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-wiesbaden#service`,
        name: 'High-End Webdesign & B2B Webentwicklung Wiesbaden',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'Kanzlei & Notariat Webdesign',
          'Klinik & Gesundheitswesen Webportale',
          'Versicherungen & Finanzdienstleister Plattformen',
          'Core Web Vitals & Barrierefreiheit (BITV/BFSG)',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digitale Dienstleistungen für Wiesbaden & Rheingau',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kanzlei & Beratungs-Webportale',
                description:
                  'Exklusives, minimalistisches Design für Wirtschaftskanzleien, Notariate und Steuerberatungsgesellschaften an der Wilhelmstraße.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Klinik- & Fachärzte-Plattformen',
                description:
                  'BITV- und DSGVO-konforme Patientenportale mit verschlüsselter Terminvergabe und höchsten Datenschutzstandards.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js Enterprise Migration',
                description:
                  'Ablösung überladener WordPress- und Typo3-Systeme durch blitzschnelle, wartungsfreie Headless-Architekturen.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/25 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-amber-400" />
            HIGH-END WEBENTWICKLUNG FÜR DIE LANDESHAUPTSTADT WIESBADEN
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Exklusives Webdesign in Wiesbaden:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Perfektion in Design & 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir unterstützen Wiesbadener Kanzleien, Beratungsunternehmen, Fachkliniken und
            etablierte Mittelständler dabei, ihre digitale Präsenz auf internationales
            Spitzen-Niveau zu heben. Mit maßgeschneiderten Next.js-Architekturen, radikaler
            Performance und lückenloser Datensicherheit – für maximale B2B-Reputation und planbare
            Leadgewinnung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02]"
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                CMS-Sicherheitslücken
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">50 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Vor-Ort-Erreichbarkeit
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                DSGVO & BITV-Konformität
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: WIESBADENER WIRTSCHAFTSSTRUKTUR */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen in der Landeshauptstadt
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites im anspruchsvollen Wiesbadener Markt versagen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen Ministerien, Spitzenverbänden, Wilhelmstraße und Konzernzentralen entscheidet
              höchste digitale Seriosität und technische Perfektion über Vertrauen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Scales className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Hoher Konformitäts- & Reputationsdruck
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Behörden, Verbände und anspruchsvolle Privatmandanten erwarten lückenlose
                Rechtssicherheit, barrierefreie Standards (BFSG/BITV) und ein absolut makelloses
                Erscheinungsbild.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Träge Baukästen ruinieren den Ersteindruck
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Viele Wiesbadener Websites basieren auf überladenen WordPress-Themes mit langen
                Ladezeiten. Potenzielle Premium-Kunden springen nach wenigen Sekunden ab.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Datenschutzrisiken im Gesundheits- & Rechtswesen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Verschachtelte Drittanbieter-Plugins und US-Cloud-Abhängigkeiten gefährden die
                strenge Einhaltung von Berufsgeheimnissen und Patientendatenschutz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS VS. MONOLITH */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Architektur-Vorteil
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js Edge & Sanity CMS statt fehleranfälliger PHP-Installationen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Statische Vorkompilierung, blitzschnelle Reaktionszeiten und unübertroffene
              Sicherheitsarchitektur für Wiesbadens Leitbetriebe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Maximale Ausfallsicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Keine angreifbare Datenbank oder PHP-Laufzeitumgebung im Web. Immun gegen
                Brute-Force-Attacken und automatisierte CMS-Sicherheitslücken.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100% Unzerstörbar
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Radikale DSGVO-Konformität</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Sämtliche Ressourcen, Schriften und Assets werden lokal auf deutschen/europäischen
                Edge-Servern gehostet – vollkommen ohne externe US-CDN-Abhängigkeiten.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100% DSGVO-Sicher
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intuitive Inhaltsverwaltung</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Mit dem Sanity Headless CMS pflegt Ihr Team Inhalte in Echtzeit – strukturiert,
                barrierefrei und ohne die Gefahr, das Design-Layout zu beschädigen.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity CMS Plattform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR WIESBADEN */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Fokussierte Branchenlösungen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßanfertigungen für Wiesbadens Schlüsselbranchen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Individuelle Konzepte, die den hohen Standards der Landeshauptstadt gerecht werden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Wilhelmstraße & Innenstadt
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Wirtschaftskanzleien, Notariate & Steuerberater
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Minimalistisches, hochelegantes UI/UX mit subtilen Mikro-Interaktionen, das
                  Diskretion, juristische Präzision und Exzellenz vermittelt.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte Mandats- und Kompetenzbereiche
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Diskrete, SSL-verschlüsselte Kontaktstrecken
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Mainz-Kastel, Schierstein & Nordenstadt
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Versicherungen, Finanzdienstleister & Consultants
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Skalierbare B2B-Plattformen mit strukturierten Leistungsbäumen, schnellen
                  Kontaktstrecken und integrierter Lead-Qualifizierung für anspruchsvolle Kunden.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Interaktive Rechner und Bedarfsanalysen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Direkte Anbindung an bestehende CRM-Systeme
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Sonnenberg, Biebrich & Rheingau
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Privatkliniken, Fachärzte & Reha-Zentren
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  BITV-konforme, barrierefreie Portale mit schneller Online-Terminvergabe,
                  multilingualem Aufbau und absolutem Patientendatenschutz.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Barrierefreiheit nach BITV 2.0 / BFSG
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  DSGVO-konforme Patienten-Terminbuchung
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
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbare Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Agentur-Standard vs. Coday High-End Webentwicklung
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Warum moderne Next.js-Technologie veralteten CMS-Systemen in jeder Disziplin überlegen
              ist.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-6 font-bold">Kriterium</th>
                  <th className="p-4 sm:p-6 font-bold text-red-400">
                    Klassische Agentur (WordPress / Elementor)
                  </th>
                  <th className="p-4 sm:p-6 font-bold text-amber-400 bg-amber-950/30">
                    Coday (Next.js / Headless)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google PageSpeed (Mobil)</td>
                  <td className="p-4 sm:p-6 text-red-400">35 – 55 / 100</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    98 – 100 / 100
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Ladezeit (FCP / LCP)</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,2 – 4,5 Sekunden</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Unter 0,3 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Barrierefreiheit (BFSG)</td>
                  <td className="p-4 sm:p-6 text-slate-400">Mangelhaft (Theme-Abhängig)</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    100% BITV 2.0 konform
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsaufwand</td>
                  <td className="p-4 sm:p-6 text-red-400">Permanente Sicherheits-Patches nötig</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    0% Angriffsfläche (Edge Static)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Hosting-Stabilität</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Lokaler Server gerät bei Last ins Stocken
                  </td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Globales High-Speed Edge CDN
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: WIESBADEN-WETZLAR */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Regionale Nähe & Verbindlichkeit
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 50 Minuten vor Ort in Wiesbaden & im Rheingau
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Mit unserem Headquarter in Wetzlar sind wir über die A3 / B54 oder A45 / A66 in nur
                50 Minuten direkt bei Ihnen vor Ort in Wiesbaden, Mainz-Kastel oder im Rheingau.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Kein anonymer Großagentur-Wasserkopf: Sie arbeiten direkt mit dem Inhaber und
                leitenden Software-Architekten Umutcan Emre Tezgel zusammen. Von der strategischen
                Konzeption bis zum Go-Live erhalten Sie volle Transparenz und erstklassige
                Ergebnisse.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Beratung vor Ort in Wiesbaden & Umgebung</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkte Betreuung durch Senior-Entwickler ohne Reibungsverluste</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Volles Eigentum an Code, Design und Inhalten</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A3/B54 • 50 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Qualitätsversprechen für Wiesbaden
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir entwickeln Websites, die nicht nur optisch überzeugen, sondern als stabiles
                Fundament für Ihren geschäftlichen Erfolg in der Landeshauptstadt fungieren –
                nachhaltig, skalierbar und messbar erfolgreich.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Wiesbaden & Rheingau:
                </div>
                Wiesbaden (Wilhelmstraße, Biebrich, Sonnenberg, Nordenstadt, Schierstein),
                Mainz-Kastel, Mainz-Kostheim, Taunusstein, Eltville & Rheingau-Taunus-Kreis.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & AUDIT FUNNEL */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
            Kostenloses Website-Audit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für digitale Exzellenz in Wiesbaden?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie Ihre bestehende Website auf Ladezeiten, Sicherheitslücken und
            Conversion-Potenziale analysieren – transparent und unverbindlich.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns den Link zu Ihrer aktuellen Unternehmens-Website.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Analyse erhalten</div>
              <div className="text-xs text-slate-400">
                Wir decken konkrete Ladezeiten- und Barrierefreiheits-Schwachstellen auf.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Gemeinsame Besprechung vor Ort in Wiesbaden oder per Video-Call.
              </div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02]"
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
            Regionale Vernetzung & Standorte Wiesbaden & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Nachbarstädte & Region</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-frankfurt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Frankfurt am Main
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-limburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Limburg an der Lahn
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Rheingau-Taunus-Kreis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Mittelhessen & HQ</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar (HQ)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Gießen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-friedberg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Friedberg & Wetterau
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Südhessen</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Darmstadt
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Offenbach am Main
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Mainz & Rheingau
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Enterprise & Services</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/enterprise-web"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Enterprise Webentwicklung
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Wiesbaden
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Hessen Standorte Übersicht
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
