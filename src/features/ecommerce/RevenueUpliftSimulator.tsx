import React, { useState, useEffect } from 'react';

const RevenueUpliftSimulator: React.FC = () => {
    const [annualRevenue, setAnnualRevenue] = useState(500000);
    const [currentLoadTime, setCurrentLoadTime] = useState(3.5);
    const [projectedUplift, setProjectedUplift] = useState(0);

    useEffect(() => {
        // Metric: 1s faster = +7% conversion (Akamai)
        // Metric: Headless is often 2x faster than Monolith.

        const targetLoadTime = 1.0; // Our goal
        if (currentLoadTime <= targetLoadTime) {
            setProjectedUplift(0);
            return;
        }

        const improvement = currentLoadTime - targetLoadTime; // e.g. 2.5s improvement
        const upliftPercentage = improvement * 0.07; // 7% per second

        // Cap realistic uplift at 30% to not oversell
        const cappedUplift = Math.min(upliftPercentage, 0.30);

        setProjectedUplift(annualRevenue * cappedUplift);

    }, [annualRevenue, currentLoadTime]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12 space-y-8 bg-gray-50/50">
                    <div>
                        <h3 className="font-display font-bold text-2xl text-secondary mb-2">Revenue Uplift Calculator</h3>
                        <p className="text-slate-500 text-sm">Headless Commerce ist kein IT-Projekt. Es ist ein Investment.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                <label>Jahresumsatz E-Commerce</label>
                                <span>{formatCurrency(annualRevenue)}</span>
                            </div>
                            <input
                                type="range"
                                min="100000" max="5000000" step="50000"
                                value={annualRevenue}
                                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                <label>Aktuelle Ladezeit (Mobile)</label>
                                <span className={currentLoadTime > 2.5 ? 'text-red-500' : 'text-yellow-500'}>{currentLoadTime}s</span>
                            </div>
                            <input
                                type="range"
                                min="1.0" max="8.0" step="0.5"
                                value={currentLoadTime}
                                onChange={(e) => setCurrentLoadTime(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-secondary p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10">
                        <span className="text-green-400 font-bold uppercase tracking-wider text-xs mb-4 block">Potenzielles Wachstum / Jahr</span>
                        <div className="text-5xl lg:text-6xl font-display font-black mb-4">
                            +{formatCurrency(projectedUplift)}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Durch den Wechsel auf eine Headless-Architektur (Next.js) erreichen wir Ladezeiten unter 1 Sekunde. <br /><br />
                            <strong className="text-white">Das Ergebnis:</strong> ~{Math.round((projectedUplift / annualRevenue) * 100)}% Conversion Uplift alleine durch Performance.
                        </p>

                        <button className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                            Strategiegespräch buchen
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueUpliftSimulator;
