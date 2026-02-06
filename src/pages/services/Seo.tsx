import React from 'react';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { marketingImages } from '../../data/serviceImages';
import TrafficROICalculator from '../../features/seo/TrafficROICalculator';
import RankingPeriodicTable from '../../features/seo/RankingPeriodicTable';
import { Icon } from '../../shared/ui/Icon';

const Seo: React.FC = () => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Suchmaschinen-Dominanz</span>
                            <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-8 tracking-tight">
                                <BlurText
                                    text="Unsichtbar ist"
                                    delay={100}
                                    animateBy="words"
                                    direction="top"
                                    className="block"
                                />
                                <GradientText colors={['#FF6B6B', '#4ECDC4', '#45B7D1']} animationSpeed={6} className="block">
                                    irrelevant.
                                </GradientText>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12">
                                Wir bringen Sie nicht nur auf Seite 1. Wir sorgen dafür, dass Sie dort bleiben. Technische Optimierung, Inhalts-Strategie und Aufbau von Autorität.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-2 scale-105"></div>
                            <OptimizedImage
                                src={marketingImages.hero.src}
                                alt={marketingImages.hero.alt}
                                className="relative rounded-3xl shadow-flat-lg w-full transform rotate-1 hover:rotate-0 transition-all duration-500 bg-white p-2"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 -mt-12 relative z-20">
                <TrafficROICalculator />
            </section>

            {/* Ranking Factors - NEW HIGH COMPLEXITY SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Die Wissenschaft der Suche</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                            200+ Ranking-Faktoren. <br /> Wir kennen sie alle.
                        </h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Googles Such-Algorithmus ist kein Geheimnis, sondern Mathematik. Wir optimieren Ihre Seite systematisch auf technische Exzellenz, Inhalts-Relevanz und Autorität.
                        </p>
                    </div>
                </div>
                <RankingPeriodicTable />
            </section>

            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
                            <OptimizedImage
                                src={marketingImages.omnichannel.src}
                                alt={marketingImages.omnichannel.alt}
                                className="relative rounded-3xl shadow-lg w-full border border-gray-100"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">Gesamtheitliche Dominanz</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                Suchmaschinen-Optimierung ist kein Silo. Wir vernetzen Ihre Suche mit sozialen Medien, Inhalts-Marketing und bezahlter Werbung für maximale Sichtbarkeit.
                            </p>
                            <ul className="space-y-3">
                                {['Ganzheitliche Strategie', 'Plattformübergreifendes Retargeting', 'Inhalts-Verteilung', 'Datengetriebene Erkenntnisse'].map((item, i) => (
                                    <li key={i} className="flex items-center text-secondary font-medium">
                                        <Icon name="check_circle" className="text-primary mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <Icon name="settings" />
                            </div>
                            <h3 className="font-bold text-2xl mb-4 text-secondary">Technische Optimierung</h3>
                            <p className="text-slate-600">Ladezeit-Optimierung, Strukturierte Daten und Durchsuchbarkeit.</p>
                        </div>
                        <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                <Icon name="description" />
                            </div>
                            <h3 className="font-bold text-2xl mb-4 text-secondary">Inhalts-Strategie</h3>
                            <p className="text-slate-600">Inhalte, die für Nutzer geschrieben sind und von Google geliebt werden.</p>
                        </div>
                        <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Icon name="map" />
                            </div>
                            <h3 className="font-bold text-2xl mb-4 text-secondary">Regionale Dominanz</h3>
                            <p className="text-slate-600">Werden Sie zum Platzhirsch in Ihrer Region.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Seo;
