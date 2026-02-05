import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CoreWebVitalsChart: React.FC = () => {
    const [activeMetric, setActiveMetric] = useState<'lcp' | 'fid' | 'cls'>('lcp');

    const metrics = {
        lcp: {
            title: 'Largest Contentful Paint (LCP)',
            desc: 'Misst die Ladezeit. Wann ist der Hauptinhalt sichtbar?',
            good: '< 2.5s',
            poor: '> 4.0s',
            color: '#10B981',
            details: ['Impact: User perceived load speed', 'Optimierung: Server-Timing, Bild-Optimierung', 'Google Gewichtung: Hoch']
        },
        fid: {
            title: 'First Input Delay (FID)',
            desc: 'Misst die Interaktivität. Wie schnell reagiert die Seite auf Klicks?',
            good: '< 100ms',
            poor: '> 300ms',
            color: '#3B82F6',
            details: ['Impact: UI Frustration', 'Optimierung: JS Minification, Code Splitting', 'Google Gewichtung: Mittel']
        },
        cls: {
            title: 'Cumulative Layout Shift (CLS)',
            desc: 'Misst die visuelle Stabilität. Springen Elemente unerwartet?',
            good: '< 0.1',
            poor: '> 0.25',
            color: '#F59E0B',
            details: ['Impact: Reading Experience & Missclicks', 'Optimierung: Fixed Dimensions for Images/Ads', 'Google Gewichtung: Mittel']
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chart / Visual */}
            <div className="bg-white rounded-3xl shadow-flat border border-gray-100 p-8 relative overflow-hidden">
                <div className="flex justify-between items-end h-64 relative z-10 px-4 pb-4 border-b border-gray-100 mb-8">
                    {/* Bars */}
                    {(['lcp', 'fid', 'cls'] as const).map((metric) => (
                        <div
                            key={metric}
                            onClick={() => setActiveMetric(metric)}
                            className="flex flex-col items-center gap-2 group cursor-pointer w-1/3"
                        >
                            <div className="relative w-full flex justify-center items-end h-40">
                                <motion.div
                                    className={`w-16 rounded-t-xl transition-all duration-300 ${activeMetric === metric ? 'opacity-100 shadow-lg' : 'opacity-40 hover:opacity-70'}`}
                                    style={{
                                        height: metric === 'lcp' ? '80%' : metric === 'fid' ? '60%' : '50%',
                                        backgroundColor: metrics[metric].color
                                    }}
                                    layoutId="bar"
                                />
                            </div>
                            <span className={`font-bold uppercase text-sm ${activeMetric === metric ? 'text-secondary' : 'text-gray-400'}`}>{metric}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-xs text-gray-400 uppercase font-bold mb-1">Good</div>
                        <div className="font-mono text-xs bg-green-50 text-green-600 py-1 px-2 rounded">{metrics[activeMetric].good}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase font-bold mb-1">Needs Imp.</div>
                        <div className="font-mono text-xs bg-yellow-50 text-yellow-600 py-1 px-2 rounded">Warning</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase font-bold mb-1">Poor</div>
                        <div className="font-mono text-xs bg-red-50 text-red-600 py-1 px-2 rounded">{metrics[activeMetric].poor}</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div>
                <motion.div
                    key={activeMetric}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Core Web Vitals</span>
                    <h3 className="font-display font-bold text-3xl text-secondary mb-4" style={{ color: metrics[activeMetric].color }}>
                        {metrics[activeMetric].title}
                    </h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                        {metrics[activeMetric].desc}
                    </p>

                    <ul className="space-y-3">
                        {metrics[activeMetric].details.map((detail, i) => (
                            <li key={i} className="flex items-center text-slate-700 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="material-symbols-outlined mr-3 text-sm" style={{ color: metrics[activeMetric].color }}>info</span>
                                {detail}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default CoreWebVitalsChart;
