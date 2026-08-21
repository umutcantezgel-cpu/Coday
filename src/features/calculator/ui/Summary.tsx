import React, { useMemo } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  CheckCircle,
  ArrowRight,
  Gauge,
  ShieldCheck,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { useTranslations, useLocale } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { modules } from '@/shared/data/modules';

export const CalculatorSummary: React.FC = () => {
  const t = useTranslations('calculator');
  const locale = useLocale();
  const selectedModuleIds = useCalculatorStore((state) => state.selectedModuleIds);
  const getPackageName = useCalculatorStore((state) => state.getPackageName);

  const selectedModules = useMemo(() => {
    return modules.filter((m) => selectedModuleIds.has(m.id));
  }, [selectedModuleIds]);

  const packageName = getPackageName();

  return (
    <div
      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 lg:p-8 sticky top-24"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="font-display font-bold text-2xl text-gray-900 mb-4">{t('summary.title')}</p>

      {/* Package Badge */}
      {packageName && (
        <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-center gap-2">
          <OptimizedIcon icon={CheckCircle} className="text-amber-600" />
          <span className="text-sm font-bold text-gray-900">{t('summary.package')}:</span>
          <span className="text-sm font-bold text-amber-700">{packageName}</span>
        </div>
      )}

      {/* Selected List - Scrollable */}
      <div className="max-h-[35vh] overflow-y-auto pr-2 mb-6 space-y-3 custom-scrollbar">
        {selectedModules.length === 0 && (
          <p className="text-gray-400 text-sm">{t('summary.empty')}</p>
        )}
        {selectedModules.map((module) => (
          <div
            key={module.id}
            className="flex justify-between items-start text-sm py-1 border-b border-gray-50"
          >
            <span className="text-gray-700 font-medium">{t(`modules.${module.id}.name`)}</span>
            <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded whitespace-nowrap">
              Ausgewählt
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6 space-y-4 mb-6">
        <div className="p-4 rounded-2xl bg-slate-900 text-white">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkle className="w-4 h-4" />
            Maßgeschneidertes Festpreisangebot
          </div>
          <div className="font-display font-bold text-2xl text-white">Preise auf Anfrage</div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Maximale Kosteneffizienz durch direkte Inhaber-Realisierung. Verbindliches
            Festpreisangebot nach kostenloser Bedarfsanalyse.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <NavLink
          href="/contact"
          className="w-full py-4 bg-amber-400 text-slate-950 rounded-xl font-bold hover:bg-amber-300 transition motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-amber-500/25 flex items-center justify-center transform hover:-translate-y-0.5 text-lg focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span>Angebot unverbindlich anfragen</span>
          <OptimizedIcon icon={ArrowRight} className="ml-2 text-lg" />
        </NavLink>
      </div>

      <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <div className="flex items-center text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="mr-1 text-base text-emerald-600" />
          100/100 Qualitätsgarantie
        </div>
        <p className="text-xs text-emerald-900/80 leading-relaxed">
          Google Core Web Vitals 100/100, Sub-0,3s Ladezeit & 100% Quellcode-Eigentum ohne
          monatliche Bindung.
        </p>
      </div>
    </div>
  );
};
