'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RocketLaunch } from '@phosphor-icons/react/dist/ssr';

export const RocketToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Reset rocket state after it flies off
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{
            opacity: 1,
            y: isLaunching ? -1000 : 0,
            scale: isLaunching ? 1.5 : 1,
            rotate: isLaunching ? [0, -10, 10, -5, 5, 0] : 0,
          }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{
            duration: isLaunching ? 1 : 0.4,
            type: isLaunching ? 'tween' : 'spring',
            ease: isLaunching ? 'easeIn' : undefined,
          }}
          className="fixed bottom-8 right-8 z-[90] p-4 bg-primary text-white rounded-full shadow-lg hover:shadow-brand-lg hover:bg-primary/90 flex justify-center items-center overflow-visible"
          aria-label="Back to top"
        >
          <RocketLaunch weight="fill" className="w-6 h-6" />

          {/* Fire Particles when launching */}
          <AnimatePresence>
            {isLaunching && (
              <motion.div
                initial={{ opacity: 1, scaleY: 0 }}
                style={{ transformOrigin: 'top' }}
                animate={{ opacity: 0, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-full w-4 h-[100px] bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent blur-sm rounded-b-full motion-reduce:transition-none"
              />
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
