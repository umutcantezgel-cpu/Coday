'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { generateChatResponse } from '@/widgets/chatbot/lib/chatService';
import { analyzeEmotionContext } from '@/entities/avatar/model/emotionEngine';
import { useMiiAudio } from '../lib/useMiiAudio';
import { PaperPlaneRight, Sparkle, CircleNotch, X } from '@phosphor-icons/react/dist/ssr';

export const StrobiSpeechBubble: React.FC<{
  onTriggerPet?: () => void;
  onStartGame?: () => void;
  onGiveCoffee?: () => void;
}> = ({ onTriggerPet, onStartGame, onGiveCoffee }) => {
  const { speech, setSpeech, setAvatarState } = useStrobiWorldStore();
  const { playPop, playChime, playCelebrate } = useMiiAudio();

  const [inputVal, setInputVal] = useState('');
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
    playPop();
    switch (action) {
      case 'pet_me':
        setAvatarState('happy', '#EC4899');
        setSpeech({
          id: 'pet_me_res',
          text: 'Jaaa, kraul mich bitte! Bewege deine Maus oder deinen Finger sanft über meinen Kopf! 🥰',
          type: 'talk',
        });
        onTriggerPet?.();
        break;

      case 'tech_fact':
        setAvatarState('proud', '#3B82F6');
        setSpeech({
          id: 'tech_fact_res',
          text: 'Wusstest du? Durch Next.js 15 Server Components und Vercel Edge erreichen wir 0,2s Ladezeiten und 100/100 Core Web Vitals!',
          type: 'talk',
          quickReplies: [
            { label: '🚀 Wow, genial!', action: 'compliment' },
            { label: '☕ Kaffee trinken', action: 'give_coffee' },
          ],
        });
        break;

      case 'start_game':
        onStartGame?.();
        break;

      case 'give_coffee':
        onGiveCoffee?.();
        setAvatarState('excited', '#F59E0B');
        setSpeech({
          id: 'coffee_boost',
          text: 'Mmmh, doppelter Espresso! Volle Energie für 100/100 PageSpeed! ⚡☕',
          type: 'shout',
        });
        break;

      case 'compliment':
        playCelebrate();
        setAvatarState('laughing', '#EC4899');
        setSpeech({
          id: 'compliment_res',
          text: 'Vielen Dank! Du bist fantastisch! Lass uns die Web-Welt dominieren! 🌟',
          type: 'talk',
        });
        break;

      default:
        break;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isGenerating) return;

    const userText = inputVal.trim();
    setInputVal('');
    setIsGenerating(true);
    playPop();

    const analysis = analyzeEmotionContext(userText);
    setAvatarState(analysis.initialState, analysis.auraColor);

    setSpeech({
      id: 'thinking',
      text: 'Strobi denkt nach...',
      type: 'thought',
    });

    try {
      const aiRes = await generateChatResponse([
        { id: '1', role: 'user', content: userText, timestamp: new Date().toISOString() },
      ]);

      const finalAnalysis = analyzeEmotionContext(userText, aiRes.text);
      setAvatarState(finalAnalysis.responseState, finalAnalysis.auraColor);

      if (finalAnalysis.responseState === 'celebrate') {
        playCelebrate();
      } else {
        playChime();
      }

      setSpeech({
        id: `res-${Date.now()}`,
        text: aiRes.text,
        type: 'talk',
        quickReplies: [
          { label: '✨ Kraul mich!', action: 'pet_me' },
          { label: '🎮 Spiel starten', action: 'start_game' },
        ],
      });
    } catch {
      setAvatarState('confused');
      setSpeech({
        id: 'err',
        text: 'Hoppla, mein KI-Modul hatte einen kleinen Schluckauf! Frag mich gleich nochmal!',
        type: 'talk',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!speech) return null;

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative max-w-md w-full mx-auto z-40"
      >
        {/* Comic Speech Bubble Body */}
        <div className="relative rounded-3xl bg-slate-900/95 border-2 border-blue-500/40 p-4 md:p-5 shadow-2xl backdrop-blur-xl text-white">
          {/* Top Header / Mood Badge */}
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkle className="w-3 h-3 text-blue-400" />
              <span>
                {speech.type === 'thought'
                  ? 'Gedanke'
                  : speech.type === 'shout'
                    ? 'Ausruf'
                    : 'Strobi'}
              </span>
            </div>

            <button
              onClick={() => setSpeech(null)}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Sprechblase schließen"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Typewriter Text Content */}
          <p className="text-sm md:text-base leading-relaxed text-slate-100 font-medium min-h-[44px]">
            {displayedText}
            {displayedText.length < (speech.text?.length || 0) && (
              <span className="inline-block w-1.5 h-4 bg-blue-400 ml-1 animate-pulse" />
            )}
          </p>

          {/* Quick Action Chips */}
          {speech.quickReplies && speech.quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800">
              {speech.quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  onClick={() => handleQuickAction(reply.action)}
                  className="px-3 py-1 rounded-xl bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 hover:border-blue-400 text-xs font-semibold text-blue-200 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          {/* Embedded Direct AI Message Input */}
          <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Sprich direkt mit Strobi..."
              disabled={isGenerating}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isGenerating}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-md shadow-blue-500/20"
              aria-label="Nachricht senden"
            >
              {isGenerating ? (
                <CircleNotch className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <PaperPlaneRight className="w-3.5 h-3.5" />
              )}
            </button>
          </form>

          {/* Speech Bubble Pointer Tail */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-slate-900 drop-shadow-md" />
        </div>
      </m.div>
    </AnimatePresence>
  );
};
