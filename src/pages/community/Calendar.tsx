import React from 'react';

const Calendar: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Community <span className="text-gradient-vivid">Kalender</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Bleib up-to-date mit allen wichtigen Terminen.
                    </p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-aurora overflow-hidden min-h-[600px] flex items-center justify-center relative">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="text-center relative z-10 px-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <span className="material-symbols-outlined text-4xl">calendar_month</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Synchronisiere deinen Kalender</h3>
                        <p className="text-slate-500 mb-8">Verpasse nie wieder einen Workshop oder ein Networking-Event.</p>
                        <button className="px-8 py-3 bg-gradient-ocean text-white rounded-xl font-bold shadow-lg hover:shadow-cyan-500/25 transition-all">
                            Zum Google Kalender hinzufügen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
