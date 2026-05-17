import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lightning, HardDrives, Database } from '@phosphor-icons/react';

import { useTranslation } from 'react-i18next';

export const SpeedComparison: React.FC = () => {
  const { t } = useTranslation('blog');
  const [isRunning, setIsRunning] = useState(false);

  // 0 = idle, 1 = running, 2 = finished
  const [wpProgress, setWpProgress] = useState(0);
  const [customProgress, setCustomProgress] = useState(0);

  const startRace = () => {
    if (isRunning) return;
    setIsRunning(true);
    setWpProgress(0);
    setCustomProgress(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    // Custom Code is fast (0.8s)
    const customTimer = setTimeout(() => {
      setCustomProgress(100);
    }, 800);

    // WP is slow (3.5s)
    const wpTimer = setTimeout(() => {
      setWpProgress(100);
      setIsRunning(false);
    }, 3500);

    // Animation frames for smooth progress bar feeling would be better,
    // but simple timeouts work for this demo simulation.
    const interval = setInterval(() => {
      setCustomProgress((prev) => Math.min(prev + 5, 100)); // fast increments
      setWpProgress((prev) => Math.min(prev + 0.8, 100)); // slow increments
    }, 50);

    return () => {
      clearTimeout(customTimer);
      clearTimeout(wpTimer);
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="bg-bg-inverse rounded-2xl p-8 shadow-2xl border border-gray-800 my-10 overflow-hidden relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
          <Lightning className="text-yellow-400 fill-yellow-400" />
          {t('speedComparison.title')}
        </h3>

        {/* Lanes */}
        <div className="space-y-8">
          {/* Lane 1: WordPress */}
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
              <span className="flex items-center gap-2">
                <Database size={14} /> {t('speedComparison.wpLane')}
              </span>
              <span>
                {wpProgress >= 100 ? t('speedComparison.slow') : t('speedComparison.loading')}
              </span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${wpProgress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Lane 2: Custom */}
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
              <span className="flex items-center gap-2 text-primary font-bold">
                <HardDrives size={14} /> {t('speedComparison.customLane')}
              </span>
              <span className="text-primary font-bold">
                {customProgress >= 100
                  ? t('speedComparison.instant')
                  : t('speedComparison.loading')}
              </span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-primary shadow-[0_0_20px_rgba(20,122,122,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${customProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={startRace}
            disabled={isRunning}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/20"
          >
            {isRunning ? t('speedComparison.rendering') : t('speedComparison.startTest')}
          </button>
        </div>
      </div>
    </div>
  );
};
