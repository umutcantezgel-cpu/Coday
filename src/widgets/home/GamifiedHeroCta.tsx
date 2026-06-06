'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m, useMotionValue, useTransform, useAnimation } from 'motion/react';
import { useRouter } from '@/i18n/navigation';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';

export const GamifiedHeroCta: React.FC = () => {
  const router = useRouter();

  // Dimensions optimized for all screens (safe for mobile)
  const radius = 110;
  const diameter = radius * 2;
  const knobSize = 68; // Slightly larger, more premium knob
  const trackThickness = 72; // Thick track for the knob to slide inside

  const containerRef = useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);
  const controls = useAnimation();

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mathematics: The X position based on Y position (Left half of a circle)
  const xPos = useTransform(dragY, (val) => {
    const vy = val - radius;
    const constrainedVy = Math.max(-radius, Math.min(radius, vy));
    return -Math.sqrt(radius * radius - constrainedVy * constrainedVy);
  });

  const progressTextOpacity = useTransform(dragY, [0, radius], [0.5, 0]);
  const successScale = useTransform(dragY, [diameter * 0.8, diameter], [0, 1]);
  const bgKnobOpacity = useTransform(dragY, [0, diameter], [1, 0]);

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY.get() >= diameter * 0.85) {
      // Reached the bottom -> Vibrate & Navigate
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
      controls.start({
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      router.push('/booking');
    } else {
      // Snap back to top
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      });
    }
  };

  // Animate the motion value directly to ensure X updates correctly on snap back
  useEffect(() => {
    if (!isDragging && dragY.get() > 0 && dragY.get() < diameter * 0.85) {
      const animation = setInterval(() => {
        const current = dragY.get();
        if (current <= 1) {
          dragY.set(0);
          clearInterval(animation);
        } else {
          dragY.set(current * 0.8);
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
      className="relative flex items-center justify-end w-full max-w-[340px] h-[340px] select-none mx-auto lg:mr-0"
      ref={containerRef}
    >
      {/* Thick Background SVG Track */}
      <svg
        width={radius + trackThickness}
        height={diameter + trackThickness}
        viewBox={`0 0 ${radius + trackThickness} ${diameter + trackThickness}`}
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        {/* The Thick Coday C */}
        <path
          d={`M ${radius + trackThickness / 2} ${trackThickness / 2} A ${radius} ${radius} 0 0 0 ${radius + trackThickness / 2} ${diameter + trackThickness / 2}`}
          fill="none"
          stroke="var(--color-primary-500)"
          strokeWidth="24"
          strokeLinecap="round"
          className="drop-shadow-[0_0_20px_var(--color-primary-400)]"
        />
      </svg>

      {/* Instructional Text Inside the C */}
      <div className="absolute right-[140px] top-1/2 -translate-y-1/2 flex flex-col items-end text-right pointer-events-none pr-4">
        <m.div
          style={{ opacity: progressTextOpacity }}
          className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-1"
        >
          Potenzialanalyse
        </m.div>
        <m.div
          style={{ opacity: progressTextOpacity }}
          className="text-[10px] md:text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 flex items-center gap-1.5 font-bold"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-90" /> Nach unten ziehen
        </m.div>
      </div>

      {/* The Draggable 'O' Knob */}
      <div className="relative h-full w-[100px] flex justify-end">
        {/* Invisible hit area for drag stability */}
        <div className="absolute top-[30px] right-0 h-[280px] w-[60px]" />

        <m.div
          className="absolute right-0 top-[30px] z-10 touch-none flex flex-col items-center cursor-grab active:cursor-grabbing"
          style={{ y: dragY, x: xPos }}
          drag="y"
          dragConstraints={{ top: 0, bottom: diameter }}
          dragElastic={0.02}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
          animate={controls}
        >
          {/* The Knob UI - Now extremely premium and thick */}
          <m.div
            className="w-[68px] h-[68px] rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)] flex items-center justify-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 rounded-full" />
            <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Default State: Results CTA */}
            <m.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ opacity: bgKnobOpacity }}
            >
              <span className="text-[8px] font-bold text-gray-400 dark:text-gray-500 mb-0.5 tracking-wider uppercase">
                Klick
              </span>
              <span className="text-[10px] font-bold text-gray-900 dark:text-white">Projekte</span>
            </m.div>

            {/* Success State: Check/Sparkle */}
            <m.div
              className="absolute inset-0 bg-primary-500 flex items-center justify-center pointer-events-none shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2)]"
              style={{ scale: successScale, opacity: successScale }}
            >
              <Sparkle weight="fill" className="w-7 h-7 text-white animate-pulse" />
            </m.div>
          </m.div>

          <m.div
            className="absolute -bottom-10 whitespace-nowrap text-[11px] font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full shadow-lg border border-primary-100 dark:border-primary-800"
            initial={{ opacity: 0, y: -5 }}
            animate={{
              opacity: isHovered && !isDragging && dragY.get() === 0 ? 1 : 0,
              y: isHovered && !isDragging && dragY.get() === 0 ? 0 : -5,
            }}
          >
            Klick für Ergebnisse
          </m.div>
        </m.div>
      </div>
    </div>
  );
};
