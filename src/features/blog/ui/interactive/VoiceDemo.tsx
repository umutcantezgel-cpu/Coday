'use client';
import React, { useState } from 'react';
import { Microphone, MicrophoneSlash, Sparkle, SpeakerHigh } from '@phosphor-icons/react/dist/ssr';
import { m, AnimatePresence } from 'motion/react';
import { cn } from '@/shared/lib/utils';

import { useTranslations } from 'next-intl';

export const VoiceDemo: React.FC = () => {
  const t = useTranslations();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [step, setStep] = useState(0);

  const steps = [
    {
      user: t('blog:voiceDemo.steps.0.user'),
      ai: t('blog:voiceDemo.steps.0.ai'),
      action: 'FILTER_APPLIED',
    },
    {
      user: t('blog:voiceDemo.steps.1.user'),
      ai: t('blog:voiceDemo.steps.1.ai'),
      action: 'SORT_APPLIED',
    },
    {
      user: t('blog:voiceDemo.steps.2.user'),
      ai: t('blog:voiceDemo.steps.2.ai'),
      action: 'VARIANT_CHECK',
    },
  ];

  const handleMicClick = () => {
    if (isListening) return;

    setIsListening(true);
    setTranscript('');
    setResponse('');

    // Simulate listening
    setTimeout(() => {
      setTranscript(steps[step % steps.length]!.user);
      setIsListening(false);

      // Simulate thinking
      setTimeout(() => {
        setResponse(steps[step % steps.length]!.ai);
        setStep((prev) => prev + 1);
      }, 800);
    }, 1500);
  };

  return (
    <section
      className="my-12 font-sans w-full max-w-2xl mx-auto"
      aria-label={t('blog:voiceDemo.title')}
    >
      <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 p-32 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 p-8 flex flex-col items-center min-h-[400px] justify-between">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
              <Sparkle className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{t('blog:voiceDemo.title')}</h3>
            <p className="text-gray-400 text-sm">{t('blog:voiceDemo.subtitle')}</p>
          </div>

          {/* Conversation Area */}
          <div className="w-full space-y-4 mb-8" aria-live="polite">
            <AnimatePresence mode="wait">
              {transcript && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-gray-800 text-gray-200 px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                    "{transcript}"
                  </div>
                </m.div>
              )}

              {response && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    <SpeakerHigh size={14} className="text-white" />
                  </div>
                  <div className="bg-indigo-900/50 border border-indigo-500/30 text-indigo-100 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm shadow-sm backdrop-blur-sm">
                    {response}
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {!transcript && !response && (
              <div className="text-center text-gray-600 text-sm italic py-10">
                {t('blog:voiceDemo.tapToSpeak')}...
              </div>
            )}
          </div>

          {/* Controls */}
          <button
            onClick={handleMicClick}
            disabled={isListening}
            aria-label={
              isListening ? t('blog:voiceDemo.listening') : t('blog:voiceDemo.tapToSpeak')
            }
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center transition motion-reduce:duration-[0.01ms] duration-300 relative',
              isListening
                ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-110'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-indigo-500/25 hover:scale-105 active:scale-[0.97]'
            )}
          >
            {isListening ? (
              <>
                <span className="absolute inset-0 rounded-full border-2 border-red-400 opacity-50 animate-ping motion-reduce:animate-none"></span>
                <MicrophoneSlash className="text-white w-8 h-8" />
              </>
            ) : (
              <Microphone className="text-white w-8 h-8" />
            )}
          </button>

          <div className="mt-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            {isListening ? t('blog:voiceDemo.listening') : t('blog:voiceDemo.tapToSpeak')}
          </div>
        </div>
      </div>
    </section>
  );
};
