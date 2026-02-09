import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../shared/ui/Icon';
import { Button } from '../../../shared/ui/Button';
import { SeoHead } from '../../../shared/ui/SeoHead';
import BlurText from '../../../shared/ui/BlurText';
import GradientText from '../../../shared/ui/GradientText';
import { motion } from 'framer-motion';

const DesignSystems: React.FC = () => {
  const { t } = useTranslation('services');

  const benefits = t('design_systems_page.benefits.items', { returnObjects: true }) as { title: string; desc: string }[];
  const components = t('design_systems_page.components.items', { returnObjects: true }) as string[];

  return (
    <>
      <SeoHead
        title="Design Systems | Scalable Component Libraries"
        description="Consistency is King. We develop atomic design systems that keep your brand unified across all touchpoints."
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-background-light">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100">
            <Icon name="dashboard" className="w-4 h-4" />
            <span>{t('design_systems_page.hero.badge')}</span>
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
            <BlurText
              text={t('design_systems_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              direction="top"
              className="inline-block mr-4"
            />
            <GradientText
              colors={['#6366F1', '#8B5CF6', '#A78BFA']}
              animationSpeed={6}
              className="inline-block"
            >
              {t('design_systems_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
            {t('design_systems_page.hero.description')}
          </p>
          <Button size="lg" variant="primary" rightIcon={<Icon name="arrow_right" />}>
            {t('design_systems_page.hero.cta')}
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center">{t('design_systems_page.benefits.title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-indigo-900 mb-3">{benefit.title}</h3>
                <p className="text-indigo-700">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">{t('design_systems_page.components.title')}</h2>

          <div className="space-y-4">
            {components.map((component, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Icon name="check" weight="bold" />
                </div>
                <span className="text-lg font-medium">{component}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">{t('design_systems_page.workflow.title')}</h2>
          <p className="text-xl text-slate-600 mb-12">{t('design_systems_page.workflow.description')}</p>

          {/* Figma to Code Visual */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-3">
                <Icon name="figma_logo" className="text-4xl text-white" />
              </div>
              <span className="font-bold text-slate-700">Figma</span>
            </div>
            <Icon name="arrow_right" className="text-4xl text-slate-300" />
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-3">
                <Icon name="code" className="text-4xl text-white" />
              </div>
              <span className="font-bold text-slate-700">React</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignSystems;
