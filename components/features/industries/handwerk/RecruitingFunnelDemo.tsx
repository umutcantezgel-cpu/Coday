import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecruitingFunnelDemo: React.FC = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Social Media Ad",
            desc: "Die Fachkraft sieht Ihre Anzeige auf Instagram/Facebook.",
            visual: (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full max-w-[240px]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                        <div className="text-xs font-bold text-slate-800">Ihr Betrieb</div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-xs">Foto: Team bei der Arbeit</div>
                    <div className="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-gray-200 rounded mb-3"></div>
                    <button className="w-full bg-blue-500 text-white text-xs font-bold py-2 rounded">Jetzt bewerben</button>
                </div>
            )
        },
        {
            title: "60-Sekunden Quiz",
            desc: "Abfrage: Führerschein? Erfahrung? Verfügbarkeit?",
            visual: (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-[240px] text-center">
                    <div className="h-1 w-full bg-gray-100 rounded-full mb-4">
                        <div className="h-1 w-1/2 bg-primary rounded-full"></div>
                    </div>
                    <div className="text-sm font-bold text-slate-800 mb-4">Haben Sie einen Führerschein Klasse B?</div>
                    <div className="space-y-2">
                        <button className="w-full bg-primary/10 text-primary text-xs font-bold py-2 rounded hover:bg-primary/20">Ja, logisch</button>
                        <button className="w-full bg-gray-50 text-gray-500 text-xs font-bold py-2 rounded">Nein</button>
                    </div>
                </div>
            )
        },
        {
            title: "Automatischer Termin",
            desc: "Qualifizierte Bewerber buchen direkt ein Telefonat.",
            visual: (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full max-w-[240px]">
                    <div className="text-sm font-bold text-center mb-4 text-slate-800">Termin wählen</div>
                    <div className="grid grid-cols-3 gap-1 mb-2">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="text-[10px] text-center p-1 bg-gray-50 rounded text-gray-500">{10 + i}. Okt</div>
                        ))}
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs bg-green-50 text-green-700 p-2 rounded text-center border border-green-100">14:00 Uhr</div>
                        <div className="text-xs bg-white text-gray-400 p-2 rounded text-center border border-gray-100">15:30 Uhr</div>
                    </div>
                </div>
            )
        }
    ];

    const nextStep = () => {
        setStep((prev) => (prev + 1) % steps.length);
    };

    return (
        <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="font-display font-bold text-3xl text-secondary mb-4">Mitarbeiter finden auf Autopilot.</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Schluss mit Lebensläufen per Post. Wir bauen Ihnen einen digitalen Bewerbungsprozess, der Kandidaten vorqualifiziert und Ihnen nur die "Perlen" ins Postfach liefert.
                    </p>

                    <div className="space-y-6">
                        {steps.map((s, idx) => (
                            <div
                                key={idx}
                                onClick={() => setStep(idx)}
                                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${step === idx ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50 border border-transparent'}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === idx ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-lg ${step === idx ? 'text-primary' : 'text-secondary'}`}>{s.title}</h4>
                                    <p className="text-sm text-slate-500">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-[400px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 p-4"
                        >
                            {/* Phone Frame Mockup */}
                            <div className="w-[280px] h-[550px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-900 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                                <div className="w-full h-full bg-gray-50 flex items-center justify-center p-4">
                                    {steps[step].visual}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default RecruitingFunnelDemo;
