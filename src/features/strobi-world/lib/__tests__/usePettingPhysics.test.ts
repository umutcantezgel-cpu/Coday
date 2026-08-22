import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePettingPhysics } from '../usePettingPhysics';
import { useStrobiWorldStore } from '../../model/strobiWorldStore';

describe('usePettingPhysics Hook', () => {
  it('initializes with default zero petting state and empty particles', () => {
    const { result } = renderHook(() => usePettingPhysics());
    expect(result.current.isPetting).toBe(false);
    expect(result.current.particles).toEqual([]);
  });

  it('detects rhythmic petting strokes and increases affection', () => {
    useStrobiWorldStore.setState({ affection: 10, comboCount: 0 });
    const { result } = renderHook(() => usePettingPhysics());

    act(() => {
      // Stroke 1
      result.current.handlePointerMove({
        clientX: 100,
        clientY: 100,
      } as React.PointerEvent<HTMLDivElement>);
    });

    act(() => {
      // Stroke 2 (rapid scrub)
      result.current.handlePointerMove({
        clientX: 140,
        clientY: 110,
      } as React.PointerEvent<HTMLDivElement>);
    });

    expect(result.current.isPetting).toBe(true);
    expect(useStrobiWorldStore.getState().affection).toBeGreaterThan(10);
  });
});
