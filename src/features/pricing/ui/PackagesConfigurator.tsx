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
        name: isEn ? 'Starter / Local Authority' : 'Starter / Local Authority',
        tagline: isEn
          ? 'Perfect for craftsmen & local service providers seeking online dominance.'
          : 'Perfekt für Handwerker & lokale Dienstleister für planbare Neukunden.',
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
        subPrice: isEn
          ? 'Bespoke fixed-price quote after consultation'
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
          isEn
            ? 'Sanity v3 Headless CMS (optional add-on)'
            : 'Sanity v3 Headless CMS (optional zubuchbar)',
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
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
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
        priceTag: isEn ? 'On Request' : 'Auf Anfrage',
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
        notIncluded: [
          isEn
            ? 'Sanity v3 Headless CMS (optional add-on)'
            : 'Sanity v3 Headless CMS (optional zubuchbar)',
        ],
      },
    ],
    [isEn]
  );

  // Available Add-ons with clear descriptions (Headless CMS optional zubuchbar, Wartung freiwillig)
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
        id: 'func-auth',
        name: isEn ? '60-Sec Express Recruiting Funnel' : '60-Sekunden Express-Recruiting Funnel',
        desc: isEn
          ? 'Smartphone-optimized application funnel to generate qualified job applications with ease.'
          : 'Mobile-optimierter Kurzbewerbungs-Funnel zur schnellen und gezielten Gewinnung von Fachkräften.',
        icon: UserPlus,
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
        id: 'seo-speed',
        name: isEn ? 'Performance Max (<0.3s Tuning)' : 'Performance Max & Sub-0,3s Tuning',
        desc: isEn
          ? 'Extreme Core Web Vitals optimization for instant 100/100 PageSpeed scores across devices.'
          : 'Extremes Core Web Vitals Feintuning für blitzschnelle Ladezeiten unter 0,3s und maximale Google PageSpeed Scores.',
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
