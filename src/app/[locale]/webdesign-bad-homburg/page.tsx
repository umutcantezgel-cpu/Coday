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
  Stethoscope,
  TrendUp,
  Briefcase,
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
      title: 'Web Design Bad Homburg | Next.js Agency – Coday',
      description:
        'Exclusive web design & Next.js web development in Bad Homburg vor der Höhe. 100/100 PageSpeed, enterprise security & B2B leads for premium enterprises.',
      path: '/en/webdesign-bad-homburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Bad Homburg | Next.js Agentur – Coday',
    description:
      'Exklusives Webdesign & Next.js Webentwicklung in Bad Homburg vor der Höhe. 100/100 PageSpeed, Enterprise-Sicherheit & B2B-Leads für anspruchsvolle Unternehmen.',
    path: '/de/webdesign-bad-homburg',
    type: 'money',
  });
}

export default async function WebdesignBadHomburgPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-bad-homburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Bad Homburg',
        url: `${BASE_URL}/${_locale}/webdesign-bad-homburg`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Bad Homburg / Hochtaunus / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.2267,
          longitude: 8.6133,
        },
        areaServed: [
          { '@type': 'City', name: 'Bad Homburg vor der Höhe' },
          { '@type': 'City', name: 'Oberursel' },
          { '@type': 'City', name: 'Friedrichsdorf' },
          { '@type': 'City', name: 'Kronberg im Taunus' },
          { '@type': 'City', name: 'Königstein im Taunus' },
          { '@type': 'AdministrativeArea', name: 'Hochtaunuskreis' },
          { '@type': 'AdministrativeArea', name: 'Metropolregion Frankfurt Rhein-Main' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-bad-homburg#service`,
        name: 'High-End Webdesign & Medizintechnik Webentwicklung Bad Homburg',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js High-End Webentwicklung',
          'Healthcare & Medizintechnik Webportale',
          'Family Offices & Private Wealth Plattformen',
          'Kanzleien & Notariate Webdesign',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für Bad Homburg & den Hochtaunuskreis',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Healthcare & Medizintechnik Plattformen',
                description:
                  'Höchste Compliance- und Sicherheitsstandards für Bad Homburger Medizintechnik- und Pharmaunternehmen.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Family Office & Vermögensberatung Webauftritte',
                description:
                  'Exklusive Ästhetik, diskrete Benutzerführung und subsekundäre Ladezeiten für das gehobene Vermögensmanagement.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kanzleien & Facharztzentren Webdesign',
                description:
                  'Minimalistisches Luxus-Design mit klarer Autorität und nahtloser digitaler Mandanten- & Patientenakquise.',
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
            EXKLUSIVE WEBENTWICKLUNG FÜR BAD HOMBURG & DEN HOCHTAUNUS
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Bad Homburg:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Perfektion mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Bad Homburg verlangt nach digitaler Exzellenz. Wir befreien Unternehmen, Family Offices,
            Medizintechnik-Pioniere und Kanzleien von gewöhnlichen Baukasten-Websites und schaffen
            maßgeschneiderte Next.js-Plattformen, die höchste Diskretion, Seriosität und technische
            Perfektion vereinen.
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">35 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Vor-Ort-Präsenz via A5
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Maßgeschneidertes Unikat
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: HOCHTAUNUS-KAUFKRAFT & DISKRETION */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Der Anspruch in Bad Homburg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Agenturen an Bad Homburgs Klientel scheitern
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Bad Homburg vereint globale Healthcare-Konzerne, exklusive Vermögensverwalter und
              hochkarätige Kanzleien. Generische Baukästen zerstören hier das Vertrauen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <TrendUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Mangel an digitaler Exklusivität
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Vermögende Privatkunden und internationale B2B-Partner erkennen billige
                Agentur-Templates sofort. Ein unsauberes Design untergräbt Ihre
                Premium-Positionierung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sicherheitsrisiken & Datenschutzmängel
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Im Healthcare- und Wealth-Management sind Datenpannen existenzbedrohend. Veraltete
                PHP/WordPress-Systeme bieten permanente Angriffsflächen für Exploits.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Teure Agentur-Wasserköpfe ohne Resultate
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Überhöhte Retainer für Junior-Entwickler und endlose Feedbackschleifen. Bei Coday
                arbeiten Sie direkt mit dem leitenden Software-Architekten zum Festpreis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS EDGE VS. WORDPRESS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Enterprise-Architektur
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js Edge & Sanity CMS: Diskretion, Ästhetik & Spitzenleistung
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Statische Vorkompilierung, weltweites CDN-Caching und absolute Wartungsfreiheit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subsekundäre Ladezeiten</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Unter 0,3 Sekunden Latenz. Hochauflösende Image-Showcases und interaktive Berichte
                laden augenblicklich ohne jedes Ruckeln.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100/100 Core Web Vitals
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Absolute Datensicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Keine offene SQL-Datenbank im Netz. Immun gegen Brute-Force-Attacken, DDoS und
                automatisierte Hacker-Bots.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                0% CMS Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Headless Sanity CMS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ihr Team pflegt Pressemitteilungen, Fachartikel und Insights in Echtzeit über eine
                maßgeschneiderte, aufgeräumte Redaktionsoberfläche.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity Headless CMS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR BAD HOMBURG */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Standortcluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßlösungen für Bad Homburgs Spitzenbranchen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Präzise Architekturen für Medizintechnik-Konzerne, Family Offices und Kanzleien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Fresenius-Achse & Atzelnest
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Healthcare, Medizintechnik & Pharma
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Höchste Sicherheits- und Compliance-Standards, lückenlose DSGVO-Konformität,
                  barrierefreie Informationsarchitektur und internationale Multi-Language-Systeme.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Konformität mit BFSG / BITV 2.0 & ISO-Standards
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte Produkt- & Zulassungsdokumentation
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Kurpark & Kaiser-Friedrich-Promenade
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Family Offices & Private Wealth Management
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Exklusivste typografische Gestaltung, dezente Farbwelten, absolute Diskretion und
                  subsekundäre Ladezeiten für vermögende Privatkunden und Family Offices.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Minimalistische, zeitlose Luxus-Typografie
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Diskrete, passwortgeschützte Investoren-Bereiche
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Louisenstraße & Mitte
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Wirtschaftskanzleien, Notariate & Privatpraxen
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Prägnante Positionierung für hochspezialisierte Rechtsberater, Notare und
                  Privatärzte zur planbaren Gewinnung erstklassiger Mandate und Privatpatienten.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Diskrete Online-Termin- & Mandatsanfragen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Lokale Google-Dominanz im Hochtaunuskreis
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
              Messbare Exzellenz
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Klassische Agentur vs. Coday Next.js High-End
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Qualität, die dem gehobenen Bad Homburger Anspruch gerecht wird.
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
                  <td className="p-4 sm:p-6 text-red-400">35 – 55 / 100</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    98 – 100 / 100
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Ladezeit (LCP / FCP)</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,0 – 4,5 Sekunden</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Unter 0,3 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsanfälligkeit</td>
                  <td className="p-4 sm:p-6 text-red-400">Hohes Risiko durch Plugin-Lücken</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    0% Angriffsfläche (Edge Static)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Design & Typografie</td>
                  <td className="p-4 sm:p-6 text-slate-400">Generische Theme-Vorlagen</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    100% Handgefertigte Luxus-Ästhetik
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Betreuung & Kommunikation</td>
                  <td className="p-4 sm:p-6 text-slate-400">Anonyme Ticket-Systeme</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Direkter Draht zum Senior-Architekten
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: BAD HOMBURG - WETZLAR */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Direktachse über die A5
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 35 Minuten vor Ort in Bad Homburg & Hochtaunus
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die A45 und A5 trennen uns von Bad Homburg lediglich 52 Kilometer und rund 35
                Minuten Fahrtzeit. Wir sind diskret und persönlich bei Ihnen vor Ort in der
                Louisenstraße, im Kurpark-Viertel oder im Gewerbegebiet Atzelnest.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit dem Inhaber und leitenden Software-Architekten Umutcan Emre
                Tezgel zusammen – ohne Agentur-Wasserkopf, mit höchster Diskretion und zum
                garantierten Festpreis.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Beratung vor Ort in Bad Homburg & Hochtaunus</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkter Draht zur technischen Leitung</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>100 % Sourcecode- und Design-Eigentum</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A5 DIREKT • 35 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Bad Homburg
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir kreieren digitale Meisterwerke, die Ihre Exklusivität und Expertise im
                Hochtaunus unanfechtbar widerspiegeln.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Bad Homburg & Hochtaunus:
                </div>
                Bad Homburg (Mitte, Kirdorf, Dornholzhausen, Ober-Erlenbach), Oberursel,
                Friedrichsdorf, Kronberg, Königstein & Hochtaunuskreis.
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
            Bereit für den digitalen Spitzenplatz in Bad Homburg?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie Ihre aktuelle Website auf Core Web Vitals, Architektur-Schwachstellen und
            Conversion-Potenziale analysieren – transparent, fundiert und unverbindlich.
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
                10-minütige Analyse mit konkreten Handlungsschritten für Ladezeit und B2B-Leads.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Bad Homburg oder online via Video-Call.
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
            Regionale Vernetzung & Standorte Bad Homburg, Hochtaunus & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Nachbarn & Hochtaunus</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-frankfurt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Frankfurt am Main (A661)
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
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Oberursel & Kronberg
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
                    Webdesign Gießen (A5)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webdesign-marburg"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Marburg
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Rhein-Main & Südhessen</div>
              <ul className="space-y-2">
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
                <li>
                  <Link
                    href="/webdesign-offenbach"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Offenbach
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
                    Enterprise B2B-Webentwicklung
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-amber-400 transition-colors">
                    B2B SEO Bad Homburg
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
