import React from 'react';
import { useTranslation } from 'react-i18next';

const PerksGrid: React.FC = () => {
    const { t } = useTranslation('careers');
    const perks = [
        { icon: 'public', title: t('perks.items.0.title'), desc: t('perks.items.0.desc') },
        { icon: 'laptop_mac', title: t('perks.items.1.title'), desc: t('perks.items.1.desc') },
        { icon: 'school', title: t('perks.items.2.title'), desc: t('perks.items.2.desc') },
        { icon: 'flight_takeoff', title: t('perks.items.3.title'), desc: t('perks.items.3.desc') },
        { icon: 'fitness_center', title: t('perks.items.4.title'), desc: t('perks.items.4.desc') },
        { icon: 'savings', title: t('perks.items.5.title'), desc: t('perks.items.5.desc') }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((p, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary mb-6">
                        <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg text-secondary mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm">{p.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default PerksGrid;
