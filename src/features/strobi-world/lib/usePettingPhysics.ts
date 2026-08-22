'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { useMiiAudio } from './useMiiAudio';
import type { StrobiParticle } from '../model/types';

export function usePettingPhysics() {
  const [isPetting, setIsPetting] = useState(false);
  const [particles, setParticles] = useState<StrobiParticle[]>([]);

  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const petStrokeCountRef = useRef(0);
  const lastSoundTimeRef = useRef(0);

  const { addAffection, setAvatarState, setSpeech } = useStrobiWorldStore();
  const { playPetPurr, playGiggle, playLevelUp } = useMiiAudio();

  const spawnParticle = useCallback((x: number, y: number) => {
    const types: ('heart' | 'star' | 'sparkle')[] = ['heart', 'star', 'sparkle'];
    const colors = ['#EC4899', '#F43F5E', '#F59E0B', '#10B981', '#38BDF8'];

    const newParticle: StrobiParticle = {
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 20 - 10),
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: -(Math.random() * 3 + 2.5),
      scale: Math.random() * 0.6 + 0.8,
      opacity: 1,
      rotation: Math.random() * 360,
    };

    setParticles((prev) => [...prev.slice(-24), newParticle]);
  }, []);

  // Particle physics animation loop
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.04,
            scale: p.scale * 0.98,
            rotation: p.rotation + 4,
          }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 32);

    return () => clearInterval(interval);
  }, [particles.length]);

  const handlePointerEnter = useCallback(() => {
    lastPosRef.current = null;
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsPetting(false);
    lastPosRef.current = null;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const now = Date.now();
      const currentPos = { x: e.clientX, y: e.clientY, time: now };

      if (!lastPosRef.current) {
        lastPosRef.current = currentPos;
        return;
      }

      const dx = currentPos.x - lastPosRef.current.x;
      const dy = currentPos.y - lastPosRef.current.y;
      const dt = Math.max(1, currentPos.time - lastPosRef.current.time);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Detect smooth rhythmic rubbing motions
      if (distance > 8) {
        const speed = distance / dt;

        if (distance > 15 || (speed > 0.1 && speed < 4.0)) {
          setIsPetting(true);
          petStrokeCountRef.current += 1;

          // Spawn particle every 3 strokes
          if (petStrokeCountRef.current % 3 === 0) {
            spawnParticle(e.clientX, e.clientY);
          }

          // Sound throttle (every 220ms)
          if (now - lastSoundTimeRef.current > 220) {
            lastSoundTimeRef.current = now;
            if (petStrokeCountRef.current > 18) {
              playGiggle();
            } else {
              playPetPurr();
            }
          }

          // Add affection points
          const { leveledUp, newLevel } = addAffection(1.5);

          if (leveledUp) {
            playLevelUp();
            setAvatarState('celebrate', '#F59E0B');
            setSpeech({
              id: 'level_up',
              text: `Freundschafts-Level ${newLevel} erreicht! Du bist mein Lieblings-Mensch! 💖`,
              type: 'shout',
            });
          } else if (petStrokeCountRef.current > 20) {
            setAvatarState('laughing', '#EC4899');
          } else if (petStrokeCountRef.current > 6) {
            setAvatarState('happy', '#F43F5E');
          }
        }
      }

      lastPosRef.current = currentPos;
    },
    [addAffection, playGiggle, playLevelUp, playPetPurr, setAvatarState, setSpeech, spawnParticle]
  );

  return {
    isPetting,
    particles,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
  };
}
