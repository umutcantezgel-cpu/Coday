import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/Icon';

const LoyaltyLoop: React.FC = () => {
  const { t } = useTranslation('industries');

  const steps = [
    { id: 'buy', icon: 'shopping-bag', color: 'bg-primary' },
    { id: 'points', icon: 'award', color: 'bg-secondary' },
    { id: 'redeem', icon: 'gift', color: 'bg-accent' },
    { id: 'repeat', icon: 'refresh-cw', color: 'bg-green-500' },
  ];

  return (
    <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 border border-white/5 relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
          <Icon name="repeat" className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-2">
          {t('ecommerce-retail.features.loyalty_loop.title')}
        </h3>
        <p className="text-gray-400 text-sm">
          {t('ecommerce-retail.features.loyalty_loop.description')}
        </p>
      </div>

      <div className="relative w-full max-w-[300px] mx-auto aspect-square">
        {/* Circular Path */}
        <svg
          className="absolute inset-0 w-full h-full rotate-0"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Animated Active Segment - Simulating flow */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1, rotate: 270 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Steps */}
        {steps.map((step, index) => {
          // Position items in a circle
          // 0 degrees is typically right (3 o'clock). We want 'buy' at top (12 o'clock) -> -90 deg
          const angleDeg = index * 90 - 90;
          const angleRad = angleDeg * (Math.PI / 180);
          const radius = 35; // Matches SVG circle radius percentage

          // Center is 50%, Radius is 35%
          const x = 50 + radius * Math.cos(angleRad);
          const y = 50 + radius * Math.sin(angleRad);

          return (
            <div
              key={step.id}
              className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                transition={{ delay: index * 2, duration: 2, repeat: Infinity, repeatDelay: 6 }}
                className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center shadow-lg shadow-black/50 border border-white/20 z-10 relative mb-1`}
              >
                {}
                <Icon
                  name={step.icon as React.ComponentProps<typeof Icon>['name']}
                  className="text-white w-4 h-4"
                />
              </motion.div>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur px-2 py-0.5 rounded border border-white/10 whitespace-nowrap">
                {t(`ecommerce-retail.features.loyalty_loop.steps.${step.id}`)}
              </span>
            </div>
          );
        })}

        {/* Central Hub */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-surface-dark border border-white/10 rounded-full flex items-center justify-center shadow-2xl relative z-0">
            <Icon name="users" className="text-primary w-8 h-8 opacity-50" />
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyLoop;
