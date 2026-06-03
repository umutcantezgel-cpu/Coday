'use client';

import React, { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function ScrollReveal({ children, className = '', index = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollAnimation(ref);

  const delayMs = Math.min(index * 60, 400);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(4rem)',
        filter: isInView ? 'blur(0px)' : 'blur(8px)',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
