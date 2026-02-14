import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle } from '@phosphor-icons/react';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import ValuesDeck from '../../features/culture/ValuesDeck';
import TeamGallery from '../../features/culture/TeamGallery';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/shared/ui/SeoHead';

const Culture: React.FC = () => {
  const { t } = useTranslation('careers');
  const values = t('culture.values.items', { returnObjects: true }) as string[];

  return (
    <div className="bg-background-light min-h-screen">
      <SeoHead
        title={`${t('culture.hero.title_start')} ${t('culture.hero.title_gradient')} | Coday Culture`}
        description={t('culture.hero.desc')}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('culture.hero.badge')}
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-6 tracking-tight">
            <BlurText
              text={t('culture.hero.title_start')}
              delay={100}
              animateBy="words"
              className="inline-block mr-4"
            />
            <br className="hidden md:block" />
            <GradientText
              colors={['#F59E0B', '#EF4444', '#EC4899']}
              animationSpeed={5}
              className="inline-block"
            >
              {t('culture.hero.title_gradient')}
            </GradientText>
          </h1>
          <p className="text-2xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t('culture.hero.desc')}
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
              <h2 className="font-display font-bold text-4xl text-white mb-6">
                {t('culture.values.title')}
              </h2>
              <p className="text-xl text-gray-400 mb-8">{t('culture.values.desc')}</p>
              <ul className="space-y-4 text-gray-300">
                {values.map((val, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <OptimizedIcon icon={CheckCircle} className="text-green-500" />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-secondary mb-4">
              {t('culture.team.title')}
            </h2>
            <p className="text-slate-600">{t('culture.team.desc')}</p>
          </div>
          <TeamGallery />
        </div>
      </section>
    </div>
  );
};

export default Culture;
