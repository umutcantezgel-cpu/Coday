'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { StrobiMiiCanvas } from './StrobiMiiCanvas';
import { StrobiActionToolbar } from './StrobiActionToolbar';
import { useStrobiWorldStore } from '../model/strobiWorldStore';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  Sparkle,
  Heart,
  SpeakerHigh,
  SpeakerSlash,
  ArrowRight,
  GameController,
  HandWaving,
  ArrowsOutCardinal,
  Trophy,
} from '@phosphor-icons/react/dist/ssr';

export default function StrobiWorldClient() {
  const locale = useLocale();
  const isEn = locale === 'en';

  const { affection, loveLevel, gameHighScore, soundMuted, toggleSound, startMiniGame } =
    useStrobiWorldStore();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Navigation & Header HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <Breadcrumbs />
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2">
              Strobi <GradientText>Mii World</GradientText>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              {isEn
                ? 'The living, physical AI companion by Coday. Pet, toss, scale to Titan Boss mode, and play minigames in 60 FPS.'
                : 'Der lebendige, physikalische KI-Begleiter von Coday. Kraulen, werfen, bis zum Titan-Boss vergrößern und Minispiele in 60 FPS spielen.'}
            </p>
          </div>

          {/* Player Status HUD (Love Level, Highscore, Sound) */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
            {/* Love Level & Affection */}
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-300">Level {loveLevel}</span>
                  <span className="text-[10px] text-pink-400 font-semibold">{affection}%</span>
                </div>
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300"
                    style={{ width: `${affection}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Highscore */}
            {gameHighScore > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold text-amber-400">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{gameHighScore} Pkt</span>
              </div>
            )}

            {/* Sound Mute Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
              aria-label={soundMuted ? 'Ton einschalten' : 'Ton stummschalten'}
            >
              {soundMuted ? (
                <SpeakerSlash className="w-4 h-4" />
              ) : (
                <SpeakerHigh className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Central Strobi Mii 3D Canvas Stage */}
        <section aria-label="Strobi Mii Spielfeld">
          <StrobiMiiCanvas />
        </section>

        {/* Action Toolbar (Scale, Tools, Accessories, Themes) */}
        <section aria-label="Spielfeld Steuerung">
          <StrobiActionToolbar onStartMiniGame={startMiniGame} />
        </section>

        {/* 4 Feature Guide Cards */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-3">
              <HandWaving className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {isEn ? '1. Pet & Cuddle' : '1. Kraulen & Streicheln'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Gently rub Strobi’s head to trigger purring sounds, heart particle fountains, and level up affection.'
                : 'Bewege den Zeiger sanft über Strobis Kopf für Schnurrsounds, Herzpartikel und Level-Ups.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <ArrowsOutCardinal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {isEn ? '2. Toss & Throw' : '2. Werfen & Schleudern'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Grab Strobi with your mouse or finger and toss him with momentum, wall-bouncing, and squash physics.'
                : 'Packe Strobi und schleudere ihn mit Wurf-Trägheit und elastischer Wand-Abprall-Physik über das Feld.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Sparkle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {isEn ? '3. Scale to Titan Boss' : '3. Bis zum Titan-Boss vergrößern'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Scale Strobi seamlessly from Mini (140px) to Titan Boss (540px) with razor-sharp SVG vectors.'
                : 'Stufenlos vergrößern vom Taschen-Avatar (140px) bis zum gigantischen Titan-Boss (540px) bei 60 FPS.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <GameController className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {isEn ? '4. 100/100 CWV Arcade' : '4. 100/100 CWV Arcade-Game'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Catch falling Performance Orbs in 45s to boost your Core Web Vitals score and set highscores.'
                : 'Fange herabfallende Performance-Orbs in 45 Sekunden und knacke den Coday-Highscore.'}
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-950/60 to-slate-900 border border-blue-500/30 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkle className="w-3.5 h-3.5" />
              <span>
                {isEn ? 'AI-Engineered Performance' : 'High-End Webentwicklung Mittelhessen'}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              {isEn
                ? 'Ready to build high-converting web apps with Coday?'
                : 'Bereit für konversionsstarke Next.js Webanwendungen?'}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              {isEn
                ? 'Sub-0.3s load times, 100/100 Core Web Vitals, and tailored design for German mid-market businesses.'
                : 'Sub-0,3s Ladezeiten, 100/100 Core Web Vitals und maßgeschneiderte Enterprise-Lösungen aus Wetzlar.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              <span>{isEn ? 'Get in Touch' : 'Projekt anfragen'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <span>{isEn ? 'Pricing' : 'Pakete ansehen'}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
