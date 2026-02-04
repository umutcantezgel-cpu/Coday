import React from 'react';
import { NavLink } from 'react-router-dom';
import BlurText from '../../components/shared/ui/BlurText';
import { servicesData } from '../../data/services';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { brandingImages, brandingFeatureMapping } from '../../data/serviceImages';

import { useState } from 'react';

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
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Design & UX</span>
                        <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6">
                            <BlurText
                                text="Award-Winning"
                                delay={100}
                                animateBy="words"
                                direction="top"
                                className="block"
                            />
                            <span className="text-primary">Web Design.</span>
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
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-3">
                        {/* Sidebar */}
                        <div className="bg-secondary p-8 text-white">
                            <h3 className="font-display font-bold text-2xl mb-2">Atomic Design</h3>
                            <p className="text-gray-400 text-sm mb-8">Wir designen Systeme, keine Seiten.</p>

                            <div className="space-y-2">
                                {[
                                    { id: 'typography', label: 'Typography & Type Scale', icon: 'text_fields' },
                                    { id: 'color', label: 'Color Palette & Variables', icon: 'palette' },
                                    { id: 'components', label: 'Interactive Components', icon: 'buttons_alt' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all ${activeTab === tab.id ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <span className="material-symbols-outlined mr-3 text-lg">{tab.icon}</span>
                                        <span className="text-sm">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-2 p-8 lg:p-12 bg-gray-50/50">
                            {activeTab === 'typography' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="border-b border-gray-200 pb-8">
                                        <span className="text-xs font-mono text-gray-400 mb-2 block">Display Heading (H1) • Outfit Bold</span>
                                        <h1 className="font-display font-black text-5xl text-secondary">Digital Excellence.</h1>
                                    </div>
                                    <div className="border-b border-gray-200 pb-8">
                                        <span className="text-xs font-mono text-gray-400 mb-2 block">Section Heading (H2) • Outfit Semibold</span>
                                        <h2 className="font-display font-bold text-3xl text-secondary">Unsere Philosophie</h2>
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono text-gray-400 mb-2 block">Body Text (P) • Inter Regular</span>
                                        <p className="text-slate-600 leading-relaxed max-w-lg">
                                            Gutes Design ist unsichtbar. Es leitet den Nutzer intuitiv zum Ziel, ohne sich in den Vordergrund zu drängen. Wir nutzen Whitespace als aktives Gestaltungselement.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'color' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all">
                                        <div className="space-y-2 group cursor-pointer">
                                            <div className="h-24 rounded-2xl bg-primary shadow-sm group-hover:scale-105 transition-transform"></div>
                                            <div className="text-center">
                                                <p className="font-bold text-secondary text-sm">Primary</p>
                                                <p className="font-mono text-xs text-gray-400">#1A9A9A</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 group cursor-pointer">
                                            <div className="h-24 rounded-2xl bg-secondary shadow-sm group-hover:scale-105 transition-transform"></div>
                                            <div className="text-center">
                                                <p className="font-bold text-secondary text-sm">Secondary</p>
                                                <p className="font-mono text-xs text-gray-400">#111827</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 group cursor-pointer">
                                            <div className="h-24 rounded-2xl bg-[#F3F4F6] border border-gray-200 shadow-sm group-hover:scale-105 transition-transform"></div>
                                            <div className="text-center">
                                                <p className="font-bold text-secondary text-sm">Surface</p>
                                                <p className="font-mono text-xs text-gray-400">#F3F4F6</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 group cursor-pointer">
                                            <div className="h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-sm group-hover:scale-105 transition-transform"></div>
                                            <div className="text-center">
                                                <p className="font-bold text-secondary text-sm">Gradient</p>
                                                <p className="font-mono text-xs text-gray-400">Brand</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'components' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid gap-6">
                                        <div className="flex items-center gap-4">
                                            <button className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                                Primary Button
                                            </button>
                                            <button className="px-6 py-3 bg-white text-secondary font-bold rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-all">
                                                Secondary
                                            </button>
                                        </div>
                                        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm max-w-sm">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                                <div>
                                                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                                                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="h-20 bg-gray-100 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* UX Process Timeline - NEW HIGH COMPLEXITY SECTION */}
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
                                { step: "01", title: "Discovery", desc: "User Research & Stakeholder Interviews. Wir verstehen das 'Warum'." },
                                { step: "02", title: "Wireframing", desc: "Low-Fidelity Struktur ohne Ablenkung. Fokus auf Information Architecture." },
                                { step: "03", title: "Visual Design", desc: "High-Fidelity UI. Typografie, Farben und Mikro-Interaktionen." },
                                { step: "04", title: "Prototyping", desc: "Interaktive Klick-Dummys. Testen mit echten Nutzern vor dem Code." }
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
                                <span className="material-symbols-outlined">{feature.icon}</span>
                            </div>
                            <h3 className="font-display font-bold text-xl text-secondary mb-3 group-hover:text-primary transition-colors relative z-10">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-4 relative z-10">
                                {feature.description}
                            </p>
                            <div className="text-primary font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 relative z-10">
                                Mehr erfahren <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
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
                        <span className="material-symbols-outlined ml-2">palette</span>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default WebDesign;
