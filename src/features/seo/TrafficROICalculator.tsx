import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CurrencyEur, TrendUp, MagnifyingGlass } from '@phosphor-icons/react';

export const TrafficROICalculator: React.FC = () => {
    const [traffic, setTraffic] = useState(5000);
    const [conversion, setConversion] = useState(2.0);
    const [aov, setAov] = useState(100);

    // SEO Logic: 
    // Conservative Estimate: +50% Traffic in 12 Months
    // Optimistic Estimate: +100% Traffic + 20% Conversion Improvement (better targeting)

    const currentRevenue = traffic * (conversion / 100) * aov;
    const projectedTraffic = traffic * 1.5; // +50%
    const projectedRevenue = projectedTraffic * (conversion / 100) * aov;

    // Annualized Growth
    const annualGrowth = (projectedRevenue - currentRevenue) * 12;

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Controls */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <MagnifyingGlass size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">SEO Potenzial Rechner</h3>
                        <p className="text-sm text-slate-500">Basierend auf 50% Traffic-Wachstum</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Monatliche Besucher (Organisch)</label>
                        <input
                            type="range" min="500" max="50000" step="500"
                            value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
                            className="w-full accent-purple-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right font-mono font-bold text-purple-600 mt-1">{traffic.toLocaleString()}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Conversion Rate (%)</label>
                        <input
                            type="range" min="0.5" max="10" step="0.1"
                            value={conversion} onChange={(e) => setConversion(Number(e.target.value))}
                            className="w-full accent-purple-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right font-mono font-bold text-purple-600 mt-1">{conversion}%</div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Warenkorbwert (€)</label>
                        <input
                            type="range" min="10" max="500" step="10"
                            value={aov} onChange={(e) => setAov(Number(e.target.value))}
                            className="w-full accent-purple-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right font-mono font-bold text-purple-600 mt-1">{aov}€</div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="p-8 rounded-3xl bg-gray-900 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-32 bg-purple-600/30 blur-[100px] rounded-full -z-0"></div>

                    <h3 className="text-2xl font-display font-light mb-8 opacity-80">Zusätzlicher Jahresumsatz</h3>

                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            +{Math.round(annualGrowth).toLocaleString()}€
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300 text-sm font-bold uppercase tracking-wider mb-8">
                        <TrendUp size={16} />
                        Durch SEO Optimierung
                    </div>

                    <div className="h-px bg-white/10 w-full mb-8"></div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white/60 text-sm mb-1">Potenzieller Monatsumsatz</div>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <CurrencyEur className="text-green-400" />
                                {Math.round(projectedRevenue).toLocaleString()}€
                            </div>
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"
                        >
                            <TrendUp size={24} />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TrafficROICalculator;
