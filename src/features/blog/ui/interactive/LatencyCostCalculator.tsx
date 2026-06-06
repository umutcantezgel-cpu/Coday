'use client';
import React, { useState, useMemo } from 'react';
import { m } from 'motion/react';
import { Calculator, Warning, Trophy } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/shared/lib/utils';

const LatencyCostCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [loadTime, setLoadTime] = useState(2.5); // seconds

  // Amazon's metric: 100ms latency = 1% revenue loss
  // So 1s delay = 10% loss (simplified model for impact demonstration)
  // Baseline is considered 0.8s (instant feel)

  const { lostPercentage, lostRevenue } = useMemo(() => {
    const baseline = 0.8;
    const delay = Math.max(0, loadTime - baseline);
    const percentage = Math.min(100, delay * 10);
    const lost = monthlyRevenue * (percentage / 100);
    return { lostPercentage: percentage, lostRevenue: lost };
  }, [monthlyRevenue, loadTime]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div
      className="my-16 scroll-mt-24 p-8 bg-white rounded-3xl border border-gray-100 shadow-xl"
      id="latency-calculator"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Calculator size={24} weight="bold" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-secondary">Der Ladezeit-Rechner</h3>
          <p className="text-gray-500 text-sm">Basierend auf Amazon's Studie (100ms = 1% Umsatz)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Monatlicher Online-Umsatz
            </label>
            <div className="relative">
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="mt-2 flex justify-between text-sm text-gray-500 font-mono">
                <span>1.000 €</span>
                <span className="font-bold text-secondary text-lg">
                  {formatCurrency(monthlyRevenue)}
                </span>
                <span>500k €</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Aktuelle Ladezeit (in Sekunden)
            </label>
            <div className="relative">
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={loadTime}
                onChange={(e) => setLoadTime(Number(e.target.value))}
                className={cn(
                  'w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary',
                  loadTime < 1.5 ? 'bg-green-100' : loadTime < 3 ? 'bg-yellow-100' : 'bg-red-100'
                )}
              />
              <div className="mt-2 flex justify-between text-sm font-mono">
                <span className="text-green-600">0.5s (Blitzschnell)</span>
                <span
                  className={cn(
                    'font-bold text-lg',
                    loadTime < 1.5
                      ? 'text-green-600'
                      : loadTime < 3
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  )}
                >
                  {loadTime}s
                </span>
                <span className="text-red-500">8.0s (Schnecke)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
          {/* Background Pulse if High Loss */}
          {lostPercentage > 20 && (
            <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none motion-reduce:animate-none" />
          )}

          <div className="relative z-10 text-center">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              Jährliches Verbrennungs-Potenzial
            </span>
            <m.div
              key={lostRevenue}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                'font-display font-black text-4xl md:text-5xl my-4',
                lostRevenue > 0 ? 'text-red-500' : 'text-green-500'
              )}
            >
              {lostRevenue > 0 ? `-${formatCurrency(lostRevenue * 12)}` : '0,00 €'}
            </m.div>

            {lostRevenue > 0 ? (
              <div className="flex items-center justify-center gap-2 text-red-600 bg-red-100 py-2 px-4 rounded-full inline-flex mx-auto">
                <Warning size={16} weight="fill" />
                <span className="font-bold text-sm">
                  Sie verlieren {lostPercentage.toFixed(1)}% Umsatz
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-100 py-2 px-4 rounded-full inline-flex mx-auto">
                <Trophy size={16} weight="fill" />
                <span className="font-bold text-sm">Perfekte Performance!</span>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-6 max-w-xs mx-auto">
              *Berechnung: (Ladezeit - 0.8s) × 10% Conversion-Verlust pro Sekunde × Jahresumsatz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatencyCostCalculator;
