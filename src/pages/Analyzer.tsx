import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientText from '../shared/ui/GradientText';
import {
  UrlInputForm,
  AnalysisProgress,
  ReportDashboard,
  useAnalyzerStore,
} from '../features/analyzer';
import { Icon } from '../shared/ui/Icon';

const Analyzer: React.FC = () => {
  const { t } = useTranslation('tools');
  const { status, result } = useAnalyzerStore();

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('analyzer.hero.badge')}
          </span>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6">
            {t('analyzer.hero.title_start')}{' '}
            <GradientText
              colors={['#1A9A9A', '#D69E2E', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              {t('analyzer.hero.title_gradient')}
            </GradientText>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">{t('analyzer.hero.desc')}</p>

          {/* URL Input Form */}
          {(status === 'idle' || status === 'validating' || status === 'error') && <UrlInputForm />}
        </div>
      </section>

      {/* Analysis Progress */}
      {status === 'analyzing' && (
        <section className="px-4">
          <AnalysisProgress />
        </section>
      )}

      {/* Report Dashboard */}
      {status === 'completed' && result && <ReportDashboard />}

      {/* Features Section (shown when idle) */}
      {status === 'idle' && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
                {t('analyzer.features.title')}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">{t('analyzer.features.desc')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: 'speed',
                  title: t('analyzer.features.items.speed.title'),
                  desc: t('analyzer.features.items.speed.desc'),
                  color: 'from-orange-500 to-red-500',
                },
                {
                  icon: 'search',
                  title: t('analyzer.features.items.seo.title'),
                  desc: t('analyzer.features.items.seo.desc'),
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  icon: 'security',
                  title: t('analyzer.features.items.security.title'),
                  desc: t('analyzer.features.items.security.desc'),
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: 'accessibility_new',
                  title: t('analyzer.features.items.a11y.title'),
                  desc: t('analyzer.features.items.a11y.desc'),
                  color: 'from-purple-500 to-violet-500',
                },
                {
                  icon: 'touch_app',
                  title: t('analyzer.features.items.ux.title'),
                  desc: t('analyzer.features.items.ux.desc'),
                  color: 'from-pink-500 to-rose-500',
                },
                {
                  icon: 'article',
                  title: t('analyzer.features.items.content.title'),
                  desc: t('analyzer.features.items.content.desc'),
                  color: 'from-yellow-500 to-amber-500',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100"
                >
                  <div
                    className={`w - 12 h - 12 rounded - xl bg - gradient - to - br ${feature.color} flex items - center justify - center text - white mb - 4 group - hover: scale - 110 transition - transform`}
                  >
                    <Icon name={feature.icon} />
                  </div>
                  <h3 className="font-bold text-xl text-secondary mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Section */}
      {status === 'idle' && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-500 mb-8">
              <div className="flex items-center justify-center gap-2">
                <Icon name="check_circle" className="text-primary" />
                <span>{t('analyzer.trust.free')}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Icon name="lock" className="text-primary" />
                <span>{t('analyzer.trust.private')}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Icon name="bolt" className="text-primary" />
                <span>{t('analyzer.trust.fast')}</span>
              </div>
              <div className="hidden md:flex items-center justify-center gap-2 text-primary font-medium">
                <span>{t('analyzer.trust.stats')}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">{t('analyzer.trust.stats')}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Analyzer;
