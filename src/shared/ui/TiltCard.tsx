'use client';

import React, { useRef } from 'react';
import { m, LazyMotion, domAnimation, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/shared/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className, glare = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glareBackground = useTransform([mouseXSpring, mouseYSpring], ([latestX, latestY]: any) => {
    const angle = Math.atan2(latestY, latestX) * (180 / Math.PI);
    const opacity = (Math.abs(latestX as number) + Math.abs(latestY as number)) * 0.4;
    return `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 80%)`;
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative w-full h-full transition-shadow motion-reduce:duration-[0.01ms] duration-300',
          className
        )}
      >
        <m.div
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          className="w-full h-full"
        >
          {children}

          {glare && (
            <m.div
              className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] overflow-hidden"
              style={{
                background: glareBackground,
              }}
            />
          )}
        </m.div>
      </m.div>
    </LazyMotion>
  );
};
