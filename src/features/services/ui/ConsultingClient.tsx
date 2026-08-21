'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { m } from 'motion/react';
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

  return (
    <div className="min-h-dvh bg-[#fafafa]">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-[#fafafa] text-slate-900 overflow-hidden pt-4 pb-16 md:pt-6 md:pb-20">
        {/* Background Gradient & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-500/30 text-blue-700 mb-8 shadow-sm"
          >
            <OptimizedIcon icon={Brain} className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold tracking-wide uppercase">{t('hero.badge')}</span>
          </m.div>

          <h1 className="text-5xl md:text-8xl font-display font-extrabold mb-8 leading-tight tracking-tight text-slate-900 text-balance">
            {t('hero.title_start')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600">
              {t('hero.title_end')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-normal leading-relaxed text-pretty">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="active:scale-[0.97] w-full md:w-auto px-8 py-5 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-2xl transition motion-reduce:duration-[0.01ms] shadow-xl shadow-primary-700/25 flex items-center justify-center gap-2 hover:scale-[1.02]">
              <OptimizedIcon icon={Handshake} className="w-6 h-6" />
              {t('hero.cta_primary')}
            </button>
            <button className="active:scale-[0.97] w-full md:w-auto px-8 py-5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition motion-reduce:duration-[0.01ms] border border-slate-300 hover:border-slate-400 shadow-sm flex items-center justify-center gap-2">
              <OptimizedIcon icon={ChartLineUp} className="w-6 h-6 text-slate-500" />
              {t('hero.cta_secondary')}
            </button>
          </div>
        </div>
      </section>

      {/* --- DIAGNOSTIC: THE FILTER --- */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ConsultingReadiness />
        </div>
      </section>

      {/* --- METHODOLOGY: THE BLUEPRINT --- */}
      <m.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-[#fafafa] border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance font-display">
              {t('methodology.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{t('methodology.subtitle')}</p>
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
        className="py-24 bg-white border-t border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-4">
          <ProblemSolventMatrix />
        </div>
      </m.section>

      {/* --- CASE STUDY TEASER --- */}
      <section className="py-24 bg-slate-50/80 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 mb-6 text-sm font-bold uppercase tracking-wide border border-blue-200">
                {t('case_study.label')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance font-display">
                {t('case_study.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-prose text-pretty">
                {t('case_study.description')}
              </p>
              <Link
                href="/work/batherm"
                className="inline-flex items-center gap-2 text-primary-700 font-bold hover:text-primary-800 transition-colors motion-reduce:duration-[0.01ms] group"
              >
                Batherm IT-Consulting Case Study
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]" />
              </Link>
            </div>
            <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-80 bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200">
                  <ChartLineUp className="w-16 h-16 text-primary-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Relevant FAQs --- */}
      <section className="py-24 bg-white border-t border-slate-200">
        <SeoContentBlock
          title={t('consulting_page.seoText.title')}
          text={`${t('consulting_page.seoText.content')} ${t('consulting_page.hero.title_prefix')} ${t('consulting_page.hero.title_suffix')}`}
        />
        <RelevantFAQs serviceId="consulting" />
      </section>

      {/* --- BOOKING SECTION --- */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-balance font-display">
            {t('booking.title')}
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-16 font-normal">
            {t('booking.subtitle')}
          </p>

          <div className="bg-white rounded-3xl overflow-hidden text-slate-900 shadow-2xl border border-slate-200">
            <BookingCalendar initialServiceType="consulting" className="border-none shadow-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
