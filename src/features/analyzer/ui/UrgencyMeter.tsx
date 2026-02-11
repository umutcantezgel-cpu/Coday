import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@/shared/ui/Icon';

export interface UrgencyMeterProps {
  score: number;
}

export const UrgencyMeter: React.FC<UrgencyMeterProps> = ({ score }) => {
  // Score determines color: Low (Good) -> High (Urgent/Bad)
  const getColor = (s: number) => {
    if (s < 30) return '#22c55e'; // Green (Low urgency)
    if (s < 70) return '#eab308'; // Yellow/Orange (Medium)
    return '#ef4444'; // Red (High score = High urgency)
  };

  const color = getColor(score);
  const strokeWidth = 12;
  // Radius for the SVG arc
  const radius = 80;
  const arcLength = Math.PI * radius; // Semi-circle circumference

  // Clamp score 0-100 just in case
  const clampedScore = Math.min(100, Math.max(0, score));

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center flex flex-col items-center justify-center h-full relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div
        className={`absolute inset-0 opacity-5 bg-gradient-to-br ${
          score < 30
            ? 'from-green-500 to-emerald-500'
            : score < 70
              ? 'from-yellow-500 to-orange-500'
              : 'from-red-500 to-orange-600'
        }`}
      />

      <h3 className="text-lg font-bold text-gray-600 uppercase tracking-wider mb-6 relative z-10">
        Handlungsbedarf
      </h3>

      {/* Gauge Graphic */}
      <div className="relative w-full max-w-[220px] h-[110px] flex justify-center overflow-hidden mb-2 z-10">
        <svg
          width="220"
          height="120"
          viewBox="0 0 220 120"
          className="overflow-visible"
          role="img"
          aria-label={`Dringlichkeitsscore: ${Math.round(score)} von 100`}
        >
          {/* Background Track (Grey) */}
          <path
            d="M 30 110 A 80 80 0 0 1 190 110"
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />

          {/* Score Progress Track (Colored) */}
          <motion.path
            d="M 30 110 A 80 80 0 0 1 190 110"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={arcLength} // Start completely hidden
            animate={{
              // Reduce offset to reveal the stroke based on score %
              strokeDashoffset: arcLength * (1 - clampedScore / 100),
            }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          />
        </svg>

        {/* Score Number Overlay */}
        <div className="absolute bottom-0 text-center w-full translate-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-5xl font-black text-gray-800"
          >
            {Math.round(score)}
            <span className="text-2xl text-gray-400 font-bold ml-1">%</span>
          </motion.div>
        </div>
      </div>

      {/* Context Text */}
      <p className="text-gray-500 relative z-10 mt-4 font-medium">
        {score < 30
          ? 'Alles im grünen Bereich'
          : score < 70
            ? 'Einige Optimierungen nötig'
            : 'Kritische Fehler gefunden!'}
      </p>

      {/* Warning Badge for High Scores */}
      {score >= 50 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold flex items-center gap-1.5 z-10 border border-red-100"
        >
          <Icon name="warning" weight="bold" />
          <span>DRINGEND</span>
        </motion.div>
      )}
    </div>
  );
};

export default UrgencyMeter;
