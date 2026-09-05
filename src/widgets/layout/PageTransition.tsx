'use client';

import React, { useRef, useState, useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import dynamic from 'next/dynamic';

const AnimatedPageTransition = dynamic(
  () => import('./AnimatedPageTransition').then((mod) => mod.AnimatedPageTransition),
  { ssr: false }
);

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '';
  const initialPathname = useRef(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setHasNavigated(true);
    }
  }, [pathname]);

  if (!hasNavigated) {
    return <div className="flex-grow flex flex-col min-h-screen">{children}</div>;
  }

  return <AnimatedPageTransition pathname={pathname}>{children}</AnimatedPageTransition>;
};
