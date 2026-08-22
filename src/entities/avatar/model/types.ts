/**
 * Strobi Avatar Data Model & Type Definitions
 * Based on schema bible-strong/avatar-definition v1
 */

export interface EyePose {
  width: number;
  height: number;
  x: number;
  y: number;
  angle: number;
}

export interface HeadRotation {
  x: number; // Pitch (degrees)
  y: number; // Yaw (degrees)
  z: number; // Roll (degrees)
}

export interface ExpressionPose {
  head: HeadRotation;
  eyes: {
    left: EyePose;
    right: EyePose;
    spacing: number;
  };
  perspective: number;
  motion?: {
    eyes?: string;
    body?: string;
  };
}

export interface AnimationStep {
  expression: string;
  holdMs: number;
  transitionMs: number;
  transition?: 'smooth' | 'instant';
}

export interface BlinkConfig {
  enabled: boolean;
  initialDelayMs: number;
  minIntervalMs: number;
  maxIntervalMs: number;
  durationMs: number;
}

export interface AnimationStateDefinition {
  playbackMode: 'loop' | 'once';
  steps: AnimationStep[];
  blink: BlinkConfig;
  metadata?: {
    label: string;
    description: string;
    group: string;
  };
}

export type StrobiAnimationState =
  | 'sleeping'
  | 'waking'
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'searching'
  | 'working'
  | 'excited'
  | 'bored'
  | 'suspicious'
  | 'angry'
  | 'drowsy'
  | 'happy'
  | 'curious'
  | 'confused'
  | 'surprised'
  | 'proud'
  | 'shy'
  | 'sad'
  | 'laughing'
  | 'scared'
  | 'playful'
  | 'celebrate';

export type StrobiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';

export interface StrobiAvatarProps {
  /** Current animation or mood state */
  state?: StrobiAnimationState;
  /** Size preset */
  size?: StrobiSize;
  /** Custom pixel dimension (overrides size preset) */
  dimension?: number;
  /** Custom primary body color (hex, e.g. #3B82F6, #5b7fe5, #1e293b) */
  bodyColor?: string;
  /** Custom eye color (hex, e.g. #111316, #ffffff) */
  eyeColor?: string;
  /** Emotional glow aura (e.g. #10B981 for success, #3B82F6 for tech) */
  auraColor?: string | null;
  /** Enable vocalization speech cadence pulses */
  isSpeaking?: boolean;
  /** Enable organic idle breathing float */
  enableBreathing?: boolean;
  /** Enable interactive cursor tracking (head and gaze follow mouse) */
  enableTracking?: boolean;
  /** Interactive hover reaction (e.g. wakes up on hover) */
  interactive?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Custom click handler */
  onClick?: () => void;
  /** Access label for screen readers */
  ariaLabel?: string;
}
