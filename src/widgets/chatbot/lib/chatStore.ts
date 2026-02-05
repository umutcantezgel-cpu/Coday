import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from '../../../features/analyzer/model/types';
import { generateChatResponse, getGreetingMessage } from './chatService';

interface ChatState {
    // UI State
    isOpen: boolean;
    isMinimized: boolean;

    // Messages
    messages: ChatMessage[];
    isTyping: boolean;

    // Session
    sessionId: string;

    // Actions
    toggleChat: () => void;
    minimizeChat: () => void;
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
            messages: [],
            isTyping: false,
            sessionId: generateSessionId(),

            // Actions
            toggleChat: () => {
                const { isOpen, messages } = get();

                set({ isOpen: !isOpen, isMinimized: false });

                // Add greeting on first open
                if (!isOpen && messages.length === 0) {
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
                set({ isMinimized: true });
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
                });

                try {
                    // Get AI response
                    const response = await generateChatResponse([...messages, userMessage]);

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
                    }));
                } catch (error) {
                    console.error('[Chat] Error:', error);

                    // Add error message
                    const errorMessage: ChatMessage = {
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        content: 'Entschuldigung, es gab ein technisches Problem. Bitte versuche es erneut.',
                        timestamp: new Date().toISOString(),
                    };

                    set((state) => ({
                        messages: [...state.messages, errorMessage],
                        isTyping: false,
                    }));
                }
            },

            resetChat: () => {
                set({
                    messages: [],
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
