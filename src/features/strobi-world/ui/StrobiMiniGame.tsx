'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { useMiiAudio } from '../lib/useMiiAudio';
import type { SpeedOrb } from '../model/types';
import { Trophy, Clock, Sparkle, X, Lightning } from '@phosphor-icons/react/dist/ssr';

export const StrobiMiniGame: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const {
    isMiniGameActive,
    gameScore,
    gameHighScore,
    gameTimeLeft,
    activeOrbs,
    stopMiniGame,
    tickMiniGame,
    spawnOrb,
    collectOrb,
  } = useStrobiWorldStore();

  const { playCollect, playBoing, playLevelUp } = useMiiAudio();
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateOrb = useCallback((): SpeedOrb => {
    const ORB_TYPES: {
      type: SpeedOrb['type'];
      points: number;
      label: string;
      color: string;
      speed: number;
    }[] = [
      { type: 'lcp', points: 100, label: 'LCP 0.2s', color: '#10B981', speed: 2.5 },
      { type: 'ttfb', points: 150, label: 'TTFB 15ms', color: '#3B82F6', speed: 3 },
      { type: 'cls', points: 100, label: 'CLS 0.00', color: '#06B6D4', speed: 2.2 },
      { type: 'seo', points: 250, label: '100 SEO', color: '#F59E0B', speed: 3.5 },
      { type: 'bug', points: -50, label: '404 Bug', color: '#EF4444', speed: 2 },
    ];

    const pick = ORB_TYPES[Math.floor(Math.random() * ORB_TYPES.length)];
    return {
      id: `orb-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: -10, // Starts above canvas
      ...pick,
    };
  }, []);

  // Timer Tick (1s interval)
  useEffect(() => {
    if (!isMiniGameActive) return;

    const timer = setInterval(() => {
      tickMiniGame();
    }, 1000);

    return () => clearInterval(timer);
  }, [isMiniGameActive, tickMiniGame]);

  // Orb Spawner Loop (every 850ms)
  useEffect(() => {
    if (!isMiniGameActive) return;

    const spawner = setInterval(() => {
      spawnOrb(generateOrb());
    }, 850);

    return () => clearInterval(spawner);
  }, [generateOrb, isMiniGameActive, spawnOrb]);

  const handleOrbClick = (orb: SpeedOrb) => {
    const pts = collectOrb(orb.id);
    if (pts > 0) {
      if (pts >= 250) {
        playLevelUp();
      } else {
        playCollect(true);
      }
    } else {
      playBoing();
    }
  };

  if (!isMiniGameActive) return null;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Game HUD Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
          <Lightning className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{gameScore} Pkt</span>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
          <Clock className="w-4 h-4" />
          <span>{gameTimeLeft}s</span>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-xs">
          <Trophy className="w-3.5 h-3.5" />
          <span>Rekord: {gameHighScore}</span>
        </div>

        <button
          onClick={() => {
            stopMiniGame();
            onClose();
          }}
          className="ml-2 p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Spiel beenden"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Speed Orbs */}
      <div className="relative w-full h-full">
        {activeOrbs.map((orb) => (
          <m.button
            key={orb.id}
            initial={{ top: '-5%', left: `${orb.x}%`, scale: 0 }}
            animate={{ top: '105%', left: `${orb.x}%`, scale: 1 }}
            transition={{
              top: { duration: 6 / orb.speed, ease: 'linear' },
              scale: { duration: 0.2 },
            }}
            onClick={() => handleOrbClick(orb)}
            className="absolute pointer-events-auto px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 text-xs font-bold text-white cursor-pointer active:scale-125 transition-transform border border-white/20 select-none backdrop-blur-sm"
            style={{
              backgroundColor: orb.color,
              boxShadow: `0 0 15px ${orb.color}80`,
            }}
          >
            {orb.type === 'seo' ? (
              <Sparkle className="w-3.5 h-3.5" />
            ) : orb.type === 'bug' ? (
              <span>🐛</span>
            ) : (
              <Lightning className="w-3.5 h-3.5" />
            )}
            <span>{orb.label}</span>
          </m.button>
        ))}
      </div>
    </div>
  );
};
