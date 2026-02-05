import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CountUp from '../../../components/shared/ui/CountUp';
import BlurText from '../../../components/shared/ui/BlurText';
import { Input } from '../../../components/shared/ui/Input';

const Ecommerce: React.FC = () => {
    // ROI Calculator State
    const [monthlyVisitors, setMonthlyVisitors] = useState(10000);
    const [conversionRate, setConversionRate] = useState(1.5);
    const [avgOrderValue, setAvgOrderValue] = useState(50);

    // Derived values
    const currentRevenue = monthlyVisitors * (conversionRate / 100) * avgOrderValue;
    const optimizedRevenue = monthlyVisitors * ((conversionRate + 0.5) / 100) * (avgOrderValue * 1.1); // +0.5% CR, +10% AOV
    const monthlyIncrease = optimizedRevenue - currentRevenue;
    const yearlyIncrease = monthlyIncrease * 12;

    return (
        <div className="bg-background-light font-sans text-text-light">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-6">
                                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                            </div>
                            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                                <BlurText
                                    text="E-Commerce, der"
                                    delay={100}
                                    animateBy="words"
                                    direction="top"
                                    className="block"
                                />
                                <span className="text-primary">verkauft.</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                                Wir bauen High-Performance Shops mit Shopify und WooCommerce. Keine Standard-Themes, sondern conversion-optimierte Verkaufsmaschinen.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all">
                                    Shop Projekt starten
                                </NavLink>
                                <NavLink to="/work" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all">
                                    Referenzen ansehen
                                </NavLink>
                            </div>
                        </div>
                        {/* Visual Placeholder */}
                        <div className="relative hidden lg:block">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-60"></div>
                            <div className="relative glass-card p-8 rounded-3xl border border-white/50 bg-white/60 backdrop-blur-xl shadow-glass">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Conversion Rate</div>
                                            <div className="text-2xl font-bold text-gray-900">+<CountUp from={0} to={45} duration={1.5} />%</div>
                                        </div>
                                        <div className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">▲ vs. Vorjahr</div>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Ladezeit</div>
                                            <div className="text-2xl font-bold text-gray-900"><CountUp from={0} to={0.8} duration={1.5} />s</div>
                                        </div>
                                        <div className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">Core Vitals: <CountUp from={0} to={100} duration={1.5} /></div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-2">Technologie</div>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">Shopify Plus</span>
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">Hydrogen</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator - SIMPLIFIED FOR EVERYONE */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="bg-secondary text-white rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden relative">
                    {/* Background Glow */}
                    <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Umsatz-Rechner</span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                                Wie viel mehr kannst du verdienen?
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Ein schnellerer Shop = mehr Käufer = mehr Umsatz. <br />
                                <strong className="text-white">Gib deine Zahlen ein und sieh das Ergebnis sofort.</strong>
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2 font-bold">
                                        Wie viele Besucher hast du pro Monat?
                                    </label>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="100000"
                                        step="1000"
                                        value={monthlyVisitors}
                                        onChange={(e) => setMonthlyVisitors(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="text-right font-mono text-primary font-bold mt-1">{monthlyVisitors.toLocaleString()} Besucher</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-2 font-bold">
                                            Von 100 Besuchern kaufen...
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                step="0.1"
                                                inputMode="decimal"
                                                value={conversionRate}
                                                onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                                                className="font-mono"
                                                wrapperClassName="w-full"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Personen</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-2 font-bold">
                                            Durchschnittlicher Einkauf
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                inputMode="decimal"
                                                value={avgOrderValue}
                                                onChange={(e) => setAvgOrderValue(parseFloat(e.target.value))}
                                                className="font-mono"
                                                wrapperClassName="w-full"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Dein Ergebnis nach der Optimierung</h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 text-sm">Mehr Umsatz pro Monat</span>
                                    <span className="text-2xl font-bold text-green-400 font-mono">
                                        +<CountUp from={0} to={Math.round(monthlyIncrease)} duration={1} /> €
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 text-sm">Mehr Umsatz pro Jahr</span>
                                    <span className="text-4xl font-black text-primary font-mono">
                                        +<CountUp from={0} to={Math.round(yearlyIncrease)} duration={1.5} /> €
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 text-center">
                                So funktioniert's: Ein schnellerer Shop überzeugt mehr Besucher zu kaufen (+0.5%) und sie geben im Schnitt mehr aus (+10%).
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shopify vs Custom - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Das richtige System wählen</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Wir beraten technologie-agnostisch. Hier ein Vergleich unserer Top-Lösungen.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Shopify Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-[#95BF47] relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#95BF47]/20 rounded-xl flex items-center justify-center text-[#5E8E3E] font-bold text-xl">
                                <span className="material-symbols-outlined">shopping_bag</span>
                            </div>
                            <h3 className="font-bold text-2xl text-gray-900">Shopify Plus</h3>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Beste Time-to-Market (Start in < 4 Wochen)",
                                "Wartungsfreies Hosting & Sicherheit",
                                "Riesiges App-Ökosystem",
                                "Perfekt für DTC Brands bis 50M € Umsatz"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start text-gray-600 text-sm">
                                    <span className="material-symbols-outlined text-green-500 mr-2 text-lg shrink-0">check</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto bg-gray-50 p-4 rounded-xl text-center text-sm font-bold text-gray-500">
                            Empfehlung für: Lifestyle Brands, Fashion, Startups
                        </div>
                    </div>

                    {/* Custom/Headless Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-primary relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                                <span className="material-symbols-outlined">code</span>
                            </div>
                            <h3 className="font-bold text-2xl text-gray-900">Custom Headless</h3>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Maximale Performance (0.5s Load Time)",
                                "Völlige Freiheit im Frontend-Design",
                                "Komplexe Produktkonfiguratoren möglich",
                                "Perfekt für B2B & komplexe Enterprise-Shops"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start text-gray-600 text-sm">
                                    <span className="material-symbols-outlined text-green-500 mr-2 text-lg shrink-0">check</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto bg-gray-50 p-4 rounded-xl text-center text-sm font-bold text-gray-500">
                            Empfehlung für: B2B, Hidden Champions, Individualisten
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Mehr als nur ein Online-Shop</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Ein Shop muss nicht nur gut aussehen, er muss funktionieren. Wir fokussieren uns auf die Metriken, die zählen.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Shopify & Plus", icon: "storefront", desc: "Skalierbare Enterprise-Lösungen mit Shopify 2.0 und Hydrogen." },
                            { title: "Headless Commerce", icon: "hub", desc: "Maximale Performance und Flexibilität durch entkoppeltes Frontend." },
                            { title: "Performance First", icon: "speed", desc: "Rasante Ladezeiten für besseres Ranking und höhere Conversion." },
                            { title: "ERP Integration", icon: "sync_alt", desc: "Nahtlose Anbindung an SAP, Weclapp, Xentral und Co." },
                            { title: "Custom Checkout", icon: "shopping_bag", desc: "Optimierter Checkout-Flow für weniger Kaufabbrüche." },
                            { title: "Mobile Optimized", icon: "smartphone", desc: "Perfect Shopping Experience auf jedem Device." }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">{feature.icon}</span>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 bg-surface-light border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6">Unser Tech Stack</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Wir setzen auf bewährte Marktführer und modernste Headless-Technologien. Egal ob Shopify für schnellen Go-to-Market oder Custom-Lösungen für komplexe Anforderungen.
                            </p>
                            <ul className="space-y-4">
                                {['Shopify / Shopify Plus', 'WooCommerce', 'Next.js Commerce', 'Stripe & PayPal', 'Klaviyo Email Marketing'].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 font-medium">
                                        <span className="material-symbols-outlined text-primary mr-3">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-center h-32 border border-gray-100 font-bold text-gray-400 text-xl">Shopify</div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-center h-32 border border-gray-100 font-bold text-gray-400 text-xl">WooCommerce</div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-center h-32 border border-gray-100 font-bold text-gray-400 text-xl">React</div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-center h-32 border border-gray-100 font-bold text-gray-400 text-xl">Stripe</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6">Bereit zu skalieren?</h2>
                    <p className="text-xl text-gray-600 mb-8">Lassen Sie uns Ihren Online-Shop auf das nächste Level heben.</p>
                    <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all">
                        Jetzt Beratung anfragen
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default Ecommerce;
