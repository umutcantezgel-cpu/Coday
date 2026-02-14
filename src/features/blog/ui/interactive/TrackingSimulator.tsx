import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, HardDrives, ShieldSlash, ShieldCheck, ArrowRight, User } from '@phosphor-icons/react';
import { clsx } from 'clsx';

export const TrackingSimulator: React.FC = () => {
    const [mode, setMode] = useState<'client' | 'server'>('client');
    const [isAnimating, setIsAnimating] = useState(false);

    const runSimulation = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 3000);
    };

    return (
        <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl">
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                        <Cookie size={32} weight="duotone" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Tracking Simulator</h3>
                        <p className="text-gray-500">Compare Client-Side vs. Server-Side Data Accuracy</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <button
                        onClick={() => { setMode('client'); runSimulation(); }}
                        className={clsx(
                            "p-6 rounded-2xl border-2 text-left transition-all",
                            mode === 'client' ? "border-red-500 bg-red-50 text-red-900" : "border-gray-200 hover:border-red-200 text-gray-600"
                        )}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Cookie size={32} weight="fill" className={mode === 'client' ? "text-red-500" : "text-gray-400"} />
                            {mode === 'client' && <span className="px-2 py-1 bg-white rounded-md text-xs font-bold shadow-sm text-red-600 uppercase">Selected</span>}
                        </div>
                        <h4 className="font-bold mb-1">Client-Side (Pixel)</h4>
                        <p className="text-xs opacity-80">Browser-based. Vulnerable to AdBlockers and iOS constraints.</p>
                    </button>

                    <button
                        onClick={() => { setMode('server'); runSimulation(); }}
                        className={clsx(
                            "p-6 rounded-2xl border-2 text-left transition-all",
                            mode === 'server' ? "border-green-500 bg-green-50 text-green-900" : "border-gray-200 hover:border-green-200 text-gray-600"
                        )}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <HardDrives size={32} weight="fill" className={mode === 'server' ? "text-green-500" : "text-gray-400"} />
                            {mode === 'server' && <span className="px-2 py-1 bg-white rounded-md text-xs font-bold shadow-sm text-green-600 uppercase">Selected</span>}
                        </div>
                        <h4 className="font-bold mb-1">Server-Side (CAPI)</h4>
                        <p className="text-xs opacity-80">Direct Server-to-Server. Bypasses browsers completely.</p>
                    </button>

                    <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-center text-center">
                        <span className="text-xs font-bold uppercase text-gray-400 mb-2">Data Loss</span>
                        <span className={clsx("text-4xl font-mono font-bold transition-colors", mode === 'client' ? "text-red-500" : "text-green-500")}>
                            {mode === 'client' ? "-40%" : "0%"}
                        </span>
                        <p className="text-xs text-gray-500 mt-2">
                            {mode === 'client' ? "Blocked by AdBlockers & Safari ITP" : "100% Signal Accuracy"}
                        </p>
                    </div>
                </div>

                {/* Visualization Area */}
                <div className="relative h-32 bg-gray-900 rounded-2xl overflow-hidden flex items-center px-8 border border-gray-800">
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />

                    {/* User */}
                    <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                            <User size={24} weight="bold" />
                        </div>
                        <span className="text-xs font-mono opacity-60">User</span>
                    </div>

                    {/* Path */}
                    <div className="flex-1 relative h-0.5 bg-gray-700 mx-4">
                        {/* Data Packet */}
                        <motion.div
                            key={mode} // Reset animation on mode change
                            className={clsx("absolute top-1/2 -mt-3 w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20", mode === 'client' ? "bg-red-500 text-white" : "bg-green-500 text-white")}
                            initial={{ left: "0%", opacity: 1, scale: 1 }}
                            animate={{
                                left: mode === 'client' ? "50%" : "100%",
                                opacity: mode === 'client' ? [1, 1, 0] : 1, // Fade out if blocked
                                scale: mode === 'client' ? [1, 1, 0] : 1
                            }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                            <ArrowRight size={14} weight="bold" />
                        </motion.div>

                        {/* Blocker (Only visible in Client Mode) */}
                        <AnimatePresence>
                            {mode === 'client' && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute left-1/2 top-1/2 -mt-6 -ml-6 w-12 h-12 flex items-center justify-center text-red-500 z-10"
                                >
                                    <ShieldSlash size={32} weight="duotone" />
                                    <span className="absolute -bottom-6 w-32 text-center -ml-10 text-[10px] text-red-400 font-mono uppercase">AdBlocker Active</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Server/Facebook */}
                    <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center transition-colors", mode === 'client' ? "bg-gray-700 text-gray-400" : "bg-blue-600 text-white")}>
                            {mode === 'client' ? <ShieldSlash size={24} /> : <ShieldCheck size={24} />}
                        </div>
                        <span className="text-xs font-mono opacity-60">Meta/Google</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackingSimulator;
