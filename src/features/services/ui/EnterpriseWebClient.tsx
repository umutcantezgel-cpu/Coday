'use client';
import React, { useRef } from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { m, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Cpu } from '@phosphor-icons/react/dist/ssr';
import { Link as NavLink } from '@/i18n/navigation';
import { TechStackHologram } from '@/features/enterprise/TechStackHologram';
import { Speedometer } from '@/features/enterprise/Speedometer';
import { EdgeNetworkMap } from '@/features/enterprise/EdgeNetworkMap';
import { ROICalculator } from '@/features/enterprise/ROICalculator';
import { ScrollContextCTA } from '@/features/enterprise/ScrollContextCTA';
import { SeoHead } from '@/shared/ui/SeoHead';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { ProblemSolventMatrix } from '@/features/consulting/ProblemSolventMatrix';
import { MethodologyGraph } from '@/features/consulting/MethodologyGraph';
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';

export function EnterpriseWebClient() {
  const t = useTranslations('services');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const enterpriseWebSchema = {
    service: {
      name: 'Enterprise Webentwicklung',
      serviceType: 'Web Development',
      description: t('enterprise_web_page.meta.description'),
      provider: {
        name: 'Coday',
      },
    },
  };

  return (
    <div ref={containerRef} className="bg-surface-base min-h-dvh overflow-hidden">
      <SeoHead
        title={t('enterprise_web_page.meta.title')}
        description={t('enterprise_web_page.meta.description')}
        schemaData={enterpriseWebSchema}
      />

      {/* HERO SECTION: The Singularity */}
      <section className="relative h-dvh flex items-center justify-center overflow-hidden">
        {/* Abstract Background - "The Grid" */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-x-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
              {t('enterprise_web_page.hero.badge')}
            </h1>
            <h2 className="block font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none mb-8 text-content-base text-balance">
              {t('enterprise_web_page.hero.title_prefix')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire to-blue-600">
                {t('enterprise_web_page.hero.title_suffix')}
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-prose text-pretty mb-12">
              {t('enterprise_web_page.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink
                href="/booking"
                className="group relative px-8 py-4 bg-secondary text-white rounded-full font-bold text-lg overflow-hidden transition motion-reduce:duration-[0.01ms] hover:scale-[0.97] ease-spring"
              >
                <span className="relative z-10 flex items-center">
                  {t('enterprise_web_page.hero.cta_primary')}
                  <ArrowRight className="ms-2 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform motion-reduce:duration-[0.01ms]" />
                </span>
                <div className="absolute inset-0 bg-sapphire opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-300" />
              </NavLink>

              <NavLink
                href="/work"
                className="px-8 py-4 bg-surface-elevated border border-slate-200 text-content-base rounded-full font-bold text-lg hover:bg-surface-muted transition-colors motion-reduce:duration-[0.01ms]"
              >
                {t('enterprise_web_page.hero.cta_secondary')}
              </NavLink>
            </div>
          </m.div>
        </div>

        {/* Scroll Indicator */}
        <m.div
          style={{ opacity }}
          className="absolute bottom-10 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-400">
            {t('enterprise_web_page.hero.scroll_hint')}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </m.div>
      </section>

      {/* SECTION 2: SPEED / METRICS */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 text-balance">
                {t('enterprise_web_page.speed_section.title')}
              </h2>
              <p className="text-xl text-slate-400">
                {t('enterprise_web_page.speed_section.description')}
              </p>
            </div>
            <div className="hidden lg:block">
              <Cpu className="w-24 h-24 text-action-primary opacity-20" />
            </div>
          </div>

          <div className="py-12 flex flex-col gap-24">
            <Speedometer />
            <EdgeNetworkMap />
          </div>
        </div>
      </section>

      {/* SECTION 3: THE STACK */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="font-display font-bold text-4xl md:text-6xl text-content-base mb-6 text-balance">
              {t('enterprise_web_page.stack_section.title')}
            </h2>
            <p className="text-xl text-slate-500">
              {t('enterprise_web_page.stack_section.description')}
            </p>
          </div>

          <div className="py-12">
            <TechStackHologram />
          </div>
        </div>
      </section>

      {/* SECTION 4: ROI / BUSINESS IMPACT */}
      <section className="py-32 bg-surface-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sapphire font-bold tracking-widest uppercase text-xs">
              {t('enterprise_web_page.roi_section.label')}
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl mt-2 mb-6 text-content-base text-balance">
              {t('enterprise_web_page.roi_section.title')}
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              {t('enterprise_web_page.roi_section.description')}
            </p>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* --- METHODOLOGY --- */}
      <section className="py-32 bg-slate-900 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-6 text-balance">
              {t('enterprise_web_page.methodology.title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('enterprise_web_page.methodology.subtitle')}
            </p>
          </div>
          <MethodologyGraph namespace="services" prefix="enterprise_web_page.methodology" />
        </div>
      </section>

      {/* --- MATRIX --- */}
      <section className="py-24 bg-slate-900 border-t border-slate-800/30">
        <div className="container mx-auto px-4">
          <ProblemSolventMatrix namespace="services" prefix="enterprise_web_page.matrix.rows" />
        </div>
      </section>

      {/* --- CASE STUDY TEASER --- */}
      <section className="py-24 bg-surface-muted border-t border-slate-200/50">
        <div className="container mx-auto px-4">
          <div className="bg-surface-elevated rounded-[2rem] p-8 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-6 text-sm font-bold uppercase tracking-wide">
                {t('enterprise_web_page.case_study.label')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                {t('enterprise_web_page.case_study.title')}
              </h2>
              <p className="text-lg text-content-muted mb-8 leading-relaxed max-w-prose text-pretty">
                {t('enterprise_web_page.case_study.description')}
              </p>
              <Link
                href="/work/batherm"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors motion-reduce:duration-[0.01ms] group"
              >
                Case Study ansehen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]" />
              </Link>
            </div>
            <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-80 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <div className="w-32 h-32 bg-surface-elevated rounded-full shadow-lg flex items-center justify-center border border-slate-100">
                  <ChartLineUp className="w-16 h-16 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant FAQs */}
      <section className="py-24 bg-surface-elevated">
        <SeoContentBlock
          title={t('enterprise_web_page.seoText.title')}
          text={t('enterprise_web_page.seoText.content')}
        />
        <RelevantFAQs serviceId="web-development" />
      </section>

      <ScrollContextCTA />
    </div>
  );
}
