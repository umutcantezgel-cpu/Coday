'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import type { SpeedOrb } from '../model/types';
import {
  Trophy,
  Timer,
  Lightning,
  Bug,
  X,
  Sparkle,
  ArrowClockwise,
} from '@phosphor-icons/react/dist/ssr';

const ORB_TYPES: Omit<SpeedOrb, 'id' | 'x' | 'y' | 'speed'>[] = [
  { type: 'lcp', points: 10, label: 'LCP < 0.2s', color: '#2563EB' },
  { type: 'ttfb', points: 15, label: 'TTFB 15ms', color: '#10B981' },
  { type: 'cls', points: 10, label: 'CLS 0.00', color: '#D97706' },
  { type: 'seo', points: 25, label: '100 SEO', color: '#6366F1' },
  { type: 'bug', points: -20, label: 'JS Bug', color: '#EF4444' },
];

export const StrobiMiniGame: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { gameHighScore, stopMiniGame, addAffection } = useStrobiWorldStore();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [orbs, setOrbs] = useState<SpeedOrb[]>([]);
  const [combo, setCombo] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbSpawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnOrb = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth - 80;
    const randomType =
      Math.random() < 0.2
        ? ORB_TYPES[4] // 20% Bug
        : ORB_TYPES[Math.floor(Math.random() * 4)];

    const newOrb: SpeedOrb = {
      id: `orb_${Date.now()}_${Math.random()}`,
      x: Math.random() * width + 40,
      y: 0,
      speed: Math.random() * 1.5 + 2.0,
      ...randomType,
    };

    setOrbs((prev) => [...prev.slice(-15), newOrb]);
  }, []);

  // Main game loop (time & orb spawner)
  useEffect(() => {
    orbSpawnTimerRef.current = setInterval(spawnOrb, 900);

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

  // Orb movement loop
  useEffect(() => {
    if (isGameOver) return;

    const moveInterval = setInterval(() => {
      setOrbs((prev) =>
        prev.map((orb) => ({ ...orb, y: orb.y + orb.speed })).filter((orb) => orb.y < 520)
      );
    }, 24);

    return () => clearInterval(moveInterval);
  }, [isGameOver]);

  const handleCatchOrb = (orb: SpeedOrb) => {
    if (isGameOver) return;

    if (orb.type === 'bug') {
      setScore((s) => Math.max(0, s + orb.points));
      setCombo(1);
    } else {
      const addedPoints = orb.points * combo;
      setScore((s) => s + addedPoints);
      setCombo((c) => Math.min(4, c + 1));
      addAffection(2);
    }

    setOrbs((prev) => prev.filter((o) => o.id !== orb.id));
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
    setIsGameOver(false);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between overflow-hidden border border-slate-200"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold shadow-2xs">
            <Lightning className="w-4 h-4 text-blue-600" />
            <span>Score: {score}</span>
          </div>

          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold animate-pulse shadow-2xs">
              <span>{combo}x Multiplikator</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
            <Timer className="w-4 h-4 text-slate-600" />
            <span>{timeLeft}s</span>
          </div>

          <button
            onClick={handleFinish}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
            aria-label="Minispiel beenden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Falling Speed Orbs Area */}
      <div className="relative flex-1 w-full overflow-hidden">
        <AnimatePresence>
          {orbs.map((orb) => (
            <m.button
              key={orb.id}
              onClick={() => handleCatchOrb(orb)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute transform -translate-x-1/2 cursor-pointer p-2.5 rounded-2xl shadow-lg border backdrop-blur-md flex items-center gap-1.5 text-xs font-bold select-none transition-transform hover:scale-110 active:scale-95"
              style={{
                left: orb.x,
                top: orb.y,
                backgroundColor: orb.type === 'bug' ? '#FEF2F2' : '#EFF6FF',
                borderColor: orb.type === 'bug' ? '#FCA5A5' : '#BFDBFE',
                color: orb.type === 'bug' ? '#991B1B' : '#1E40AF',
              }}
            >
              {orb.type === 'bug' ? (
                <Bug className="w-4 h-4 text-rose-600" />
              ) : (
                <Sparkle className="w-4 h-4 text-blue-600" />
              )}
              <span>{orb.label}</span>
              <span className="text-[10px] opacity-80">
                ({orb.points > 0 ? `+${orb.points}` : orb.points})
              </span>
            </m.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Game Over Modal in Light Glass */}
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
            Dein Highscore:{' '}
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

      {/* Bottom Hint */}
      <div className="text-center text-[11px] text-slate-500 border-t border-slate-100 pt-3">
        Klicke oder tippe auf die fallenden Badges. Weiche roten Bugs aus, um deine Combo zu halten.
      </div>
    </div>
  );
};
