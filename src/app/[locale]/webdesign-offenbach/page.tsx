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
  PaintBrush,
  Car,
  Cube,
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
      title: 'Web Design Offenbach | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Offenbach am Main. 100/100 PageSpeed, top-tier design & B2B leads. Request your free audit now!',
      path: '/en/webdesign-offenbach',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Offenbach | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Offenbach am Main. 100/100 PageSpeed, Top-Design & B2B-Leads. Jetzt Audit anfordern!',
    path: '/de/webdesign-offenbach',
    type: 'money',
  });
}

export default async function WebdesignOffenbachPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-offenbach#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Offenbach',
        url: `${BASE_URL}/${_locale}/webdesign-offenbach`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Offenbach Rhein-Main / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.1006,
          longitude: 8.7667,
        },
        areaServed: [
          { '@type': 'City', name: 'Offenbach am Main' },
          { '@type': 'City', name: 'Neu-Isenburg' },
          { '@type': 'City', name: 'Dietzenbach' },
          { '@type': 'City', name: 'Mühlheim am Main' },
          { '@type': 'AdministrativeArea', name: 'Kreis Offenbach' },
          { '@type': 'AdministrativeArea', name: 'Metropolregion Frankfurt Rhein-Main' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-offenbach#service`,
        name: 'High-End Webdesign & B2B Webentwicklung Offenbach am Main',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js B2B Webentwicklung',
          'Design- & Kreativagentur Webportale',
          'Automotive & Mobilität Plattformen',
          'B2B Großhandel & E-Commerce Webapplikationen',
          'Core Web Vitals & Headless CMS Architektur',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Entwicklungsleistungen für Offenbach am Main & Rhein-Main',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kreativ- & Medien-Webportale',
                description:
                  'Ästhetisch makellose Websites mit extrem flüssigen Framer-Motion-Interaktionen für die Offenbacher Kreativwirtschaft.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Automotive & Headquarter Portale',
                description:
                  'Hochgradig sichere, performante Plattformen mit mehrsprachiger Architektur für multinationale Zentralen am Kaiserlei.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless Next.js Relaunch',
                description:
                  'Ablösung überladener WordPress-Themes durch blitzschnelle, wartungsfreie Edge-Websites.',
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
            DESIGN-EXZELLENZ & NEXT-GEN WEBENTWICKLUNG FÜR OFFENBACH
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Offenbach:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Ästhetik trifft 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Offenbach verbindet außergewöhnliche Design-Kultur mit moderner Dienstleistungskraft.
            Wir entwickeln kompromisslos schnelle Next.js-Websites für anspruchsvolle
            B2B-Unternehmen, Automotive-Partner und kreative Dienstleister am Kaiserlei und im Hafen
            Offenbach.
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
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Performance Score</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Sicherheitslücken</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">50 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Erreichbarkeit ab Wetzlar
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">Top-Tier</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">UI/UX Design</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: OFFENBACHS DYNAMISCHER WANDEL */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Offenbacher Markt-Dynamik
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites im modernen Offenbacher Wettbewerb scheitern
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Zwischen Kaiserlei-Transformation, Hafen Offenbach und dynamischer Agenturszene setzt
              der Markt höchste Maßstäbe an visuelle Ästhetik und technische Performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <PaintBrush className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Generische Baukästen ohne Design-Identität
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                In einer Stadt mit starker Designtradition (HfG) fallen lieblose Standard-Themes
                sofort negativ auf. Sie vermitteln Austauschbarkeit statt Innovationskraft.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Verlorene B2B-Leads im Rhein-Main-Gebiet
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Entscheider aus Frankfurt und der Region vergleichen schnell. Träge Ladezeiten und
                überladene Menüstrukturen führen zum sofortigen Absprung zur Konkurrenz.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sicherheitsrisiken für Headquarter & Automotive
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Internationale Firmen am Kaiserlei unterliegen strengen IT-Sicherheitsaudits.
                Monolithische PHP-Systeme mit Dutzenden Plugins bestehen diese Prüfungen selten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS EDGE VS. MONOLITH */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologische Exzellenz
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js Edge & Sanity CMS: Perfekte Symbiose aus Design & Speed
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              High-End UI/UX-Interaktionen kombiniert mit weltweiter subsekundärer Latenz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100/100 PageSpeed</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Statische Vorkompilierung und modernste Bildoptimierung sorgen für Ladezeiten unter
                0,3 Sekunden auf allen Endgeräten.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Maximaler Google Score
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Maximale Datensicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Keine angreifbare Datenbank oder PHP-Laufzeitumgebung im Web. Vollständige
                DSGVO-Konformität durch lokales Hosting aller Assets.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                100% DSGVO & IT-Sicher
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Nahtloses Headless CMS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Marketing- und Redaktionsteams bearbeiten Inhalte strukturiert über Sanity CMS –
                ohne das präzise Design-Layout zu gefährden.
              </p>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Sanity CMS Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR OFFENBACH */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Branchencluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Digitale Maßarbeit für Offenbachs Leitbranchen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Individuelle Weblösungen für Designunternehmen, Automobilkonzerne und den B2B-Handel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Hafen Offenbach & Nordend
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Design-, Medien- & Kommunikationsunternehmen
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ästhetisch anspruchsvolle Showcases mit extrem flüssigen
                  Framer-Motion-Interaktionen, edler Typografie und beeindruckenden
                  Portfolio-Inszenierungen.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Interaktive Projekt-Showcases & Micro-Animations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Pixelgenaue Umsetzung anspruchsvoller Layouts
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Kaiserlei & Strahlenbergerstraße
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Automotive & europäische Zentralen
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochgradig sichere, performante Portale mit mehrsprachiger Architektur,
                  zertifizierten Sicherheitsstandards und nahtloser Händler- oder Partner-Anbindung.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Enterprise-Security & Multilingual Next.js
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Händler- & Standortfinder mit Subsekunden-Suche
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Waldhof, Bieber & Innovationscampus
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  B2B-Großhandel & Dienstleistungs-KMU
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Strukturierte Produktkataloge, effiziente B2B-Anfragestrecken und moderne
                  Karriere-Center zur gezielten Mitarbeitergewinnung im Rhein-Main-Gebiet.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Strukturierte B2B-Sortimentspräsentationen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Mobile-First Bewerbungsprozesse
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
              Agentur-Standard vs. Coday Next.js High-End
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der klare Vergleich zwischen überladenen Theme-Baukästen und unserer maßgeschneiderten
              Next.js-Architektur.
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
                  <td className="p-4 sm:p-6 text-red-400">30 – 55 / 100</td>
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
                  <td className="p-4 sm:p-6 font-semibold text-white">Design-Präzision & Motion</td>
                  <td className="p-4 sm:p-6 text-slate-400">Ruckelnde Plugin-Animationen</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    60fps flüssige Framer-Motion
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsaufwand</td>
                  <td className="p-4 sm:p-6 text-red-400">Wöchentliche Sicherheitsrisiken</td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    0% Angriffsfläche (Edge Static)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Skalierbarkeit & Hosting</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Lokaler Server gerät bei Last ins Stocken
                  </td>
                  <td className="p-4 sm:p-6 text-amber-400 bg-amber-950/20 font-bold">
                    Globales Edge CDN ohne Ausfallrisiko
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: OFFENBACH-WETZLAR */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Senior-Partnerschaft Rhein-Main
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                In 50 Minuten vor Ort in Offenbach am Main
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Über die A45 / A5 / A661 erreichen wir Offenbach von unserem Wetzlarer Headquarter
                aus in nur 50 Minuten. Wir bieten persönliche Betreuung vor Ort im Kaiserlei, Hafen
                Offenbach oder in Ihren Büros im gesamten Kreis Offenbach.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sie arbeiten direkt mit dem Inhaber und leitenden Software-Architekten Umutcan Emre
                Tezgel zusammen – ohne Agentur-Wasserkopf, mit höchster Verbindlichkeit und
                garantiertem Festpreis.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Persönliche Beratung vor Ort in Offenbach & Umgebung</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direkte technische Abstimmung ohne Junior-Zwischenebene</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>100 % Eigentum an Quellcode und Design</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/40">
                A661 • 50 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Offenbach
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir vereinen Frankfurter Leistungsfähigkeit mit mittelhessischer
                Handwerks-Verbindlichkeit. Ihre Website wird zum messbaren Wettbewerbsvorteil.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Offenbach & Rhein-Main:
                </div>
                Offenbach (Hafen, Kaiserlei, Waldhof, Bieber, Bürgel), Neu-Isenburg, Dietzenbach,
                Mühlheim am Main, Dreieich, Langen & Kreis Offenbach.
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
            Bereit für den digitalen Spitzenplatz in Offenbach?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie Ihre aktuelle Website auf Core Web Vitals, Design-Schwachstellen und
            Conversion-Potenziale analysieren – fundiert, transparent und unverbindlich.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns den Link zu Ihrem aktuellen Webauftritt via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                10-minütige Analyse mit messbaren Core Web Vitals und Design-Empfehlungen.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Offenbach oder online via Video-Call.
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
            Regionale Vernetzung & Standorte Offenbach am Main & Hessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Nachbarn & Rhein-Main</div>
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
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Hanau (A66)
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-amber-400 transition-colors">
                    Webdesign Neu-Isenburg & Dreieich
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
                  <Link
                    href="/webdesign-darmstadt"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Webdesign Darmstadt (A661/A5)
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
                    Webdesign Kreis Offenbach
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
                    B2B SEO Offenbach am Main
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
