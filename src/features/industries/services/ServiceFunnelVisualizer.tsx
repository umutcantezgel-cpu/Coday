import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ServiceFunnelVisualizer: React.FC = () => {
    // A visual representation of traffic converting to gold
    const [leads, setLeads] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeads(prev => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { label: "Kalte Traffic", color: "bg-blue-500", width: "w-full" },
        { label: "Lead Magnet", color: "bg-blue-600", width: "w-3/4" },
        { label: "E-Mail Nurture", color: "bg-blue-700", width: "w-1/2" },
        { label: "Strategy Call", color: "bg-primary", width: "w-1/4" }
    ];

    return (
        <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="text-center mb-12">
                <span className="text-primary font-bold uppercase tracking-wider text-xs block mb-1">Systematisierter Vertrieb</span>
                <h3 className="font-display font-bold text-2xl text-white">Die B2B Kunden-Maschine</h3>
            </div>

            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-1">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: idx * 0.2 }}
                        className={`${step.width} h-20 ${step.color} rounded-xl relative flex items-center justify-center shadow-lg border border-white/10`}
                        style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} // Funnel shape hint
                    >
                        <span className="font-bold text-white tracking-widest uppercase text-sm drop-shadow-md">{step.label}</span>

                        {/* Animated Particles flowing down */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-full bg-white/50 blur-sm"
                            />
                        </div>
                    </motion.div>
                ))}

                {/* The "Gold" Bucket */}
                <div className="w-32 h-32 bg-yellow-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)] mt-4 animate-pulse relative border-4 border-yellow-300">
                    <span className="material-symbols-outlined text-4xl text-yellow-900 mb-1">paid</span>
                    <span className="text-2xl font-black text-yellow-900">{leads} Leads</span>
                    <div className="text-[9px] text-yellow-900 font-bold uppercase">Generiert</div>

                    {/* Coin particles emanating */}
                    <motion.div
                        animate={{ y: -20, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute -top-4 text-yellow-400 font-bold"
                    >
                        $$$
                    </motion.div>
                </div>
            </div>

            <p className="text-center text-gray-500 text-xs mt-8 max-w-md mx-auto">
                Während Ihre Konkurrenz noch Kaltakquise macht, liefert Ihnen dieses System rund um die Uhr vorqualifizierte Anfragen.
            </p>
        </div>
    );
};

export default ServiceFunnelVisualizer;
