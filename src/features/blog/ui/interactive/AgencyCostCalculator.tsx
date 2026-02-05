
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Briefcase, Clock, AlertTriangle } from 'lucide-react';

import { useTranslation, Trans } from 'react-i18next';

export const AgencyCostCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [retainer, setRetainer] = useState(2500); // Monthly retainer
    const [hourlyRate, setHourlyRate] = useState(120); // Hourly rate
    const [hoursWasted, setHoursWasted] = useState(10); // Hours spent on meetings/emails

    const annualRetainer = retainer * 12;
    const projectCost = hoursWasted * hourlyRate * 12; // Annual cost of "management"
    const totalAgencyCost = annualRetainer + projectCost;

    // AI Interaction (Hypothetical fixed cost)
    const aiCost = 500 * 12; // 500/mo for AI systems maintenance
    const savings = totalAgencyCost - aiCost;

    return (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 my-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-red-600" />
                {t('blog:agencyCostCalculator.title')}
            </h3>

            <p className="text-gray-600 mb-8 border-l-4 border-red-500 pl-4 italic">
                {t('blog:agencyCostCalculator.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="font-bold text-gray-700">{t('blog:agencyCostCalculator.retainer')}</label>
                            <span className="text-red-600 font-mono font-bold">{retainer} €</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="10000"
                            step="100"
                            value={retainer}
                            onChange={(e) => setRetainer(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="font-bold text-gray-700">{t('blog:agencyCostCalculator.rate')}</label>
                            <span className="text-gray-900 font-mono font-bold">{hourlyRate} €</span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="300"
                            step="10"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="font-bold text-gray-700">{t('blog:agencyCostCalculator.hours')}</label>
                            <span className="text-orange-600 font-mono font-bold">{hoursWasted} h</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            step="1"
                            value={hoursWasted}
                            onChange={(e) => setHoursWasted(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <p className="text-xs text-gray-400 mt-2">{t('blog:agencyCostCalculator.hoursHint')}</p>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="text-sm text-gray-500 uppercase tracking-wider font-bold">{t('blog:agencyCostCalculator.totalCost')}</span>
                        <div className="text-4xl font-black text-gray-900 mt-1">
                            {totalAgencyCost.toLocaleString()} €
                        </div>
                        <div className="flex items-center gap-1 text-red-500 text-sm font-bold mt-2">
                            <AlertTriangle size={14} />
                            <Trans i18nKey="blog:agencyCostCalculator.yourTime" values={{ amount: projectCost.toLocaleString() }}>
                                Davon {projectCost.toLocaleString()} € nur für Ihre Zeit!
                            </Trans>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <span className="text-sm text-gray-500 uppercase tracking-wider font-bold">{t('blog:agencyCostCalculator.savings')}</span>
                        <motion.div
                            key={savings}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="text-3xl font-black text-green-600 mt-1"
                        >
                            {savings > 0 ? `+ ${savings.toLocaleString()} €` : '0 €'}
                        </motion.div>
                        <p className="text-xs text-green-700 mt-2 font-medium">
                            {t('blog:agencyCostCalculator.savingsSub')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
