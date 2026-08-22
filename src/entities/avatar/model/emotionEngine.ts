/**
 * Strobi Context-Aware Emotion Intelligence Engine
 * Classifies user intents, sentiments, and conversational context
 * to map messages to organic Strobi animation states and visual reactions.
 */

import type { StrobiAnimationState } from './types';

export type EmotionIntent =
  | 'greeting'
  | 'tech_deepdive'
  | 'pricing_packages'
  | 'booking_conversion'
  | 'skeptical_competitor'
  | 'confusion_error'
  | 'compliment'
  | 'general_inquiry';

export interface EmotionAnalysisResult {
  intent: EmotionIntent;
  initialState: StrobiAnimationState;
  responseState: StrobiAnimationState;
  auraColor: string | null;
  pacingDelayMs: number;
}

/**
 * Classify incoming user text into semantic intent & emotion path
 */
export function classifyUserIntent(text: string): EmotionIntent {
  const lower = (text || '').toLowerCase().trim();

  // 1. Booking / Conversion / Project start
  if (
    lower.includes('termin') ||
    lower.includes('buchen') ||
    lower.includes('booking') ||
    lower.includes('kontakt') ||
    lower.includes('anfrage') ||
    lower.includes('loslegen') ||
    lower.includes('projekt starten') ||
    lower.includes('erstberatung') ||
    lower.includes('erstgespräch') ||
    lower.includes('beratung') ||
    lower.includes('vereinbaren') ||
    lower.includes('kennenlernen') ||
    lower.includes('zusammenarbeiten')
  ) {
    return 'booking_conversion';
  }

  // 2. Skepticism, Competitors & Legacy Builders (WordPress, Wix, lohnt sich)
  if (
    lower.includes('wordpress') ||
    lower.includes('wix') ||
    lower.includes('jimdo') ||
    lower.includes('baukasten') ||
    lower.includes('teuer') ||
    lower.includes('warum coday') ||
    lower.includes('lohnt sich') ||
    lower.includes('konkurrenz') ||
    lower.includes('vorteil')
  ) {
    return 'skeptical_competitor';
  }

  // 3. High-Tech & Architecture deep dives
  if (
    lower.includes('next.js') ||
    lower.includes('react') ||
    lower.includes('sanity') ||
    lower.includes('headless') ||
    lower.includes('typescript') ||
    lower.includes('pagespeed') ||
    lower.includes('core web vitals') ||
    lower.includes('seo') ||
    lower.includes('architektur') ||
    lower.includes('edge') ||
    lower.includes('supabase') ||
    lower.includes('tailwind')
  ) {
    return 'tech_deepdive';
  }

  // 4. Pricing / Packages / Festpreis
  if (
    lower.includes('preis') ||
    lower.includes('paket') ||
    lower.includes('kosten') ||
    lower.includes('festpreis') ||
    lower.includes('starter') ||
    lower.includes('business') ||
    lower.includes('corporate') ||
    lower.includes('enterprise') ||
    lower.includes('angebot') ||
    lower.includes('budget')
  ) {
    return 'pricing_packages';
  }

  // 5. Compliments & Positive feedback
  if (
    lower.includes('danke') ||
    lower.includes('super') ||
    lower.includes('toll') ||
    lower.includes('genial') ||
    lower.includes('stark') ||
    lower.includes('beeindruckend') ||
    lower.includes('cool') ||
    lower.includes('klasse') ||
    lower.includes('thanks') ||
    lower.includes('awesome')
  ) {
    return 'compliment';
  }

  // 6. Greetings & Social
  if (
    lower.includes('hallo') ||
    lower.includes('hi') ||
    lower.includes('hey') ||
    lower.includes('moin') ||
    lower.includes('guten tag') ||
    lower.includes('guten morgen') ||
    lower.includes('guten abend') ||
    lower.includes('wer bist du') ||
    lower.includes('hello')
  ) {
    return 'greeting';
  }

  // 7. Confusion, Errors or Help
  if (
    lower.includes('verstehe nicht') ||
    lower.includes('fehler') ||
    lower.includes('problem') ||
    lower.includes('nicht gefunden') ||
    lower.includes('hilfe') ||
    lower.includes('kaputt')
  ) {
    return 'confusion_error';
  }

  return 'general_inquiry';
}

/**
 * Resolve full contextual emotional response
 */
export function analyzeEmotionContext(
  userText: string,
  assistantResponse?: string
): EmotionAnalysisResult {
  const intent = classifyUserIntent(userText);
  const responseLower = (assistantResponse || '').toLowerCase();

  let initialState: StrobiAnimationState = 'thinking';
  let responseState: StrobiAnimationState = 'happy';
  let auraColor: string | null = null;
  let pacingDelayMs = 850;

  switch (intent) {
    case 'booking_conversion':
      initialState = 'excited';
      responseState = 'celebrate';
      auraColor = '#10B981'; // Emerald glow
      pacingDelayMs = 700;
      break;

    case 'tech_deepdive':
      initialState = 'searching';
      responseState = 'proud';
      auraColor = '#3B82F6'; // Electric Blue glow
      pacingDelayMs = 900;
      break;

    case 'pricing_packages':
      initialState = 'thinking';
      responseState = 'proud';
      auraColor = '#F59E0B'; // Amber glow
      pacingDelayMs = 800;
      break;

    case 'skeptical_competitor':
      initialState = 'suspicious';
      responseState = 'proud';
      auraColor = '#8B5CF6'; // Purple glow
      pacingDelayMs = 1100;
      break;

    case 'compliment':
      initialState = 'happy';
      responseState = 'laughing';
      auraColor = '#EC4899'; // Pink glow
      pacingDelayMs = 600;
      break;

    case 'greeting':
      initialState = 'waking';
      responseState = 'happy';
      auraColor = '#60A5FA';
      pacingDelayMs = 500;
      break;

    case 'confusion_error':
      initialState = 'confused';
      responseState = 'curious';
      auraColor = null;
      pacingDelayMs = 1000;
      break;

    case 'general_inquiry':
    default:
      initialState = 'thinking';
      responseState = 'happy';
      auraColor = null;
      pacingDelayMs = 850;
      break;
  }

  // Override if assistant response indicates specific celebration or apology
  if (responseLower.includes('gebucht') || responseLower.includes('glückwunsch')) {
    responseState = 'celebrate';
    auraColor = '#10B981';
  } else if (responseLower.includes('entschuldigung') || responseLower.includes('problem')) {
    responseState = 'shy';
    auraColor = null;
  }

  return {
    intent,
    initialState,
    responseState,
    auraColor,
    pacingDelayMs,
  };
}
