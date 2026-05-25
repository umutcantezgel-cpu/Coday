"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@/shared/ui/Icon';

const BeforeAfterReveal: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Images (Using placeholders that fit the theme for now, ideally real assets)

  // Fallback gradients if images fail
  const beforeFallback = 'bg-gradient-to-br from-gray-200 to-gray-300';
  const afterFallback = 'bg-gradient-to-br from-[#1A9A9A] to-[#2D3748]';

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0]!.clientX : event.clientX;

    const relativeX = clientX - containerRect.left;
    const percentage = Math.min(Math.max((relativeX / containerRect.width) * 100, 0), 100);

    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    // Initial measurement
    setContainerWidth(containerRef.current.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const percentage = Math.min(Math.max((relativeX / containerRect.width) * 100, 0), 100);
        setSliderPosition(percentage);
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-flat-lg border border-gray-100"
      onMouseMove={(e) => !isDragging && handleMove(e)} // Optional: Hover move
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Background (After / Premium) - Full Width */}
      <div className={`absolute inset-0 ${afterFallback} flex items-center justify-center`}>
        <div className="text-center p-8">
          <h3 className="text-4xl lg:text-5xl font-display font-black text-white mb-4 drop-shadow-md">
            Coday Design
          </h3>
          <p className="text-white/90 text-lg font-bold">Conversion-Optimized</p>

          {/* Mock UI Elements floating */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20"></div>
        </div>
      </div>

      {/* Foreground (Before / Boring) - Clipped */}
      <div
        className={`absolute inset-0 ${beforeFallback} flex items-center justify-center overflow-hidden border-r-4 border-white shadow-[10px_0_20px_rgba(0,0,0,0.2)]`}
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center w-full"
          style={{ width: containerWidth || '100vw' }}
        >
          {' '}
          {/* Fix width to prevent squishing content */}
          <div className="text-center p-8 grayscale opacity-70">
            <h3 className="text-4xl lg:text-5xl font-serif text-gray-500 mb-4">Old Agency</h3>
            <p className="text-gray-500 text-lg">Standard Template</p>

            <div className="absolute top-10 right-10 w-24 h-24 bg-gray-300 rounded-none border border-gray-400"></div>
            <div className="absolute bottom-10 left-10 w-32 h-16 bg-gray-300 rounded-none border border-gray-400"></div>
          </div>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
          <Icon name="code" className="text-xl" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 start-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
        Vorher (Standard)
      </div>
      <div className="absolute top-4 end-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
        Nachher (Premium)
      </div>
    </div>
  );
};

export default BeforeAfterReveal;
