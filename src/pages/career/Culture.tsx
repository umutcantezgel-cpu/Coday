import React from 'react';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import ValuesDeck from '../../features/culture/ValuesDeck';
import TeamGallery from '../../features/culture/TeamGallery';

const Culture: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Die DNA</span>
                    <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-6 tracking-tight">
                        <BlurText
                            text="Wir sind anders."
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="inline-block mr-4"
                        />
                        <br className="hidden md:block" />
                        <GradientText colors={['#F59E0B', '#EF4444', '#EC4899']} animationSpeed={5} className="inline-block">
                            Und das ist gut so.
                        </GradientText>
                    </h1>
                    <p className="text-2xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Keine Agentur wie jede andere. Wir sind ein Team aus Nerds, Designern und Strategen mit einem Ziel: Wir dominieren Märkte.
                    </p>
                </div>
            </section>

            {/* Values Section - NEW HIGH COMPLEXITY */}
            <section className="py-24 bg-surface-dark overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <ValuesDeck />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="font-display font-bold text-4xl text-white mb-6">Unsere Regeln.</h2>
                            <p className="text-xl text-gray-400 mb-8">
                                Kultur ist das, was passiert, wenn niemand hinschaut. Diese Prinzipien leiten jede Entscheidung, die wir treffen.
                            </p>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500 material-symbols-outlined">check_circle</span>
                                    <span>100% Fernarbeit, 100% Fokus</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500 material-symbols-outlined">check_circle</span>
                                    <span>Radikale Ehrlichkeit</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500 material-symbols-outlined">check_circle</span>
                                    <span>Ergebnisse statt Zeit absitzen</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-4xl text-secondary mb-4">Die Köpfe dahinter</h2>
                        <p className="text-slate-600">Menschen machen den Unterschied.</p>
                    </div>
                    <TeamGallery />
                </div>
            </section>

        </div>
    );
};

export default Culture;
