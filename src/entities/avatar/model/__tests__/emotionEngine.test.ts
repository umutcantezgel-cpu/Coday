import { describe, it, expect } from 'vitest';
import { classifyUserIntent, analyzeEmotionContext } from '../emotionEngine';

describe('Strobi Emotion Engine', () => {
  describe('Intent Classification (classifyUserIntent)', () => {
    it('classifies booking and conversion intents', () => {
      expect(classifyUserIntent('Ich möchte einen Termin buchen')).toBe('booking_conversion');
      expect(classifyUserIntent('Können wir ein unverbindliches Erstgespräch vereinbaren?')).toBe(
        'booking_conversion'
      );
      expect(classifyUserIntent('Lass uns das Projekt starten')).toBe('booking_conversion');
    });

    it('classifies high-tech and Next.js deep dive inquiries', () => {
      expect(classifyUserIntent('Warum verwendet ihr Next.js 15 und Sanity CMS?')).toBe(
        'tech_deepdive'
      );
      expect(classifyUserIntent('Wie erreicht Coday 100/100 Core Web Vitals und PageSpeed?')).toBe(
        'tech_deepdive'
      );
      expect(classifyUserIntent('Nutzt ihr TypeScript strict und Edge Rendering?')).toBe(
        'tech_deepdive'
      );
    });

    it('classifies pricing and package inquiries', () => {
      expect(classifyUserIntent('Welche Pakete bietet ihr an?')).toBe('pricing_packages');
      expect(classifyUserIntent('Was kostet das Business Paket mit Festpreis?')).toBe(
        'pricing_packages'
      );
      expect(classifyUserIntent('Gibt es ein Angebot für Starter?')).toBe('pricing_packages');
    });

    it('classifies skepticism and WordPress comparisons', () => {
      expect(classifyUserIntent('Warum nicht einfach WordPress oder Wix nutzen?')).toBe(
        'skeptical_competitor'
      );
      expect(classifyUserIntent('Lohnt sich eine Headless Agentur wirklich?')).toBe(
        'skeptical_competitor'
      );
    });

    it('classifies greetings and compliments', () => {
      expect(classifyUserIntent('Hallo Strobi, guten Morgen!')).toBe('greeting');
      expect(classifyUserIntent('Vielen Dank, das war super hilfreich!')).toBe('compliment');
    });

    it('classifies confusion and error states', () => {
      expect(classifyUserIntent('Ich verstehe das nicht ganz, gibt es da ein Problem?')).toBe(
        'confusion_error'
      );
    });
  });

  describe('Emotion Context Resolution (analyzeEmotionContext)', () => {
    it('returns excited/celebrate state and emerald aura for booking conversions', () => {
      const result = analyzeEmotionContext('Ich möchte ein Projekt anfragen und buchen');
      expect(result.intent).toBe('booking_conversion');
      expect(result.initialState).toBe('excited');
      expect(result.responseState).toBe('celebrate');
      expect(result.auraColor).toBe('#10B981');
    });

    it('returns searching/proud state and electric blue aura for technical deep dives', () => {
      const result = analyzeEmotionContext('Wie funktioniert euer Next.js Edge Caching?');
      expect(result.intent).toBe('tech_deepdive');
      expect(result.initialState).toBe('searching');
      expect(result.responseState).toBe('proud');
      expect(result.auraColor).toBe('#3B82F6');
    });

    it('adapts response state when assistant response indicates celebration or apology', () => {
      const celebrateRes = analyzeEmotionContext('Hallo', 'Ihr Termin wurde erfolgreich gebucht!');
      expect(celebrateRes.responseState).toBe('celebrate');

      const apologyRes = analyzeEmotionContext('Test', 'Entschuldigung, es gab ein Problem.');
      expect(apologyRes.responseState).toBe('shy');
    });
  });
});
