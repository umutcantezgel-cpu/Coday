'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m } from 'motion/react';
import { StrobiAvatar } from '@/entities/avatar';
import { useStrobiWorldStore, SCALE_DIMENSIONS } from '../model/strobiWorldStore';
import { useMiiPhysics } from '../lib/useMiiPhysics';
import { usePettingPhysics } from '../lib/usePettingPhysics';
import { StrobiSpeechBubble } from './StrobiSpeechBubble';
import { StrobiParticleOverlay } from './StrobiParticleOverlay';
import { StrobiMiniGame } from './StrobiMiniGame';
import { Coffee, Laptop, Star } from '@phosphor-icons/react/dist/ssr';

export const StrobiMiiCanvas: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const {
    scaleMode,
    roomTheme,
    interactionMode,
    equippedItems,
    avatarState,
    auraColor,
    isSpeaking,
    isMiniGameActive,
    startMiniGame,
    stopMiniGame,
  } = useStrobiWorldStore();

  // Resize observer for physics boundaries
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { physics, handleDragStart, handleDragMove, handleDragEnd } = useMiiPhysics(
    dimensions.width,
    dimensions.height
  );

  const { particles, handlePointerEnter, handlePointerLeave, handlePointerMove } =
    usePettingPhysics();

  const currentScale = SCALE_DIMENSIONS[scaleMode];

  // Drag interaction tracking
  const [dragPointerId, setDragPointerId] = useState<number | null>(null);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (interactionMode === 'toss' || interactionMode === 'free') {
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragPointerId(e.pointerId);
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
      handleDragStart(e.clientX, e.clientY);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (interactionMode === 'pet') {
      handlePointerMove(e);
      return;
    }

    if (dragPointerId === e.pointerId) {
      const dx = e.clientX - lastPointerPos.current.x;
      const dy = e.clientY - lastPointerPos.current.y;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
      handleDragMove(e.clientX, e.clientY, dx, dy);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe pointer release
      }
      setDragPointerId(null);
      handleDragEnd();
    }
  };

  // 4 Architectural Studio Light Theme Styles
  const THEME_STYLES = {
    'performance-studio': {
      bg: 'bg-gradient-to-b from-blue-50/40 via-white to-slate-100/70',
      gridColor: 'rgba(37, 99, 235, 0.08)',
      glowColor: '#3B82F6',
    },
    'minimalist-slate': {
      bg: 'bg-gradient-to-b from-slate-50 via-white to-slate-100/90',
      gridColor: 'rgba(100, 116, 139, 0.08)',
      glowColor: '#64748B',
    },
    'warm-daylight': {
      bg: 'bg-gradient-to-b from-amber-50/40 via-white to-orange-50/40',
      gridColor: 'rgba(217, 119, 6, 0.08)',
      glowColor: '#D97706',
    },
    'nature-lab': {
      bg: 'bg-gradient-to-b from-emerald-50/40 via-white to-teal-50/40',
      gridColor: 'rgba(16, 185, 129, 0.08)',
      glowColor: '#10B981',
    },
  }[roomTheme] || {
    bg: 'bg-gradient-to-b from-blue-50/40 via-white to-slate-100/70',
    gridColor: 'rgba(37, 99, 235, 0.08)',
    glowColor: '#3B82F6',
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[580px] md:h-[660px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col items-center justify-between p-6 select-none ${THEME_STYLES.bg} ${className}`}
    >
      {/* Pure Vector Particles Overlay */}
      <StrobiParticleOverlay particles={particles} />

      {/* Arcade Mini-Game Canvas Overlay */}
      {isMiniGameActive && <StrobiMiniGame onClose={stopMiniGame} />}

      {/* Fine CAD Floor Grid in Perspective */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none opacity-80"
        style={{
          perspective: 600,
        }}
      >
        <div
          className="w-full h-full transform rotate-x-60 origin-bottom"
          style={{
            backgroundImage: `linear-gradient(to right, ${THEME_STYLES.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${THEME_STYLES.gridColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 85%)',
          }}
        />
      </div>

      {/* Soft Ambient Light Dome */}
      <div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: auraColor || THEME_STYLES.glowColor }}
      />

      {/* Speech Bubble Floating Area */}
      <div className="w-full flex justify-center z-40 pt-2">
        <StrobiSpeechBubble
          onStartGame={startMiniGame}
          onGiveCoffee={() => {
            if (!equippedItems.includes('coffee')) {
              useStrobiWorldStore.getState().toggleItem('coffee');
            }
          }}
        />
      </div>

      {/* Central Interactive Strobi Mii Avatar Stage (Strictly Upright) */}
      <div className="relative flex-1 w-full flex items-center justify-center z-20">
        {/* Dynamic Ambient Occlusion Drop Shadow on Floor */}
        <div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-200 pointer-events-none"
          style={{
            width: currentScale * 0.75,
            height: currentScale * 0.16,
            backgroundColor: 'rgba(15, 23, 42, 0.18)',
            filter: physics.isDragging ? 'blur(10px)' : 'blur(4px)',
            opacity: physics.isDragging ? 0.3 : 0.65,
            transform: `translate(-50%, ${physics.y * 0.2}px) scale(${
              physics.isDragging ? 1.2 : 1
            })`,
          }}
        />

        <m.div
          animate={{
            x: physics.x,
            y: physics.y,
            rotate: 0, // Strictly stabilized upright: no tilting/skewing bug
          }}
          transition={
            physics.isDragging ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 24 }
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className={`relative cursor-grab active:cursor-grabbing touch-none flex items-center justify-center ${
            interactionMode === 'pet' ? 'cursor-pointer' : ''
          }`}
          style={{
            width: currentScale,
            height: currentScale,
          }}
        >
          {/* Main Strobi 3D Avatar (Upright & Ausgebaut) */}
          <StrobiAvatar
            state={avatarState}
            dimension={currentScale}
            auraColor={auraColor}
            isSpeaking={isSpeaking}
            enableBreathing={!physics.isDragging && !physics.isAirborne}
            enableTracking={true}
            interactive={true}
            ariaLabel="Strobi Mii Avatar"
          />

          {/* Accessory: Espresso Cup */}
          {equippedItems.includes('coffee') && (
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-2 -left-6 bg-white/95 border border-amber-300/80 p-2 rounded-2xl shadow-lg flex items-center gap-1 text-amber-700 text-xs font-bold"
            >
              <Coffee className="w-4 h-4 text-amber-600 animate-bounce" />
              <span className="hidden sm:inline">Espresso</span>
            </m.div>
          )}

          {/* Accessory: Next.js Laptop */}
          {equippedItems.includes('laptop') && (
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-2 -right-6 bg-white/95 border border-blue-300/80 p-2 rounded-2xl shadow-lg flex items-center gap-1 text-blue-700 text-xs font-bold"
            >
              <Laptop className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Next.js 15</span>
            </m.div>
          )}

          {/* Accessory: 100/100 CWV Star */}
          {equippedItems.includes('star') && (
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-4 -right-4 bg-white/95 border border-emerald-300/80 p-2 rounded-2xl shadow-lg flex items-center gap-1 text-emerald-700 text-xs font-bold"
            >
              <Star className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span className="hidden sm:inline">100/100</span>
            </m.div>
          )}
        </m.div>
      </div>
    </div>
  );
};
