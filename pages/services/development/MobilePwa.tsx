import React from 'react';
import BlurText from '../../../components/shared/ui/BlurText';
import GradientText from '../../../components/shared/ui/GradientText';

const MobilePwa: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Mobile First</span>
                    <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
                        <BlurText
                            text="App-like"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="inline-block mr-4"
                        />
                        <GradientText colors={['#EC4899', '#8B5CF6', '#6366F1']} animationSpeed={6} className="inline-block">
                            Experience.
                        </GradientText>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                        Progressive Web Apps (PWA) verbinden das Beste aus Web und App. Installierbar, offline-fähig und rasend schnell.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MobilePwa;
