import React from 'react';
import { MagicBento, BentoCard } from '../../shared/ui/MagicBento';
import GearSetup from '../../components/features/benefits/GearSetup';

const Benefits: React.FC = () => {
    const benefits = [
        { icon: 'laptop_mac', title: 'Top Ausstattung', text: 'Neuestes MacBook Pro, 4K Monitor und Noise-Cancelling Kopfhörer deiner Wahl.', effect: 'tilt' as const },
        { icon: 'home', title: 'Überall arbeiten', text: 'Arbeite von wo du willst. Wir finanzieren dein Heimbüro oder Co-Working Platz.', effect: 'spotlight' as const },
        { icon: 'flight_takeoff', title: 'Arbeits-Reisen', text: '2x im Jahr fliegt das ganze Team an einen sonnigen Ort zum Arbeiten und Feiern.', effect: 'glow' as const },
        { icon: 'payments', title: 'Top Gehalt', text: 'Wir zahlen Spitzen-Gehälter für Spitzen-Talente. Inklusive Unternehmensbeteiligung.', effect: 'tilt' as const },
        { icon: 'school', title: 'Weiterbildung', text: '€2.000 pro Jahr für Kurse, Konferenzen und Bücher. Deine Entwicklung ist uns wichtig.', effect: 'spotlight' as const },
        { icon: 'fitness_center', title: 'Gesundheit', text: 'Sport-Mitgliedschaft und monatlicher Gesundheits-Bonus.', effect: 'glow' as const },
    ];

    return (
        <div className="bg-aurora-white min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Vorteile & Extras</span>
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                        Mehr als nur Gehalt.
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Wir fordern viel, aber wir geben auch viel zurück. Unsere Benefits sind darauf ausgelegt, dir den Rücken freizuhalten.
                    </p>
                </div>

                {/* Benefits Grid */}
                <MagicBento columns={3} gap={24} className="max-w-7xl mx-auto mb-24">
                    {benefits.map((benefit, i) => (
                        <BentoCard
                            key={i}
                            effect={benefit.effect}
                            spotlightColor="rgba(59, 130, 246, 0.15)"
                            glowColor="rgba(147, 51, 234, 0.2)"
                            className="h-full bg-white text-left shadow-flat border border-gray-100"
                        >
                            <div className="p-8 h-full flex flex-col items-start text-left">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl text-aurora-sapphire">{benefit.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">{benefit.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-left">
                                    {benefit.text}
                                </p>
                            </div>
                        </BentoCard>
                    ))}
                </MagicBento>

                {/* Gear Setup Section - NEW */}
                <div className="mb-24">
                    <GearSetup />
                </div>

            </div>
        </div>
    );
};

export default Benefits;
