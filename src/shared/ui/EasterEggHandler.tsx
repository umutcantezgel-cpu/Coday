'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const EasterEggHandler = () => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // We attach a global click listener to look for rapid clicks on anything with class 'easter-egg-trigger'
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.nav-pill-logo') || target.closest('.logo-icon')) {
        setClickCount((prev) => {
          const newCount = prev + 1;
          if (newCount === 5) {
            triggerEasterEgg();
            return 0; // Reset after trigger
          }
          return newCount;
        });

        // Reset count if they don't click fast enough (1.5 seconds)
        setTimeout(() => {
          setClickCount(0);
        }, 1500);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const triggerEasterEgg = () => {
    // 1. Confetti Explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b'], // Brand colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#f59e0b'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Matrix Hacker Mode (Invert Colors briefly)
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    document.documentElement.style.transition = 'filter 0.5s ease-in-out';

    setTimeout(() => {
      document.documentElement.style.filter = '';
    }, 3000);
  };

  return null; // Invisible global handler
};
