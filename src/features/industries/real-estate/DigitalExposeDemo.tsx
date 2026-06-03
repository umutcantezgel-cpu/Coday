'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

const DigitalExposeDemo: React.FC = () => {
  const t = useTranslations('industries');
  const [view, setView] = useState<'pdf' | 'web'>('web');

  return (
    <div className="bg-surface-dark rounded-3xl p-8 lg:p-12">
      <div className="text-center mb-10">
        <h3 className="font-display font-bold text-2xl text-white mb-2">
          {t('immobilien-makler.features.expose_demo.title')}
        </h3>
        <p className="text-gray-400">{t('immobilien-makler.features.expose_demo.subtitle')}</p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/10 p-1 rounded-xl flex gap-1" role="group" aria-label={t('immobilien-makler.features.expose_demo.title')}>
          <button
            onClick={() => setView('pdf')}
            aria-pressed={view === 'pdf'}
            className={`active:scale-[0.97] px-6 py-2 rounded-lg text-sm font-bold transition motion-reduce:duration-[0.01ms] ${view === 'pdf' ? 'bg-white text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            {t('immobilien-makler.features.expose_demo.toggles.pdf')}
          </button>
          <button
            onClick={() => setView('web')}
            aria-pressed={view === 'web'}
            className={`active:scale-[0.97] px-6 py-2 rounded-lg text-sm font-bold transition motion-reduce:duration-[0.01ms] ${view === 'web' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            {t('immobilien-makler.features.expose_demo.toggles.web')}
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="max-w-4xl mx-auto h-[500px] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
        <AnimatePresence mode="wait">
          {view === 'pdf' ? (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-200 w-full h-full p-8 flex flex-col items-center overflow-y-auto"
            >
              {/* PDF Simulator */}
              <div className="w-[300px] bg-white shadow-xl min-h-[400px] mb-4 p-6">
                <div className="h-4 w-3/4 bg-slate-800 mb-4"></div>
                <div className="h-32 w-full bg-slate-200 mb-4 flex items-center justify-center text-xs text-slate-400">
                  {t('immobilien-makler.features.expose_demo.pdf_view.image_alt')}
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100"></div>
                  <div className="h-2 w-full bg-slate-100"></div>
                  <div className="h-2 w-2/3 bg-slate-100"></div>
                </div>
                <div className="mt-8 border text-xs p-2 text-center text-red-500 border-red-200 bg-red-50">
                  {t('immobilien-makler.features.expose_demo.pdf_view.warning')
                    .split('\n')
                    .map((line: string, i: number) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="web"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              {/* Web Simulator */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
                {/* Video BG Mock */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                ></div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  >
                    {t('immobilien-makler.features.expose_demo.web_view.badge')}
                  </motion.div>

                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-display font-black text-white mb-6"
                  >
                    {t('immobilien-makler.features.expose_demo.web_view.title')}
                  </motion.h2>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4"
                  >
                    <button className="active:scale-[0.97] bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors motion-reduce:duration-[0.01ms]">
                      {t('immobilien-makler.features.expose_demo.web_view.cta_tour')}
                    </button>
                    <button className="active:scale-[0.97] bg-white/10 text-white backdrop-blur border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors motion-reduce:duration-[0.01ms]">
                      {t('immobilien-makler.features.expose_demo.web_view.cta_share')}
                    </button>
                  </motion.div>

                  {/* Feature Badges */}
                  <div className="absolute bottom-8 flex gap-8">
                    <div className="text-center">
                      <div className="text-white font-black text-xl">
                        {t('immobilien-makler.features.expose_demo.web_view.stats.area')}
                      </div>
                      <div className="text-white/50 text-xs uppercase">
                        {t('immobilien-makler.features.expose_demo.web_view.stats.area_label')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-black text-xl">
                        {t('immobilien-makler.features.expose_demo.web_view.stats.rooms')}
                      </div>
                      <div className="text-white/50 text-xs uppercase">
                        {t('immobilien-makler.features.expose_demo.web_view.stats.rooms_label')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DigitalExposeDemo;
