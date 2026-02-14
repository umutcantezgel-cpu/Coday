import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lightning, Code, Cube } from '@phosphor-icons/react';

export const WorkHero: React.FC = () => {
    const { t } = useTranslation('work');

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
            {/* Background Noise/Grid */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-8 backdrop-blur-md"
                    >
                        <Lightning className="w-4 h-4" weight="fill" />
                        <span className="text-xs font-bold tracking-widest uppercase">{t('hero.label', 'Evidence of Excellence')}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8"
                    >
                        {t('hero.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto mb-12"
                    >
                        {t('hero.description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 text-slate-500"
                    >
                        <div className="flex items-center gap-2">
                            <Cube className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-mono">12+ Live Projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm font-mono">5 In-Progress</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
