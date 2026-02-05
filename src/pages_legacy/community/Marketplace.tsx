import React from 'react';
import { NavLink } from 'react-router-dom';

const integrations = [
    { name: 'Shopify', category: 'E-Commerce', icon: 'shopping_bag', color: 'bg-green-500' },
    { name: 'Salesforce', category: 'CRM', icon: 'cloud', color: 'bg-blue-500' },
    { name: 'Slack', category: 'Communication', icon: 'chat', color: 'bg-purple-500' },
    { name: 'HubSpot', category: 'Marketing', icon: 'hub', color: 'bg-orange-500' },
    { name: 'Stripe', category: 'Payments', icon: 'payments', color: 'bg-indigo-500' },
    { name: 'Zapier', category: 'Automation', icon: 'bolt', color: 'bg-amber-500' },
];

const Marketplace: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block py-1 px-3 rounded-full bg-blue-50 text-aurora-sapphire text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                        Ecosystem
                    </div>
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Unser <span className="text-gradient-vivid">Marktplatz</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Erweitere deine Agency Domination Experience mit über 50+ Integrationen und Add-ons.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {['Alle', 'E-Commerce', 'CRM', 'Marketing', 'Automation'].map((cat) => (
                        <button key={cat} className="px-6 py-2 rounded-full bg-white border border-gray-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {integrations.map((item) => (
                        <div key={item.name} className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-aurora-lg transition-all duration-300 hover:-translate-y-1">
                            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{item.category}</div>
                            <h3 className="font-display font-bold text-2xl mb-4 text-gray-900">{item.name}</h3>
                            <p className="text-slate-500 mb-6 line-clamp-2">
                                Nahtlose Integration für maximale Performance und Skalierbarkeit deiner Prozesse.
                            </p>
                            <NavLink to="#" className="inline-flex items-center text-aurora-sapphire font-bold hover:underline">
                                Installieren <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </NavLink>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 p-12 rounded-3xl bg-gradient-ocean text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="font-display font-bold text-3xl mb-4">Fehlt dir etwas?</h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Wir bauen ständig neue Integrationen. Sag uns, was du brauchst.
                        </p>
                        <button className="px-8 py-3 bg-white text-aurora-sapphire rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg">
                            Integration vorschlagen
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
