'use client';

import React from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'motion/react';
import { usePathname } from '@/i18n/navigation';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="popLayout">
        <m.div
          key={pathname}
          initial={{ opacity: 0, y: 15, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.99 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-grow flex flex-col min-h-screen"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};
