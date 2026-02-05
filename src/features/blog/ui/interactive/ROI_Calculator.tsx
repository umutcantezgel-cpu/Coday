import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

import { useTranslation, Trans } from 'react-i18next';

export const ROI_Calculator: React.FC = () => {
    const { t } = useTranslation();
    const [monthlySpend, setMonthlySpend] = useState(5000);
    const [conversionRate, setConversionRate] = useState(1.5);
    const [customerValue, setCustomerValue] = useState(1500);

    const currentRevenue = monthlySpend * conversionRate * 0.01 * customerValue; // Abstract simplified logic
    const optimizedRevenue = monthlySpend * (conversionRate * 2.5) * 0.01 * customerValue; // Assuming 2.5x improved CR

    return (
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 my-8">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="text-primary" />
                {t('blog:roiCalculator.title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('blog:roiCalculator.monthlyBudget')}</label>
                        <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={monthlySpend}
                            onChange={(e) => setMonthlySpend(Number(e.target.value))}
                            className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right font-mono font-bold text-primary mt-1">
                            {monthlySpend.toLocaleString('de-DE')} €
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('blog:roiCalculator.currentConversion')}</label>
                        <input
                            type="range"
                            min="0.1"
                            max="5.0"
                            step="0.1"
                            value={conversionRate}
                            onChange={(e) => setConversionRate(Number(e.target.value))}
                            className="w-full accent-blue-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right font-mono font-bold text-blue-600 mt-1">
                            {conversionRate} %
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('blog:roiCalculator.customerValue')}</label>
                        <input
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            value={customerValue}
                            onChange={(e) => setCustomerValue(Number(e.target.value))}
                            className="w-full accent-green-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right font-mono font-bold text-green-600 mt-1">
                            {customerValue.toLocaleString('de-DE')} €
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{t('blog:roiCalculator.currentRevenue')}</span>
                        <div className="text-3xl font-mono font-bold text-gray-400">
                            {Math.round(currentRevenue).toLocaleString('de-DE')} €
                        </div>
                    </div>

                    <div className="relative">
                        <span className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={16} />
                            {t('blog:roiCalculator.potentialRevenue')}
                        </span>
                        <motion.div
                            key={optimizedRevenue}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl md:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"
                        >
                            {Math.round(optimizedRevenue).toLocaleString('de-DE')} €
                        </motion.div>

                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start gap-3">
                            <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                            <p className="text-xs text-yellow-800 font-medium">
                                <Trans i18nKey="blog:roiCalculator.lossMessage" values={{ amount: (Math.round(optimizedRevenue - currentRevenue)).toLocaleString('de-DE') }}>
                                    Sie lassen monatlich ca. <strong className="underline decoration-yellow-400">0 €</strong> auf dem Tisch liegen.
                                </Trans>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
