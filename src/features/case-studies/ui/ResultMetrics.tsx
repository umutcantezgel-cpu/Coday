"use client";
import React, { useEffect, useRef } from 'react';
import { useInView, useSpring, useMotionValue } from 'motion/react';
import { useLocale } from 'next-intl';
import { formatNumber } from '@/shared/utils/formatters';

const AnimatedCounter = ({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        // Format with local separator if needed, simple for now
        ref.current.textContent = formatNumber(Math.floor(latest), locale);
      }
    });
  }, [springValue, locale]);

  return (
    <div className="flex items-baseline justify-center gap-1">
      {prefix && <span className="text-4xl md:text-5xl font-bold text-primary">{prefix}</span>}
      <span
        ref={ref}
        className="text-6xl md:text-7xl font-display font-black text-secondary tracking-tight"
      >
        0
      </span>
      {suffix && <span className="text-4xl md:text-5xl font-bold text-primary">{suffix}</span>}
    </div>
  );
};

export interface MetricItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const ResultMetrics: React.FC<{ metrics: MetricItem[] }> = ({ metrics }) => {
  return (
    <section className="py-[var(--space-section)] my-24">
      <div className="bg-surface-light rounded-[2.5rem] p-12 md:p-20 border border-white/50 shadow-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
          </svg>
        </div>

        <h2 className="text-center font-display font-bold text-3xl mb-16 text-secondary">
          Measurable Impact
        </h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center pt-8 md:pt-0 px-4">
              <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              <p className="mt-4 text-gray-500 font-medium text-lg uppercase tracking-wide">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
