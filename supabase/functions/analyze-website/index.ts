/**
 * Website Analyzer Edge Function — v2.0
 * Complete rewrite for reliable, validated audit results.
 *
 * Flow: scan (fetch + extract + headers) → analyze (per-agent) → plan
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { z } from 'https://esm.sh/zod@3.22.4';
import { getRandomGeminiKey } from './config.ts';

// ─── CORS ───────────────────────────────────────────────
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── TECH STACK DETECTION ───────────────────────────────
function detectTechStack(html: string): string[] {
  const stack: string[] = [];
  const lower = html.toLowerCase();
  if (lower.includes('next') && lower.includes('_next')) stack.push('Next.js');
  else if (lower.includes('react') || lower.includes('__react')) stack.push('React');
  if (lower.includes('vue') || lower.includes('__vue')) stack.push('Vue.js');
  if (lower.includes('angular') || lower.includes('ng-')) stack.push('Angular');
  if (lower.includes('tailwind')) stack.push('Tailwind CSS');
  if (lower.includes('bootstrap')) stack.push('Bootstrap');
  if (lower.includes('wordpress') || lower.includes('wp-content')) stack.push('WordPress');
  if (lower.includes('shopify')) stack.push('Shopify');
  if (lower.includes('wix.com') || lower.includes('wix-')) stack.push('Wix');
  if (lower.includes('squarespace')) stack.push('Squarespace');
  if (lower.includes('webflow')) stack.push('Webflow');
  if (lower.includes('elementor')) stack.push('Elementor');
  if (lower.includes('gtag') || lower.includes('google-analytics')) stack.push('Google Analytics');
  if (lower.includes('framer')) stack.push('Framer');
  if (lower.includes('gatsby')) stack.push('Gatsby');
  if (lower.includes('nuxt')) stack.push('Nuxt');
  if (lower.includes('svelte')) stack.push('Svelte');
  if (lower.includes('jquery') || lower.includes('jquery.min')) stack.push('jQuery');
  return [...new Set(stack)];
}

// ─── HTML CONTENT EXTRACTION ────────────────────────────
// This is the critical function: extract maximum signal from raw HTML
function extractContent(html: string): string {
  // Helper: extract all matches of a regex
  const allMatches = (regex: RegExp): string[] => {
    const results: string[] = [];
    let m;
    while ((m = regex.exec(html)) !== null) results.push(m[0]);
    return results;
  };

  // Title
  const title =
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || 'Kein Titel gefunden';

  // All meta tags (name, property, http-equiv)
  const metaTags = allMatches(/<meta[^>]+>/gi).slice(0, 30);

  // Canonical
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || '';

  // All headings h1-h6 with content
  const headings: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const regex = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\/h${i}>`, 'gi');
    let m;
    while ((m = regex.exec(html)) !== null) {
      const text = m[1]
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (text) headings.push(`H${i}: ${text}`);
    }
  }

  // All images with src and alt
  const images: string[] = [];
  const imgRegex = /<img[^>]+>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const src = imgMatch[0].match(/src=["']([^"']+)["']/)?.[1] || '';
    const alt = imgMatch[0].match(/alt=["']([^"']*?)["']/)?.[1] || '';
    const hasAlt = /alt=["']/.test(imgMatch[0]);
    images.push(`IMG: src="${src.slice(0, 80)}" alt="${alt}" hasAlt=${hasAlt}`);
  }

  // All links with text and href
  const links: string[] = [];
  const linkRegex = /<a[^>]+href=["']([^"']*?)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const href = linkMatch[1];
    const text = linkMatch[2]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (text && href) links.push(`LINK: "${text}" → ${href.slice(0, 80)}`);
  }

  // Forms
  const forms = allMatches(/<form[^>]*>[\s\S]*?<\/form>/gi).map((f) => {
    const action = f.match(/action=["']([^"']*?)["']/)?.[1] || 'no-action';
    const method = f.match(/method=["']([^"']*?)["']/i)?.[1] || 'GET';
    const inputs = (f.match(/<input[^>]+>/gi) || []).map((inp) => {
      const type = inp.match(/type=["']([^"']*?)["']/)?.[1] || 'text';
      const name = inp.match(/name=["']([^"']*?)["']/)?.[1] || '';
      const hasLabel = inp.match(/aria-label|id=["']([^"']*?)["']/)?.[1] || '';
      return `  INPUT: type=${type} name=${name} label=${hasLabel}`;
    });
    return `FORM: action=${action} method=${method}\n${inputs.join('\n')}`;
  });

  // Navigation structure
  const navContent = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi) || [];
  const navLinks = navContent
    .map((nav) => {
      const navLinksInner = nav.match(/<a[^>]+href=["']([^"']*?)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
      return navLinksInner
        .map((a) => {
          const text = a.replace(/<[^>]+>/g, '').trim();
          return text;
        })
        .filter(Boolean);
    })
    .flat();

  // JSON-LD structured data
  const jsonLd = allMatches(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
  );

  // Resource hints (preload, prefetch, preconnect)
  const resourceHints = allMatches(
    /<link[^>]+rel=["'](preload|prefetch|preconnect|dns-prefetch)["'][^>]*>/gi
  ).slice(0, 10);

  // Script tags (checking async/defer)
  const scripts = allMatches(/<script[^>]+src=["'][^"']+["'][^>]*>/gi)
    .slice(0, 15)
    .map((s) => {
      const src = s.match(/src=["']([^"']+)["']/)?.[1] || '';
      const hasAsync = /async/i.test(s);
      const hasDefer = /defer/i.test(s);
      return `SCRIPT: ${src.slice(0, 60)} async=${hasAsync} defer=${hasDefer}`;
    });

  // CSS links
  const stylesheets = allMatches(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)
    .slice(0, 10)
    .map((s) => {
      const href = s.match(/href=["']([^"']+)["']/)?.[1] || '';
      return `CSS: ${href.slice(0, 80)}`;
    });

  // Noscript fallback (important for SPAs!)
  const noscript = html.match(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi) || [];

  // Visible body text (strip tags, take first 4000 chars)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';
  const visibleText = bodyMatch
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 4000);

  // ARIA landmarks
  const ariaElements = allMatches(/aria-label=["'][^"']*["']/gi).slice(0, 15);
  const roleElements = allMatches(/role=["'][^"']*["']/gi).slice(0, 15);

  // Viewport meta
  const viewport =
    html.match(/<meta[^>]+name=["']viewport["'][^>]*>/i)?.[0] || 'KEIN VIEWPORT META TAG';

  // Reconstruct analysis document
  return [
    `=== TITEL ===`,
    title,
    ``,
    `=== META TAGS (${metaTags.length}) ===`,
    ...metaTags,
    canonical ? `CANONICAL: ${canonical}` : '',
    ``,
    `=== VIEWPORT ===`,
    viewport,
    ``,
    `=== ÜBERSCHRIFTEN (${headings.length}) ===`,
    ...headings.slice(0, 20),
    ``,
    `=== BILDER (${images.length}) ===`,
    ...images.slice(0, 20),
    ``,
    `=== LINKS (${links.length} total, erste 25) ===`,
    ...links.slice(0, 25),
    ``,
    `=== NAVIGATION ===`,
    navLinks.length > 0 ? navLinks.join(' | ') : 'Keine <nav> Elemente gefunden',
    ``,
    `=== FORMULARE (${forms.length}) ===`,
    ...forms.slice(0, 5),
    ``,
    `=== STRUCTURED DATA (JSON-LD: ${jsonLd.length}) ===`,
    ...jsonLd.slice(0, 3),
    ``,
    `=== SCRIPTS (${scripts.length}) ===`,
    ...scripts,
    ``,
    `=== STYLESHEETS (${stylesheets.length}) ===`,
    ...stylesheets,
    ``,
    `=== RESOURCE HINTS ===`,
    ...resourceHints,
    ``,
    `=== ARIA/ACCESSIBILITY ===`,
    `aria-label Attribute: ${ariaElements.length}`,
    ...ariaElements.slice(0, 10),
    `role Attribute: ${roleElements.length}`,
    ...roleElements.slice(0, 10),
    ``,
    `=== NOSCRIPT FALLBACK ===`,
    ...noscript
      .map((n) =>
        n
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
      )
      .slice(0, 3),
    ``,
    `=== SICHTBARER TEXT (erste 4000 Zeichen) ===`,
    visibleText || '(Kein sichtbarer Text — wahrscheinlich eine SPA die per JavaScript rendert)',
  ]
    .filter(Boolean)
    .join('\n');
}

// ─── FETCH WEBSITE WITH HEADERS ─────────────────────────
interface FetchResult {
  html: string;
  headers: Record<string, string>;
  statusCode: number;
  redirectUrl?: string;
}

async function fetchWebsite(url: string): Promise<FetchResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    // Capture security-relevant headers
    const capturedHeaders: Record<string, string> = {};
    const importantHeaders = [
      'content-security-policy',
      'strict-transport-security',
      'x-frame-options',
      'x-content-type-options',
      'x-xss-protection',
      'referrer-policy',
      'permissions-policy',
      'feature-policy',
      'access-control-allow-origin',
      'server',
      'x-powered-by',
      'content-type',
      'cache-control',
      'set-cookie',
    ];

    for (const header of importantHeaders) {
      const value = response.headers.get(header);
      if (value) capturedHeaders[header] = value;
    }

    const html = await response.text();

    return {
      html,
      headers: capturedHeaders,
      statusCode: response.status,
      redirectUrl: response.url !== url ? response.url : undefined,
    };
  } finally {
    clearTimeout(timeout);
  }
}

// ─── ZOD SCHEMAS PER AGENT ──────────────────────────────
const IssueSeverity = z.enum(['kritisch', 'hoch', 'mittel', 'niedrig']).catch('mittel');
const Quality = z.string().catch('mittel');
const Status = z.string().catch('mittel');

const IssueSchema = z.object({
  severity: IssueSeverity,
  title: z.string().default('Unbekanntes Problem'),
  description: z.string().default('Keine Details verfügbar.'),
  fix: z.string().default('Spezialisten konsultieren'),
});

const PerformanceSchema = z.object({
  score: z.coerce.number().default(0),
  metrics: z
    .object({
      lcp: z.object({ value: z.string().default('N/A'), status: Status }).default({}),
      fid: z.object({ value: z.string().default('N/A'), status: Status }).default({}),
      cls: z.object({ value: z.string().default('N/A'), status: Status }).default({}),
      ttfb: z.object({ value: z.string().default('N/A'), status: Status }).default({}),
    })
    .default({}),
  issues: z.array(IssueSchema).default([]),
  summary: z.string().default('Keine Zusammenfassung.'),
});

const SeoSchema = z
  .object({
    score: z.coerce.number().default(0),
    checks: z
      .object({
        metaTitle: z
          .object({
            found: z.boolean().catch(false),
            value: z.string().default(''),
            quality: Quality,
          })
          .default({}),
        metaDescription: z
          .object({
            found: z.boolean().catch(false),
            value: z.string().default(''),
            quality: Quality,
          })
          .default({}),
        h1: z
          .object({
            count: z.coerce.number().default(0),
            values: z.array(z.string()).default([]),
            quality: Quality,
          })
          .default({}),
        images: z
          .object({
            total: z.coerce.number().default(0),
            withAlt: z.coerce.number().default(0),
            percentage: z.coerce.number().default(0),
          })
          .default({}),
        internalLinks: z.coerce.number().default(0),
        schemaMarkup: z.boolean().catch(false),
      })
      .default({}),
    issues: z.array(IssueSchema).default([]),
    summary: z.string().default('Keine Zusammenfassung.'),
  })
  .passthrough();

const SecuritySchema = z
  .object({
    score: z.coerce.number().default(0),
    checks: z
      .object({
        https: z
          .object({ enabled: z.boolean().catch(false), valid: z.boolean().catch(false) })
          .default({}),
        headers: z
          .object({
            csp: z.boolean().catch(false),
            xFrameOptions: z.boolean().catch(false),
            hsts: z.boolean().catch(false),
            xContentType: z.boolean().catch(false),
          })
          .default({}),
        cookies: z
          .object({ secure: z.boolean().catch(false), httpOnly: z.boolean().catch(false) })
          .default({}),
      })
      .default({}),
    issues: z.array(IssueSchema).default([]),
    summary: z.string().default('Keine Zusammenfassung.'),
  })
  .passthrough();

const AccessibilitySchema = z
  .object({
    score: z.coerce.number().default(0),
    wcagLevel: z.string().catch('nicht erfüllt'),
    checks: z
      .object({
        colorContrast: z
          .object({ passed: z.coerce.number().default(0), failed: z.coerce.number().default(0) })
          .default({}),
        keyboardNav: z.boolean().catch(false),
        ariaLabels: z.object({ used: z.boolean().catch(false), quality: Quality }).default({}),
        formLabels: z
          .object({ total: z.coerce.number().default(0), labeled: z.coerce.number().default(0) })
          .default({}),
      })
      .default({}),
    issues: z.array(IssueSchema).default([]),
    summary: z.string().default('Keine Zusammenfassung.'),
  })
  .passthrough();

const UxSchema = z
  .object({
    score: z.coerce.number().default(0),
    checks: z
      .object({
        mobileResponsive: z.boolean().catch(false),
        navigation: z.object({ quality: Quality, depth: z.coerce.number().default(0) }).default({}),
        cta: z
          .object({
            visible: z.boolean().catch(false),
            count: z.coerce.number().default(0),
            quality: Quality,
          })
          .default({}),
        trustSignals: z
          .object({ count: z.coerce.number().default(0), types: z.array(z.string()).default([]) })
          .default({}),
        visualHierarchy: Quality,
      })
      .default({}),
    issues: z.array(IssueSchema).default([]),
    summary: z.string().default('Keine Zusammenfassung.'),
  })
  .passthrough();

const ContentSchema = z
  .object({
    score: z.coerce.number().default(0),
    checks: z
      .object({
        headline: z.object({ quality: Quality, hasUVP: z.boolean().catch(false) }).default({}),
        readability: z
          .object({
            score: z.coerce.number().default(0),
            gradeLevel: z.string().default('unbekannt'),
            quality: Quality,
          })
          .default({}),
        socialProof: z
          .object({ found: z.boolean().catch(false), types: z.array(z.string()).default([]) })
          .default({}),
        ctaText: z
          .object({ quality: Quality, examples: z.array(z.string()).default([]) })
          .default({}),
        freshness: z.string().catch('unbekannt'),
      })
      .default({}),
    issues: z.array(IssueSchema).default([]),
    summary: z.string().default('Keine Zusammenfassung.'),
  })
  .passthrough();

// Map agent → schema
const AGENT_SCHEMAS: Record<string, z.ZodSchema> = {
  performance: PerformanceSchema,
  seo: SeoSchema,
  security: SecuritySchema,
  accessibility: AccessibilitySchema,
  ux: UxSchema,
  content: ContentSchema,
};

// ─── AGENT PROMPTS ──────────────────────────────────────
// Each prompt specifies exact JSON output structure matching types.ts
const AGENT_PROMPTS: Record<string, string> = {
  performance: `Du bist ein Senior Performance Engineer. Analysiere die Website auf Ladezeit-Probleme.

ANALYSE-PUNKTE:
- Schätze Core Web Vitals anhand der HTML-Struktur (Bilder ohne Dimensionen? Render-Blocking CSS/JS? Fonts?)
- Prüfe ob Scripts async/defer haben
- Prüfe ob Bilder lazy-loaded werden oder Dimensionen haben
- Prüfe Resource Hints (preload, prefetch, preconnect)
- Bewerte die Anzahl der CSS/JS-Dateien

BEWERTUNG:
- 80-100: Sehr gute Performance-Grundlagen
- 50-79: Verbesserungspotential
- 0-49: Kritische Performance-Probleme

ANTWORTE AUSSCHLIESSLICH mit diesem EXAKTEN JSON-Format, keine Erklärungen drumherum:
{
  "score": 0-100,
  "metrics": {
    "lcp": { "value": "geschätzt ~X.Xs", "status": "gut|mittel|schlecht" },
    "fid": { "value": "geschätzt ~Xms", "status": "gut|mittel|schlecht" },
    "cls": { "value": "geschätzt ~X.XX", "status": "gut|mittel|schlecht" },
    "ttfb": { "value": "geschätzt ~Xms", "status": "gut|mittel|schlecht" }
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung in max 15 Worten" }
  ],
  "summary": "Max 2 Sätze. Konkret und spezifisch zur analysierten Website."
}

REGELN:
- Max 5 Issues
- Severity NUR: kritisch, hoch, mittel, niedrig
- Summary max 2 Sätze, KEINE generischen Tipps
- Nenne konkrete Dateinamen/Pfade wenn möglich
- KEIN Padding-Text über CDNs, WordPress, HTTP/2 etc. wenn nicht relevant`,

  seo: `Du bist ein Head of SEO. Analysiere die Website auf Ranking-Faktoren.

ANALYSE-PUNKTE:
- Title Tag: Vorhanden? Länge (ideal 50-60 Zeichen)? Keywords?
- Meta Description: Vorhanden? Länge (ideal 120-160 Zeichen)? Call-to-Action?
- H1: Genau 1 pro Seite? Keyword-relevant?
- Weitere Headings: Logische H2-H6 Struktur?
- Bilder: Wie viele haben alt-Attribute?
- Interne Links: Anzahl und Qualität
- Schema.org/JSON-LD: Vorhanden?
- Canonical Tag: Vorhanden?

ANTWORTE AUSSCHLIESSLICH mit diesem EXAKTEN JSON-Format:
{
  "score": 0-100,
  "checks": {
    "metaTitle": { "found": true/false, "value": "Der gefundene Title", "quality": "gut|mittel|schlecht" },
    "metaDescription": { "found": true/false, "value": "Die gefundene Description", "quality": "gut|mittel|schlecht" },
    "h1": { "count": ZAHL, "values": ["H1 Text 1"], "quality": "gut|mittel|schlecht" },
    "images": { "total": ZAHL, "withAlt": ZAHL, "percentage": ZAHL },
    "internalLinks": ZAHL,
    "schemaMarkup": true/false
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- Zähle die tatsächlich im HTML gefundenen Elemente
- Fülle "value" mit den ECHTEN Werten aus dem HTML
- Max 5 Issues, Severity NUR: kritisch, hoch, mittel, niedrig
- KEINE generischen SEO-Tipps, nur was aus dem HTML ableitbar ist`,

  security: `Du bist ein Security Analyst. Analysiere die Website auf Sicherheitsprobleme.

Du erhältst neben dem HTML auch die ECHTEN HTTP-Response-Headers. Nutze diese für eine faktische Analyse.

ANALYSE-PUNKTE:
- HTTPS: URL beginnt mit https? (aus der URL ablesen)
- Content-Security-Policy Header: Vorhanden?
- X-Frame-Options Header: Vorhanden?
- Strict-Transport-Security (HSTS) Header: Vorhanden?
- X-Content-Type-Options Header: Vorhanden?
- Cookies: secure und httpOnly Flags?
- Offene mailto: Links?
- Mixed Content Hinweise?
- Server/X-Powered-By Header (Information Disclosure)?

ANTWORTE AUSSCHLIESSLICH mit diesem EXAKTEN JSON-Format:
{
  "score": 0-100,
  "checks": {
    "https": { "enabled": true/false, "valid": true/false },
    "headers": {
      "csp": true/false,
      "xFrameOptions": true/false,
      "hsts": true/false,
      "xContentType": true/false
    },
    "cookies": { "secure": true/false, "httpOnly": true/false }
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- Fehlendes HTTPS = Score maximal 20
- Prüfe die ECHTEN Headers aus dem Abschnitt "HTTP RESPONSE HEADERS"
- Max 5 Issues, Severity NUR: kritisch, hoch, mittel, niedrig
- Basiere JEDE Aussage auf den tatsächlichen Daten`,

  accessibility: `Du bist ein WCAG 2.2 Accessibility Auditor. Prüfe die Website auf Barrierefreiheit.

ANALYSE-PUNKTE:
- Bilder ohne alt-Attribute (aus dem Bilder-Abschnitt zählen)
- ARIA-Labels: Wie viele vorhanden? Qualität?
- Formular-Labels: Haben Inputs zugehörige Labels oder aria-labels?
- Link-Texte: Gibt es "hier klicken" oder ähnlich unklare Texte?
- Heading-Hierarchie: Logisch (H1 → H2 → H3)?
- role-Attribute: Vorhanden und sinnvoll?
- Farbkontrast: Schätze anhand von CSS-Klassen wenn möglich
- Tastatur-Navigation: Sind Interactive Elements fokussierbar?

ANTWORTE AUSSCHLIESSLICH mit diesem EXAKTEN JSON-Format:
{
  "score": 0-100,
  "wcagLevel": "A|AA|AAA|nicht erfüllt",
  "checks": {
    "colorContrast": { "passed": ZAHL, "failed": ZAHL },
    "keyboardNav": true/false,
    "ariaLabels": { "used": true/false, "quality": "gut|mittel|schlecht" },
    "formLabels": { "total": ZAHL, "labeled": ZAHL }
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- Bewerte NUR was aus dem HTML ableitbar ist
- Wenn keine Formulare vorhanden, setze formLabels auf { "total": 0, "labeled": 0 }
- Max 5 Issues, Severity NUR: kritisch, hoch, mittel, niedrig`,

  ux: `Du bist ein preisgekrönter UI/UX Designer. Bewerte die User Experience.

ANALYSE-PUNKTE:
- Mobile Viewport Tag vorhanden?
- Navigation: Anzahl der Nav-Links, Tiefe, Klarheit
- Call-to-Actions: Gibt es klare CTAs? Wie viele? Sind sie prominent?
- Trust-Signale: Testimonials, Logos, Zertifikate, Garantien?
- Visuelle Hierarchie: Logische Heading-Struktur, klare Abschnitte?
- Formular-UX: Einfach und klar?

ANTWORTE AUSSCHLIESSLICH mit diesem EXAKTEN JSON-Format:
{
  "score": 0-100,
  "checks": {
    "mobileResponsive": true/false,
    "navigation": { "quality": "gut|mittel|schlecht", "depth": ZAHL },
    "cta": { "visible": true/false, "count": ZAHL, "quality": "gut|mittel|schlecht" },
    "trustSignals": { "count": ZAHL, "types": ["Typ1", "Typ2"] },
    "visualHierarchy": "gut|mittel|schlecht"
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- mobileResponsive = true wenn viewport meta tag vorhanden
- Zähle tatsächliche CTA-Elemente (Buttons, Links mit Handlungsaufforderung)
- Trust-Signale: Nenne die Typen die du gefunden hast
- Max 5 Issues, Severity NUR: kritisch, hoch, mittel, niedrig`,

  content: `Du bist ein Conversion Copywriter. Analysiere die Überzeugungskraft der Inhalte.

ANALYSE-PUNKTE:
- Headline: Hat die H1 ein klares Nutzenversprechen (UVP)?
- Sprache: "Wir"-fokussiert (schlecht) oder "Sie"-fokussiert (gut)?
- Lesbarkeit: Kurze Sätze? Klare Sprache?
- Social Proof: Testimonials, Kundenstimmen, Fallstudien, Zahlen?
- CTA-Texte: Sind sie handlungsorientiert? ("Jetzt starten" vs "Senden")
- Aktualität: Copyright-Jahr, Blog-Daten, Aktualitätshinweise?

ANTWORTE AUSSCHLIESSLICH mit diesem EXAKTEN JSON-Format:
{
  "score": 0-100,
  "checks": {
    "headline": { "quality": "gut|mittel|schlecht", "hasUVP": true/false },
    "readability": { "score": 0-100, "gradeLevel": "einfach|mittel|komplex", "quality": "gut|mittel|schlecht" },
    "socialProof": { "found": true/false, "types": ["Testimonials", "Zahlen"] },
    "ctaText": { "quality": "gut|mittel|schlecht", "examples": ["CTA Text 1", "CTA Text 2"] },
    "freshness": "aktuell|veraltet|unbekannt"
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- Zitiere echte Texte aus der Website in den CTA-Beispielen
- Social Proof types: nur was tatsächlich gefunden wurde
- Max 5 Issues, Severity NUR: kritisch, hoch, mittel, niedrig
- KEINE generischen Copywriting-Tipps, nur was aus dem Content ableitbar ist`,
};

// ─── GEMINI API CALL ────────────────────────────────────
async function callGemini(prompt: string, agentId: string): Promise<string> {
  const apiKey = getRandomGeminiKey();
  if (!apiKey) throw new Error('No API Key available');

  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 3000,
              // NO responseMimeType or responseSchema — we extract JSON ourselves
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
        console.error(`[${agentId}] Gemini API error (attempt ${attempt + 1}):`, data.error);
        if (data.error.message?.includes('429') || data.error.message?.includes('Quota')) {
          await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
        }
        throw new Error(data.error.message || 'Gemini API error');
      }

      const candidate = data.candidates?.[0];
      if (candidate?.finishReason === 'SAFETY') {
        console.warn(`[${agentId}] Blocked by safety settings`);
        return '';
      }

      return candidate?.content?.parts?.[0]?.text || '';
    } catch (e) {
      lastError = e;
      const backoff = 1000 * Math.pow(2, attempt);
      console.log(`[${agentId}] Retry ${attempt + 1}/3 in ${backoff}ms...`);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  throw lastError;
}

// ─── EXTRACT JSON FROM RESPONSE ─────────────────────────
function extractJson(text: string): unknown {
  // Try direct parse first
  try {
    return JSON.parse(text.trim());
  } catch {
    // ignore
  }

  // Try extracting from markdown code blocks
  const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch {
      // ignore
    }
  }

  // Try finding first { ... } block
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      // ignore
    }
  }

  throw new Error('Konnte kein JSON aus der Antwort extrahieren');
}

// ─── RUN AGENT ──────────────────────────────────────────
interface AgentResultBase {
  score: number;
  summary: string;
  issues: Array<{ severity: string; title: string; description: string; fix?: string }>;
  [key: string]: unknown;
}

async function runAgent(
  agentId: string,
  url: string,
  content: string,
  headers?: Record<string, string>
): Promise<AgentResultBase> {
  try {
    const prompt = AGENT_PROMPTS[agentId];
    if (!prompt) throw new Error(`Unknown agent: ${agentId}`);
    const schema = AGENT_SCHEMAS[agentId];

    // Build full prompt with context
    let fullPrompt = `${prompt}\n\n=== WEBSITE ===\nURL: ${url}\n\n${content}`;

    // Security agent gets real HTTP headers
    if (agentId === 'security' && headers) {
      const headerBlock = Object.entries(headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      fullPrompt += `\n\n=== HTTP RESPONSE HEADERS (ECHTE DATEN) ===\n${headerBlock}`;
      fullPrompt += `\n\nWICHTIG: Die obigen Headers sind die ECHTEN Response-Headers des Servers. Basiere deine Analyse auf diesen Fakten.`;
    }

    const text = await callGemini(fullPrompt, agentId);

    if (!text) {
      console.warn(`[${agentId}] Empty response from Gemini`);
      return {
        score: 0,
        summary: 'KI-Agent konnte keine Antwort generieren.',
        issues: [
          {
            severity: 'kritisch',
            title: 'Analyse fehlgeschlagen',
            description: 'Keine Daten empfangen.',
            fix: 'Erneut versuchen',
          },
        ],
      };
    }

    // Extract and validate JSON
    const rawJson = extractJson(text);
    const result = schema.safeParse(rawJson);

    if (!result.success) {
      console.error(
        `[${agentId}] Zod validation failed:`,
        JSON.stringify(result.error.issues.slice(0, 5))
      );
      console.error(
        `[${agentId}] Raw JSON (first 500 chars):`,
        JSON.stringify(rawJson).slice(0, 500)
      );
      // Try to manually build a valid result from whatever we got
      const raw = rawJson as Record<string, unknown>;
      const fallbackScore =
        typeof raw?.score === 'number'
          ? raw.score
          : typeof raw?.score === 'string'
            ? parseInt(raw.score as string, 10) || 0
            : 0;
      const fallbackSummary =
        typeof raw?.summary === 'string' ? raw.summary : 'Analyse durchgeführt.';
      const fallbackIssues = Array.isArray(raw?.issues)
        ? (raw.issues as AgentResultBase['issues'])
        : [];
      return {
        score: Math.min(100, Math.max(0, fallbackScore)),
        summary: fallbackSummary,
        issues: fallbackIssues,
        ...(raw?.checks ? { checks: raw.checks } : {}),
        ...(raw?.metrics ? { metrics: raw.metrics } : {}),
        ...(raw?.wcagLevel ? { wcagLevel: raw.wcagLevel } : {}),
      } as AgentResultBase;
    }

    return result.data as AgentResultBase;
  } catch (error) {
    console.error(`[${agentId}] Agent error:`, error);
    return {
      score: -1,
      summary: `Agent-Fehler: ${error instanceof Error ? error.message : 'Unbekannt'}`,
      issues: [],
    };
  }
}

// ─── MAIN SERVER ────────────────────────────────────────
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as {
      url?: string;
      action?: 'scan' | 'analyze' | 'plan' | 'ping';
      agent?: string;
      html?: string;
      headers?: Record<string, string>;
      issues?: Array<{ severity: string; title: string; description: string }>;
    };
    const { url, action = 'scan', agent, html } = payload;

    // ── PING ──
    if (action === 'ping') {
      return new Response(
        JSON.stringify({ status: 'ok', message: 'Pong', timestamp: new Date().toISOString() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── SCAN ──
    if (action === 'scan') {
      if (!url) throw new Error('URL erforderlich');

      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith('http')) normalizedUrl = `https://${normalizedUrl}`;

      console.log(`[Scan] Fetching: ${normalizedUrl}`);

      let fetchResult: FetchResult;
      try {
        fetchResult = await fetchWebsite(normalizedUrl);
      } catch (fetchError) {
        console.error(`[Scan] Fetch error:`, fetchError);
        return new Response(
          JSON.stringify({
            error: `Website nicht erreichbar: ${fetchError instanceof Error ? fetchError.message : 'Timeout'}`,
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const content = extractContent(fetchResult.html);
      const stack = detectTechStack(fetchResult.html);

      return new Response(
        JSON.stringify({
          success: true,
          html: content,
          url: fetchResult.redirectUrl || normalizedUrl,
          stack,
          headers: fetchResult.headers,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── ANALYZE ──
    if (action === 'analyze') {
      if (!html || !agent) throw new Error('HTML und Agent ID erforderlich');

      console.log(`[Analyze] Agent: ${agent}`);

      if (!AGENT_PROMPTS[agent]) {
        throw new Error(`Unbekannter Agent: ${agent}`);
      }

      const result = await runAgent(agent, url || 'N/A', html, payload.headers);

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── PLAN ──
    if (action === 'plan') {
      const issues = payload.issues || [];
      if (!issues.length) throw new Error('Keine Issues für Plan-Erstellung');

      console.log(`[Plan] Generating for ${issues.length} issues`);

      const topIssues = issues
        .filter((i) => i.severity === 'kritisch' || i.severity === 'hoch')
        .slice(0, 10)
        .map((i) => `- [${i.severity}] ${i.title}: ${i.description}`)
        .join('\n');

      const prompt = `Du bist ein Projektmanager für Web-Entwicklung. Erstelle einen konkreten Maßnahmenplan.

PROBLEME:
${topIssues}

Erstelle 3-5 priorisierte Schritte.
ANTWORTE AUSSCHLIESSLICH mit diesem JSON-Format:
[
  {
    "step": 1,
    "title": "Kurzer Titel",
    "description": "Konkrete Anweisung.",
    "impact": "hoch|mittel|niedrig",
    "effort": "hoch|mittel|niedrig",
    "role": "dev|marketing|seo|design"
  }
]`;

      const text = await callGemini(prompt, 'planner');
      const plan = extractJson(text);

      return new Response(JSON.stringify(plan), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ error: 'Ungültige Aktion. Verwende: scan, analyze, plan, ping' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Server] Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
