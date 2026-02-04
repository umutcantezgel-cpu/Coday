import React from 'react';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';

const Culture: React.FC = () => {
    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                        Unsere Kultur
                    </h1>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                        Wir sind keine normale Agentur. Wir sind ein Performance-Kollektiv.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl transform rotate-1">
                        <span className="material-symbols-outlined text-5xl mb-6 opacity-80">speed</span>
                        <h3 className="text-3xl font-bold mb-4">Speed is King</h3>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            Wir hassen Warten. Wir liefern in Tagen, nicht Wochen. Wir optimieren auf Millisekunden. Geschwindigkeit ist unser Wettbewerbsvorteil.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-10 border border-aurora-mist shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                        <span className="material-symbols-outlined text-5xl mb-6 text-aurora-sapphire">diamond</span>
                        <h3 className="text-3xl font-bold mb-4 text-gray-900">Premium Standard</h3>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            "Gut genug" ist für uns eine Beleidigung. Wir liefern Pixel-Perfektion und technische Exzellenz. Jedes Mal. Ohne Ausnahme.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-10 border border-aurora-mist shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                        <span className="material-symbols-outlined text-5xl mb-6 text-aurora-sapphire">visibility_off</span>
                        <h3 className="text-3xl font-bold mb-4 text-gray-900">Radikale Transparenz</h3>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Keine versteckten Kosten. Keine Bullshit-Buzzwords. Wir sagen Kunden und Kollegen immer die Wahrheit, auch wenn es weh tut.
                        </p>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl transform -rotate-1">
                        <span className="material-symbols-outlined text-5xl mb-6 text-emerald-400">rocket_launch</span>
                        <h3 className="text-3xl font-bold mb-4">Domination Mindset</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Wir sind nicht hier, um teilzunehmen. Wir sind hier, um den Markt zu übernehmen. Wir denken groß und handeln entschlossen.
                        </p>
                    </div>
                </div>

                {/* Team Photo Grid Placeholder */}
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                    {/* We need OptimizedImage import here! */}
                    <OptimizedImage
                        src="/images/hero/team-buero-high-five-erfolg-feiern-banner-konfetti-ziel-erreicht-medaillen-wachstum.jpeg"
                        alt="Unser Team feiert den Erfolg – High Five und Konfetti im Büro"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                        <h3 className="text-3xl font-bold mb-2">Unser Team</h3>
                        <p className="text-lg text-gray-200">Gemeinsam dominieren wir den Markt. Jeden Tag.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Culture;
