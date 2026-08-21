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
import { formatCurrency } from '@/shared/utils/formatters';

interface PackageConfig {
  id: string;
  name: string;
  tagline: string;
  basePriceInCents: number;
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
    return addons.length > 0 ? addons : ['func-cms', 'seo-tech'];
  });

  const packages: PackageConfig[] = useMemo(
    () => [
      {
        id: 'starter',
        name: isEn ? 'Starter / Local Authority' : 'Starter / Local Authority',
        tagline: isEn
          ? 'Perfect for craftsmen & local service providers seeking online dominance.'
          : 'Perfekt für Handwerker & lokale Dienstleister für planbare Neukunden.',
        basePriceInCents: 149000,
        priceTag: isEn ? 'ab 1.490 €' : 'ab 1.490 €',
        subPrice: isEn
          ? 'Transparent fixed price after consultation'
          : 'Transparenter Festpreis nach Bedarfsanalyse',
        popular: false,
        deliveryDays: 14,
        features: [
          isEn
            ? 'Custom Next.js 15 Website (up to 5 pages)'
            : 'Maßgeschneiderte Next.js 15 Website (bis 5 Unterseiten)',
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
          isEn ? 'Headless CMS for self-editing' : 'Headless CMS Redaktionssystem',
          isEn ? '60-Second Mobile Recruiting Funnel' : '60-Sekunden Mobile-Recruiting Funnel',
          isEn ? 'Multi-Language Architecture (i18n)' : 'Mehrsprachigkeit & globale i18n',
        ],
      },
      {
        id: 'business',
        name: isEn ? 'Business Enterprise / B2B' : 'Business Enterprise / B2B',
        tagline: isEn
          ? 'The gold standard for mid-market leaders, B2B companies & industry.'
          : 'Der Maßstab für anspruchsvollen Mittelstand, Industrie & B2B.',
        basePriceInCents: 299000,
        priceTag: isEn ? 'ab 2.990 €' : 'ab 2.990 €',
        subPrice: isEn
          ? 'Most popular choice for growing businesses'
          : 'Beliebteste Wahl für anspruchsvolle Unternehmen',
        popular: true,
        badge: isEn ? 'Empfehlung für Mittelstand' : 'Empfehlung für Mittelstand',
        deliveryDays: 21,
        features: [
          isEn
            ? 'Bespoke Next.js 15 Enterprise Architecture (up to 12 pages)'
            : 'Maßgeschneiderte Next.js 15 B2B-Plattform (bis 12 Unterseiten)',
          isEn
            ? 'Sanity v3 Headless CMS (Manage content independently)'
            : 'Sanity v3 Headless CMS (Inhalte selbst verwalten)',
          isEn
            ? '60-Second Mobile Express-Recruiting Funnel'
            : '60-Sekunden Express-Mitarbeitergewinnung',
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
            ? 'Direct Line to Lead Architect Umutcan Emre Tezgel'
            : 'Direkter Draht zum Lead-Architekten Umutcan Emre Tezgel',
        ],
        notIncluded: [
          isEn ? 'Full E-Commerce Shop Checkout' : 'Vollständiger Online-Shop Checkout',
          isEn ? 'Custom CRM / ERP Deep-Sync' : 'Tiefgreifende ERP-/CRM-Schnittstellen',
        ],
      },
      {
        id: 'custom-app',
        name: isEn ? 'Custom App & E-Commerce' : 'Custom App & E-Commerce',
        tagline: isEn
          ? 'High-performance web apps, client portals & headless shops.'
          : 'Web-Applikationen, Kundenportale & Headless Online-Shops.',
        basePriceInCents: 599000,
        priceTag: isEn ? 'ab 5.990 €' : 'ab 5.990 €',
        subPrice: isEn ? 'Bespoke scope & integration' : 'Individueller Projektumfang nach Maß',
        popular: false,
        deliveryDays: 30,
        features: [
          isEn
            ? 'Full-Stack Next.js 15 & React 19 Web Application'
            : 'Full-Stack Next.js 15 & React 19 Web-Applikation',
          isEn
            ? 'Headless E-Commerce (Shopify / Stripe) or Client Portal'
            : 'Headless E-Commerce (Stripe/Shopify) oder B2B-Portal',
          isEn
            ? 'Deep API Integrations (ERP, Supabase Auth, CRM-Sync)'
            : 'API-Schnittstellen (ERP, Supabase Auth, CRM-Sync)',
          isEn
            ? 'Multi-Language Architecture (German + English)'
            : 'Lückenlose Mehrsprachigkeit (next-intl)',
          isEn
            ? 'Instant Search & Dynamic B2B Catalog Filters'
            : 'Instant-Suche & dynamische B2B-Katalogfilter',
          isEn
            ? 'Continuous Deployment & SLA Priority Support'
            : 'CI/CD Pipelines & bevorzugter Priority-Support',
        ],
        notIncluded: [],
      },
    ],
    [isEn]
  );

  // Available Add-ons with clear, honest descriptions and transparent pricing
  const availableAddons = useMemo(
    () => [
      {
        id: 'func-cms',
        name: isEn ? 'Sanity v3 Headless CMS' : 'Sanity v3 Headless CMS',
        desc: isEn
          ? 'Intuitive headless CMS to update text, media, and blog articles anytime without code.'
          : 'Modernes Headless CMS: Texte, Bilder und Blog-Inhalte jederzeit selbstständig und intuitiv pflegen.',
        priceInCents: 36900,
        priceType: 'one-time' as const,
        icon: Article,
        recommended: true,
      },
      {
        id: 'seo-tech',
        name: isEn ? 'Technical SEO & Schema Sprint' : 'Technisches SEO & Schema.org Sprint',
        desc: isEn
          ? 'Knowledge-Graph integration, rich snippets markup, and full Google search console indexing.'
          : 'Vollständige Knowledge-Graph-Strukturierung, Rich Snippets & strukturierte Google-Daten für maximale Auffindbarkeit.',
        priceInCents: 21900,
        priceType: 'one-time' as const,
        icon: MagnifyingGlass,
        recommended: true,
      },
      {
        id: 'func-auth',
        name: isEn ? '60-Sec Express Recruiting Funnel' : '60-Sekunden Express-Recruiting Funnel',
        desc: isEn
          ? 'Smartphone-optimized application funnel to generate qualified job applications with ease.'
          : 'Mobile-optimierter Kurzbewerbungs-Funnel zur schnellen und gezielten Gewinnung von Fachkräften.',
        priceInCents: 44900,
        priceType: 'one-time' as const,
        icon: UserPlus,
      },
      {
        id: 'design-ui',
        name: isEn
          ? 'Custom UI/UX Design System (Figma)'
          : 'Individuelles UI/UX Design System (Figma)',
        desc: isEn
          ? 'Bespoke component system, custom typography tokens, and responsive mockups in Figma.'
          : 'Maßgeschneiderte Design-Tokens, Typografie-System und interaktive Komponenten-Bibliothek in Figma.',
        priceInCents: 29900,
        priceType: 'one-time' as const,
        icon: Palette,
      },
      {
        id: 'tech-i18n',
        name: isEn ? 'Multi-Language Architecture (i18n)' : 'Mehrsprachigkeit (next-intl i18n)',
        desc: isEn
          ? 'Clean multi-language structure (German + English) with SEO-friendly localized routing.'
          : 'Zweisprachige Architektur (Deutsch + Englisch) mit sauberer lokalisierter URL-Struktur und hreflang-Tags.',
        priceInCents: 26900,
        priceType: 'one-time' as const,
        icon: Globe,
      },
      {
        id: 'seo-speed',
        name: isEn ? 'Performance Max (<0.3s Tuning)' : 'Performance Max & Sub-0,3s Tuning',
        desc: isEn
          ? 'Extreme Core Web Vitals optimization for instant 100/100 PageSpeed scores across devices.'
          : 'Extremes Core Web Vitals Feintuning für blitzschnelle Ladezeiten unter 0,3s und maximale Google PageSpeed Scores.',
        priceInCents: 26900,
        priceType: 'one-time' as const,
        icon: Lightning,
      },
      {
        id: 'support-basic',
        name: isEn ? 'Hosting & Maintenance Care' : 'Hosting-, Wartungs- & Sicherheits-Paket',
        desc: isEn
          ? 'High-speed edge hosting, regular framework updates, SSL certificates, and daily backups.'
          : 'High-Speed Edge-Hosting, Sicherheits-Updates, SSL-Verschlüsselung und tägliche automatisierte Backups.',
        priceInCents: 1900,
        priceType: 'monthly' as const,
        icon: CloudCheck,
      },
      {
        id: 'support-pro',
        name: isEn ? '24/7 SLA Priority Developer Support' : '24/7 SLA Priority Entwickler-Support',
        desc: isEn
          ? 'Direct developer line, guaranteed fast response times, emergency hotline, and continuous feature evolution.'
          : 'Direkter Draht zum Lead-Entwickler, garantierte Reaktionszeiten und laufende Weiterentwicklung.',
        priceInCents: 9900,
        priceType: 'monthly' as const,
        icon: Headset,
      },
    ],
    [isEn]
  );

  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.id === selectedPkgId) || packages[1];
  }, [packages, selectedPkgId]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  // Calculate totals
  const totalOneTime = useMemo(() => {
    let total = selectedPackage.basePriceInCents;
    selectedAddonIds.forEach((id) => {
      const addon = availableAddons.find((a) => a.id === id);
      if (addon && addon.priceType === 'one-time') {
        total += addon.priceInCents;
      }
    });
    return total;
  }, [selectedPackage, selectedAddonIds, availableAddons]);

  const totalMonthly = useMemo(() => {
    let total = 0;
    selectedAddonIds.forEach((id) => {
      const addon = availableAddons.find((a) => a.id === id);
      if (addon && addon.priceType === 'monthly') {
        total += addon.priceInCents;
      }
    });
    return total;
  }, [selectedAddonIds, availableAddons]);

  const handleRequestPackage = (packageIdToUse?: string) => {
    const pkgId = packageIdToUse || selectedPkgId;
    // Sync with Zustand store
    setPackageAndAddons(pkgId, selectedAddonIds);
    setStep('contact');

    // Build URL with query params
    const addonsParam = selectedAddonIds.length > 0 ? `&addons=${selectedAddonIds.join(',')}` : '';
    router.push(`/contact?package=${pkgId}${addonsParam}`);
  };

  return (
    <div>
      {/* 3 Main Flexible Service Packages */}
      <section className="py-16 px-4 w-full relative" id="packages-selection">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {isEn ? 'MODULAR SERVICE TIERS' : 'MODULARE LEISTUNGSPAKETE'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {isEn ? 'Choose Your Target Scope' : 'Wählen Sie Ihren gewünschten Projektumfang'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Select your base package and customize it with optional add-ons below. You receive a transparent, binding fixed price.'
                : 'Wählen Sie Ihr Basispaket aus und ergänzen Sie es flexibel mit praxiserprobten Zusatzmodulen. Sie erhalten ein transparentes, verbindliches Festpreisangebot.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-2xl shadow-amber-500/15 ring-2 ring-amber-500 lg:-translate-y-2'
                      : pkg.popular
                        ? 'bg-white border-amber-300/80 shadow-md hover:border-amber-400 hover:shadow-lg'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Badge: whitespace-nowrap guaranteed on single line */}
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
                      <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                        {pkg.name}
                      </h3>
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
                          <span className="line-through">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPkgId(pkg.id);
                        handleRequestPackage(pkg.id);
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
                            ? 'Request This Package ➔'
                            : 'Paket jetzt anfragen ➔'
                          : isEn
                            ? 'Select Package'
                            : 'Dieses Paket wählen'}
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

                    <h3 className="font-display font-bold text-base text-slate-900 mb-2">
                      {addon.name}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-6">{addon.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {addon.priceType === 'monthly'
                        ? isEn
                          ? 'Monthly'
                          : 'Monatlich'
                        : isEn
                          ? 'One-time'
                          : 'Einmalig'}
                    </span>
                    <span className="font-display font-bold text-sm text-slate-900">
                      +{formatCurrency(addon.priceInCents / 100, 'EUR', locale)}
                      {addon.priceType === 'monthly' && '/mo'}
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
                <h3 className="text-2xl font-display font-bold text-white">
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
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isEn
                    ? 'Transparent estimate based on your selection. Binding fixed-price proposal provided after a free consultation.'
                    : 'Transparenter Richtwert auf Basis Ihrer Modulauswahl. Das verbindliche Festpreisangebot erhalten Sie nach einer kostenlosen Erstberatung.'}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-end gap-4">
                <div className="text-center sm:text-right lg:text-center xl:text-right">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {isEn ? 'Estimated Investment' : 'Kalkulierter Richtwert'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-amber-400">
                    ab {formatCurrency(totalOneTime / 100, 'EUR', locale)}
                    {totalMonthly > 0 && (
                      <span className="text-sm font-normal text-slate-300 ml-1.5">
                        + {formatCurrency(totalMonthly / 100, 'EUR', locale)}/mo
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestPackage()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition-all duration-200 shadow-lg hover:scale-[1.02] text-sm uppercase tracking-wider"
                >
                  <span>{isEn ? 'Inquire in Contact Form' : 'Im Kontaktformular anfragen'}</span>
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
