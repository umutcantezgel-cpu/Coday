'use client';

import { MotionConfig, LazyMotion } from 'motion/react';
import { ReactNode } from 'react';

// Defer domAnimation loading to first user interaction or long idle fallback so it never competes with initial paint & hydration
const loadFeatures = () => {
  return new Promise<any>((resolve) => {
    // `./motionFeatures` re-exports domAnimation as a single default binding.
    // Importing the package namespace here instead kept the whole feature set
    // in the lazy chunk, because webpack cannot tree-shake a namespace it must
    // hand to the callback intact.
    const load = () => {
      import('./motionFeatures').then((res) => resolve(res.default));
    };

    if (typeof window === 'undefined') {
      load();
      return;
    }

    const events = ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'];
    const onInteract = () => {
      events.forEach((ev) => window.removeEventListener(ev, onInteract));
      clearTimeout(timer);
      load();
    };

    events.forEach((ev) => window.addEventListener(ev, onInteract, { once: true, passive: true }));
    const timer = setTimeout(() => {
      events.forEach((ev) => window.removeEventListener(ev, onInteract));
      load();
    }, 8000);
  });
};

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
