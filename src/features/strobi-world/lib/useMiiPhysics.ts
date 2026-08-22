'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { useMiiAudio } from './useMiiAudio';

export interface MiiPhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  isDragging: boolean;
  isAirborne: boolean;
}

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

  const dragHistoryRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const { setAvatarState } = useStrobiWorldStore();
  const { playBoing, playTossWhoosh } = useMiiAudio();

  // Start dragging
  const handleDragStart = useCallback(
    (clientX: number, clientY: number) => {
      setPhysics((prev) => ({
        ...prev,
        isDragging: true,
        isAirborne: false,
        vx: 0,
        vy: 0,
      }));
      dragHistoryRef.current = [{ x: clientX, y: clientY, time: Date.now() }];
      setAvatarState('surprised', '#60A5FA');
    },
    [setAvatarState]
  );

  // Dragging update
  const handleDragMove = useCallback(
    (clientX: number, clientY: number, deltaX: number, deltaY: number) => {
      if (!stateRef.current.isDragging) return;

      const now = Date.now();
      dragHistoryRef.current.push({ x: clientX, y: clientY, time: now });
      if (dragHistoryRef.current.length > 5) {
        dragHistoryRef.current.shift();
      }

      setPhysics((prev) => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
        rotation: Math.max(-25, Math.min(25, deltaX * 1.5)),
      }));
    },
    []
  );

  // Release and toss
  const handleDragEnd = useCallback(() => {
    if (!stateRef.current.isDragging) return;

    const history = dragHistoryRef.current;
    let tossVx = 0;
    let tossVy = 0;

    if (history.length >= 2) {
      const oldest = history[0];
      const newest = history[history.length - 1];
      const dt = newest.time - oldest.time || 16;
      tossVx = ((newest.x - oldest.x) / dt) * 18;
      tossVy = ((newest.y - oldest.y) / dt) * 18;
    }

    // Clamp max velocity
    tossVx = Math.max(-28, Math.min(28, tossVx));
    tossVy = Math.max(-28, Math.min(28, tossVy));

    const isHighSpeed = Math.abs(tossVx) > 6 || Math.abs(tossVy) > 6;
    if (isHighSpeed) {
      playTossWhoosh();
      setAvatarState('excited', '#3B82F6');
    } else {
      setAvatarState('happy');
    }

    setPhysics((prev) => ({
      ...prev,
      isDragging: false,
      isAirborne: true,
      vx: tossVx,
      vy: tossVy,
    }));
  }, [playTossWhoosh, setAvatarState]);

  // Reset to stage center
  const resetPosition = useCallback(() => {
    setPhysics({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      isDragging: false,
      isAirborne: false,
    });
    setAvatarState('happy');
  }, [setAvatarState]);

  // Main physics loop (Gravity + Elastic Bouncing)
  useEffect(() => {
    const gravity = 0.55;
    const airResistance = 0.985;
    const floorBounce = 0.62;
    const wallBounce = 0.72;

    const halfW = stageWidth / 2 - 80;
    const maxY = stageHeight / 2 - 100;
    const minY = -(stageHeight / 2) + 80;

    const step = () => {
      const cur = stateRef.current;

      if (!cur.isDragging && (cur.isAirborne || Math.abs(cur.vx) > 0.1 || Math.abs(cur.vy) > 0.1)) {
        let nextX = cur.x + cur.vx;
        let nextY = cur.y + cur.vy;
        let nextVx = cur.vx * airResistance;
        let nextVy = (cur.vy + gravity) * airResistance;
        let nextRot = cur.rotation * 0.94;
        let bounceOccurred = false;

        // Floor bounce
        if (nextY >= maxY) {
          nextY = maxY;
          nextVy = -cur.vy * floorBounce;
          bounceOccurred = Math.abs(cur.vy) > 2.5;

          // If velocity is low enough on floor, settle
          if (Math.abs(nextVy) < 0.8 && Math.abs(nextVx) < 0.8) {
            nextVy = 0;
            nextVx = 0;
            setPhysics((prev) => ({
              ...prev,
              x: nextX,
              y: maxY,
              vx: 0,
              vy: 0,
              rotation: 0,
              isAirborne: false,
            }));
            return;
          }
        }

        // Ceiling bounce
        if (nextY <= minY) {
          nextY = minY;
          nextVy = -cur.vy * 0.5;
          bounceOccurred = true;
        }

        // Left / Right wall bounce
        if (nextX >= halfW) {
          nextX = halfW;
          nextVx = -cur.vx * wallBounce;
          bounceOccurred = true;
        } else if (nextX <= -halfW) {
          nextX = -halfW;
          nextVx = -cur.vx * wallBounce;
          bounceOccurred = true;
        }

        if (bounceOccurred) {
          playBoing();
        }

        setPhysics({
          x: nextX,
          y: nextY,
          vx: nextVx,
          vy: nextVy,
          rotation: nextRot,
          isDragging: false,
          isAirborne: true,
        });
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [playBoing, stageHeight, stageWidth]);

  return {
    physics,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPosition,
  };
}
