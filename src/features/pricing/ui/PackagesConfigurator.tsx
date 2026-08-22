'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import {
  Clock,
  CheckCircle,
  MinusCircle,
  ArrowRight,
  Sparkle,
  PlusCircle,
  Check,
  Article,
  MagnifyingGlass,
  UserPlus,
  Palette,
  Globe,
  Lightning,
  CloudCheck,
  Headset,
} from '@phosphor-icons/react/dist/ssr';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { modules } from '@/shared/data/modules';

interface PackageConfig {
  id: string;
  name: string;
  tagline: string;
  priceTag: string;
  subPrice: string;
  popular: boolean;
  badge?: string;
  deliveryDays: number;
  features: string[];
  notIncluded: string[];
}

export const PackagesConfigurator: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';
  const router = useRouter();

  const storePackageId = useCalculatorStore((state) => state.selectedPackageId);
  const storeModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const setPackageAndAddons = useCalculatorStore((state) => state.setPackageAndAddons);
  const setStep = useCalculatorStore((state) => state.setStep);

  const [selectedPkgId, setSelectedPkgId] = useState<string>(storePackageId || 'business');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(() => {
    const addons: string[] = [];
    storeModuleIds.forEach((id) => {
      const mod = modules.find((m) => m.id === id);
      if (mod && mod.category !== 'basis') {
        addons.push(id);
      }
    });
    return addons.length > 0 ? addons : ['seo-tech'];
  });

  const packages: PackageConfig[] = useMemo(
    () => [
      {
        id: 'starter',
        name: isEn ? 'Starter (Compact)' : 'Starter (Klein)',
        tagline: isEn
          ? 'Compact high-speed website for local service providers, craftsmen & practices.'
          : 'Kompakte High-Speed Webpräsenz für lokale Dienstleister, Handwerker & Praxen.',
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
        subPrice: isEn
          ? 'Bespoke fixed-price quote after consultation'
          : 'Transparenter Festpreis nach Bedarfsanalyse',
        popular: false,
        deliveryDays: 14,
        features: [
          isEn
            ? 'Custom Next.js 15 Website (1–5 pages)'
            : 'Maßgeschneiderte Next.js 15 Website (1–5 Unterseiten)',
          isEn
            ? '100/100 Google Core Web Vitals & Sub-0.3s Speed'
            : '100/100 Google Core Web Vitals & Sub-0,3s Ladezeit',
          isEn
            ? 'Mobile-First UX & GDPR-Compliant Contact Funnel'
            : 'Mobile-First Design & DSGVO-Kontaktfunnel',
          isEn
            ? 'Local SEO & Google Maps Profile Alignment'
            : 'Lokale SEO-Optimierung & Google Maps Ausrichtung',
          isEn
            ? '100% Source Code & Design Ownership (No lock-in)'
            : '100% Quellcode- & Design-Eigentum (Kein Abo)',
          isEn ? 'Vercel Edge Hosting Deployment' : 'Vercel Edge Hosting Deployment',
        ],
        notIncluded: [
          isEn
            ? 'Sanity v3 Headless CMS (optional add-on)'
            : 'Sanity v3 Headless CMS (optional zubuchbar)',
          isEn
            ? 'E-Commerce Online Shop (optional add-on)'
            : 'E-Commerce Shop (optional zubuchbar)',
          isEn
            ? 'Custom Web App / Portal (optional add-on)'
            : 'Custom App / Portal (optional zubuchbar)',
        ],
      },
      {
        id: 'business',
        name: isEn ? 'Business (Standard)' : 'Business (Mittel)',
        tagline: isEn
          ? 'The benchmark for ambitious SMEs, B2B companies, industry & law firms.'
          : 'Der Maßstab für anspruchsvollen B2B-Mittelstand, Industrie & Kanzleien.',
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
        subPrice: isEn
          ? 'Most popular choice for mid-market businesses'
          : 'Beliebteste Wahl für anspruchsvolle Unternehmen',
        popular: true,
        badge: isEn ? 'Bestseller Mid-Market' : 'Bestseller Mittelstand',
        deliveryDays: 21,
        features: [
          isEn
            ? 'Bespoke Next.js 15 B2B Platform (up to 12 pages)'
            : 'Maßgeschneiderte Next.js 15 B2B-Plattform (bis 12 Unterseiten)',
          isEn
            ? '100/100 Core Web Vitals & Sub-0.3s Load Time'
            : '100/100 Core Web Vitals & Sub-0,3s Ladezeit',
          isEn
            ? 'Technical SEO, Topic Silos & Rich Schema Markup'
            : 'Technisches SEO, Topic-Silos & Rich Snippets',
          isEn
            ? 'Micro-Animations & Dynamic Bento Grid Layouts'
            : 'Micro-Animations & maßgeschneidertes Bento-UI',
          isEn
            ? '60-Second Mobile Express Recruiting Funnel'
            : '60-Sekunden Express-Mitarbeitergewinnung',
          isEn
            ? 'Direct Line to Lead Architect Umutcan Emre Tezgel'
            : 'Direkter Draht zum Lead-Architekten Umutcan Emre Tezgel',
        ],
        notIncluded: [
          isEn
            ? 'Sanity v3 Headless CMS (optional add-on)'
            : 'Sanity v3 Headless CMS (optional zubuchbar)',
          isEn
            ? 'E-Commerce Online Shop (optional add-on)'
            : 'E-Commerce Shop (optional zubuchbar)',
          isEn
            ? 'Custom Web App / Portal (optional add-on)'
            : 'Custom App / Portal (optional zubuchbar)',
        ],
      },
      {
        id: 'corporate',
        name: isEn ? 'Pro Corporate (Large)' : 'Pro Corporate (Groß)',
        tagline: isEn
          ? 'Comprehensive corporate platform with maximum conversion & brand authority.'
          : 'Umfassende Unternehmensplattform mit maximaler Konversions- & Markenstärke.',
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
        subPrice: isEn
          ? 'Extensive digital flagship presence'
          : 'Umfangreicher digitaler Flaggschiff-Auftritt',
        popular: false,
        badge: isEn ? 'Full Corporate Scope' : 'Umfassende Präsenz',
        deliveryDays: 30,
        features: [
          isEn
            ? 'Extensive Next.js 15 Corporate Platform (up to 30 pages)'
            : 'Umfangreiche Next.js 15 Corporate-Plattform (bis 30 Seiten)',
          isEn
            ? 'Holistic Topic Clusters & Rich Schema Domination'
            : 'Holistische SEO Topic-Cluster & Rich Schema Dominanz',
          isEn
            ? 'Multi-Step Conversion Funnels, Calculators & Quiz Tools'
            : 'Mehrstufige Conversion-Pfade (Rechner, Funnels & Filter)',
          isEn
            ? 'Global Multi-Language Architecture (i18n ready)'
            : 'Vorbereitung für globale Mehrsprachigkeit (i18n)',
          isEn
            ? 'Tailored Motion Design & Custom Token Library'
            : 'Maßgeschneidertes Designsystem & Component Tokens',
          isEn
            ? 'Strategic CRO & Executive Technical Guidance'
            : 'Persönliche Conversion-Rate- & Strategie-Begleitung',
        ],
        notIncluded: [
          isEn
            ? 'Sanity v3 Headless CMS (optional add-on)'
            : 'Sanity v3 Headless CMS (optional zubuchbar)',
          isEn
            ? 'E-Commerce Online Shop (optional add-on)'
            : 'E-Commerce Shop (optional zubuchbar)',
          isEn
            ? 'Custom Web App / Portal (optional add-on)'
            : 'Custom App / Portal (optional zubuchbar)',
        ],
      },
      {
        id: 'enterprise',
        name: isEn ? 'Enterprise Platform (Extremely Large)' : 'Enterprise Platform (Extrem groß)',
        tagline: isEn
          ? 'For large enterprises, corporations & nationwide or global multi-region rollouts.'
          : 'Für Großkunden, Konzerne & riesige Plattformen mit bundesweitem oder internationalem Rollout.',
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
        subPrice: isEn
          ? 'Enterprise platform engineering on demand'
          : 'Individuelle Großplattform nach Maßgabe',
        popular: false,
        badge: isEn ? 'Enterprise Rollout' : 'Großkunden & Plattformen',
        deliveryDays: 45,
        features: [
          isEn
            ? 'Scalable Multi-Region Edge Infrastructure & Platform Logic'
            : 'Skalierbare Multi-Region Edge-Architektur & Hochleistungs-Infrastruktur',
          isEn
            ? 'Engineered for Massive User Traffic & Nationwide/Global Rollout'
            : 'Konzipiert für riesige Nutzerzahlen & extreme bundesweite / weltweite Reichweite',
          isEn
            ? 'Custom Enterprise Architecture & System Integrations (ERP/CRM)'
            : 'Komplexe individuelle Software-Architektur & Enterprise Schnittstellen',
          isEn
            ? 'Maximum Security & Compliance (Edge WAF, DDoS, ISO/GDPR)'
            : 'Höchste Sicherheits-, Datenschutz- & Compliance-Standards (WAF, DDoS, DSGVO)',
          isEn
            ? 'Dedicated VIP SLA & Guaranteed Developer Response Times'
            : 'Dediziertes VIP-SLA & garantierte Reaktionszeiten',
          isEn
            ? 'Direct Lead Architect Engagement with Umutcan Emre Tezgel'
            : 'Direkte Inhaber-Architektur & langfristige strategische Begleitung',
        ],
        notIncluded: [
          isEn
            ? 'Sanity v3 Headless CMS (optional add-on)'
            : 'Sanity v3 Headless CMS (optional zubuchbar)',
          isEn
            ? 'E-Commerce Online Shop (optional add-on)'
            : 'E-Commerce Shop (optional zubuchbar)',
          isEn
            ? 'Custom Web App / Portal (optional add-on)'
            : 'Custom App / Portal (optional zubuchbar)',
        ],
      },
    ],
    [isEn]
  );

  // Available Add-ons with clear descriptions (Headless CMS optional zubuchbar, Wartung freiwillig, E-Commerce & Apps separate Add-ons)
  const availableAddons = useMemo(
    () => [
      {
        id: 'func-cms',
        name: isEn ? 'Sanity v3 Headless CMS' : 'Sanity v3 Headless CMS',
        desc: isEn
          ? 'Intuitive headless CMS: update text, media, and blog content anytime independently without code.'
          : 'Optionales Headless CMS: Texte, Bilder und Blog-Inhalte jederzeit selbstständig und intuitiv pflegen.',
        icon: Article,
        recommended: true,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'commerce-headless',
        name: isEn ? 'Headless E-Commerce & Shop' : 'Headless E-Commerce & Online-Shop',
        desc: isEn
          ? 'Fast headless shop integration (Shopify / Stripe / Medusa) with seamless checkout and sub-second cart speeds.'
          : 'Leistungsstarkes Headless-Shop-System (Shopify, Stripe, Medusa) mit blitzschnellem Checkout und Warenkorb.',
        icon: Article,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'func-auth',
        name: isEn ? 'Custom Web App & Client Portal' : 'Custom Web-App & Kundenportal',
        desc: isEn
          ? 'Secure client portal with authentication (Supabase/Auth), custom user dashboards, and role-based permissions.'
          : 'Geschütztes Kundenportal mit Login-Bereich, individuellem Dashboard, Rollenrechten und Datenbank-Anbindung.',
        icon: UserPlus,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'seo-tech',
        name: isEn ? 'Technical SEO & Schema Sprint' : 'Technisches SEO & Schema.org Sprint',
        desc: isEn
          ? 'Knowledge-Graph integration, rich snippets markup, and full Google search console indexing.'
          : 'Vollständige Knowledge-Graph-Strukturierung, Rich Snippets und strukturierte Google-Daten für maximale Auffindbarkeit.',
        icon: MagnifyingGlass,
        recommended: true,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'design-ui',
        name: isEn
          ? 'Custom UI/UX Design System (Figma)'
          : 'Individuelles UI/UX Design System (Figma)',
        desc: isEn
          ? 'Bespoke component system, custom typography tokens, and responsive mockups in Figma.'
          : 'Maßgeschneiderte Design-Tokens, Typografie-System und interaktive Komponenten-Bibliothek in Figma.',
        icon: Palette,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'tech-i18n',
        name: isEn ? 'Multi-Language Architecture (i18n)' : 'Mehrsprachigkeit (next-intl i18n)',
        desc: isEn
          ? 'Clean multi-language structure (German + English) with SEO-friendly localized routing.'
          : 'Zweisprachige Architektur (Deutsch + Englisch) mit sauberer lokalisierter URL-Struktur und hreflang-Tags.',
        icon: Globe,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'tech-pwa',
        name: isEn ? 'Mobile App & PWA Experience' : 'Mobile App & Progressive Web App (PWA)',
        desc: isEn
          ? 'Installable app experience with offline capabilities, push notifications, and native app feeling.'
          : 'Installierbare Web-Applikation auf Smartphone-Homescreens mit Offline-Modus und nativem App-Gefühl.',
        icon: Lightning,
        typeLabel: isEn ? 'Optional Add-on' : 'Optional zubuchbar',
      },
      {
        id: 'support-basic',
        name: isEn
          ? 'Hosting & Security Care (Voluntary)'
          : 'Hosting- & Sicherheitsbetreuung (Freiwillig)',
        desc: isEn
          ? 'Voluntary care: High-speed edge hosting, framework updates, SSL certificates, and daily backups. (Next.js requires no mandatory maintenance).'
          : 'Freiwillige Betreuung: High-Speed Edge-Hosting, Sicherheits-Updates, SSL und Backups. (Next.js benötigt keine Pflichtwartung).',
        icon: CloudCheck,
        typeLabel: isEn ? 'Voluntary Add-on' : 'Freiwillig zubuchbar',
      },
      {
        id: 'support-pro',
        name: isEn
          ? '24/7 SLA Priority Support (Voluntary)'
          : '24/7 SLA Priority Entwickler-Support (Freiwillig)',
        desc: isEn
          ? 'Voluntary priority support: Direct developer line, guaranteed response times, and ongoing feature evolution.'
          : 'Freiwilliger Priority-Support: Direkter Draht zum Lead-Entwickler, garantierte Reaktionszeiten und laufende Weiterentwicklung.',
        icon: Headset,
        typeLabel: isEn ? 'Voluntary Add-on' : 'Freiwillig zubuchbar',
      },
    ],
    [isEn]
  );

  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.id === selectedPkgId) || packages[1];
  }, [packages, selectedPkgId]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) => {
      const updated = prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId];
      setPackageAndAddons(selectedPkgId, updated);
      return updated;
    });
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedPkgId(packageId);
    setPackageAndAddons(packageId, selectedAddonIds);
    const addonsElement = document.getElementById('addons');
    if (addonsElement) {
      addonsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRequestPackage = (packageIdToUse?: string) => {
    const pkgId = packageIdToUse || selectedPkgId;
    setPackageAndAddons(pkgId, selectedAddonIds);
    setStep('contact');

    const addonsParam = selectedAddonIds.length > 0 ? `&addons=${selectedAddonIds.join(',')}` : '';
    router.push(`/contact?package=${pkgId}${addonsParam}`);
  };

  return (
    <div>
      {/* 4 Main Flexible Service Packages */}
      <section className="py-16 px-4 w-full relative" id="packages-selection">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {isEn ? 'MODULAR SERVICE TIERS (4 PACKAGES)' : '4 MODULARE LEISTUNGSPAKETE'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {isEn ? 'Choose Your Target Scope' : 'Wählen Sie Ihren gewünschten Projektumfang'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Select your core package (from compact to enterprise platform) and enhance it with modular add-ons below. Tailored fixed-price proposal on request.'
                : 'Wählen Sie Ihr Basispaket (von klein bis zur riesigen Enterprise-Plattform) und ergänzen Sie es flexibel mit praxiserprobten Zusatzmodulen. Verbindliches Festpreisangebot auf Anfrage.'}
            </p>
          </div>

          {/* Top 3 Core Packages: Klein, Mittel, Groß */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-8">
            {packages.slice(0, 3).map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-2xl shadow-amber-500/15 ring-2 ring-amber-500 lg:-translate-y-2'
                      : pkg.popular
                        ? 'bg-white border-amber-300/80 shadow-md hover:border-amber-400 hover:shadow-lg'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                        <Sparkle className="w-3.5 h-3.5 text-white" />
                        <span>{pkg.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Selected Indicator Pill */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
                        <Check weight="bold" className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isEn ? 'Selected' : 'Ausgewählt'}</span>
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="text-center mb-8 pt-2">
                      <p className="font-display font-bold text-2xl text-slate-900 mb-2">
                        {pkg.name}
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm min-h-[36px]">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="text-center mb-8 pb-8 border-b border-slate-100">
                      <div className="font-display font-black text-4xl text-primary-700 tracking-tight mb-2">
                        {pkg.priceTag}
                      </div>
                      <div className="text-xs text-slate-500 mb-3">{pkg.subPrice}</div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>
                          {isEn
                            ? `Delivery: ~${pkg.deliveryDays} Business Days`
                            : `Lieferzeit: ~${pkg.deliveryDays} Werktage`}
                        </span>
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
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPackage(pkg.id);
                      }}
                      className={`group active:scale-[0.98] w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                        isSelected
                          ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20'
                          : pkg.popular
                            ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-md'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex-1 text-center">
                        {isSelected
                          ? isEn
                            ? 'Selected (Customize Below ↓)'
                            : 'Paket gewählt (Add-ons anpassen ↓)'
                          : isEn
                            ? 'Select Package & Add-ons ➔'
                            : 'Dieses Paket wählen & anpassen ➔'}
                      </span>
                      <ArrowRight
                        weight="bold"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4th Tier: Enterprise Platform (Horizontal Banner Card) */}
          {packages[3] &&
            (() => {
              const pkg = packages[3];
              const isSelected = selectedPkgId === pkg.id;

              return (
                <div
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`relative rounded-3xl p-8 sm:p-10 lg:p-12 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white border-amber-500 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-500'
                      : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white border-slate-700/80 hover:border-amber-500/50 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {/* Badge top */}
                  <div className="absolute -top-3.5 left-8 z-20 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      <Sparkle className="w-3.5 h-3.5 text-white" />
                      <span>
                        {pkg.badge || (isEn ? 'Enterprise Platform' : 'Großkunden & Plattformen')}
                      </span>
                    </span>
                  </div>

                  {/* Selected Indicator Pill */}
                  {isSelected && (
                    <div className="absolute top-6 right-6 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-xs">
                        <Check weight="bold" className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isEn ? 'Selected' : 'Ausgewählt'}</span>
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Scope, Title, Price, CTA */}
                    <div className="lg:col-span-5 space-y-6">
                      <div>
                        <div className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
                          {isEn
                            ? 'Tier 4 • Enterprise Platform'
                            : 'Paket 4 • Enterprise Platform (Extrem groß)'}
                        </div>
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                          {pkg.name}
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-baseline gap-4">
                        <div>
                          <div className="font-display font-black text-3xl sm:text-4xl text-amber-400">
                            {pkg.priceTag}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{pkg.subPrice}</p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3.5 py-2 rounded-full border border-slate-700">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span>
                            {isEn
                              ? `Delivery: ~${pkg.deliveryDays} Business Days`
                              : `Lieferzeit: ~${pkg.deliveryDays} Werktage`}
                          </span>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPackage(pkg.id);
                          }}
                          className={`w-full sm:w-auto py-4 px-8 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/25'
                              : 'bg-primary-700 text-white hover:bg-primary-800 shadow-primary-700/20'
                          }`}
                        >
                          <span>
                            {isSelected
                              ? isEn
                                ? 'Selected (Customize Below ↓)'
                                : 'Paket gewählt (Add-ons anpassen ↓)'
                              : isEn
                                ? 'Select Enterprise Package ➔'
                                : 'Enterprise Paket wählen & anpassen ➔'}
                          </span>
                          <ArrowRight weight="bold" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: 2-Column Features Grid + Add-ons Notice */}
                    <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl p-6 sm:p-8 border border-slate-700/60 backdrop-blur-sm">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                        {isEn
                          ? 'Enterprise Platform Scope & Inclusions'
                          : 'Enterprise Leistungsumfang & Inklusivleistungen'}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-200 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle
                              weight="fill"
                              className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
                            />
                            <span className="text-xs sm:text-sm leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 flex items-center gap-3">
                        <Sparkle className="w-5 h-5 text-amber-400 shrink-0" weight="fill" />
                        <span>
                          {isEn
                            ? 'E-Commerce Online Shops and Custom Web Apps are modular add-ons that can be freely combined below.'
                            : 'E-Commerce Online-Shops und Custom Web-Apps sind modulare Add-ons, die Sie unten flexibel dazubuchen können.'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>
      </section>

      {/* Interactive Add-ons & Zusatzmodule Selector */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-200 w-full" id="addons">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {isEn ? 'FLEXIBLE EXPANSIONS' : 'FLEXIBLE ZUSATZMODULE'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {isEn ? 'Select Optional Add-ons' : 'Optionale Add-ons & Zusatzmodule auswählen'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Combine your base website with modular high-impact add-ons. Click to add or remove any module.'
                : 'Kombinieren Sie Ihr Basispaket nach Bedarf mit individuellen Leistungsmodulen. Klicken Sie auf ein Modul, um es zur Konfiguration hinzuzufügen.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {availableAddons.map((addon) => {
              const isChecked = selectedAddonIds.includes(addon.id);
              const IconComp = addon.icon;

              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isChecked
                      ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/30'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {addon.recommended && (
                    <div className="absolute -top-2.5 right-4">
                      <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {isEn ? 'Recommended' : 'Empfohlen'}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      {/* Checkbox Icon */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked ? (
                          <Check weight="bold" className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <PlusCircle className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    <p className="font-display font-bold text-base text-slate-900 mb-2">
                      {addon.name}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed mb-6">{addon.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{addon.typeLabel}</span>
                    <span
                      className={`font-display font-bold text-xs px-2.5 py-1 rounded-md transition-colors ${
                        isChecked ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isChecked
                        ? isEn
                          ? 'Selected'
                          : 'Ausgewählt'
                        : isEn
                          ? '+ Add'
                          : '+ Hinzufügen'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Configuration Summary Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold uppercase tracking-wider">
                  <Sparkle className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Your Project Configuration' : 'Ihre Projekt-Konfiguration'}</span>
                </div>
                <p className="text-2xl font-display font-bold text-white">
                  {selectedPackage.name}{' '}
                  <span className="text-amber-400 font-normal text-lg">
                    ({selectedAddonIds.length}{' '}
                    {selectedAddonIds.length === 1
                      ? isEn
                        ? 'Add-on selected'
                        : 'Zusatzmodul'
                      : isEn
                        ? 'Add-ons selected'
                        : 'Zusatzmodule'}
                    )
                  </span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isEn
                    ? 'Tailored scope based on your modular selection. Binding fixed-price proposal provided after a free consultation.'
                    : 'Transparente Bedarfsanalyse auf Basis Ihrer Modulauswahl. Das verbindliche Festpreisangebot erhalten Sie nach einer kostenlosen Erstberatung.'}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-end gap-4">
                <div className="text-center sm:text-right lg:text-center xl:text-right">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {isEn ? 'Project Calculation' : 'Projekt-Kalkulation'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-amber-400">
                    {isEn ? 'Quote on Request' : 'Angebot auf Anfrage'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {isEn ? 'Binding fixed price' : 'Verbindlicher Festpreis'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestPackage()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition-all duration-200 shadow-lg hover:scale-[1.02] text-sm uppercase tracking-wider"
                >
                  <span>
                    {isEn ? 'Inquire in Contact Form' : 'Konfiguration unverbindlich anfragen'}
                  </span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
