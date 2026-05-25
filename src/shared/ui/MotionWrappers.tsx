"use client";

import React, { ReactNode, useEffect, useRef, useState } from 'react';

// Custom hook to detect when an element enters the viewport
function useInView(ref: React.RefObject<HTMLElement | null>, once: boolean = true, margin: string = '-10%') {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin, ref]);

  return isInView;
}

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  layout?: boolean | 'position' | 'size' | 'preserve-aspect';
}

export const FadeInUp: React.FC<MotionWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  once = true,
  layout = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, once, '-10%');

  return (
    <div
      ref={ref}
      data-in-view={isInView}
      className={`transition-all ease-out opacity-0 translate-y-[30px] data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none transform-gpu will-change-transform ${className}`}
      style={{ transitionDuration: `${duration}s`, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<MotionWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  layout = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, once, '-10%');

  return (
    <div
      ref={ref}
      data-in-view={isInView}
      className={`transition-all ease-out opacity-0 scale-95 data-[in-view=true]:opacity-100 data-[in-view=true]:scale-100 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none transform-gpu will-change-transform ${className}`}
      style={{ transitionDuration: `${duration}s`, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const StaggerContainer: React.FC<
  Omit<MotionWrapperProps, 'delay' | 'duration'> & { staggerDelay?: number }
> = ({ children, className = '', once = true, staggerDelay = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, once, '-10%');

  useEffect(() => {
    if (ref.current) {
      const items = ref.current.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * staggerDelay}s`;
      });
    }
  }, [staggerDelay]);

  return (
    <div
      ref={ref}
      data-in-view={isInView}
      className={`group/stagger transition-opacity opacity-0 data-[in-view=true]:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
      style={{ transitionDuration: '0.3s' }}
    >
      {children}
    </div>
  );
};

export const StaggerItem: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div 
      className={`stagger-item transition-all ease-out opacity-0 translate-y-[20px] group-data-[in-view=true]/stagger:opacity-100 group-data-[in-view=true]/stagger:translate-y-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none transform-gpu will-change-transform ${className}`}
      style={{ transitionDuration: '0.5s' }}
    >
      {children}
    </div>
  );
};
