'use client';

import React from 'react';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { useMiiAudio } from '../lib/useMiiAudio';
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
  MoonStars,
  Sun,
  Tree,
  Lightning,
  Sparkle,
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

  const { playPop, playBoing, playCelebrate } = useMiiAudio();

  const SCALE_OPTIONS: { mode: StrobiScaleMode; label: string; icon: string }[] = [
    { mode: 'mini', label: 'Mini', icon: '🐣' },
    { mode: 'companion', label: 'Medium', icon: '🤖' },
    { mode: 'giant', label: 'Giant', icon: '👑' },
    { mode: 'boss', label: 'Titan Boss', icon: '🪐' },
  ];

  const THEMES: { theme: StrobiRoomTheme; label: string; icon: React.ElementType }[] = [
    { theme: 'cyber-lab', label: 'Cyber Lab', icon: MoonStars },
    { theme: 'neon-grid', label: 'Neon Grid', icon: Lightning },
    { theme: 'sunset-lounge', label: 'Sunset Lounge', icon: Sun },
    { theme: 'nature-studio', label: 'Nature', icon: Tree },
  ];

  const ITEMS: { item: StrobiWorldItem; label: string; icon: React.ElementType }[] = [
    { item: 'coffee', label: 'Espresso', icon: Coffee },
    { item: 'laptop', label: 'Next.js 15', icon: Laptop },
    { item: 'star', label: '100/100 CWV', icon: Star },
    { item: 'glasses', label: 'Boss Brille', icon: Eyeglasses },
    { item: 'headphones', label: 'Headphones', icon: Headphones },
  ];

  const handleScaleSelect = (mode: StrobiScaleMode) => {
    playBoing();
    setScaleMode(mode);
    if (mode === 'boss') {
      setAvatarState('excited', '#F59E0B');
      setSpeech({
        id: 'boss_scale',
        text: 'TITAN BOSS MODE AKTIVIERT! Jetzt beherrsche ich den gesamten Bildschirm! 🪐💥',
        type: 'shout',
      });
    } else if (mode === 'giant') {
      setAvatarState('proud', '#3B82F6');
      setSpeech({
        id: 'giant_scale',
        text: 'Schau mal, wie groß und detailreich ich jetzt bin! Jedes Vektordetail bleibt gestochen scharf! 👑',
        type: 'talk',
      });
    } else if (mode === 'mini') {
      setAvatarState('playful');
      setSpeech({
        id: 'mini_scale',
        text: 'Piep! Als Taschen-Avatar passe ich überall hin! 🐣',
        type: 'talk',
      });
    }
  };

  const handleItemToggle = (item: StrobiWorldItem) => {
    playPop();
    toggleItem(item);
    if (item === 'star') {
      playCelebrate();
      setAvatarState('celebrate', '#10B981');
      setSpeech({
        id: 'star_equip',
        text: '100/100 Core Web Vitals Stern angelegt! Sub-0,3s Ladezeit garantiert! ⭐⚡',
        type: 'shout',
      });
    } else if (item === 'coffee') {
      setAvatarState('excited', '#F59E0B');
      setSpeech({
        id: 'coffee_equip',
        text: 'Frischer Espresso eingeschenkt! Meine Rechenleistung läuft auf 120 FPS! ☕🔥',
        type: 'talk',
      });
    } else if (item === 'laptop') {
      setAvatarState('working', '#3B82F6');
      setSpeech({
        id: 'laptop_equip',
        text: 'Next.js 15 & React 19 Engine hochgefahren. Code läuft fehlerfrei! 💻',
        type: 'talk',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto z-30 space-y-3">
      <div className="p-3 md:p-4 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: Interaction Tool Mode */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              playPop();
              setInteractionMode('pet');
              setAvatarState('happy', '#EC4899');
              setSpeech({
                id: 'pet_mode',
                text: 'Kraul-Modus aktiv! Bewege deinen Cursor über meinen Kopf, um Herzen zu sammeln! 💖',
                type: 'talk',
              });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              interactionMode === 'pet'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <HandWaving className="w-4 h-4" />
            <span>Kraulen</span>
          </button>

          <button
            onClick={() => {
              playPop();
              setInteractionMode('toss');
              setAvatarState('playful', '#3B82F6');
              setSpeech({
                id: 'toss_mode',
                text: 'Schleuder-Modus! Pack mich mit der Maus und wirf mich durch den Raum! 🚀',
                type: 'talk',
              });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              interactionMode === 'toss'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ArrowsOutCardinal className="w-4 h-4" />
            <span>Schleudern</span>
          </button>

          <button
            onClick={() => {
              playPop();
              onStartMiniGame();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <GameController className="w-4 h-4" />
            <span>Minispiel</span>
          </button>
        </div>

        {/* Center: Scale Modes (Größe anpassen) */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wider">
            Größe:
          </span>
          {SCALE_OPTIONS.map((opt) => (
            <button
              key={opt.mode}
              onClick={() => handleScaleSelect(opt.mode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                scaleMode === opt.mode
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>{opt.icon}</span>
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Room Themes & Items */}
        <div className="flex items-center gap-2">
          {/* Room Themes */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            {THEMES.map((th) => {
              const IconComp = th.icon;
              return (
                <button
                  key={th.theme}
                  onClick={() => {
                    playPop();
                    setRoomTheme(th.theme);
                  }}
                  title={th.label}
                  className={`p-1.5 rounded-xl transition-all ${
                    roomTheme === th.theme
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Items Drawer */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            {ITEMS.map((it) => {
              const IconComp = it.icon;
              const isEquipped = equippedItems.includes(it.item);
              return (
                <button
                  key={it.item}
                  onClick={() => handleItemToggle(it.item)}
                  title={it.label}
                  className={`p-1.5 rounded-xl transition-all ${
                    isEquipped
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
