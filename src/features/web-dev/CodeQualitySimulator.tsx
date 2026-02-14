import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

import { Code, Flask, RocketLaunch, Ruler, Users, Check } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

interface FeatureDef {
  id: string;
  label: string;
  impact: number;
  desc: string;
  icon: React.ElementType;
}

const CodeQualitySimulator: React.FC = () => {
  const { t } = useTranslation('services');
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const featureDefs: FeatureDef[] = [
    {
      id: 'ts',
      label: t('web_development_page.process.simulator.features.ts.label'),
      impact: 20,
      desc: t('web_development_page.process.simulator.features.ts.desc'),
      icon: Code,
    },
    {
      id: 'test',
      label: t('web_development_page.process.simulator.features.test.label'),
      impact: 15,
      desc: t('web_development_page.process.simulator.features.test.desc'),
      icon: Flask,
    },
    {
      id: 'ci',
      label: t('web_development_page.process.simulator.features.ci.label'),
      impact: 10,
      desc: t('web_development_page.process.simulator.features.ci.desc'),
      icon: RocketLaunch,
    },
    {
      id: 'lint',
      label: t('web_development_page.process.simulator.features.lint.label'),
      impact: 10,
      desc: t('web_development_page.process.simulator.features.lint.desc'),
      icon: Ruler,
    },
    {
      id: 'review',
      label: t('web_development_page.process.simulator.features.review.label'),
      impact: 5,
      desc: t('web_development_page.process.simulator.features.review.desc'),
      icon: Users,
    },
  ];

  const features = featureDefs.map((def) => ({
    ...def,
    active: activeIds.includes(def.id),
  }));

  const activeImpact = features.reduce((acc, feat) => (feat.active ? acc + feat.impact : acc), 0);
  const score = 40 + activeImpact;

  let message = t('web_development_page.process.simulator.messages.unstable');
  if (score < 60) message = t('web_development_page.process.simulator.messages.risky');
  else if (score < 80) message = t('web_development_page.process.simulator.messages.stable');
  else if (score < 100) message = t('web_development_page.process.simulator.messages.good');
  else message = t('web_development_page.process.simulator.messages.enterprise');

  const toggleFeature = (id: string) => {
    setActiveIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const getScoreColor = (s: number) => {
    if (s < 60) return '#EF4444'; // Red
    if (s < 80) return '#F59E0B'; // Orange
    if (s < 100) return '#3B82F6'; // Blue
    return '#10B981'; // Green
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-flat-lg overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <h3 className="font-display font-bold text-2xl text-secondary mb-2">
          {t('web_development_page.process.simulator.title')}
        </h3>
        <p className="text-slate-500 text-sm">
          {t('web_development_page.process.simulator.subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Controls */}
        <div className="p-8 bg-surface-light border-r border-gray-100 space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`group cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${feature.active ? 'bg-white border-primary shadow-md' : 'bg-white border-transparent hover:border-gray-200'}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${feature.active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                >
                  <OptimizedIcon icon={feature.icon} />
                </div>
                <div>
                  <div
                    className={`font-bold text-sm ${feature.active ? 'text-secondary' : 'text-gray-500'}`}
                  >
                    {feature.label}
                  </div>
                  <div className="text-xs text-slate-400">{feature.desc}</div>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${feature.active ? 'border-primary bg-primary' : 'border-gray-200'}`}
              >
                {feature.active && <OptimizedIcon icon={Check} className="text-white text-xs" />}
              </div>
            </div>
          ))}
        </div>

        {/* Visualizer */}
        <div className="p-8 flex flex-col items-center justify-center bg-white relative">
          <div className="relative w-48 h-48 mb-6">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getScoreColor(score)}
                strokeWidth="8"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                strokeLinecap="round"
                transition={{ duration: 0.8, type: 'spring' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.span
                key={score}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-black text-secondary"
              >
                {score}%
              </motion.span>
              <span className="text-xs uppercase font-bold text-gray-400">
                {t('web_development_page.process.simulator.status_label')}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="font-bold text-lg mb-1" style={{ color: getScoreColor(score) }}>
                {score >= 100
                  ? t('web_development_page.process.simulator.mission_accomplished')
                  : t('web_development_page.process.simulator.project_status')}
              </div>
              <p className="text-slate-500 text-sm max-w-xs">{message}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CodeQualitySimulator;
