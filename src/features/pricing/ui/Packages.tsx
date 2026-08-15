import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link as NavLink } from '@/i18n/navigation';
import {
  Clock,
  CheckCircle,
  MinusCircle,
  ArrowRight,
  ShieldCheck,
  Lightning,
  Calendar,
  Sparkle,
  TrendUp,
  Cpu,
  LockKey,
} from '@phosphor-icons/react/dist/ssr';
import { SeoHead } from '@/shared/ui/SeoHead';
import GradientText from '@/shared/ui/GradientText';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import { PackageSelectButton } from './PackageSelectButton';
import { FaqAccordion } from './FaqAccordion';
import { StepInitializer } from './StepInitializer';

export default async function Packages() {
  const t = await getTranslations('pricing');
  const locale = await getLocale();
  const isEn = locale === 'en';

  const packages = [
    {
      id: 'starter',
      name: isEn ? 'Starter / Local Authority' : 'Starter / Local Authority',
      tagline: isEn
        ? 'Perfect for craftsmen & local service providers seeking online dominance.'
        : 'Perfekt für Handwerker & lokale Dienstleister für planbare Anfragen.',
      setupPrice: 1900,
      popular: false,
      features: [
        isEn
          ? 'Custom Next.js 15 Website (up to 5 pages)'
          : 'Maßgeschneiderte Next.js 15 Website (bis 5 Unterseiten)',
        isEn
          ? '100/100 Google Core Web Vitals Guaranteed'
          : '100/100 Google Core Web Vitals Garantie',
        isEn
          ? 'Mobile-First UX & High-Converting Contact Forms'
          : 'Mobile-First Design & DSGVO-Kontaktfunnel',
        isEn
          ? 'Local SEO & Google Business Profile Optimization'
          : 'Lokale SEO-Optimierung & Google Maps Ausrichtung',
        isEn
          ? '100% Source Code & Design Ownership'
          : '100% Quellcode- & Design-Eigentum (Kein Abo)',
        isEn ? 'Zero-Downtime Global Edge Deployment' : 'Zero-Downtime Vercel Edge Hosting Setup',
      ],
      notIncluded: [
        isEn ? 'Headless CMS for custom editing' : 'Headless CMS Redaktionssystem',
        isEn ? '60-Second Express Recruiting Funnel' : '60-Sekunden Mobile-Recruiting Funnel',
        isEn
          ? 'Multi-Language Architecture (i18n)'
          : 'Mehrsprachigkeit & globale Internationalisierung',
      ],
      cta: isEn ? 'Choose Starter' : 'Starter wählen',
      deliveryDays: 14,
    },
    {
      id: 'business',
      name: isEn ? 'Business Enterprise / B2B' : 'Business Enterprise / B2B',
      tagline: isEn
        ? 'The gold standard for mid-market leaders, B2B companies & industry.'
        : 'Der Maßstab für anspruchsvollen Mittelstand, Industrie & B2B.',
      setupPrice: 3800,
      popular: true,
      badge: isEn ? 'Most Popular' : 'Beliebteste Wahl',
      features: [
        isEn
          ? 'Bespoke Next.js 15 Enterprise Architecture (up to 12 pages)'
          : 'Maßgeschneiderte Next.js 15 B2B-Plattform (bis 12 Unterseiten)',
        isEn
          ? 'Sanity v3 Headless CMS (Self-managed content)'
          : 'Sanity v3 Headless CMS (Inhalte selbst verwalten)',
        isEn
          ? '60-Second Mobile Express-Recruiting Funnel'
          : '60-Sekunden Express-Mitarbeitergewinnung',
        isEn
          ? '100/100 Core Web Vitals & Sub-0.3s Load Time'
          : '100/100 Core Web Vitals & Sub-0,3s Ladezeit',
        isEn
          ? 'Technical SEO, Topic Silos & Schema Markup'
          : 'Technisches SEO, Topic-Silos & Rich Snippets',
        isEn
          ? 'Micro-Animations & Dynamic Bento Grid Layouts'
          : 'Micro-Animations & maßgeschneidertes Bento-UI',
        isEn
          ? 'Direct Line to Lead Architect Umutcan Emre Tezgel'
          : 'Direkter Draht zum Lead-Architekten Umutcan Emre Tezgel',
      ],
      notIncluded: [
        isEn ? 'Full E-Commerce Shop Checkout' : 'Vollständiger Online-Shop Checkout',
        isEn ? 'Custom CRM / ERP Deep-Sync' : 'Tiefgreifende ERP-/CRM-Schnittstellen',
      ],
      cta: isEn ? 'Choose Business Enterprise' : 'Business Enterprise wählen',
      deliveryDays: 21,
    },
    {
      id: 'custom-app',
      name: isEn ? 'Custom App & E-Commerce' : 'Custom App & E-Commerce',
      tagline: isEn
        ? 'High-performance web apps, client portals & headless shops.'
        : 'Web-Applikationen, Kundenportale & Headless Online-Shops.',
      setupPrice: 6500,
      popular: false,
      features: [
        isEn
          ? 'Full-Stack Next.js 15 & React 19 Web Application'
          : 'Full-Stack Next.js 15 & React 19 Web-Applikation',
        isEn
          ? 'Headless E-Commerce (Shopify / Stripe) or Client Portal'
          : 'Headless E-Commerce (Stripe/Shopify) oder B2B-Portal',
        isEn
          ? 'Deep API Integrations (ERP, CRM, Database & Auth)'
          : 'API-Schnittstellen (ERP, Supabase Auth, CRM-Sync)',
        isEn
          ? 'Multi-Language Architecture (German + English)'
          : 'Lückenlose Mehrsprachigkeit (next-intl)',
        isEn
          ? 'Advanced Search with Instant Filtering (Sub-50ms)'
          : 'Instant-Suche & dynamische B2B-Katalogfilter',
        isEn
          ? 'Continuous Deployment & SLA Priority Support'
          : 'CI/CD Pipelines & bevorzugter Priority-Support',
      ],
      notIncluded: [],
      cta: isEn ? 'Request Custom Project' : 'Custom Projekt anfragen',
      deliveryDays: 30,
    },
  ];

  const roiPoints = [
    {
      icon: Lightning,
      title: isEn ? 'Ladezeit von 4s auf 0.3s' : 'Ladezeit von 4s auf 0,3s',
      desc: isEn
        ? 'Every 1-second delay reduces conversions by 7%. Our 100/100 PageSpeed architecture doubles your lead rate.'
        : 'Jede Sekunde Ladezeit kostet bis zu 7% Conversion. Unsere 100/100 Next.js Architektur schöpft Ihr volles Potenzial aus.',
    },
    {
      icon: TrendUp,
      title: isEn ? 'Planbare Mitarbeitergewinnung' : '60s Express-Recruiting',
      desc: isEn
        ? 'Qualified applicants apply in 60 seconds directly on mobile devices without tedious PDF attachments.'
        : 'Fachkräfte bewerben sich in unter 60 Sekunden direkt am Smartphone — ohne lästige Lebenslauf-PDFs.',
    },
    {
      icon: LockKey,
      title: isEn ? 'Zero Maintenance Stress' : '0 € Wartungs-Zwang',
      desc: isEn
        ? 'No vulnerable WordPress plugins or recurring license costs. 100% code ownership with zero lock-in.'
        : 'Keine angreifbaren WordPress-Plugins oder teure Lizenz-Abos. 100% Code-Eigentum gehört Ihnen.',
    },
  ];

  const faqItems = [
    {
      question: isEn
        ? 'Are there any hidden recurring fees or mandatory subscriptions?'
        : 'Gibt es bei Coday versteckte Folgekosten oder Abo-Fallen?',
      answer: isEn
        ? 'No. We work strictly with transparent fixed prices. After launch, all design and source code belong 100% to you. There are no mandatory monthly retainer fees.'
        : 'Nein. Wir arbeiten ausnahmslos mit transparenten Festpreisen. Nach Projektabschluss gehört das Design und der gesamte Quellcode zu 100% Ihnen. Es gibt keine verpflichtenden monatlichen Bindungen.',
    },
    {
      question: isEn ? 'How is payment structured?' : 'Wie sind die Zahlungsmodalitäten geregelt?',
      answer: isEn
        ? 'We split the investment into two fair milestones: 50% upon project kickoff and 50% after your final approval and launch.'
        : 'Wir teilen die Investition in zwei faire Meilensteine: 50% Anzahlung bei Projektstart und 50% erst nach erfolgreichem Launch und Ihrer vollständigen Abnahme.',
    },
    {
      question: isEn
        ? 'How quickly will my new website be live?'
        : 'Wie schnell ist meine neue Website online?',
      answer: isEn
        ? 'Depending on the selected plan, delivery takes between 14 and 28 business days from the moment initial information is provided.'
        : 'Je nach gewähltem Paket dauert die Umsetzung zwischen 14 und 28 Werktagen ab Bereitstellung der Kerninformationen.',
    },
    {
      question: isEn
        ? 'What hosting costs should I expect?'
        : 'Welche Hosting-Kosten kommen auf mich zu?',
      answer: isEn
        ? 'Thanks to modern static compilation on Vercel, most client websites run on high-performance Edge CDNs for 0 € to approx. 20 €/month with enterprise security.'
        : 'Dank moderner statischer Vorkompilierung auf Vercel laufen die meisten Websites auf weltweiten Edge-Netzwerken für 0 € bis ca. 20 €/Monat bei höchster Ausfallsicherheit.',
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SeoHead
        title="Transparente Webdesign Preise & Pakete | Coday Webagentur"
        description="Transparente Festpreise für High-End Webdesign & Next.js Entwicklung. Keine versteckten Kosten, 100% Quellcode-Eigentum & messbarer ROI. Jetzt kalkulieren!"
        breadcrumbs={[
          { name: 'Home', url: 'https://codayweb.de' },
          { name: 'Preise', url: 'https://codayweb.de/pricing' },
        ]}
      />

      <StepInitializer />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 w-full relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-amber-400" />
            {isEn ? '100% FIXED PRICE GUARANTEE' : '100% FESTPREIS-GARANTIE OHNE VERSTECKTE KOSTEN'}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8 max-w-5xl mx-auto">
            Transparente Preise für{' '}
            <GradientText
              colors={['#fbbf24', '#fef08a', '#f59e0b']}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              High-End Webentwicklung
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Keine Überraschungen, keine unkalkulierbaren Stundensätze. Sie investieren in eine
            zukunftssichere Next.js-Architektur mit 100/100 Core Web Vitals und vollständigem
            Quellcode-Eigentum.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
            >
              <span>{isEn ? 'Request Free Audit' : 'Kostenloses Audit anfordern'}</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </NavLink>
            <NavLink
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-slate-200 border border-slate-800 rounded-full font-medium hover:bg-slate-850 transition duration-300"
            >
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>{isEn ? 'Book Strategy Call' : 'Strategiegespräch buchen'}</span>
            </NavLink>
          </div>
        </div>
      </section>

      {/* ROI & Value Proposition Section */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roiPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 text-amber-400">
                    <point.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">{point.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Main Pricing Packages */}
      <section className="py-24 px-4 w-full relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between border transition-all ${
                  pkg.popular
                    ? 'bg-slate-900/90 border-amber-500/50 shadow-2xl shadow-amber-500/10 lg:-translate-y-3'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-center mb-8 pt-2">
                    <h2 className="font-display font-bold text-2xl text-white mb-2">{pkg.name}</h2>
                    <p className="text-slate-400 text-xs sm:text-sm min-h-[36px]">{pkg.tagline}</p>
                  </div>

                  <div className="text-center mb-8 pb-8 border-b border-slate-800">
                    <div className="font-display font-black text-5xl text-white tracking-tight mb-3">
                      ab {pkg.setupPrice.toLocaleString('de-DE')} €
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Lieferzeit: ~{pkg.deliveryDays} Werktage</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-10 text-sm">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-200">
                        <CheckCircle
                          weight="fill"
                          className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {pkg.notIncluded.map((feature, idx) => (
                      <li key={`ni-${idx}`} className="flex items-start gap-3 text-slate-500">
                        <MinusCircle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                        <span className="line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <PackageSelectButton pkgId={pkg.id} ctaText={pkg.cta} popular={pkg.popular} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 px-4 bg-slate-900/50 border-y border-slate-800/80 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Detaillierter Funktionsabgleich
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 mb-4">
              Alle Paket-Features im direkten Vergleich
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Finden Sie exakt die richtige Konfiguration für Ihre aktuellen Unternehmensziele.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60">
                  <th scope="col" className="p-5 text-xs font-bold text-slate-400 uppercase">
                    Feature
                  </th>
                  <th scope="col" className="p-5 text-center text-sm font-bold text-slate-300">
                    Starter
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-center text-sm font-bold text-amber-400 bg-amber-950/20 border-x border-amber-500/20"
                  >
                    Business Enterprise
                  </th>
                  <th scope="col" className="p-5 text-center text-sm font-bold text-slate-300">
                    Custom App & Shop
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-200">
                    Seitenanzahl
                  </th>
                  <td className="p-5 text-center text-slate-400">Bis 5 Seiten</td>
                  <td className="p-5 text-center font-bold text-white bg-amber-950/10 border-x border-amber-500/20">
                    Bis 12 Seiten
                  </td>
                  <td className="p-5 text-center text-slate-400">Unbegrenzt</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-200">
                    Core Web Vitals 100/100
                  </th>
                  <td className="p-5 text-center text-amber-400">✓ Inklusive</td>
                  <td className="p-5 text-center font-bold text-amber-400 bg-amber-950/10 border-x border-amber-500/20">
                    ✓ Inklusive
                  </td>
                  <td className="p-5 text-center text-amber-400">✓ Inklusive</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-200">
                    Headless CMS (Sanity)
                  </th>
                  <td className="p-5 text-center text-slate-600">—</td>
                  <td className="p-5 text-center font-bold text-amber-400 bg-amber-950/10 border-x border-amber-500/20">
                    ✓ Inklusive
                  </td>
                  <td className="p-5 text-center text-amber-400">✓ Inklusive</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-200">
                    60s Mobile-Recruiting Funnel
                  </th>
                  <td className="p-5 text-center text-slate-600">—</td>
                  <td className="p-5 text-center font-bold text-amber-400 bg-amber-950/10 border-x border-amber-500/20">
                    ✓ Inklusive
                  </td>
                  <td className="p-5 text-center text-amber-400">✓ Inklusive</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-200">
                    Quellcode-Eigentum & Hosting-Freiheit
                  </th>
                  <td className="p-5 text-center text-slate-200">100% Ihr Eigentum</td>
                  <td className="p-5 text-center font-bold text-white bg-amber-950/10 border-x border-amber-500/20">
                    100% Ihr Eigentum
                  </td>
                  <td className="p-5 text-center text-slate-200">100% Ihr Eigentum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-slate-950 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 mb-4">
              Alles Wichtige zu Preisen & Ablauf
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-900/60 border-t border-slate-800/80 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6">
            Lassen Sie uns Ihr Projekt kalkulieren
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Fordern Sie jetzt ein kostenloses, detailliertes Website-Audit oder ein persönliches
            Strategiegespräch mit Umutcan Emre Tezgel an.
          </p>
          <NavLink
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] text-lg"
          >
            <span>Kostenloses Angebot anfordern</span>
            <ArrowRight weight="bold" className="w-5 h-5" />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
