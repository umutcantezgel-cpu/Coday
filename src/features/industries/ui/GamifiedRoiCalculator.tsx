'use client';

import React, { useState, useEffect } from 'react';
import { m } from 'motion/react';
import { ChartLineUp, CurrencyEur } from '@phosphor-icons/react/dist/ssr';

interface GamifiedRoiCalculatorProps {
  baseRevenue?: number;
  potentialIncrease?: number; // e.g., 35 for 35%
  industryName: string;
}

export const GamifiedRoiCalculator: React.FC<GamifiedRoiCalculatorProps> = ({
  baseRevenue = 500000,
  potentialIncrease = 35,
  industryName,
}) => {
  const [revenue, setRevenue] = useState(baseRevenue);
  const [animatedRevenue, setAnimatedRevenue] = useState(baseRevenue);

  const calculateLostRevenue = (val: number) => {
    return Math.round((val * potentialIncrease) / 100);
  };

  useEffect(() => {
    // Smooth counter animation
    const duration = 500;
    const steps = 20;
    const stepTime = duration / steps;
    const diff = revenue - animatedRevenue;

    if (diff === 0) return;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedRevenue((prev) => {
        const next = prev + diff / steps;
        if (currentStep >= steps) {
          clearInterval(timer);
          return revenue;
        }
        return next;
      });
    }, stepTime);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revenue]);

  return (
    <div className="bg-secondary-900 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-secondary-800">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm font-bold uppercase tracking-wider mb-6 border border-primary-500/30">
            <ChartLineUp weight="bold" className="mr-2" />
            Umsatz-Rechner
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Wie viel Umsatz lässt Ihr {industryName} liegen?
          </h3>
          <p className="text-secondary-400 text-lg mb-8 leading-relaxed">
            Schieben Sie den Regler auf Ihren aktuellen Jahresumsatz und entdecken Sie das
            ungenutzte Potenzial, das Ihnen durch veraltete Web-Technologien und fehlende
            Sichtbarkeit entgeht.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium text-secondary-300 mb-2">
                <span>Aktueller Jahresumsatz</span>
                <span className="text-white font-bold">
                  {new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }).format(revenue)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-2 bg-secondary-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-secondary-500 mt-2">
                <span>100k</span>
                <span>5 Mio+</span>
              </div>
            </div>
          </div>
        </div>

        <m.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <p className="text-secondary-300 font-medium uppercase tracking-wider text-sm mb-2">
            Verlorenes Potenzial pro Jahr
          </p>
          <div className="text-5xl sm:text-6xl font-black font-display text-primary-400 mb-4 flex items-center justify-center">
            <CurrencyEur weight="bold" className="mr-2 w-10 h-10" />
            {new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(
              calculateLostRevenue(animatedRevenue)
            )}
          </div>
          <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold text-sm">
            +{potentialIncrease}% Wachstum möglich
          </div>
          <p className="text-secondary-400 text-sm mt-6">
            Basierend auf branchenweiten Durchschnittswerten für High-End Webseiten.
          </p>
        </m.div>
      </div>
    </div>
  );
};
