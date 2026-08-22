import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from '@/features/analyzer/model/types';
import type { StrobiAnimationState } from '@/entities/avatar/model/types';
import { analyzeEmotionContext } from '@/entities/avatar/model/emotionEngine';
import { generateChatResponse, getGreetingMessage } from '@/widgets/chatbot/lib/chatService';

interface ChatState {
  // UI State
  isOpen: boolean;
  isMinimized: boolean;

  // Strobi Avatar State
  avatarState: StrobiAnimationState;
  auraColor: string | null;
  isSpeaking: boolean;

  // Messages
  messages: ChatMessage[];
  isTyping: boolean;

  // Session
  sessionId: string;

  // Actions
  toggleChat: () => void;
  minimizeChat: () => void;
  setAvatarState: (state: StrobiAnimationState, aura?: string | null) => void;
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => void;
}

// Generate session ID
const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial State
      isOpen: false,
      isMinimized: false,
      avatarState: 'idle',
      auraColor: null,
      isSpeaking: false,
      messages: [],
      isTyping: false,
      sessionId: generateSessionId(),

      // Actions
      setAvatarState: (state: StrobiAnimationState, aura: string | null = null) => {
        set({ avatarState: state, auraColor: aura });
      },

      toggleChat: () => {
        const { isOpen, messages } = get();
        const nextIsOpen = !isOpen;

        set({
          isOpen: nextIsOpen,
          isMinimized: false,
          avatarState: nextIsOpen ? 'happy' : 'idle',
          auraColor: nextIsOpen ? '#60A5FA' : null,
          isSpeaking: false,
        });

        // Add greeting on first open
        if (nextIsOpen && messages.length === 0) {
          const greeting: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: getGreetingMessage(),
            timestamp: new Date().toISOString(),
          };
          set({ messages: [greeting] });
        }
      },

      minimizeChat: () => {
        set({ isMinimized: true, avatarState: 'idle', auraColor: null, isSpeaking: false });
      },

      sendMessage: async (content: string) => {
        const { messages } = get();

        // 1. Analyze initial intent from user text
        const initialAnalysis = analyzeEmotionContext(content);

        // Add user message
        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'user',
          content,
          timestamp: new Date().toISOString(),
        };

        set({
          messages: [...messages, userMessage],
          isTyping: true,
          avatarState: initialAnalysis.initialState,
          auraColor: initialAnalysis.auraColor,
          isSpeaking: false,
        });

        try {
          // Get AI response
          const response = await generateChatResponse([...messages, userMessage]);

          // 2. Full contextual emotion analysis with assistant response
          const finalAnalysis = analyzeEmotionContext(content, response.text);

          // Add assistant message
          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: response.text,
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, assistantMessage],
            isTyping: false,
            avatarState: finalAnalysis.responseState,
            auraColor: finalAnalysis.auraColor,
            isSpeaking: true,
          }));

          // Speech cadence turns off after 2.4s, then smoothly settles
          setTimeout(() => {
            set({ isSpeaking: false });
          }, 2400);

          // Natural emotion decay back to idle after 6 seconds of inactivity
          setTimeout(() => {
            const current = get();
            if (!current.isTyping && current.isOpen) {
              set({ avatarState: 'idle', auraColor: null });
            }
          }, 6500);
        } catch (error) {
          console.error('[Chat] Error:', error);

          // Add error message
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content:
              'Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es erneut.',
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, errorMessage],
            isTyping: false,
            avatarState: 'confused',
            auraColor: null,
            isSpeaking: false,
          }));
        }
      },

      resetChat: () => {
        set({
          messages: [],
          avatarState: 'idle',
          auraColor: null,
          isSpeaking: false,
          sessionId: generateSessionId(),
        });
      },
    }),
    {
      name: 'coday-chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        sessionId: state.sessionId,
      }),
    }
  )
);

export default useChatStore;
