import React from 'react';

const Newsletter: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="bg-gray-900 rounded-[3rem] p-8 md:p-24 relative overflow-hidden text-center">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-8 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Join 15,000+ Subscribers
                        </div>
                        <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-white">
                            The Weekly <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Edge</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            Kein Spam. Nur High-Impact Strategien für dein Business. Jeden Dienstag um 09:00 Uhr.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all font-medium"
                            />
                            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/20">
                                Subscribe
                            </button>
                        </form>
                        <p className="mt-4 text-sm text-slate-600">
                            Unsubscribe anytime. Siehe <a href="/datenschutz" className="underline hover:text-white">Datenschutz</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
