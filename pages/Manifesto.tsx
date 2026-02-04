import React from 'react';
import { NavLink } from 'react-router-dom';
import { OptimizedImage } from '../shared/ui/OptimizedImage';

const Manifesto: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block py-1 px-3 rounded-full bg-red-900/30 text-red-500 text-xs font-bold uppercase tracking-wider mb-6 border border-red-900 animate-pulse">
                        Das Protokoll
                    </div>
                    <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter leading-none mb-8 uppercase">
                        Wir sind der <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 glitch-text">Widerstand.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Das traditionelle Agenturmodell ist tot. Es weiß es nur noch nicht. Wir sind hier, um es zu begraben.
                    </p>
                </div>

                {/* The Problem */}
                <section className="mb-24 relative">
                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-transparent opacity-50 hidden lg:block"></div>
                    <h2 className="text-3xl font-bold mb-8 text-red-500 uppercase">Der Feind</h2>
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p>
                            Zu lange wurden Unternehmen von "Full Service Agenturen" in Geiselhaft genommen.
                        </p>
                        <ul className="list-none space-y-4 pl-0">
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-red-500 mr-4">close</span>
                                <span><strong>Sie sind langsam.</strong> Wochen für eine einfache Änderung. Monate für einen Launch.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-red-500 mr-4">close</span>
                                <span><strong>Sie sind intransparent.</strong> Versteckte Gebühren. Retainer fürs Nichtstun. Du kaufst Stunden, keine Ergebnisse.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-red-500 mr-4">close</span>
                                <span><strong>Sie sind aufgebläht.</strong> Du bezahlst für ihr Büro, ihren Ping-Pong-Tisch und ihre "Account Manager", die keine Zeile Code schreiben.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* The Solution */}
                <section className="mb-24 relative">
                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-transparent opacity-50 hidden lg:block"></div>
                    <h2 className="text-3xl font-bold mb-8 text-green-500 uppercase">Der Coday Weg</h2>
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p>
                            Wir sind keine Agentur. Wir sind ein Protokoll für Dominanz.
                        </p>
                        <ul className="list-none space-y-4 pl-0">
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-green-400 mr-4">check</span>
                                <span><strong>Geschwindigkeit ist unsere Religion.</strong> Wir liefern. Schnell. LCP unter 1s. Deployments in Minuten.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-green-400 mr-4">check</span>
                                <span><strong>Totale Transparenz.</strong> Du siehst den Code. Dir gehört der Code. Kein Lock-in.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="material-symbols-outlined text-green-400 mr-4">check</span>
                                <span><strong>Nur Elite.</strong> Keine Junioren. Keine Mittelsmänner. Du sprichst mit den Leuten, die dein Produkt bauen.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center bg-zinc-900 border border-zinc-800 p-12 rounded-3xl">
                    <h3 className="font-display font-bold text-3xl mb-6">Wähle deine Seite.</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Du kannst weiter Geld mit den Dinosauriern verbrennen. Oder du schließt dich dem Widerstand an und dominierst deinen Markt.
                    </p>
                    <NavLink to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black rounded-xl bg-white hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-2xl uppercase tracking-widest">
                        Schließ dich an
                        <span className="material-symbols-outlined ml-2">bolt</span>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default Manifesto;
