import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedNavLink as NavLink } from '../../shared/ui/LocalizedLink';
import BlurText from '../../shared/ui/BlurText';
import { servicesData } from '@/shared/data/services';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { brandingImages } from '@/shared/data/serviceImages';
import DesignSystemShowcase from '../../features/web-design/DesignSystemShowcase';
import PsychologyGrid from '../../features/web-design/PsychologyGrid';
import BeforeAfterReveal from '../../features/web-design/BeforeAfterReveal';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import { Palette, SquaresFour, RocketLaunch, CheckCircle, ArrowRight } from '@phosphor-icons/react';

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  widgets: SquaresFour,
  rocket: RocketLaunch,
};
import { SeoHead } from '../../shared/ui/SeoHead';

const WebDesign: React.FC = () => {
  const { t } = useTranslation('services');

  // Fallback if key doesn't match perfectly, but it should be 'web-design'
  const categoryData = servicesData['web-design'];
  // We will map over these but use translated strings
  // We will map over these but use translated strings
  const features = categoryData ? Object.values(categoryData) : [];

  return (
    <div className="bg-background-light pt-24 pb-16">
      <SeoHead
        title={`${t('web_design_page.hero.title_prefix')} ${t('web_design_page.hero.title_suffix')} | Coday`}
        description={t('web_design_page.hero.description')}
      />
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center lg:text-start">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('web_design_page.hero.label')}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6">
              <BlurText
                text={t('web_design_page.hero.title_prefix')}
                delay={100}
                animateBy="words"
                className="block"
              />
              <span className="text-primary">{t('web_design_page.hero.title_suffix')}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl lg:mx-0 mx-auto">
              {t('web_design_page.hero.description')}
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 scale-95"></div>
            <OptimizedImage
              src={brandingImages.hero?.src || ''}
              alt={brandingImages.hero?.alt || ''}
              className="relative rounded-[2rem] shadow-flat-lg w-full transform -rotate-2 hover:rotate-0 transition-all duration-500 bg-white p-2"
              priority
            />
          </div>
        </div>
      </section>

      {/* Design System Showcase - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_design_page.design_system.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6 whitespace-pre-line">
              {t('web_design_page.design_system.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('web_design_page.design_system.description')}
            </p>
            <ul className="space-y-4 mb-8">
              {(t('web_design_page.design_system.items', { returnObjects: true }) as string[]).map(
                (item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <OptimizedIcon icon={CheckCircle} className="text-primary" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <DesignSystemShowcase />
        </div>
      </section>

      {/* Before/After Visual - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">
            {t('web_design_page.before_after.label')}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-4">
            {t('web_design_page.before_after.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('web_design_page.before_after.description')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <BeforeAfterReveal />
        </div>
      </section>

      {/* Psychology of UI - NEW HIGH COMPLEXITY SECTION */}
      <section className="bg-surface-light py-24 mb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
                {t('web_design_page.psychology.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                {t('web_design_page.psychology.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t('web_design_page.psychology.description')}
              </p>
            </div>
          </div>

          <PsychologyGrid />
        </div>
      </section>

      {/* UX Process Timeline - EXISTING BUT REFINED */}
      <section className="bg-secondary py-24 mb-24 text-white overflow-hidden relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              {t('web_design_page.process.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('web_design_page.process.description')}
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden lg:block"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: t('web_design_page.process.steps.exploration.title'),
                  desc: t('web_design_page.process.steps.exploration.desc'),
                },
                {
                  step: '02',
                  title: t('web_design_page.process.steps.structure.title'),
                  desc: t('web_design_page.process.steps.structure.desc'),
                },
                {
                  step: '03',
                  title: t('web_design_page.process.steps.visual.title'),
                  desc: t('web_design_page.process.steps.visual.desc'),
                },
                {
                  step: '04',
                  title: t('web_design_page.process.steps.prototype.title'),
                  desc: t('web_design_page.process.steps.prototype.desc'),
                },
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="absolute -top-6 start-8 bg-primary text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-4 border-secondary group-hover:scale-110 transition-transform">
                    {phase.step}
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-3">{phase.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Map the feature slug to the translation key

            return (
              <NavLink
                key={index}
                to={`/services/web-design/${feature.slug}`}
                className="bg-white p-8 rounded-2xl shadow-flat border border-gray-100 hover:shadow-flat-lg transition-all duration-300 group hover:-translate-y-1 block relative overflow-hidden h-full"
              >
                <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-bl-full -me-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                  <OptimizedIcon icon={iconMap[feature.icon] || Palette} />
                </div>
                <h3 className="font-display font-bold text-xl text-secondary mb-3 group-hover:text-primary transition-colors relative z-10">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 relative z-10">
                  {t(feature.descriptionKey)}
                </p>
                <div className="text-primary font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 relative z-10">
                  {t('actions.read_more', 'Mehr erfahren')}{' '}
                  <OptimizedIcon icon={ArrowRight} className="ms-1 text-sm" />
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-primary rounded-3xl p-12 shadow-flat-lg text-white">
          <h2 className="font-display font-bold text-3xl mb-6">
            {t('web_design_page.cta_section.title')}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t('web_design_page.cta_section.description')}
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary rounded-xl bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
          >
            {t('web_design_page.cta_section.button')}
            <OptimizedIcon icon={Palette} className="ms-2" />
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default WebDesign;
