import { describe, it, expect, beforeEach } from 'vitest';
import { useStrobiWorldStore, SCALE_DIMENSIONS } from '../strobiWorldStore';

describe('Strobi World Store', () => {
  beforeEach(() => {
    useStrobiWorldStore.setState({
      scaleMode: 'companion',
      roomTheme: 'performance-studio',
      interactionMode: 'free',
      equippedItems: ['coffee'],
      affection: 20,
      loveLevel: 1,
      comboCount: 0,
      avatarState: 'idle',
      auraColor: '#2563EB',
      isSpeaking: false,
      speech: null,
      isMiniGameActive: false,
      gameScore: 0,
      gameHighScore: 0,
    });
  });

  it('handles scale mode changes and dimension mappings accurately', () => {
    expect(SCALE_DIMENSIONS.mini).toBe(140);
    expect(SCALE_DIMENSIONS.companion).toBe(240);
    expect(SCALE_DIMENSIONS.giant).toBe(380);
    expect(SCALE_DIMENSIONS.boss).toBe(540);

    useStrobiWorldStore.getState().setScaleMode('boss');
    expect(useStrobiWorldStore.getState().scaleMode).toBe('boss');
  });

  it('accumulates affection and handles level-ups when reaching 100%', () => {
    const { addAffection } = useStrobiWorldStore.getState();

    addAffection(50);
    expect(useStrobiWorldStore.getState().affection).toBe(70);

    addAffection(40);
    expect(useStrobiWorldStore.getState().loveLevel).toBe(2);
    expect(useStrobiWorldStore.getState().affection).toBe(10);
    expect(useStrobiWorldStore.getState().avatarState).toBe('celebrate');
  });

  it('toggles equipped world items properly', () => {
    const { toggleItem } = useStrobiWorldStore.getState();

    expect(useStrobiWorldStore.getState().equippedItems).toContain('coffee');
    toggleItem('coffee');
    expect(useStrobiWorldStore.getState().equippedItems).not.toContain('coffee');

    toggleItem('laptop');
    expect(useStrobiWorldStore.getState().equippedItems).toContain('laptop');
  });

  it('handles mini-game lifecycle and score tracking', () => {
    const { startMiniGame, stopMiniGame } = useStrobiWorldStore.getState();

    startMiniGame();
    expect(useStrobiWorldStore.getState().isMiniGameActive).toBe(true);
    expect(useStrobiWorldStore.getState().avatarState).toBe('excited');

    stopMiniGame(200);
    expect(useStrobiWorldStore.getState().isMiniGameActive).toBe(false);
    expect(useStrobiWorldStore.getState().gameScore).toBe(200);
    expect(useStrobiWorldStore.getState().gameHighScore).toBe(200);
  });
});
