'use client';
import React, { useRef, useEffect, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { ChatCircle, X, Minus, PaperPlaneRight, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export const ChatWidget: React.FC<{ hideTrigger?: boolean }> = ({ hideTrigger = false }) => {
  const { isOpen, isMinimized, messages, isTyping, toggleChat, minimizeChat, sendMessage } =
    useChatStore();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && !hideTrigger && (
          <m.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleChat}
            className="fixed right-4 md:right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/25 transition-all motion-reduce:duration-[0.01ms] flex items-center justify-center group bottom-[90px] md:bottom-6 opacity-100 isolation-auto"
            aria-label="Chat öffnen"
          >
            <ChatCircle
              className="w-6 h-6 group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] relative z-10"
              aria-hidden="true"
            />

            {/* Notification Badge */}
            {messages.length > 0 && isMinimized && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center z-20 shadow-sm"
                aria-live="polite"
                aria-label={`${messages.length} ungelesene Nachrichten`}
              >
                {messages.length}
              </span>
            )}

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-ping opacity-40 motion-reduce:animate-none -z-10" />
          </m.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 md:right-6 z-[9999] w-[calc(100vw-2rem)] md:w-96 h-[500px] max-h-[calc(100dvh-7rem)] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-200 flex flex-col overflow-hidden bottom-[90px] md:bottom-6 opacity-100"
            role="dialog"
            aria-label="Chat mit Codi KI-Assistent"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">C</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Codi</h3>
                  <p className="text-xs text-blue-100">KI-Assistent</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={minimizeChat}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors motion-reduce:duration-[0.01ms] text-white"
                  aria-label="Chat minimieren"
                >
                  <Minus className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors motion-reduce:duration-[0.01ms] text-white"
                  aria-label="Chat schließen"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* AI Disclaimer Banner */}
            <div className="bg-amber-50 border-b border-amber-100 px-3 py-2">
              <p className="text-xs text-amber-700 text-center">
                <span className="font-medium">Hinweis:</span> KI-generiert. Keine
                rechtliche/medizinische Beratung.
              </p>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              role="log"
              aria-live="polite"
              aria-label="Chat-Nachrichten"
            >
              {messages.map((message) => (
                <m.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.role === 'assistant' && (
                      <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <span>KI-generiert</span>
                      </p>
                    )}
                  </div>
                </m.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                  role="status"
                  aria-label="Codi tippt..."
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce motion-reduce:animate-none"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce motion-reduce:animate-none"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce motion-reduce:animate-none"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </m.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Schreiben Sie eine Nachricht..."
                  aria-label="Nachricht eingeben"
                  disabled={isTyping}
                  wrapperClassName="flex-1 space-y-0"
                  className="px-4 py-2.5 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-purple-500/50 shadow-none"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  aria-label="Nachricht senden"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-none hover:shadow-lg p-0 flex items-center justify-center shrink-0"
                >
                  {isTyping ? (
                    <CircleNotch className="w-4 h-4 animate-spin motion-reduce:animate-none" />
                  ) : (
                    <PaperPlaneRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
