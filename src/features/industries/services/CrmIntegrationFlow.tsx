import React from 'react';
import { useTranslation } from 'react-i18next';

const CrmIntegrationFlow: React.FC = () => {
  const { t } = useTranslation('industries');
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h3 className="font-display font-bold text-2xl text-secondary">
          {t('unternehmensberatung.features.crm_flow.title')}
        </h3>
        <p className="text-slate-500">{t('unternehmensberatung.features.crm_flow.description')}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
        {/* Tech Logos (Text placeholders for now) */}
        {['HubSpot', 'Salesforce', 'Pipedrive', 'Zapier', 'Calendly', 'Slack'].map((tech, idx) => (
          <div key={idx} className="flex flex-col items-center group cursor-pointer">
            <div className="w-20 h-20 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-md group-hover:-translate-y-1 transition-all">
              <span className="font-bold text-slate-700 text-xs">{tech}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrmIntegrationFlow;
