import React from 'react';

import { Icon } from '@/shared/ui/Icon';

const Calendar: React.FC = () => {
    const days = Array.from({ length: 35 }, (_, i) => i + 1);

    return (
        <div className="bg-background-light min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
                        Community Kalender
                    </h1>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                        <h2 className="text-2xl font-bold text-gray-800">April 2026</h2>
                        <div className="flex space-x-2">
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
                                <Icon name="chevron_left" className="text-gray-500" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
                                <Icon name="chevron_right" className="text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-gray-100">
                        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                            <div key={day} className="py-4 text-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 bg-gray-50/30">
                        {days.map((day) => (
                            <div key={day} className={`min-h-[120px] p-2 border-b border-r border-gray-100 ${day > 30 ? 'bg-gray-50/50 text-gray-300' : 'bg-white'}`}>
                                <div className="text-right mb-2">
                                    <span className={`text-sm font-medium ${day === 12 ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full ml-auto' : 'text-slate-500'}`}>
                                        {day > 30 ? day - 30 : day}
                                    </span>
                                </div>
                                {day === 12 && (
                                    <div className="bg-blue-50 border border-blue-100 p-2 rounded-md mb-1 cursor-pointer hover:bg-blue-100 transition-colors">
                                        <div className="text-xs font-bold text-blue-700">Masterclass</div>
                                        <div className="text-[10px] text-blue-500">14:00 Uhr</div>
                                    </div>
                                )}
                                {day === 15 && (
                                    <div className="bg-purple-50 border border-purple-100 p-2 rounded-md mb-1 cursor-pointer hover:bg-purple-100 transition-colors">
                                        <div className="text-xs font-bold text-purple-700">Networking</div>
                                        <div className="text-[10px] text-purple-500">18:00 Uhr</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
