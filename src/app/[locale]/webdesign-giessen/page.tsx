import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import BlurText from '@/shared/ui/BlurText';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';
import CountUp from '@/shared/ui/CountUp';
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  Lightning,
  ShieldCheck,
  Code,
  DeviceMobile,
  Buildings,
  ChartBar,
  Users,
  Check,
  X,
  Sparkle,
  Cpu,
  LockKey,
  GlobeHemisphereWest,
  CaretRight,
  PaperPlaneTilt,
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
      title: 'Web Design Giessen | Next.js Agency for Mid-Market – Coday',
      description:
        'Custom web design & Next.js web development in Giessen. 100/100 PageSpeed, accessible medical portals & B2B talent recruiting. Request your audit now!',
      path: '/en/webdesign-giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Gießen | Next.js Agentur für Mittelstand – Coday',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Gießen. 100/100 PageSpeed, barrierefreie Praxisportale & B2B-Mitarbeitergewinnung. Jetzt anfragen!',
    path: '/de/webdesign-giessen',
    type: 'money',
  });
}

export default async function WebdesignGiessenPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-giessen#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Gießen',
        url: `${BASE_URL}/${_locale}/webdesign-giessen`,
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
          latitude: 50.587274,
          longitude: 8.67554,
        },
        areaServed: [
          { '@type': 'City', name: 'Gießen' },
          { '@type': 'City', name: 'Linden' },
          { '@type': 'City', name: 'Pohlheim' },
          { '@type': 'City', name: 'Wettenberg' },
          { '@type': 'City', name: 'Heuchelheim an der Lahn' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Gießen' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Gießen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-giessen#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Gießen',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: [
          'Next.js Webentwicklung',
          'B2B Webdesign',
          'WordPress Relaunch & Sicherheits-Migration',
          'Core Web Vitals Optimierung',
          'Mobile-First Recruiting-Funnels',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dienstleistungen für Gießen & Mittelhessen',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js Webentwicklung & Relaunch',
                description:
                  'Maßgeschneiderte Webentwicklung ohne Page-Builder für subsekundäre Ladezeiten und kompromisslose Sicherheit.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Webdesign & Conversion-Optimierung',
                description:
                  'Verkaufspsychologisch optimiertes Webdesign für Industrie, Medizintechnik und Kanzleien im Raum Gießen.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'WordPress Sicherheits-Migration',
                description:
                  'Ablösung langsamer, unsicherer WordPress-Websites durch moderne Headless-Architektur mit Sanity CMS.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950/80 to-slate-950 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-cyan-400" />
            NEXT-GEN WEBENTWICKLUNG FÜR GIESSEN & MITTELHESSEN
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            High-End Webdesign in Gießen:{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Digitale Exzellenz mit 100/100 PageSpeed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Wir befreien Gießener Mittelständler, Industrieunternehmen und Medizintechnik-Pioniere
            von überladenen, langsamen WordPress-Installationen. Durch maßgeschneiderte Next.js
            Architekturen, subsekundäre Ladezeiten und verlässliche Sicherheit schaffen wir digitale
            Plattformen, die messbar B2B-Aufträge und Top-Fachkräfte anziehen.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 text-base shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
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
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">100/100</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Core Web Vitals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                CMS-Angriffsfläche
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">15 Min</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Reaktionszeit via B49
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                Made in Mittelhessen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS SECTION */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Lokale Marktanalyse Gießen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Warum herkömmliche Standard-Websites die Gießener Wirtschaft ausbremsen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Die Region Gießen ist akademisch und industriell hochgradig innovativ. Viele
              Webauftritte hinken diesem Anspruch jedoch um Jahre hinterher.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-red-900/30 hover:border-red-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Buildings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Akademische Exzellenz vs. digitaler Stillstand
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Zwischen universitärer Spitzenforschung an THM und JLU und den realen Webauftritten
                vieler Betriebe im Schiffenberger Tal und Gewerbepark West klafft eine gravierende
                Lücke. Veraltete Baukästen signalisieren Einkäufern unbewusst Stillstand.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-900/30 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Lightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Verlust von B2B-Leads durch 4s+ Ladezeit
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Über 50 % der industriellen Entscheider brechen den Seitenbesuch auf dem Smartphone
                ab, wenn Ladezeiten 4 Sekunden überschreiten. Aufgeblähte PHP-Themes vernichten
                reale Umsatzchancen, bevor der Erstkontakt überhaupt zustande kommt.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fachkräfte-Abwanderung ins Rhein-Main-Gebiet
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Jedes Jahr verlassen Top-Absolventen die Gießener Hochschulen Richtung Frankfurt.
                Regionale Arbeitgeber verlieren den Kampf um Talente, weil Karriereseiten langsam,
                unübersichtlich und nicht für 60-Sekunden-Smartphone-Bewerbungen optimiert sind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITEKTUR & RELAUNCH: NEXT.JS VS. WORDPRESS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologische Souveränität
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Next.js & Headless CMS statt überladener WordPress-Systeme
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Warum moderne B2B-Unternehmen in Mittelhessen auf entkoppelte Webarchitekturen setzen,
              um Betriebskosten zu senken und maximale Ausfallsicherheit zu erzielen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <LockKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Unangreifbare Edge-Sicherheit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Unsere Next.js-Lösungen werden vorkompiliert und über weltweite Edge-Server
                ausgeliefert. Es gibt keine öffentlich erreichbare SQL-Datenbank mehr. Brute-Force-,
                DDoS- und Plugin-Angriffe laufen vollständig ins Leere.
              </p>
              <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                0% Angriffsvektoren
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% DSGVO-Konformität</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Wir verzichten auf unkontrollierte Third-Party-Plugins und binden Schriften, Icons
                sowie Skripte vollständig lokal ein. Keine illegalen Datenabflüsse an US-Clouds –
                absolute Rechtssicherheit für Ihr Unternehmen in Hessen.
              </p>
              <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                Zero-Tracking-Architektur
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intuitive Pflege via Sanity CMS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ihr Marketing-Team erhält eine maßgeschneiderte, deutschsprachige
                Redaktionsoberfläche. Inhalte, News und Stellenangebote werden in Echtzeit gepflegt
                – ohne Design-Bruch und ohne technisches Vorwissen.
              </p>
              <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                Fehlersichere Redaktion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANCHENLÖSUNGEN FÜR GIESSEN */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Spezifische Industrie-Cluster
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Branchenspezifische High-End Lösungen für den Standort Gießen
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Keine generischen Templates, sondern exakt auf die wirtschaftlichen Schwerpunkte
              Mittelhessens abgestimmte digitale Werkzeuge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cluster 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Europaviertel & TIG
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Medizintechnik, Life Sciences & Hightech
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Wissenschaftliche Zertifizierungen und Produktdatenblätter laden im
                  Millisekundenbereich. Wir integrieren strukturierte Mehrsprachigkeit (i18n) und
                  flüssige Framer-Motion-Interaktionen für internationale Partner und Labore.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  Latenzfreie PDF- & Datenblatt-Streams
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  Globale Skalierbarkeit für Exporteure
                </li>
              </ul>
            </div>

            {/* Cluster 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Schiffenberger Tal & Westend
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Sondermaschinenbau, Industrie & Mittelstand
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Transformation der Website in eine digitale Vertriebsmaschine. Interaktive
                  B2B-Konfiguratoren und klare Leistungsarchitekturen heben Ihr Unternehmen
                  selbstbewusst vom überregionalen Wettbewerb ab.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  Interaktive Projekt- & Produkt-Filter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  Nahtlose ERP- & CRM-Schnittstellen
                </li>
              </ul>
            </div>

            {/* Cluster 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Linden, Pohlheim & Wettenberg
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Handwerk & Technische Dienstleister
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Lösung des regionalen Fachkräftemangels durch schlanke Mobile-First
                  Recruiting-Funnels. Gesellen und Monteure bewerben sich in unter 60 Sekunden
                  direkt über das Smartphone – ohne Lebenslauf oder Anschreiben.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-6 border-t border-slate-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  60-Sekunden Express-Bewerbung
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  Lokale Google-Maps & Search Dominanz
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
            <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Messbare Fakten
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Klassische Agentur vs. Coday High-End Webentwicklung
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Sehen Sie schwarz auf weiß, warum maßgeschneiderter Code herkömmlichen Page-Buildern
              in jedem wirtschaftlichen Aspekt überlegen ist.
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
                  <th className="p-4 sm:p-6 font-bold text-cyan-400 bg-cyan-950/30">
                    Coday (Next.js / Headless)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Google PageSpeed (Mobil)</td>
                  <td className="p-4 sm:p-6 text-red-400">25 – 55 / 100 (Ungenügend)</td>
                  <td className="p-4 sm:p-6 text-cyan-400 bg-cyan-950/20 font-bold">
                    98 – 100 / 100 (Perfekt)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">First Contentful Paint</td>
                  <td className="p-4 sm:p-6 text-slate-400">3,0 – 5,5 Sekunden</td>
                  <td className="p-4 sm:p-6 text-cyan-400 bg-cyan-950/20 font-bold">
                    Unter 0,5 Sekunden
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Wartungsaufwand</td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    Wöchentliche manuelle Plugin-Updates
                  </td>
                  <td className="p-4 sm:p-6 text-cyan-400 bg-cyan-950/20 font-bold">
                    Wartungsfrei & stabil
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Sicherheitsrisiko</td>
                  <td className="p-4 sm:p-6 text-red-400">
                    Hoch (Dauerhaftes Ziel automatisierter Bot-Scans)
                  </td>
                  <td className="p-4 sm:p-6 text-cyan-400 bg-cyan-950/20 font-bold">
                    0% Angriffsfläche (Statische Edge-Dateien)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold text-white">Hosting & Skalierbarkeit</td>
                  <td className="p-4 sm:p-6 text-slate-400">Überlastung bei Lastspitzen</td>
                  <td className="p-4 sm:p-6 text-cyan-400 bg-cyan-950/20 font-bold">
                    Weltweites High-Speed Edge CDN
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROXIMITY & TRUST (WETZLAR-GIESSEN ACHSE) */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Mittelhessischer Schulterschluss
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                14,8 Kilometer: Direkte Nähe und persönliche Betreuung
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Mit unserem Headquarter in Wetzlar trennen uns lediglich 12 bis 15 Minuten Fahrtzeit
                über die B49 und den Gießener Ring von Ihrem Unternehmenssitz. Wir sind kein
                anonymes Callcenter, sondern Ihr verlässlicher Partner vor Ort.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Ob für strategische Konzeptions-Workshops, Foto- und Content-Termine im
                Europaviertel oder persönliche Board-Meetings am Seltersweg: Sie sprechen direkt mit
                dem ausführenden Senior-Architekten ohne Reibungsverluste durch Zwischeninstanzen.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Vor-Ort-Termine in Gießen und Umgebung innerhalb von 15 Minuten</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>
                    Direkte Betreuung durch Inhaber & Senior-Entwickler Umutcan Emre Tezgel
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>100 % Eigentum an Quellcode und Design – kein Vendor-Lock-in</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/40">
                B49 • 15 MIN
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Das Coday-Versprechen für Gießen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Wir behandeln Ihre digitale Infrastruktur nicht als einmaliges Projekt, sondern als
                geschäftskritisches Umsatz-Asset. Sie erhalten höchste handwerkliche Qualität und
                volle Transparenz zum garantierten Festpreis.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1">Einsatzgebiet Mittelhessen:</div>
                Gießen (Kernstadt, Schiffenberger Tal, Europaviertel), Linden, Pohlheim, Wettenberg,
                Heuchelheim, Buseck, Reiskirchen & Lahn-Dill-Kreis.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & AUDIT FUNNEL */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
            Kostenloses Website-Audit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Bereit für den digitalen Vorsprung in Gießen?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Erfahren Sie in einer konkreten Schwachstellenanalyse, wie viel Umsatzpotenzial Ihre
            aktuelle Website durch Ladezeiten, Sicherheitsrisiken und Baukasten-Strukturen verliert.
          </p>

          {/* 3-Steps Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mb-4 text-sm">
                1
              </div>
              <div className="font-bold text-white text-sm mb-1">URL einreichen</div>
              <div className="text-xs text-slate-400">
                Senden Sie uns die Web-Adresse Ihres Unternehmens via Formular.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mb-4 text-sm">
                2
              </div>
              <div className="font-bold text-white text-sm mb-1">Video-Audit erhalten</div>
              <div className="text-xs text-slate-400">
                Wir erstellen eine 10-minütige, ungeschönte Schwachstellen-Analyse.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mb-4 text-sm">
                3
              </div>
              <div className="font-bold text-white text-sm mb-1">Strategiegespräch</div>
              <div className="text-xs text-slate-400">
                Persönliches Treffen in Gießen oder digital per Video-Call.
              </div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-10 py-5 text-lg shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02]"
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
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Webdesign Agentur Wetzlar (B49)
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-cyan-400 transition-colors">
                    Webentwicklung Hessen Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Wissenschaftsachse Nord</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/landingpages/marburg"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Webdesign Marburg (B3)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/landingpages/dillenburg"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Webdesign Dillenburg
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Wirtschaftsachse Süd</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-cyan-400 transition-colors">
                    Webdesign Friedberg & Wetterau (A485)
                  </Link>
                </li>
                <li>
                  <Link href="/services/seo" className="hover:text-cyan-400 transition-colors">
                    Local SEO Mittelhessen
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3">Landkreis Gießen Umland</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/standorte/hessen" className="hover:text-cyan-400 transition-colors">
                    Webdesign Linden & Pohlheim
                  </Link>
                </li>
                <li>
                  <Link href="/standorte/hessen" className="hover:text-cyan-400 transition-colors">
                    Webdesign Wettenberg & Heuchelheim
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
