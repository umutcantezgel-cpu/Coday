'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { PaperPlaneRight, Sparkle, ChatCircleDots } from '@phosphor-icons/react/dist/ssr';

export const StrobiSpeechBubble: React.FC<{
  onStartGame?: () => void;
  onGiveCoffee?: () => void;
}> = ({ onStartGame, onGiveCoffee }) => {
  const { speech, setSpeech, setAvatarState } = useStrobiWorldStore();
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const textIndexRef = useRef(0);

  // Reset displayed text during render when speech changes
  const [prevSpeechId, setPrevSpeechId] = useState(speech?.id);
  if (prevSpeechId !== speech?.id) {
    setPrevSpeechId(speech?.id);
    setDisplayedText('');
  }

  // Typewriter effect for speech bubble
  useEffect(() => {
    if (!speech?.text) return;

    textIndexRef.current = 0;
    const fullText = speech.text;

    const interval = setInterval(() => {
      if (textIndexRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, textIndexRef.current + 1));
        textIndexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [speech?.id, speech?.text]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'pet_me':
        setAvatarState('happy', '#F43F5E');
        setSpeech({
          id: 'pet_request',
          text: 'Bewege den Cursor über meinen Kopf, um Zuneigung und visuelle Funken zu erzeugen.',
          type: 'talk',
        });
        break;
      case 'explain_speed':
        setAvatarState('working', '#2563EB');
        setSpeech({
          id: 'speed_explanation',
          text: 'Next.js 15 App Router mit React Server Components und Edge-Caching eliminiert Client-Overhead für Sub-0,3s Ladezeiten.',
          type: 'talk',
          quickReplies: [
            { label: 'Core Web Vitals', action: 'explain_cwv' },
            { label: 'Projekt anfragen', action: 'request_project' },
          ],
        });
        break;
      case 'explain_cwv':
        setAvatarState('proud', '#10B981');
        setSpeech({
          id: 'cwv_explanation',
          text: '100/100 Core Web Vitals sichern Top-Rankings bei Google und maximale Konversion für deutsche Mittelständler.',
          type: 'talk',
        });
        break;
      case 'play_game':
        if (onStartGame) onStartGame();
        break;
      case 'give_coffee':
        if (onGiveCoffee) onGiveCoffee();
        setAvatarState('excited', '#D97706');
        setSpeech({
          id: 'coffee_response',
          text: 'Frischer Espresso eingeschenkt. Reaktionszeit optimiert.',
          type: 'talk',
        });
        break;
      case 'request_project':
        setAvatarState('happy', '#2563EB');
        setSpeech({
          id: 'contact_push',
          text: 'Klicke unten auf Projekt anfragen für eine kostenlose Bedarfsanalyse.',
          type: 'talk',
        });
        break;
      default:
        break;
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isGenerating) return;

    const query = userInput.trim();
    setUserInput('');
    setIsGenerating(true);
    setAvatarState('thinking', '#6366F1');

    setSpeech({
      id: `user_q_${Date.now()}`,
      text: 'Analysiere Anfrage...',
      type: 'thought',
    });

    try {
      const response = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'Du bist Strobi, der KI-Avatar der High-End Webagentur Coday aus Wetzlar. Antworte in 1-2 kurzen, prägnanten Sätzen. Nutze niemals Emojis.',
            },
            { role: 'user', content: query },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const cleanContent = (data.content || data.reply || 'Anfrage verarbeitet.')
          .replace(
            /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
            ''
          )
          .trim();

        setAvatarState('happy', '#2563EB');
        setSpeech({
          id: `ai_reply_${Date.now()}`,
          text: cleanContent,
          type: 'talk',
          quickReplies: [
            { label: 'Next.js 15 Speed', action: 'explain_speed' },
            { label: 'Projekt anfragen', action: 'request_project' },
          ],
        });
      } else {
        throw new Error('AI offline');
      }
    } catch {
      setAvatarState('idle');
      setSpeech({
        id: `err_${Date.now()}`,
        text: 'Coday entwickelt High-Performance Websites mit 100/100 Core Web Vitals für messbare Neukundengewinnung.',
        type: 'talk',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {speech && (
        <m.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-lg w-full mx-auto"
        >
          {/* Light Theme Glass Dialog Container */}
          <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-900/5 backdrop-blur-md relative">
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <ChatCircleDots className="w-4 h-4 text-blue-600" />
                <span>Strobi Dialog</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {speech.type === 'thought'
                  ? 'Gedanke'
                  : speech.type === 'shout'
                    ? 'Ausruf'
                    : 'Aktiv'}
              </span>
            </div>

            {/* Typewriter Body */}
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed min-h-[44px] font-medium">
              {displayedText}
              {displayedText.length < (speech.text?.length || 0) && (
                <span className="inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse" />
              )}
            </p>

            {/* Quick Actions Chips */}
            {speech.quickReplies && speech.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                {speech.quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(reply.action)}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <Sparkle className="w-3.5 h-3.5 text-blue-600" />
                    <span>{reply.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Free Chat Input Line */}
            <form
              onSubmit={handleSendChat}
              className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Frag Strobi etwas zur Webentwicklung..."
                disabled={isGenerating}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isGenerating}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-all shadow-sm shrink-0"
                aria-label="Nachricht an Strobi senden"
              >
                <PaperPlaneRight className="w-4 h-4" />
              </button>
            </form>

            {/* Downward Speech Bubble Triangle */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-slate-200/90 rotate-45" />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
