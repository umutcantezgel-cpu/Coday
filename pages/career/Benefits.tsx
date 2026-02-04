import React from 'react';

const Benefits: React.FC = () => {
    const benefits = [
        { icon: 'laptop_mac', title: 'Top Equipment', text: 'Neuestes MacBook Pro, 4K Monitor und Noise-Cancelling Headphones deiner Wahl.' },
        { icon: 'home', title: 'Remote First', text: 'Arbeite von wo du willst. Wir finanzieren dein Home Office oder Co-Working Space.' },
        { icon: 'flight_takeoff', title: 'Workations', text: '2x im Jahr fliegt das ganze Team an einen sonnigen Ort zum Arbeiten und Feiern.' },
        { icon: 'payments', title: 'Überdurchschnittliches Gehalt', text: 'Wir zahlen Top-Gehälter für Top-Talente. Inklusive Unternehmensbeteiligung.' },
        { icon: 'school', title: 'Weiterbildungsbudget', text: '€2.000 pro Jahr für Kurse, Konferenzen und Bücher. Deine Entwicklung ist uns wichtig.' },
        { icon: 'fitness_center', title: 'Gesundheit', text: 'Urban Sports Club Mitgliedschaft und monatlicher Health-Bonus.' },
    ];

    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                        Benefits
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Wir fordern viel, aber wir geben auch viel zurück.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="bg-white rounded-2xl p-8 border border-aurora-mist hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl text-aurora-sapphire">{benefit.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {benefit.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Benefits;
