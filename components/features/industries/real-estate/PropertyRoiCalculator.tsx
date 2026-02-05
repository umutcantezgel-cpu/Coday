import React, { useState, useEffect } from 'react';

const PropertyRoiCalculator: React.FC = () => {
    const [propertyValue, setPropertyValue] = useState(500000);
    const [commissionRate, setCommissionRate] = useState(3.57); // Standard DE with tax
    const [salesSpeedBoost, setSalesSpeedBoost] = useState(20); // % faster

    const commission = propertyValue * (commissionRate / 100);

    // Logic: Time is money. Faster sale = Less marketing cost + Cashflow value
    // Assuming holding costs & marketing are ~0.5% of value per month.
    // Simplifying for impact: Showing pure commission vs potential hidden loss.

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
            <div className="text-center">
                <span className="text-primary font-bold uppercase tracking-wider text-xs block mb-1">Make more money</span>
                <h3 className="font-display font-bold text-2xl text-secondary">Provisions-Check</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                        <label>Immobilienwert</label>
                        <span>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(propertyValue)}</span>
                    </div>
                    <input
                        type="range"
                        min="200000" max="2000000" step="50000"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                        <label>Ihre Provision (inkl. MwSt)</label>
                        <span>{commissionRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="1" max="7.14" step="0.01"
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Umsatz pro Deal</span>
                    <span className="text-xl font-bold text-secondary">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(commission)}</span>
                </div>
                <div className="h-px bg-gray-200 w-full mb-4"></div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-green-600 font-bold">Turbo-Verkauf</span>
                        <span className="text-xs text-green-700/70">durch Web-Exposé</span>
                    </div>
                    <span className="text-2xl font-black text-green-600">-{salesSpeedBoost}% Zeit</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    Verkaufen Sie 5 Häuser in der Zeit von 4.
                </p>
            </div>

            <button className="w-full bg-secondary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-secondary/90 transition-all">
                Jetzt Makler-Paket anfragen
            </button>
        </div>
    );
};

export default PropertyRoiCalculator;
