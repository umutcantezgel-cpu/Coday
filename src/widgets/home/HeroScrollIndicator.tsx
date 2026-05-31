'use client';

import React, { useEffect, useState, useRef } from 'react';
import { CaretDown, Mouse } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

export const HeroScrollIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = indicatorRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={indicatorRef}
      aria-hidden="true"
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transform-gpu motion-reduce:animate-none transition-all duration-500 ease-out ${
        isVisible ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="flex flex-col items-center gap-2 animate-bounce">
        <OptimizedIcon icon={Mouse} className="w-6 h-6 text-text-muted" />
        <OptimizedIcon icon={CaretDown} className="w-4 h-4 text-text-muted" />
      </div>
    </div>
  );
};
