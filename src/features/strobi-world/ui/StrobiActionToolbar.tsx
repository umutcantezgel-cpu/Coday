'use client';

import React from 'react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import type {
  StrobiScaleMode,
  StrobiRoomTheme,
  StrobiInteractionMode,
  StrobiWorldItem,
} from '../model/types';
import {
  HandWaving,
  ArrowsOutCardinal,
  GameController,
  Coffee,
  Laptop,
  Star,
  Eyeglasses,
  Headphones,
  Desktop,
  Cube,
  SunDim,
  TreeEvergreen,
  Sparkle,
  Crown,
  BoundingBox,
} from '@phosphor-icons/react/dist/ssr';

export const StrobiActionToolbar: React.FC<{
  onStartMiniGame: () => void;
}> = ({ onStartMiniGame }) => {
  const {
    scaleMode,
    setScaleMode,
    roomTheme,
    setRoomTheme,
    interactionMode,
    setInteractionMode,
    equippedItems,
    toggleItem,
    setSpeech,
    setAvatarState,
  } = useStrobiWorldStore();

  const SCALE_OPTIONS: { mode: StrobiScaleMode; label: string; icon: React.ElementType }[] = [
    { mode: 'mini', label: 'Mini', icon: Sparkle },
    { mode: 'companion', label: 'Medium', icon: Cube },
    { mode: 'giant', label: 'Giant', icon: Crown },
    { mode: 'boss', label: 'Titan', icon: BoundingBox },
  ];

  const THEMES: { theme: StrobiRoomTheme; label: string; icon: React.ElementType }[] = [
    { theme: 'performance-studio', label: 'Studio Blue', icon: Desktop },
    { theme: 'minimalist-slate', label: 'Minimalist', icon: Cube },
    { theme: 'warm-daylight', label: 'Daylight', icon: SunDim },
    { theme: 'nature-lab', label: 'Nature Lab', icon: TreeEvergreen },
  ];

  const ITEMS: { item: StrobiWorldItem; label: string; icon: React.ElementType }[] = [
    { item: 'coffee', label: 'Espresso', icon: Coffee },
    { item: 'laptop', label: 'Next.js 15', icon: Laptop },
    { item: 'star', label: '100/100 CWV', icon: Star },
    { item: 'glasses', label: 'Brille', icon: Eyeglasses },
    { item: 'headphones', label: 'Kopfhörer', icon: Headphones },
  ];

  const handleScaleSelect = (mode: StrobiScaleMode) => {
    setScaleMode(mode);
    if (mode === 'boss') {
      setAvatarState('excited', '#2563EB');
      setSpeech({
        id: 'boss_scale',
        text: 'Titan-Modus aktiviert: Maximale Skalierung bei gestochen scharfen Vektoren.',
        type: 'shout',
      });
    } else if (mode === 'giant') {
      setAvatarState('proud', '#2563EB');
      setSpeech({
        id: 'giant_scale',
        text: 'Großformat aktiviert: Volle Detailtiefe und optimierte Proportionen.',
        type: 'talk',
      });
    } else if (mode === 'mini') {
      setAvatarState('playful');
      setSpeech({
        id: 'mini_scale',
        text: 'Kompaktformat aktiviert.',
        type: 'talk',
      });
    }
  };

  const handleItemToggle = (item: StrobiWorldItem) => {
    toggleItem(item);
    if (item === 'star') {
      setAvatarState('celebrate', '#10B981');
      setSpeech({
        id: 'star_equip',
        text: '100/100 Core Web Vitals Stern angelegt: Sub-0,3s Ladezeit garantiert.',
        type: 'shout',
      });
    } else if (item === 'coffee') {
      setAvatarState('excited', '#D97706');
      setSpeech({
        id: 'coffee_equip',
        text: 'Frischer Espresso aktiv. Leistungsbereitschaft auf Höchststufe.',
        type: 'talk',
      });
    } else if (item === 'laptop') {
      setAvatarState('working', '#2563EB');
      setSpeech({
        id: 'laptop_equip',
        text: 'Next.js 15 & React 19 Engine hochgefahren. Code läuft fehlerfrei.',
        type: 'talk',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto z-30 space-y-3">
      {/* Primary Tool Controls in Elevated Light Glass Card */}
      <div className="p-3 md:p-4 rounded-3xl bg-white/95 border border-slate-200/90 shadow-lg shadow-slate-900/5 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: Interaction Mode Segmented Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => {
              setInteractionMode('pet');
              setAvatarState('happy', '#F43F5E');
              setSpeech({
                id: 'pet_mode',
                text: 'Kraul-Modus aktiv: Bewege den Cursor über meinen Kopf, um Zuneigung zu steigern.',
                type: 'talk',
              });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              interactionMode === 'pet'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <HandWaving className="w-3.5 h-3.5" />
            <span>Kraulen</span>
          </button>

          <button
            onClick={() => {
              setInteractionMode('toss');
              setAvatarState('playful', '#2563EB');
              setSpeech({
                id: 'toss_mode',
                text: 'Greif- & Bewegungsmodus aktiv: Ziehe mich mit der Maus oder dem Finger über das Feld.',
                type: 'talk',
              });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              interactionMode === 'toss'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <ArrowsOutCardinal className="w-3.5 h-3.5" />
            <span>Bewegen</span>
          </button>

          <button
            onClick={onStartMiniGame}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
          >
            <GameController className="w-3.5 h-3.5" />
            <span>Minispiel</span>
          </button>
        </div>

        {/* Center: Scale Switcher */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {SCALE_OPTIONS.map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => handleScaleSelect(mode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                scaleMode === mode
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Right: Studio Room Theme Switcher */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {THEMES.map(({ theme, label, icon: Icon }) => (
            <button
              key={theme}
              onClick={() => {
                setRoomTheme(theme);
                setSpeech({
                  id: `theme_${theme}`,
                  text: `Raumatmosphäre ${label} geladen.`,
                  type: 'talk',
                });
              }}
              title={label}
              className={`p-2 rounded-xl text-xs transition-all ${
                roomTheme === theme
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Equipment / Item Bar in Light Glass */}
      <div className="p-2.5 px-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md shadow-slate-900/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Sparkle className="w-3.5 h-3.5 text-blue-600" />
          <span>Ausrüstung & Tools:</span>
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {ITEMS.map(({ item, label, icon: Icon }) => {
            const isEquipped = equippedItems.includes(item);
            return (
              <button
                key={item}
                onClick={() => handleItemToggle(item)}
                className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 border transition-all ${
                  isEquipped
                    ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isEquipped ? 'text-blue-600' : 'text-slate-500'}`}
                />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
