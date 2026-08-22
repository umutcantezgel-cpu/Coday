import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from '@/features/analyzer/model/types';
import type { StrobiAnimationState } from '@/entities/avatar/model/types';
import { generateChatResponse, getGreetingMessage } from '@/widgets/chatbot/lib/chatService';

interface ChatState {
  // UI State
  isOpen: boolean;
  isMinimized: boolean;

  // Strobi Avatar State
  avatarState: StrobiAnimationState;

  // Messages
  messages: ChatMessage[];
  isTyping: boolean;

  // Session
  sessionId: string;

  // Actions
  toggleChat: () => void;
  minimizeChat: () => void;
  setAvatarState: (state: StrobiAnimationState) => void;
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
      messages: [],
      isTyping: false,
      sessionId: generateSessionId(),

      // Actions
      setAvatarState: (state: StrobiAnimationState) => {
        set({ avatarState: state });
      },

      toggleChat: () => {
        const { isOpen, messages } = get();
        const nextIsOpen = !isOpen;

        set({
          isOpen: nextIsOpen,
          isMinimized: false,
          avatarState: nextIsOpen ? 'happy' : 'idle',
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
        set({ isMinimized: true, avatarState: 'idle' });
      },

      sendMessage: async (content: string) => {
        const { messages } = get();

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
          avatarState: 'thinking',
        });

        try {
          // Get AI response
          const response = await generateChatResponse([...messages, userMessage]);

          // Check if response contains celebration trigger (e.g. booking or contact)
          const isCelebratory =
            content.toLowerCase().includes('gebucht') ||
            content.toLowerCase().includes('termin') ||
            response.text.toLowerCase().includes('freue mich') ||
            response.text.toLowerCase().includes('glückwunsch');

          const nextAvatarState: StrobiAnimationState = isCelebratory ? 'celebrate' : 'happy';

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
            avatarState: nextAvatarState,
          }));
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
          }));
        }
      },

      resetChat: () => {
        set({
          messages: [],
          avatarState: 'idle',
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
