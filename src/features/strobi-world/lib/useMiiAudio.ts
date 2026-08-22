'use client';

import { useCallback } from 'react';

/**
 * Audio Engine disabled per Coday brand guidelines (Zero-Sound Policy).
 * Provides silent no-op methods for API compatibility.
 */
export function useMiiAudio() {
  const playPop = useCallback(() => {}, []);
  const playChime = useCallback(() => {}, []);
  const playPetPurr = useCallback(() => {}, []);
  const playGiggle = useCallback(() => {}, []);
  const playBoing = useCallback(() => {}, []);
  const playTossWhoosh = useCallback(() => {}, []);
  const playCelebrate = useCallback(() => {}, []);
  const playLevelUp = useCallback(() => {}, []);
  const playCollect = useCallback(() => {}, []);

  return {
    playPop,
    playChime,
    playPetPurr,
    playGiggle,
    playBoing,
    playTossWhoosh,
    playCelebrate,
    playLevelUp,
    playCollect,
  };
}
