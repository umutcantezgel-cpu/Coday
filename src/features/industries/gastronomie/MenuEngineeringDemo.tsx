import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MenuEngineeringDemo: React.FC = () => {
    const [mode, setMode] = useState<'paper' | 'digital'>('digital');

    return (
        <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-6">Die Psychologie der Speisekarte</h3>
                    <p className="text-gray-400 mb-8">
                        Papier ist geduldig. Digitale Menüs verkaufen aktiv. Steigern Sie Ihren Durchschnittsbon durch intelligente Upsells.
                    </p>

                    <div className="flex bg-white/10 p-1 rounded-xl w-fit">
                        <button
                            onClick={() => setMode('paper')}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'paper' ? 'bg-white text-slate-900' : 'text-gray-400 hover:text-white'}`}
                        >
                            Papier (Statisch)
                        </button>
                        <button
                            onClick={() => setMode('digital')}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'digital' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Digital (Smart)
                        </button>
                    </div>
                </div>

                <div className="relative h-[400px] bg-slate-900 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-6">
                    <AnimatePresence mode="wait">
                        {mode === 'paper' ? (
                            <motion.div
                                key="paper"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-[#fcf8e3] text-slate-800 p-8 shadow-xl w-64 h-80 rotate-1 font-serif relative"
                            >
                                <div className="text-center font-bold text-xl border-b border-slate-800 pb-2 mb-4">Speisekarte</div>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span>Rumpsteak</span>
                                        <span>28,50 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Schnitzel</span>
                                        <span>22.50 €</span>
                                    </div>
                                    <div className="flex justify-between opacity-50">
                                        <span>Salat</span>
                                        <span>12,00 €</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500 italic">
                                    *Keine Bilder, keine Emotionen*
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="digital"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-black text-white rounded-2xl w-64 h-[22rem] overflow-hidden shadow-2xl border border-gray-800 relative"
                            >
                                {/* Digital Header */}
                                <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=500&q=80)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                    <div className="absolute bottom-2 left-4 font-bold text-lg">Signature Steak</div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-xs text-gray-400 mb-4">Zartes Rindfleisch, sous-vide gegart.</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-bold text-primary text-lg">28,50 €</span>
                                        <button className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">Hinzufügen</button>
                                    </div>

                                    {/* Upsell Dialog */}
                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-gray-800 p-3 rounded-xl border border-gray-700"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <div className="w-8 h-8 rounded bg-red-900/50 flex items-center justify-center text-xs">🍷</div>
                                            <div>
                                                <div className="text-xs font-bold text-white">Dazu passend:</div>
                                                <div className="text-[10px] text-gray-400">Primitivo Reserve (+8,50€)</div>
                                            </div>
                                            <div className="ml-auto w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-[10px] cursor-pointer">+</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MenuEngineeringDemo;
