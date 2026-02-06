import React from 'react';
import { NavLink } from 'react-router-dom';
import { servicesData } from '../../data/services';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { webDevImages } from '../../data/serviceImages';
import BlurText from '../../shared/ui/BlurText';
import ArchitectureVisualizer from '../../features/web-dev/ArchitectureVisualizer';
import CodeQualitySimulator from '../../features/web-dev/CodeQualitySimulator';
import SecurityGrid from '../../features/web-dev/SecurityGrid';
import { Icon } from '../../shared/ui/Icon';

const WebDevelopment: React.FC = () => {
    const categoryData = servicesData["web-development"];
    const features = Object.values(categoryData);

    return (
        <div className="bg-background-light pt-24 pb-16">
            {/* Hero Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center lg:text-left">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Technologie-Paket</span>
                        <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6">
                            <BlurText
                                text="Schnelle"
                                delay={100}
                                animateBy="words"
                                direction="top"
                                className="block"
                            />
                            <span className="text-primary">Web-Entwicklung.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl lg:mx-0 mx-auto">
                            Wir bauen keine "Homepages", wir bauen digitale Vermögenswerte. Skalierbar, sicher und blitzschnell. Spezialisiert auf moderne Web-Anwendungen und komplexe Online-Shops.
                        </p>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-2 scale-105"></div>
                        <OptimizedImage
                            src={webDevImages.hero.src}
                            alt={webDevImages.hero.alt}
                            className="relative rounded-3xl shadow-flat-lg w-full transform -rotate-1 hover:rotate-0 transition-all duration-500 bg-white p-2"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Deep-Dive Tech Stack - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-4">
                        Professionelle Architektur
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Unser Technologie-Paket ist kein Zufall. Jedes Werkzeug wurde für maximale Geschwindigkeit, Skalierbarkeit und Suchmaschinen-Dominanz ausgewählt.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Next.js 14",
                            desc: "Serverseitiges Laden und statische Erzeugung für extrem schnelle Ladezeiten.",
                            icon: "layers"
                        },
                        {
                            title: "TypeScript",
                            desc: "Typsicherer Code, der Fehler verhindert bevor sie passieren.",
                            icon: "code"
                        },
                        {
                            title: "Supabase",
                            desc: "Echtzeit-Datenbanken und Anmeldung. Skalierbar und quelloffen.",
                            icon: "database"
                        },
                        {
                            title: "Tailwind CSS",
                            desc: "Modernes Styling für minimale Datei-Größen.",
                            icon: "brush"
                        }
                    ].map((tech, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-surface-light rounded-xl flex items-center justify-center text-primary mb-4">
                                <Icon name={tech.icon} />
                            </div>
                            <h3 className="font-bold text-lg text-secondary mb-2">{tech.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{tech.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <NavLink
                            key={index}
                            to={`/services/web-development/${feature.slug}`}
                            className="bg-white p-8 rounded-2xl shadow-flat border border-gray-100 hover:shadow-flat-lg transition-all duration-300 group hover:-translate-y-1 block relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                                <Icon name={feature.icon} />
                            </div>
                            <h3 className="font-display font-bold text-xl text-secondary mb-3 group-hover:text-primary transition-colors relative z-10">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-4 relative z-10">
                                {feature.description}
                            </p>
                            <div className="text-primary font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 relative z-10">
                                Mehr erfahren <Icon name="arrow_forward" className="ml-1 text-sm" />
                            </div>
                        </NavLink>
                    ))}
                </div>
            </section>

            {/* Performance Metrics Visual - NEW HIGH COMPLEXITY SECTION */}
            {/* Performance Metrics Visual - NEW HIGH COMPLEXITY SECTION */}
            <section className="bg-gray-50 py-24 mb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Ladezeit-Werte</span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                                Geschwindigkeit ist Umsatz. <br /> Wir optimieren jede Millisekunde.
                            </h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Google bestraft langsame Seiten. Nutzer verlassen sie. Unsere Architekturen sind auf beste Bewertungen optimiert.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { label: "Größte sichtbare Inhalte", val: "0.8s", bar: "w-[95%]" },
                                    { label: "Erste Reaktionszeit", val: "12ms", bar: "w-[98%]" },
                                    { label: "Visuelle Stabilität", val: "0.00", bar: "w-[100%]" }
                                ].map((metric, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm font-bold text-secondary mb-2">
                                            <span>{metric.label}</span>
                                            <span className="text-primary">{metric.val}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className={`h-full bg-primary rounded-full ${metric.bar}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Simulation Visual */}
                        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 relative">
                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex justify-center items-center h-[300px]">
                                <div className="text-center">
                                    <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-4">
                                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1A9A9A" strokeWidth="2" strokeDasharray="100, 100" className="animate-[dash_1.5s_ease-out_forwards]" />
                                        </svg>
                                        <span className="absolute text-5xl font-black text-secondary">100</span>
                                    </div>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Geschwindigkeitswert</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Visual - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Architektur</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                            Entkoppelt. Serverlos. <br /> Grenzenlos.
                        </h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Wir setzen auf eine moderne entkoppelte Architektur. Die Daten sind vom Design getrennt. Das Ergebnis: Unendliche Flexibilität und maximale Sicherheit.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Inhalte werden weltweit im Netzwerk zwischengespeichert (<50ms)",
                                "Keine direkten Datenbank-Zugriffe vom Browser",
                                "Statische Erzeugung für sofortiges Laden",
                                "Automatische Bild-Optimierung und verzögertes Laden"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                                    <Icon name="check_circle" className="text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ArchitectureVisualizer />
                </div>
            </section>

            {/* Comparison Table - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50 text-center">
                        <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">Technologie-Vergleich</span>
                        <h2 className="font-display font-bold text-3xl text-gray-900">
                            Warum Next.js vs. WordPress?
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="p-6 text-left text-sm font-semibold text-gray-500 w-1/3">Funktion</th>
                                    <th className="p-6 text-center text-sm font-bold text-gray-900 w-1/3 bg-gray-50">Wordpress / Baukasten</th>
                                    <th className="p-6 text-center text-sm font-bold text-white bg-secondary w-1/3">Coday Next.js Stack</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feat: "Ladezeit", bad: "2.5s - 5.0s", good: "< 0.8s" },
                                    { feat: "Sicherheit", bad: "Erweiterungs-Sicherheitslücken", good: "Statische und serverseitige Sicherheit" },
                                    { feat: "Skalierbarkeit", bad: "Begrenzt durch Server/Datenbank", good: "Weltweites Netzwerk" },
                                    { feat: "Wartung", bad: "Ständige Aktualisierungen nötig", good: "Automatisierte Veröffentlichung" },
                                    { feat: "Suchmaschinen", bad: "Basis-Funktionen", good: "Technische Suchmaschinen-Dominanz" }
                                ].map((row, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/30">
                                        <td className="p-6 text-sm font-bold text-gray-700">{row.feat}</td>
                                        <td className="p-6 text-center text-sm text-gray-500 bg-gray-50/50">{row.bad}</td>
                                        <td className="p-6 text-center text-sm text-primary font-bold bg-secondary/5 border-l border-r border-gray-100">{row.good}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Security Grid Insertion */}
                <div className="mt-16 text-center">
                    <h3 className="font-display font-bold text-2xl text-secondary mb-8">Professionelle Sicherheitsstandards</h3>
                    <SecurityGrid />
                </div>
            </section>

            {/* Process Section with Visual */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="bg-surface-light rounded-3xl p-8 lg:p-12 shadow-flat border border-gray-100 overflow-hidden relative">
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Der Prozess</span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                                Sauberer Code. <br /> Keine Kompromisse.
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Wir schreiben Code, der auch in 3 Jahren noch wartbar ist. Type-Safe, getestet und dokumentiert.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    { title: "Architektur und Technologie-Paket", desc: "Next.js, TypeScript, Supabase" },
                                    { title: "Komponenten und Design", desc: "Baustein-Design-System" },
                                    { title: "Geschwindigkeitsoptimierung", desc: "Ladezeit-Werte Optimierung" },
                                    { title: "Automatisches Testen", desc: "Automatisierte Veröffentlichung und Tests" }
                                ].map((step, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary font-bold mr-4 mt-1 shrink-0 shadow-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">{step.title}</h4>
                                            <p className="text-sm text-slate-500">{step.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <CodeQualitySimulator />

                        </div>
                        <div className="hidden md:block relative pl-12">
                            {/* Decorative Code Snippet */}
                            <div className="rounded-2xl bg-secondary shadow-flat-lg p-6 overflow-hidden relative rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-700">
                                <div className="font-mono text-xs text-slate-300 opacity-90 leading-relaxed">
                                    <span className="text-accent">const</span> <span className="text-primary">App</span> = () ={'>'} {'{'}<br />
                                    &nbsp;&nbsp;<span className="text-accent">const</span> [state, setState] = <span className="text-primary">useState</span>(null);<br /><br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// Schnelles Laden</span><br />
                                    &nbsp;&nbsp;<span className="text-accent">return</span> (<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Suspense</span> fallback={'<'}<span className="text-primary">Loader</span> /&gt;&gt;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-primary">HeroSection</span> visualize=<span className="text-accent">"true"</span> /&gt;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">Suspense</span>&gt;<br />
                                    &nbsp;&nbsp;);<br />
                                    {'}'};
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-4 text-center">
                <div className="bg-primary rounded-3xl p-12 shadow-flat-lg text-white">
                    <h2 className="font-display font-bold text-3xl mb-6">Bereit für echte Geschwindigkeit?</h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Kein Baukasten. Kein Ballast. Nur Code, der verkauft.
                    </p>
                    <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary rounded-xl bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all">
                        Entwickler-Team anfragen
                        <Icon name="rocket_launch" className="ml-2" />
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default WebDevelopment;
