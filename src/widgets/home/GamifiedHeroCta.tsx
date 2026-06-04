'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useRouter } from '@/i18n/navigation';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';

export const GamifiedHeroCta: React.FC = () => {
  const router = useRouter();
  const radius = 100; // Size of the C-curve
  const diameter = radius * 2;
  const knobSize = 64; // Size of the 'O'

  const containerRef = useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);
  const controls = useAnimation();

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate X position based on Y position to form a C curve (left half of a circle)
  const xPos = useTransform(dragY, (val) => {
    const vy = val - radius;
    // Constrain to prevent NaN due to elastic drag bounce
    const constrainedVy = Math.max(-radius, Math.min(radius, vy));
    return -Math.sqrt(radius * radius - constrainedVy * constrainedVy);
  });

  // Opacity of the "Potenzialanalyse starten" text increases as you drag down
  const progressTextOpacity = useTransform(dragY, [0, radius, diameter], [0.3, 1, 0]);

  // Scale of the checkmark / success state when reaching the bottom
  const successScale = useTransform(dragY, [diameter * 0.8, diameter], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (dragY.get() >= diameter * 0.9) {
      // Reached the end! Trigger haptic and redirect
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
      controls.start({
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      router.push('/booking');
    } else {
      // Snap back to top
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      });
      // We manually update dragY back to 0 so the xPos math follows
      // Framer motion controls animate the DOM element, but sometimes we need to animate the MotionValue itself.
    }
  };

  // We need to animate the motion value directly to ensure X updates correctly on snap back
  useEffect(() => {
    if (!isDragging && dragY.get() > 0 && dragY.get() < diameter * 0.9) {
      const animation = setInterval(() => {
        const current = dragY.get();
        if (current <= 1) {
          dragY.set(0);
          clearInterval(animation);
        } else {
          dragY.set(current * 0.8); // Simple easing back to 0
        }
      }, 16);
      return () => clearInterval(animation);
    }
  }, [isDragging, dragY, diameter]);

  const handleClick = () => {
    if (dragY.get() < 10 && !isDragging) {
      router.push('/work');
    }
  };

  return (
    <div
      className="relative flex items-center justify-end w-[280px] h-[300px] select-none"
      ref={containerRef}
    >
      {/* Background SVG Track (The 'C') */}
      <svg
        width={radius + knobSize}
        height={diameter + knobSize}
        viewBox={`0 0 ${radius + knobSize} ${diameter + knobSize}`}
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <path
          d={`M ${radius + knobSize / 2} ${knobSize / 2} A ${radius} ${radius} 0 0 0 ${radius + knobSize / 2} ${diameter + knobSize / 2}`}
          fill="none"
          stroke="rgba(20, 20, 20, 0.05)" // Light theme subtle track
          strokeWidth="12"
          strokeLinecap="round"
          className="dark:stroke-white/10"
        />
        {/* Glow effect path */}
        <path
          d={`M ${radius + knobSize / 2} ${knobSize / 2} A ${radius} ${radius} 0 0 0 ${radius + knobSize / 2} ${diameter + knobSize / 2}`}
          fill="none"
          stroke="url(#gradientC)"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-50"
        />
        <defs>
          <linearGradient id="gradientC" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--color-secondary-500)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Instructional Text Inside the C */}
      <div className="absolute right-[120px] top-1/2 -translate-y-1/2 flex flex-col items-end text-right pointer-events-none">
        <motion.div
          style={{ opacity: progressTextOpacity }}
          className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-1"
        >
          Potenzialanalyse
        </motion.div>
        <div className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-gray-600 flex items-center gap-1">
          <ArrowRight className="w-3 h-3 rotate-90" /> Ziehen
        </div>
      </div>

      {/* The Draggable 'O' Knob */}
      <div className="relative h-full w-[100px] flex justify-end">
        <div className="absolute top-[50px] right-0 h-[200px] w-[20px]" />{' '}
        {/* Drag Area Boundary */}
        <motion.div
          className="absolute right-0 top-[20px] z-10 touch-none flex flex-col items-center cursor-grab active:cursor-grabbing"
          style={{ y: dragY, x: xPos }}
          drag="y"
          dragConstraints={{ top: 0, bottom: diameter }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
          animate={controls}
        >
          {/* The Knob UI */}
          <motion.div
            className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-[4px] border-primary-500 shadow-xl shadow-primary-500/30 flex items-center justify-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Default State: Sparkle (or Results icon) */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ opacity: useTransform(dragY, [0, 50], [1, 0]) }}
            >
              <span className="text-[8px] font-bold text-gray-400 mb-0.5 tracking-wider uppercase">
                Klick
              </span>
              <span className="text-[10px] font-medium text-gray-800 dark:text-gray-200">
                Projekte
              </span>
            </motion.div>

            {/* Dragging State: Arrow Down */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ opacity: useTransform(dragY, [20, 80], [0, 1]) }}
            >
              <ArrowRight className="w-6 h-6 text-primary-500 rotate-90" />
            </motion.div>

            {/* Success State: Check/Sparkle */}
            <motion.div
              className="absolute inset-0 bg-primary-500 flex items-center justify-center pointer-events-none"
              style={{ scale: successScale, opacity: successScale }}
            >
              <Sparkle weight="fill" className="w-6 h-6 text-white animate-pulse" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-8 whitespace-nowrap text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isHovered && !isDragging && dragY.get() === 0 ? 1 : 0,
              y: isHovered && !isDragging && dragY.get() === 0 ? 0 : -10,
            }}
          >
            Klick für Ergebnisse
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
