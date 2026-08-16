import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import { TrustBar } from '@/shared/ui/TrustBar';
import { LazyQuickContactForm } from '@/widgets/home/LazyQuickContactForm';
import {
  ArrowRight,
  Lightning,
  ShieldCheck,
  Code,
  CheckCircle,
  Sparkle,
  LockKey,
  Database,
  Globe,
  ChartBar,
  ArrowsClockwise,
  Check,
  FileCode,
  Cpu,
  Warning,
  ShieldSlash,
  Gauge,
  Rocket,
  TreeStructure,
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
      title: 'WordPress to Next.js Migration Agency | Coday',
      description:
        'Migrate your website from WordPress to Next.js 15. 10x faster load times, 100% security & seamless SEO relaunch without ranking loss.',
      path: '/en/landingpages/nextjsmigration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'WordPress zu Next.js Migration | Coday Webagentur',
    description:
      'Migrieren Sie Ihre Website von WordPress auf Next.js 15. 10x schnellere Ladezeiten, 100% Sicherheit & nahtloser SEO-Relaunch ohne Ranking-Verlust.',
    path: '/de/landingpages/nextjsmigration',
    type: 'money',
  });
}

export default async function NextJsMigrationPage({
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
        '@type': 'Service',
        '@id': `${BASE_URL}/${_locale}/landingpages/nextjsmigration#service`,
        name: 'Next.js Migration Service für WordPress, Typo3 & Monolithen',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        serviceType: 'Web-Stack Migration & Headless Modernisierung',
        description:
          'Nahtlose Migration von bestehenden CMS-Systemen auf modernste Next.js 15 & React 19 Headless-Architektur mit garantierter SEO-Ranking-Sicherheit.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Next.js Migrations-Pakete',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'WordPress zu Next.js Migration',
                description:
                  'Vollständige Entkopplung, Übernahme aller Blogposts, 100% saubere 301-Redirects und Sanity Headless CMS Integration.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Typo3 & Shopware Modernisierung',
                description:
                  'Umwandlung träger Monolithen in blitzschnelle, serverlose Jamstack-Plattformen mit Ladezeiten unter 500ms.',
              },
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/${_locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${BASE_URL}/${_locale}/services/web-development`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Next.js Migration',
            item: `${BASE_URL}/${_locale}/landingpages/nextjsmigration`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Verliere ich bei der Migration auf Next.js meine bestehenden Google-Rankings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nein. Wir führen ein lückenloses URL-Mapping durch und richten für jeden Pfad exakte 301-Redirects ein. In der Praxis steigen die Rankings nach dem Relaunch durch die perfekten 100/100 Core Web Vitals und drastisch schnelleren Ladezeiten signifikant an.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie werden meine bestehenden Inhalte (Texte, Bilder, Blogposts) übertragen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir migrieren Ihre bestehenden Daten automatisiert und verlustfrei in ein modernes Headless CMS (wie Sanity). Ihre Redakteure können bestehende und neue Inhalte sofort weiterpflegen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Gibt es während der Migration eine Ausfallzeit für unsere Website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nein. Die gesamte Entwicklung und Migration erfolgt auf einer isolierten Staging-Umgebung. Ihre alte Website bleibt bis zur finalen DNS-Umschaltung 100% online. Der Switch erfolgt ohne eine Sekunde Downtime.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie viel kostet eine Migration von WordPress zu Next.js bei Coday?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir bieten verbindliche Festpreise auf Anfrage nach einer kostenlosen Analyse Ihrer aktuellen Systemarchitektur. Dank unseres spezialisierten KI-Workflows sparen Sie im Vergleich zu traditionellen Großagenturen bis zu 70% der Kosten.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie lange dauert ein vollständiges Migrationsprojekt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard-Unternehmenswebsites mit bis zu 50 Unterseiten migrieren wir in der Regel innerhalb von 10 bis 14 Werktagen schlüsselfertig ins Live-System.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen selection:bg-teal-500/20 selection:text-teal-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION MIT LEAD CAPTURE */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#fafafa]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/40 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-50 text-teal-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-sm">
            <Sparkle className="w-4 h-4 text-teal-600" />
            ENTERPRISE STACK RELAUNCH & MODERNISIERUNG
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Next.js Migration Service:{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800 bg-clip-text text-transparent">
              WordPress zu Enterprise-Speed
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Schluss mit Plugin-Chaos, Sicherheitslücken und frustrierend langsamen Ladezeiten. Wir
            transformieren Ihre bestehende Website oder Ihren Online-Shop in eine blitzschnelle,
            serverlose Next.js 15 & Headless CMS Architektur — mit 100% SEO-Ranking-Garantie und
            null Ausfallzeit. Verbindlicher Festpreis auf Anfrage.
          </p>

          {/* Lead Capture Form in Hero */}
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
              Kostenlose Migrations-Analyse anfordern
            </h2>
            <LazyQuickContactForm />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-teal-600 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                SEO-Ranking-Erhalt
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-teal-600 mb-1">&lt; 0.3s</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Ladezeit weltweit</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-teal-600 mb-1">0 ms</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Downtime beim Relaunch
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-teal-600 mb-1">0%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Plugin-Sicherheitsrisiken
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTBAR */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. VISUAL HIGHLIGHT: HACK-SIMULATOR & ANGRIFFSVEKTOR-VERGLEICH */}
      <section className="py-24 bg-[#fafafa] border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Sicherheits-Audit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Hack-Simulator: WordPress Angriffsflächen vs. Next.js Edge Shield
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Warum monolithische CMS ein permanentes Unternehmensrisiko darstellen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WordPress Vulnerability Box */}
            <div className="p-8 rounded-3xl bg-red-50/80 border border-red-200 relative shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <ShieldSlash className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="text-xl font-bold text-red-950">
                    WordPress / Monolith Angriffsvektoren
                  </h3>
                  <span className="text-xs text-red-700 font-mono font-medium">
                    Status: Hohes Ausfallrisiko
                  </span>
                </div>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white border border-red-100 shadow-sm">
                  <Warning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-950">Vulnerable Drittanbieter-Plugins:</strong>{' '}
                    Jedes Plugin erweitert die Angriffsfläche für SQL-Injections und
                    Zero-Day-Exploits.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white border border-red-100 shadow-sm">
                  <Warning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-950">PHP-Server & Direkter DB-Zugriff:</strong> Ein
                    kompromittierter Webserver legt sensible Kundendaten und Passwörter offen.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white border border-red-100 shadow-sm">
                  <Warning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-950">WP-Admin Bruteforce & REST-API Leaks:</strong>{' '}
                    Offene Schnittstellen laden automatisierte Botnetze zu DDoS-Angriffen ein.
                  </div>
                </li>
              </ul>
            </div>

            {/* Next.js Edge Shield Box */}
            <div className="p-8 rounded-3xl bg-teal-50/80 border border-teal-200 relative shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-teal-600" />
                <div>
                  <h3 className="text-xl font-bold text-teal-950">
                    Next.js 15 Edge Immunity Shield
                  </h3>
                  <span className="text-xs text-teal-700 font-mono font-medium">
                    Status: 100% Geschützt
                  </span>
                </div>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white border border-teal-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-teal-950">Read-Only Static Edge Assets:</strong> Keine
                    ausführenden PHP-Skripte auf dem Server — 0% Angriffsfläche für Malware.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white border border-teal-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-teal-950">Entkoppeltes Headless CMS:</strong> Content
                    wird via sicheren API-Tokens gepflegt, vollständig isoliert vom Frontend.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white border border-teal-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-teal-950">Globales Edge CDN & DDoS Schutz:</strong>{' '}
                    Automatische Lastverteilung und Abwehr von Bot-Attacken in Millisekunden.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL HIGHLIGHT: PAGESPEED LIVE-VERGLEICH */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Live Performance Benchmark
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Google PageSpeed Live-Vergleich: Vorher vs. Nachher
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Echte Messergebnisse einer typischen Migration auf unseren Next.js 15 Stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vorher: WordPress */}
            <div className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-red-600 tracking-wider">
                    Vor der Migration
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">WordPress Monolith</h3>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center text-xl font-black text-red-600 bg-white">
                  38
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600">LCP (Largest Contentful Paint)</span>
                  <span className="font-bold text-red-600 font-mono">4.2s (Kritisch)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600">INP (Interaction to Next Paint)</span>
                  <span className="font-bold text-amber-600 font-mono">380ms (Mäßig)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600">CLS (Cumulative Layout Shift)</span>
                  <span className="font-bold text-red-600 font-mono">0.28 (Layout-Springen)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">JavaScript Payload</span>
                  <span className="font-bold text-slate-700 font-mono">2.8 MB (Überladen)</span>
                </div>
              </div>
            </div>

            {/* Nachher: Next.js 15 */}
            <div className="p-8 rounded-3xl bg-teal-50/80 border border-teal-300 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-teal-800 tracking-wider">
                    Nach der Migration
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Coday Next.js 15 Stack</h3>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center text-xl font-black text-teal-700 bg-white shadow-md">
                  100
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-teal-200/60">
                  <span className="text-slate-600">LCP (Largest Contentful Paint)</span>
                  <span className="font-bold text-teal-700 font-mono">0.3s (Perfekt)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-teal-200/60">
                  <span className="text-slate-600">INP (Interaction to Next Paint)</span>
                  <span className="font-bold text-teal-700 font-mono">&lt; 35ms (Instant)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-teal-200/60">
                  <span className="text-slate-600">CLS (Cumulative Layout Shift)</span>
                  <span className="font-bold text-teal-700 font-mono">0.00 (Stabil)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">JavaScript Payload</span>
                  <span className="font-bold text-teal-700 font-mono">&lt; 100 KB (Optimiert)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON MATRIX: MONOLITH VS. NEXT.JS HEADLESS */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Transformation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Klassisches CMS vs. Moderne Next.js 15 Architektur
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Sehen Sie schwarz auf weiß, warum führende Unternehmen auf entkoppelte
              Headless-Systeme setzen.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-5 text-sm font-semibold text-slate-700">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-700">
                    WordPress / Typo3 Monolith
                  </th>
                  <th className="p-5 text-sm font-semibold text-teal-900 bg-teal-50/80">
                    Coday Next.js 15 Headless Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Ladezeit & TTFB</td>
                  <td className="p-5 text-slate-600">2.0s – 4.5s (Server-Rendering pro Request)</td>
                  <td className="p-5 font-bold text-teal-900 bg-teal-50/40">
                    &lt; 0.3s (Edge-Pre-Rendering & SSG)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Sicherheitsarchitektur</td>
                  <td className="p-5 text-slate-600">
                    Vulnerable Datenbanken & PHP-Skripte am Webserver
                  </td>
                  <td className="p-5 font-bold text-teal-900 bg-teal-50/40">
                    100% Immun gegen traditionelle Exploits
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Wartung & Updates</td>
                  <td className="p-5 text-slate-600">
                    Wöchentliches Plugin-Patching mit Ausfallrisiko
                  </td>
                  <td className="p-5 font-bold text-teal-900 bg-teal-50/40">
                    Zero Maintenance (Wartungsfreie Serverless-Assets)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Redaktions-Erlebnis</td>
                  <td className="p-5 text-slate-600">
                    Unübersichtliches WP-Backend mit zerschossenen Layouts
                  </td>
                  <td className="p-5 font-bold text-teal-900 bg-teal-50/40">
                    Modernes Sanity CMS mit visueller Echtzeit-Vorschau
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">SEO & Core Web Vitals</td>
                  <td className="p-5 text-slate-600">
                    Schlechter LCP/CLS durch unoptimierte Skripte
                  </td>
                  <td className="p-5 font-bold text-teal-900 bg-teal-50/40">
                    100/100 Punkte garantiert bei Google
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. DIE 4 PHASEN DES MIGRATIONS-PROZESSES (ROADMAP) */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Sicherer Relaunch-Prozess
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              In 4 transparenten Schritten zur High-End Plattform
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Keine Überraschungen, keine Ranking-Verluste, kein Betriebsstillstand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-teal-600/40 mb-4">01</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Audit & URL-Mapping</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Vollständiger Crawl Ihrer bestehenden Website. Wir erfassen alle URLs, Meta-Tags,
                Backlinks und Bilder, um ein lückenloses 301-Redirect-Schema zu erstellen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-teal-600/40 mb-4">02</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Next.js & UI/UX Entwicklung</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwicklung Ihres neuen, maßgeschneiderten Webdesigns mit React 19, TypeScript und
                TailwindCSS auf einer geschützten Staging-Umgebung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-teal-600/40 mb-4">03</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Content-Migration & Headless CMS
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Verlustfreier Import all Ihrer Blogbeiträge, Produktseiten und Bilder in Sanity CMS.
                Schulung Ihres Teams zur kinderleichten Content-Pflege.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-teal-600/40 mb-4">04</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Downtime Go-Live</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Finaler Pre-Launch-Audit (100/100 PageSpeed, Schema-Validierung) und nahtlose
                DNS-Umschaltung ohne eine einzige Sekunde Offline-Zeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOUNDER CRAFTSMANSHIP */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-teal-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Persönliche Migrationsexzellenz
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Ihr Migrationsprojekt in den Händen eines erfahrenen Lead-Entwicklers
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday wird Ihre Migration nicht an unerfahrene Praktikanten delegiert. Ich —{' '}
                <strong>Umutcan Emre Tezgel</strong> — leite und programmiere Ihr Migrationsprojekt
                persönlich. Das garantiert absolute Code-Qualität, millimetergenaue Redirects und
                eine reibungslose Übergabe zum garantierten Festpreis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700">100% Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700">Voller Quellcode-Besitz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700">5-10x günstiger als Großagenturen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zur Next.js Migration
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Verliere ich bei der Migration auf Next.js meine bestehenden Google-Rankings?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nein. Durch exakte 301-Redirects, semantische HTML5-Struktur und 100/100 Core Web
                Vitals bleiben alle Rankings erhalten und verbessern sich nach dem Relaunch in der
                Regel deutlich.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie werden bestehende Blogposts und Produkte übertragen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir exportieren alle bestehenden Inhalte aus WordPress oder Typo3 und importieren
                sie vollautomatisiert in das moderne Headless CMS (Sanity).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Gibt es während der Migration eine Ausfallzeit?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nein. Wir entwickeln alles auf einer separaten Staging-Umgebung. Der Switch erfolgt
                in Sekundenbruchteilen ohne Ausfallzeit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie viel kostet eine Migration von WordPress zu Next.js?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Alle Projekte werden transparent als verbindlicher Festpreis kalkuliert. Durch
                unsere hochgradig optimierte KI-Toolchain sparen Sie bis zu 70% gegenüber
                traditionellen Großagenturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Bereit für den Wechsel zu blitzschnellem Next.js?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Lassen Sie uns Ihre aktuelle Website kostenlos analysieren und einen maßgeschneiderten
            Migrationsplan für Sie erstellen.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Kostenlose Migrations-Analyse anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
