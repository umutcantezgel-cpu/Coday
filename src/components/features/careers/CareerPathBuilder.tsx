import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CareerPathBuilder: React.FC = () => {
    const { t } = useTranslation('careers');
    const [track, setTrack] = useState<'dev' | 'design' | 'growth'>('dev');

    const levels = {
        dev: t('path.levels.dev', { returnObjects: true }) as any[],
        design: t('path.levels.design', { returnObjects: true }) as any[],
        growth: t('path.levels.growth', { returnObjects: true }) as any[],
    };

    // Enrich levels with static data (salary, skills) since JSON only has text
    const staticData = {
        dev: [
            { salary: "45k - 55k", skills: ["React Basics", "TypeScript", "Clean Code"] },
            { salary: "65k - 85k", skills: ["Architecture", "Mentoring", "Performance"] },
            { salary: "90k+", skills: ["System Design", "Team Lead", "Strategy"] }
        ],
        design: [
            { salary: "40k - 50k", skills: ["Figma", "Design Systems", "Prototyping"] },
            { salary: "60k - 80k", skills: ["UX Research", "Workshops", "Animation"] },
            { salary: "85k+", skills: ["Brand Strategy", "Leadership", "Vision"] }
        ],
        growth: [
            { salary: "40k + Com", skills: ["CRM", "Outreach", "Closing"] },
            { salary: "60k + Com", skills: ["Negotiation", "Strategy", "Upselling"] },
            { salary: "100k+", skills: ["Team Building", "Revenue Ops", "Expansion"] }
        ]
    };

    const combinedLevels = {
        dev: levels.dev?.map((l, i) => ({ ...l, ...staticData.dev[i] })) || [],
        design: levels.design?.map((l, i) => ({ ...l, ...staticData.design[i] })) || [],
        growth: levels.growth?.map((l, i) => ({ ...l, ...staticData.growth[i] })) || []
    };

    return (
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-2xl">
            <div className="text-center mb-12">
                <h3 className="font-display font-bold text-2xl text-secondary mb-6">{t('path.selector_title')}</h3>

                <div className="flex justify-center gap-4">
                    {['dev', 'design', 'growth'].map((trackKey) => (
                        <button
                            key={trackKey}
                            onClick={() => setTrack(trackKey as any)}
                            className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider transition-all ${track === trackKey ? 'bg-primary text-white shadow-lg scale-105' : 'bg-gray-50 border border-gray-200 text-slate-500 hover:bg-gray-100 hover:text-secondary'}`}
                        >
                            {t(`path.tracks.${trackKey}`)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    {combinedLevels[track].map((level, idx) => (
                        <motion.div
                            key={track + idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                        >
                            {/* Connector Line */}
                            {idx !== combinedLevels[track].length - 1 && (
                                <div className="absolute left-10 top-full h-4 w-0.5 bg-gray-200 -mb-2 z-0"></div>
                            )}

                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-secondary text-lg">{level.title}</h4>
                                        <span className="text-primary font-mono font-bold text-sm bg-primary/5 px-2 py-1 rounded border border-primary/10">{level.salary}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-3">{level.desc}</p>
                                    <div className="flex gap-2">
                                        {level.skills.map(s => (
                                            <span key={s} className="text-[10px] uppercase font-bold text-slate-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CareerPathBuilder;
