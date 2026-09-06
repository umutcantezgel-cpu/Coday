import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema, getAudienceSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import {
  Wrench,
  Users,
  DeviceMobile,
  Lightning,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkle,
  TrendUp,
  Clock,
  PhoneCall,
  FileText,
  Star,
} from '@phosphor-icons/react/dist/ssr';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
import LocalConversionBlock from '@/features/local-seo/ui/LocalConversionBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Crafts & Construction | Coday',
      description:
        'Custom web design for craft and construction businesses: 60-second recruiting for skilled workers, high-value leads and 100/100 PageSpeed.',
      path: '/en/branchen/handwerk-bau',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerk & Bau | Coday',
    description:
      'Webdesign für Handwerks- und Baubetriebe: 60-Sekunden Express-Recruiting für Gesellen und Meister, planbare Aufträge und 100/100 PageSpeed.',
    path: '/de/branchen/handwerk-bau',
    type: 'money',
  });
}

export default async function HandwerkBauPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/branchen/handwerk-bau`;
  const pageName = isEn
    ? 'Web Design & Mobile Recruiting for Craftsmen & Construction'
    : 'Webdesign & 60s Express-Recruiting für Handwerk & Baugewerbe';
  const pageDescription = isEn
    ? 'Bespoke Next.js web design and mobile-first recruiting funnels for craft and construction businesses.'
    : 'Maßgeschneidertes Next.js Webdesign und mobile Express-Recruiting Funnels für Handwerks- und Baubetriebe.';

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is defined once in the root layout, so this graph starts at the breadcrumbs.
    '@graph': [
      getBreadcrumbSchema(
        [
          { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
          { name: isEn ? 'Industries' : 'Branchen', url: `/${_locale}/branchen` },
          {
            name: isEn ? 'Crafts & Construction' : 'Handwerk & Bau',
            url: `/${_locale}/branchen/handwerk-bau`,
          },
        ],
        pageUrl
      ),
      getWebPageSchema({
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      getAudienceSchema({
        url: pageUrl,
        audienceType: isEn ? 'Craft and construction businesses' : 'Handwerks- und Baubetriebe',
        name: isEn ? 'Craft and construction businesses' : 'Handwerks- und Baubetriebe',
      }),
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/${_locale}/branchen/handwerk-bau#service`,
        name: pageName,
        url: pageUrl,
        description: pageDescription,
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        audience: { '@id': `${pageUrl}#audience` },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Hessen, Deutschland',
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${BASE_URL}/${_locale}/branchen/handwerk-bau#howto`,
        name: 'In 3 Schritten zu qualifizierten Gesellen & lukrativen Aufträgen',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: '1. Vorfilterung der Anfragen',
            text: 'Website filtert Preisanfragen und Billigheimer automatisch vor.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: '2. 60-Sekunden Express-Recruiting',
            text: 'Bewerbung ohne Anschreiben und PDF in 3 Klicks direkt auf der Baustelle am Smartphone.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: '3. Regionale Google Top-3 Platzierung',
            text: 'Lokale SEO-Dominanz in Ihrem Einsatzgebiet (Wetzlar, Gießen, Frankfurt).',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${_locale}/branchen/handwerk-bau#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Warum bewerben sich Handwerker heute nicht mehr über klassische Stellenanzeigen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gute Gesellen und Meister haben bereits Arbeit. Sie schreiben keine Lebensläufe am PC. Mit unserem 60-Sekunden Smartphone-Funnel können wechselwillige Fachkräfte in 3 Klicks ihr Interesse signalisieren — ohne PDF und ohne Hürden.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie filtert die Website unqualifizierte Kundenanfragen vor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch intelligente Formularlogik fragen wir Projektart, Budgetrahmen und Ausführungszeitraum direkt ab. So sparen Sie wertvolle Bürozeit und sprechen nur mit ernsthaften Auftraggebern.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell rechnet sich eine neue Handwerker-Website von Coday?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gewinnen Sie durch den Express-Funnel nur 1 zusätzlichen Gesellen oder Meister, erwirtschaftet dieser bereits im ersten Monat ein Vielfaches der einmaligen Festpreis-Investition.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-4 pb-12 md:pt-8 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-[#fafafa]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Wrench className="w-4 h-4 text-amber-600" />
          <span>HANDWERK 4.0 & RECRUITING-SYSTEM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl">
          {isEn
            ? 'Web Design for Craft & Construction — End the Skills Shortage'
            : 'Webdesign für Handwerk & Bau — Schluss mit Fachkräftemangel'}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-10">
          {isEn
            ? 'Web Design for Craft & Construction: End the skills shortage with an automated order and recruiting pipeline. 60-second express applications for skilled craftsmen, automated client qualification, and 100/100 PageSpeed for SHK, electrical, and construction companies in Hesse.'
            : 'Webdesign für Handwerk & Bau: Schluss mit Fachkräftemangel durch eine automatisierte Auftrags- und Mitarbeiter-Pipeline. 60-Sekunden Express-Bewerbung für Gesellen, automatische Kunden-Vorfilterung und 100/100 PageSpeed für SHK-, Elektro- und Baubetriebe in Hessen.'}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-8 py-4 text-base shadow-xl shadow-primary-700/25 transition-all hover:scale-[1.02]"
            >
              Handwerker-Audit anfordern
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/work/batherm">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-white px-8 py-4 text-base shadow-sm"
            >
              Case Study: Batherm (+3.2x Anfragen)
            </Button>
          </Link>
        </div>
      </section>

      {/* The 2 Core Problems */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
              Die 2 größten Probleme von Handwerksbetrieben heute
            </h2>
            <p className="text-slate-600 text-sm">
              Klassische Websites erzeugen unnötige Telefonate und bringen keine neuen Mitarbeiter.
              Unser System löst beides an der Wurzel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-6 shadow-sm">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  1. Unqualifizierte Preisanfragen
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Ständige Anrufe von Preisvergleichern und Kleinstaufträgen blockieren das Büro.
                  Ihre neue Website qualifiziert Kunden vor: Projektart, Budgetrahmen und
                  Ausführungszeitraum werden vorab digital abgefragt.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-amber-900 font-medium shadow-sm">
                Ergebnis: 70% weniger unnötige Telefonate, mehr Zeit für rentable Großprojekte.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6 shadow-sm">
                  <DeviceMobile className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  2. Akuter Fachkräftemangel
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Niemand tippt am Feierabend ein PDF-Anschreiben. Unser 60-Sekunden
                  Smartphone-Funnel ermöglicht es Gesellen, sich in 3 Klicks direkt von der
                  Baustelle oder vom Sofa aus bei Ihnen zu melden.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-amber-900 font-medium shadow-sm">
                Ergebnis: Planbare Bewerbungen von qualifizierten Fachkräften aus Ihrer Region.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 lg:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
            WIRTSCHAFTLICHKEIT & RENTABILITÄT
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-6">
            Handwerker-ROI: Warum sich diese Investition sofort amortisiert
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-3xl">
            Ein einziger zusätzlicher SHK- oder Elektro-Geselle erwirtschaftet im Handwerk einen
            Jahresumsatz von 120.000 € bis 180.000 €. Die einmalige Investition in eine High-End
            Website von Coday hat sich bereits mit der ersten erfolgreichen Einstellung vollständig
            bezahlt.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="text-3xl font-extrabold text-amber-600 mb-1">150.000 €+</div>
              <div className="text-xs text-slate-600">Zusätzlicher Jahresumsatz pro Geselle</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="text-3xl font-extrabold text-slate-900 mb-1">&lt; 60 Sek.</div>
              <div className="text-xs text-slate-600">Bewerbungszeit für Fachkräfte am Handy</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="text-3xl font-extrabold text-amber-600 mb-1">0,28s</div>
              <div className="text-xs text-slate-600">Ladezeit für maximale Google-Rankings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Akquise-Kanal Embed and conversion block: each client island gets
          its own Suspense boundary (own hydration unit); server HTML unchanged. */}
      <Suspense fallback={null}>
        <IndustryToolEmbed industryKey="handwerk-bau" />
      </Suspense>
      <Suspense fallback={null}>
        <LocalConversionBlock
          industry={{
            slug: 'handwerk-bau',
            label: { de: 'Handwerk & Bau', en: 'trades & construction' },
          }}
          sourceTag="industries_handwerk_bau_bottom"
        />
      </Suspense>

      {/* Real References Showcase */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
              Erfolgreiche Handwerksbetriebe an der Lahn
            </h2>
            <p className="text-slate-600 text-sm">
              Echte Kunden, echte Resultate, verifizierte Google PageSpeed Scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    GALA- & LANDSCHAFTSBAU
                  </span>
                  <span className="text-xs text-slate-500">Wetzlar</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Memo BauT Wetzlar</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  +380% Neukunden-Anfragen durch interaktiven Garten- & Terrassen-Konfigurator.
                  100/100 Core Web Vitals und Spitzenrankings.
                </p>
              </div>
              <Link
                href="/work/memobaut"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                <span>
                  {isEn ? 'Memo BauT Case Study & Results' : 'Case Study Memo BauT & Ergebnisse'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  SHK & HEIZUNGSBAU
                </span>
                <span className="text-xs text-slate-500">Wetzlar & Mittelhessen</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Batherm Sanitär & Heizung</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Relaunch der gesamten Webpräsenz mit Next.js. Ladezeit von 4.1s auf 0.28s gesenkt.
                3.2-fache Steigerung der regionalen Wärmepumpen- und Badumbau-Anfragen.
              </p>
              <Link
                href="/work/batherm"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                <span>
                  {isEn ? 'Detaillierte Batherm Case Study' : 'Detaillierte Batherm Case Study'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  SICHERHEITSTECHNIK & SCHLÜSSELDIENST
                </span>
                <span className="text-xs text-slate-500">Wetzlar</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">MS Schlüsseldienst Wetzlar</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                60-Sekunden Notruf-Conversion und dauerhafte Google-Maps Top-3 Dominanz. Maximale
                mobile Conversion bei akuten Notöffnungen und Schließanlagen.
              </p>
              <Link
                href="/work/schluesseldienst-wetzlar"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                <span>
                  {isEn
                    ? 'MS Schlüsseldienst Wetzlar Case Study'
                    : 'Detaillierte Schlüsseldienst Case Study'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Standorte: dedicated city landing pages for this industry */}
      <section className="py-12 px-4 max-w-5xl mx-auto text-center border-t border-slate-200">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
          {isEn
            ? 'Web Design for Crafts & Construction by Region'
            : 'Webdesign für Handwerk & Bau nach Region'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/branchen/handwerk-bau/wetzlar"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold text-sm hover:border-primary-700 hover:text-primary-700 transition-colors"
          >
            {isEn ? 'Crafts & Construction Web Design Wetzlar' : 'Handwerk & Bau Webdesign Wetzlar'}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/branchen/handwerk-bau/giessen"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold text-sm hover:border-primary-700 hover:text-primary-700 transition-colors"
          >
            {isEn ? 'Crafts & Construction Web Design Gießen' : 'Handwerk & Bau Webdesign Gießen'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-6">
          Bereit für planbare Aufträge und qualifizierte Gesellen?
        </h2>
        <p className="text-slate-600 text-base mb-8 max-w-2xl mx-auto">
          Lassen Sie uns Ihre aktuelle Handwerker-Website in einem kostenlosen 15-Minuten Audit
          analysieren.
        </p>
        <Link href="/contact">
          <Button
            variant="primary"
            size="lg"
            className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-[1.02]"
          >
            Jetzt Handwerker-Audit anfordern
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
