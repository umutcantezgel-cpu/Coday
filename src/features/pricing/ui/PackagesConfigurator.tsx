'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Article,
  Check,
  CheckCircle,
  Clock,
  CloudCheck,
  Globe,
  Headset,
  Lightning,
  MagnifyingGlass,
  MinusCircle,
  Palette,
  Phone,
  PlusCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkle,
  UserPlus,
} from '@phosphor-icons/react/dist/ssr';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { CONFIGURATOR_ADDON_IDS, getModule } from '@/shared/data/modules';
import {
  PACKAGES,
  PACKAGE_LIST,
  PACKAGE_COUNT,
  normalizePackageId,
  type PackageId,
  type PackageMeta,
  type Locale,
} from '@/shared/data/packages';
import { trackEvent } from '@/shared/lib/analytics/tracking';
import type { AddonCopy, PackageCopy } from '../model/types';
import { FeatureHint } from './FeatureHint';
import { PackageFinder } from './PackageFinder';
import { PackageStickyBar } from './PackageStickyBar';

const ADDON_ICONS: Record<string, React.ElementType> = {
  'func-cms': Article,
  'commerce-headless': ShoppingBag,
  'func-auth': UserPlus,
  'seo-tech': MagnifyingGlass,
  'design-ui': Palette,
  'tech-i18n': Globe,
  'tech-pwa': Lightning,
  'support-basic': CloudCheck,
  'support-pro': Headset,
};

const PHONE_DISPLAY = '+49 176 41195301';
const PHONE_HREF = 'tel:+4917641195301';
const DEFAULT_ADDONS = ['seo-tech'];

export const PackagesConfigurator: React.FC = () => {
  const t = useTranslations('pricing');
  const locale = useLocale() as Locale;
  const router = useRouter();

  const storePackageId = useCalculatorStore((state) => state.selectedPackageId);
  const storeModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const setPackageAndAddons = useCalculatorStore((state) => state.setPackageAndAddons);
  const setStep = useCalculatorStore((state) => state.setStep);

  const [selectedPkgId, setSelectedPkgId] = useState<PackageId>(
    () => normalizePackageId(storePackageId) ?? 'business'
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(() => {
    const addons: string[] = [];
    storeModuleIds.forEach((id) => {
      const mod = getModule(id);
      if (mod && mod.category !== 'basis') addons.push(id);
    });
    return addons.length > 0 ? addons : DEFAULT_ADDONS;
  });

  const selectedPackage = PACKAGES[selectedPkgId];

  const copyFor = (id: PackageId) => t.raw(`packages.${id}`) as PackageCopy;
  const packageNames = useMemo(
    () =>
      Object.fromEntries(PACKAGE_LIST.map((p) => [p.id, copyFor(p.id).name])) as Record<
        PackageId,
        string
      >,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  const addons = useMemo(
    () =>
      CONFIGURATOR_ADDON_IDS.map((id) => ({
        id,
        module: getModule(id),
        copy: t.raw(`addons.items.${id}`) as AddonCopy,
        icon: ADDON_ICONS[id] ?? PlusCircle,
      })).filter((a) => a.module),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  const activeAddonIds = selectedAddonIds.filter(
    (id) => !selectedPackage.includedAddonIds.includes(id)
  );

  const handleSelectPackage = (packageId: PackageId, scroll = true) => {
    const nextAddons = selectedAddonIds.filter(
      (id) => !PACKAGES[packageId].includedAddonIds.includes(id)
    );
    setSelectedPkgId(packageId);
    setSelectedAddonIds(nextAddons);
    setPackageAndAddons(packageId, nextAddons);
    trackEvent('package_select', { package_id: packageId });
    if (scroll) {
      document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) => {
      const selected = !prev.includes(addonId);
      const updated = selected ? [...prev, addonId] : prev.filter((id) => id !== addonId);
      setPackageAndAddons(selectedPkgId, updated);
      trackEvent('addon_toggle', { addon_id: addonId, selected, package_id: selectedPkgId });
      return updated;
    });
  };

  const handleRequestPackage = (position: 'summary' | 'sticky') => {
    setPackageAndAddons(selectedPkgId, activeAddonIds);
    setStep('contact');
    trackEvent('package_inquiry_click', {
      package_id: selectedPkgId,
      addon_count: activeAddonIds.length,
      cta_position: position,
    });
    const addonsParam = activeAddonIds.length > 0 ? `&addons=${activeAddonIds.join(',')}` : '';
    router.push(`/contact?package=${selectedPkgId}${addonsParam}`);
  };

  const addonsLabel =
    activeAddonIds.length === 0
      ? t('summary.addons_none')
      : activeAddonIds.length === 1
        ? t('summary.addons_one')
        : t('summary.addons_many', { count: activeAddonIds.length });

  const renderFeatureList = (copy: PackageCopy, tone: 'light' | 'dark') => (
    <ul className={`space-y-3 text-sm ${tone === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
      {copy.features.map((feature) => (
        <li key={feature.label} className="flex items-start gap-2.5">
          <CheckCircle
            weight="fill"
            className={`w-5 h-5 shrink-0 mt-0.5 ${tone === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}
          />
          <FeatureHint
            label={feature.label}
            hint={feature.hint}
            triggerLabel={t('card.hint_label')}
            tone={tone}
          />
        </li>
      ))}
      {copy.not_included.map((item) => (
        <li
          key={item.addon_id}
          className={`flex items-start gap-2.5 ${tone === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
        >
          <MinusCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>
            {item.label}
            <span className="block text-[11px] uppercase tracking-wider font-semibold">
              {t('card.not_included')}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  const renderPackageCard = (pkg: PackageMeta) => {
    const copy = copyFor(pkg.id);
    const isSelected = selectedPkgId === pkg.id;

    return (
      <div
        key={pkg.id}
        onClick={() => handleSelectPackage(pkg.id)}
        className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between border cursor-pointer transition-all duration-300 ${
          isSelected
            ? 'bg-white border-amber-500 shadow-2xl shadow-amber-500/15 ring-2 ring-amber-500 lg:-translate-y-2'
            : pkg.popular
              ? 'bg-white border-amber-300/80 shadow-md hover:border-amber-400 hover:shadow-lg'
              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
        }`}
      >
        {copy.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              <Sparkle className="w-3.5 h-3.5" />
              <span>{copy.badge}</span>
            </span>
          </div>
        )}

        {isSelected && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
              <Check weight="bold" className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('card.selected')}</span>
            </span>
          </div>
        )}

        <div>
          <div className="mb-6 pt-2">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              {t('tier_label', { tier: pkg.tier, total: PACKAGE_COUNT })}
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-900 mt-1 mb-1">
              {copy.name}
            </h3>
            <p className="text-slate-600 text-sm">{copy.subtitle}</p>
          </div>

          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm space-y-2">
            <p>
              <span className="font-semibold text-slate-900">{t('card.for_who')}: </span>
              <span className="text-slate-700">{copy.for_who}</span>
            </p>
            <p className="text-slate-500 text-xs">
              <span className="font-semibold">{t('card.example')}: </span>
              {copy.example}
            </p>
          </div>

          <div className="text-center mb-6 pb-6 border-b border-slate-100">
            <div className="font-display font-black text-xl sm:text-2xl text-primary-700 tracking-tight mb-1">
              {t('price.tag')}
            </div>
            <div className="text-xs text-slate-500 mb-3">{t('price.sub')}</div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <Clock className="w-4 h-4 text-amber-600" />
                {t('delivery', { days: pkg.deliveryDays })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t('price.payment')}
              </span>
            </div>
          </div>

          <div className="mb-8">{renderFeatureList(copy, 'light')}</div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectPackage(pkg.id);
            }}
            className={`group active:scale-[0.98] w-full py-4 px-5 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              isSelected
                ? 'bg-amber-700 text-white hover:bg-amber-800 shadow-lg shadow-amber-700/20'
                : pkg.popular
                  ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-md'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span className="flex-1 text-center">
              {isSelected ? `${t('card.selected')} · ${t('card.selected_hint')}` : copy.cta}
            </span>
            <ArrowRight
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    );
  };

  const renderEnterpriseCard = (pkg: PackageMeta) => {
    const copy = copyFor(pkg.id);
    const isSelected = selectedPkgId === pkg.id;

    return (
      <div
        onClick={() => handleSelectPackage(pkg.id)}
        className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 border cursor-pointer transition-all duration-300 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white ${
          isSelected
            ? 'border-amber-500 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-500'
            : 'border-slate-700/80 hover:border-amber-500/50 shadow-xl hover:shadow-2xl'
        }`}
      >
        {copy.badge && (
          <div className="absolute -top-3.5 left-6 sm:left-8 z-20 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              <Sparkle className="w-3.5 h-3.5" />
              <span>{copy.badge}</span>
            </span>
          </div>
        )}

        {isSelected && (
          <div className="absolute top-5 right-5 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Check weight="bold" className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('card.selected')}</span>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
                {t('tier_label', { tier: pkg.tier, total: PACKAGE_COUNT })}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                {copy.name}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{copy.subtitle}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm space-y-2">
              <p>
                <span className="font-semibold text-white">{t('card.for_who')}: </span>
                <span className="text-slate-300">{copy.for_who}</span>
              </p>
              <p className="text-slate-400 text-xs">
                <span className="font-semibold">{t('card.example')}: </span>
                {copy.example}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/80 space-y-3">
              <div>
                <div className="font-display font-black text-xl sm:text-2xl text-amber-400">
                  {t('price.tag')}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{t('price.sub')}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {t('delivery', { days: pkg.deliveryDays })}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {t('price.payment')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPackage(pkg.id);
              }}
              className={`w-full sm:w-auto py-4 px-8 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-lg focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/25'
                  : 'bg-primary-700 text-white hover:bg-primary-800 shadow-primary-700/20'
              }`}
            >
              <span>
                {isSelected ? `${t('card.selected')} · ${t('card.selected_hint')}` : copy.cta}
              </span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl p-5 sm:p-8 border border-slate-700/60">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
              {t('card.included')}
            </h4>
            {renderFeatureList(copy, 'dark')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Package selection */}
      <section className="py-16 px-4 w-full relative" id="packages-selection">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {t('packages_section.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {t('packages_section.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('packages_section.subtitle')}
            </p>
          </div>

          <PackageFinder
            packageNames={packageNames}
            onSelect={(id) => handleSelectPackage(id, false)}
          />

          <div
            id="package-cards"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-8 pt-4"
          >
            {PACKAGE_LIST.slice(0, 3).map(renderPackageCard)}
          </div>

          <div className="pt-4">{renderEnterpriseCard(PACKAGES.enterprise)}</div>
        </div>
      </section>

      {/* Extras */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-200 w-full" id="addons">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {t('addons.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {t('addons.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('addons.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {addons.map(({ id, copy, icon: IconComp }) => {
              const isIncluded = selectedPackage.includedAddonIds.includes(id);
              const isChecked = !isIncluded && selectedAddonIds.includes(id);
              const isRecommended = !isIncluded && selectedPackage.recommendedAddonIds.includes(id);

              return (
                <button
                  key={id}
                  type="button"
                  role="checkbox"
                  aria-checked={isIncluded || isChecked}
                  aria-disabled={isIncluded}
                  disabled={isIncluded}
                  onClick={() => toggleAddon(id)}
                  className={`relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isIncluded
                      ? 'bg-emerald-50/70 border-emerald-200 cursor-default'
                      : isChecked
                        ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/30'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-2.5 right-4 bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {t('addons.recommended')}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                          isIncluded
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : isChecked
                              ? 'bg-amber-700 text-white border-amber-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isIncluded
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : isChecked
                              ? 'bg-amber-700 border-amber-700 text-white'
                              : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isIncluded || isChecked ? (
                          <Check weight="bold" className="w-3.5 h-3.5" />
                        ) : (
                          <PlusCircle className="w-4 h-4 text-slate-400" />
                        )}
                      </span>
                    </div>

                    <p className="font-display font-bold text-base text-slate-900 mb-1.5">
                      {copy.name}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{copy.benefit}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mb-5">
                      <span className="font-semibold">{t('addons.for_who_label')}: </span>
                      {copy.for_who}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      {copy.type === 'care' ? t('addons.type_care') : t('addons.type_optional')}
                    </span>
                    <span
                      className={`font-display font-bold text-xs px-2.5 py-1 rounded-md whitespace-nowrap ${
                        isIncluded
                          ? 'bg-emerald-100 text-emerald-800'
                          : isChecked
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isIncluded
                        ? t('addons.included')
                        : isChecked
                          ? t('addons.selected')
                          : `+ ${t('addons.add')}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selection summary */}
          <div
            id="configuration-summary"
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold uppercase tracking-wider">
                  <Sparkle className="w-3.5 h-3.5" />
                  {t('summary.label')}
                </span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {packageNames[selectedPkgId]}{' '}
                  <span className="text-amber-400 font-normal text-lg">· {addonsLabel}</span>
                </p>
                {activeAddonIds.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {activeAddonIds.map((id) => {
                      const addon = addons.find((a) => a.id === id);
                      return addon ? (
                        <li
                          key={id}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-slate-200"
                        >
                          {addon.copy.name}
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
                <p className="text-slate-300 text-sm">{t('summary.no_risk')}</p>
              </div>

              <div className="lg:col-span-6 flex flex-col gap-5">
                <div>
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                    {t('summary.next_title')}
                  </p>
                  <ol className="space-y-2.5">
                    {(t.raw('summary.next_steps') as string[]).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleRequestPackage('summary')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition-all duration-200 shadow-lg hover:scale-[1.02] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <span>{t('summary.cta')}</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </button>
                  <a
                    href={PHONE_HREF}
                    onClick={() => trackEvent('phone_click', { cta_position: 'pricing_summary' })}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-slate-200 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>
                      {t('summary.phone_cta')} <strong>{PHONE_DISPLAY}</strong>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PackageStickyBar
        packageName={packageNames[selectedPkgId]}
        addonCount={activeAddonIds.length}
        startAfterId="package-cards"
        hideWhileVisibleId="configuration-summary"
        onRequest={() => handleRequestPackage('sticky')}
      />
    </div>
  );
};
