'use client';

import React, { useState } from 'react';
import { StrobiAvatar } from './StrobiAvatar';
import {
  STROBI_ANIMATION_ORDER,
  STROBI_DEFAULT_COLORS,
  getAnimationDefinition,
} from '../model/strobiData';
import { analyzeEmotionContext } from '../model/emotionEngine';
import { useStrobiAudio } from '../lib/useStrobiAudio';
import type { StrobiAnimationState } from '../model/types';
import {
  Sparkle,
  ChatCircleDots,
  Sliders,
  Lightning,
  Heart,
  CalendarCheck,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';

export const StrobiInteractiveStage: React.FC<{
  onOpenChat?: () => void;
  className?: string;
}> = ({ onOpenChat, className = '' }) => {
  const [selectedState, setSelectedState] = useState<StrobiAnimationState>('curious');
  const [auraColor, setAuraColor] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>(STROBI_DEFAULT_COLORS.body);
  const [enableTracking, setEnableTracking] = useState(true);
  const [enableBreathing, setEnableBreathing] = useState(true);

  const { playPop, playCelebrate, playChime } = useStrobiAudio();
  const activeDef = getAnimationDefinition(selectedState);

  const THEMES = [
    { label: 'Strobi Original', color: STROBI_DEFAULT_COLORS.body },
    { label: 'Coday Electric Blue', color: '#3B82F6' },
    { label: 'Dark Space Slate', color: '#1e293b' },
    { label: 'Hyper Emerald', color: '#10B981' },
    { label: 'Sunset Amber', color: '#F59E0B' },
  ];

  const SCENARIOS = [
    {
      label: 'Termin buchen',
      icon: CalendarCheck,
      query: 'Ich möchte einen Termin buchen',
      response:
        'Sehr gerne! Lassen Sie uns ein unverbindliches 15-Minuten Strategiegespräch vereinbaren.',
    },
    {
      label: 'Tech Deep-Dive',
      icon: Lightning,
      query: 'Warum Next.js 15 & React 19?',
      response:
        'Weil Next.js 15 mit Edge Rendering und React 19 Sub-0,3s Ladezeiten und 100/100 Core Web Vitals garantiert.',
    },
    {
      label: 'WordPress Skepsis',
      icon: ShieldCheck,
      query: 'Warum nicht einfach WordPress oder Baukasten?',
      response:
        'Headless Architekturen eliminieren Plugin-Sicherheitslücken, verringern Ladezeiten um 80% und bieten 100% Quellcode-Eigentum.',
    },
    {
      label: 'Lob & Begeisterung',
      icon: Heart,
      query: 'Das Design und die Performance sind absolute Spitzenklasse!',
      response:
        'Vielen herzlichen Dank! Perfektion und Begeisterung sind unser Anspruch bei Coday.',
    },
  ];

  const triggerScenario = (query: string, response: string) => {
    playPop();
    const result = analyzeEmotionContext(query, response);
    setSelectedState(result.initialState);
    setAuraColor(result.auraColor);

    setTimeout(() => {
      setSelectedState(result.responseState);
      setIsSpeaking(true);
      if (result.responseState === 'celebrate') {
        playCelebrate();
      } else {
        playChime();
      }

      setTimeout(() => {
        setIsSpeaking(false);
      }, 2200);
    }, 600);
  };

  return (
    <div
      className={`relative w-full rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl overflow-hidden ${className}`}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: auraColor || activeTheme }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: auraColor || activeTheme }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: Interactive 3D Avatar Stage */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-inner">
          <div className="relative flex items-center justify-center p-8">
            <StrobiAvatar
              state={selectedState}
              dimension={190}
              bodyColor={activeTheme}
              auraColor={auraColor}
              isSpeaking={isSpeaking}
              enableBreathing={enableBreathing}
              enableTracking={enableTracking}
              interactive={true}
              onClick={playPop}
              ariaLabel={`Strobi im Status ${selectedState}`}
            />
          </div>

          {/* State Description Tag */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Status: {selectedState}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
              {activeDef.metadata?.description ||
                'Bewegen Sie die Maus um den Avatar, um die 3D-Blickverfolgung und Mikrosakkaden zu testen.'}
            </p>
          </div>
        </div>

        {/* Right: Interactive State & Color Controls & Scenario Simulator */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                Strobi Emotion Engine & Situations-Simulator
              </h3>
              {onOpenChat && (
                <button
                  onClick={() => {
                    playPop();
                    onOpenChat();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <ChatCircleDots className="w-4 h-4" />
                  Mit Strobi sprechen
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Erleben Sie, wie Strobi kontextabhängig auf unterschiedliche Gesprächssituationen
              reagiert:
            </p>
          </div>

          {/* Scenarios Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SCENARIOS.map((sc) => {
              const IconComp = sc.icon;
              return (
                <button
                  key={sc.label}
                  onClick={() => triggerScenario(sc.query, sc.response)}
                  className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/50 text-left transition-all group flex flex-col justify-between"
                >
                  <IconComp className="w-4 h-4 text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white block">
                    {sc.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animation State Pills Grid */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
              Alle 23 Animations-Zyklen manuell testen:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {STROBI_ANIMATION_ORDER.map((stateName) => {
                const isSelected = selectedState === stateName;
                return (
                  <button
                    key={stateName}
                    onClick={() => {
                      playPop();
                      setSelectedState(stateName);
                      setAuraColor(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                    }`}
                  >
                    {stateName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Color Selector & Toggles */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Theme:</span>
              <div className="flex items-center gap-1.5">
                {THEMES.map((theme) => (
                  <button
                    key={theme.color}
                    onClick={() => {
                      playPop();
                      setActiveTheme(theme.color);
                    }}
                    title={theme.label}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      activeTheme === theme.color
                        ? 'border-white scale-125'
                        : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: theme.color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={enableTracking}
                  onChange={(e) => setEnableTracking(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
                />
                3D-Tracking
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={enableBreathing}
                  onChange={(e) => setEnableBreathing(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
                />
                Atmung
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrobiInteractiveStage;
