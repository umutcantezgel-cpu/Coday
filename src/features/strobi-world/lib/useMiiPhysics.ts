'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';

export interface MiiPhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  isDragging: boolean;
  isAirborne: boolean;
}

/**
 * Stabilized Upright Physics Engine for Strobi Mii World
 * Guarantees zero rotation/tilt bug, natural elevation dynamics, and smooth return.
 */
export function useMiiPhysics(stageWidth = 800, stageHeight = 600) {
  const [physics, setPhysics] = useState<MiiPhysicsState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    isDragging: false,
    isAirborne: false,
  });

  const stateRef = useRef<MiiPhysicsState>(physics);

  useEffect(() => {
    stateRef.current = physics;
  }, [physics]);

  const animFrameRef = useRef<number | null>(null);
  const { setAvatarState } = useStrobiWorldStore();

  // Start dragging
  const handleDragStart = useCallback(
    (_clientX: number, _clientY: number) => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }

      setPhysics((prev) => ({
        ...prev,
        isDragging: true,
        isAirborne: false,
        vx: 0,
        vy: 0,
        rotation: 0,
      }));
      setAvatarState('surprised', '#3B82F6');
    },
    [setAvatarState]
  );

  // Dragging update
  const handleDragMove = useCallback(
    (_clientX: number, _clientY: number, deltaX: number, deltaY: number) => {
      if (!stateRef.current.isDragging) return;

      const maxX = stageWidth / 2 - 80;
      const maxY = stageHeight / 2 - 80;

      setPhysics((prev) => ({
        ...prev,
        x: Math.max(-maxX, Math.min(maxX, prev.x + deltaX)),
        y: Math.max(-maxY, Math.min(maxY, prev.y + deltaY)),
        rotation: 0, // Strictly stabilized upright
      }));
    },
    [stageWidth, stageHeight]
  );

  // Drag release & smooth elastic return
  const handleDragEnd = useCallback(() => {
    setPhysics((prev) => ({
      ...prev,
      isDragging: false,
      isAirborne: true,
      rotation: 0,
    }));

    setAvatarState('happy', '#2563EB');

    // Smooth return animation towards center (0, 0)
    const startTime = performance.now();
    const startX = stateRef.current.x;
    const startY = stateRef.current.y;
    const duration = 650; // ms

    const easeOutElastic = (t: number) => {
      const p = 0.35;
      return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
    };

    const animateReturn = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      if (progress < 1) {
        const ease = easeOutElastic(progress);
        const currentX = startX * (1 - ease);
        const currentY = startY * (1 - ease);

        setPhysics((prev) => ({
          ...prev,
          x: currentX,
          y: currentY,
          rotation: 0,
        }));

        animFrameRef.current = requestAnimationFrame(animateReturn);
      } else {
        setPhysics((prev) => ({
          ...prev,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          rotation: 0,
          isDragging: false,
          isAirborne: false,
        }));
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animateReturn);
  }, [setAvatarState]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const resetPosition = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setPhysics({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      isDragging: false,
      isAirborne: false,
    });
  }, []);

  return {
    physics,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPosition,
  };
}
