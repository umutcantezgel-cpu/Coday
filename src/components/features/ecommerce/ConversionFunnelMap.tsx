import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ConversionFunnelMap: React.FC = () => {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    const steps = [
        { name: 'Landing', userCount: '100%', drop: 'Standard: 50% Drop', fix: 'Speed Optimization & Clarity', color: '#60A5FA' },
        { name: 'Product View', userCount: '50%', drop: 'Standard: 70% Drop', fix: 'High-Res Images, Social Proof, 3D', color: '#818CF8' },
        { name: 'Add to Cart', userCount: '15%', drop: 'Standard: 60% Drop', fix: 'Sticky ATC, Upsells, No Account Req.', color: '#A78BFA' },
        { name: 'Checkout', userCount: '6%', drop: 'Standard: 40% Drop', fix: 'One-Click-Checkout, Trust Badges', color: '#C084FC' },
        { name: 'Purchase', userCount: '3.6%', drop: 'Success', fix: 'Thank You Page Upsells', color: '#E879F9' },
    ];

    return (
        <div className="py-12">
            <h3 className="font-display font-bold text-2xl text-secondary mb-12 text-center">We fix the leaks.</h3>

            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-2">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        onMouseEnter={() => setHoveredStep(idx)}
                        onMouseLeave={() => setHoveredStep(null)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="w-full relative group cursor-pointer"
                    >
                        {/* Funnel Bar */}
                        <div
                            className="bg-gradient-to-r mx-auto rounded-xl flex items-center justify-between px-6 py-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg relative z-10"
                            style={{
                                width: `${100 - (idx * 15)}%`,
                                minWidth: '300px',
                                background: `linear-gradient(to right, ${step.color}, #ffffff)`
                            }}
                        >
                            <span className="font-bold text-white drop-shadow-md">{step.name}</span>
                            <span className="font-mono font-bold text-white bg-black/10 px-2 py-1 rounded">{step.userCount}</span>
                        </div>

                        {/* Tooltip / Fix Reveal */}
                        <div
                            className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 bg-surface-dark text-white p-4 rounded-xl shadow-xl border border-gray-700 transition-all duration-300 ${hoveredStep === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
                            style={{ zIndex: 20 }}
                        >
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">Optimization Strategy</div>
                            <div className="text-primary font-bold mb-1">{step.fix}</div>
                            <div className="text-xs text-gray-500">{step.drop}</div>

                            {/* Connector Arrow */}
                            <div className="absolute top-1/2 right-full -mt-2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-surface-dark border-b-8 border-b-transparent"></div>
                        </div>

                        {/* Dropoff connector lines */}
                        {idx < steps.length - 1 && (
                            <div className="h-2 w-0.5 bg-gray-200 mx-auto"></div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ConversionFunnelMap;
