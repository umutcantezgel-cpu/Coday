import React from 'react';

const benefits = [
    { icon: 'flight_takeoff', title: 'Work from Anywhere', desc: 'Ob Bali oder Berlin. Du Entscheidest.' },
    { icon: 'monitor_heart', title: 'Health Budget', desc: '100€/Monat für Gym, Meditation oder Massagen.' },
    { icon: 'laptop_mac', title: 'Latest Tech', desc: 'MacBook Pro M3 und 4K Monitor für jeden.' },
    { icon: 'school', title: 'Learning Budget', desc: '2000€/Jahr für Kurse und Konferenzen.' },
    { icon: 'savings', title: 'Company Shares', desc: 'Jeder Mitarbeiter hält Anteile am Erfolg.' },
    { icon: 'coffee', title: 'Team Retreats', desc: '2x im Jahr fliegen wir alle zusammen weg.' },
];

const Benefits: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Perks & <span className="text-gradient-vivid">Benefits</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Weil du es wert bist. Wir investieren massiv in dein Wohlbefinden und Wachstum.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((b) => (
                        <div key={b.title} className="p-8 border border-gray-100 rounded-3xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">{b.icon}</span>
                            </div>
                            <h3 className="font-display font-bold text-xl mb-2 text-gray-900">{b.title}</h3>
                            <p className="text-slate-500">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Benefits;
