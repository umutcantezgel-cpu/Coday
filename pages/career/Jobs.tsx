import React from 'react';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
const Jobs: React.FC = () => {
    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"></div>

                    {/* Hero Visual */}
                    <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl h-[400px] group">
                        <OptimizedImage
                            src="/images/hero/team-buero-high-five-erfolg-feiern-banner-konfetti-ziel-erreicht-medaillen-wachstum.webp"
                            alt="Unser Team feiert Erfolge"
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-left">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                                Unsere Kultur
                            </span>
                            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
                                Werde Teil des <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Widerstands.</span>
                            </h1>
                            <p className="text-lg text-gray-200 max-w-2xl">
                                Wir töten die Ineffizienz der Agenturwelt. Keine Politik. Nur Code, Wachstum und Sieg.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-2xl border border-aurora-mist p-8 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-all duration-300 group">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="px-2 py-1 rounded bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                                        Full-Time
                                    </span>
                                    <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                        Remote
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    Senior Frontend Engineer (React/Next.js)
                                </h3>
                                <p className="text-slate-500 max-w-xl">
                                    Baue High-Performance Interfaces und gestalte unser Design-System Aurora mit.
                                </p>
                            </div>

                            <div className="mt-6 md:mt-0 flex items-center">
                                <button className="px-6 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-colors mr-4 hidden md:block">
                                    Details
                                </button>
                                <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Jetzt bewerben
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-slate-50 rounded-3xl p-12 border border-slate-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Keine passende Stelle dabei?</h3>
                    <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                        Wir suchen immer nach außergewöhnlichen Talenten. Schick uns deine Initiativbewerbung und erzähl uns, wie du uns helfen kannst zu dominieren.
                    </p>
                    <button className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-blue-500 hover:text-blue-600 transition-colors bg-white">
                        Initiativ bewerben
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
