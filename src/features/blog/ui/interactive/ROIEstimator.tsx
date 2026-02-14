import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendUp, CurrencyDollar, Calculator, Bag } from '@phosphor-icons/react';
import { clsx } from 'clsx';

export const ROIEstimator: React.FC = () => {
    const [revenue, setRevenue] = useState(1000000);
    const [conversionRate, setConversionRate] = useState(2.0);
    const [lift, setLift] = useState(0.5);

    const projectedRevenue = revenue * (1 + lift / conversionRate);
    const extraRevenue = projectedRevenue - revenue;

    return (
        <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl">
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
                        <Calculator size={32} weight="duotone" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">CRO ROI Estimator</h3>
                        <p className="text-gray-500">See what a 0.5% lift can do for your bottom line.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700">Annual Revenue ($)</label>
                                <span className="text-sm font-mono text-gray-500">{revenue.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="100000"
                                max="10000000"
                                step="100000"
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700">Current Conversion Rate (%)</label>
                                <span className="text-sm font-mono text-gray-500">{conversionRate.toFixed(1)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="5.0"
                                step="0.1"
                                value={conversionRate}
                                onChange={(e) => setConversionRate(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700">Projected Lift (+%)</label>
                                <span className="text-sm font-mono text-emerald-600 font-bold">+{lift.toFixed(1)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="2.0"
                                step="0.1"
                                value={lift}
                                onChange={(e) => setLift(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                            <p className="text-xs text-gray-400 mt-2">A 0.5% lift is conservative for a UX redesign.</p>
                        </div>
                    </div>

                    <div className="bg-emerald-900 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16" />

                        <div className="relative z-10 text-center">
                            <span className="text-emerald-300 font-bold uppercase text-xs tracking-widest">Extra Annual Revenue</span>
                            <motion.div
                                key={extraRevenue}
                                initial={{ scale: 0.9, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl md:text-5xl font-mono font-bold my-4"
                            >
                                +${extraRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </motion.div>

                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                <TrendUp size={16} className="text-emerald-400" />
                                <span className="text-sm font-bold">That's {((extraRevenue / revenue) * 100).toFixed(1)}% Growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROIEstimator;
