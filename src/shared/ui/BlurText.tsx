'use client';
import React, { useEffect, useRef, useState } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  direction?: 'top' | 'bottom';
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 80,
  className = '',
  animateBy = 'words',
  threshold = 0.1,
  rootMargin = '0px',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap items-baseline ${className}`}>
      {elements.map((segment, index) => (
        <span
          key={index}
          className={`inline-block transition duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:blur-0 ${
            inView ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[10px] translate-y-2'
          }`}
          style={{ transitionDelay: `${(index * delay) / 1000}s` }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
