import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';

const LocalDominanceMap: React.FC = () => {
    const { t } = useTranslation('industries');

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
            <h3 className="font-display font-bold text-2xl text-secondary mb-6">{t('handwerk-bau.features.local_dominance.title')}</h3>
            <p className="text-gray-500 mb-8">{t('handwerk-bau.features.local_dominance.description')}</p>

            <div className="relative h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                {/* Central Location (Business) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Icon name="business" className="text-white" />
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full shadow-md mt-2 text-xs font-bold text-slate-800">
                        {t('handwerk-bau.features.local_dominance.labels.your_business')}
                    </div>
                </div>

                {/* Radius Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-primary/20 rounded-full"></div>

                {/* Local Rankings */}
                <div className="absolute top-1/3 start-1/4 bg-white p-2 rounded-lg shadow border border-green-100 flex items-center gap-2">
                    <span className="text-green-600 text-xs font-bold">#1</span>
                    <span className="text-[10px] text-slate-500">Sanitär</span>
                </div>
                <div className="absolute bottom-1/3 end-1/4 bg-white p-2 rounded-lg shadow border border-green-100 flex items-center gap-2">
                    <span className="text-green-600 text-xs font-bold">#1</span>
                    <span className="text-[10px] text-slate-500">Heizung</span>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm">
                <div>
                    <span className="block text-slate-400 text-xs">{t('handwerk-bau.features.local_dominance.stats.radius')}</span>
                    <span className="font-bold text-secondary">15 km</span>
                </div>
                <div>
                    <span className="block text-slate-400 text-xs">{t('handwerk-bau.features.local_dominance.stats.ranking')}</span>
                    <span className="font-bold text-green-600">Top 3</span>
                </div>
                <div>
                    <span className="block text-slate-400 text-xs">{t('handwerk-bau.features.local_dominance.stats.market_share')}</span>
                    <span className="font-bold text-primary">High</span>
                </div>
            </div>
        </div>
    );
};

export default LocalDominanceMap;
