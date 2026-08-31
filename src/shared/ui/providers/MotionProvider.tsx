'use client';

import { MotionConfig, LazyMotion } from 'motion/react';
import { ReactNode } from 'react';

const loadFeatures = () => import('motion/react').then((res) => res.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
