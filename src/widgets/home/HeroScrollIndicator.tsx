"use client";

import React, { useEffect, useState } from 'react';
import { CaretDown, Mouse } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

export const HeroScrollIndicator: React.FC = () => {
  const [opacity, setOpacity] = useState(0.6);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 0.6 - (scrollY / 300) * 0.6);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{ opacity, willChange: 'opacity, transform' }}
      aria-hidden="true"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20 transform-gpu"
    >
      <OptimizedIcon icon={Mouse} className="w-6 h-6 text-text-muted" />
      <OptimizedIcon icon={CaretDown} className="w-4 h-4 text-text-muted" />
    </div>
  );
};
