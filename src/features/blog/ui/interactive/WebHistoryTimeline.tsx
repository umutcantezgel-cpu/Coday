"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Cpu, Stack, Lightning } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface Era {
    year: number;
    title: string;
    icon: React.ElementType;
    description: string;
    agencyModel: string;
    overhead: string;
}



export const WebHistoryTimeline: React.FC = () => {
    const t = useTranslations();
    const [selectedEra, setSelectedEra] = useState<number>(3); // Default to 2026

    const eras: Era[] = useMemo(() => [
        {
            year: 2000,
            title: t('blog:webHistory.eras.0.title'),
            icon: Monitor,
            description: t('blog:webHistory.eras.0.description'),
            agencyModel: t('blog:webHistory.eras.0.model'),
            overhead: t('blog:webHistory.eras.0.overhead')
        },
        {
            year: 2010,
            title: t('blog:webHistory.eras.1.title'),
            icon: Stack,
            description: t('blog:webHistory.eras.1.description'),
            agencyModel: t('blog:webHistory.eras.1.model'),
            overhead: t('blog:webHistory.eras.1.overhead')
        },
        {
            year: 2018,
            title: t('blog:webHistory.eras.2.title'),
            icon: Lightning,
            description: t('blog:webHistory.eras.2.description'),
            agencyModel: t('blog:webHistory.eras.2.model'),
            overhead: t('blog:webHistory.eras.2.overhead')
        },
        {
            year: 2026,
            title: t('blog:webHistory.eras.3.title'),
            icon: Cpu,
            description: t('blog:webHistory.eras.3.description'),
            agencyModel: t('blog:webHistory.eras.3.model'),
            overhead: t('blog:webHistory.eras.3.overhead')
        }
    ], [t]);

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl border border-slate-700 my-12">
            <h3 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center">
                {t('blog:webHistory.title')}
            </h3>

            {/* Timeline Line */}
            <div className="relative h-1 bg-slate-700 rounded-full mb-12 mx-4 md:mx-12">
                <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(selectedEra / (eras.length - 1)) * 100}%` }}
                />

                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
                    {eras.map((era, index) => (
                        <button
                            key={era.year}
                            onClick={() => setSelectedEra(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 relative group ${index <= selectedEra ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-600'
                                }`}
                        >
                            <span className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono transition-colors ${index === selectedEra ? 'text-blue-400 font-bold' : 'text-slate-500'
                                }`}>
                                {era.year}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Card */}
            <div className="relative min-h-[300px]">
                {eras.map((era, index) => (
                    index === selectedEra && (
                        <motion.div
                            key={era.year}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${index === 3 ? 'from-purple-500 to-pink-500' : 'from-slate-700 to-slate-600'
                                    } shadow-lg shrink-0`}>
                                    <era.icon size={32} className="text-white" />
                                </div>

                                <div>
                                    <h4 className="text-2xl font-bold mb-2">{era.title}</h4>
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        {era.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">{t('blog:webHistory.columns.model')}</span>
                                            <span className="font-semibold text-blue-300">{era.agencyModel}</span>
                                        </div>
                                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">{t('blog:webHistory.columns.overhead')}</span>
                                            <span className={`font-semibold ${index === 3 ? 'text-green-400' : 'text-red-400'
                                                }`}>{era.overhead}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                ))}
            </div>
        </div>
    );
};
