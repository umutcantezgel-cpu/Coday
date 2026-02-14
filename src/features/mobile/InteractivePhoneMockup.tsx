import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Sun, Moon, TrendUp, Lightning, CaretRight, House, ShoppingBag, User } from '@phosphor-icons/react';
import { useRtl } from '@/shared/hooks/useRtl';

const InteractivePhoneMockup: React.FC = () => {
    const { isRtl } = useRtl();
    const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'profile'>('home');
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className="flex justify-center items-center py-12">
            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.2)] border-[8px] border-gray-900 overflow-hidden ring-4 ring-gray-200/20">

                {/* Dynamic Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 transition-all duration-300 hover:w-40 hover:h-8 cursor-pointer flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
                </div>

                {/* Screen Content */}
                <div className={`w-full h-full pt-10 pb-20 overflow-y-auto no-scrollbar transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-800'}`}>

                    {/* Header inside Phone */}
                    <div className="px-6 mb-6 flex justify-between items-center">
                        <div>
                            <span className="text-xs font-bold opacity-50 uppercase tracking-wide">Coday App</span>
                            <h2 className="font-bold text-xl">Good Morning</h2>
                        </div>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/10 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}
                        >
                            <OptimizedIcon icon={isDarkMode ? Sun : Moon} className="text-sm" />
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'home' && (
                            <motion.div
                                key="home"
                                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                className="px-4 space-y-4"
                            >
                                {/* Stories */}
                                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                                                <div className={`w-full h-full rounded-full border-2 ${isDarkMode ? 'border-slate-900 bg-slate-800' : 'border-gray-50 bg-white'}`}></div>
                                            </div>
                                            <span className="text-[10px] font-medium opacity-60">Story</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Banner */}
                                <div className="h-40 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg text-white p-6 relative overflow-hidden">
                                    <div className="absolute top-0 end-0 w-20 h-20 bg-white/20 rounded-full -me-10 -mt-10"></div>
                                    <h3 className="font-bold text-lg mb-1 relative z-10">New Arrival</h3>
                                    <p className="text-xs opacity-80 mb-4 relative z-10">Check out the latest collection.</p>
                                    <button className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm relative z-10">Shop Now</button>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className={`h-32 rounded-2xl p-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                                        <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-2">
                                            <OptimizedIcon icon={TrendUp} className="text-sm" />
                                        </div>
                                        <div className="text-sm font-bold">Analytics</div>
                                        <div className="text-xs opacity-50">+24%</div>
                                    </div>
                                    <div className={`h-32 rounded-2xl p-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                                            <OptimizedIcon icon={Lightning} className="text-sm" />
                                        </div>
                                        <div className="text-sm font-bold">Power</div>
                                        <div className="text-xs opacity-50">Active</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'shop' && (
                            <motion.div
                                key="shop"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="px-4 grid grid-cols-2 gap-4"
                            >
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                                        <div className="h-24 bg-gray-200"></div>
                                        <div className="p-3">
                                            <div className="h-3 w-3/4 bg-gray-300 rounded mb-2 opacity-50"></div>
                                            <div className="h-3 w-1/2 bg-blue-500 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="px-4 flex flex-col items-center pt-8"
                            >
                                <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 ring-4 ring-blue-500/20"></div>
                                <h3 className="font-bold text-lg mb-1">Max Mustermann</h3>
                                <p className="text-xs opacity-50 mb-8">Premium Member</p>

                                <div className={`w-full rounded-2xl p-4 mb-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-bold">Settings</span>
                                        <OptimizedIcon icon={CaretRight} className="text-sm opacity-50" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold">Privacy</span>
                                        <OptimizedIcon icon={CaretRight} className="text-sm opacity-50" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Bottom Navigation */}
                <div className={`absolute bottom-0 w-full h-16 flex justify-around items-center z-50 px-4 pb-2 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-gray-100'}`}>
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-500' : 'opacity-40'}`}>
                        <OptimizedIcon icon={House} className="text-xl" />
                    </button>
                    <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center gap-1 ${activeTab === 'shop' ? 'text-blue-500' : 'opacity-40'}`}>
                        <OptimizedIcon icon={ShoppingBag} className="text-xl" />
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-500' : 'opacity-40'}`}>
                        <OptimizedIcon icon={User} className="text-xl" />
                    </button>

                    {/* Home Indicator */}
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full"></div>
                </div>

            </div>
        </div>
    );
};

export default InteractivePhoneMockup;
