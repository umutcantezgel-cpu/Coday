// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { z } from 'https://esm.sh/zod@3.22.4';
import { getRandomGeminiKey } from './config.ts';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Basic Tech Stack Detection
function detectTechStack(html: string): string[] {
  const stack: string[] = [];

  if (html.includes('next')) stack.push('Next.js');
  if (html.includes('react')) stack.push('React');
  if (html.includes('vue')) stack.push('Vue.js');
  if (html.includes('tailwind')) stack.push('Tailwind CSS');
  if (html.includes('bootstrap')) stack.push('Bootstrap');
  if (html.includes('wordpress') || html.includes('wp-content')) stack.push('WordPress');
  if (html.includes('shopify')) stack.push('Shopify');
  if (html.includes('wix')) stack.push('Wix');
  if (html.includes('squarespace')) stack.push('Squarespace');
  if (html.includes('webflow')) stack.push('Webflow');
  if (html.includes('elementor')) stack.push('Elementor');
  if (html.includes('analytics.js') || html.includes('gtag')) stack.push('Google Analytics');
  if (html.includes('framer')) stack.push('Framer');

  return [...new Set(stack)];
}

function extractJson(text: string): string {
  try {
    // Remove markdown code blocks if present
    let clean = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // Find the first outer brace or bracket
    const firstBrace = clean.indexOf('{');
    const firstBracket = clean.indexOf('[');

    let start = -1;
    let end = -1;

    // Determine if we are looking for an object or array
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      start = firstBrace;
      end = clean.lastIndexOf('}');
    } else if (firstBracket !== -1) {
      start = firstBracket;
      end = clean.lastIndexOf(']');
    }

    if (start !== -1 && end !== -1 && end > start) {
      return clean.substring(start, end + 1);
    }

    return clean;
  } catch (e) {
    return text;
  }
}

// Agent prompts for website analysis
// ADAPTED FOR SPA/METADATA FALLBACK
const AGENT_PROMPTS: Record<string, string> = {
  performance: `Du bist ein Senior Performance Engineer (ex-Google). Analysiere knallhart auf Ladezeit-Killer.
Falls Content leer (SPA), analysiere Script-Tags (Defer/Async?) und Meta-Preloads.
Schau nach: Bilder ohne Dimensionen, fehlendes WebP, Render-Blocking CSS/JS, zu viele Fonts.
Gib KONKRETE Dateinamen oder Pfade an, wenn möglich.
ANTWORTE NUR MIT JSON!`,

  seo: `Du bist ein Head of SEO. Analysiere auf Ranking-Faktoren für 2026.
Prüfe: Title (Länge/Keywords), Meta-Description (CTR-Optimierung), H-Struktur (Logik), Canonical-Tags.
Falls SPA: Prüfe ob 'prerender' Hinweise oder SSR-Meta-Tags existieren.
ANTWORTE NUR MIT JSON!`,

  security: `Du bist ein Cyber-Security Analyst. Suche nach Schwachstellen.
Prüfe: HSTS, fehlende CSP, X-Frame-Options, offene Mailtos, ungesicherte Formulare.
Bewerte streng: Fehlendes HTTPS ist sofortiger Fail (Score 0).
ANTWORTE NUR MIT JSON!`,

  accessibility: `Du bist ein WCAG 2.2 Auditor. Prüfe auf Exklusion.
Falls SPA: Prüfe ARIA-Labels in den wenigen sichtbaren Elementen.
Suche nach: Fehlenden Alt-Texten, schlechtem Kontrast (vermute anhand von Klassen), unklaren Link-Texten ("hier klicken").
ANTWORTE NUR MIT JSON!`,

  ux: `Du bist ein Award-Winning UI/UX Designer. Bewerte die User Journey (soweit sichtbar).
SPA-Check: Wirken die Lade-Indikatoren (Skeleton/Spinner) modern? 
Prüfe: Mobile Viewport Tag (WICHTIG), Lesbarkeit (Font-Größen), Touch-Targets (Padding).
ANTWORTE NUR MIT JSON!`,

  content: `Du bist ein Conversion-Copywriter. Analysiere die Überzeugungskraft.
Falls SPA: Analysiere den Title und Description als "Erster Eindruck".
Suche nach: "WIR"-Sprache (schlecht) vs. "SIE"-Sprache (gut), klaren Call-to-Actions, Social Proof Elementen.
ANTWORTE NUR MIT JSON!`,
};

interface AgentResult {
  score: number;
  summary: string;
  issues: Array<{ severity: string; title: string; description: string }>;
}

async function fetchWebsiteContent(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function simplifyHtml(html: string): string {
  // Keep Meta tags and Title
  const titleMatch = html.match(/<title>.*?<\/title>/i);
  const metaMatches = html.match(/<meta.*?>/gi) || [];
  const h1Matches = html.match(/<h1.*?>.*?<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2.*?>.*?<\/h2>/gi) || [];
  const jsonLdMatches =
    html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];

  // Resource hints
  const linkRels = html.match(/<link.*?>/gi) || [];
  const scriptSrcs = html.match(/<script.*?src=".*?".*?>/gi) || [];

  // Extract body content but remove generic scripts/styles block content
  const bodyContent = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<[^>]+) style=".*?"/gi, '$1') // remove inline styles
    .replace(/\s+/g, ' ')
    .trim();

  // Grab a slice of the body to check if it's "real" content
  const bodySlice = bodyContent.match(/<body[\s\S]*?<\/body>/i)?.[0] || '';

  // Reconstruct a "Analysis View" info block
  // This gives the LLM exactly what it needs without the noise
  return `
    PAGE METADATA:
    ${titleMatch ? titleMatch[0] : 'No Title'}
    ${metaMatches.join('\n')}
    
    STRUCTURED DATA (JSON-LD):
    ${jsonLdMatches.join('\n')}

    HEADINGS:
    ${h1Matches.join('\n')}
    ${h2Matches.slice(0, 5).join('\n')}
    
    RESOURCE HINTS:
    ${linkRels.slice(0, 10).join('\n')}
    ${scriptSrcs.slice(0, 5).join('\n')}

    VISIBLE BODY CONTENT (Simplified - Max 5k chars):
    ${bodySlice.slice(0, 5000)}
    `;
}

async function callGemini(prompt: string, agentId: string): Promise<string> {
  // USE KEY POOL INSTEAD OF SINGLE ENV
  const apiKey = getRandomGeminiKey();
  if (!apiKey) {
    throw new Error('No API Key available in pool');
  }

  // console.log(`[${agentId}] Calling Gemini with key ending in ...${apiKey.slice(-4)}`)

  // Attempt with 3 retries (Exponential Backoff)
  let lastError;
  for (let i = 0; i < 3; i++) {
    try {
      // Using gemini-2.0-flash for FASTER and BETTER audit capabilities
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2048,
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'OBJECT',
                properties: {
                  score: { type: 'NUMBER' },
                  summary: { type: 'STRING' },
                  issues: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        severity: { type: 'STRING', enum: ['high', 'medium', 'low'] },
                        title: { type: 'STRING' },
                        description: { type: 'STRING' },
                        fix: { type: 'STRING' },
                      },
                    },
                  },
                },
              },
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
            ],
          }),
        }
      );

      const data = (await response.json()) as {
        error?: { message?: string };
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
          finishReason?: string;
        }>;
      };

      if (data.error) {
        console.error(`[${agentId}] Gemini API error (attempt ${i + 1}):`, data.error);
        const isQuotaError =
          data.error.message?.includes('429') || data.error.message?.includes('Quota');

        if (isQuotaError) {
          // Wait longer for quota errors
          await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, i)));
        }

        throw new Error(data.error.message || 'Gemini API error');
      }

      const candidate = data.candidates?.[0];
      if (candidate?.finishReason === 'SAFETY') {
        console.warn(`[${agentId}] Blocked by safety settings`);
        return '';
      }

      const text = candidate?.content?.parts?.[0]?.text || '';
      return text;
    } catch (e) {
      lastError = e;
      // Exponential Backoff: 1s, 2s, 4s
      const backoffTime = 1000 * Math.pow(2, i);
      console.log(`[${agentId}] Retry ${i + 1}/3 in ${backoffTime}ms...`);
      await new Promise((r) => setTimeout(r, backoffTime));
    }
  }

  throw lastError;
}

async function runAgent(
  agentId: string,
  prompt: string,
  url: string,
  html: string
): Promise<AgentResult> {
  try {
    const simplifiedHtml = simplifyHtml(html);

    const fullPrompt = `${prompt}

Website URL: ${url}

HINWEIS: Dies könnte eine Single-Page-App (SPA) sein. Wenn der Body-Inhalt leer erscheint, analysiere die METADATA und Ressourcen.
Falls keine sinnvolle Analyse möglich ist, gib einen Score von 50 und erkläre im Summary "Eingeschränkte Analyse da Inhalte per JavaScript geladen werden (SPA).".

HTML-Auszug:
${simplifiedHtml}

ANTWORTE NUR MIT DIESEM STRICTEN JSON FORMAT:
{
  "score": NUMBER,
  "summary": "STRING",
  "issues": [{"severity": "high|medium|low", "title": "STRING", "description": "STRING", "fix": "Kurze Lösung (max 10 Worte)"}]
}`;

    // Validating with Zod for Type Safety
    const AgentResultSchema = z.object({
      score: z.number().min(0).max(100).default(50),
      summary: z.string().default('Keine Zusammenfassung verfügbar.'),
      issues: z
        .array(
          z.object({
            severity: z.enum(['high', 'medium', 'low']).catch('medium'),
            title: z.string(),
            description: z.string(),
            fix: z.string().optional().default('Spezialisten konsultieren'),
          })
        )
        .default([]),
    });

    const text = await callGemini(fullPrompt, agentId);

    if (!text) {
      console.warn(`[${agentId}] Empty response from Gemini.`);
      // DO NOT return a default 50 if we can help it.
      // But if the model is silent, we must return valid schema.
      return {
        score: 0,
        summary: 'Der KI-Agent konnte keine Antwort generieren.',
        issues: [
          {
            severity: 'high',
            title: 'Analyse fehlgeschlagen',
            description: 'Keine Daten empfangen.',
          },
        ],
      };
    }

    // Clean cleanup of potential markdown
    const cleanedText = extractJson(text);

    try {
      const parsedRaw = JSON.parse(cleanedText);
      const result = AgentResultSchema.safeParse(parsedRaw);

      if (!result.success) {
        console.error(`[${agentId}] Zod Validation Failed:`, result.error);
        return {
          score: 0,
          summary: 'Antwort-Format ungültig.',
          issues: [
            {
              severity: 'high',
              title: 'Format-Fehler',
              description: 'Die KI hat kein valides JSON geliefert.',
            },
          ],
        };
      }

      return result.data;
    } catch (e) {
      console.error(`[${agentId}] JSON parsing failed`, text.slice(0, 100));
      return {
        score: 0,
        summary: 'JSON-Parsing fehlgeschlagen.',
        issues: [
          {
            severity: 'high',
            title: 'Parsing-Fehler',
            description: 'Antwort konnte nicht verarbeitet werden.',
          },
        ],
      };
    }
  } catch (error) {
    console.error(`[${agentId}] Agent critical error:`, error);
    // Return null score to indicate FAILURE, not "Average"
    return {
      score: -1,
      summary: 'Agent Error',
      issues: [],
      error: error instanceof Error ? error.message : 'Unknown Error',
    } as any;
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as {
      url?: string;
      action?: 'scan' | 'analyze' | 'plan' | 'ping' | 'full';
      agent?: string;
      html?: string;
      issues?: any[];
    };
    const { url, action = 'full', agent, html } = payload;

    // 0. ACTION: PING (Diagnostics)
    if (action === 'ping') {
      return new Response(
        JSON.stringify({ status: 'ok', message: 'Pong', timestamp: new Date().toISOString() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. ACTION: SCAN (Step 1)
    // Fetches the URL and returns the Simplified HTML for the frontend to hold
    if (action === 'scan') {
      if (!url) throw new Error('URL erforderlich');

      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith('http')) normalizedUrl = `https://${normalizedUrl}`;

      console.log(`[Analyzer] Scanning: ${normalizedUrl}`);

      let rawHtml: string;
      try {
        rawHtml = await fetchWebsiteContent(normalizedUrl);
      } catch (fetchError) {
        console.error(`[Analyzer] Fetch error:`, fetchError);
        return new Response(
          JSON.stringify({
            error: `Website nicht erreichbar: ${fetchError instanceof Error ? fetchError.message : 'Timeout'}`,
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const simplified = simplifyHtml(rawHtml);
      const stack = detectTechStack(rawHtml);

      return new Response(
        JSON.stringify({
          success: true,
          html: simplified,
          url: normalizedUrl,
          stack,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. ACTION: ANALYZE (Step 2)
    // Takes HTML + Agent ID and returns the specific analysis
    if (action === 'analyze') {
      if (!html || !agent) throw new Error('HTML und Agent ID erforderlich');

      console.log(`[Analyzer] Analyze Request: ${agent}`);
      const prompt = AGENT_PROMPTS[agent];
      if (!prompt) throw new Error('Unknown Agent ID');

      // Run the single agent
      const result = await runAgent(agent, prompt, url || 'Provided HTML', html);

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. ACTION: PLAN (Step 3)
    // Generates a prioritized Step-by-Step plan based on issues
    if (action === 'plan') {
      const issues = payload.issues || [];
      if (!issues.length) throw new Error('Keine Issues für Plan-Erstellung übergeben');

      console.log(`[Analyzer] Generating Plan for ${issues.length} issues`);

      // Filter top issues to avoid token limits
      const criticalIssues = issues
        .filter((i: any) => i.severity === 'kritisch' || i.severity === 'hoch')
        .slice(0, 15)
        .map((i: any) => `- [${i.severity}] ${i.title}: ${i.description}`)
        .join('\n');

      const prompt = `
            Du bist ein Projektmanager für Web-Entwicklung. Erstelle einen konkreten Maßnahmenplan basierend auf diesen Problemen:
            
            ${criticalIssues}
            
            Erstelle 3-5 konkrete Schritte.
            ANTWORTE NUR MIT DIESEM STRICTEN JSON FORMAT:
            [
              {
                "step": 1,
                "title": "Kurzer Titel",
                "description": "Genaue Anweisung was zu tun ist.",
                "impact": "hoch|mittel|niedrig",
                "effort": "hoch|mittel|niedrig",
                "role": "dev|marketing|seo|design"
              }
            ]`;

      const text = await callGemini(prompt, 'planner');

      // Parse JSON with basic cleanup
      const cleanedText = extractJson(text);
      const plan = JSON.parse(cleanedText);

      return new Response(JSON.stringify(plan), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // FALLBACK: Legacy Mode (Keep for compatibility if needed, or remove)
    // For now, we return error to force frontend update
    return new Response(
      JSON.stringify({ error: 'Legacy mode deprecated. Use action="scan" then "analyze".' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Analyzer] Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Server Error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
