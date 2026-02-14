import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '../../../shared/utils/formatters';

export const ROICalculator = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const [leads, setLeads] = useState(10);
  const [value, setValue] = useState(1000);

  // Assumptions:
  // Old Website Conversion: 1%
  // New Website Conversion: 3% (Conservative 3x)

  const currentRevenue = leads * value;
  const potentialRevenue = leads * 3 * value;
  const extraRevenue = potentialRevenue - currentRevenue;

  return (
    <div className="bg-surface-dark border border-white/10 p-8 rounded-3xl max-w-2xl mx-auto backdrop-blur-md">
      <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3">
        <Calculator className="text-primary" />
        Der "Hidden Revenue" Rechner
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="visitors" className="block text-white/70 text-sm mb-2">
            Monatliche Besucher
          </label>
          <input
            id="visitors"
            type="range"
            min="100"
            max="10000"
            step="100"
            value={leads * 100} // Rough approx mapping
            onChange={(e) => setLeads(Math.ceil(Number(e.target.value) / 100))}
            className="w-full accent-primary mb-2"
          />
          <div className="text-2xl font-bold text-white">{formatNumber(leads * 100, locale)}</div>
        </div>

        <div>
          <label htmlFor="customerValue" className="block text-white/70 text-sm mb-2">
            Kundenwert (€)
          </label>
          <input
            id="customerValue"
            type="range"
            min="100"
            max="50000"
            step="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-primary mb-2"
          />
          <div className="text-2xl font-bold text-white">
            {formatCurrency(value, 'EUR', locale)}
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70">Umsatz heute (1% Conv.):</span>
          <span className="text-white font-mono">
            {formatCurrency(currentRevenue, 'EUR', locale)}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary">Umsatz mit Coday (3% Conv.):</span>
          <span className="text-primary font-bold font-mono text-xl">
            {formatCurrency(potentialRevenue, 'EUR', locale)}
          </span>
        </div>

        <div className="h-px bg-white/10 my-4"></div>

        <div className="text-center">
          <div className="text-white/50 text-sm mb-1">Ihr verbranntes Geld pro Monat</div>
          <motion.div
            key={extraRevenue}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500"
          >
            -{formatCurrency(extraRevenue, 'EUR', locale)}
          </motion.div>
        </div>
      </div>

      <p className="text-center text-white/40 text-xs mt-6">
        *Basierend auf durchschnittlichen Uplifts durch Conversion-Optimierung.
      </p>
    </div>
  );
};
