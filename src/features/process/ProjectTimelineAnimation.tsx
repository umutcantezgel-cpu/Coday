import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@/shared/ui/Icon';

import { useTranslation } from 'react-i18next';

const ProjectTimelineAnimation: React.FC = () => {
    const { t } = useTranslation('process');
    const steps = (t('timeline.steps', { returnObjects: true }) as Array<{ title: string; desc: string }>).map((step, idx) => ({
        ...step,
        phase: `0${idx + 1}`,
        icon: ['travel_explore', 'architecture', 'palette', 'code', 'rocket_launch'][idx]
    }));

    return (
        <div className="py-24 relative overflow-hidden">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2 hidden lg:block"></div>

            <div className="space-y-24">
                {steps.map((step, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative ${isEven ? '' : 'lg:flex-row-reverse'}`}
                        >
                            {/* Content Side */}
                            <div className="flex-1 text-center lg:text-start">
                                <span className={`text-9xl font-black text-slate-100 absolute -top-10 -z-10 ${isEven ? 'left-0' : 'right-0'}`}>{step.phase}</span>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-white mb-6 shadow-xl">
                                    <Icon name={step.icon} className="text-3xl" />
                                </div>
                                <h3 className="font-display font-bold text-3xl text-secondary mb-4">{step.title}</h3>
                                <p className="text-xl text-slate-500 leading-relaxed max-w-md">{step.desc}</p>
                            </div>

                            {/* Node Point on Line */}
                            <div className="w-8 h-8 rounded-full bg-white border-4 border-primary shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 hidden lg:block"></div>

                            {/* Spacer for layout balance */}
                            <div className="flex-1 hidden lg:block"></div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectTimelineAnimation;
