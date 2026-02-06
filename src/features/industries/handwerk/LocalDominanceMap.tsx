import React from 'react';

const LocalDominanceMap: React.FC = () => {
    return (
        <div className="relative w-full h-[400px] bg-gray-100 rounded-3xl overflow-hidden shadow-inner border border-gray-200">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="absolute inset-0 flex items-center justify-center">
                {/* Radar Waves */}
                <div className="absolute w-[600px] h-[600px] border border-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute w-[400px] h-[400px] border border-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>

                {/* Radius Zones */}
                <div className="absolute w-64 h-64 bg-primary/5 rounded-full border border-primary/20 flex items-center justify-center">
                    <span className="absolute -top-6 text-xs font-bold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded-full shadow-sm">10km Radius</span>
                </div>
                <div className="absolute w-32 h-32 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center"></div>

                {/* Center Pin (User) */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-xl p-1 flex items-center justify-center relative">
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">
                            #1
                        </div>
                        <span className="material-symbols-outlined text-3xl text-primary">store</span>
                    </div>
                    <div className="mt-2 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold shadow-sm text-slate-800">
                        Ihr Betrieb
                    </div>
                </div>

                {/* Competitors (Small Pins) */}
                <div className="absolute top-1/4 left-1/4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-2xl text-red-400">location_on</span>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-sm">Konkurrenz A</span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-2xl text-red-400">location_on</span>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-sm">Konkurrenz B</span>
                </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg flex-1 border border-white/50">
                    <div className="text-xs text-slate-500 uppercase font-bold">Sichtbarkeit</div>
                    <div className="text-xl font-black text-green-600">+240%</div>
                </div>
                <div className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg flex-1 border border-white/50">
                    <div className="text-xs text-slate-500 uppercase font-bold">Calls / Mo</div>
                    <div className="text-xl font-black text-blue-600">45</div>
                </div>
            </div>
        </div>
    );
};

export default LocalDominanceMap;
