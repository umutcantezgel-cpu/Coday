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
  Truck,
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
      title: 'Web Design Limburg | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Limburg an der Lahn & Weilburg. 100/100 PageSpeed, maximum security & B2B leads. Request your free audit now!',
      path: '/en/webdesign-limburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Limburg | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Limburg an der Lahn. 100/100 PageSpeed, maximale Sicherheit & B2B-Leads. Jetzt Audit anfordern!',
    path: '/de/webdesign-limburg',
    type: 'money',
  });
}

export default async function WebdesignLimburgPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-limburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Limburg',
        url: `${BASE_URL}/${_locale}/webdesign-limburg`,
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
          latitude: 50.3845,
          longitude: 8.0647,
        },
        areaServed: [
          { '@type': 'City', name: 'Limburg an der Lahn' },
          { '@type': 'City', name: 'Diez' },
          { '@type': 'City', name: 'Weilburg' },
          { '@type': 'City', name: 'Elz' },
          { '@type': 'City', name: 'Bad Camberg' },
          { '@type': 'City', name: 'Hadamar' },
          { '@type': 'City', name: 'Runkel' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Limburg-Weilburg' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Gießen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-limburg#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Limburg',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Webentwicklung',
          'B2B Unternehmens-Webdesign',
          'WordPress Relaunch & Headless-Migration',
          'Core Web Vitals Optimierung',
          'B2B Großhandels- & Logistikportale',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dienstleistungen für Limburg, Weilburg & Diez',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js B2B Webentwicklung',
                description:
                  'Maßgeschneiderte Webplattformen für Großhandel, Logistik und Mittelstand im Limburger Becken mit subsekundären Ladezeiten.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Webdesign & Corporate Identity',
                description:
                  'Seriöse, hochkonvertierende Benutzeroberflächen für Kanzleien, Baudienstleister und Industrieunternehmen.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'WordPress Relaunch & Headless-Migration',
                description:
                  'Ablösung langsamer CMS-Monolithen durch sichere, statisch vorkompilierte Edge-Architekturen mit Sanity CMS.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/25 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-blue-400" />
            NEXT-GEN WEBENTWICKLUNG FÜR LIMBURG, WEILBURG & DIEZ
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Limburg:{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Digitale Exzellenz mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir befreien etablierte Mittelständler, Großhändler, Logistiker, Bau- und
            Handwerksbetriebe im Limburger Becken von langsamen WordPress-Installationen und
            schwerfälligen Baukästen. Durch blitzschnelle Next.js-Architekturen, subsekundäre
            Ladezeiten und lückenlose Sicherheit schaffen wir digitale Plattformen für messbare
            B2B-Leads und planbare Mitarbeitergewinnung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-8 py-4 text-base shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
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
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                CMS-Sicherheitsrisiko
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">25 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Reaktionszeit via B49
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Made in Hessen</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS: WIRTSCHAFTS-DNA LIMBURG-WEILBURG */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschafts-Knotenpunkt Limburg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites der Limburger Dynamik nicht gewachsen sind
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Limburg profitiert von einer überragenden Verkehrsanbindung an A3 und ICE-Trasse.
              Digital bremsen veraltete Systeme jedoch das Unternehmenswachstum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                ICE-Geschwindigkeit vs. Schneckentempo im Web
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Limburgs Spitzenlage an der A3 und ICE-Trasse zieht bundesweit Kunden an. Doch viele
                Websites im Gewerbegebiet Dietkirchener Höhe, Offheim oder Elz laden quälend langsam
                und vermitteln potenziellen Großkunden einen veralteten Ersteindruck.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräfte-Abwanderung nach Frankfurt & Koblenz
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Durch die ICE-Nähe pendeln viele Fachkräfte ins Rhein-Main-Gebiet oder nach Koblenz.
                Regionale Arbeitgeber verlieren den Wettbewerb um Talente, weil Karriereseiten
                unattraktiv wirken und komplizierte Hürden statt schneller Smartphone-Bewerbungen
                aufbauen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Buildings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Verlust lukrativer B2B- & Großhandels-Leads
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Über 50 % der gewerblichen Einkäufer brechen den Besuch ab, wenn Ladezeiten 4
                Sekunden überschreiten. Veraltete WordPress-Themes mit dutzenden Plugins vernichten
                reale Umsatzchancen im B2B-Handel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR: NEXT.JS VS. WORDPRESS / ELEMENTOR */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Architektur-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Headless Next.js & Sanity CMS statt fehleranfälliger Monolithen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Schluss mit Plugin-Chaos und ständigen Sicherheitswarnungen. Wir setzen auf
              vorkompilierte, blitzschnelle Edge-Architekturen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kompromisslose Datensicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Statische Edge-Auslieferung ohne öffentlich erreichbare Datenbank im Web.
                Vollkommener Schutz für vertrauliche Großhandels-, Finanz- und Kanzleidaten – immun
                gegen Brute-Force-Attacken.
              </p>
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                0% CMS-Angriffsfläche
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% DSGVO-Konformität</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Lokales Hosting sämtlicher Schriften, Icons und Skripte ohne riskante
                Drittanbieter-Tracker. Absolute Rechtssicherheit für Unternehmen in
                Limburg-Weilburg.
              </p>
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Self-Hosted Privacy
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intuitive Sanity CMS Pflege</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ihr Marketing-Team pflegt Produkte, Stellenangebote und Neuigkeiten eigenständig in
                Echtzeit – fehlersicher, visuell geführt und ohne Programmierkenntnisse.
              </p>
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Sanity CMS Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR LIMBURG AN DER LAHN */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Branchen-Kompetenz
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Branchenspezifische High-End Lösungen für den Standort Limburg
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Digitale Architekturen, die exakt zu den wirtschaftlichen Stärken der Region passen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                  Dietkirchener Höhe, Offheim & Elz
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  B2B-Großhandel, Logistik & Distribution
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hochperformante B2B-Portale, interaktive Sortimentsübersichten und
                  millisekundenschnelle Bereitstellung von technischen Produktdaten und Katalogen
                  für Großabnehmer und Händler.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  Latenzfreie Katalog- & Sortimentsfilter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  ERP- & Warenwirtschafts-Anbindung
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                  Limburg, Hadamar & Weilburg
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Bauwirtschaft, Handwerk & Technische Betriebe
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Mobile-First-Recruiting-Funnels zur Direktgewinnung von Monteuren, Meistern und
                  Facharbeitern in unter 60 Sekunden direkt über das Smartphone – ohne Anschreiben.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  60-Sekunden Express-Bewerbung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  Regionale Google-Search Dominanz
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                  ICE-City Limburg Süd & Innenstadt
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Kanzleien, Beratung & Finanzdienstleister
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Exklusive UI/UX-Gestaltung mit subtilen Framer-Motion-Interaktionen, die
                  Seriosität, digitale Innovationskraft und höchstes Vertrauen bei anspruchsvollen
                  Mandanten vermitteln.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  Exklusives, minimalistisches Design
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  Verifizierte Vertrauens- & Mandanten-Funnels
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
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
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
                  <th className="p-4 sm:p-6 font-bold text-blue-400 bg-blue-950/30">
                    Coday (Next.js / Headless)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google PageSpeed (Mobil)</td>
                  <td className="p-4 sm:p-6 text-red-400">30 – 50 / 100 (Mangelhaft)</td>
                  <td className="p-4 sm:p-6 text-blue-400 bg-blue-950/20 font-bold">
                    98 – 100 / 100 (Perfekt)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">First Contentful Paint</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,0 – 5,0 Sekunden</td>
                  <td className="p-4 sm:p-6 text-blue-400 bg-blue-950/20 font-bold">
                    Unter 0,5 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Wartungsaufwand & Risiken</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Wöchentliche manuelle Plugin-Updates
                  </td>
                  <td className="p-4 sm:p-6 text-blue-400 bg-blue-950/20 font-bold">
                    Wartungsfrei & stabil
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsrisiko</td>
                  <td className="p-4 sm:p-6 text-red-400">
                    Hoch (Dauerhaftes Ziel von Botnetzen & Scans)
                  </td>
                  <td className="p-4 sm:p-6 text-blue-400 bg-blue-950/20 font-bold">
                    0% Angriffsfläche (Statische Edge-Dateien)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Hosting & Skalierbarkeit</td>
                  <td className="p-4 sm:p-6 text-slate-400">Server-Überlastung bei Lastspitzen</td>
                  <td className="p-4 sm:p-6 text-blue-400 bg-blue-950/20 font-bold">
                    Weltweite Edge CDN Verteilung
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST: B49-WEST-ACHSE */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Regionale Partnerschaft
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                25 Minuten via B49: Direkte Nachbarschaft und Vor-Ort-Präsenz
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Von unserem Headquarter in Wetzlar trennen uns lediglich 38,5 Kilometer und 25 bis
                28 Minuten Fahrtzeit über die vierspurig ausgebaute B49 von Limburg. Wir bieten
                echte Partnerschaft auf Augenhöhe direkt in Ihrem Betrieb.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Ob für strategische Konzeptions-Workshops auf der Dietkirchener Höhe, in Offheim,
                Weilburg oder der ICE-City: Sie arbeiten direkt mit dem leitenden
                Software-Architekten und Digitalstrategen Umutcan Emre Tezgel zusammen – ohne
                Agentur-Wasserkopf.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>
                    Vor-Ort-Termine in Limburg und Umgebung innerhalb von 25 bis 30 Minuten
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>Direkter Draht zum Senior-Entwickler ohne Reibungsverluste</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>100 % Eigentum an Quellcode und Design – kein Vendor-Lock-in</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-blue-400 px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/40">
                B49 • 25 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Limburg-Weilburg
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir behandeln Ihre digitale Infrastruktur nicht als isoliertes Projekt, sondern als
                geschäftskritisches Vertriebs-Asset. Sie erhalten erstklassige Handwerksqualität zum
                garantierten Festpreis.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Limburg-Weilburg & Diez:
                </div>
                Limburg (Kernstadt, Dietkirchener Höhe, Offheim), Diez, Weilburg, Elz, Bad Camberg,
                Hadamar, Runkel, Beselich & Villmar.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & AUDIT FUNNEL */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
            Kostenloses Website-Audit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für den digitalen Vorsprung in Limburg?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Erfahren Sie in einer konkreten Schwachstellenanalyse, wie viel Umsatzpotenzial und
            qualifizierte Bewerber Ihre aktuelle Website durch Ladezeiten und veraltete Strukturen
            verliert.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns die Web-Adresse Ihres Unternehmens via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                Wir erstellen eine 10-minütige Schwachstellen-Analyse mit konkreten
                Handlungsschritten.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Limburg oder digital per Video-Call.
              </div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02]"
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
            Regionale Vernetzung & Standorte Mittelhessen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <div className="text-white font-medium mb-3">Headquarter & Osten</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar (B49)
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-blue-400 transition-colors">
                    Webentwicklung Hessen Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Oberzentrum Ost</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/webdesign-giessen" className="hover:text-blue-400 transition-colors">
                    Webdesign Gießen (B49 Ost)
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign-marburg" className="hover:text-blue-400 transition-colors">
                    Webdesign Marburg (B3)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Industrieachse Dilltal</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/webdesign-herborn" className="hover:text-blue-400 transition-colors">
                    Webdesign Herborn & Dillenburg
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-blue-400 transition-colors">
                    Local SEO Limburg-Weilburg
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Landkreis Limburg-Weilburg</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-blue-400 transition-colors">
                    Webdesign Weilburg & Bad Camberg
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-blue-400 transition-colors">
                    Webdesign Diez, Elz & Hadamar
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
