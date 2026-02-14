import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/shared/utils/formatters';

const CraftsmanLeadCalculator: React.FC = () => {
  const { t, i18n } = useTranslation('industries');
  const [avgOrderValue, setAvgOrderValue] = useState(5000); // 5k for a small job?
  const [monthlyLeads, setMonthlyLeads] = useState(10);
  const [closeRate, setCloseRate] = useState(20);
  // Simple logic: Leads * Close Rate * Order Value
  const revenue = monthlyLeads * (closeRate / 100) * avgOrderValue;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-secondary p-6 text-white text-center">
        <h3 className="font-display font-bold text-xl">{t('handwerk-bau.features.calculator.title')}</h3>
        <p className="text-sm opacity-80">{t('handwerk-bau.features.calculator.subtitle')}</p>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
            <label htmlFor="avgOrderValue">{t('handwerk-bau.features.calculator.labels.order_value')}</label>
            <span>{formatCurrency(avgOrderValue / 100 * 100, 'EUR', i18n.language)}</span>
          </div>
          <input
            id="avgOrderValue"
            type="range"
            min="500"
            max="50000"
            step="500"
            value={avgOrderValue}
            onChange={(e) => setAvgOrderValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{t('handwerk-bau.features.calculator.labels.repair')}</span>
            <span>{t('handwerk-bau.features.calculator.labels.sanitation')}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
            <label htmlFor="monthlyLeads">{t('handwerk-bau.features.calculator.labels.leads')}</label>
            <span>{monthlyLeads} Leads</span>
          </div>
          <input
            id="monthlyLeads"
            type="range"
            min="1"
            max="50"
            step="1"
            value={monthlyLeads}
            onChange={(e) => setMonthlyLeads(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
            <label htmlFor="closeRate">{t('handwerk-bau.features.calculator.labels.close_rate')}</label>
            <span>{closeRate}%</span>
          </div>
          <input
            id="closeRate"
            type="range"
            min="5"
            max="80"
            step="5"
            value={closeRate}
            onChange={(e) => setCloseRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <p className="text-xs text-slate-500 mt-2">
            {t('handwerk-bau.features.calculator.disclaimer')}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
          <span className="text-green-600 font-bold uppercase tracking-wider text-xs block mb-1">
            {t('handwerk-bau.features.calculator.labels.revenue_month')}
          </span>
          <div className="text-4xl font-black text-green-700">{formatCurrency(revenue / 100 * 100, 'EUR', i18n.language)}</div>
        </div>
      </div>
    </div>
  );
};

export default CraftsmanLeadCalculator;
