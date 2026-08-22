import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMiiPhysics } from '../useMiiPhysics';

describe('useMiiPhysics Hook', () => {
  it('initializes grounded at origin (0, 0)', () => {
    const { result } = renderHook(() => useMiiPhysics(800, 600));
    expect(result.current.physics.isAirborne).toBe(false);
    expect(result.current.physics.isDragging).toBe(false);
    expect(result.current.physics.x).toBe(0);
    expect(result.current.physics.y).toBe(0);
  });

  it('updates position and dragging state on handleDragStart and handleDragMove', () => {
    const { result } = renderHook(() => useMiiPhysics(800, 600));

    act(() => {
      result.current.handleDragStart(100, 100);
    });

    expect(result.current.physics.isDragging).toBe(true);
    expect(result.current.physics.isAirborne).toBe(false);

    act(() => {
      result.current.handleDragMove(120, 90, 20, -10);
    });

    expect(result.current.physics.x).toBe(20);
    expect(result.current.physics.y).toBe(-10);

    act(() => {
      result.current.handleDragEnd();
    });

    expect(result.current.physics.isDragging).toBe(false);
  });

  it('resets position back to center on resetPosition', () => {
    const { result } = renderHook(() => useMiiPhysics(800, 600));

    act(() => {
      result.current.handleDragStart(100, 100);
      result.current.handleDragMove(150, 150, 50, 50);
      result.current.resetPosition();
    });

    expect(result.current.physics.x).toBe(0);
    expect(result.current.physics.y).toBe(0);
    expect(result.current.physics.isDragging).toBe(false);
    expect(result.current.physics.isAirborne).toBe(false);
  });
});
