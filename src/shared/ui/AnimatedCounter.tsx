'use client';
import React, { useEffect, useRef } from 'react';
import { m, useInView, useSpring, useTransform, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  value: string | number;
  label?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  valueClassName?: string;
}

const parseValue = (val: string | number) => {
  if (typeof val === 'number') {
    return { prefix: '', num: val, suffix: '', isAnimatable: true, decimals: 0 };
  }
  const match = val.match(/^([^0-9.-]*)([0-9.,:]+)([^0-9]*)$/);
  if (!match) return { prefix: '', num: 0, suffix: val, isAnimatable: false, decimals: 0 };

  const prefix = match[1]!;
  const numStr = match[2]!;
  const suffix = match[3]!;

  if (numStr.includes(':')) {
    return { prefix: '', num: 0, suffix: val, isAnimatable: false, decimals: 0 };
  }

  const num = parseFloat(numStr.replace(',', '.'));
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  return { prefix, num, suffix, isAnimatable: true, decimals };
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  prefix: propPrefix,
  suffix: propSuffix,
  duration = 2,
  className = '',
  valueClassName = 'text-4xl lg:text-5xl font-black',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const {
    prefix: parsedPrefix,
    num,
    suffix: parsedSuffix,
    isAnimatable,
    decimals,
  } = parseValue(value);
  const finalPrefix = propPrefix || parsedPrefix;
  const finalSuffix = propSuffix || parsedSuffix;

  const springValue = useSpring(0, {
    duration: prefersReducedMotion ? 0 : duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView && isAnimatable) {
      if (prefersReducedMotion) {
        springValue.jump(num);
      } else {
        springValue.set(num);
      }
    }
  }, [isInView, num, isAnimatable, springValue, prefersReducedMotion]);

  const displayValue = useTransform(springValue, (current) => current.toFixed(decimals));

  return (
    <div ref={ref} className={className}>
      <div className="flex items-baseline gap-1">
        {finalPrefix && <span className={valueClassName}>{finalPrefix}</span>}
        {isAnimatable ? (
          <m.span className={valueClassName}>{displayValue}</m.span>
        ) : (
          <span className={valueClassName}>{value}</span>
        )}
        {finalSuffix && <span className={valueClassName}>{finalSuffix}</span>}
      </div>
      {label && (
        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">
          {label}
        </div>
      )}
    </div>
  );
};
