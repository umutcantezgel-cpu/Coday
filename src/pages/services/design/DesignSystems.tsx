import React from 'react';
import BlurText from '../../../shared/ui/BlurText';
import GradientText from '../../../shared/ui/GradientText';

const DesignSystems: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Scalable UI</span>
                    <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
                        <BlurText
                            text="Design that"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="inline-block mr-4"
                        />
                        <GradientText colors={['#F472B6', '#9333EA', '#4F46E5']} animationSpeed={6} className="inline-block">
                            Scales.
                        </GradientText>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                        Konsistenz ist King. Wir entwickeln atomare Design Systeme, die Ihre Marke über alle Touchpoints hinweg einheitlich und effizient machen.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default DesignSystems;
