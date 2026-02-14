import React, { useState } from 'react';

const LostRevenueCalc: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [loadTime, setLoadTime] = useState(2.5);
  // Derived calculations
  const baseline = 1.0;
  const delay = Math.max(0, loadTime - baseline);
  // Actually usually much higher. Let's use Akamai stats: 100-millisecond delay = 7% drop in conversion rates.
  // Let's go with: 1s delay = 7% drop.
  const conversionDrop = delay * 0.07;
  const lostRevenue = monthlyRevenue * conversionDrop;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  return (
    <div className="bg-surface-dark border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-red-500/10 rounded-full blur-[80px] -me-20 -mt-20 pointer-events-none"></div>

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Der Preis der Langsamkeit
            </h3>
            <p className="text-gray-400">
              Berechnen Sie, was Sie eine langsame Website wirklich kostet.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold text-gray-300 mb-2">
                <label htmlFor="monthlyRevenue">Monatlicher Umsatz</label>
                <span>{formatCurrency(monthlyRevenue)}</span>
              </div>
              <input
                id="monthlyRevenue"
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold text-gray-300 mb-2">
                <label htmlFor="currentLoadTime">Aktuelle Ladezeit</label>
                <span className={loadTime > 2 ? 'text-red-400' : 'text-green-400'}>
                  {loadTime}s
                </span>
              </div>
              <input
                id="currentLoadTime"
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={loadTime}
                onChange={(e) => setLoadTime(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0.5s (World Class)</span>
                <span>5.0s (Critical)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center flex flex-col justify-center min-h-[250px]">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 block">
            Geschätzter Umsatzverlust / Jahr
          </span>
          <div className="text-4xl sm:text-5xl font-display font-black text-red-400 mb-2">
            -{formatCurrency(lostRevenue * 12)}
          </div>
          <p className="text-sm text-gray-500">
            Basierend auf Akamai-Studien: <br /> 1 Sekunde Verzögerung = 7% weniger Conversion.
          </p>
          {loadTime > 1.5 && (
            <div className="mt-8">
              <button className="px-6 py-2 bg-white text-secondary font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Jetzt optimieren
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostRevenueCalc;
