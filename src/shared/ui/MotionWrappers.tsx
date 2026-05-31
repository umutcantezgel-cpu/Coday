'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const isInView = useScrollAnimation(ref, once);

  return (
    <div
      ref={ref}
      data-in-view={isInView}
      className={`transition-[transform,opacity] ease-out opacity-0 translate-y-[30px] data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none transform-gpu will-change-transform ${className}`}
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
  const isInView = useScrollAnimation(ref, once);

  return (
    <div
      ref={ref}
      data-in-view={isInView}
      className={`transition-[transform,opacity] ease-out opacity-0 scale-95 data-[in-view=true]:opacity-100 data-[in-view=true]:scale-100 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none transform-gpu will-change-transform ${className}`}
      style={{ transitionDuration: `${duration}s`, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const StaggerContainer: React.FC<Omit<MotionWrapperProps, 'delay' | 'duration'>> = ({
  children,
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollAnimation(ref, once);

  useEffect(() => {
    if (ref.current) {
      const items = ref.current.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${Math.min(index * 60, 400)}ms`;
      });
    }
  }, []);

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
      className={`stagger-item transition-[transform,opacity] ease-out opacity-0 translate-y-[20px] group-data-[in-view=true]/stagger:opacity-100 group-data-[in-view=true]/stagger:translate-y-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none transform-gpu will-change-transform ${className}`}
      style={{ transitionDuration: '0.5s' }}
    >
      {children}
    </div>
  );
};
