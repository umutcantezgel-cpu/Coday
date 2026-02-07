import React from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { marketingImages } from '../../data/serviceImages';
import TrafficROICalculator from '../../features/seo/TrafficROICalculator';
import RankingPeriodicTable from '../../features/seo/RankingPeriodicTable';
import { Icon } from '../../shared/ui/Icon';
import { SeoHead } from '../../shared/ui/SeoHead';

const Seo: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <div className="bg-background-light min-h-screen">
      <SeoHead
        title={`${t('seo_page.hero.title_prefix')} ${t('seo_page.hero.title_suffix')} | Coday`}
        description={t('seo_page.hero.description')}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-start">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('seo_page.hero.badge')}
              </span>
              <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-8 tracking-tight">
                <BlurText
                  text={t('seo_page.hero.title_prefix')}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <GradientText
                  colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
                  animationSpeed={6}
                  className="block"
                >
                  {t('seo_page.hero.title_suffix')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12">
                {t('seo_page.hero.description')}
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
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('seo_page.ranking_factors.badge')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6 whitespace-pre-line">
              {t('seo_page.ranking_factors.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('seo_page.ranking_factors.description')}
            </p>
          </div>
        </div>
        <RankingPeriodicTable />
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div className="order-2 md:order-1 relative">
              <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
              <OptimizedImage
                src={marketingImages.omnichannel.src}
                alt={marketingImages.omnichannel.alt}
                className="relative rounded-3xl shadow-lg w-full border border-gray-100"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                {t('seo_page.dominance.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-6">{t('seo_page.dominance.description')}</p>
              <ul className="space-y-3">
                {(t('seo_page.dominance.items', { returnObjects: true }) as string[]).map(
                  (item, i) => (
                    <li key={i} className="flex items-center text-secondary font-medium">
                      <Icon name="check_circle" className="text-primary me-2" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Icon name="settings" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('seo_page.dominance.cards.technical.title')}
              </h3>
              <p className="text-slate-600">{t('seo_page.dominance.cards.technical.desc')}</p>
            </div>
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Icon name="description" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('seo_page.dominance.cards.content.title')}
              </h3>
              <p className="text-slate-600">{t('seo_page.dominance.cards.content.desc')}</p>
            </div>
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Icon name="map" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('seo_page.dominance.cards.regional.title')}
              </h3>
              <p className="text-slate-600">{t('seo_page.dominance.cards.regional.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Seo;
