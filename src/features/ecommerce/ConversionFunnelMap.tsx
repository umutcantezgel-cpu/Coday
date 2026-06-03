'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useRtl } from '@/shared/hooks/useRtl';

const ConversionFunnelMap: React.FC = () => {
  const { isRtl } = useRtl();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      name: 'Landing',
      userCount: '100%',
      drop: 'Standard: 50% Drop',
      fix: 'Speed Optimization & Clarity',
      color: '#60A5FA',
    },
    {
      name: 'Product View',
      userCount: '50%',
      drop: 'Standard: 70% Drop',
      fix: 'High-Res Images, Social Proof, 3D',
      color: '#818CF8',
    },
    {
      name: 'Add to Cart',
      userCount: '15%',
      drop: 'Standard: 60% Drop',
      fix: 'Sticky ATC, Upsells, No Account Req.',
      color: '#A78BFA',
    },
    {
      name: 'Checkout',
      userCount: '6%',
      drop: 'Standard: 40% Drop',
      fix: 'One-Click-Checkout, Trust Badges',
      color: '#C084FC',
    },
    {
      name: 'Purchase',
      userCount: '3.6%',
      drop: 'Success',
      fix: 'Thank You Page Upsells',
      color: '#E879F9',
    },
  ];

  return (
    <div className="py-12">
      <h3 className="font-display font-bold text-2xl text-secondary mb-12 text-center">
        We fix the leaks.
      </h3>

      <div
        className="flex flex-col items-center max-w-2xl mx-auto space-y-2"
        role="list"
        aria-label="Conversion funnel steps: from 100% landing visitors to 3.6% purchase"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredStep(idx)}
            onMouseLeave={() => setHoveredStep(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="w-full relative group"
            role="listitem"
          >
            {/* Funnel Bar */}
            <button
              type="button"
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
              onFocus={() => setHoveredStep(idx)}
              onBlur={() => setHoveredStep(null)}
              className="bg-gradient-to-r mx-auto rounded-xl flex items-center justify-between px-6 py-4 shadow-sm transition motion-reduce:duration-[0.01ms] duration-300 group-hover:scale-105 group-hover:shadow-lg relative z-10 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                width: `${100 - idx * 15}%`,
                minWidth: '300px',
                background: `linear-gradient(to ${isRtl ? 'left' : 'right'}, ${step.color}, #ffffff)`,
              }}
              aria-describedby={`funnel-tooltip-${idx}`}
            >
              <span className="font-bold text-white drop-shadow-md">{step.name}</span>
              <span className="font-mono font-bold text-white bg-black/10 px-2 py-1 rounded">
                {step.userCount}
              </span>
            </button>

            <div
              id={`funnel-tooltip-${idx}`}
              role="tooltip"
              className={`absolute top-1/2 -translate-y-1/2 w-64 bg-surface-dark text-white p-4 rounded-xl shadow-xl border border-gray-700 transition motion-reduce:duration-[0.01ms] duration-300 z-20
                                ${isRtl ? 'right-full mr-4' : 'left-full ml-4'}
                                ${
                                  hoveredStep === idx
                                    ? 'opacity-100 translate-x-0'
                                    : `opacity-0 ${isRtl ? 'translate-x-4' : '-translate-x-4'} pointer-events-none`
                                }
                            `}
            >
              <div className="text-xs text-gray-400 uppercase font-bold mb-1">
                Optimization Strategy
              </div>
              <div className="text-primary font-bold mb-1">{step.fix}</div>
              <div className="text-xs text-gray-500">{step.drop}</div>

              {/* Connector Arrow */}
              <div
                className={`absolute top-1/2 -mt-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent
                                ${isRtl ? 'left-full border-l-8 border-l-surface-dark' : 'right-full border-r-8 border-r-surface-dark'}
                            `}
              ></div>
            </div>

            {/* Dropoff connector lines */}
            {idx < steps.length - 1 && <div className="h-2 w-0.5 bg-gray-200 mx-auto"></div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConversionFunnelMap;
