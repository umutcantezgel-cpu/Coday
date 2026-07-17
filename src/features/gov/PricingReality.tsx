import React from 'react';
import { useTranslations } from 'next-intl';
import { m } from 'motion/react';
import { XCircle, CheckCircle, Gavel } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

export const PricingReality: React.FC = () => {
  const t = useTranslations('public-sector');

  return (
    <section className="py-[var(--space-section)] bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rose-600 font-bold tracking-wider uppercase text-sm">
            {t('pricing_reality.title')}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-2 mb-4">
            {t('pricing_reality.headline')}
          </h2>
          <p className="text-slate-600 text-lg">{t('pricing_reality.description')}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-3 gap-4 mb-6 px-6">
            <div className="font-bold text-slate-400 uppercase tracking-widest text-xs">
              {t('pricing_reality.table.col_criteria')}
            </div>
            <div className="font-bold text-slate-400 uppercase tracking-widest text-xs">
              {t('pricing_reality.table.col_agencies')}
            </div>
            <div className="font-bold text-blue-600 uppercase tracking-widest text-xs">
              {t('pricing_reality.table.col_coday')}
            </div>
          </div>

          <div className="space-y-4">
            {/* Rows */}
            {[0, 1, 2, 3].map((idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]"
              >
                {/* Criteria */}
                <div className="p-6 flex items-center gap-3 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 font-bold text-slate-700">
                  {t(`pricing_reality.table.rows.${idx}.criteria`)}
                </div>

                {/* Agency (Bad) */}
                <div className="p-6 flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-100 text-slate-500 bg-red-50/10">
                  <OptimizedIcon icon={XCircle} className="w-5 h-5 text-red-300 flex-shrink-0" />
                  <span>{t(`pricing_reality.table.rows.${idx}.agency`)}</span>
                </div>

                {/* Coday (Good) */}
                <div className="p-6 flex items-center gap-3 text-slate-800 bg-blue-50/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-50/20 opacity-0 md:group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]" />
                  <OptimizedIcon
                    icon={CheckCircle}
                    className="w-5 h-5 text-emerald-500 flex-shrink-0"
                  />
                  <span className="font-medium">
                    {t(`pricing_reality.table.rows.${idx}.coday`)}
                  </span>
                </div>
              </m.div>
            ))}
          </div>

          {/* Disclaimer Box */}
          <div className="mt-12 p-8 bg-blue-900 rounded-2xl text-white flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-blue-900/10">
            <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center flex-shrink-0">
              <OptimizedIcon icon={Gavel} className="w-8 h-8 text-blue-300" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl font-bold mb-2">{t('pricing_reality.disclaimer_title')}</p>
              <p className="text-blue-200 max-w-2xl">{t('pricing_reality.disclaimer_text')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
