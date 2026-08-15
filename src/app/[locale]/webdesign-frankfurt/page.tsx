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
  CurrencyEur,
  Scales,
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
      title: 'Web Design Frankfurt | Next.js Agency & Enterprise B2B – Coday',
      description:
        'High-end web design & Next.js web development in Frankfurt am Main. 100/100 PageSpeed, enterprise security & measurable B2B leads for finance and tech.',
      path: '/en/webdesign-frankfurt',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Frankfurt | Next.js Agentur & Enterprise B2B – Coday',
    description:
      'High-End Webdesign & Next.js Webentwicklung in Frankfurt am Main. 100/100 PageSpeed, Enterprise-Sicherheit & messbare B2B-Leads für Finanz & Mittelstand.',
    path: '/de/webdesign-frankfurt',
    type: 'money',
  });
}

export default async function WebdesignFrankfurtPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-frankfurt#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Frankfurt',
        url: `${BASE_URL}/${_locale}/webdesign-frankfurt`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Frankfurt Rhein-Main / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.1109,
          longitude: 8.6821,
        },
        areaServed: [
          { '@type': 'City', name: 'Frankfurt am Main' },
          { '@type': 'City', name: 'Offenbach am Main' },
          { '@type': 'City', name: 'Eschborn' },
          { '@type': 'City', name: 'Bad Homburg vor der Höhe' },
          { '@type': 'City', name: 'Oberursel' },
          { '@type': 'AdministrativeArea', name: 'Metropolregion Frankfurt Rhein-Main' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Darmstadt' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-frankfurt#service`,
        name: 'High-End Webdesign & Enterprise Webentwicklung Frankfurt',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Enterprise Webentwicklung',
          'B2B Corporate Webdesign',
          'FinTech & Kanzlei Webportale',
          'Headless CMS Migration & WordPress Ablösung',
          'Core Web Vitals Performance Tuning',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dienstleistungen für Frankfurt am Main & Rhein-Main',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js Enterprise Webentwicklung',
                description:
                  'Maßgeschneiderte Webplattformen für FinTechs, Enterprise-B2B und Konzerne mit subsekundären Ladezeiten.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Corporate Webdesign für Kanzleien & Beratung',
                description:
                  'Minimalistisches, hochseriöses UI/UX-Design für Wirtschaftskanzleien, Notariate und M&A-Boutiquen.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless CMS Migration & WordPress Ablösung',
                description:
                  'Ablösung wartungsintensiver Monolithen durch statisch vorkompilierte Edge-Architekturen mit Sanity CMS.',
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
            ENTERPRISE WEBENTWICKLUNG FÜR FRANKFURT AM MAIN & RHEIN-MAIN
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Frankfurt:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Digitale Exzellenz mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir befreien Frankfurter B2B-Unternehmen, FinTechs, Kanzleien und Mittelständler von
            trägen WordPress-Monolithen und überteuerten Netzwerk-Agenturen. Durch maßgeschneiderte
            Next.js-Architekturen, subsekundäre Ladezeiten und lückenlose Enterprise-Sicherheit
            schaffen wir Webplattformen, die im internationalen Wettbewerb überzeugen und messbare
            B2B-Leads generieren.
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
                CMS-Sicherheitsrisiko
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">45 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Reaktionszeit via A5 Direkt
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Senior-Entwicklung
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: WIRTSCHAFTS-DNA FRANKFURT AM MAIN */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Frankfurter Markt-Realität
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites den Anforderungen der Finanzmetropole nicht genügen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              In Frankfurt entscheidet digitale Geschwindigkeit über Multi-Millionen-Mandate und
              internationale Partnerschaften. Träge Monolithen bremsen das Wachstum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <CurrencyEur className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Überteuerte Agenturen ohne technische Tiefe
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Frankfurter Agenturen verlangen fünfstellige Monatsetats für
                Standard-WordPress-Themes, die von Praktikanten zusammengesteckt werden und nach
                wenigen Monaten im Plugin- und Update-Chaos versinken.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sekundenbruchteile entscheiden über Mandate
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Im Bankenviertel, Westend und Westhafen akzeptieren anspruchsvolle Mandanten,
                Investoren und Vorstände keine 4 Sekunden Ladezeit. Träge Websites signalisieren
                technologische Rückständigkeit.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sicherheitsrisiken & DSGVO-Haftung
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Veraltete CMS-Installationen mit dutzenden Third-Party-Plugins sind ein permanentes
                Einfallstor für Botnetze und Datenschutzverstöße – untragbar für Kanzleien, FinTechs
                und Finanzdienstleister.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS VS. WORDPRESS / TYPO3 */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Enterprise-Architektur
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Headless Next.js & Sanity CMS statt fehleranfälliger PHP-Monolithen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Statisch vorkompilierte Edge-Auslieferung für weltweite Latenz unter 0,3 Sekunden bei
              maximaler Sicherheit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise-Sicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Statische Edge-Generierung ohne öffentlich erreichbare Datenbank im Web. Immun gegen
                SQL-Injections, DDoS und Brute-Force-Attacken auf CMS-Logins.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                0% CMS-Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Radikale DSGVO-Konformität</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Zero External CDNs, Zero US-Tracking-Lecks. Sämtliche Fonts, Icons und Assets laufen
                100 % self-hosted für höchste Compliance.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Self-Hosted Privacy
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Modernes Headless Publishing</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Volle redaktionelle Freiheit für Marketing-Teams über Sanity CMS – in Echtzeit,
                fehlersicher und ohne Risiko, Code oder Layouts zu zerstören.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity CMS Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR FRANKFURT AM MAIN */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialisierte Branchenlösungen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              High-End Plattformen für die Leitbranchen der Metropole Frankfurt
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Digitale Architekturen, maßgeschneidert für die anspruchsvollsten B2B-Märkte
              Deutschlands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Bankenviertel & Westend
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  FinTech, Private Equity & Asset Management
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochperformante, bankensichere Portale mit interaktiven Datenvisualisierungen,
                  geschützten Investorenbereichen und millisekundenschneller Interaktion für
                  institutionelle Partner.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Bankensichere Authentifizierung & Verschlüsselung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Interaktive Realtime-Datenvisualisierung
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Westhafen, Taunusanlage & Innenstadt
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Wirtschaftskanzleien, Notariate & M&A-Beratung
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Exklusive, minimalistische UI/UX mit subtilen Framer-Motion-Animationen, die
                  höchste Diskretion, Seriosität und digitale Innovationsführerschaft ausstrahlen.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Edle Typografie & diskrete Nutzerführung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte Mandanten- & Expertenprofile
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Europaviertel, Hanauer Landstraße & Gateway Gardens
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  B2B-Enterprise, SaaS & Technologie-Dienstleister
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Skalierbare Web-Applikationen, hochkonvertierende Lead-Funnels und blitzschnelle
                  Dokumentations-Center für globale Kunden und anspruchsvolle Entwickler.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Modernste Next.js React 19 Frontend-Logik
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Nahtlose CRM- & Marketing-Automation-Pipelines
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
              Messbare Fakten
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Klassische Frankfurter Großagentur vs. Coday High-End Webentwicklung
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
                  <td className="p-4 sm:p-6 text-red-400">30 – 50 / 100 (Mangelhaft)</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    98 – 100 / 100 (Perfekt)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">First Contentful Paint</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,0 – 4,8 Sekunden</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Unter 0,3 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Wartungsaufwand & Risiken</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Wöchentliche manuelle Plugin-Updates & Brüche
                  </td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Wartungsfrei & unzerstörbar
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsrisiko</td>
                  <td className="p-4 sm:p-6 text-red-400">
                    Hoch (Dauerhaftes Ziel von Botnetzen & Scans)
                  </td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    0% Angriffsfläche (Statische Edge-Dateien)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Hosting & Skalierbarkeit</td>
                  <td className="p-4 sm:p-6 text-slate-400">Server-Überlastung bei Lastspitzen</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Weltweite Edge CDN Verteilung
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: FRANKFURT-WETZLAR-ACHSE */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Senior-Partnerschaft auf Augenhöhe
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                45 Minuten via A5: Direkte Vor-Ort-Präsenz in Frankfurt am Main
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Von unserem Headquarter in Wetzlar trennen uns lediglich 68 Kilometer und 45 Minuten
                Fahrtzeit über die A5-Direktachse von Frankfurt. Wir bieten persönliche Betreuung
                vor Ort in Ihrem Frankfurter Büro oder Kanzleisitz.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Ob für strategische Konzeptions-Workshops im Westend, Bankenviertel, Westhafen oder
                Gateway Gardens: Sie arbeiten direkt mit dem leitenden Software-Architekten und
                Digitalstrategen Umutcan Emre Tezgel zusammen – ohne Agentur-Wasserkopf und ohne
                Reibungsverluste.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Vor-Ort-Termine in Frankfurt innerhalb von 45 Minuten</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkter Draht zum Senior-Entwickler ohne Account-Manager</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>100 % Eigentum an Quellcode und Design – kein Vendor-Lock-in</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A5 DIREKT • 45 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Frankfurt
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir behandeln Ihre digitale Infrastruktur nicht als austauschbares
                Marketing-Projekt, sondern als hochkritisches Vertriebs-Asset. Sie erhalten
                erstklassige Handwerksqualität zum garantierten Festpreis.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Frankfurt & Metropolregion:
                </div>
                Frankfurt (Bankenviertel, Westend, Westhafen, Europaviertel, Sachsenhausen, Ostend),
                Offenbach am Main, Eschborn, Bad Homburg, Oberursel & Bad Vilbel.
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
            Bereit für den digitalen Spitzenplatz in Frankfurt?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Erfahren Sie in einer konkreten Schwachstellenanalyse, wie viel Umsatzpotenzial und
            qualifizierte B2B-Anfragen Ihre aktuelle Website durch Ladezeiten und veraltete
            Strukturen verliert.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns die Web-Adresse Ihres Unternehmens via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                Wir erstellen eine 10-minütige Schwachstellen-Analyse mit konkreten
                Handlungsschritten.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Frankfurt oder digital per Video-Call.
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
            Regionale Vernetzung & Standorte Frankfurt Rhein-Main & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Headquarter & Norden</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar (A5/A45)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-giessen"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Gießen (A5 Nord)
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
              <div className="text-white font-medium mb-3">Taunus & Hochtaunus</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-bad-homburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Bad Homburg vor der Höhe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-oberursel"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Oberursel & Taunus
                  </Link>
                </li>
                <li>
                  <Link
                    href="/regionen/main-taunus-kreis"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Main-Taunus-Kreis & Eschborn
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Südhessen & Landeshauptstadt</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-wiesbaden"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wiesbaden (A66)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-darmstadt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Darmstadt (A5 Süd)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-offenbach"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Offenbach am Main
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
                    Enterprise Webentwicklung Next.js
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Frankfurt am Main
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
