import React, { useMemo } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle, ArrowRight, Gauge } from '@phosphor-icons/react/dist/ssr';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { useTranslations, useLocale } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { modules } from '@/shared/data/modules';
import { formatCurrency } from '@/shared/utils/formatters';

export const CalculatorSummary: React.FC = () => {
  const t = useTranslations('calculator');
  const locale = useLocale();
  const selectedModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const getPackageName = useCalculatorStore((state) => state.getPackageName);

  const selectedModules = useMemo(() => {
    return modules.filter((m) => selectedModuleIds.has(m.id));
  }, [selectedModuleIds]);

  const totalOneTime = useMemo(() => {
    return selectedModules
      .filter((m) => m.priceType === 'one-time')
      .reduce((sum, m) => sum + m.priceInCents, 0);
  }, [selectedModules]);

  const totalMonthly = useMemo(() => {
    return selectedModules
      .filter((m) => m.priceType === 'monthly')
      .reduce((sum, m) => sum + m.priceInCents, 0);
  }, [selectedModules]);

  // Simple discount logic mockup
  const discount = totalOneTime > 500000 ? 5 : 0;
  const discountedOneTime = totalOneTime * (1 - discount / 100);

  const packageName = getPackageName();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 lg:p-8 sticky top-24">
      <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">{t('summary.title')}</h3>

      {/* Package Badge */}
      {packageName && (
        <div className="mb-4 p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-2">
          <OptimizedIcon icon={CheckCircle} className="text-primary" />
          <span className="text-sm font-bold text-gray-900">
            {t('summary.package')}:
          </span>
          <span className="text-sm font-bold text-primary">{packageName}</span>
        </div>
      )}

      {/* Selected List - Scrollable */}
      <div className="max-h-[40vh] overflow-y-auto pr-2 mb-6 space-y-3 custom-scrollbar">
        {selectedModules.length === 0 && (
          <p className="text-gray-400 text-sm">{t('summary.empty')}</p>
        )}
        {selectedModules.map((module) => (
          <div key={module.id} className="flex justify-between items-start text-sm">
            <span className="text-gray-700 font-medium">
              {t(`modules.${module.id}.name`)}
            </span>
            <span className="text-gray-900 font-bold whitespace-nowrap">
              {formatCurrency(module.priceInCents / 100, 'EUR', locale)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6 space-y-4 mb-8">
        {/* One Time */}
        <div className="flex justify-between items-end">
          <span className="text-gray-600">{t('summary.one_time')}</span>
          <div className="text-right">
            {discount > 0 && (
              <div className="text-xs text-green-500 font-bold mb-1">
                {discount}% {t('summary.discount')}
              </div>
            )}
            <div className="font-display font-black text-3xl text-gray-900 leading-none">
              {formatCurrency(discountedOneTime / 100, 'EUR', locale)}
            </div>
          </div>
        </div>

        {/* Monthly */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{t('summary.monthly')}</span>
          <span className="font-bold text-gray-900">
            {formatCurrency(totalMonthly / 100, 'EUR', locale)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <NavLink
          href="/contact"
          className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center transform hover:-translate-y-1 text-lg animate-pulse hover:animate-none"
        >
          {t('summary.continue')}
          <OptimizedIcon icon={ArrowRight} className="ml-2 text-lg" />
        </NavLink>
        <div className="text-center">
          <button className="text-xs text-gray-400 hover:text-gray-600 underline">
            {t('summary.share')}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <div className="flex items-center text-primary text-xs font-bold uppercase tracking-wider mb-1">
          <OptimizedIcon icon={Gauge} className="mr-1 text-sm" />
          {t('summary.guarantee.title')}
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {t('summary.guarantee.text')} <span className="font-bold text-gray-900">95+</span>.
        </p>
      </div>
    </div>
  );
};
