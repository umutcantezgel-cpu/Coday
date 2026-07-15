'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { m } from 'motion/react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Brain, Handshake, ChartLineUp } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';
import { ConsultingReadiness } from '@/features/consulting/ConsultingReadiness';
import { MethodologyGraph } from '@/features/consulting/MethodologyGraph';
import { ProblemSolventMatrix } from '@/features/consulting/ProblemSolventMatrix';
import BookingCalendar from '@/features/booking/ui/BookingCalendar';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

export function ConsultingClient() {
  const t = useTranslations('consulting');

  const consultingSchema = {
    service: {
      name: 'IT-Consulting & Strategie',
      serviceType: 'Consulting',
      description: t('meta.description') as string,
    },
  };

  return (
    <>
      <SeoHead
        title={t('meta.title')}
        description={t('meta.description')}
        schemaData={consultingSchema}
        pageType="service"
      />

      <div className="min-h-dvh bg-surface-muted">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden pb-24 pt-32">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14rem_24rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

          <div className="relative z-10 text-center max-w-5xl px-4">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-8 backdrop-blur-md"
            >
              <OptimizedIcon icon={Brain} className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide uppercase">{t('hero.badge')}</span>
            </m.div>

            <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight tracking-tight text-balance">
              {t('hero.title_start')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 animate-gradient-x motion-reduce:animate-none">
                {t('hero.title_end')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed max-w-prose text-pretty">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="active:scale-[0.97] w-full md:w-auto px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition motion-reduce:duration-[0.01ms] shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2">
                <OptimizedIcon icon={Handshake} className="w-6 h-6" />
                {t('hero.cta_primary')}
              </button>
              <button className="active:scale-[0.97] w-full md:w-auto px-8 py-5 bg-slate-800/50 hover:bg-slate-700/50 text-white font-bold rounded-2xl transition motion-reduce:duration-[0.01ms] border border-slate-700 hover:border-slate-500 backdrop-blur-sm flex items-center justify-center gap-2">
                <OptimizedIcon icon={ChartLineUp} className="w-6 h-6 text-slate-400" />
                {t('hero.cta_secondary')}
              </button>
            </div>
          </div>
        </section>

        {/* --- DIAGNOSTIC: THE FILTER --- */}
        <section className="py-32 bg-slate-950 relative overflow-hidden -mt-10 rounded-t-[3rem] z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <ConsultingReadiness />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        </section>

        {/* --- METHODOLOGY: THE BLUEPRINT --- */}
        <m.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-slate-900 border-t border-slate-800/50"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-6 text-balance">
                {t('methodology.title')}
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                {t('methodology.subtitle')}
              </p>
            </div>

            <MethodologyGraph />
          </div>
        </m.section>

        {/* --- MATRIX: THE COMPARISON --- */}
        <m.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-24 bg-slate-900 border-t border-slate-800/30"
        >
          <div className="max-w-6xl mx-auto px-4">
            <ProblemSolventMatrix />
          </div>
        </m.section>

        {/* --- CASE STUDY TEASER --- */}
        <section className="py-24 bg-surface-muted border-t border-slate-200/50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-surface-elevated rounded-[2rem] p-8 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-6 text-sm font-bold uppercase tracking-wide">
                  {t('case_study.label')}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                  {t('case_study.title')}
                </h2>
                <p className="text-lg text-content-muted mb-8 leading-relaxed max-w-prose text-pretty">
                  {t('case_study.description')}
                </p>
                <Link
                  href="/work/batherm"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors motion-reduce:duration-[0.01ms] group"
                >
                  Batherm Case Study
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

        {/* --- Relevant FAQs --- */}
        <section className="py-24 bg-slate-950 border-t border-slate-800/30">
          <SeoContentBlock
            title={t('consulting_page.seoText.title')}
            text={`${t('consulting_page.seoText.content')} ${t('consulting_page.hero.title_prefix')} ${t('consulting_page.hero.title_suffix')}`}
          />
          <RelevantFAQs
            serviceId="consulting"
            className="text-white [&_h2]:text-white [&_span]:text-white [&_button]:bg-slate-900 [&_div.bg-surface-elevated]:bg-slate-900 [&_div.bg-surface-elevated]:border-slate-800"
          />
        </section>

        {/* --- BOOKING SECTION --- */}
        <section className="py-32 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-balance">
              {t('booking.title')}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-16 font-light">
              {t('booking.subtitle')}
            </p>

            <div className="bg-surface-elevated rounded-3xl overflow-hidden text-slate-900 shadow-2xl">
              <BookingCalendar
                initialServiceType="consulting"
                className="border-none shadow-none"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
