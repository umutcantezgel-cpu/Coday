import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeedSimulator: React.FC = () => {
    const [speed, setSpeed] = useState<'fast' | 'average' | 'slow'>('fast');
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [frustration, setFrustration] = useState(0);

    const speeds = {
        fast: { delay: 500, label: '0.5s (Optimized)', color: 'bg-green-500' },
        average: { delay: 1500, label: '1.5s (Standard)', color: 'bg-yellow-500' },
        slow: { delay: 3000, label: '3.0s (Unoptimized)', color: 'bg-red-500' }
    };

    const handleLoad = () => {
        setLoading(true);
        setLoaded(false);
        setFrustration(0);

        const duration = speeds[speed].delay;

        // Frustration timer
        const interval = setInterval(() => {
            setFrustration(prev => Math.min(prev + (100 / (duration / 100)), 100)); // Rough progress
        }, 100);

        setTimeout(() => {
            setLoading(false);
            setLoaded(true);
            clearInterval(interval);
            setFrustration(0);
        }, duration);
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="grid lg:grid-cols-5 h-full">

                {/* Controls */}
                <div className="lg:col-span-2 bg-secondary p-8 text-white flex flex-col justify-center">
                    <h3 className="font-display font-bold text-2xl mb-2">Speed Simulator</h3>
                    <p className="text-gray-400 text-sm mb-8">Erleben Sie Ladezeit aus Kundensicht.</p>

                    <div className="space-y-4 mb-8">
                        {(Object.keys(speeds) as Array<keyof typeof speeds>).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSpeed(key)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${speed === key ? 'bg-white/10 border-primary text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                            >
                                <span className="font-bold capitalize">{key}</span>
                                <span className={`text-xs px-2 py-1 rounded ${speeds[key].color} text-white font-bold`}>{speeds[key].label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLoad}
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? 'Laden...' : 'Seite laden'}
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                </div>

                {/* Viewport */}
                <div className="lg:col-span-3 bg-gray-100 relative items-center justify-center flex flex-col p-8 border-l border-white/10">
                    {/* Mock Browser UI */}
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-flat-lg overflow-hidden border border-gray-200 aspect-[9/16] relative flex flex-col">
                        {/* URL Bar */}
                        <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <div className="ml-2 w-32 h-4 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-4 relative overflow-y-auto">
                            {!loaded && !loading && (
                                <div className="h-full flex items-center justify-center text-gray-400 text-center text-sm">
                                    Wählen Sie eine Geschwindigkeit<br />und klicken Sie "Seite laden".
                                </div>
                            )}

                            {loading && (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                                    </div>
                                </div>
                            )}

                            {loaded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-gradient-to-br from-primary to-secondary h-40 rounded-xl flex items-center justify-center text-white font-bold p-4 text-center">
                                        High Performance Shop
                                    </div>
                                    <h2 className="font-bold text-lg text-secondary">Premium Sneakers</h2>
                                    <p className="text-xs text-gray-500">
                                        Die besten Schuhe für Ihren Lauf. Schnell geliefert, schnell geladen.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            <div className="h-20 bg-gray-200 rounded mb-2"></div>
                                            <div className="font-bold text-xs">Runner X1</div>
                                            <div className="text-primary text-xs font-bold">120 €</div>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            <div className="h-20 bg-gray-200 rounded mb-2"></div>
                                            <div className="font-bold text-xs">Sprinter Pro</div>
                                            <div className="text-primary text-xs font-bold">150 €</div>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-secondary text-white rounded-lg font-bold text-xs mt-4">
                                        In den Warenkorb
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Frustration / Loading Indicator */}
                    {loading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 transition-opacity duration-300">
                            <div className="w-6 h-6 border-2 border-slate-300 border-t-primary rounded-full animate-spin mb-2"></div>
                            <span className="text-xs font-bold text-slate-600">Lädt...</span>
                        </div>
                    )}
                    {!loading && loaded && (
                        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                            <span className="text-xs font-bold text-green-500">Loaded!</span>
                        </div>
                    )}
                    {!loading && !loaded && (
                        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400">Idle</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpeedSimulator;
