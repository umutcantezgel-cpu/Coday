import React, { useState, useRef, useCallback } from 'react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

/**
 * Interactive Before/After comparison slider.
 * Uses CSS clip-path + input range for smooth, performant dragging.
 * Falls back to side-by-side for prefers-reduced-motion.
 */
export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  className = '',
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientX);
      }
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0]!.clientX);
    },
    [handleMove]
  );

  return (
    <div className={className}>
      {/* Interactive Slider — hidden for prefers-reduced-motion */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 aspect-[4/3] cursor-col-resize select-none motion-safe:block motion-reduce:hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 2));
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2));
        }}
      >
        {/* After Image (full, underneath) */}
        <div className="absolute inset-0">
          <OptimizedImage src={afterImage} alt={afterAlt} className="w-full h-full object-cover" />
        </div>

        {/* Before Image (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <OptimizedImage
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] z-20 pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-700"
              aria-hidden="true"
            >
              <path
                d="M7 4L3 10L7 16M13 4L17 10L13 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase px-3 py-1 rounded z-10 pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded z-10 pointer-events-none">
          {afterLabel}
        </div>
      </div>

      {/* Side-by-side fallback for prefers-reduced-motion */}
      <div className="motion-safe:hidden motion-reduce:grid grid-cols-2 gap-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 aspect-[4/3]">
          <OptimizedImage
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase px-3 py-1 rounded">
            {beforeLabel}
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 aspect-[4/3]">
          <OptimizedImage src={afterImage} alt={afterAlt} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded">
            {afterLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
