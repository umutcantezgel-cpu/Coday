'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [transitionClass, setTransitionClass] = useState('animate-fade-in');
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      const prevDepth = prevPathRef.current.split('/').filter(Boolean).length;
      const currDepth = pathname.split('/').filter(Boolean).length;

      if (currDepth > prevDepth) {
        setTransitionClass('animate-slide-in-right');
      } else if (currDepth < prevDepth) {
        setTransitionClass('animate-slide-in-left');
      } else {
        setTransitionClass('animate-fade-in');
      }
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <div key={pathname} className={`motion-reduce:animate-none ${transitionClass}`}>
      {children}
    </div>
  );
}
