/**
 * Strobi Avatar Data & Animation Sequence Helper
 * Integrates strobi.avatar.json definition with typed accessors
 */

import rawStrobiJson from '../data/strobi.avatar.json';
import type { ExpressionPose, AnimationStateDefinition, StrobiAnimationState } from './types';

export const STROBI_NAME = rawStrobiJson.name || 'Strobi';

export const STROBI_DEFAULT_COLORS = {
  body: rawStrobiJson.colors?.body || '#5b7fe5',
  eyes: rawStrobiJson.colors?.eyes || '#111316',
  codayBlue: '#3B82F6',
  darkSlate: '#1e293b',
  amberGlow: '#F59E0B',
};

export const STROBI_EXPRESSIONS: Record<string, ExpressionPose> =
  (rawStrobiJson.expressions as unknown as Record<string, ExpressionPose>) || {};

export const STROBI_ANIMATIONS: Record<string, AnimationStateDefinition> =
  (rawStrobiJson.animations as unknown as Record<string, AnimationStateDefinition>) || {};

export const STROBI_ANIMATION_ORDER: StrobiAnimationState[] =
  (rawStrobiJson.animationOrder as StrobiAnimationState[]) || [
    'sleeping',
    'waking',
    'idle',
    'listening',
    'thinking',
    'searching',
    'working',
    'excited',
    'bored',
    'suspicious',
    'angry',
    'drowsy',
    'happy',
    'curious',
    'confused',
    'surprised',
    'proud',
    'shy',
    'sad',
    'laughing',
    'scared',
    'playful',
    'celebrate',
  ];

/**
 * Fallback neutral expression if a key is not found
 */
export const DEFAULT_EXPRESSION: ExpressionPose = {
  head: { x: 0, y: 0, z: 0 },
  eyes: {
    left: { width: 20, height: 50, x: 0, y: -7, angle: 0 },
    right: { width: 20, height: 50, x: 0, y: -7, angle: 0 },
    spacing: 35,
  },
  perspective: 1,
  motion: { eyes: 'none', body: 'none' },
};

/**
 * Get expression pose by name with safe fallback
 */
export function getExpressionPose(name: string): ExpressionPose {
  return STROBI_EXPRESSIONS[name] || DEFAULT_EXPRESSION;
}

/**
 * Get animation definition by state name with safe fallback
 */
export function getAnimationDefinition(state: StrobiAnimationState): AnimationStateDefinition {
  if (STROBI_ANIMATIONS[state]) {
    return STROBI_ANIMATIONS[state];
  }

  // Fallback idle animation
  return {
    playbackMode: 'loop',
    steps: [
      {
        expression: 'neutral',
        holdMs: 2500,
        transitionMs: 400,
        transition: 'smooth',
      },
    ],
    blink: {
      enabled: true,
      initialDelayMs: 2000,
      minIntervalMs: 2500,
      maxIntervalMs: 5000,
      durationMs: 200,
    },
  };
}
