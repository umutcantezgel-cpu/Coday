import React, { useState, useEffect } from 'react';

const TrafficROICalculator: React.FC = () => {
    const [visitors, setVisitors] = useState(1000);
    const [conversionRate, setConversionRate] = useState(2.5);
    const [leadValue, setLeadValue] = useState(500);
    const [seoBoost, setSeoBoost] = useState(false);

    const [currentRevenue, setCurrentRevenue] = useState(0);
    const [potentialRevenue, setPotentialRevenue] = useState(0);

    useEffect(() => {
        const calculate = () => {
            const current = visitors * (conversionRate / 100) * leadValue;
            // Conservative SEO Estimate: +200% traffic over 12 months in a good campaign
            // But let's stay realistic for the toggle: +50% immediate impact visualized
            const boostMultiplier = seoBoost ? 1.5 : 1;
            const projectedVisitors = visitors * boostMultiplier;
            const projectedRevenue = projectedVisitors * (conversionRate / 100) * leadValue;

            setCurrentRevenue(Math.round(current));
            setPotentialRevenue(Math.round(projectedRevenue));
        };
        calculate();
    }, [visitors, conversionRate, leadValue, seoBoost]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
                {/* Inputs */}
                <div className="p-8 space-y-8 bg-gray-50/50">
                    <div>
                        <h3 className="font-display font-bold text-2xl text-secondary mb-2">ROI Rechner</h3>
                        <p className="text-slate-500 text-sm">Was ist ein Top-Ranking wert?</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                <label>Monatliche Besucher</label>
                                <span>{visitors.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="100" max="50000" step="100"
                                value={visitors}
                                onChange={(e) => setVisitors(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                <label>Conversion Rate (%)</label>
                                <span>{conversionRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.1" max="10" step="0.1"
                                value={conversionRate}
                                onChange={(e) => setConversionRate(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                <label>Wert pro Lead (€)</label>
                                <span>{leadValue} €</span>
                            </div>
                            <input
                                type="number"
                                value={leadValue}
                                onChange={(e) => setLeadValue(Number(e.target.value))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-secondary"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-primary transition-colors" onClick={() => setSeoBoost(!seoBoost)}>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${seoBoost ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                {seoBoost && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                            </div>
                            <span className="font-bold text-secondary text-sm">SEO Growth Boost aktivieren (+50%)</span>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-secondary p-8 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10 text-center">
                        <span className="text-primary font-bold uppercase tracking-wider text-xs mb-2 block">Potenzieller Umsatz / Monat</span>
                        <div className="text-5xl sm:text-6xl font-display font-black mb-2 animate-in fade-in slide-in-from-bottom-4 transition-all duration-300">
                            {formatCurrency(potentialRevenue)}
                        </div>
                        {seoBoost && (
                            <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-8">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                +{formatCurrency(potentialRevenue - (visitors * (conversionRate / 100) * leadValue))} durch SEO
                            </div>
                        )}
                        {!seoBoost && <div className="h-8 mb-8"></div>}

                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                            SEO ist kein Kostenfaktor, sondern ein Investment. Ein Top-Ranking liefert Traffic, auch wenn Sie schlafen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrafficROICalculator;
