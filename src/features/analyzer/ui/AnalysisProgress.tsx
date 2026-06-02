'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useAnalyzerStore } from '@/features/analyzer/model/store';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Lightning,
  MagnifyingGlass,
  Shield,
  Wheelchair,
  Palette,
  FileText,
  Check,
  ArrowsClockwise,
} from '@phosphor-icons/react/dist/ssr';
import { staggerContainer, fadeUpVariants, STAGGER, TRANSITION } from '@/shared/lib/motion';
import { useTranslations } from 'next-intl';

export const AnalysisProgress: React.FC = () => {
  const { progress, status } = useAnalyzerStore();
  const t = useTranslations('analyzer');

  const AGENTS = [
    {
      id: 'performance',
      name: t('agents.performance'),
      icon: Lightning,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'seo',
      name: t('agents.seo'),
      icon: MagnifyingGlass,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'security',
      name: t('agents.security'),
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'accessibility',
      name: t('agents.accessibility'),
      icon: Wheelchair,
      color: 'from-purple-500 to-violet-500',
    },
    { id: 'ux', name: t('agents.ux'), icon: Palette, color: 'from-pink-500 to-rose-500' },
    {
      id: 'content',
      name: t('agents.content'),
      icon: FileText,
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  if (status !== 'analyzing' && status !== 'validating') {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-16">
      {/* Main Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
            {t('progress.analyzing')}
          </span>
          <span className="text-sm font-bold text-primary">{Math.round(progress.progress)}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress.progress / 100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>

      {/* Agent Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={staggerContainer(STAGGER.slow)}
        initial="hidden"
        animate="visible"
      >
        {AGENTS.map((agent) => {
          const isCompleted = progress.completedAgents.includes(agent.id);
          const isActive = progress.currentAgent === agent.id;

          return (
            <motion.div
              key={agent.id}
              variants={fadeUpVariants}
              transition={TRANSITION.reveal}
              className={`
                relative p-4 rounded-2xl border-2 text-center
                transition motion-reduce:duration-[0.01ms] duration-300
                ${
                  isCompleted
                    ? 'border-green-500 bg-green-50'
                    : isActive
                      ? 'border-primary bg-primary/5 animate-pulse motion-reduce:animate-none'
                      : 'border-gray-200 bg-white'
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center
                  ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                        ? `bg-gradient-to-br ${agent.color} text-white`
                        : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {isCompleted ? (
                  <OptimizedIcon icon={Check} />
                ) : isActive ? (
                  <OptimizedIcon
                    icon={ArrowsClockwise}
                    className="animate-spin motion-reduce:animate-none"
                  />
                ) : (
                  <OptimizedIcon icon={agent.icon} />
                )}
              </div>

              {/* Name */}
              <p
                className={`
                text-sm font-bold
                ${isCompleted ? 'text-green-700' : isActive ? 'text-primary' : 'text-gray-500'}
              `}
              >
                {agent.name}
              </p>

              {/* Status Badge */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-ping motion-reduce:animate-none" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Current Action Text */}
      <motion.p
        key={progress.currentAgent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500 mt-8"
      >
        {progress.currentAgent
          ? t('progress.agent_analyzing', {
              agent: AGENTS.find((a) => a.id === progress.currentAgent)?.name || 'Agent',
            })
          : t('progress.connection_establishing')}
      </motion.p>
    </div>
  );
};

export default AnalysisProgress;
