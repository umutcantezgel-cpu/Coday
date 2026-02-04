import React from 'react';
import BlurText from '../../components/shared/ui/BlurText';
import GradientText from '../../components/shared/ui/GradientText';
import CountUp from '../../components/shared/ui/CountUp';

const Performance: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Performance Engineering</span>
                    <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
                        <BlurText
                            text="Speed is"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="inline-block mr-4"
                        />
                        <GradientText colors={['#FFD700', '#FF8C00', '#FF4500']} animationSpeed={3} className="inline-block">
                            Revenue.
                        </GradientText>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                        Jede Millisekunde zählt. Wir optimieren Ihre Web-Vitals für maximale Conversion und User Experience.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-surface-dark text-white">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-black text-primary mb-2"><CountUp from={0} to={99} duration={2} />%</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Google PageSpeed</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary mb-2"><CountUp from={0} to={0.5} duration={2} />s</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">LCP (Load Time)</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary mb-2">0</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Layout Shift</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary mb-2">100%</div>
                        <div className="uppercase tracking-widest text-sm text-gray-400">Green Hosting</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Performance;
