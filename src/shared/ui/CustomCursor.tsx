'use client';
import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';

const subscribeToMediaQueries = (callback: () => void) => {
  const pointerQuery = window.matchMedia('(pointer: fine)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  pointerQuery.addEventListener('change', callback);
  motionQuery.addEventListener('change', callback);

  return () => {
    pointerQuery.removeEventListener('change', callback);
    motionQuery.removeEventListener('change', callback);
  };
};

const getMediaQuerySnapshot = () => {
  const pointerQuery = window.matchMedia('(pointer: fine)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return pointerQuery.matches && !motionQuery.matches;
};

const getServerSnapshot = () => false;

export const CustomCursor: React.FC = () => {
  // Use MotionValues to bypass React render cycle for 60fps performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for the outer circle
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToMediaQueries,
    getMediaQuerySnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!isDesktop) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    // Attach hover listeners to clickable elements
    const attachListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"]'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    };

    // Initial attach
    attachListeners();

    // Re-attach on DOM mutations (simplified)
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();

      const clickables = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"]'
      );
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [isDesktop, isVisible, mouseX, mouseY]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Small Dot */}
      <m.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-accent-500)',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      {/* Outer Circle */}
      <m.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(245, 158, 11, 0.5)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};
