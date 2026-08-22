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
import { Coffee, Laptop, Star, Sparkle, Heart } from '@phosphor-icons/react/dist/ssr';

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
    setSpeech,
    setAvatarState,
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

  const { physics, handleDragStart, handleDragMove, handleDragEnd, resetPosition } = useMiiPhysics(
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

  // Background Theme Gradients
  const THEME_STYLES = {
    'cyber-lab': {
      bg: 'bg-radial from-slate-900 via-slate-950 to-[#050811]',
      gridColor: 'rgba(59, 130, 246, 0.15)',
      glowColor: '#3B82F6',
    },
    'neon-grid': {
      bg: 'bg-radial from-indigo-950 via-slate-950 to-[#04060c]',
      gridColor: 'rgba(139, 92, 246, 0.2)',
      glowColor: '#8B5CF6',
    },
    'sunset-lounge': {
      bg: 'bg-radial from-amber-950/40 via-slate-950 to-[#0c0805]',
      gridColor: 'rgba(245, 158, 11, 0.15)',
      glowColor: '#F59E0B',
    },
    'nature-studio': {
      bg: 'bg-radial from-emerald-950/40 via-slate-950 to-[#040c08]',
      gridColor: 'rgba(16, 185, 129, 0.15)',
      glowColor: '#10B981',
    },
  }[roomTheme];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[580px] md:h-[680px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col items-center justify-between p-6 select-none ${THEME_STYLES.bg} ${className}`}
    >
      {/* Floating Particles Overlay */}
      <StrobiParticleOverlay particles={particles} />

      {/* Arcade Mini-Game Canvas Overlay */}
      {isMiniGameActive && <StrobiMiniGame onClose={stopMiniGame} />}

      {/* Dynamic Floor Grid in 3D Perspective */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none opacity-60"
        style={{
          perspective: 600,
        }}
      >
        <div
          className="w-full h-full transform rotate-x-60 origin-bottom"
          style={{
            backgroundImage: `linear-gradient(to right, ${THEME_STYLES.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${THEME_STYLES.gridColor} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          }}
        />
      </div>

      {/* Center Ambient Light Dome */}
      <div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
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

      {/* Central Interactive Strobi Mii Avatar Stage */}
      <div className="relative flex-1 w-full flex items-center justify-center z-20">
        <m.div
          animate={{
            x: physics.x,
            y: physics.y,
            rotate: physics.rotation,
          }}
          transition={
            physics.isDragging ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 22 }
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
          {/* Main Strobi 3D Avatar */}
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
              className="absolute -bottom-2 -left-6 bg-slate-900/90 border border-amber-500/40 p-2 rounded-2xl shadow-xl flex items-center gap-1 text-amber-400 text-xs font-bold"
            >
              <Coffee className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="hidden sm:inline">Espresso</span>
            </m.div>
          )}

          {/* Accessory: Next.js Laptop */}
          {equippedItems.includes('laptop') && (
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-2 -right-6 bg-slate-900/90 border border-blue-500/40 p-2 rounded-2xl shadow-xl flex items-center gap-1 text-blue-400 text-xs font-bold"
            >
              <Laptop className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Next.js 15</span>
            </m.div>
          )}

          {/* Accessory: 100/100 CWV Star */}
          {equippedItems.includes('star') && (
            <m.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute -top-6 right-2 bg-slate-900/90 border border-emerald-500/40 p-1.5 rounded-full shadow-xl flex items-center justify-center text-emerald-400"
            >
              <Star className="w-4 h-4 text-emerald-400 animate-spin" />
            </m.div>
          )}
        </m.div>
      </div>

      {/* Reset Position pill (visible if Strobi was tossed far) */}
      {(Math.abs(physics.x) > 120 || Math.abs(physics.y) > 120) && (
        <button
          onClick={resetPosition}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md"
        >
          🎯 Strobi zurückholen
        </button>
      )}
    </div>
  );
};
