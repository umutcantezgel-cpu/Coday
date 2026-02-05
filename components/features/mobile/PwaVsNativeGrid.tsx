import React, { useState } from 'react';

const PwaVsNativeGrid: React.FC = () => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const comparison = [
        { feature: 'Installable', pwa: true, native: true, desc: 'Beide können auf den Homescreen.' },
        { feature: 'App Store', pwa: false, native: true, desc: 'Native Apps profitieren vom Store-Traffic.' },
        { feature: 'Push Notifications', pwa: true, native: true, desc: 'Web Push (inzw. auch iOS) vs. Native Push.' },
        { feature: 'Offline Mode', pwa: true, native: true, desc: 'Service Workers caching vs. Local Storage.' },
        { feature: 'Dev Costs', pwa: 'Low (1 Codebase)', native: 'High (2 Codebases)', desc: 'PWA ist meist 50% günstiger.' },
        { feature: 'Performance', pwa: 'High', native: 'Very High', desc: 'Native hat direkten Hardware-Zugriff.' },
        { feature: 'Updates', pwa: 'Instant', native: 'App Store Review', desc: 'PWA Updates sind sofort live.' },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-flat border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 bg-secondary text-white p-6 items-center">
                <div className="font-bold text-lg">Feature</div>
                <div className="font-bold text-center text-primary text-xl">PWA (Web)</div>
                <div className="font-bold text-center text-gray-400 text-xl">Native (iOS/Android)</div>
            </div>

            <div className="divide-y divide-gray-100">
                {comparison.map((row, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredRow(idx)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`grid grid-cols-3 p-6 transition-colors duration-200 cursor-default relative group ${hoveredRow === idx ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-secondary">{row.feature}</span>
                            <span className={`text-xs text-slate-500 mt-1 transition-opacity duration-300 ${hoveredRow === idx ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>{row.desc}</span>
                        </div>

                        <div className="flex items-center justify-center">
                            {row.pwa === true ? (
                                <span className="material-symbols-outlined text-green-500 font-bold bg-green-100 p-1 rounded-full">check</span>
                            ) : row.pwa === false ? (
                                <span className="material-symbols-outlined text-red-300 bg-red-50 p-1 rounded-full">close</span>
                            ) : (
                                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg text-sm">{row.pwa}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-center">
                            {row.native === true ? (
                                <span className="material-symbols-outlined text-green-500 font-bold bg-green-100 p-1 rounded-full">check</span>
                            ) : row.native === false ? (
                                <span className="material-symbols-outlined text-red-300 bg-red-50 p-1 rounded-full">close</span>
                            ) : (
                                <span className="font-bold text-secondary bg-gray-100 px-3 py-1 rounded-lg text-sm">{row.native}</span>
                            )}
                        </div>

                        {/* Winner Highlight Line */}
                        <div className={`absolute left-0 bottom-0 top-0 w-1 bg-primary transition-transform duration-300 ${hoveredRow === idx ? 'scale-y-100' : 'scale-y-0'}`}></div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 p-6 text-center text-sm text-slate-500 border-t border-gray-100">
                Fazit: <strong className="text-secondary">PWA</strong> gewinnt bei Time-to-Market & Budget. <strong className="text-secondary">Native</strong> gewinnt bei Hardware-Performance (Games, AR).
            </div>
        </div>
    );
};

export default PwaVsNativeGrid;
