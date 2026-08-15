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
  Cpu,
  Flask,
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
      title: 'Web Design Darmstadt | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Darmstadt. 100/100 PageSpeed, enterprise security & B2B leads. Request your free audit now!',
      path: '/en/webdesign-darmstadt',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Darmstadt | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Darmstadt. 100/100 PageSpeed, Enterprise-Sicherheit & B2B-Leads. Jetzt Audit anfordern!',
    path: '/de/webdesign-darmstadt',
    type: 'money',
  });
}

export default async function WebdesignDarmstadtPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-darmstadt#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Darmstadt',
        url: `${BASE_URL}/${_locale}/webdesign-darmstadt`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Darmstadt-Dieburg / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 49.8728,
          longitude: 8.6512,
        },
        areaServed: [
          { '@type': 'City', name: 'Darmstadt' },
          { '@type': 'City', name: 'Weiterstadt' },
          { '@type': 'City', name: 'Griesheim' },
          { '@type': 'City', name: 'Pfungstadt' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Darmstadt-Dieburg' },
          { '@type': 'AdministrativeArea', name: 'Metropolregion Frankfurt Rhein-Main' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-darmstadt#service`,
        name: 'High-End Webdesign & Software Webentwicklung Darmstadt',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js High-Tech Webentwicklung',
          'SaaS & Software B2B Portale',
          'Life-Sciences & Chemie Webdesign',
          'Ingenieur- & Messtechnik Webapplikationen',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für die Wissenschaftsstadt Darmstadt',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SaaS & IT-Software Plattformen',
                description:
                  'Modulare Next.js-Frontend-Architekturen mit interaktiver Dokumentation, API-Anbindungen und schnellen Lead-Funnels.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Life-Sciences & Chemie B2B Webportale',
                description:
                  'Streng datenschutzkonforme, strukturierte Portale für komplexe B2B-Produktwelten und regulatorische Anforderungen.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless Next.js Migration',
                description:
                  'Ablösung veralteter PHP- und WordPress-Installationen durch reaktionsschnelle, wartungsfreie Edge-Websites.',
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
            HIGH-TECH WEBENTWICKLUNG FÜR DIE WISSENSCHAFTSSTADT DARMSTADT
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Darmstadt:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Digitale Spitzenleistung mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Darmstadt steht für exzellente Forschung, IT-Innovation und Hightech. Wir entwickeln
            Webplattformen auf modernstem Next.js-Standard, die diesem Anspruch gerecht werden –
            blitzschnell, sicherheitsgehärtet und für anspruchsvolle B2B-Entscheider und IT-Talente
            optimiert.
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
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Lighthouse Score</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Sicherheitsrisiko</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Modern React & Next.js
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">&lt;300ms</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Globale Edge Latenz
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: HIGHTECH-ANSPRUCH VS. REALITÄT */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wissenschaftsstadt Darmstadt
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Baukasten-Websites dem Darmstädter Hightech-Anspruch schaden
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Software-Entwickler, Forscher und B2B-Käufer erkennen unsauberen Code und langsame
              Ladezeiten sofort. Veraltete WordPress-Websites schrecken Top-Talente und Kunden ab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Diskrepanz zwischen Produkt & Webauftritt
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Viele Darmstädter Unternehmen entwickeln hochmoderne Software oder
                Hightech-Hardware, präsentieren sich online jedoch auf überladenen, langsamen
                PHP-Themes aus dem Jahr 2018.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Wettbewerbsnachteil im IT-Recruiting
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Die TU Darmstadt und die Fraunhofer-Institute bilden erstklassige Entwickler aus.
                Eine langsame Karriereseite mit schlechter UX signalisiert mangelnde technologische
                Modernität.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sicherheitsbedenken bei internationalen Partnern
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Globale Konzerne und Raumfahrt-/Telekom-Partner führen vor Vertragsabschluss strenge
                Security-Audits durch. Schwachstellen in CMS-Plugins führen zur Disqualifikation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS & REACT 19 VS. MONOLITH */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Engineering-Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js & Headless Architecture: Software-Handwerk auf Weltklasse-Niveau
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Modernste Webtechnologie, maßgeschneidert für die Anforderungen forschungs- und
              technologiegetriebener Unternehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subsekundäre Performance</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Statische Vorkompilierung und Edge-Routing sorgen dafür, dass jede Seite in unter
                300 Millisekunden vollständig gerendert ist – weltweit.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100/100 Core Web Vitals
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gehärtete Edge-Sicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ohne öffentliche SQL-Datenbanken oder PHP-Interpreter entfallen 99 % der typischen
                Web-Sicherheitsrisiken vollkommen.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                0% CMS Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strukturierte Daten & APIs</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Nahtlose Anbindung von Sanity CMS, CRM-Systemen (HubSpot, Salesforce) und internen
                APIs ohne Plugin-Ballast.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Headless CMS Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR DARMSTADT */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialisierte Technologiefelder
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Maßgeschneiderte Webplattformen für Darmstadts Schlüsselbranchen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Digitale Lösungen, die komplexe technische Inhalte klar und konvertierend vermitteln.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  TIZ, Europaviertel & Telekom City
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  SaaS, Softwareanbieter & IT-Dienstleister
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Modulare, API-gestützte Plattformen mit interaktiver Dokumentation, interaktiven
                  Feature-Previews und schnellen Lead-Funnels für anspruchsvolle B2B-Kunden.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Interaktive Produkttouren & Code-Snippets
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Optimierte Developer- & Tech-UX
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Merck-Umfeld, Kranichstein & Weiterstadt
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Life Sciences, Pharma & Spezialchemie
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Streng datenschutzkonforme, strukturierte Portale für komplexe B2B-Produkte,
                  Forschungsergebnisse und internationale Fachpublikum-Kommunikation.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte Produktkataloge mit Filterfunktionen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Konformität mit Compliance- & Pharma-Standards
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Griesheim, Pfungstadt & Weiterstadt
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Ingenieurbüros, Photonik & Messtechnik
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Präzise 3D- und Datenpräsentationen mit flüssigen Framer-Motion-Animationen ohne
                  Performance-Einbußen – für maximale Überzeugungskraft im Maschinenbau.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Subtile Scroll-Animationen & Datenblätter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  B2B-Anfragekonfiguratoren für Sonderbauten
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
              Agentur-Durchschnitt vs. Coday High-End Next.js
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              In Darmstadt schätzt man belastbare Zahlen: So schneidet unsere Architektur im
              direkten Vergleich ab.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-6 font-bold">Kriterium</th>
                  <th className="p-4 sm:p-6 font-bold text-red-400">
                    Klassische Agentur (WordPress / Theme)
                  </th>
                  <th className="p-4 sm:p-6 font-bold text-amber-400 bg-amber-950/30">
                    Coday (Next.js 15 & React 19)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google Lighthouse Score</td>
                  <td className="p-4 sm:p-6 text-red-400">30 – 55 / 100</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    98 – 100 / 100
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Time to Interactive (TTI)</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,5 – 5,0 Sekunden</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Unter 0,3 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">
                    Code-Qualität & TypeScript
                  </td>
                  <td className="p-4 sm:p-6 text-slate-400">Ungetyptes PHP / Spaghetti-Code</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    100% Strict TypeScript
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsanfälligkeit</td>
                  <td className="p-4 sm:p-6 text-red-400">Hohes CVE-Risiko durch Plugins</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    0% Angriffsfläche (Edge Static)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Entwickler-Experience</td>
                  <td className="p-4 sm:p-6 text-slate-400">Proprietäres Theme-Lock-in</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Modernster Standard-Stack
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: DARMSTADT-WETZLAR */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Senior-Entwicklung ohne Reibungsverlust
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 55 Minuten vor Ort in Darmstadt & Weiterstadt
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die A45 / A5 Direktachse erreichen wir Darmstadt von unserem Wetzlarer
                Headquarter aus in weniger als einer Stunde. Wir stehen für persönliche
                Sparringspartner-Termine, Architektur-Reviews und Projekt-Kick-offs direkt in Ihrem
                Unternehmen bereit.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie sprechen direkt mit dem leitenden Software-Architekten Umutcan Emre Tezgel – von
                Entwickler zu Entscheider, mit technischer Tiefe und ohne vertriebliche Floskeln.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Vor-Ort-Termine in Darmstadt & Region</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkte technische Abstimmung ohne Junior-Zwischenebene</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>100 % Sourcecode-Eigentum & Git-Transparenz</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A5 DIREKT • 55 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Der Coday-Standard für Hightech-Unternehmen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir bauen keine Wegwerf-Websites, sondern wartungsfreie, skalierbare digitale
                Flaggschiffe, die mit Ihrem technologischen Wachstum Schritt halten.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Darmstadt & Südhessen:
                </div>
                Darmstadt (Europaviertel, TIZ, Kranichstein, Eberstadt), Weiterstadt, Griesheim,
                Pfungstadt, Dieburg, Groß-Umstadt & Landkreis Darmstadt-Dieburg.
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
            Bereit für den digitalen Spitzenplatz in Darmstadt?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie Ihre bestehende Webplattform auf Core Web Vitals, Architektur-Schwachstellen
            und Conversion-Potenziale analysieren – fundiert, präzise und unverbindlich.
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
              <div className="font-bold text-white text-sm mb-1">Technisches Audit erhalten</div>
              <div className="text-xs text-slate-400">
                10-minütige Videoanalyse mit messbaren Core Web Vitals und Architektur-Fakten.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Architekturgespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Darmstadt oder Remote-Termin via Video-Call.
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
            Regionale Vernetzung & Standorte Darmstadt & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Rhein-Main & Nachbarn</div>
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
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Bensheim & Bergstraße
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
              <div className="text-white font-medium mb-3">Landkreis & Region</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Landkreis Darmstadt-Dieburg
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Offenbach am Main
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Hanau
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
                    Enterprise Next.js Webentwicklung
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Darmstadt
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
