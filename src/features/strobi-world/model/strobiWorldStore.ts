import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  StrobiScaleMode,
  StrobiRoomTheme,
  StrobiInteractionMode,
  StrobiWorldItem,
  StrobiSpeechState,
  SpeedOrb,
} from './types';
import type { StrobiAnimationState } from '@/entities/avatar/model/types';

export const SCALE_DIMENSIONS: Record<StrobiScaleMode, number> = {
  mini: 140,
  companion: 240,
  giant: 380,
  boss: 540,
};

interface StrobiWorldState {
  // Appearance & Stage
  scaleMode: StrobiScaleMode;
  roomTheme: StrobiRoomTheme;
  interactionMode: StrobiInteractionMode;
  equippedItems: StrobiWorldItem[];

  // Affection & Mood
  affection: number;
  loveLevel: number;
  comboCount: number;
  avatarState: StrobiAnimationState;
  auraColor: string | null;
  isSpeaking: boolean;

  // Dialogue / Speech Bubble
  speech: StrobiSpeechState | null;

  // Sound Settings
  soundMuted: boolean;

  // Mini-Game
  isMiniGameActive: boolean;
  gameScore: number;
  gameHighScore: number;
  gameTimeLeft: number;
  activeOrbs: SpeedOrb[];

  // Actions
  setScaleMode: (mode: StrobiScaleMode) => void;
  setRoomTheme: (theme: StrobiRoomTheme) => void;
  setInteractionMode: (mode: StrobiInteractionMode) => void;
  toggleItem: (item: StrobiWorldItem) => void;
  addAffection: (delta: number) => { leveledUp: boolean; newLevel: number };
  resetAffection: () => void;
  setSpeech: (speech: StrobiSpeechState | null) => void;
  setAvatarState: (state: StrobiAnimationState, aura?: string | null) => void;
  toggleSound: () => void;

  // Mini-Game Actions
  startMiniGame: () => void;
  stopMiniGame: () => void;
  tickMiniGame: () => void;
  spawnOrb: (orb: SpeedOrb) => void;
  collectOrb: (orbId: string) => number;
}

export const useStrobiWorldStore = create<StrobiWorldState>()(
  persist(
    (set, get) => ({
      // Defaults
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

      speech: {
        id: 'welcome',
        text: 'Willkommen in meiner Strobi Mii World! Klicke, kraule oder vergrößere mich!',
        type: 'talk',
        quickReplies: [
          { label: '✨ Streichel mich!', action: 'pet_me' },
          { label: '⚡ Next.js 15 Speed!', action: 'tech_fact' },
          { label: '🎮 Spiel starten', action: 'start_game' },
          { label: '☕ Kaffee geben', action: 'give_coffee' },
        ],
      },

      soundMuted: false,

      isMiniGameActive: false,
      gameScore: 0,
      gameHighScore: 0,
      gameTimeLeft: 45,
      activeOrbs: [],

      // Actions
      setScaleMode: (mode) => {
        set({ scaleMode: mode });
      },

      setRoomTheme: (theme) => {
        set({ roomTheme: theme });
      },

      setInteractionMode: (mode) => {
        set({ interactionMode: mode });
      },

      toggleItem: (item) => {
        const current = get().equippedItems;
        const exists = current.includes(item);
        const next = exists ? current.filter((i) => i !== item) : [...current, item];
        set({ equippedItems: next });
      },

      addAffection: (delta) => {
        const { affection, loveLevel, comboCount } = get();
        const nextAffection = Math.min(100, affection + delta);
        const nextCombo = comboCount + 1;
        let leveledUp = false;
        let newLevel = loveLevel;

        if (nextAffection >= 100) {
          leveledUp = true;
          newLevel = loveLevel + 1;
        }

        set({
          affection: leveledUp ? 0 : nextAffection,
          loveLevel: newLevel,
          comboCount: nextCombo,
        });

        return { leveledUp, newLevel };
      },

      resetAffection: () => {
        set({ affection: 0, comboCount: 0 });
      },

      setSpeech: (speech) => {
        set({ speech, isSpeaking: !!speech });
      },

      setAvatarState: (avatarState, auraColor = null) => {
        set({ avatarState, auraColor });
      },

      toggleSound: () => {
        set((state) => ({ soundMuted: !state.soundMuted }));
      },

      startMiniGame: () => {
        set({
          isMiniGameActive: true,
          gameScore: 0,
          gameTimeLeft: 45,
          activeOrbs: [],
          avatarState: 'excited',
          auraColor: '#10B981',
          speech: {
            id: 'game_start',
            text: 'Fange so viele 100/100 Core Web Vitals Orbs wie möglich vor Ablauf der Zeit!',
            type: 'shout',
          },
        });
      },

      stopMiniGame: () => {
        const { gameScore, gameHighScore } = get();
        const nextHigh = Math.max(gameScore, gameHighScore);
        set({
          isMiniGameActive: false,
          gameHighScore: nextHigh,
          avatarState: 'celebrate',
          auraColor: '#F59E0B',
          speech: {
            id: 'game_over',
            text: `Runde beendet! Dein Highscore: ${nextHigh} Performance-Punkte! 🎉`,
            type: 'talk',
            quickReplies: [
              { label: '🔄 Nochmal spielen', action: 'start_game' },
              { label: '💖 Kraul mich zur Belohnung', action: 'pet_me' },
            ],
          },
        });
      },

      tickMiniGame: () => {
        const { gameTimeLeft, isMiniGameActive } = get();
        if (!isMiniGameActive) return;

        if (gameTimeLeft <= 1) {
          get().stopMiniGame();
        } else {
          set({ gameTimeLeft: gameTimeLeft - 1 });
        }
      },

      spawnOrb: (orb) => {
        set((state) => ({ activeOrbs: [...state.activeOrbs.slice(-12), orb] }));
      },

      collectOrb: (orbId) => {
        const { activeOrbs, gameScore } = get();
        const orb = activeOrbs.find((o) => o.id === orbId);
        if (!orb) return 0;

        const points = orb.points;
        set({
          gameScore: Math.max(0, gameScore + points),
          activeOrbs: activeOrbs.filter((o) => o.id !== orbId),
          avatarState: points > 0 ? 'happy' : 'confused',
        });

        return points;
      },
    }),
    {
      name: 'coday_strobi_world_v1',
      partialize: (state) => ({
        gameHighScore: state.gameHighScore,
        loveLevel: state.loveLevel,
        soundMuted: state.soundMuted,
        equippedItems: state.equippedItems,
      }),
    }
  )
);
