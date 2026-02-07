import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Cpu } from 'lucide-react';
import { LocalizedNavLink as NavLink } from '../../shared/ui/LocalizedLink';
import { TechStackHologram } from '../../features/enterprise/TechStackHologram';
import { Speedometer } from '../../features/enterprise/Speedometer';
import { EdgeNetworkMap } from '../../features/enterprise/EdgeNetworkMap';
import { ROICalculator } from '../../features/enterprise/ROICalculator';
import { ScrollContextCTA } from '../../features/enterprise/ScrollContextCTA';
import { SeoHead } from '../../shared/ui/SeoHead';

const EnterpriseWeb: React.FC = () => {
  const { t } = useTranslation('services');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-background-light min-h-screen overflow-hidden">
      <SeoHead
        title="Enterprise Web Platforms | Coday"
        description="Websites, die Märkte dominieren. High-End Webentwicklung für Marktführer. Next.js, Edge Computing, Global Scale."
      />

      {/* HERO SECTION: The Singularity */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background - "The Grid" */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
              {t('enterprise_web_page.hero.badge')}
            </span>

            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none mb-8 text-secondary">
              {t('enterprise_web_page.hero.title_prefix')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                {t('enterprise_web_page.hero.title_suffix')}
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-12">
              {t('enterprise_web_page.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink
                to="/booking"
                className="group relative px-8 py-4 bg-secondary text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  {t('enterprise_web_page.hero.cta_primary')}
                  <ArrowRight className="ms-2 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </NavLink>

              <NavLink
                to="/work"
                className="px-8 py-4 bg-white border border-slate-200 text-secondary rounded-full font-bold text-lg hover:bg-slate-50 transition-colors"
              >
                {t('enterprise_web_page.hero.cta_secondary')}
              </NavLink>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-400">
            {t('enterprise_web_page.hero.scroll_hint')}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* SECTION 2: SPEED / METRICS */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">
                {t('enterprise_web_page.speed_section.title')}
              </h2>
              <p className="text-xl text-slate-400">
                {t('enterprise_web_page.speed_section.description')}
              </p>
            </div>
            <div className="hidden lg:block">
              <Cpu className="w-24 h-24 text-primary opacity-20" />
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
            <h2 className="font-display font-bold text-4xl md:text-6xl text-secondary mb-6">
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
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">
              {t('enterprise_web_page.roi_section.label')}
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl mt-2 mb-6 text-secondary">
              {t('enterprise_web_page.roi_section.title')}
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              {t('enterprise_web_page.roi_section.description')}
            </p>
          </div>

          <ROICalculator />
        </div>
      </section>

      <ScrollContextCTA />
    </div>
  );
};

export default EnterpriseWeb;
