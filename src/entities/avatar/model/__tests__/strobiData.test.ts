import { describe, it, expect } from 'vitest';
import {
  STROBI_NAME,
  STROBI_DEFAULT_COLORS,
  STROBI_ANIMATIONS,
  STROBI_EXPRESSIONS,
  STROBI_ANIMATION_ORDER,
  getExpressionPose,
  getAnimationDefinition,
  DEFAULT_EXPRESSION,
} from '../strobiData';
import type { StrobiAnimationState } from '../types';

describe('Strobi Avatar Data Model', () => {
  it('correctly loads Strobi avatar metadata and default colors', () => {
    expect(STROBI_NAME).toBe('Strobi');
    expect(STROBI_DEFAULT_COLORS.body).toBeDefined();
    expect(STROBI_DEFAULT_COLORS.eyes).toBeDefined();
    expect(STROBI_DEFAULT_COLORS.codayBlue).toBe('#3B82F6');
  });

  it('contains all 23 defined animation states with valid steps and blink configs', () => {
    expect(STROBI_ANIMATION_ORDER.length).toBe(23);

    STROBI_ANIMATION_ORDER.forEach((stateName) => {
      const anim = getAnimationDefinition(stateName);
      expect(anim).toBeDefined();
      expect(anim.steps.length).toBeGreaterThan(0);
      expect(['loop', 'once']).toContain(anim.playbackMode);

      // Verify that every step references a valid expression or fallback
      anim.steps.forEach((step) => {
        expect(step.expression).toBeDefined();
        expect(step.holdMs).toBeGreaterThan(0);
        expect(step.transitionMs).toBeGreaterThanOrEqual(0);
      });

      // Verify blink config
      expect(typeof anim.blink.enabled).toBe('boolean');
      expect(anim.blink.minIntervalMs).toBeGreaterThanOrEqual(0);
      expect(anim.blink.maxIntervalMs).toBeGreaterThanOrEqual(anim.blink.minIntervalMs);
    });
  });

  it('returns safe fallback expression when unknown expression is requested', () => {
    const unknown = getExpressionPose('non-existent-expression-12345');
    expect(unknown).toEqual(DEFAULT_EXPRESSION);
  });

  it('returns valid expression poses with head 3D rotation and eye metrics', () => {
    const neutral = getExpressionPose('neutral');
    expect(neutral.head).toBeDefined();
    expect(typeof neutral.head.x).toBe('number');
    expect(typeof neutral.head.y).toBe('number');
    expect(typeof neutral.head.z).toBe('number');

    expect(neutral.eyes.left).toBeDefined();
    expect(neutral.eyes.right).toBeDefined();
    expect(neutral.eyes.spacing).toBeGreaterThan(0);
  });

  it('returns safe fallback animation when unknown animation state is requested', () => {
    const fallback = getAnimationDefinition('invalid_state' as unknown as StrobiAnimationState);
    expect(fallback).toBeDefined();
    expect(fallback.steps.length).toBeGreaterThan(0);
    expect(fallback.playbackMode).toBe('loop');
  });
});
