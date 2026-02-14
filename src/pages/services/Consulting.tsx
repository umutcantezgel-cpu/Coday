import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Brain, Handshake, ChartLineUp } from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';

import { ConsultingReadiness } from '../../features/consulting/ConsultingReadiness';
import { MethodologyGraph } from '../../features/consulting/MethodologyGraph';
import { ProblemSolventMatrix } from '../../features/consulting/ProblemSolventMatrix';
import BookingCalendar from '../../features/booking/ui/BookingCalendar';

const Consulting: React.FC = () => {
  const { t } = useTranslation('consulting');

  return (
    <>
      <Helmet>
        <title>{t('meta.title', 'Strategische IT-Beratung | Coday')}</title>
        <meta
          name="description"
          content={t(
            'meta.description',
            'Wir transformieren Ihre Vision in skalierbare Software-Architektur. 5x mehr Tiefe, 5x mehr Erfolg.'
          )}
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden pb-24 pt-32">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14rem_24rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

          <div className="relative z-10 text-center max-w-5xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-8 backdrop-blur-md"
            >
              <OptimizedIcon icon={Brain} className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide uppercase">{t('hero.badge')}</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight tracking-tight">
              {t('hero.title_start')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 animate-gradient-x">
                {t('hero.title_end')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="w-full md:w-auto px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2">
                <OptimizedIcon icon={Handshake} className="w-6 h-6" />
                {t('hero.cta_primary')}
              </button>
              <button className="w-full md:w-auto px-8 py-5 bg-slate-800/50 hover:bg-slate-700/50 text-white font-bold rounded-2xl transition-all border border-slate-700 hover:border-slate-500 backdrop-blur-sm flex items-center justify-center gap-2">
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
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-32 bg-slate-900 border-t border-slate-800/50"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-6">
                {t('methodology.title')}
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                {t('methodology.subtitle')}
              </p>
            </div>

            <MethodologyGraph />
          </div>
        </motion.section>

        {/* --- MATRIX: THE COMPARISON --- */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-24 bg-slate-900 border-t border-slate-800/30"
        >
          <div className="max-w-6xl mx-auto px-4">
            <ProblemSolventMatrix />
          </div>
        </motion.section>

        {/* --- BOOKING SECTION --- */}
        <section className="py-32 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              {t('booking.title')}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-16 font-light">
              {t('booking.subtitle')}
            </p>

            <div className="bg-white rounded-3xl overflow-hidden text-slate-900 shadow-2xl">
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
};

export default Consulting;
