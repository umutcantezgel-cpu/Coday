import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BlurText from '../../shared/ui/BlurText';
import { servicesData } from '../../data/services';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { brandingImages } from '../../data/serviceImages';
import DesignSystemShowcase from '../../features/web-design/DesignSystemShowcase';
import PsychologyGrid from '../../features/web-design/PsychologyGrid';
import BeforeAfterReveal from '../../features/web-design/BeforeAfterReveal';
import { Icon } from '../../shared/ui/Icon';

const WebDesign: React.FC = () => {
    // Fallback if key doesn't match perfectly, but it should be 'web-design'
    const categoryData = servicesData["web-design"];
    const features = Object.values(categoryData);
    const [activeTab, setActiveTab] = useState<'typography' | 'color' | 'components'>('typography');

    return (
        <div className="bg-background-light pt-24 pb-16">
            {/* Hero Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center lg:text-left">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Design & Benutzerfreundlichkeit</span>
                        <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6">
                            <BlurText
                                text="Preisgekröntes"
                                delay={100}
                                animateBy="words"
                                direction="top"
                                className="block"
                            />
                            <span className="text-primary">Webdesign.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl lg:mx-0 mx-auto">
                            Design, das nicht nur gut aussieht, sondern verkauft. Wir verbinden Ästhetik mit Psychologie für digitale Erlebnisse, die im Kopf bleiben.
                        </p>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 scale-95"></div>
                        <OptimizedImage
                            src={brandingImages.hero.src}
                            alt={brandingImages.hero.alt}
                            className="relative rounded-[2rem] shadow-flat-lg w-full transform -rotate-2 hover:rotate-0 transition-all duration-500 bg-white p-2"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Design System Showcase - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Baustein-Design</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                            Wir designen Systeme, <br /> keine Seiten.
                        </h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Ein Design-System ist die einzige Wahrheitsquelle für Ihre Marke. Es garantiert Einheitlichkeit über alle Kanäle hinweg und beschleunigt die Entwicklung neuer Funktionen um bis zu 300%.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Skalierbare Design-Tokens (Farben, Spacing, Typo)",
                                "Wiederverwendbare Komponenten-Bibliothek",
                                "Barrierefreiheit (a11y) standardmäßig integriert",
                                "Dark Mode & Multi-Brand Unterstützung"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                                    <Icon name="check_circle" className="text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <DesignSystemShowcase />
                </div>
            </section>

            {/* Before/After Visual - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Hochwertige Umgestaltung</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-4">
                        Der Unterschied ist messbar.
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Sehen Sie selbst, wie wir aus einer veralteten "Visitenkarte im Netz" eine schnelle Verkaufsmaschine machen.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <BeforeAfterReveal />
                </div>
            </section>

            {/* Psychology of UI - NEW HIGH COMPLEXITY SECTION */}
            <section className="bg-surface-light py-24 mb-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Verhaltens-Design</span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                                Design, das im Kopf bleibt.
                            </h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Wir nutzen Prinzipien der Verhaltenspsychologie, um Nutzer intuitiv zu führen und Verkaufs-Hürden abzubauen.
                            </p>
                        </div>
                    </div>

                    <PsychologyGrid />
                </div>
            </section>

            {/* UX Process Timeline - EXISTING BUT REFINED */}
            <section className="bg-secondary py-24 mb-24 text-white overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">Der Weg zum perfekten Interface</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Wir überlassen nichts dem Zufall. Unser UX-Prozess basiert auf Daten, Nutzer-Feedback und iterativen Verbesserungen.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden lg:block"></div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Erkundung", desc: "Nutzerforschung und Gespräche. Wir verstehen das 'Warum'." },
                                { step: "02", title: "Struktur", desc: "Grobe Skizzen ohne Ablenkung. Fokus auf Informationsarchitektur." },
                                { step: "03", title: "Visuelles Design", desc: "Detaillierte Oberfläche. Typografie, Farben und kleine Animationen." },
                                { step: "04", title: "Prototyp", desc: "Klickbare Modelle. Testen mit echten Nutzern vor der Programmierung." }
                            ].map((phase, idx) => (
                                <div key={idx} className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                                    <div className="absolute -top-6 left-8 bg-primary text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-4 border-secondary group-hover:scale-110 transition-transform">
                                        {phase.step}
                                    </div>
                                    <h3 className="font-bold text-xl mt-4 mb-3">{phase.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{phase.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Grid */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <NavLink
                            key={index}
                            to={`/services/web-design/${feature.slug}`}
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

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-4 text-center">
                <div className="bg-primary rounded-3xl p-12 shadow-flat-lg text-white">
                    <h2 className="font-display font-bold text-3xl mb-6">Wollen Sie aus der Masse herausstechen?</h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        08/15 Templates waren gestern. Wir designen Ihre digitale Identität.
                    </p>
                    <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary rounded-xl bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all">
                        Design anfragen
                        <Icon name="palette" className="ml-2" />
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default WebDesign;
