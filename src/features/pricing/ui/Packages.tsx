import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link as NavLink } from '@/i18n/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkle,
  LockKey,
  SealCheck,
  Percent,
} from '@phosphor-icons/react/dist/ssr';
import GradientText from '@/shared/ui/GradientText';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import { PackagesConfigurator } from './PackagesConfigurator';
import { FaqAccordion } from './FaqAccordion';
import { StepInitializer } from './StepInitializer';

export default async function Packages() {
  const t = await getTranslations('pricing');
  const locale = await getLocale();
  const isEn = locale === 'en';

  const valuePillars = [
    {
      icon: Percent,
      title: isEn ? 'Direct Founder Collaboration' : 'Direkter Gründerkontakt',
      subtitle: isEn ? 'Fast & Agile Delivery' : 'Kurze Wege & Schnelligkeit',
      desc: isEn
        ? 'Work directly with the founder and lead engineer who builds your project. No middle management or long approval loops, just clear communication, rapid iterations, and bespoke results.'
        : 'Bei Coday sprechen Sie von Tag eins an direkt mit dem Gründer und Lead-Entwickler, der Ihr Projekt realisiert. Keine Reibungsverluste über mehrstufige Zwischeninstanzen, sondern schnelle Abstimmungen, handwerklicher Fokus und maßgeschneiderte Ergebnisse.',
    },
    {
      icon: SealCheck,
      title: isEn ? '100/100 Certified Quality' : 'Garantierte 100/100 Qualität',
      subtitle: isEn ? 'Google & Seobility Audits' : 'Messbare Spitzenleistung',
      desc: isEn
        ? 'Verified by independent SEO and performance tools. Every project achieves top scores in Google PageSpeed Insights, Seobility On-Page Audits, and WCAG accessibility standards.'
        : 'Durch unabhängige SEO- und Performance-Prüfungen schwarz auf weiß belegt: Jedes Coday-Projekt erzielt Spitzenwerte bei Google PageSpeed Insights, fehlerfreie 100% Seobility On-Page Audits und subsekundäre Ladezeiten unter 0,3 Sekunden.',
    },
    {
      icon: LockKey,
      title: isEn ? '100% Code & Asset Ownership' : '100% Quellcode- & Design-Eigentum',
      subtitle: isEn ? 'Full Independence' : 'Volle Unabhängigkeit',
      desc: isEn
        ? 'Complete ownership with full transparency. You receive full ownership of your custom source code, high-resolution design assets, and edge hosting infrastructure without hidden lock-ins.'
        : 'Volle Transparenz und Unabhängigkeit: Sie erhalten das uneingeschränkte Eigentum am gesamten Quellcode, allen Design-Assets und der Hosting-Infrastruktur ohne versteckte Bindungen.',
    },
  ];

  const faqItems = [
    {
      question: isEn
        ? 'How are project prices calculated without fixed package fees?'
        : 'Wie setzen sich die Preise zusammen, wenn keine festen Pauschalen angegeben sind?',
      answer: isEn
        ? 'Every company has unique requirements. In our free initial consultation, we analyze your current digital presence, define the exact feature scope, and provide a transparent, binding fixed-price quote on request. You only pay for what brings measurable value to your business.'
        : 'Jedes Unternehmen hat individuelle Anforderungen und Ziele. In einer kostenlosen Erstberatung analysieren wir Ihren Bedarf, wählen gemeinsam die benötigten Module aus und erstellen ein verbindliches Festpreisangebot auf Anfrage nach Bedarfsanalyse. Sie zahlen ausschließlich für Features, die messbaren Mehrwert stiften, ganz ohne versteckte Kosten oder Überraschungen.',
    },
    {
      question: isEn
        ? 'Why is working with Coday particularly cost-effective and agile?'
        : 'Warum ist die Zusammenarbeit mit Coday besonders effizient und agil?',
      answer: isEn
        ? 'We eliminate the heavy overhead of large agencies: no non-technical sales staff, no junior developer delegation, and no bureaucratic delays. With modern Next.js 15 architecture and direct founder execution, Umutcan Emre Tezgel delivers projects faster, cleaner, and with maximum focus.'
        : 'Wir verzichten bewusst auf administrative Wasserköpfe, Sales-Zwischenhändler und bürokratische Verzögerungen. Durch unsere moderne Next.js 15 Architektur und die direkte Inhaber-Realisierung durch Umutcan Emre Tezgel entstehen Webprojekte schneller, präziser und mit ungeteiltem Fokus auf Ihren Erfolg.',
    },
    {
      question: isEn
        ? 'How is the payment structured?'
        : 'Wie sind die Zahlungsmodalitäten geregelt?',
      answer: isEn
        ? 'We structure the investment into two fair milestones: 50% kickoff deposit and 50% only after successful final deployment and your complete satisfaction.'
        : 'Wir teilen die Investition in zwei faire Meilensteine: 50% Anzahlung bei Projektstart und 50% erst nach erfolgreichem Launch und Ihrer vollständigen Abnahme.',
    },
    {
      question: isEn
        ? 'What hosting costs should I expect?'
        : 'Welche Hosting-Kosten kommen monatlich auf mich zu?',
      answer: isEn
        ? 'Thanks to modern static compilation on Vercel and Edge CDNs, Next.js client websites run globally with maximum uptime and security, requiring no mandatory maintenance contracts.'
        : 'Dank moderner statischer Vorkompilierung auf Vercel laufen Next.js Websites auf weltweiten Edge-Netzwerken extrem kosteneffizient bei höchster Ausfallsicherheit, ganz ohne zwingende monatliche Wartungsverträge.',
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <StepInitializer />

      {/* Hero Section */}
      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16 px-4 w-full relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkle className="w-4 h-4 text-amber-600" />
            {isEn
              ? 'INDIVIDUAL SCOPE & BINDING FIXED PRICE'
              : 'INDIVIDUELLE BEDARFSANALYSE & FESTPREIS AUF ANFRAGE'}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight mb-8 max-w-5xl mx-auto">
            {isEn ? 'Bespoke Quotes for ' : 'Maßgeschneiderte Angebote für '}
            <GradientText
              colors={[
                'var(--color-primary-600)',
                'var(--color-secondary-800)',
                'var(--color-primary-600)',
              ]}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              {isEn ? 'High-End Web Development' : 'High-End Webentwicklung'}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            {isEn ? (
              <>
                Bespoke Quotes for High-End Web Development: Choose the exact modules and
                capabilities you need. Following a free discovery audit, you receive a binding
                fixed-price quote —{' '}
                <strong className="text-amber-800 font-semibold">
                  maximum cost efficiency through direct founder execution
                </strong>{' '}
                with guaranteed 100/100 performance scores.
              </>
            ) : (
              <>
                Maßgeschneiderte Angebote für High-End Webentwicklung: Wählen Sie exakt die Module
                und Funktionen, die Sie benötigen. Nach einer kostenlosen Bedarfsanalyse erhalten
                Sie ein maßgeschneidertes, verbindliches Festpreisangebot —{' '}
                <strong className="text-amber-800 font-semibold">
                  maximale Kosteneffizienz durch direkte Inhaber-Umsetzung
                </strong>{' '}
                bei nachweislich überlegener 100/100 Spitzenqualität.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-md hover:scale-[1.02]"
            >
              <span>{isEn ? 'Configure Project' : 'Projekt frei konfigurieren'}</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </NavLink>
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>{isEn ? 'Request Free Audit' : 'Kostenlose Beratung anfordern'}</span>
            </NavLink>
          </div>

          {/* Dual Verified Reviews Badges: Google Maps & ProvenExpert */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://maps.app.goo.gl/9SagecgXw7Vf5csH7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-amber-400 hover:shadow-md transition-all group"
              title="Google Maps Rezensionen für Coday ansehen"
            >
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                Google Maps (4 Rezensionen)
              </span>
            </a>

            <a
              href="https://www.provenexpert.com/de-de/coday-webagentur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-emerald-500 hover:shadow-md transition-all group"
              title="ProvenExpert Profil von Coday ansehen"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                ProvenExpert (4 Bewertungen)
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Quality & Efficiency Proof Section */}
      <section className="py-20 bg-white border-y border-slate-200 w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Der Coday Qualitäts- & Effizienz-Vorteil
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              Direkte Zusammenarbeit, modernste Technologie & transparente Festpreise
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Wir investieren 100% unserer Energie in erstklassigen Code, messbare Ladezeiten und
              persönliche Betreuung. Durch schlanke, moderne Next.js 15 Entwicklungsprozesse
              erhalten Sie Spitzenqualität termintreu und planbar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {valuePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-6 text-amber-600 border border-amber-200/50">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
                    {pillar.subtitle}
                  </span>
                  <p className="font-display font-bold text-xl text-slate-900 mb-3">
                    {pillar.title}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Audit Proof Benchmark Grid */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Verifizierte Audit-Ergebnisse
                </span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
                  Schwarz auf weiß bewiesen: 100/100 PageSpeed & Top Seobility Score
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Während viele herkömmliche Websites bei Google Lighthouse durch langsame
                  Ladezeiten wertvolle Besucher verlieren, erzielt unsere Next.js 15
                  Edge-Architektur in allen offiziellen Audit-Werkzeugen Bestnoten.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
                      100
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">
                      Performance
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
                      100
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">
                      Accessibility
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
                      100
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">
                      Best Practices
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
                      100
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">
                      SEO Score
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">
                      Google PageSpeed Insights Mobile & Desktop
                    </span>
                    <span className="text-xs font-bold text-emerald-600">100 / 100 Perfekt</span>
                  </div>
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src="/images/audits/pagespeed-desktop-100.png"
                      alt="Google PageSpeed Insights 100/100 Zertifikat Coday Webagentur"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Packages & Add-ons Configurator */}
      <PackagesConfigurator />

      {/* Feature Comparison Table */}
      <section className="py-24 px-4 bg-white border-y border-slate-200 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Detaillierter Funktionsabgleich
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              Alle Paket-Features im direkten Vergleich
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Finden Sie exakt die richtige Konfiguration für Ihre aktuellen Unternehmensziele.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th scope="col" className="p-4 sm:p-5 text-xs font-bold text-slate-500 uppercase">
                    {isEn ? 'Feature / Scope' : 'Leistungsumfang'}
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-5 text-center text-sm font-bold text-slate-700"
                  >
                    {isEn ? 'Starter (Compact)' : 'Starter (Klein)'}
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-5 text-center text-sm font-bold text-amber-900 bg-amber-50/80 border-x border-amber-200/60"
                  >
                    {isEn ? 'Business (Standard)' : 'Business (Mittel)'}
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-5 text-center text-sm font-bold text-slate-700"
                  >
                    {isEn ? 'Pro Corporate (Large)' : 'Pro Corporate (Groß)'}
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-5 text-center text-sm font-bold text-slate-900 bg-slate-100/70 border-l border-slate-200"
                  >
                    {isEn ? 'Enterprise Platform' : 'Enterprise (Extrem groß)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Pricing & Proposal' : 'Kosten & Angebot'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-primary-700 font-semibold">
                    {isEn ? 'On Request' : 'Auf Anfrage'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'On Request' : 'Auf Anfrage'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-primary-700 font-semibold">
                    {isEn ? 'On Request' : 'Auf Anfrage'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? 'On Request' : 'Auf Anfrage'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Target Scope & Pages' : 'Seitenumfang'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-600">
                    {isEn ? '1–5 Pages' : '1–5 Seiten'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'Up to 12 Pages' : 'Bis 12 Seiten'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-600">
                    {isEn ? 'Up to 30 Pages' : 'Bis 30 Seiten'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? 'Massive Platforms' : 'Riesige Plattformen'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? '100/100 Core Web Vitals' : 'Core Web Vitals 100/100'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-amber-700 font-medium">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-amber-700 font-medium">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-emerald-700 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Recruiting & Lead Funnel' : '60s Recruiting-Funnel'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-amber-700 font-medium">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Multi-Language (i18n)' : 'Mehrsprachigkeit (i18n)'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-amber-700 font-medium">
                    {isEn ? '✓ Included' : '✓ Inklusive'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? '✓ Multi-Region' : '✓ Multi-Region'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Headless CMS (Sanity)' : 'Headless CMS (Sanity)'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-amber-800 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-600 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'E-Commerce & Online Shop' : 'E-Commerce & Shop (Add-on)'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-600 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Custom Web Apps & Portals' : 'Custom App / Portal (Add-on)'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-600 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? 'Optional Add-on' : 'Optional zubuchbar'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Maintenance & Support' : 'Wartung & Support'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Voluntary' : 'Freiwillig zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-amber-800 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? 'Voluntary' : 'Freiwillig zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    {isEn ? 'Voluntary' : 'Freiwillig zubuchbar'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-600 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? 'Voluntary' : 'Freiwillig zubuchbar'}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 sm:p-5 font-semibold text-slate-900">
                    {isEn ? 'Source Code & Ownership' : 'Quellcode-Eigentum'}
                  </th>
                  <td className="p-4 sm:p-5 text-center text-slate-700">
                    {isEn ? '100% Ownership' : '100% Ihr Eigentum'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-amber-50/40 border-x border-amber-200/60">
                    {isEn ? '100% Ownership' : '100% Ihr Eigentum'}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-700">
                    {isEn ? '100% Ownership' : '100% Ihr Eigentum'}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-slate-900 bg-slate-50/60 border-l border-slate-200">
                    {isEn ? '100% Ownership' : '100% Ihr Eigentum'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-[#fafafa] w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              Alles Wichtige zu Preisen & Ablauf
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-50/80 border-t border-slate-200 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 mb-6">
            {isEn
              ? 'Let Us Calculate Your Bespoke Fixed-Price Quote'
              : 'Lassen Sie uns Ihr maßgeschneidertes Angebot berechnen'}
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Request your free website audit or personal strategy consultation with Umutcan Emre Tezgel: non-binding, transparent, and risk-free.'
              : 'Fordern Sie jetzt Ihr kostenloses Website-Audit oder ein persönliches Strategiegespräch mit Umutcan Emre Tezgel an: unverbindlich, transparent und ohne Risiko.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-xl shadow-primary-700/20 hover:scale-[1.02] text-lg"
            >
              <span>{isEn ? 'Request Free Quote' : 'Kostenloses Angebot anfordern'}</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </NavLink>
            <NavLink
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              <span>{isEn ? 'Configure Project Yourself' : 'Projekt selbst konfigurieren'}</span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
