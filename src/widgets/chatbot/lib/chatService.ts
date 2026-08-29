/**
 * Chat Service
 * Handles AI chatbot interactions using Gemini and Perplexity
 */

import { callGemini } from '@/shared/lib/ai/geminiPool';
import { searchWeb } from '@/shared/lib/ai/perplexity';
import { AGENT_PROMPTS } from '@/shared/lib/ai/prompts';
import type { ChatMessage } from '@/features/analyzer/model/types';

// Keywords that trigger web search
const SEARCH_TRIGGERS = [
  'aktuell',
  'heute',
  'news',
  'neueste',
  'trend',
  'preis',
  'kosten',
  'markt',
  'statistik',
  'vergleich',
  'konkurrenz',
  'benchmark',
  'best practice',
];

// Keywords that trigger human support handoff
const HUMAN_SUPPORT_TRIGGERS = [
  'mensch',
  'mitarbeiter',
  'echter mensch',
  'support',
  'beschwerde',
  'reklamation',
  'anwalt',
  'rechtlich',
  'dringend',
  'notfall',
  'sehr wichtig',
  'manager',
  'geschäftsführer',
  'chef',
  'rückruf',
  'anrufen',
  'telefon',
  'persönlich sprechen',
];

/**
 * Check if message requires web search
 */
function needsWebSearch(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return SEARCH_TRIGGERS.some((trigger) => lowerMessage.includes(trigger));
}

/**
 * Check if message requires human support handoff
 */
export function needsHumanSupport(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return HUMAN_SUPPORT_TRIGGERS.some((trigger) => lowerMessage.includes(trigger));
}

/**
 * Get human support handoff response
 */
export function getHumanSupportResponse(): {
  message: string;
  action: 'email' | 'phone' | 'booking' | 'link';
  actionUrl: string;
} {
  return {
    message: `Selbstverstaendlich. Sie moechten mit Inhaber Umutcan Emre Tezgel sprechen.

Sie haben folgende Kontaktmoeglichkeiten:

E-Mail: umut@codayweb.de
Telefon: +49 176 41195301 (Mo-Fr 9-18 Uhr)
Termin buchen: Kostenlose 20-Minuten-Beratung

Wie moechten Sie Kontakt aufnehmen?`,
    action: 'link',
    actionUrl: '/booking',
  };
}

/**
 * Generate a chat response using Gemini with optional Perplexity search
 */
export async function generateChatResponse(
  messages: ChatMessage[],
  context?: { currentPage?: string; analysisResult?: unknown }
): Promise<{
  text: string;
  needsHuman?: boolean;
  humanAction?: ReturnType<typeof getHumanSupportResponse>;
}> {
  const lastMessage = messages[messages.length - 1]?.content ?? '';

  // Check for human support request
  if (needsHumanSupport(lastMessage)) {
    const humanResponse = getHumanSupportResponse();
    return {
      text: humanResponse.message,
      needsHuman: true,
      humanAction: humanResponse,
    };
  }

  // Check if we need web search for current information
  let webContext = '';
  if (needsWebSearch(lastMessage)) {
    try {
      // Log removed
      const searchResult = await searchWeb(lastMessage);
      if (searchResult?.content) {
        webContext = `\n\nAktuelle Web-Recherche zu "${lastMessage}":\n${searchResult.content}`;
      }
    } catch (error) {
      console.error('[Codi] Web search failed:', error);
    }
  }

  // Build conversation history
  const conversationHistory = messages
    .map((m) => `${m.role === 'user' ? 'Besucher' : 'Berater'}: ${m.content}`)
    .join('\n');

  // Build context info
  let contextInfo = '';
  if (context?.currentPage) {
    contextInfo += `\nAktuelle Seite: ${context.currentPage}`;
  }
  if (context?.analysisResult) {
    contextInfo += `\nWebsite-Analyse liegt vor.`;
  }

  const prompt = `${AGENT_PROMPTS.chatbot}

${contextInfo}${webContext}

Bisheriges Gespräch:
${conversationHistory}

Antworte jetzt als Berater auf die letzte Nachricht. Halte die Antwort kurz und hilfreich (max 2-3 Sätze). Falls Web-Recherche-Ergebnisse vorliegen, nutze diese für aktuelle Informationen.`;

  try {
    const response = await callGemini(prompt, {
      temperature: 0.7,
      maxTokens: 500,
    });

    return { text: response.trim() };
  } catch (error) {
    console.error('[ChatService] Error:', error);
    return {
      text: 'Entschuldigen Sie, es ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter umut@codayweb.de',
    };
  }
}

/**
 * Generate a Strobi greeting message
 */
export function getGreetingMessage(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Guten Morgen! Ich bin Strobi, Ihr KI-Avatar und digitaler Begleiter bei Coday. Wie kann ich Ihnen heute bei Ihrem Web-Projekt helfen?';
  } else if (hour < 18) {
    return 'Guten Tag! Ich bin Strobi, Ihr KI-Avatar bei Coday. Haben Sie Fragen zu Webentwicklung, Headless CMS oder SEO?';
  } else {
    return 'Guten Abend! Ich bin Strobi, Ihr digitaler Assistent bei Coday. Wie kann ich Sie bei Ihrer nächsten Website unterstützen?';
  }
}

export default {
  generateChatResponse,
  getGreetingMessage,
  needsHumanSupport,
  getHumanSupportResponse,
};
