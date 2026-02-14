import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
    Info,
    FileText,
    IdentificationCard,
    ArrowsLeftRight,
    CheckCircle
} from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import GradientText from '../../shared/ui/GradientText';

export const OzgRoadmap: React.FC = () => {
    const { t } = useTranslation('public-sector');

    const steps = [
        { key: 'info', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
        { key: 'interaction', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { key: 'transaction', icon: IdentificationCard, color: 'text-purple-500', bg: 'bg-purple-50' },
        { key: 'transformation', icon: ArrowsLeftRight, color: 'text-emerald-500', bg: 'bg-emerald-50' }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-slate-500 font-mono text-sm uppercase tracking-widest">{t('ozg.title')}</span>
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-900 mt-4 mb-6">
                        {t('ozg.headline')}
                    </h2>
                    <p className="text-slate-600 text-lg">
                        {t('ozg.description')}
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

                    <div className="space-y-12 relative">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 text-center ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${step.bg} ${step.color} md:hidden`}>
                                        <OptimizedIcon icon={step.icon} className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {t(`ozg.steps.${step.key}.title`)}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {t(`ozg.steps.${step.key}.desc`)}
                                    </p>
                                </div>

                                {/* Center Marker */}
                                <div className="relative flex-shrink-0 z-10 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-slate-50 shadow-sm">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.bg} ${step.color}`}>
                                        <OptimizedIcon icon={step.icon} className="w-5 h-5" />
                                    </div>

                                    {/* Connector to text */}
                                    <div className={`absolute top-1/2 w-8 h-px bg-slate-200 ${idx % 2 === 0 ? 'right-full' : 'left-full'}`} />
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Goal Marker */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="mx-auto mt-16 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200 relative z-10"
                    >
                        <OptimizedIcon icon={CheckCircle} className="w-10 h-10 text-white" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
