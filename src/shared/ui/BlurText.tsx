'use client';
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

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
  threshold = 0,
  rootMargin = '0px',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const isHydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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
          className={`inline-block transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform] transform-gpu motion-reduce:transition-none ${
            !isHydrated || inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
          }`}
          style={{ transitionDelay: isHydrated && inView ? `${(index * delay) / 1000}s` : '0s' }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
