import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link as NavLink } from '@/i18n/navigation';
import Image from 'next/image';
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
  ChartLineUp,
  SealCheck,
  Percent,
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
        : 'Perfekt für Handwerker & lokale Dienstleister für planbare Neukunden.',
      priceTag: isEn ? 'On Request' : 'Auf Anfrage',
      subPrice: isEn ? 'Bespoke Fixed Price after Consultation' : 'Individuelles Festpreisangebot',
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
      cta: isEn ? 'Inquire Starter Package' : 'Starter unverbindlich anfragen',
      deliveryDays: 14,
    },
    {
      id: 'business',
      name: isEn ? 'Business Enterprise / B2B' : 'Business Enterprise / B2B',
      tagline: isEn
        ? 'The gold standard for mid-market leaders, B2B companies & industry.'
        : 'Der Maßstab für anspruchsvollen Mittelstand, Industrie & B2B.',
      priceTag: isEn ? 'On Request' : 'Auf Anfrage',
      subPrice: isEn ? 'Most Popular for High-Growth SME' : 'Maßgeschneidertes Festpreisangebot',
      popular: true,
      badge: isEn ? 'Most Popular' : 'Empfehlung für Mittelstand',
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
      cta: isEn ? 'Inquire Business Enterprise' : 'Business Enterprise anfragen',
      deliveryDays: 21,
    },
    {
      id: 'custom-app',
      name: isEn ? 'Custom App & E-Commerce' : 'Custom App & E-Commerce',
      tagline: isEn
        ? 'High-performance web apps, client portals & headless shops.'
        : 'Web-Applikationen, Kundenportale & Headless Online-Shops.',
      priceTag: isEn ? 'On Request' : 'Auf Anfrage',
      subPrice: isEn ? 'Custom Scope & Integration Architecture' : 'Individueller Projektumfang',
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

  const valuePillars = [
    {
      icon: Percent,
      title: isEn ? '5x to 10x More Cost-Effective' : '5 bis 10x Kostenvorteil',
      subtitle: isEn ? 'Zero Agency Overhead' : 'Ohne Agentur-Overhead',
      desc: isEn
        ? 'Traditional agencies charge for account managers, project managers, and office overhead. At Coday, you work directly with the lead software architect. Automated KI-augmented development enables faster results at a fraction of the market cost.'
        : 'Traditionelle Großagenturen verrechnen Vertriebler, Account-Manager und teure Büropaläste. Bei Coday arbeiten Sie direkt mit dem leitenden Software-Architekten. Durch KI-unterstützte Next.js Entwicklungsprozesse liefern wir Ergebnisse in Rekordzeit zu einem Bruchteil des Marktpreises.',
    },
    {
      icon: SealCheck,
      title: isEn ? '100/100 Certified Quality' : 'Garantierte 100/100 Qualität',
      subtitle: isEn ? 'Google & Seobility Audits' : 'Messbare Spitzenleistung',
      desc: isEn
        ? 'Verified by independent SEO and performance tools. Every project achieves perfect scores in Google PageSpeed Insights (Mobile & Desktop), Seobility Site-Audits, and WCAG accessibility standards.'
        : 'Durch unabhängige SEO- und Performance-Prüfungen schwarz auf weiß belegt: Jedes Coday-Projekt erzielt 100/100 Punkte bei Google PageSpeed Insights, fehlerfreie 100% Seobility On-Page Audits und subsekundäre Ladezeiten unter 0,3 Sekunden.',
    },
    {
      icon: LockKey,
      title: isEn ? '100% Code & Asset Ownership' : '100% Eigentum ohne Abo-Fallen',
      subtitle: isEn ? 'Zero Lock-in Guarantee' : 'Volle Unabhängigkeit',
      desc: isEn
        ? 'No mandatory monthly retainers or vendor lock-in. You receive full ownership of your custom source code, high-resolution design assets, and edge hosting infrastructure.'
        : 'Keine monatlichen Wartungs-Knebelverträge, keine proprietären Baukasten-Fallen. Sie erhalten das uneingeschränkte Eigentum am gesamten Quellcode, allen Design-Assets und der Hosting-Infrastruktur.',
    },
  ];

  const faqItems = [
    {
      question: isEn
        ? 'How are project prices calculated without fixed package fees?'
        : 'Wie setzen sich die Preise zusammen, wenn keine festen Pauschalen angegeben sind?',
      answer: isEn
        ? 'Every company has unique requirements. In our free initial consultation, we analyze your current digital presence, define the exact feature scope, and provide a transparent, binding fixed-price quote. You only pay for what brings measurable value to your business.'
        : 'Jedes Unternehmen hat individuelle Anforderungen und Ziele. In einer kostenlosen Erstberatung analysieren wir Ihren Bedarf, wählen gemeinsam die benötigten Module aus und erstellen ein verbindliches Festpreisangebot. Sie zahlen ausschließlich für Features, die messbaren Mehrwert stiften — ohne versteckte Kosten oder Überraschungen.',
    },
    {
      question: isEn
        ? 'Why is Coday significantly more cost-effective than traditional agencies?'
        : 'Warum ist Coday 5 bis 10 Mal günstiger als traditionelle Werbeagenturen?',
      answer: isEn
        ? 'We eliminate the heavy overhead of large agencies: no non-technical sales staff, no junior developer delegation, and no bureaucratic delays. With our modern Next.js architecture and AI-augmented toolchain, a single expert engineer achieves what usually requires a team of five.'
        : 'Wir verzichten bewusst auf administrative Wasserköpfe, Sales-Zwischenhändler und teure Prestige-Büros. Durch unsere hochmoderne Next.js 15 Architektur und modernste KI-gestützte Entwicklungsworkflows setzt Inhaber Umutcan Emre Tezgel Projekte schneller und präziser um als traditionelle Fünf-Personen-Teams.',
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
        ? 'Thanks to modern static compilation on Vercel and Edge CDNs, most client websites run globally with enterprise security for 0 € to approx. 20 €/month.'
        : 'Dank moderner statischer Vorkompilierung auf Vercel laufen die meisten Websites auf weltweiten Edge-Netzwerken für 0 € bis ca. 20 €/Monat bei höchster Ausfallsicherheit.',
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <SeoHead
        title="Webdesign Preise & Maßgeschneiderte Angebote | Coday Webagentur"
        description="Individuelle Festpreise für High-End Webdesign & Next.js Entwicklung. 5-10x kosteneffizienter als Großagenturen, 100/100 PageSpeed & 100% Quellcode-Eigentum."
        breadcrumbs={[
          { name: 'Home', url: 'https://codayweb.de' },
          { name: 'Preise', url: 'https://codayweb.de/pricing' },
        ]}
      />

      <StepInitializer />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 w-full relative overflow-hidden">
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
            Maßgeschneiderte Angebote für{' '}
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
              High-End Webentwicklung
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Wählen Sie exakt die Module und Funktionen, die Sie benötigen. Nach einer kostenlosen
            Bedarfsanalyse erhalten Sie ein maßgeschneidertes, verbindliches Festpreisangebot —{' '}
            <strong className="text-amber-800 font-semibold">
              5 bis 10x kosteneffizienter als Großagenturen
            </strong>{' '}
            bei nachweislich überlegener 100/100 Spitzenqualität.
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
                Google Maps (Verifiziert)
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
                ProvenExpert (100% Empfehlung)
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 5-10x Cost Advantage & Value Proof Section */}
      <section className="py-20 bg-white border-y border-slate-200 w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Der Coday Effizienz-Vorteil
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              Warum wir 5 bis 10x günstiger sind & bessere Qualität liefern
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Höhere Budgets bedeuten bei traditionellen Agenturen selten besseren Code. Sie zahlen
              für teure Vertriebsapparate und veraltete WordPress-Monolithen. Wir investieren 100%
              unserer Energie in messbare Spitzenleistung.
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
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
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
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
                  Schwarz auf weiß bewiesen: 100/100 PageSpeed & Top Seobility Score
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Während durchschnittliche Agentur-Websites bei Google Lighthouse unter 60 Punkten
                  einbrechen und wertvolle Leads verschenken, erzielt unsere Next.js 15
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
                      Google PageSpeed Insights — Mobile & Desktop
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

      {/* 3 Main Flexible Service Packages */}
      <section className="py-24 px-4 w-full relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Modulare Leistungspakete
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              Wählen Sie Ihren gewünschten Projektumfang
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sie wählen die Bausteine — wir schnüren Ihnen das wirtschaftlichste Angebot für Ihren
              Erfolg. Alle Pakete sind flexibel erweiterbar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between border transition-all ${
                  pkg.popular
                    ? 'bg-white border-amber-500/40 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20 lg:-translate-y-3'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-500 text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-center mb-8 pt-2">
                    <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">
                      {pkg.name}
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm min-h-[36px]">{pkg.tagline}</p>
                  </div>

                  <div className="text-center mb-8 pb-8 border-b border-slate-100">
                    <div className="font-display font-black text-4xl text-primary-700 tracking-tight mb-2">
                      {pkg.priceTag}
                    </div>
                    <div className="text-xs text-slate-500 mb-3">{pkg.subPrice}</div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Lieferzeit: ~{pkg.deliveryDays} Werktage</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-10 text-sm">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle
                          weight="fill"
                          className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {pkg.notIncluded.map((feature, idx) => (
                      <li key={`ni-${idx}`} className="flex items-start gap-3 text-slate-400">
                        <MinusCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <NavLink
                    href="/contact"
                    className={`group active:scale-[0.97] w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                      pkg.popular
                        ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-md'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex-1 text-center">{pkg.cta}</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th scope="col" className="p-5 text-xs font-bold text-slate-500 uppercase">
                    Feature
                  </th>
                  <th scope="col" className="p-5 text-center text-sm font-bold text-slate-700">
                    Starter
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-center text-sm font-bold text-amber-900 bg-amber-50/80 border-x border-amber-200/60"
                  >
                    Business Enterprise
                  </th>
                  <th scope="col" className="p-5 text-center text-sm font-bold text-slate-700">
                    Custom App & Shop
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-900">
                    Kosten & Angebot
                  </th>
                  <td className="p-5 text-center text-primary-700 font-semibold">Auf Anfrage</td>
                  <td className="p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    Auf Anfrage
                  </td>
                  <td className="p-5 text-center text-primary-700 font-semibold">Auf Anfrage</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-900">
                    Seitenanzahl
                  </th>
                  <td className="p-5 text-center text-slate-600">Bis 5 Seiten</td>
                  <td className="p-5 text-center font-bold text-slate-900 bg-amber-50/40 border-x border-amber-200/60">
                    Bis 12 Seiten
                  </td>
                  <td className="p-5 text-center text-slate-600">Unbegrenzt</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-900">
                    Core Web Vitals 100/100
                  </th>
                  <td className="p-5 text-center text-amber-700 font-medium">✓ Inklusive</td>
                  <td className="p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    ✓ Inklusive
                  </td>
                  <td className="p-5 text-center text-amber-700 font-medium">✓ Inklusive</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-900">
                    Headless CMS (Sanity)
                  </th>
                  <td className="p-5 text-center text-slate-400">—</td>
                  <td className="p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    ✓ Inklusive
                  </td>
                  <td className="p-5 text-center text-amber-700 font-medium">✓ Inklusive</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-900">
                    60s Mobile-Recruiting Funnel
                  </th>
                  <td className="p-5 text-center text-slate-400">—</td>
                  <td className="p-5 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200/60">
                    ✓ Inklusive
                  </td>
                  <td className="p-5 text-center text-amber-700 font-medium">✓ Inklusive</td>
                </tr>
                <tr>
                  <th scope="row" className="p-5 font-semibold text-slate-900">
                    Quellcode-Eigentum & Hosting-Freiheit
                  </th>
                  <td className="p-5 text-center text-slate-700">100% Ihr Eigentum</td>
                  <td className="p-5 text-center font-bold text-slate-900 bg-amber-50/40 border-x border-amber-200/60">
                    100% Ihr Eigentum
                  </td>
                  <td className="p-5 text-center text-slate-700">100% Ihr Eigentum</td>
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
            Lassen Sie uns Ihr maßgeschneidertes Angebot berechnen
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Fordern Sie jetzt Ihr kostenloses Website-Audit oder ein persönliches Strategiegespräch
            mit Umutcan Emre Tezgel an — unverbindlich, transparent und ohne Risiko.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-xl shadow-primary-700/20 hover:scale-[1.02] text-lg"
            >
              <span>Kostenloses Angebot anfordern</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </NavLink>
            <NavLink
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              <span>Projekt selbst konfigurieren</span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
