'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { m, useReducedMotion } from 'motion/react';
import type { StrobiAvatarProps, StrobiSize, ExpressionPose } from '../model/types';
import {
  getAnimationDefinition,
  getExpressionPose,
  DEFAULT_EXPRESSION,
  STROBI_DEFAULT_COLORS,
} from '../model/strobiData';

const SIZE_MAP: Record<StrobiSize, number> = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
  '2xl': 144,
  hero: 240,
};

export const StrobiAvatar: React.FC<StrobiAvatarProps> = ({
  state = 'idle',
  size = 'md',
  dimension,
  bodyColor = STROBI_DEFAULT_COLORS.body,
  eyeColor = STROBI_DEFAULT_COLORS.eyes,
  enableTracking = true,
  interactive = true,
  className = '',
  onClick,
  ariaLabel = 'Strobi KI Avatar',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const avatarRef = useRef<HTMLDivElement>(null);

  const finalDimension = dimension || SIZE_MAP[size] || 48;

  // Animation step tracker
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pointer tracking state (pitch/yaw offset in degrees)
  const [trackingOffset, setTrackingOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeState = isHovered && interactive && state === 'idle' ? 'waking' : state;
  const currentAnimation = useMemo(() => getAnimationDefinition(activeState), [activeState]);

  // Reset step index during render when activeState changes (React 19 standard pattern)
  const [prevActiveState, setPrevActiveState] = useState(activeState);
  if (prevActiveState !== activeState) {
    setPrevActiveState(activeState);
    setCurrentStepIndex(0);
  }

  // Sequence playback timer
  useEffect(() => {
    if (shouldReduceMotion) return;

    const steps = currentAnimation.steps;
    if (!steps || steps.length === 0) return;

    const currentStep = steps[currentStepIndex] || steps[0];
    const duration = (currentStep.holdMs || 2000) + (currentStep.transitionMs || 400);

    const timer = setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else if (currentAnimation.playbackMode === 'loop') {
        setCurrentStepIndex(0);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentAnimation, currentStepIndex, shouldReduceMotion]);

  // Autonomic blinking loop
  useEffect(() => {
    if (shouldReduceMotion || !currentAnimation.blink?.enabled) return;

    let blinkTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;

    const scheduleBlink = () => {
      const { minIntervalMs, maxIntervalMs, durationMs } = currentAnimation.blink;
      const delay = Math.random() * (maxIntervalMs - minIntervalMs) + minIntervalMs;

      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        resetTimeout = setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, durationMs || 220);
      }, delay);
    };

    scheduleBlink();

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(resetTimeout);
    };
  }, [currentAnimation, shouldReduceMotion]);

  // Mouse / pointer tracking handler
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!enableTracking || shouldReduceMotion || !avatarRef.current) return;

      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Max clamp ±12 degrees yaw and pitch
      const clampedYaw = Math.max(-12, Math.min(12, deltaX * 12));
      const clampedPitch = Math.max(-10, Math.min(10, -deltaY * 10));

      setTrackingOffset({ x: clampedPitch, y: clampedYaw });
    },
    [enableTracking, shouldReduceMotion]
  );

  useEffect(() => {
    if (enableTracking && !shouldReduceMotion) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      return () => window.removeEventListener('mousemove', handlePointerMove);
    }
  }, [enableTracking, handlePointerMove, shouldReduceMotion]);

  // Resolve current expression pose
  const activeStep = currentAnimation.steps[currentStepIndex] || currentAnimation.steps[0];
  const expressionName = activeStep?.expression || 'neutral';
  const pose: ExpressionPose = getExpressionPose(expressionName) || DEFAULT_EXPRESSION;

  // Head 3D rotations with pointer tracking mix
  const headPitch = pose.head.x + trackingOffset.x;
  const headYaw = pose.head.y + trackingOffset.y;
  const headRoll = pose.head.z;

  // Coordinates on standard 240x240 SVG canvas
  const centerX = 120;
  const centerY = 120;
  const eyeSpacing = pose.eyes.spacing || 40;

  // Left & Right eye metrics
  const leftEye = pose.eyes.left;
  const rightEye = pose.eyes.right;

  // Blinking overrides eye height to a slit
  const leftEyeHeight = isBlinking ? 2.5 : leftEye.height;
  const rightEyeHeight = isBlinking ? 2.5 : rightEye.height;

  // Left Eye position
  const leftEyeX = centerX - eyeSpacing / 2 + (leftEye.x || 0);
  const leftEyeY = centerY + (leftEye.y || 0);

  // Right Eye position
  const rightEyeX = centerX + eyeSpacing / 2 + (rightEye.x || 0);
  const rightEyeY = centerY + (rightEye.y || 0);

  return (
    <div
      ref={avatarRef}
      role={onClick ? 'button' : 'img'}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTrackingOffset({ x: 0, y: 0 });
      }}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{
        width: finalDimension,
        height: finalDimension,
        perspective: 600,
      }}
    >
      {/* Dynamic Ambient Dropshadow under Sphere */}
      <div
        className="absolute -bottom-1 w-[70%] h-[14%] bg-black/25 rounded-full blur-[3px] transition-transform duration-300 pointer-events-none"
        style={{
          transform: `scale(${1 + headPitch * 0.01}) translateY(${headPitch * 0.2}px)`,
        }}
      />

      {/* 3D Head Wrapper */}
      <m.div
        className="relative w-full h-full"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateX: headPitch,
                rotateY: headYaw,
                rotateZ: headRoll,
              }
        }
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 24,
          mass: 0.8,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full overflow-visible drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Sphere 3D Gradient */}
            <radialGradient id="strobiBodyGrad" cx="35%" cy="30%" r="65%" fx="28%" fy="25%">
              <stop offset="0%" stopColor="#8fa9f7" />
              <stop offset="45%" stopColor={bodyColor} />
              <stop offset="100%" stopColor="#2a3f85" />
            </radialGradient>

            {/* Specular Glint Gradient */}
            <linearGradient id="strobiGlint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Eye Pupil Gradient */}
            <radialGradient id="strobiEyeGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor={eyeColor === '#ffffff' ? '#ffffff' : '#1f242d'} />
              <stop offset="100%" stopColor={eyeColor} />
            </radialGradient>
          </defs>

          {/* Spherical Main Body */}
          <circle
            cx="120"
            cy="120"
            r="114"
            fill="url(#strobiBodyGrad)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />

          {/* Top-Left 3D Specular Highlight */}
          <ellipse
            cx="75"
            cy="65"
            rx="45"
            ry="25"
            transform="rotate(-25 75 65)"
            fill="url(#strobiGlint)"
          />

          {/* Interactive Eyes Group */}
          <g className="transition-transform duration-300 ease-out">
            {/* Left Eye */}
            <g transform={`translate(${leftEyeX}, ${leftEyeY}) rotate(${leftEye.angle || 0})`}>
              <rect
                x={-leftEye.width / 2}
                y={-leftEyeHeight / 2}
                width={leftEye.width}
                height={leftEyeHeight}
                rx={leftEye.width / 2}
                ry={leftEye.width / 2}
                fill="url(#strobiEyeGrad)"
                className="transition-[height,y] duration-150 ease-in-out"
              />
              {/* Pupil Glint (only visible when open) */}
              {!isBlinking && leftEyeHeight > 10 && (
                <circle
                  cx={-leftEye.width / 4}
                  cy={-leftEyeHeight / 4}
                  r={Math.max(2, leftEye.width / 6)}
                  fill="#ffffff"
                  opacity="0.85"
                />
              )}
            </g>

            {/* Right Eye */}
            <g transform={`translate(${rightEyeX}, ${rightEyeY}) rotate(${rightEye.angle || 0})`}>
              <rect
                x={-rightEye.width / 2}
                y={-rightEyeHeight / 2}
                width={rightEye.width}
                height={rightEyeHeight}
                rx={rightEye.width / 2}
                ry={rightEye.width / 2}
                fill="url(#strobiEyeGrad)"
                className="transition-[height,y] duration-150 ease-in-out"
              />
              {/* Pupil Glint (only visible when open) */}
              {!isBlinking && rightEyeHeight > 10 && (
                <circle
                  cx={-rightEye.width / 4}
                  cy={-rightEyeHeight / 4}
                  r={Math.max(2, rightEye.width / 6)}
                  fill="#ffffff"
                  opacity="0.85"
                />
              )}
            </g>
          </g>
        </svg>
      </m.div>
    </div>
  );
};

export default StrobiAvatar;
