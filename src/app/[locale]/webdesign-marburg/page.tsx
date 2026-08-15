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
      title: 'Web Design Marburg | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Marburg. 100/100 PageSpeed, maximum security & measurable B2B inquiries for pharma, biotech and industry. Request your free audit now!',
      path: '/en/webdesign-marburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Marburg | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Marburg. 100/100 PageSpeed, höchste Sicherheit & messbare B2B-Anfragen. Jetzt Audit anfordern!',
    path: '/de/webdesign-marburg',
    type: 'money',
  });
}

export default async function WebdesignMarburgPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-marburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Marburg',
        url: `${BASE_URL}/${_locale}/webdesign-marburg`,
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
          latitude: 50.802172,
          longitude: 8.766793,
        },
        areaServed: [
          { '@type': 'City', name: 'Marburg' },
          { '@type': 'City', name: 'Cölbe' },
          { '@type': 'City', name: 'Weimar (Lahn)' },
          { '@type': 'City', name: 'Lahntal' },
          { '@type': 'City', name: 'Ebsdorfergrund' },
          { '@type': 'City', name: 'Kirchhain' },
          { '@type': 'City', name: 'Stadtallendorf' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Marburg-Biedenkopf' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Gießen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-marburg#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Marburg',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Webentwicklung',
          'B2B Webdesign & UI/UX',
          'WordPress Relaunch & Headless-Migration',
          'Core Web Vitals Optimierung',
          'Pharma & Biotech Web-Portale',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dienstleistungen für Marburg & Marburg-Biedenkopf',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js Webentwicklung & Pharma-Portale',
                description:
                  'Sichere, vorkompilierte Edge-Websites für Behringwerke-Zulieferer, Biotech- und Industrieunternehmen.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Webdesign & UI/UX Design',
                description:
                  'Maßgeschneiderte digitale Plattformen mit subsekundären Ladezeiten für globale Partner und Einkäufer.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'WordPress Sicherheits-Migration & Relaunch',
                description:
                  'Ablösung wartungsintensiver PHP- und CMS-Systeme durch moderne Headless-Architektur mit Sanity CMS.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/25 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-emerald-400" />
            NEXT-GEN WEBENTWICKLUNG FÜR MARBURG & MARBURG-BIEDENKOPF
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Marburg:{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Digitale Exzellenz mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir befreien technologiegetriebene Betriebe, Pharma- und Biotech-Zulieferer sowie
            etablierte Mittelständler aus Marburg von langsamen WordPress-Installationen und
            unsicheren CMS-Monolithen. Mit maßgeschneiderter Next.js-Architektur, subsekundären
            Ladezeiten und lückenloser DSGVO-Sicherheit sichern wir Ihren globalen Marktvorsprung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 text-base shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]"
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
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                CMS-Sicherheitsrisiko
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">30 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Reaktionszeit via B3
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Made in Mittelhessen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS SECTION: MARBURGER WIRTSCHAFTS-DNA */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Lokale Analyse Marburg & Umland
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum Standard-Websites der Marburger Innovationskraft nicht gerecht werden
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Der Standort Marburg verbindet historische Tradition mit weltweiter Spitzenforschung.
              Viele digitale Auftritte hemmen jedoch das Wachstum und die Mitarbeitergewinnung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Flask className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Weltklasse-Forschung vs. veraltete Baukästen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Am Standort Behringwerke (Görzhausen & Marbach) und der Philipps-Universität
                entstehen Innovationen von weltweiter Tragweite. Wenn Zulieferer und Mittelständler
                in Cappel oder Wehrda mit veralteten Baukasten-Websites auftreten, signalisiert dies
                internationalen Partnern technologischen Stillstand.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Verlust von Spitzenkräften & Forschern
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hochqualifizierte Absolventen und Fachkräfte wandern nach Frankfurt oder Kassel ab,
                weil regionale Karriereseiten frustrierend langsam laden, nicht mobil optimiert sind
                und bürokratische Hürden wie umständliche PDF-Formulare aufbauen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Schlechte Core Web Vitals & Sicherheitsrisiken
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Alte WordPress- oder Typo3-Installationen sind dauerhafte Angriffsziele für Botnetze
                und weisen mobile Ladezeiten von über 4 Sekunden auf. Das führt zu schlechten
                Google-Rankings und dem direkten Verlust lukrativer B2B-Anfragen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR & RELAUNCH: NEXT.JS VS. WORDPRESS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Architektur-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Headless Next.js & Sanity CMS statt fehleranfälliger Monolithen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Maximale Sicherheit für sensible B2B- und Life-Science-Daten bei voller redaktioneller
              Flexibilität ohne Programmieraufwand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Unknackbare Sicherheit (Zero-Trust)
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Statische Edge-Auslieferung via Vercel ohne öffentlich erreichbare SQL-Datenbank.
                Perfekt für sensible B2B-, Life-Science- und Pharma-Zulieferer in Marburg, die keine
                Sicherheitsrisiken eingehen dürfen.
              </p>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                0% CMS-Angriffsvektoren
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% DSGVO-Souveränität</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Lokales Hosting aller Schriftarten, Assets und Medien ohne unkontrollierte
                US-Tracker oder riskante Drittanbieter-Plugins. Absolute Rechtssicherheit für Ihr
                Unternehmen in Hessen.
              </p>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Self-Hosted Privacy
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sanity CMS Echtzeit-Pflege</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Maßgeschneiderte, visuelle Redaktionsoberfläche für Ihr Team. Aktualisieren Sie
                Fachartikel, Case Studies und Job-Angebote in Echtzeit ohne Programmierkenntnisse
                und ohne Risiko von Design-Fehlern.
              </p>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Fehlersichere Redaktion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR DEN STANDORT MARBURG */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezialisierte Wirtschafts-Cluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Branchenspezifische High-End Lösungen für Marburg & Biedenkopf
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Maßgeschneiderte Architekturen für die führenden Wirtschaftszweige der Region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Behringwerke, Görzhausen & Marbach
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Pharma, Biotech & Medizintechnik-Zulieferer
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Extrem sichere, hochperformante Unternehmensportale mit schneller Bereitstellung
                  technischer Spezifikationen, interaktiven Visualisierungen und internationaler
                  Skalierbarkeit (i18n) für globale Märkte.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Latenzfreie Bereitstellung von Spezifikationen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Globale Mehrsprachigkeit & Compliance
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  TTZ Marburg & Campus-Umfeld
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Akademische Spin-offs, Software & Consulting
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Modernste Web-Architekturen mit flüssigen Framer-Motion-Interaktionen, die
                  Investoren, internationale Partner und B2B-Kunden unmittelbar von technologischer
                  Exzellenz und Innovationsvorsprung überzeugen.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Moderne UI/UX & Micro-Animations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Investoren- & B2B-Lead-Fokus
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Wehrda, Cappel & Kirchhain/Stadtallendorf
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Industrie, Handwerk & Mittelstand
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Mobile-First-Recruiting-Funnels und digitale B2B-Anfrage-Systeme, die Bewerbungen
                  und qualifizierte Anfragen in unter 60 Sekunden direkt über das Smartphone ohne
                  Hürden erfassen.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  60-Sekunden Express-Bewerbungsstrecke
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Regionale Google-Search Dominanz
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
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbare Fakten
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Standard-Agentur vs. Coday High-End Webentwicklung
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
                    Standard-Agentur (WordPress)
                  </th>
                  <th className="p-4 sm:p-6 font-bold text-emerald-400 bg-emerald-950/30">
                    Coday (Next.js / Headless)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google PageSpeed (Mobil)</td>
                  <td className="p-4 sm:p-6 text-red-400">25 – 55 / 100 (Mangelhaft)</td>
                  <td className="p-4 sm:p-6 text-emerald-400 bg-emerald-950/20 font-bold">
                    98 – 100 / 100 (Perfekt)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">First Contentful Paint</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,0 – 5,0 Sekunden</td>
                  <td className="p-4 sm:p-6 text-emerald-400 bg-emerald-950/20 font-bold">
                    Unter 0,5 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Wartungsaufwand</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Wöchentliche manuelle Plugin-Updates
                  </td>
                  <td className="p-4 sm:p-6 text-emerald-400 bg-emerald-950/20 font-bold">
                    Wartungsfrei & stabil
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsrisiko</td>
                  <td className="p-4 sm:p-6 text-red-400">
                    Hoch (Dauerhaftes Ziel von Brute-Force & Bot-Scans)
                  </td>
                  <td className="p-4 sm:p-6 text-emerald-400 bg-emerald-950/20 font-bold">
                    0% Angriffsfläche (Statische Edge-Dateien)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Hosting & Skalierbarkeit</td>
                  <td className="p-4 sm:p-6 text-slate-400">Server-Überlastung bei Lastspitzen</td>
                  <td className="p-4 sm:p-6 text-emerald-400 bg-emerald-950/20 font-bold">
                    Globale Edge-Verteilung
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST (WETZLAR-MARBURG ACHSE) */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Regionale Partnerschaft
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                30 Minuten via B3: Direkte Nähe und persönliche Betreuung
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Von unserem Headquarter in Wetzlar trennen uns rund 30 Minuten über die B3 und die
                Marburger Stadtautobahn von Ihrem Standort. Wir betreuen Unternehmen in ganz
                Marburg-Biedenkopf mit persönlicher Präsenz vor Ort.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Ob für strategische Konzeptions-Workshops am Richtsberg, in Cappel, Wehrda oder
                direkt an den Behringwerken: Sie arbeiten direkt mit dem leitenden
                Software-Architekten und Digitalstrategen Umutcan Emre Tezgel zusammen – ohne
                Agentur-Wasserkopf.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Persönliche Vor-Ort-Termine in Marburg und Umgebung</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Direkter Draht zum Senior-Entwickler ohne Zwischeninstanzen</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>100 % Eigentum an Quellcode und Design – kein Vendor-Lock-in</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/40">
                B3 • 30 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Marburg
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir behandeln Ihre digitale Infrastruktur nicht als einmaliges Projekt, sondern als
                geschäftskritisches Vertriebs- und Recruiting-Asset. Sie erhalten erstklassige
                Qualität und verlässliche Betreuung zum garantierten Festpreis.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">
                  Einsatzgebiet Marburg-Biedenkopf:
                </div>
                Marburg (Kernstadt, Behringwerke, Cappel, Wehrda), Cölbe, Weimar (Lahn), Lahntal,
                Ebsdorfergrund, Kirchhain, Stadtallendorf & Biedenkopf.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & AUDIT FUNNEL */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
            Kostenloses Website-Audit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für den digitalen Vorsprung in Marburg?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Erfahren Sie in einer konkreten Schwachstellenanalyse, wie viel Umsatzpotenzial und
            qualifizierte Bewerber Ihre aktuelle Website durch Ladezeiten und veraltete Strukturen
            verliert.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns die Web-Adresse Ihres Unternehmens via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                Wir erstellen eine 10-minütige Schwachstellen-Analyse mit konkreten
                Handlungsschritten.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Marburg oder digital per Video-Call.
              </div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02]"
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
              <div className="text-white font-medium mb-3">Headquarter & Westen</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-agentur-wetzlar"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/standorte/hessen"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Webentwicklung Hessen Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Universitätsachse Süd</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/webdesign-giessen"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Webdesign Gießen (B3 / A485)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/standorte/giessen"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Standort Gießen Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Industrieachse Ost</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/standorte/hessen"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Webdesign Kirchhain & Stadtallendorf
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-emerald-400 transition-colors">
                    Local SEO Marburg-Biedenkopf
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Landkreis Marburg-Biedenkopf</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/standorte/hessen"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Webdesign Cölbe & Lahntal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/standorte/hessen"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Webdesign Weimar & Ebsdorfergrund
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
