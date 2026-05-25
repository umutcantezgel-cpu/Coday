
import React from 'react';
import { X, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

const AgencyComparisonTable: React.FC = () => {
  const t = useTranslations('home');

  const features = [
    {
      name: t('comparison.features.speed.name'),
      old: t('comparison.features.speed.old'),
      new: t('comparison.features.speed.new'),
    },
    {
      name: t('comparison.features.pricing.name'),
      old: t('comparison.features.pricing.old'),
      new: t('comparison.features.pricing.new'),
    },
    {
      name: t('comparison.features.tech.name'),
      old: t('comparison.features.tech.old'),
      new: t('comparison.features.tech.new'),
    },
    {
      name: t('comparison.features.rights.name'),
      old: t('comparison.features.rights.old'),
      new: t('comparison.features.rights.new'),
    },
    {
      name: t('comparison.features.contact.name'),
      old: t('comparison.features.contact.old'),
      new: t('comparison.features.contact.new'),
    },
  ];

  return (
    <section className="py-[var(--space-section)] bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight mb-6">
            {t('comparison.title_prefix')} <span className="text-primary">Coday</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">{t('comparison.subtitle')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th
                  scope="col"
                  className="py-6 px-4 text-sm font-bold text-slate-400 uppercase tracking-widest w-1/4"
                >
                  {t('comparison.columns.metric')}
                </th>
                <th scope="col" className="py-6 px-4 text-xl font-bold text-slate-300 w-1/3">
                  {t('comparison.columns.agency')}
                </th>
                <th scope="col" className="py-6 px-4 text-xl font-black text-white w-1/3">
                  <span className="inline-block py-1 px-3 rounded bg-primary/20 text-teal-400 text-sm align-middle mr-2">
                    Coday
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-800 hover:bg-white/5 transition-colors"
                >
                  <th
                    scope="row"
                    className="py-4 md:py-8 px-4 font-mono text-sm text-slate-400 uppercase text-left"
                  >
                    {feature.name}
                  </th>
                  <td className="py-4 md:py-8 px-4 text-slate-300 text-lg flex items-center">
                    <X size={24} className="text-slate-500 mr-3 flex-shrink-0" />
                    {feature.old}
                  </td>
                  <td className="py-4 md:py-8 px-4 text-white text-lg font-bold relative">
                    <div className="flex items-center">
                      <CheckCircle
                        size={24}
                        weight="fill"
                        className="text-primary mr-3 shadow-glow flex-shrink-0"
                      />
                      {feature.new}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AgencyComparisonTable;
