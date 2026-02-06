import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@/shared/ui/Icon';

interface Feature {
  id: string;
  label: string;
  impact: number;
  desc: string;
  active: boolean;
  icon: string;
}

const CodeQualitySimulator: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 'ts',
      label: 'TypeScript Strict',
      impact: 20,
      desc: 'Prevents runtime errors',
      active: false,
      icon: 'code',
    },
    {
      id: 'test',
      label: 'Unit Tests',
      impact: 15,
      desc: 'Catches regressions',
      active: false,
      icon: 'science',
    },
    {
      id: 'ci',
      label: 'CI/CD Pipeline',
      impact: 10,
      desc: 'Automated deployment',
      active: false,
      icon: 'rocket_launch',
    },
    {
      id: 'lint',
      label: 'ESLint / Prettier',
      impact: 10,
      desc: 'Consistent code style',
      active: false,
      icon: 'rule',
    },
    {
      id: 'review',
      label: 'Code Reviews',
      impact: 5,
      desc: 'Knowledge sharing',
      active: false,
      icon: 'group',
    },
  ]);

  const activeImpact = features.reduce((acc, feat) => (feat.active ? acc + feat.impact : acc), 0);
  const score = 40 + activeImpact;

  let message = 'Projekt ist instabil. Hohes Risiko.';
  if (score < 60) message = 'Projekt ist instabil. Hohes Bug-Risiko.';
  else if (score < 80) message = 'Basis-Stabilität erreicht. Verbesserbar.';
  else if (score < 100) message = 'Gute Qualität. Wartbar.';
  else message = 'Enterprise Grade. Maximale Skalierbarkeit.';

  const toggleFeature = (id: string) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, active: !f.active } : f)));
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
          Code Quality Simulator
        </h3>
        <p className="text-slate-500 text-sm">
          Was macht Software wirklich wartbar? Aktiviere die Module.
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
                  <Icon name={feature.icon} />
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
                {feature.active && <Icon name="check" className="text-white text-xs" />}
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
              <span className="text-xs uppercase font-bold text-gray-400">Stability</span>
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
                {score >= 100 ? 'Mission Accomplished' : 'Project Status'}
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
