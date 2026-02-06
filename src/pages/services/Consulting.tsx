import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedNavLink as NavLink } from '../../shared/ui/LocalizedLink';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import { Icon } from '../../shared/ui/Icon';

const Consulting: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <div className="bg-background-light min-h-screen">
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('consulting_page.hero.badge')}
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
            <BlurText
              text={t('consulting_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              direction="top"
              className="inline-block mr-4"
            />
            <GradientText
              colors={['#6366f1', '#8b5cf6', '#d946ef']}
              animationSpeed={6}
              className="inline-block"
            >
              {t('consulting_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
            {t('consulting_page.hero.description')}
          </p>
          <div className="flex justify-center">
            <NavLink
              to="/book"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
            >
              {t('consulting_page.hero.cta')}
            </NavLink>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Icon name="memory" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('consulting_page.areas.tech_stack.title')}
              </h3>
              <p className="text-slate-600">{t('consulting_page.areas.tech_stack.desc')}</p>
            </div>
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-6">
                <Icon name="rocket_launch" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('consulting_page.areas.digital_trans.title')}
              </h3>
              <p className="text-slate-600">{t('consulting_page.areas.digital_trans.desc')}</p>
            </div>
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Icon name="trending_up" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('consulting_page.areas.growth_hack.title')}
              </h3>
              <p className="text-slate-600">{t('consulting_page.areas.growth_hack.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
