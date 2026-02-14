import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/shared/utils/formatters';

type Lead = {
  name: string;
  budget: number;
  timeline: string;
  status: 'qualified' | 'disqualified';
};

const LeadQualificationSimulator: React.FC = () => {
  const { t, i18n } = useTranslation('industries');
  // Interactive demo where you set filters and see "trash" leads disappear
  const [minBudget, setMinBudget] = useState(2000);

  // Mock Data
  const leads: Lead[] = [
    { name: 'StartUp A', budget: 500, timeline: 'ASAP', status: 'disqualified' },
    { name: 'Konzern B', budget: 15000, timeline: 'Q4', status: 'qualified' },
    { name: 'Agentur C', budget: 5000, timeline: 'Next Month', status: 'qualified' },
    { name: 'Privat D', budget: 200, timeline: 'Now', status: 'disqualified' },
    { name: 'GmbH E', budget: 8000, timeline: '2 Weeks', status: 'qualified' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <h3 className="font-display font-bold text-2xl text-secondary mb-6">
        {t('unternehmensberatung.features.lead_simulator.title')}
      </h3>
      <p className="text-slate-500 mb-8">
        {t('unternehmensberatung.features.lead_simulator.description')}
      </p>

      {/* Filter Control */}
      <div className="mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="flex justify-between font-bold text-slate-700 mb-2">
          <label>{t('unternehmensberatung.features.lead_simulator.filter_label')}</label>
          <span className="text-primary">{formatCurrency(minBudget, 'EUR', i18n.language)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          step="500"
          value={minBudget}
          onChange={(e) => setMinBudget(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Lead Inbox Visualization */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase border-b pb-2">
          <span>{t('unternehmensberatung.features.lead_simulator.table_headers.inbox')}</span>
          <span>{t('unternehmensberatung.features.lead_simulator.table_headers.status')}</span>
        </div>

        {leads.map((lead, idx) => {
          const isQualified = lead.budget >= minBudget;
          return (
            <div
              key={idx}
              className={`flex justify-between items-center p-3 rounded-lg border transition-all ${isQualified ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100 opacity-50 grayscale'}`}
            >
              <div>
                <div className="font-bold text-slate-800">{lead.name}</div>
                <div className="text-xs text-slate-500">
                  {t('unternehmensberatung.features.lead_simulator.budget_label')}
                  {lead.budget}€
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${isQualified ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-500'}`}
              >
                {isQualified
                  ? t('unternehmensberatung.features.lead_simulator.status_labels.accept')
                  : t('unternehmensberatung.features.lead_simulator.status_labels.reject')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadQualificationSimulator;
