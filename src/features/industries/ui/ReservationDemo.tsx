import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarBlank, User, CheckCircle } from '@phosphor-icons/react';

export const ReservationDemo = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="bg-surface-light rounded-3xl p-8 max-w-lg mx-auto shadow-2xl border border-white/20 overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Tisch reservieren
            </h3>

            <div className="space-y-6">
                {/* Step 1: Date & Time */}
                <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: step >= 1 ? 1 : 0.5 }}
                    className={`p-4 rounded-xl transition-colors ${step === 1 ? 'bg-white shadow-sm' : 'bg-transparent'}`}
                    onClick={() => setStep(1)}
                >
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                            <CalendarBlank size={14} /> DATUM & ZEIT
                        </label>
                        {step > 1 && <CheckCircle size={16} className="text-primary" />}
                    </div>
                    {step === 1 ? (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {['He', 'Mo', 'Fr'].map((day, i) => (
                                <button key={i} className="text-sm py-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors">
                                    {day}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="font-medium text-lg">Heute, 19:30 Uhr</div>
                    )}
                </motion.div>

                {/* Step 2: Guests */}
                <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: step >= 2 ? 1 : 0.5 }}
                    className={`p-4 rounded-xl transition-colors ${step === 2 ? 'bg-white shadow-sm' : 'bg-transparent'}`}
                    onClick={() => setStep(2)}
                >
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                            <User size={14} /> GÄSTE
                        </label>
                        {step > 2 && <CheckCircle size={16} className="text-primary" />}
                    </div>
                    {step === 2 ? (
                        <div className="flex items-center gap-4 mt-2">
                            <input type="range" min="1" max="10" className="w-full accent-primary" aria-label="Anzahl der Gäste" />
                            <span className="font-bold text-xl">2</span>
                        </div>
                    ) : (
                        <div className="font-medium text-lg">2 Personen</div>
                    )}
                </motion.div>

                {/* Confirm Button */}
                <button
                    onClick={() => setStep(s => s < 3 ? s + 1 : 1)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors mt-4 flex items-center justify-center gap-2"
                >
                    {step === 3 ? "Reservierung bestätigt!" : "Weiter"}
                </button>
            </div>
        </div>
    );
};
