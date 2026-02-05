import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GearSetup: React.FC = () => {
    const [laptop, setLaptop] = useState<'mac' | 'win'>('mac');
    const [monitor, setMonitor] = useState<'ultra' | 'dual' | 'pro'>('ultra');
    const [audio, setAudio] = useState<'pods' | 'over'>('over');

    const equipment = {
        laptops: {
            mac: { name: 'MacBook Pro 16" M3 Max', desc: '128GB RAM · 4TB SSD' },
            win: { name: 'Dell XPS 15', desc: 'i9 · RTX 4070 · 64GB RAM' }
        },
        monitors: {
            ultra: { name: 'LG 49" Ultrawide', desc: '5120x1440 · 144Hz' },
            dual: { name: '2x Dell UltraSharp 27"', desc: '4K IPS · USB-C Hub' },
            pro: { name: 'Apple Studio Display', desc: '5K Retina · Nano-texture' }
        },
        audio: {
            pods: { name: 'AirPods Pro 2', desc: 'Active Noise Cancellation' },
            over: { name: 'Sony WH-1000XM5', desc: 'Industry leading noise canceling' }
        }
    };

    return (
        <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[300px] text-white">desktop_mac</span>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12">
                {/* Controls */}
                <div>
                    <h3 className="font-display font-bold text-3xl text-white mb-2">Dein Setup.</h3>
                    <p className="text-gray-400 mb-8">Wähle deine Waffen. Wir bestellen alles vor deinem ersten Tag.</p>

                    <div className="space-y-8">
                        {/* Laptop Selector */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Machine</label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setLaptop('mac')}
                                    className={`flex-1 p-4 rounded-xl border transition-all text-left ${laptop === 'mac' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                >
                                    <div className="font-bold mb-1">Apple</div>
                                    <div className="text-xs opacity-70">M3 Max</div>
                                </button>
                                <button
                                    onClick={() => setLaptop('win')}
                                    className={`flex-1 p-4 rounded-xl border transition-all text-left ${laptop === 'win' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                >
                                    <div className="font-bold mb-1">Windows</div>
                                    <div className="text-xs opacity-70">Dell XPS</div>
                                </button>
                            </div>
                        </div>

                        {/* Monitor Selector */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Display</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'ultra', label: 'Ultrawide' },
                                    { id: 'dual', label: 'Dual 4K' },
                                    { id: 'pro', label: 'Studio' }
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setMonitor(opt.id as any)}
                                        className={`p-3 rounded-lg border transition-all text-sm font-bold ${monitor === opt.id ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Audio Selector */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Audio</label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setAudio('over')}
                                    className={`flex-1 p-4 rounded-xl border transition-all text-left ${audio === 'over' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                >
                                    <div className="font-bold mb-1">Over-Ear</div>
                                    <div className="text-xs opacity-70">Sony XM5</div>
                                </button>
                                <button
                                    onClick={() => setAudio('pods')}
                                    className={`flex-1 p-4 rounded-xl border transition-all text-left ${audio === 'pods' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                >
                                    <div className="font-bold mb-1">In-Ear</div>
                                    <div className="text-xs opacity-70">AirPods Pro</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-black/40 rounded-2xl p-8 flex flex-col justify-center relative border border-white/5">
                    <div className="absolute top-4 right-4 text-xs font-mono text-primary flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        READY TO SHIP
                    </div>

                    <div className="space-y-6">
                        <motion.div
                            key={laptop}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 p-4 rounded-xl flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-2xl">laptop_mac</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{equipment.laptops[laptop].name}</h4>
                                <p className="text-gray-400 text-sm">{equipment.laptops[laptop].desc}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            key={monitor}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 p-4 rounded-xl flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-2xl">screenshot_monitor</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{equipment.monitors[monitor].name}</h4>
                                <p className="text-gray-400 text-sm">{equipment.monitors[monitor].desc}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            key={audio}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 p-4 rounded-xl flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-2xl">headphones</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{equipment.audio[audio].name}</h4>
                                <p className="text-gray-400 text-sm">{equipment.audio[audio].desc}</p>
                            </div>
                        </motion.div>

                        <div className="pt-8 border-t border-white/10 mt-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Gesamtwert (ca.)</p>
                                    <div className="text-3xl font-bold text-white font-mono">
                                        {laptop === 'mac' ? '€5.800' : '€4.200'}
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-white text-secondary font-bold rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                    Bestellung simulieren
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GearSetup;
