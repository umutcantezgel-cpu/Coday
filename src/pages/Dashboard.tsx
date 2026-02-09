import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../shared/ui/Icon';
import { SeoHead } from '../shared/ui/SeoHead';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../shared/ui/Button';

// Marketing Features
const features = [
  {
    icon: 'chart_bar',
    title: 'features.realtime.title',
    desc: 'features.realtime.desc',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    icon: 'kanban',
    title: 'features.tracking.title',
    desc: 'features.tracking.desc',
    color: 'from-purple-400 to-pink-400'
  },
  {
    icon: 'description',
    title: 'features.docs.title',
    desc: 'features.docs.desc',
    color: 'from-emerald-400 to-teal-400'
  }
];

// Mock Dashboard Component for Visuals
const MockDashboardVisual = () => (
  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
    {/* Mock Header */}
    <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4 justify-between">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-400">
        DEMO_VIEW_ONLY
      </div>
    </div>

    {/* Mock Body */}
    <div className="p-6 grid grid-cols-3 gap-6">
      {/* Chart Area */}
      <div className="col-span-2 space-y-4">
        <div className="h-64 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 relative overflow-hidden group">
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 h-32 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full" />
              </motion.div>
            ))}
          </div>
          {/* Overlay Text */}
          <div className="absolute top-4 left-4 font-mono text-xs text-slate-400">TRAFFIC ANALYZER_V2</div>
        </div>
      </div>

      {/* Stats Column */}
      <div className="space-y-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-700/50">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 mb-2" />
            <div className="w-16 h-3 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans overflow-hidden" ref={scrollRef}>
      <SeoHead
        title={t('meta.title', 'Kunden-Dashboard | Coday')}
        description={t('meta.desc', 'Ihr Projekt-Status auf einen Blick.')}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Background Elements */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-8 border border-primary/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {t('hero.badge', 'Premium Reporting Standard')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
        >
          {t('hero.title', 'Transparency meets Control.')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          {t('hero.desc', 'Stop guessing. Start knowing. Our client dashboard gives you 24/7 access to your project status, real-time analytics, and all assets.')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg" variant="primary" rightIcon={<Icon name="arrow_right" className="w-4 h-4" />}>
            {t('hero.cta.primary', 'Start Your Project')}
          </Button>
          {/* Login button removed as per request */}
        </motion.div>

      </section>

      {/* Visual Showcase */}
      <section className="relative px-6 max-w-6xl mx-auto -mt-10 mb-32 perspective-1000">
        <motion.div
          style={{ rotateX: 5, y: y }}
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <MockDashboardVisual />

          {/* Floating Highlights */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-8 top-12 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                <Icon name="trending_up" weight="bold" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Conversion Rate</div>
                <div className="font-bold text-slate-900 dark:text-white">+124.5%</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
              {t('features.headline', 'Why top brands work with us')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('features.subheadline', 'We don\'t just deliver results. We prove them.')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-shadow group"
              >
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${f.color} text-white shadow-lg`}>
                  <Icon name={f.icon} size="lg" weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t(f.title)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(f.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('cta.title', 'Ready for the Next Level?')}
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {t('cta.desc', 'Join the hundreds of companies growing with our data-driven approach.')}
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
            {t('cta.button', 'Start Project Now')}
          </Button>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;

