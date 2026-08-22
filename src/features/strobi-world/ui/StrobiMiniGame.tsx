'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import type { SpeedOrb, SpeedOrbType } from '../model/types';
import {
  Trophy,
  Timer,
  Lightning,
  Bug,
  Robot,
  ShieldCheck,
  Star,
  X,
  Sparkle,
  ArrowClockwise,
} from '@phosphor-icons/react/dist/ssr';

interface TargetConfig {
  type: SpeedOrbType;
  points: number;
  label: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  icon: React.ElementType;
}

const TARGET_CONFIGS: TargetConfig[] = [
  {
    type: 'lcp',
    points: 10,
    label: 'LCP < 0.2s',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    borderLight: '#BFDBFE',
    textColor: '#1E40AF',
    icon: Lightning,
  },
  {
    type: 'ttfb',
    points: 15,
    label: 'TTFB 15ms',
    color: '#10B981',
    bgLight: '#ECFDF5',
    borderLight: '#A7F3D0',
    textColor: '#065F46',
    icon: Sparkle,
  },
  {
    type: 'shield',
    points: 20,
    label: 'Edge Shield',
    color: '#6366F1',
    bgLight: '#EEF2FF',
    borderLight: '#C7D2FE',
    textColor: '#3730A3',
    icon: ShieldCheck,
  },
  {
    type: 'star',
    points: 25,
    label: '100/100 CWV',
    color: '#D97706',
    bgLight: '#FFFBEB',
    borderLight: '#FDE68A',
    textColor: '#92400E',
    icon: Star,
  },
  {
    type: 'bot',
    points: -15,
    label: 'Legacy Bot',
    color: '#E11D48',
    bgLight: '#FFF1F2',
    borderLight: '#FECDD3',
    textColor: '#9F1239',
    icon: Robot,
  },
  {
    type: 'bug',
    points: -20,
    label: 'JS Bug',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    borderLight: '#FCA5A5',
    textColor: '#991B1B',
    icon: Bug,
  },
];

interface HitFeedback {
  id: string;
  x: number;
  y: number;
  points: number;
  color: string;
}

export const StrobiMiniGame: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { gameHighScore, stopMiniGame, addAffection } = useStrobiWorldStore();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [orbs, setOrbs] = useState<SpeedOrb[]>([]);
  const [combo, setCombo] = useState(1);
  const [hitFeedbacks, setHitFeedbacks] = useState<HitFeedback[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbSpawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hitCounterRef = useRef(0);
  const orbCounterRef = useRef(0);

  const spawnOrb = useCallback(() => {
    if (!containerRef.current) return;
    const boundsWidth = containerRef.current.clientWidth - 110;
    const isHostile = Math.random() < 0.28; // 28% chance for Bot / Bug

    const selectedConfig = isHostile
      ? Math.random() > 0.5
        ? TARGET_CONFIGS[4] // Legacy Bot
        : TARGET_CONFIGS[5] // JS Bug
      : TARGET_CONFIGS[Math.floor(Math.random() * 4)];

    orbCounterRef.current += 1;
    const newOrb: SpeedOrb = {
      id: `orb_${orbCounterRef.current}`,
      x: Math.max(20, Math.random() * boundsWidth + 10),
      y: 0,
      speed: Math.random() * 1.4 + 1.8,
      type: selectedConfig.type,
      points: selectedConfig.points,
      label: selectedConfig.label,
      color: selectedConfig.color,
    };

    setOrbs((prev) => [...prev.slice(-14), newOrb]);
  }, []);

  // Main game timer
  useEffect(() => {
    orbSpawnTimerRef.current = setInterval(spawnOrb, 850);

    gameTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(gameTimerRef.current!);
          clearInterval(orbSpawnTimerRef.current!);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (orbSpawnTimerRef.current) clearInterval(orbSpawnTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [spawnOrb]);

  // Orb movement loop (responsive dynamic bottom bound)
  useEffect(() => {
    if (isGameOver) return;

    const moveInterval = setInterval(() => {
      if (!containerRef.current) return;
      const maxY = containerRef.current.clientHeight - 80;

      setOrbs((prev) =>
        prev.map((orb) => ({ ...orb, y: orb.y + orb.speed })).filter((orb) => orb.y < maxY)
      );
    }, 24);

    return () => clearInterval(moveInterval);
  }, [isGameOver]);

  const handleCatchOrb = (orb: SpeedOrb, e: React.MouseEvent | React.TouchEvent) => {
    if (isGameOver) return;

    const isHostile = orb.type === 'bug' || orb.type === 'bot';
    const rect = containerRef.current?.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : (e as React.MouseEvent).clientY;

    const localX = rect ? clientX - rect.left : orb.x;
    const localY = rect ? clientY - rect.top : orb.y;

    if (isHostile) {
      setScore((s) => Math.max(0, s + orb.points));
      setCombo(1);
    } else {
      const addedPoints = orb.points * combo;
      setScore((s) => s + addedPoints);
      setCombo((c) => Math.min(5, c + 1));
      addAffection(2);
    }

    // Spawn floating hit score
    hitCounterRef.current += 1;
    const newFeedback: HitFeedback = {
      id: `hit_${orb.id}_${hitCounterRef.current}`,
      x: localX,
      y: localY,
      points: isHostile ? orb.points : orb.points * combo,
      color: isHostile ? '#DC2626' : '#2563EB',
    };

    setHitFeedbacks((prev) => [...prev.slice(-6), newFeedback]);
    setOrbs((prev) => prev.filter((o) => o.id !== orb.id));

    // Clear feedback after 700ms
    setTimeout(() => {
      setHitFeedbacks((prev) => prev.filter((f) => f.id !== newFeedback.id));
    }, 700);
  };

  const handleFinish = () => {
    stopMiniGame(score);
    onClose();
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(45);
    setCombo(1);
    setOrbs([]);
    setHitFeedbacks([]);
    setIsGameOver(false);
  };

  const getConfig = (type: SpeedOrbType) =>
    TARGET_CONFIGS.find((c) => c.type === type) || TARGET_CONFIGS[0];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 md:absolute md:inset-0 bg-white/98 md:bg-white/95 backdrop-blur-xl md:rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden border border-slate-200 shadow-2xl h-[100dvh] md:h-full touch-none select-none overscroll-none"
    >
      {/* Top HUD Header (Safe Area Padded) */}
      <div className="flex items-center justify-between z-10 border-b border-slate-200/90 pb-3 pt-safe">
        {/* Score & Combo Multiplier */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <Lightning className="w-4 h-4 text-blue-600" />
            <span>Score: {score}</span>
          </div>

          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold animate-pulse shadow-2xs">
              <span>{combo}x Multiplikator</span>
            </div>
          )}
        </div>

        {/* Timer & Exit Button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
            <Timer className="w-4 h-4 text-slate-600" />
            <span>{timeLeft}s</span>
          </div>

          <button
            onClick={handleFinish}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
            aria-label="Minispiel beenden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Arena (Targets Fall Responsively Within Viewport) */}
      <div className="relative flex-1 w-full overflow-hidden">
        <AnimatePresence>
          {orbs.map((orb) => {
            const config = getConfig(orb.type);
            const Icon = config.icon;

            return (
              <m.button
                key={orb.id}
                onClick={(e) => handleCatchOrb(orb, e)}
                onTouchStart={(e) => handleCatchOrb(orb, e)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute transform -translate-x-1/2 cursor-pointer p-2.5 sm:p-3 rounded-2xl shadow-md border backdrop-blur-md flex items-center gap-1.5 text-xs font-bold select-none transition-transform hover:scale-110 active:scale-95"
                style={{
                  left: orb.x,
                  top: orb.y,
                  backgroundColor: config.bgLight,
                  borderColor: config.borderLight,
                  color: config.textColor,
                }}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: config.color }} />
                <span className="truncate max-w-[110px]">{config.label}</span>
                <span className="text-[10px] opacity-80 shrink-0">
                  ({config.points > 0 ? `+${config.points}` : config.points})
                </span>
              </m.button>
            );
          })}
        </AnimatePresence>

        {/* Floating Hit Score Numbers */}
        <AnimatePresence>
          {hitFeedbacks.map((hit) => (
            <m.div
              key={hit.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -35, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute pointer-events-none font-extrabold text-sm sm:text-base z-30"
              style={{
                left: hit.x,
                top: hit.y,
                color: hit.color,
              }}
            >
              {hit.points > 0 ? `+${hit.points}` : hit.points}
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Game Over Modal in Pure Light Glass */}
      {isGameOver && (
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 z-50 text-center"
        >
          <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">
            Runde abgeschlossen
          </h3>
          <p className="text-sm text-slate-600 max-w-sm mb-6">
            Du hast <strong className="text-slate-900">{score} Performance-Punkte</strong> erzielt.
            Highscore:{' '}
            <strong className="text-slate-900">{Math.max(gameHighScore, score)} Punkte</strong>.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all"
            >
              <ArrowClockwise className="w-4 h-4" />
              <span>Nochmal spielen</span>
            </button>
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Zurück zum Studio</span>
            </button>
          </div>
        </m.div>
      )}

      {/* Bottom Safe Area Hint Bar */}
      <div className="text-center text-[11px] text-slate-500 border-t border-slate-100 pt-2 pb-safe">
        Tippe oder klicke auf Speed-Badges. Weiche roten Legacy-Bots & Bugs aus, um die Combo zu
        halten.
      </div>
    </div>
  );
};
