'use client';
import React, { useState, useEffect } from 'react';

export interface ClientRotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  mainClassName?: string;
  splitBy?: string;
  staggerFrom?: string | number;
  staggerDuration?: number;
}

export function ClientRotatingText({
  texts,
  rotationInterval = 3000,
  mainClassName = 'text-lg md:text-xl font-semibold text-primary-700 leading-relaxed justify-start text-left',
}: ClientRotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;
    const interval = setInterval(() => {
      setIsFading(true);
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setIsFading(false);
      }, 200);
      return () => clearTimeout(timer);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  if (!texts || texts.length === 0) return null;

  return (
    <span
      className={`inline-block transition-all duration-200 ease-out ${
        isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
      } ${mainClassName}`}
    >
      {texts[index] || texts[0]}
    </span>
  );
}
