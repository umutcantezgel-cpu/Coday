import React from 'react';
import BlurText from '../../components/shared/ui/BlurText';
import GradientText from '../../components/shared/ui/GradientText';
import CountUp from '../../components/shared/ui/CountUp';
import SpeedSimulator from '../../components/features/performance/SpeedSimulator';
import LostRevenueCalc from '../../components/features/performance/LostRevenueCalc';
import CoreWebVitalsChart from '../../components/features/performance/CoreWebVitalsChart';

const Performance: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Geschwindigkeits-Optimierung</span>
                    <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
                        <BlurText
                            text="Geschwindigkeit ist"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="inline-block mr-4"
                        />
                        <GradientText colors={['#FFD700', '#FF8C00', '#FF4500']} animationSpeed={3} className="inline-block">
                            Umsatz.
                        </GradientText>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                        Jede Millisekunde zählt. Wir optimieren Ihre Ladezeiten für maximale Kundenabschlüsse und Benutzerfreundlichkeit.
                    </p>
                </div>
            </section>

            {/* Speed Simulator - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 -mt-12 relative z-20">
                <SpeedSimulator />
            </section>

            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Google Ladezeit-Werte</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-4">
                        Rankingfaktor Nr.1: Benutzerfreundlichkeit
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Google misst nicht nur Schlüsselwörter, sondern wie sich Ihre Seite <i>anfühlt</i>. Wir optimieren alle 3 Ladezeit-Werte für beste Bewertungen.
                    </p>
                </div>
                <CoreWebVitalsChart />
            </section>

            {/* Lost Revenue Calculator - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <LostRevenueCalc />
            </section>

            <section className="py-24 bg-surface-dark text-white">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-black text-primary mb-2"><CountUp from={0} to={99} duration={2} />%</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Google Seitenbewertung</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary mb-2"><CountUp from={0} to={0.5} duration={2} />s</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Ladezeit</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary mb-2">0</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Visuelle Verschiebung</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary mb-2">100%</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Öko-Webspace</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Performance;
