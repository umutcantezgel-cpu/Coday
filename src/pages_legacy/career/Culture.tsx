import React from 'react';

const values = [
    { title: 'Radical Transparency', desc: 'Wir teilen alles. Umsätze, Fehler und Learnings.' },
    { title: 'Speed matters', desc: 'Wir bewegen uns schnell und breaken things (manchmal).' },
    { title: 'Customer Obsession', desc: 'Wir bauen nicht für uns. Wir bauen für den Erfolg unserer User.' },
];

const Culture: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                    <div>
                        <h1 className="font-display font-black text-5xl lg:text-7xl mb-8 leading-tight text-gray-900">
                            Nicht nur ein Job.<br />
                            <span className="text-gradient-vivid">Eine Bewegung.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg mb-8">
                            Wir sind ein Team aus Visionären, Machern und Nerds. Uns verbindet der Glaube, dass Arbeit Erfüllung sein muss.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-4xl font-black text-gray-900 mb-1">100%</div>
                                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Remote First</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-gray-900 mb-1">4 Tage</div>
                                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Arbeitswoche</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" alt="Team" />
                    </div>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((v) => (
                        <div key={v.title} className="bg-slate-50 p-8 rounded-3xl">
                            <h3 className="font-display font-bold text-2xl mb-4 text-gray-900">{v.title}</h3>
                            <p className="text-slate-600">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Culture;
