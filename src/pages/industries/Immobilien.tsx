import React from 'react';
import BlurText from '../../components/shared/ui/BlurText';
import GradientText from '../../components/shared/ui/GradientText';
import VirtualTourTeaser from '../../components/features/industries/real-estate/VirtualTourTeaser';
import DigitalExposeDemo from '../../components/features/industries/real-estate/DigitalExposeDemo';
import PropertyRoiCalculator from '../../components/features/industries/real-estate/PropertyRoiCalculator';

const Immobilien: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Immobilien Marketing</span>
                            <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                                <BlurText
                                    text="Immobilien verkaufen,"
                                    delay={100}
                                    animateBy="words"
                                    direction="top"
                                    className="inline-block"
                                />
                                <br />
                                <GradientText colors={['#3B82F6', '#6366F1', '#8B5CF6']} animationSpeed={4} className="inline-block">
                                    bevor Sie besichtigen.
                                </GradientText>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                Sparen Sie sich den Besichtigungstourismus. Mit digitalen Exposés und virtuellen Touren filtern Sie Interessenten automatisch.
                            </p>
                            <div className="flex gap-4 mb-12">
                                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                                    Demo anfordern
                                </button>
                            </div>

                            <PropertyRoiCalculator />
                        </div>

                        <div className="relative">
                            <div className="absolute top-0 right-0 w-full h-full bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                            <VirtualTourTeaser />
                            <p className="text-center text-xs text-gray-400 mt-4">
                                *Interaktives Beispiel einer 360° Tour Integration
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Digital Expose Section - NEW HIGH COMPLEXITY */}
            <section className="py-24 bg-surface-dark relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-16 text-center">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Marketing der Zukunft</span>
                        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6">
                            Das Ende des PDF-Anhangs.
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            PDFs sind statisch. Web-Exposés leben. Begeistern Sie Eigentümer schon im Einkaufsgespräch mit modernster Technologie.
                        </p>
                    </div>

                    <DigitalExposeDemo />
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: 'view_in_ar', title: 'Virtuelles Staging', desc: 'Leere Räume digital möblieren. Emotionen wecken ohne Möbel schleppen.' },
                            { icon: 'domain_verification', title: 'Eigentümer-Login', desc: 'Volle Transparenz für Ihre Auftraggeber. Live-Status aller Aktivitäten.' },
                            { icon: 'alternate_email', title: 'Autom. Nachfassen', desc: 'E-Mail-Sequenzen für Interessenten, die noch nicht bereit sind.' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <h3 className="font-bold text-xl text-secondary mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Immobilien;
