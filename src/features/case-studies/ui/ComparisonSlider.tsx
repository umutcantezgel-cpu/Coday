"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { DotsSixVertical } from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string; // 'aspect-video' or 'aspect-square' etc
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 'aspect-video',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  // Update width on mount/resize
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
      x.set(containerRef.current.offsetWidth / 2); // Start at 50%
    }
  }, [x]);

  // Use transform to map x to percentage 0-100 for clip-path
  const clipPath = useTransform(x, (currentX) => {
    const percentage = Math.max(0, Math.min(100, (currentX / width) * 100));
    return `inset(0 ${100 - percentage}% 0 0)`;
  });

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden cursor-ew-resize select-none my-16 shadow-2xl`}
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        {/* AFTER Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <OptimizedImage
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-10">
            {afterLabel}
          </span>
        </div>

        {/* BEFORE Image (Foreground with Clip Path) */}
        <motion.div style={{ clipPath }} className="absolute inset-0 w-full h-full z-20">
          <OptimizedImage
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-30">
            {beforeLabel}
          </span>
        </motion.div>

        {/* Handle */}
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: width }}
          dragElastic={0}
          dragMomentum={false}
          className="absolute top-0 bottom-0 w-1 bg-white z-40 cursor-ew-resize flex items-center justify-center group"
        >
          <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform group-active:scale-95">
            <DotsSixVertical size={20} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
