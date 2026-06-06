'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';

/**
 * A one-time SplashScreen shown on first visit per session.
 */
export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    let hasSeen = false;
    try {
      hasSeen = !!sessionStorage.getItem('splash-seen');
    } catch (error) {
      // Ignore sessionStorage access errors
    }

    if (hasSeen) {
      setTimeout(() => {
        setShowSplash(false);
        setIsExited(true);
      }, 0);
      return;
    }

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('inert', '');
      mainContent.setAttribute('aria-hidden', 'true');
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem('splash-seen', 'true');
      } catch (error) {
        // Ignore sessionStorage access errors
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    setIsExited(true);
    document.documentElement.classList.add('splash-seen');
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.removeAttribute('inert');
      mainContent.removeAttribute('aria-hidden');
    }
  };

  if (isExited) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {showSplash && (
        <m.div
          id="splash-screen"
          role="status"
          aria-live="polite"
          aria-label="Loading Coday"
          className="fixed inset-0 z-[9999] bg-secondary flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="motion-reduce:!transform-none"
          >
            <div className="text-4xl font-bold tracking-tighter text-white">
              Coday<span className="text-primary">.</span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
