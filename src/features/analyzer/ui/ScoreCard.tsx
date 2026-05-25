"use client";

import React from 'react';
import { motion } from 'motion/react';
import { CircularGauge } from '@/features/analyzer/ui/CircularGauge';
import { WarningCircle, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useTranslations } from 'next-intl';

interface ScoreCardProps {
  title: string;
  score: number;
  icon: React.ElementType;
  color: string;
  summary: string;
  onClick?: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  icon,
  color,
  summary,
  onClick,
}) => {
  const t = useTranslations('analyzer');

  // Determine score color
  const getScoreBg = (score: number) => {
    if (score === -1) return 'bg-gray-50 border-gray-200 border-dashed opacity-75';
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl border-2 cursor-pointer
        transition-all duration-300 hover:shadow-xl
        ${getScoreBg(score)}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${score === -1 ? 'from-gray-400 to-gray-500' : color} flex items-center justify-center text-white`}
          >
            <OptimizedIcon icon={icon} className="text-xl" />
          </div>
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Score Bar */}
      {/* Score Gauge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <p className="text-sm text-gray-600 line-clamp-3">
            {score === -1 ? t('score_card.failed') : summary || t('score_card.waiting')}
          </p>
        </div>
        <div className="flex-shrink-0">
          {score === -1 ? (
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center bg-white">
              <OptimizedIcon icon={WarningCircle} className="text-gray-400 text-2xl" />
            </div>
          ) : (
            <CircularGauge score={score} size={64} color={color} />
          )}
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <OptimizedIcon icon={ArrowRight} className="text-primary text-sm" />
      </div>
    </motion.div>
  );
};

export default ScoreCard;
