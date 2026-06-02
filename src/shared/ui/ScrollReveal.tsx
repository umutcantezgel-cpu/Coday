'use client';

import React, { useMemo, ReactNode, RefObject, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>; // Kept for API compat
  enableBlur?: boolean; // Ignored
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number; // Ignored
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string; // Ignored
  wordAnimationEnd?: string; // Ignored
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseOpacity = 0.1,
  baseRotation = 3,
  containerClassName = '',
  textClassName = '',
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useScrollAnimation(ref, true);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span
          className="inline-block word transition-opacity ease-out motion-reduce:transition-none"
          key={index}
          style={{
            opacity: isInView ? 1 : baseOpacity,
            transitionDuration: '0.8s',
            transitionDelay: `${Math.min(index * 60, 400)}ms`,
          }}
        >
          {word}
        </span>
      );
    });
  }, [children, baseOpacity, isInView]);

  return (
    <h2
      ref={ref}
      data-in-view={isInView}
      className={`my-5 transition-[transform,opacity] ease-out ${containerClassName} motion-reduce:transition-none`}
      style={{
        transform: isInView ? 'rotate(0deg)' : `rotate(${baseRotation}deg)`,
        transformOrigin: '0% 50%',
        transitionDuration: '0.8s',
      }}
    >
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
