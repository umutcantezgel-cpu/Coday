import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiceFunnelVisualizer: React.FC = () => {
    const { t } = useTranslation('industries');

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
            <h3 className="font-display font-bold text-2xl text-secondary mb-6">{t('unternehmensberatung.features.service_funnel.title')}</h3>
            <p className="text-gray-500 mb-8">{t('unternehmensberatung.features.service_funnel.description')}</p>

            <div className="flex flex-col gap-2">
                {/* Funnel Steps */}
                <div className="bg-blue-50 p-4 rounded-xl w-full mx-auto text-center border border-blue-100 relative group hover:bg-blue-100 transition-colors">
                    <span className="font-bold text-blue-900">{t('unternehmensberatung.features.service_funnel.steps.traffic')}</span>
                    <div className="text-xs text-blue-400 mt-1">1.000 Visitors</div>
                </div>

                <div className="bg-blue-100 p-4 rounded-xl w-[80%] mx-auto text-center border border-blue-200 relative group hover:bg-blue-200 transition-colors text-white">
                    <span className="font-bold text-blue-900">{t('unternehmensberatung.features.service_funnel.steps.leads')}</span>
                    <div className="text-xs text-blue-500 mt-1">50 Leads</div>
                </div>

                <div className="bg-primary p-4 rounded-xl w-[60%] mx-auto text-center shadow-lg relative group hover:bg-primary/90 transition-colors text-white">
                    <span className="font-bold text-white">{t('unternehmensberatung.features.service_funnel.steps.clients')}</span>
                    <div className="text-xs text-white/80 mt-1">5 Clients</div>
                </div>
            </div>

            <div className="mt-8 text-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm font-bold text-secondary">
                    {t('unternehmensberatung.features.service_funnel.insight')}
                </p>
            </div>
        </div>
    );
};

export default ServiceFunnelVisualizer;
