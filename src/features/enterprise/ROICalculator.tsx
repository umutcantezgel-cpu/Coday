import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CurrencyEur, Calculator, TrendUp, Warning } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '../../shared/utils/formatters';

export const ROICalculator: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const [traffic, setTraffic] = useState(10000);
  const [conversion, setConversion] = useState(2.5);
  const [aov, setAov] = useState(75);

  // Logic: 1s delay = -7% conversion (Akamai/Amazon study)
  // Assume current generic site is ~2s slower than our "Instant" site.
  // So current conversion is suppressed by ~14%.
  // Potential gain = (Traffic * (Conversion * 1.14 / 100) * AOV) - Current Rev

  const currentRevenue = traffic * (conversion / 100) * aov;
  const potentialRevenue = traffic * ((conversion * 1.15) / 100) * aov; // 15% uplift conservatively
  const annualLoss = (potentialRevenue - currentRevenue) * 12;

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Controls */}
      <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-primary rounded-xl">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Opportunity Calculator</h3>
            <p className="text-sm text-slate-500">Based on Akamai Performance Data</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Visitors</label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-end font-mono font-bold text-primary mt-1">
              {formatNumber(traffic, locale)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Conversion Rate (%)
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={conversion}
              onChange={(e) => setConversion(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-end font-mono font-bold text-primary mt-1">
              {formatNumber(conversion, locale, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Avg. Order Value (€)
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-end font-mono font-bold text-primary mt-1">
              {formatCurrency(aov, 'EUR', locale)}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="p-8 rounded-3xl bg-secondary text-white relative overflow-hidden"
        >
          <div className="absolute top-0 end-0 p-32 bg-primary/20 blur-[100px] rounded-full -z-0"></div>

          <h3 className="text-2xl font-display font-light mb-8 opacity-80">Annual Revenue Leak</h3>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              {formatCurrency(Math.round(annualLoss), 'EUR', locale)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-300 text-sm font-bold uppercase tracking-wider mb-8">
            <Warning size={16} />
            Lost due to poor performance
          </div>

          <div className="h-px bg-white/10 w-full mb-8"></div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/60 text-sm mb-1">Potential Annual Rev</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                <CurrencyEur className="text-emerald-400" />
                {formatCurrency(Math.round(potentialRevenue * 12), 'EUR', locale)}
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"
            >
              <TrendUp size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
