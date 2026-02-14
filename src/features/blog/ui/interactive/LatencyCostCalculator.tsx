import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CurrencyDollar, Timer, TrendDown, Warning } from '@phosphor-icons/react';
import { clsx } from 'clsx';

export const LatencyCostCalculator: React.FC = () => {
    const [visitors, setVisitors] = useState(50000);
    const [conversionRate, setConversionRate] = useState(2.5);
    const [aov, setAov] = useState(75); // Average Order Value
    const [loadTime, setLoadTime] = useState(3.5);

    // Benchmarks (Amazon/Google stats)
    // 1s delay = 7% reduction in conversions
    // Let's assume ideal load time is 1.0s. Every 0.1s above that is a penalty.

    const calculateLoss = () => {
        if (loadTime <= 1) return 0;

        // Simple model: 7% drop per second of delay
        const delaySeconds = loadTime - 1;
        const conversionPenalty = delaySeconds * 0.07;

        // Cap penalty at reasonable amount (e.g., 90% loss if site takes 15s)
        const effectivePenalty = Math.min(conversionPenalty, 0.9);

        const projectedRevenue = visitors * (conversionRate / 100) * aov;
        const lostRevenue = (projectedRevenue / (1 - effectivePenalty)) - projectedRevenue;

        return Math.round(lostRevenue);
    };

    const monthlyLoss = calculateLoss();
    const yearlyLoss = monthlyLoss * 12;

    // Visualizing the "Slow Site" vs "Fast Site"
    const carPosition = Math.min(100, (1 / loadTime) * 100);

    return (
        <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 p-8 md:p-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 mb-6">
                        <Timer size={16} className="text-orange-600" />
                        <span className="text-xs font-bold tracking-widest uppercase text-orange-600">Performance Audit</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
                        The High Cost of Slow Loading
                    </h3>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Amazon found that every 100ms of latency cost them 1% in sales. How much is your site lagging?
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Inputs */}
                    <div className="lg:col-span-7 space-y-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Monthly Visitors</label>
                                <input
                                    type="number"
                                    value={visitors}
                                    onChange={(e) => setVisitors(Number(e.target.value))}
                                    className="w-full p-3 rounded-xl border border-gray-200 font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Avg. Order Value (€)</label>
                                <input
                                    type="number"
                                    value={aov}
                                    onChange={(e) => setAov(Number(e.target.value))}
                                    className="w-full p-3 rounded-xl border border-gray-200 font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Conversion Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={conversionRate}
                                    onChange={(e) => setConversionRate(Number(e.target.value))}
                                    className="w-full p-3 rounded-xl border border-gray-200 font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Current Load Time (s)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={loadTime}
                                    onChange={(e) => setLoadTime(Number(e.target.value))}
                                    className={clsx(
                                        "w-full p-3 rounded-xl border border-gray-200 font-mono text-lg focus:ring-2 outline-none transition-colors",
                                        loadTime > 2.5 ? "focus:ring-red-400 bg-red-50 text-red-900" : "focus:ring-green-400 bg-green-50 text-green-900"
                                    )}
                                />
                            </div>
                        </div>

                        {/* Speed Visual */}
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-500 mb-4">Speed Visualization</p>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
                                {/* Competitor / Fast Site */}
                                <motion.div
                                    className="absolute top-0 bottom-0 bg-green-400 w-2 h-full rounded-full z-10 opacity-50"
                                    initial={{ left: 0 }}
                                    animate={{ left: "90%" }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Your Site */}
                                <motion.div
                                    className="absolute top-0 bottom-0 bg-red-500 w-2 h-full rounded-full z-20"
                                    initial={{ left: 0 }}
                                    animate={{ left: `${Math.max(10, 100 - (loadTime * 10))}%` }} // Slower = less distance
                                    transition={{ duration: loadTime, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>Start</span>
                                <span>Finish (Conversion)</span>
                            </div>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="bg-red-50 rounded-3xl p-8 border border-red-100 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <TrendDown size={120} className="text-red-500" />
                            </div>

                            <h4 className="text-red-800 font-bold mb-2 uppercase tracking-wide text-sm opacity-80">Estimated Annual Loss</h4>
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                key={yearlyLoss}
                                className="text-4xl md:text-5xl font-mono font-bold text-red-600 mb-4"
                            >
                                -{yearlyLoss.toLocaleString('de-DE')}€
                            </motion.div>

                            <p className="text-red-700/80 text-sm leading-relaxed mb-6">
                                {loadTime > 2
                                    ? `Your site takes ${loadTime}s. Amazon loads in <1s. You are losing approx. ${(monthlyLoss).toLocaleString('de-DE')}€ every month simply because users get bored.`
                                    : "Your speed is acceptable, but there is always room for optimization (e.g. INP or CLS metrics)."
                                }
                            </p>

                            {loadTime > 1.5 && (
                                <div className="flex items-center gap-2 justify-center bg-white/50 p-3 rounded-lg text-red-700 text-sm font-bold border border-red-100/50">
                                    <Warning size={18} />
                                    <span>Action Required: Optimize Images & JS</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatencyCostCalculator;
