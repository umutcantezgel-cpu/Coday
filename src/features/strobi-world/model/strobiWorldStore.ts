'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StrobiAnimationState } from '@/entities/avatar/model/types';
import type {
  StrobiScaleMode,
  StrobiRoomTheme,
  StrobiInteractionMode,
  StrobiWorldItem,
  StrobiSpeechState,
} from './types';

export const SCALE_DIMENSIONS: Record<StrobiScaleMode, number> = {
  mini: 140,
  companion: 240,
  giant: 380,
  boss: 540,
};

interface StrobiWorldStoreState {
  // Appearance & Stage
  scaleMode: StrobiScaleMode;
  roomTheme: StrobiRoomTheme;
  interactionMode: StrobiInteractionMode;
  equippedItems: StrobiWorldItem[];

  // Emotional Kinetics
  avatarState: StrobiAnimationState;
  auraColor: string;
  isSpeaking: boolean;
  speech: StrobiSpeechState | null;

  // Affection & Progression
  affection: number; // 0 to 100
  loveLevel: number;
  comboCount: number;

  // Mini-Game
  isMiniGameActive: boolean;
  gameScore: number;
  gameHighScore: number;

  // Actions
  setScaleMode: (mode: StrobiScaleMode) => void;
  setRoomTheme: (theme: StrobiRoomTheme) => void;
  setInteractionMode: (mode: StrobiInteractionMode) => void;
  toggleItem: (item: StrobiWorldItem) => void;
  setAvatarState: (state: StrobiAnimationState, aura?: string) => void;
  setSpeech: (speech: StrobiSpeechState | null) => void;
  addAffection: (amount: number) => void;
  startMiniGame: () => void;
  stopMiniGame: (finalScore?: number) => void;
  resetWorld: () => void;
}

const INITIAL_SPEECH: StrobiSpeechState = {
  id: 'welcome',
  text: 'Willkommen im Performance Studio! Ich bin Strobi, dein digitaler Begleiter. Wie kann ich dein Webprojekt beschleunigen?',
  type: 'talk',
  quickReplies: [
    { label: 'Kraul mich', action: 'pet_me' },
    { label: 'Next.js 15 Speed', action: 'explain_speed' },
    { label: 'Arcade Spiel', action: 'play_game' },
    { label: 'Espresso', action: 'give_coffee' },
  ],
};

export const useStrobiWorldStore = create<StrobiWorldStoreState>()(
  persist(
    (set, get) => ({
      scaleMode: 'companion',
      roomTheme: 'performance-studio',
      interactionMode: 'free',
      equippedItems: [],

      avatarState: 'idle',
      auraColor: '#2563EB',
      isSpeaking: false,
      speech: INITIAL_SPEECH,

      affection: 20,
      loveLevel: 1,
      comboCount: 0,

      isMiniGameActive: false,
      gameScore: 0,
      gameHighScore: 0,

      setScaleMode: (mode) => set({ scaleMode: mode }),
      setRoomTheme: (theme) => set({ roomTheme: theme }),
      setInteractionMode: (mode) => set({ interactionMode: mode }),

      toggleItem: (item) =>
        set((state) => ({
          equippedItems: state.equippedItems.includes(item)
            ? state.equippedItems.filter((i) => i !== item)
            : [...state.equippedItems, item],
        })),

      setAvatarState: (avatarState, aura) =>
        set((state) => ({
          avatarState,
          auraColor: aura || state.auraColor,
        })),

      setSpeech: (speech) =>
        set({
          speech,
          isSpeaking: !!speech,
        }),

      addAffection: (amount) => {
        const { affection, loveLevel, comboCount } = get();
        const nextAffection = affection + amount;

        if (nextAffection >= 100) {
          set({
            affection: nextAffection % 100,
            loveLevel: loveLevel + 1,
            comboCount: comboCount + 1,
            avatarState: 'celebrate',
            auraColor: '#10B981',
            speech: {
              id: `level_up_${loveLevel + 1}`,
              text: `Freundschafts-Level ${loveLevel + 1} erreicht! Unser digitaler Workflow erreicht maximale Synergie.`,
              type: 'shout',
            },
          });
        } else {
          set({
            affection: nextAffection,
            comboCount: comboCount + 1,
          });
        }
      },

      startMiniGame: () =>
        set({
          isMiniGameActive: true,
          interactionMode: 'game',
          gameScore: 0,
          avatarState: 'excited',
          speech: {
            id: 'game_start',
            text: 'Arcade-Modus aktiv: Fange die fallenden Performance-Orbs und meistere die Core Web Vitals!',
            type: 'talk',
          },
        }),

      stopMiniGame: (finalScore = 0) =>
        set((state) => ({
          isMiniGameActive: false,
          interactionMode: 'free',
          gameScore: finalScore,
          gameHighScore: Math.max(state.gameHighScore, finalScore),
          avatarState: finalScore > 150 ? 'celebrate' : 'happy',
          speech: {
            id: 'game_end',
            text:
              finalScore > 0
                ? `Runde beendet! Dein Ergebnis: ${finalScore} Performance-Punkte. Highscore: ${Math.max(state.gameHighScore, finalScore)} Punkte.`
                : 'Spiel beendet.',
            type: 'talk',
          },
        })),

      resetWorld: () =>
        set({
          scaleMode: 'companion',
          roomTheme: 'performance-studio',
          interactionMode: 'free',
          equippedItems: [],
          avatarState: 'idle',
          auraColor: '#2563EB',
          speech: INITIAL_SPEECH,
        }),
    }),
    {
      name: 'coday_strobi_world_v2',
      partialize: (state) => ({
        loveLevel: state.loveLevel,
        affection: state.affection,
        gameHighScore: state.gameHighScore,
        equippedItems: state.equippedItems,
      }),
    }
  )
);
