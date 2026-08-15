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
  GearSix,
  Sun,
  Truck,
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
      title: 'Web Design Kassel | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Kassel. 100/100 PageSpeed, enterprise security & B2B leads. Request your free audit now!',
      path: '/en/webdesign-kassel',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Kassel | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Kassel. 100/100 PageSpeed, Enterprise-Sicherheit & B2B-Leads. Jetzt Audit anfordern!',
    path: '/de/webdesign-kassel',
    type: 'money',
  });
}

export default async function WebdesignKasselPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-kassel#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Kassel',
        url: `${BASE_URL}/${_locale}/webdesign-kassel`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Nordhessen / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.3127,
          longitude: 9.4797,
        },
        areaServed: [
          { '@type': 'City', name: 'Kassel' },
          { '@type': 'City', name: 'Baunatal' },
          { '@type': 'City', name: 'Lohfelden' },
          { '@type': 'City', name: 'Vellmar' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Kassel' },
          { '@type': 'AdministrativeArea', name: 'Nordhessen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-kassel#service`,
        name: 'High-End Webdesign & Industrie Webentwicklung Kassel',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Industrie Webentwicklung',
          'Automotive & Mobilität Webportale',
          'Maschinenbau B2B Showcases & Konfiguratoren',
          'Erneuerbare Energien Plattformen',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für Nordhessen & Kassel',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobilitäts- & Industrie-Webportale',
                description:
                  'Extrem schnelle Bereitstellung technischer Produktdaten, B2B-Showcases und internationaler Kataloge.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Clean-Tech & Energie-Webplattformen',
                description:
                  'Modernste UI/UX für Pioniere der Energiewende mit messbarer Performance und B2B-Leadgewinnung.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless Next.js Relaunch',
                description:
                  'Ablösung schwerfälliger WordPress- und Typo3-Systeme durch hochsichere, wartungsfreie Edge-Architekturen.',
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
            HIGH-END WEBENTWICKLUNG FÜR DAS OBERZENTRUM NORDHESSEN
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Kassel:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Industrielle Exzellenz mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir unterstützen Kasseler Industrieunternehmen, Mobilitätsspezialisten, Automatisierer
            und Mittelständler bei der Ablösung schwerfälliger Websites. Mit maßgeschneiderten
            Next.js-Architekturen sichern wir digitale Spitzenleistungen für B2B-Aufträge und
            gezieltes Fachkräfte-Recruiting.
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
                CMS-Angriffsfläche
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">Direkt</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                A49 / B3 Verbindung
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Made in Hessen</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: INDUSTRIE- & MOBILITÄTSSTANDORT NORDHESSEN */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Herausforderungen in Nordhessen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites der Kasseler Industrie-Power nicht gerecht werden
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Kassel verbindet traditionsreichen Fahrzeug- und Maschinenbau mit Vorreitern der
              Energiewende. Schwache Web-Auftritte bremsen internationales B2B-Wachstum aus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Internationale Einkäufer scheitern an Ladezeiten
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                OEM-Einkäufer aus Europa und Übersee fordern blitzschnellen Zugriff auf
                Spezifikationen und Zertifikate. Träge PDF-Downloads und langsame Seiten kosten
                wertvolle RFQ-Anfragen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wettbewerb um Ingenieure & Fachkräfte
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mit der Universität Kassel und führenden Fraunhofer-Einrichtungen verfügt Nordhessen
                über herausragende Talente. Ein veralteter Webauftritt wirkt unattraktiv auf
                gesuchte Fachkräfte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wartungsfalle monolithischer CMS
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Veraltete WordPress- oder Typo3-Systeme fordern ständige Sicherheits-Updates und
                gehen bei Lastspitzen oder System-Updates regelmäßig kaputt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS VS. WORDPRESS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologische Überlegenheit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js Edge & Sanity CMS: Maximale Geschwindigkeit ohne Wartungschaos
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Statische Vorkompilierung, globale Auslieferung und modernste TypeScript-Architektur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subsekundäre Ladezeiten</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Edge-Distribution sorgt dafür, dass Ihre Website in unter 0,3 Sekunden lädt –
                unabhängig davon, wo auf der Welt Ihr B2B-Kunde aufruft.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100/100 Core Web Vitals
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Absolute IT-Sicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Keine angreifbare Datenbank oder PHP-Interpreter im Web. Vollständige Immunität
                gegen SQL-Injections und automatisierte CMS-Attacken.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                0% CMS Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Modernes Content Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ihr Marketing-Team pflegt Produkte, Referenzen und News intuitiv über Sanity CMS –
                in Echtzeit und ohne die Gefahr, Code zu zerstören.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR KASSEL */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Industrie- & Branchencluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Lösungen für die wirtschaftlichen Treiber Nordhessens
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise abgestimmt auf die Anforderungen von Produktion, Mobilität und Cleantech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Baunatal, GVZ & Kassel
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Mobilitätswirtschaft & Schienenfahrzeugtechnik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Extrem schnelle Bereitstellung technischer Datenblätter, normgerechter Zertifikate
                  und internationaler B2B-Kataloge für globale OEM-Kunden.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte Produkt- & Teiledatenbanken
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Multilinguale Auslieferung für Exportmärkte
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Waldau, Niederzwehren & Lohfelden
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Maschinen-, Sondermaschinen- & Anlagenbau
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Interaktive Systemkonfiguratoren, 3D-Showcase-Plattformen und vertrauensbildende
                  Referenzdarstellungen zur Leadgenerierung bei Entscheidern.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Interaktive B2B-Anfragekonfiguratoren
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Hochauflösende Showcase-Präsentationen
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Science Park Kassel & Vellmar
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Erneuerbare Energien & Umwelttechnik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Modernste UI/UX mit klarer Informationsarchitektur für Technologie-Pioniere, die
                  komplexe nachhaltige Lösungen verständlich und überzeugend präsentieren.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Interaktive Ertrags- & Einsparrechner
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Green-Hosting mit minimalem CO₂-Footprint
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
              Traditionelle Agentur vs. Coday Next.js High-End
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Ingenieursleistung statt fehleranfälliger Standard-Baukästen.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-6 font-bold">Kriterium</th>
                  <th className="p-4 sm:p-6 font-bold text-red-400">
                    Klassische Agentur (WordPress / PHP)
                  </th>
                  <th className="p-4 sm:p-6 font-bold text-amber-400 bg-amber-950/30">
                    Coday (Next.js / Headless)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google PageSpeed (Mobil)</td>
                  <td className="p-4 sm:p-6 text-red-400">30 – 50 / 100</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    98 – 100 / 100
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">
                    Ladezeit (First Byte / LCP)
                  </td>
                  <td className="p-4 sm:p-6 text-slate-400">3,5 – 4,8 Sekunden</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Unter 0,3 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Wartungsfreiheit</td>
                  <td className="p-4 sm:p-6 text-slate-400">Monatliche manuelle Plugin-Updates</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    100% wartungsfrei & stabil
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsarchitektur</td>
                  <td className="p-4 sm:p-6 text-red-400">Anfällig für Botnets & CMS-Exploits</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    0% Angriffsfläche (Edge Static)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">
                    Skalierung bei Lastspitzen
                  </td>
                  <td className="p-4 sm:p-6 text-slate-400">Server-Timeout bei vielen Anfragen</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Automatische globale CDN-Skalierung
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: KASSEL-WETZLAR-ACHSE */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Regionale Verbundenheit in Hessen
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                Direkte Anbindung nach Kassel via A49 / B3 Achse
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Von unserem Headquarter in Wetzlar aus erreichen wir Kassel und Baunatal direkt über
                die B3 / A49 Direktachse in rund 65 Minuten. Wir bieten persönliche Vor-Ort-Termine,
                Workshops und technische Reviews direkt in Ihrem Unternehmen.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit Gründer und Software-Architekt Umutcan Emre Tezgel zusammen.
                Keine Vermittler, keine Agentur-Reibungsverluste – nur direkte technische Exzellenz
                und klare Verbindlichkeit.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Vor-Ort-Präsenz in Kassel, Baunatal & Lohfelden</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkter Draht zur technischen Leitung</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>100 % Eigentum an Code und Design-Assets</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A49 / B3 • DIREKT
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Der Coday-Standard für Nordhessen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen digitale Plattformen, die technisch so solide konstruiert sind wie die
                Produkte des hessischen Maschinenbaus.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Kassel & Nordhessen:
                </div>
                Kassel (Waldau, Niederzwehren, Vorderer Westen, Mitte), Baunatal, Lohfelden,
                Vellmar, Fuldatal, Kaufungen & Landkreis Kassel.
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
            Bereit für digitale Spitzenleistung in Kassel?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie Ihre aktuelle Website auf Core Web Vitals, Architektur-Schwachstellen und
            Conversion-Potenziale prüfen – transparent, präzise und unverbindlich.
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
                10-minütige Analyse mit konkreten Handlungsschritten für Ladezeit und Conversion.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Kassel oder online via Video-Call.
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
            Regionale Vernetzung & Standorte Kassel, Nordhessen & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
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
                    href="/webdesign-marburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Marburg (B3)
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
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Metropolregion Frankfurt</div>
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
                    href="/webdesign-wiesbaden"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Wiesbaden
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-darmstadt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Darmstadt
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Ost- & Nordhessen</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Fulda
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Baunatal & Landkreis Kassel
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Schwalm-Eder-Kreis
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
                    Enterprise Industrie-Webentwicklung
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Kassel & Nordhessen
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
