import { describe, it, expect, beforeEach } from 'vitest';
import { useStrobiWorldStore, SCALE_DIMENSIONS } from '../strobiWorldStore';

describe('Strobi World Store', () => {
  beforeEach(() => {
    useStrobiWorldStore.setState({
      scaleMode: 'companion',
      roomTheme: 'cyber-lab',
      interactionMode: 'free',
      equippedItems: ['coffee'],
      affection: 20,
      loveLevel: 1,
      comboCount: 0,
      avatarState: 'idle',
      auraColor: null,
      isSpeaking: false,
      speech: null,
      isMiniGameActive: false,
      gameScore: 0,
      gameHighScore: 0,
      gameTimeLeft: 45,
      activeOrbs: [],
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

    const res1 = addAffection(50);
    expect(res1.leveledUp).toBe(false);
    expect(useStrobiWorldStore.getState().affection).toBe(70);

    const res2 = addAffection(40);
    expect(res2.leveledUp).toBe(true);
    expect(res2.newLevel).toBe(2);
    expect(useStrobiWorldStore.getState().affection).toBe(0);
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
    const { startMiniGame, spawnOrb, collectOrb, stopMiniGame } = useStrobiWorldStore.getState();

    startMiniGame();
    expect(useStrobiWorldStore.getState().isMiniGameActive).toBe(true);
    expect(useStrobiWorldStore.getState().avatarState).toBe('excited');

    spawnOrb({
      id: 'orb-1',
      x: 100,
      y: 100,
      type: 'lcp',
      points: 100,
      label: 'LCP 0.2s',
      color: '#10B981',
      speed: 2,
    });

    const pts = collectOrb('orb-1');
    expect(pts).toBe(100);
    expect(useStrobiWorldStore.getState().gameScore).toBe(100);

    stopMiniGame();
    expect(useStrobiWorldStore.getState().isMiniGameActive).toBe(false);
    expect(useStrobiWorldStore.getState().gameHighScore).toBe(100);
  });
});
