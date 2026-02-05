import React from 'react';
import BlurText from '../../components/shared/ui/BlurText';
import GradientText from '../../components/shared/ui/GradientText';
import PatientJourneyMap from '../../components/features/industries/healthcare/PatientJourneyMap';
import WaitingRoomRoiCalculator from '../../components/features/industries/healthcare/WaitingRoomRoiCalculator';
import TrustBadgeGrid from '../../components/features/industries/healthcare/TrustBadgeGrid';

const Gesundheit: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Praxis-Marketing 4.0</span>
                            <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                                <BlurText
                                    text="Weniger Verwaltung."
                                    delay={100}
                                    animateBy="words"
                                    direction="top"
                                    className="inline-block mr-3"
                                />
                                <br />
                                <GradientText colors={['#10B981', '#34D399', '#059669']} animationSpeed={4} className="inline-block">
                                    Mehr Zeit für Patienten.
                                </GradientText>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                Entlasten Sie Ihr Praxis-Team durch digitale Anamnese, Online-Termine und automatisiertes Recall-Management. DSGVO-konform.
                            </p>
                            <div className="flex gap-4 mb-12">
                                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                                    Praxis-Analyse starten
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <WaitingRoomRoiCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* Patient Journey - NEW HIGH COMPLEXITY */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <PatientJourneyMap />
                </div>
            </section>

            {/* Trust & Compliance Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl text-secondary mb-4">Sicherheit geht vor</h2>
                        <p className="text-slate-600">Medizinische Daten sind sensibel. Unsere Lösungen sind "Made in Germany" und rechtssicher.</p>
                    </div>

                    <TrustBadgeGrid />
                </div>
            </section>

        </div>
    );
};

export default Gesundheit;
