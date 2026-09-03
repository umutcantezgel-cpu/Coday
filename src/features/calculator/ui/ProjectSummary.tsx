'use client';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/Icon';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { modules } from '@/shared/data/modules';
import type { Locale } from '@/shared/data/packages';

export const ProjectSummary: React.FC = () => {
  const t = useTranslations('calculator');
  const locale = useLocale() as Locale;
  const selectedModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const getPackageName = useCalculatorStore((state) => state.getPackageName);

  const selectedModules = modules.filter((m) => selectedModuleIds.has(m.id));

  if (selectedModules.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-flat mb-8">
      <p className="font-bold text-gray-900 mb-4 flex items-center">
        <Icon name="inventory_2" className="mr-2 text-primary" />
        {t('summary.title')}
      </p>

      {selectedPackageId && (
        <div className="mb-4 pb-4 border-b border-gray-50">
          <span className="text-xs text-gray-400 uppercase font-bold">{t('summary.package')}</span>
          <div className="font-display font-bold text-lg text-primary">
            {getPackageName(locale) || selectedPackageId}
          </div>
        </div>
      )}

      <div className="space-y-2 mb-6 max-h-40 overflow-y-auto custom-scrollbar pr-2">
        {selectedModules.map((m) => (
          <div
            key={m.id}
            className="flex justify-between items-center text-sm py-1 border-b border-slate-50"
          >
            <span className="text-gray-600">{m.plainName[locale]}</span>
            <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
              {m.category === 'basis' ? t('summary.package_label') : t('summary.addon_label')}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
            {t('summary.price_title')}
          </span>
          <span className="font-bold text-gray-900 text-sm sm:text-base">
            {t('summary.price_tag')}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">{t('summary.price_text')}</p>
      </div>
    </div>
  );
};
