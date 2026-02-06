import React from 'react';
import BlurText from '../../../shared/ui/BlurText';
import GradientText from '../../../shared/ui/GradientText';

const HeadlessCms: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Content Management</span>
                    <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
                        <BlurText
                            text="Pure"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="inline-block mr-4"
                        />
                        <GradientText colors={['#3B82F6', '#8B5CF6', '#EC4899']} animationSpeed={6} className="inline-block">
                            Freedom.
                        </GradientText>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                        Weg von monolithischen Systemen. Hin zu flexiblen, API-first Headless CMS Lösungen wie Sanity, Strapi oder Contentful.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HeadlessCms;
