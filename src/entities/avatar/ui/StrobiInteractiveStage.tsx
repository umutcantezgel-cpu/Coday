'use client';

import React, { useState } from 'react';
import { StrobiAvatar } from './StrobiAvatar';
import {
  STROBI_ANIMATION_ORDER,
  STROBI_DEFAULT_COLORS,
  getAnimationDefinition,
} from '../model/strobiData';
import type { StrobiAnimationState } from '../model/types';
import { Sparkle, ChatCircleDots, Sliders, Play } from '@phosphor-icons/react/dist/ssr';

export const StrobiInteractiveStage: React.FC<{
  onOpenChat?: () => void;
  className?: string;
}> = ({ onOpenChat, className = '' }) => {
  const [selectedState, setSelectedState] = useState<StrobiAnimationState>('curious');
  const [activeTheme, setActiveTheme] = useState<string>(STROBI_DEFAULT_COLORS.body);
  const [enableTracking, setEnableTracking] = useState(true);

  const activeDef = getAnimationDefinition(selectedState);

  const THEMES = [
    { label: 'Strobi Original', color: STROBI_DEFAULT_COLORS.body },
    { label: 'Coday Electric Blue', color: '#3B82F6' },
    { label: 'Dark Space Slate', color: '#1e293b' },
    { label: 'Hyper Emerald', color: '#10B981' },
    { label: 'Sunset Amber', color: '#F59E0B' },
  ];

  return (
    <div
      className={`relative w-full rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl overflow-hidden ${className}`}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: activeTheme }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: activeTheme }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: Interactive 3D Avatar Stage */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-inner">
          <div className="relative flex items-center justify-center p-8">
            <StrobiAvatar
              state={selectedState}
              dimension={180}
              bodyColor={activeTheme}
              enableTracking={enableTracking}
              interactive={true}
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
                'Bewegen Sie die Maus um den Avatar, um die 3D-Blickverfolgung zu testen.'}
            </p>
          </div>
        </div>

        {/* Right: Interactive State & Color Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                Strobi KI-Emotions & State Machine
              </h3>
              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <ChatCircleDots className="w-4 h-4" />
                  Mit Strobi sprechen
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Testen Sie alle 23 aus `strobi.avatar.json` gespeisten Keyframe- und Animationszyklen:
            </p>
          </div>

          {/* Animation State Pills Grid */}
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            {STROBI_ANIMATION_ORDER.map((stateName) => {
              const isSelected = selectedState === stateName;
              return (
                <button
                  key={stateName}
                  onClick={() => setSelectedState(stateName)}
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

          {/* Theme Color Selector & Toggles */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Theme:</span>
              <div className="flex items-center gap-1.5">
                {THEMES.map((theme) => (
                  <button
                    key={theme.color}
                    onClick={() => setActiveTheme(theme.color)}
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

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
              <input
                type="checkbox"
                checked={enableTracking}
                onChange={(e) => setEnableTracking(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
              />
              <span>3D-Mausverfolgung</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrobiInteractiveStage;
