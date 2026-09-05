'use client';

import { MotionConfig, LazyMotion } from 'motion/react';
import { ReactNode } from 'react';

// Defer domAnimation loading to browser idle so it never competes with initial paint & hydration
const loadFeatures = () => {
  return new Promise<any>((resolve) => {
    if (typeof window === 'undefined') {
      import('motion/react').then((res) => resolve(res.domAnimation));
      return;
    }

    const load = () => {
      import('motion/react').then((res) => resolve(res.domAnimation));
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(load, { timeout: 6000 });
    } else {
      setTimeout(load, 3500);
    }
  });
};

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
