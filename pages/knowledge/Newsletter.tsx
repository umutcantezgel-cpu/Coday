import React from 'react';

const Newsletter: React.FC = () => {
    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center">
                <div className="relative w-full max-w-lg mx-auto aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                    <img
                        src="/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp"
                        alt="Newsletter"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent" />
                </div>

                <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                    Der Insider Newsletter
                </h1>
                <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Tritt 10.000+ Gründern bei und erhalte wöchentlich die besten Strategien für digitales Wachstum direkt in dein Postfach. Kein Spam. Nur Value.
                </p>

                <form className="max-w-md mx-auto bg-white p-2 rounded-2xl shadow-xl border border-aurora-mist mb-8 flex">
                    <input
                        type="email"
                        placeholder="Deine beste E-Mail Adresse"
                        className="flex-1 px-6 py-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                        Anmelden
                    </button>
                </form>

                <p className="text-sm text-slate-400">
                    Wir respektieren deine Privatsphäre. Abmeldung jederzeit möglich.
                </p>
            </div>
        </div>
    );
};

export default Newsletter;
