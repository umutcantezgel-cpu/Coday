'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import type { StrobiParticle } from '../model/types';

/**
 * Petting & Scrubbing Physics Engine (Vector Particle Emitter)
 */
export function usePettingPhysics() {
  const [particles, setParticles] = useState<StrobiParticle[]>([]);
  const [isPetting, setIsPetting] = useState(false);

  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const petStrokeCountRef = useRef(0);
  const { addAffection, setAvatarState } = useStrobiWorldStore();

  const spawnParticles = useCallback((originX: number, originY: number, count = 4) => {
    const particleTypes: ('sparkle' | 'star' | 'heart')[] = ['sparkle', 'star', 'heart'];
    const colors = ['#2563EB', '#D97706', '#F43F5E', '#10B981', '#6366F1'];

    const newParticles: StrobiParticle[] = Array.from({ length: count }).map(() => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = (Math.random() * Math.PI) / 2 + Math.PI / 4; // Upward spray
      const speed = Math.random() * 3 + 2;

      return {
        id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        x: originX + (Math.random() * 40 - 20),
        y: originY + (Math.random() * 20 - 10),
        type,
        color,
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        vy: -Math.sin(angle) * speed,
        scale: Math.random() * 0.5 + 0.75,
        opacity: 1,
        rotation: Math.random() * 360,
      };
    });

    setParticles((prev) => [...prev, ...newParticles].slice(-40));
  }, []);

  // Update particles frame
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.08, // Subtle gravity
            opacity: p.opacity - 0.04,
            scale: p.scale * 0.98,
            rotation: p.rotation + 3,
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

      // Detect smooth rubbing motions
      if (distance > 8) {
        const speed = distance / dt;

        if (distance > 15 || (speed > 0.1 && speed < 4.0)) {
          setIsPetting(true);
          petStrokeCountRef.current += 1;

          if (petStrokeCountRef.current % 3 === 0) {
            spawnParticles(e.clientX, e.clientY, 3);
            addAffection(4);
            setAvatarState('happy', '#F43F5E');
          }
        }
      }

      lastPosRef.current = currentPos;
    },
    [addAffection, setAvatarState, spawnParticles]
  );

  return {
    particles,
    isPetting,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
    spawnParticles,
  };
}
