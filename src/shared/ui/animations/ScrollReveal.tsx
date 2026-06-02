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
      className={`transition-[transform,opacity] duration-[400ms] ease-appear motion-reduce:transition-none ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
