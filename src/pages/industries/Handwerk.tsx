import React from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { serviceImages } from '../../data/serviceImages';
import CraftsmanLeadCalculator from '../../features/industries/handwerk/CraftsmanLeadCalculator';
import RecruitingFunnelDemo from '../../features/industries/handwerk/RecruitingFunnelDemo';
import LocalDominanceMap from '../../features/industries/handwerk/LocalDominanceMap';

const Handwerk: React.FC = () => {
    const { t } = useTranslation('industries');

    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">{t('handwerk.hero.label')}</span>
                            <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                                <BlurText
                                    text={t('handwerk.hero.title_1')}
                                    delay={100}
                                    animateBy="words"
                                    direction="top"
                                    className="inline-block mr-2"
                                />
                                <br />
                                <GradientText colors={['#F59E0B', '#D97706', '#B45309']} animationSpeed={4} className="inline-block">
                                    {t('handwerk.hero.title_2')}
                                </GradientText>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                {t('handwerk.hero.description')}
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                                    {t('common.cta_analysis')}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <CraftsmanLeadCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* Recruiting Section - NEW HIGH COMPLEXITY */}
            {/* Recruiting Section - NEW HIGH COMPLEXITY */}
            <section className="py-24 bg-aurora-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">{t('handwerk.recruiting.label')}</span>
                        <h2 className="font-display font-bold text-3xl sm:text-5xl text-secondary mb-6">
                            {t('handwerk.recruiting.title')}<br />{t('handwerk.recruiting.subtitle')}
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            {t('handwerk.recruiting.description')}
                        </p>
                    </div>

                    <RecruitingFunnelDemo />
                </div>
            </section>

            {/* Local SEO Section - NEW HIGH COMPLEXITY */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <LocalDominanceMap />
                        </div>

                        <div className="order-1 lg:order-2">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">{t('handwerk.local_seo.label')}</span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                                {t('handwerk.local_seo.title')}
                            </h2>
                            <p className="text-lg text-slate-600 mb-6">
                                {t('handwerk.local_seo.description')}
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-slate-700 font-bold">
                                    <span className="material-symbols-outlined text-green-500 mr-3">check_circle</span>
                                    {t('common.features.google_maps')}
                                </li>
                                <li className="flex items-center text-slate-700 font-bold">
                                    <span className="material-symbols-outlined text-green-500 mr-3">check_circle</span>
                                    {t('common.features.regional_pages')}
                                </li>
                                <li className="flex items-center text-slate-700 font-bold">
                                    <span className="material-symbols-outlined text-green-500 mr-3">check_circle</span>
                                    {t('common.features.review_management')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Handwerk;
