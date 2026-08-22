/**
 * Strobi Mii World Type Definitions (Light Agency Theme & Zero Emojis)
 */

import type { StrobiAnimationState } from '@/entities/avatar/model/types';

export type StrobiScaleMode = 'mini' | 'companion' | 'giant' | 'boss';

export type StrobiRoomTheme =
  | 'performance-studio'
  | 'minimalist-slate'
  | 'warm-daylight'
  | 'nature-lab';

export type StrobiInteractionMode = 'free' | 'pet' | 'toss' | 'game';

export type StrobiWorldItem = 'coffee' | 'laptop' | 'star' | 'glasses' | 'headphones';

export interface StrobiSpeechState {
  id: string;
  text: string;
  type: 'talk' | 'thought' | 'shout' | 'quiz';
  quickReplies?: { label: string; action: string }[];
  durationMs?: number;
}

export interface StrobiParticle {
  id: string;
  x: number;
  y: number;
  type: 'heart' | 'star' | 'sparkle' | 'confetti';
  color: string;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  rotation: number;
}

export interface StrobiPhysicsPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isAirborne: boolean;
  isDragging: boolean;
  scale: number;
  rotation: number;
}

export type SpeedOrbType = 'lcp' | 'ttfb' | 'cls' | 'seo' | 'bug' | 'bot' | 'shield' | 'star';

export interface SpeedOrb {
  id: string;
  x: number;
  y: number;
  type: SpeedOrbType;
  points: number;
  label: string;
  color: string;
  speed: number;
}
