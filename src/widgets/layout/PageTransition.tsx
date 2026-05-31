'use client';

import React from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { usePathname } from '@/i18n/navigation';

const transitionVariants: Variants = {
  initial: (custom: { direction: 'same' | 'deeper' | 'back'; shouldReduceMotion: boolean | null }) => {
    if (custom.shouldReduceMotion) return { opacity: 0 };
    if (custom.direction === 'deeper') return { opacity: 0, x: 20 };
    if (custom.direction === 'back') return { opacity: 0, x: -20 };
    return { opacity: 0 };
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: (custom: { direction: 'same' | 'deeper' | 'back'; shouldReduceMotion: boolean | null }) => {
    if (custom.shouldReduceMotion) return { opacity: 0, transition: { duration: 0.15 } };
    if (custom.direction === 'deeper') return { opacity: 0, x: -20, transition: { duration: 0.15 } };
    if (custom.direction === 'back') return { opacity: 0, x: 20, transition: { duration: 0.15 } };
    return { opacity: 0, transition: { duration: 0.15 } };
  },
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '';
  const shouldReduceMotion = useReducedMotion();
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const [direction, setDirection] = React.useState<'same' | 'deeper' | 'back'>('same');

  if (pathname !== prevPathname) {
    const prevSegments = prevPathname.split('/').filter(Boolean).length;
    const currSegments = pathname.split('/').filter(Boolean).length;
    
    let newDirection: 'same' | 'deeper' | 'back' = 'same';
    if (currSegments > prevSegments) newDirection = 'deeper';
    else if (currSegments < prevSegments) newDirection = 'back';
    
    setPrevPathname(pathname);
    setDirection(newDirection);
  }

  const customProps = {
    direction,
    shouldReduceMotion,
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="popLayout" custom={customProps}>
        <m.div
          key={pathname}
          custom={customProps}
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-grow flex flex-col min-h-screen"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};
