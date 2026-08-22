'use client';
import React, { useRef, useEffect, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { X, Minus, PaperPlaneRight, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';
import { StrobiAvatar } from '@/entities/avatar';
import { useStrobiAudio } from '@/entities/avatar/lib/useStrobiAudio';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export const ChatWidget: React.FC<{ hideTrigger?: boolean }> = ({ hideTrigger = false }) => {
  const {
    isOpen,
    isMinimized,
    avatarState,
    auraColor,
    isSpeaking,
    messages,
    isTyping,
    toggleChat,
    minimizeChat,
    setAvatarState,
    sendMessage,
  } = useChatStore();

  const { playPop, playChime, playCelebrate } = useStrobiAudio();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom and play arrival sound
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === 'assistant') {
        if (avatarState === 'celebrate') {
          playCelebrate();
        } else {
          playChime();
        }
      }
    }
  }, [messages, avatarState, playCelebrate, playChime]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle typing velocity & hesitation detection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    if (!isTyping) {
      setAvatarState('listening');
      // If user pauses typing for > 900ms, switch to attentive gaze
      typingTimerRef.current = setTimeout(() => {
        const current = useChatStore.getState();
        if (!current.isTyping && current.avatarState === 'listening') {
          setAvatarState('small-attentive' as any);
        }
      }, 950);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    playPop();
    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  return (
    <>
      {/* Strobi Floating Button */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && !hideTrigger && (
          <m.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              playPop();
              toggleChat();
            }}
            className="fixed right-4 md:right-6 z-[9999] w-16 h-16 rounded-full bg-slate-950/90 border border-blue-500/40 text-white shadow-2xl hover:shadow-blue-500/30 hover:border-blue-400 transition-[transform,box-shadow,border-color] motion-reduce:duration-[0.01ms] flex items-center justify-center group bottom-[90px] md:bottom-6 opacity-100 isolation-auto backdrop-blur-md"
            aria-label="Chat mit Strobi KI-Avatar öffnen"
          >
            <StrobiAvatar
              state={isMinimized ? 'happy' : 'idle'}
              dimension={52}
              auraColor={auraColor}
              enableTracking={true}
              interactive={true}
            />

            {/* Notification Badge */}
            {messages.length > 0 && isMinimized && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full text-xs font-bold flex items-center justify-center z-20 shadow-sm border-2 border-slate-950"
                aria-live="polite"
                aria-label={`${messages.length} ungelesene Nachrichten`}
              >
                {messages.length}
              </span>
            )}

            {/* Pulse Glow */}
            <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-50 motion-reduce:animate-none -z-10" />
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
            className="fixed right-4 md:right-6 z-[9999] w-[calc(100vw-2rem)] md:w-96 h-[520px] max-h-[calc(100dvh-7rem)] bg-slate-950 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col overflow-hidden bottom-[90px] md:bottom-6 opacity-100 backdrop-blur-xl"
            role="dialog"
            aria-label="Chat mit Strobi KI-Avatar"
          >
            {/* Header with Living Strobi Avatar */}
            <div className="bg-gradient-to-r from-blue-900/80 via-indigo-950 to-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <StrobiAvatar
                    state={avatarState}
                    dimension={42}
                    auraColor={auraColor}
                    isSpeaking={isSpeaking}
                    enableTracking={true}
                    interactive={false}
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-sm">Strobi</h3>
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                      KI-Avatar
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Digitaler Performance-Architekt</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    playPop();
                    minimizeChat();
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                  aria-label="Chat minimieren"
                >
                  <Minus className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => {
                    playPop();
                    toggleChat();
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                  aria-label="Chat schließen"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* AI Disclaimer Banner */}
            <div className="bg-slate-900/80 border-b border-slate-800/80 px-3 py-1.5">
              <p className="text-[11px] text-slate-400 text-center">
                ⚡ Bereit für Ihre Fragen zu Next.js, Headless CMS, SEO & Festpreisen.
              </p>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/90 text-slate-100"
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
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-md'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 shadow-sm rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.role === 'assistant' && (
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <span>Strobi KI</span>
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
                  aria-label="Strobi überlegt..."
                >
                  <div className="bg-slate-900 px-4 py-3 rounded-2xl rounded-bl-sm border border-slate-800 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-blue-400 font-medium mr-1">
                        Strobi überlegt
                      </span>
                      <span
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce motion-reduce:animate-none"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce motion-reduce:animate-none"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce motion-reduce:animate-none"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </m.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-slate-900/95 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onFocus={() => {
                    if (avatarState !== 'thinking') {
                      setAvatarState('listening');
                    }
                  }}
                  onBlur={() => {
                    if (avatarState === 'listening') {
                      setAvatarState('idle');
                    }
                  }}
                  onChange={handleInputChange}
                  placeholder="Frage an Strobi stellen..."
                  aria-label="Nachricht eingeben"
                  disabled={isTyping}
                  wrapperClassName="flex-1 space-y-0"
                  className="px-4 py-2.5 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-none placeholder:text-slate-500"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  aria-label="Nachricht senden"
                  className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-none hover:shadow-lg p-0 flex items-center justify-center shrink-0 border border-blue-500/50"
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
