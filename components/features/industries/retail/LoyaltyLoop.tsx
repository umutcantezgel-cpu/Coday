import React, { useState } from 'react';

const LoyaltyLoop: React.FC = () => {
    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="font-display font-bold text-2xl text-secondary mb-6">Der "Loyalty Loop"</h3>
                    <p className="text-slate-600 mb-8">
                        Neukunden sind teuer. Stammkunden sind profitabel. Wir bauen Systeme, die Einmalkäufer in Fans verwandeln.
                    </p>

                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">1</span>
                            <div>
                                <h4 className="font-bold text-slate-800">Kauf & Daten</h4>
                                <p className="text-sm text-slate-500">Kunde kauft im Laden oder Online. Daten fließen in ein zentrales Profil.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">2</span>
                            <div>
                                <h4 className="font-bold text-slate-800">Personalisierung</h4>
                                <p className="text-sm text-slate-500">"Hallo Max, deine Laufschuhe sind bald abgenutzt. Hier sind die Neuen Modelle."</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">3</span>
                            <div>
                                <h4 className="font-bold text-slate-800">Re-Order</h4>
                                <p className="text-sm text-slate-500">Kunde kauft wieder. Bonuspunkte werden gutgeschrieben. Der Zyklus beginnt neu.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="relative flex items-center justify-center">
                    {/* Visual Loop Representation */}
                    <div className="w-64 h-64 rounded-full border-[20px] border-gray-100 relative spin-slow-animation">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-xl border border-green-100">
                            <span className="material-symbols-outlined text-3xl text-green-500">shopping_cart</span>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white shadow-lg p-2 rounded-xl border border-blue-100">
                            <span className="material-symbols-outlined text-3xl text-blue-500">mail</span>
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-xl border border-purple-100">
                            <span className="material-symbols-outlined text-3xl text-purple-500">loyalty</span>
                        </div>
                        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-xl border border-orange-100">
                            <span className="material-symbols-outlined text-3xl text-orange-500">insights</span>
                        </div>

                        {/* Center ROI */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-sm text-slate-400 uppercase font-bold">CLV Boost</span>
                            <span className="text-4xl font-black text-secondary">+40%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyLoop;
