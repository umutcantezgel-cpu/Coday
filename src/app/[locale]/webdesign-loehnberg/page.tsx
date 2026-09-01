import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema } from '@/lib/schema';
import {
  getCityHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import { TrustBar } from '@/shared/ui/TrustBar';
import { LocalBottomContactSection } from '@/features/local-seo/ui/LocalBottomContactSection';
import {
  ArrowRight,
  ShieldCheck,
  Buildings,
  Check,
  Sparkle,
  CheckCircle,
  Wrench,
  TreeEvergreen,
  Target,
  CaretRight,
  Drop,
  Factory,
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
      title: 'Web Design Löhnberg | High-End Web Development · Coday',
      description:
        'Web design & Local SEO for Löhnberg (35792), Niedershausen, Selters & Obershausen. Ultra-fast Next.js websites for crafts, industry along B49 & tourism.',
      keywords: [
        'Web Design Löhnberg',
        'Web Agency Löhnberg 35792',
        'Website Creation Niedershausen',
        'Web Development Selters Lahn',
        'Coday Web Löhnberg',
      ],
      path: '/en/webdesign-loehnberg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Löhnberg | Webseiten vom lokalen Profi · Coday',
    description:
      'Webdesign & Local SEO für Löhnberg (35792), Niedershausen, Selters & Obershausen. Schnelle Next.js Websites für Handwerk & Tourismus. Feste Konditionen.',
    keywords: [
      'Webdesign Löhnberg',
      'Webagentur Löhnberg 35792',
      'Website erstellen Löhnberg',
      'Webdesign Niedershausen',
      'Webentwicklung Selters Lahn',
      'SEO Agentur Löhnberg Weilburg',
    ],
    path: '/de/webdesign-loehnberg',
    type: 'money',
  });
}

export default async function WebdesignLoehnbergPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-loehnberg' }, _locale),
      ...(getCityHierarchySchema('webdesign-loehnberg', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isEn
              ? 'What does a modern website cost for businesses in Löhnberg?'
              : 'Was kostet eine professionelle Website für Unternehmen in Löhnberg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'We provide transparent fixed-price quotes tailored to your business needs without recurring agency subscriptions or hidden costs.'
                : 'Wir kalkulieren für Betriebe in Löhnberg, Niedershausen, Obershausen und Selters verbindliche Festpreise ohne versteckte Monatsabos oder unerwartete Folgekosten.',
            },
          },
          {
            '@type': 'Question',
            name: isEn
              ? 'Why should companies in Löhnberg choose Next.js over traditional WordPress?'
              : 'Warum sollten Betriebe in Löhnberg auf Next.js statt WordPress setzen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'Next.js delivers sub-0.3s load times, 100/100 Core Web Vitals, enterprise security with zero plugin vulnerabilities, and significant ranking advantages on Google.'
                : 'Next.js bietet Ladezeiten unter 0,3 Sekunden, 100/100 Core Web Vitals und absolute Wartungsfreiheit ohne Plugin-Sicherheitslücken. Google belohnt diesen messbaren Speed-Vorsprung mit überlegenen Rankings.',
            },
          },
          {
            '@type': 'Question',
            name: isEn
              ? 'Do you offer on-site consultations in Löhnberg, Niedershausen, or Selters?'
              : 'Kommen Sie für persönliche Beratungen direkt nach Löhnberg, Niedershausen oder Selters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'Yes, absolutely. Located directly on the B49 near Weilburg and Wetzlar, we reach your location in Löhnberg within 15 minutes.'
                : 'Ja, sehr gerne. Über die vierspurige B49 erreichen wir Ihr Unternehmen in Löhnberg, im Gewerbegebiet Voitshain oder in den Ortsteilen in rund 15 Fahrminuten direkt vor Ort.',
            },
          },
          {
            '@type': 'Question',
            name: isEn
              ? 'How does the synergy between Weilburg and Löhnberg work for Local SEO?'
              : 'Wie unterstützt die regionale Verknüpfung mit Weilburg das Ranking in Löhnberg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'Through regional authority across the Weilburg-Löhnberg corridor, your brand gains topical dominance for search queries across the entire upper Lahn valley.'
                : 'Durch unsere gewachsene Suchmaschinen-Autorität entlang der Wirtschaftsachse Wetzlar–Weilburg–Limburg profitiert Ihre Website von einer starken semantischen Themenführerschaft im gesamten Lahntal.',
            },
          },
          {
            '@type': 'Question',
            name: isEn
              ? 'How fast is a new website ready to launch?'
              : 'Wie schnell ist eine neue Homepage in Löhnberg online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'Most client websites launch turnkey within 10 to 14 business days.'
                : 'In der Regel steht Ihre neue, schlüsselfertige Plattform innerhalb von 10 bis 14 Werktagen komplett live im Netz.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 overflow-x-hidden">
      {/* Structured Data */}
      <script
        id="schema-loehnberg-pyramid"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. ASYMMETRIC LOCAL HERO */}
      <LocalSplitHero
        badgeText={
          isEn
            ? 'HANDCRAFT, INDUSTRY & TOURISM WEB AGENCY LÖHNBERG'
            : 'HANDWERK, INDUSTRIE & TOURISMUS WEBAGENTUR LÖHNBERG'
        }
        headline={
          isEn ? 'Web Design & Next.js Development in' : 'Webdesign & Next.js Entwicklung in'
        }
        headlineGradient="Löhnberg (35792)"
        description={
          isEn
            ? 'High-speed Next.js platforms, local search engine dominance, and turnkey lead generation for crafts, B49 manufacturing & tourism in Löhnberg, Niedershausen, Obershausen & Selters.'
            : 'Speziell für Handwerk, Bauunternehmen, B2B-Fertigung an der B49 und Lahntal-Tourismus in Löhnberg, Niedershausen, Obershausen und Selters. Sub-0,3s Ladezeiten, 100/100 Core Web Vitals und planbare Neukundengewinnung. Verbindliche Festpreise auf Anfrage.'
        }
        cityName="Löhnberg"
        sourceTag="local_seo_loehnberg"
        formHeading={
          isEn ? 'Free Project Analysis for Löhnberg' : 'Kostenlose Bedarfsanalyse für Löhnberg'
        }
        formSubtitle={
          isEn
            ? 'Direct consultation with founder Umutcan Emre Tezgel within 24h.'
            : 'Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h.'
        }
        secondaryCtaText={isEn ? 'View Regional References' : 'Regionale Referenzen ansehen'}
      />

      {/* 2. REGIONAL TRUST BAR */}
      <section className="border-b border-slate-200/80 bg-neutral-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBar />
        </div>
      </section>

      {/* 3. SYNERGY SECTION: WEILBURG-LÖHNBERG AXIS */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-2 bg-neutral-100/80 border border-neutral-200/80 shadow-sm">
            <div className="rounded-2xl bg-white p-8 sm:p-12 border border-neutral-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                    <Sparkle className="w-3.5 h-3.5 text-amber-600" />
                    Regionale Themenführerschaft im Lahntal
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
                    Die B49-Wirtschaftsachse:{' '}
                    <span className="text-amber-800">Weilburg, Löhnberg & Limburg</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    Löhnberg ist das Bindeglied zwischen der historischen Residenzstadt{' '}
                    <Link
                      href="/webdesign-weilburg"
                      className="font-bold text-amber-800 hover:text-amber-900 underline decoration-amber-400 underline-offset-4"
                    >
                      Weilburg an der Lahn
                    </Link>{' '}
                    und dem Wirtschaftsraum{' '}
                    <Link
                      href="/webdesign-limburg"
                      className="font-bold text-amber-800 hover:text-amber-900 underline decoration-amber-400 underline-offset-4"
                    >
                      Limburg-Weilburg
                    </Link>
                    . Mit unserer nachgewiesenen Google-Sichtbarkeit im Oberlahn-Gebiet bieten wir
                    Unternehmen aus Löhnberg einen direkten Vorsprung vor regionalen Mitbewerbern.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div className="text-2xl font-extrabold text-slate-900">&lt; 15 Min.</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Vor-Ort-Präsenz via B49
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div className="text-2xl font-extrabold text-slate-900">100 / 100</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Google Core Web Vitals
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div className="text-2xl font-extrabold text-slate-900">100 %</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Quellcode-Eigentum
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 bg-slate-50/90 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-700" />
                    Ihre Vorteile mit Coday in Löhnberg:
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Kein generisches WordPress:</strong> Handgeschriebener, sauberer
                        Next.js 15 Code ohne langsame Plugins.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Lokale Lead-Generierung:</strong> Optimierte Kontakt- und
                        Bewerberstrecken für Handwerker & Industrie.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Persönlicher Ansprechpartner:</strong> Direkte Betreuung durch
                        Inhaber Umutcan Emre Tezgel ohne Callcenter.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Festpreis-Transparenz:</strong> Feste Projektbudgets ohne monatliche
                        Agentur-Knebelverträge.
                      </span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/contact" className="w-full block">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full justify-center bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 shadow-md"
                      >
                        Standort-Analyse für Löhnberg anfragen
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4 DISTRICTS HUB (Löhnberg, Niedershausen, Obershausen, Selters) */}
      <section className="py-20 sm:py-24 bg-neutral-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-800 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Lokale Abdeckung
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight text-balance leading-tight">
              Digitale Lösungen für alle 4 Ortsteile der Gemeinde Löhnberg
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Jeder Ortsteil hat seine eigenen wirtschaftlichen Stärken – von etablierten
              Handwerksbetrieben bis zu traditionsreichen Lahntal-Mineralquellen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ortsteil 1: Löhnberg-Kernort */}
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400/80 hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Buildings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Löhnberg (Kernort)</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Zentrum der Gemeinde mit den Gewerbegebieten <strong>Voitshain</strong> und{' '}
                  <strong>In der Schlei</strong>. Direkte Anbindung an die B49 für Handel, Fertigung
                  und Dienstleister.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800 flex items-center justify-between">
                <span>Gewerbe & B49-Achse</span>
                <CaretRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>

            {/* Ortsteil 2: Niedershausen */}
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400/80 hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Niedershausen</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Starker Schwerpunkt auf <strong>Bau- und Handwerksbetriebe</strong>,
                  Elektroinstallation, Dachdecker und Sanitärfachbetriebe mit regionalem
                  Kundenstamm.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800 flex items-center justify-between">
                <span>Handwerk & Bau</span>
                <CaretRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>

            {/* Ortsteil 3: Obershausen */}
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400/80 hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Obershausen</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Ruhig gelegener Ortsteil mit inhabergeführten Dienstleistern, Werkstätten und
                  lokalen Spezialbetrieben im Übergang zum Kallenbachtal.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800 flex items-center justify-between">
                <span>Mittelstand & Service</span>
                <CaretRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>

            {/* Ortsteil 4: Selters */}
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400/80 hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Drop className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Selters (Lahn)</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Die historische Wiege der weltberühmten <strong>Selters-Mineralquellen</strong>.
                  Attraktiver Standort für Lahntal-Tourismus, Gastronomie und Erholungsangebote.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800 flex items-center justify-between">
                <span>Quellen & Tourismus</span>
                <CaretRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-PILLAR INDUSTRY MATRIX */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-800 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Branchen-Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight text-balance leading-tight">
              Maßgeschneiderte Webentwicklung für Löhnberger Schlüsselbranchen
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Jede Branche benötigt eine exakt ausgerichtete digitale Architektur – von der
              Fachkräfte-Gewinnung bis zur automatisierten Auftragsanfrage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Säule 1: Handwerk & Bau */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-400/80 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out group">
              <Wrench className="w-10 h-10 text-amber-700 mb-5 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Handwerk, Bau & Sanitärtechnik
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Speziell für Betriebe in Niedershausen und Löhnberg: Digitale Angebotsformulare,
                Referenz-Gallerien und 60-Sekunden-Bewerbungsstrecken zur planbaren Gewinnung von
                Fachkräften und lukrativen Bauprojekten im Landkreis Limburg-Weilburg.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>24/7 Angebotsanfragen direkt ins Postfach</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Mitarbeiter-Recruiting ohne Lebenslauf-Hürden</span>
                </li>
              </ul>
            </div>

            {/* Säule 2: B2B-Fertigung & Industrie */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-400/80 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out group">
              <Factory className="w-10 h-10 text-amber-700 mb-5 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. B2B-Industrie, Metalltechnik & Zulieferer
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Für Produktionsbetriebe in den Gewerbegebieten Voitshain und In der Schlei: Präzise
                B2B-Produktkataloge, englischsprachige Lokalisierung und modernste Next.js
                Performance für internationale Industriepartner entlang der B49.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Mehrsprachige B2B-Architektur (DE / EN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>ISO-Zertifikate & Datenblatt-Downloads im CMS</span>
                </li>
              </ul>
            </div>

            {/* Säule 3: Lahntal-Tourismus & Gastronomie */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-400/80 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out group">
              <TreeEvergreen className="w-10 h-10 text-amber-700 mb-5 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Tourismus, Gastronomie & Selters-Quellen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Für Pensionen, Restaurants, Kanustationen und Freizeitanbieter an der Lahn und rund
                um die Burg Laneburg: Mobil optimierte Buchungsstrecken ohne teure
                Plattform-Gebühren für Gäste und Touristen.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Provisionsfreie Direktbuchungs-Funktion</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Optimiert für Smartphone-Nutzung unterwegs</span>
                </li>
              </ul>
            </div>

            {/* Säule 4: Praxen & Kanzleien */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-400/80 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-out group">
              <ShieldCheck className="w-10 h-10 text-amber-700 mb-5 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Praxen, Kanzleien & Dienstleister
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Für Ärzte, Therapeuten, Berater und Kanzleien im Raum Löhnberg und Weilburg:
                Seriöses, barrierefreies Praxisdesign mit integrierter Online-Terminvergabe und
                höchsten DSGVO-Sicherheitsstandards.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>100% DSGVO & Cookie-freies Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Barrierefreiheit nach WCAG 2.1 AA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON MATRIX: NEXT.JS VS OLD WORDPRESS */}
      <section className="py-20 sm:py-24 bg-neutral-50/80 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-800 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technischer Vorsprung
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight text-balance leading-tight">
              Warum moderne Next.js 15 Webentwicklung jede WordPress-Seite schlägt
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Vergleichen Sie die technischen Fakten: Wir bauen wartungsfreie Plattformen, die Ihr
              Unternehmen dauerhaft schützen und schneller laden als jeder Mitbewerber.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[640px] rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-100/80 p-4 sm:p-6 font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-200">
                <div className="col-span-5 sm:col-span-4">Leistungsmerkmal</div>
                <div className="col-span-4 sm:col-span-4 text-amber-900 font-extrabold">
                  Coday (Next.js 15 App Router)
                </div>
                <div className="col-span-3 sm:col-span-4 text-slate-500">
                  Klassische WordPress-Agentur
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                <div className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-amber-50/30 transition-colors duration-150">
                  <div className="col-span-5 sm:col-span-4 font-semibold text-slate-800">
                    Ladezeit (LCP Mobile)
                  </div>
                  <div className="col-span-4 sm:col-span-4 font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    Sub-0,3 Sekunden
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-500">2,5 – 4,8 Sekunden</div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-6 items-center bg-slate-50/50 hover:bg-amber-50/30 transition-colors duration-150">
                  <div className="col-span-5 sm:col-span-4 font-semibold text-slate-800">
                    Sicherheit & Hacks
                  </div>
                  <div className="col-span-4 sm:col-span-4 font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    100% wartungsfrei, 0 Plugins
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-500">
                    Regelmäßige Plugin-Lücken
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-amber-50/30 transition-colors duration-150">
                  <div className="col-span-5 sm:col-span-4 font-semibold text-slate-800">
                    Quellcode-Eigentum
                  </div>
                  <div className="col-span-4 sm:col-span-4 font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    100% Ihres Eigentums
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-500">
                    Abhängigkeit von Agentur-Themes
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-6 items-center bg-slate-50/50 hover:bg-amber-50/30 transition-colors duration-150">
                  <div className="col-span-5 sm:col-span-4 font-semibold text-slate-800">
                    Google PageSpeed Score
                  </div>
                  <div className="col-span-4 sm:col-span-4 font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    100 / 100 garantiert
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-500">Meist 40 – 65 / 100</div>
                </div>

                <div className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-amber-50/30 transition-colors duration-150">
                  <div className="col-span-5 sm:col-span-4 font-semibold text-slate-800">
                    Laufende Kosten
                  </div>
                  <div className="col-span-4 sm:col-span-4 font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />0 €
                    Pflicht-Wartungsabos
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-500">
                    150 € – 400 € / Monat Abo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCAL FAQ ACCORDION */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-800 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight text-balance leading-tight">
              Fragen & Antworten zu Webdesign in Löhnberg
            </h2>
            <p className="text-slate-600 text-base">
              Alles Wissenswerte zu Kosten, Ablauf und regionaler Betreuung an der Lahn.
            </p>
          </div>

          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-[border-color,box-shadow] duration-200 ease-out">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine neue Website für Unternehmen in Löhnberg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren für Handwerksbetriebe, Gewerbetreibende und Dienstleister in
                Löhnberg, Niedershausen und Selters transparente Festpreise auf Anfrage. Sie zahlen
                keine versteckten Monatsgebühren oder überteuerte Wartungspauschalen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-[border-color,box-shadow] duration-200 ease-out">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Next.js Homepage in Löhnberg online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nach Freigabe des Konzepts steht Ihre Website in der Regel innerhalb von 10 bis 14
                Werktagen komplett schlüsselfertig und für Suchmaschinen optimiert online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-[border-color,box-shadow] duration-200 ease-out">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Termine direkt nach Löhnberg, Niedershausen oder Selters?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, sehr gerne. Über die vierspurige B49 erreichen wir Ihr Unternehmen von unserem
                Wetzlarer Büro aus in rund 15 Fahrminuten direkt vor Ort für ein persönliches
                Erstgespräch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-[border-color,box-shadow] duration-200 ease-out">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie hilft Coday bei der Mitarbeiter- und Azubigewinnung in Löhnberg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir integrieren mobile Express-Recruiting-Strecken. Bewerber können sich direkt vom
                Smartphone aus in unter 60 Sekunden ohne Anschreiben oder PDF-Uploads bei Ihrem
                Betrieb bewerben.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-[border-color,box-shadow] duration-200 ease-out">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer betreut mein Projekt in Löhnberg persönlich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gründer Umutcan Emre Tezgel berät, konzipiert und entwickelt Ihre Plattform
                persönlich mit direktem Draht – ohne anonyme Ticket-Systeme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EMBEDDED LEAD CAPTURE & CONTACT FORM */}
      <LocalBottomContactSection
        cityName="Löhnberg"
        sourceTag="local_bottom_loehnberg"
        badgeText={
          isEn
            ? 'DIRECT CONSULTATION · LÖHNBERG & LAHN VALLEY'
            : 'PERSÖNLICHE BERATUNG · LÖHNBERG & LAHNTAL'
        }
        heading={
          isEn
            ? 'Request Free Project Analysis for Löhnberg'
            : 'Jetzt kostenlose Standort-Analyse für Löhnberg anfordern'
        }
        subheading={
          isEn
            ? 'Discover in 20 minutes how your business in Löhnberg (35792), Niedershausen, Obershausen, or Selters can reach #1 on Google and win profitable inquiries.'
            : 'Erfahren Sie in 20 Minuten, wie Ihr Betrieb in Löhnberg (35792), Niedershausen, Obershausen oder Selters auf Platz 1 bei Google gelangt und planbar neue Kunden gewinnt.'
        }
        districts={[
          {
            name: 'Löhnberg-Kernort (Gewerbe / B49)',
            label: isEn ? 'Löhnberg Core (Commercial / B49)' : 'Löhnberg-Kernort (Gewerbe / B49)',
          },
          {
            name: 'Handwerk & Bau (Niedershausen)',
            label: isEn
              ? 'Crafts & Construction (Niedershausen)'
              : 'Handwerk & Bau (Niedershausen)',
          },
          {
            name: 'Mittelstand & Service (Obershausen)',
            label: isEn ? 'SME & Service (Obershausen)' : 'Mittelstand & Service (Obershausen)',
          },
          {
            name: 'Tourismus & Gastronomie (Selters)',
            label: isEn ? 'Tourism & Hospitality (Selters)' : 'Tourismus & Gastronomie (Selters)',
          },
          {
            name: 'Praxis / Kanzlei / Beratung',
            label: isEn ? 'Practice / Law Firm / Consulting' : 'Praxis / Kanzlei / Beratung',
          },
        ]}
      />

      {/* 9. REGIONAL SILO & NEIGHBOR LINKS */}
      <section className="py-16 bg-white border-t border-slate-200 text-sm text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-4">
            Regionales Netzwerk im Landkreis Limburg-Weilburg & Hessen:
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2.5">
            <Link
              href="/webdesign-weilburg"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Webdesign Weilburg
            </Link>
            <Link
              href="/webdesign-limburg"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Webdesign Limburg
            </Link>
            <Link
              href="/webdesign-herborn"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Webdesign Herborn
            </Link>
            <Link
              href="/webdesign-dillenburg"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Webdesign Dillenburg
            </Link>
            <Link
              href="/webdesign-agentur-wetzlar"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Webdesign Agentur Wetzlar
            </Link>
            <Link
              href="/regionen/landkreis-limburg-weilburg"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Landkreis Limburg-Weilburg
            </Link>
            <Link
              href="/standorte/hessen"
              className="hover:text-amber-800 underline decoration-slate-300 underline-offset-2"
            >
              Webdesign Hessen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
