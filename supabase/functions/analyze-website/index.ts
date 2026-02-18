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
function detectTechStack(html: string, headers: Record<string, string> = {}): string[] {
  const stack: string[] = [];
  const lowerHtml = html.toLowerCase();
  const headerKeys = Object.keys(headers).map((k) => k.toLowerCase());
  const headerString = JSON.stringify(headers).toLowerCase();

  // Helper for meta tags
  const hasMeta = (name: string, content: string) => {
    const regex = new RegExp(
      `<meta[^>]+name=["']${name}["'][^>]+content=["'][^"']*${content}[^"']*["']`,
      'i'
    );
    return regex.test(html);
  };

  // Helper for script src
  const hasScript = (srcPart: string) => {
    return new RegExp(`<script[^>]+src=["'][^"']*${srcPart}[^"']*["']`, 'i').test(html);
  };

  // ─── Frameworks & CMS ───

  // Next.js: _next path, __NEXT_DATA__, or x-powered-by header
  if (
    html.includes('/_next/') ||
    html.includes('__NEXT_DATA__') ||
    headerString.includes('next.js')
  ) {
    stack.push('Next.js');
    stack.push('React'); // Next.js implies React
  }
  // React: distinct from Next.js checks
  else if (html.includes('data-reactroot') || hasScript('react') || html.includes('_react')) {
    stack.push('React');
  }

  // Vue.js
  if (html.includes('data-v-') || hasScript('vue')) stack.push('Vue.js');

  // Nuxt.js
  if (html.includes('__NUXT__') || headerString.includes('nuxt')) {
    stack.push('Nuxt.js');
    stack.push('Vue.js');
  }

  // Angular
  if (html.includes('ng-version') || html.includes('ng-app') || hasScript('angular'))
    stack.push('Angular');

  // Svelte
  if (html.includes('svelte-')) stack.push('Svelte');

  // WordPress
  if (
    html.includes('wp-content') ||
    html.includes('wp-includes') ||
    hasMeta('generator', 'WordPress')
  ) {
    stack.push('WordPress');
  }

  // Shopify
  if (html.includes('cdn.shopify.com') || (html.includes('Shopify.shop') && hasScript('shopify'))) {
    stack.push('Shopify');
  }

  // Wix
  if (html.includes('wix.com') && (hasScript('wix') || headerString.includes('wix'))) {
    stack.push('Wix');
  }

  // Squarespace
  if (html.includes('static1.squarespace.com') || headerString.includes('squarespace')) {
    stack.push('Squarespace');
  }

  // Webflow
  if (html.includes('webflow.com') || html.includes('w-nav') || hasMeta('generator', 'Webflow')) {
    stack.push('Webflow');
  }

  // Typo3
  if (hasMeta('generator', 'TYPO3') || html.includes('/typo3/')) {
    stack.push('TYPO3');
  }

  // Joomla
  if (hasMeta('generator', 'Joomla') || html.includes('/components/com_')) {
    stack.push('Joomla');
  }

  // Elementor
  if (
    html.includes('elementor') &&
    (html.includes('wp-content') || hasMeta('generator', 'Elementor'))
  ) {
    stack.push('Elementor');
  }

  // Gatsby
  if (html.includes('gatsby') || hasMeta('generator', 'Gatsby')) {
    stack.push('Gatsby');
  }

  // Framer
  if (html.includes('framer') && (html.includes('data-framer-component') || hasScript('framer'))) {
    stack.push('Framer');
  }

  // Astro
  if (html.includes('astro-') || hasMeta('generator', 'Astro')) {
    stack.push('Astro');
  }

  // ─── Libraries & UI ───

  // Tailwind CSS
  if (html.includes('tailwind')) {
    if (/class=["'][^"']*tailwind/i.test(html) || /<link[^>]+href=["'][^"']*tailwind/i.test(html)) {
      stack.push('Tailwind CSS');
    }
  }

  // Bootstrap
  if (
    html.includes('bootstrap.min.css') ||
    html.includes('bootstrap.min.js') ||
    /class=["'][^"']*col-md-/i.test(html)
  ) {
    stack.push('Bootstrap');
  }

  // jQuery
  if (hasScript('jquery')) stack.push('jQuery');

  // Framer Motion
  if (html.includes('framer-motion')) stack.push('Framer Motion');

  // Material UI
  if (html.includes('MuiBox') || html.includes('MuiButton') || html.includes('mui-'))
    stack.push('Material UI');

  // Chakra UI
  if (html.includes('chakra-') || html.includes('css-')) {
    if (html.includes('chakra-')) stack.push('Chakra UI');
  }

  // Radix UI
  if (html.includes('radix-') || html.includes('data-radix-')) stack.push('Radix UI');

  // ─── Analytics ───

  // Google Analytics
  if (
    html.includes('googletagmanager.com') ||
    html.includes('google-analytics.com') ||
    html.includes('gtag(')
  )
    stack.push('Google Analytics');

  // Plausible
  if (hasScript('plausible.io')) stack.push('Plausible');

  // Hotjar
  if (html.includes('hotjar.com') || html.includes('hj(')) stack.push('Hotjar');

  // Segment
  if (hasScript('segment.com') || html.includes('analytics.load(')) stack.push('Segment');

  // ─── Backend / Services ───

  // Supabase
  if (
    hasScript('supabase.co') ||
    new RegExp('connect-src[^>]*supabase\\.co', 'i').test(html) ||
    headerString.includes('supabase.co')
  ) {
    stack.push('Supabase');
  }

  // Firebase
  if (hasScript('firebase') || (html.includes('firebaseapp.com') && hasScript('firebase'))) {
    stack.push('Firebase');
  }

  // Contentful
  if (html.includes('ctfassets.net')) stack.push('Contentful');

  // Sanity
  if (html.includes('cdn.sanity.io')) stack.push('Sanity');

  // Strapi
  if (
    hasScript('strapi') ||
    (html.includes('/uploads/') && html.includes('strapi') && !html.includes('strapi"'))
  ) {
    if (
      new RegExp('src=["\'][^"\']*strapi[^"\']*["\']', 'i').test(html) ||
      new RegExp('href=["\'][^"\']*strapi[^"\']*["\']', 'i').test(html)
    ) {
      stack.push('Strapi');
    }
  }

  // Infrastructure (Headers Analysis)
  if (headerString.includes('vercel') || headerKeys.includes('x-vercel-id')) stack.push('Vercel');
  if (headerString.includes('netlify') || headerKeys.includes('x-nf-request-id'))
    stack.push('Netlify');
  if (headerString.includes('cloudflare') || headerKeys.includes('cf-ray'))
    stack.push('Cloudflare');
  if (headerString.includes('awselb') || headerString.includes('amazon')) stack.push('AWS');
  if (headerString.includes('nginx')) stack.push('Nginx');

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

// ─── DETERMINISTIC PRE-COMPUTATION ENGINE ───────────────
interface FactResult {
  baseScore: number;
  maxScore: number;
  details: Record<string, unknown>;
  factBlock: string; // Human-readable for prompt injection
}

function computeSecurityFacts(headers: Record<string, string>, url: string): FactResult {
  let score = 0;
  const d: Record<string, unknown> = {};

  d.isHttps = url.startsWith('https');
  if (d.isHttps) score += 20;

  d.hasHsts = !!headers['strict-transport-security'];
  d.hstsValue = headers['strict-transport-security'] || '';
  if (d.hasHsts) score += 15;

  d.hasCsp = !!headers['content-security-policy'];
  if (d.hasCsp) score += 15;

  d.hasXFrameOptions = !!headers['x-frame-options'];
  if (d.hasXFrameOptions) score += 10;

  d.hasXContentType = !!headers['x-content-type-options'];
  if (d.hasXContentType) score += 10;

  d.hasReferrerPolicy = !!headers['referrer-policy'];
  if (d.hasReferrerPolicy) score += 5;

  d.hasPermissionsPolicy = !!headers['permissions-policy'] || !!headers['feature-policy'];
  if (d.hasPermissionsPolicy) score += 5;

  d.serverLeak = !!headers['server'];
  d.serverValue = headers['server'] || '';
  if (!d.serverLeak) score += 5;

  d.poweredByLeak = !!headers['x-powered-by'];
  d.poweredByValue = headers['x-powered-by'] || '';
  if (!d.poweredByLeak) score += 5;

  const factBlock = [
    `HTTPS: ${d.isHttps ? 'JA ✓' : 'NEIN ✗ — KRITISCH!'}`,
    `HSTS: ${d.hasHsts ? `JA ✓ (${d.hstsValue})` : 'FEHLT ✗'}`,
    `CSP: ${d.hasCsp ? 'JA ✓' : 'FEHLT ✗'}`,
    `X-Frame-Options: ${d.hasXFrameOptions ? 'JA ✓' : 'FEHLT ✗'}`,
    `X-Content-Type-Options: ${d.hasXContentType ? 'JA ✓' : 'FEHLT ✗'}`,
    `Referrer-Policy: ${d.hasReferrerPolicy ? 'JA ✓' : 'FEHLT ✗'}`,
    `Permissions-Policy: ${d.hasPermissionsPolicy ? 'JA ✓' : 'FEHLT ✗'}`,
    `Server Header Leak: ${d.serverLeak ? `JA ✗ (${d.serverValue})` : 'Nein ✓'}`,
    `X-Powered-By Leak: ${d.poweredByLeak ? `JA ✗ (${d.poweredByValue})` : 'Nein ✓'}`,
  ].join('\n');

  return { baseScore: Math.max(0, Math.min(score, 90)), maxScore: 90, details: d, factBlock };
}

function computePerformanceFacts(html: string): FactResult {
  let score = 0;
  const d: Record<string, unknown> = {};

  // Scripts analysis
  const scripts = html.match(/<script[^>]+src=["'][^"']+["'][^>]*>/gi) || [];
  const asyncDefer = scripts.filter((s) => /async|defer/i.test(s)).length;
  d.scriptTotal = scripts.length;
  d.scriptAsyncDefer = asyncDefer;
  d.scriptPct = scripts.length > 0 ? Math.round((asyncDefer / scripts.length) * 100) : 100;
  score += Math.round(((d.scriptPct as number) / 100) * 15);

  // Images with dimensions
  const imgs = html.match(/<img[^>]+>/gi) || [];
  const withDims = imgs.filter((i) => /width=["']?\d/i.test(i) && /height=["']?\d/i.test(i)).length;
  d.imgTotal = imgs.length;
  d.imgWithDims = withDims;
  d.imgDimsPct = imgs.length > 0 ? Math.round((withDims / imgs.length) * 100) : 100;
  score += Math.round(((d.imgDimsPct as number) / 100) * 10);

  // Lazy loading
  const lazyImgs = imgs.filter((i) => /loading=["']lazy["']/i.test(i)).length;
  d.imgLazy = lazyImgs;
  d.imgLazyPct = imgs.length > 0 ? Math.round((lazyImgs / imgs.length) * 100) : 100;
  score += Math.round(((d.imgLazyPct as number) / 100) * 10);

  // Resource hints
  const preloads = (
    html.match(/<link[^>]+rel=["'](preload|prefetch|preconnect|dns-prefetch)["']/gi) || []
  ).length;
  d.resourceHints = preloads;
  if (preloads >= 1) score += 5;
  if (preloads >= 3) score += 5;

  // CSS files
  const cssFiles = (html.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  d.cssFiles = cssFiles;
  if (cssFiles <= 3) score += 5;
  else if (cssFiles <= 6) score += 2;

  // Inline CSS size
  const inlineStyles = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  const inlineCssSize = inlineStyles.reduce((sum, s) => sum + s.length, 0);
  d.inlineCssBytes = inlineCssSize;
  if (inlineCssSize < 10000) score += 5;

  // Render-blocking check
  const renderBlocking = scripts.filter((s) => !/async|defer|type=["']module["']/i.test(s));
  d.renderBlockingScripts = renderBlocking.length;
  if (renderBlocking.length === 0) score += 15;
  else if (renderBlocking.length <= 2) score += 7;

  // HTML size
  d.htmlBytes = html.length;
  d.htmlKb = Math.round(html.length / 1024);
  if (html.length < 200000) score += 10;
  else if (html.length < 500000) score += 5;

  // Font preloading
  d.fontPreload = /<link[^>]+rel=["']preload["'][^>]+as=["']font["']/i.test(html);
  if (d.fontPreload) score += 5;

  const factBlock = [
    `SCRIPTS: ${d.scriptTotal} total, ${d.scriptAsyncDefer} mit async/defer (${d.scriptPct}%)`,
    `RENDER-BLOCKING: ${d.renderBlockingScripts} Scripts ohne async/defer`,
    `BILDER: ${d.imgTotal} total, ${d.imgWithDims} mit Dimensionen, ${d.imgLazy} lazy-loaded`,
    `RESOURCE HINTS: ${d.resourceHints} (preload/prefetch/preconnect)`,
    `CSS-DATEIEN: ${d.cssFiles}`,
    `INLINE CSS: ${d.inlineCssBytes} Bytes`,
    `HTML-GRÖSSE: ${d.htmlKb} KB`,
    `FONT PRELOAD: ${d.fontPreload ? 'JA ✓' : 'NEIN'}`,
  ].join('\n');

  return { baseScore: Math.max(0, Math.min(score, 85)), maxScore: 85, details: d, factBlock };
}

function computeAccessibilityFacts(html: string): FactResult {
  let score = 0;
  const d: Record<string, unknown> = {};

  // Lang attribute
  d.hasLang = /<html[^>]+lang=["'][^"']+["']/i.test(html);
  if (d.hasLang) score += 10;

  // Skip-to-content link
  d.hasSkipLink = /<a[^>]+href=["']#(main|content|main-content)[^"']*["']/i.test(html);
  if (d.hasSkipLink) score += 5;

  // Images alt
  const imgs = html.match(/<img[^>]+>/gi) || [];
  const withAlt = imgs.filter((i) => /alt=["'][^"']+["']/i.test(i)).length;
  d.imgTotal = imgs.length;
  d.imgWithAlt = withAlt;
  d.imgAltPct = imgs.length > 0 ? Math.round((withAlt / imgs.length) * 100) : 100;
  score += Math.round(((d.imgAltPct as number) / 100) * 15);

  // ARIA labels
  const ariaLabels = (html.match(/aria-label=["'][^"']*["']/gi) || []).length;
  const ariaDescribedBy = (html.match(/aria-describedby=["']/gi) || []).length;
  d.ariaLabelCount = ariaLabels;
  d.ariaDescribedByCount = ariaDescribedBy;
  if (ariaLabels >= 3) score += 10;
  else if (ariaLabels >= 1) score += 5;

  // Role attributes
  const roles = (html.match(/role=["'][^"']*["']/gi) || []).length;
  d.roleCount = roles;
  if (roles >= 3) score += 5;

  // Heading hierarchy
  const headingLevels: number[] = [];
  for (let i = 1; i <= 6; i++) {
    if (new RegExp(`<h${i}[^>]*>`, 'i').test(html)) headingLevels.push(i);
  }
  let hierarchyValid = headingLevels.length > 0 && headingLevels[0] === 1;
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] - headingLevels[i - 1] > 1) {
      hierarchyValid = false;
      break;
    }
  }
  d.headingLevels = headingLevels;
  d.headingHierarchyValid = hierarchyValid;
  if (hierarchyValid) score += 15;

  // Form labels
  const inputs = (html.match(/<input[^>]+>/gi) || []).filter(
    (i) => !/type=["'](hidden|submit|button)["']/i.test(i)
  );
  const labeledInputs = inputs.filter((i) => /aria-label=["']|id=["']/i.test(i)).length;
  const labels = (html.match(/<label[^>]*>/gi) || []).length;
  d.inputCount = inputs.length;
  d.labeledInputs = Math.max(labeledInputs, labels);
  d.inputLabelPct =
    inputs.length > 0
      ? Math.round((Math.min(d.labeledInputs as number, inputs.length) / inputs.length) * 100)
      : 100;
  score += Math.round(((d.inputLabelPct as number) / 100) * 10);

  // Viewport
  d.hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  if (d.hasViewport) score += 5;

  // tabindex > 0 (bad practice)
  const badTabindex = (html.match(/tabindex=["']\d+["']/gi) || []).filter((t) => {
    const val = parseInt(t.match(/["'](\d+)["']/)?.[1] || '0');
    return val > 0;
  }).length;
  d.badTabindex = badTabindex;
  if (badTabindex === 0) score += 5;

  const factBlock = [
    `LANG ATTRIBUT: ${d.hasLang ? 'JA ✓' : 'FEHLT ✗'}`,
    `SKIP-LINK: ${d.hasSkipLink ? 'JA ✓' : 'FEHLT'}`,
    `BILDER ALT-TEXT: ${d.imgWithAlt}/${d.imgTotal} (${d.imgAltPct}%)`,
    `ARIA LABELS: ${d.ariaLabelCount}`,
    `ROLE ATTRIBUTE: ${d.roleCount}`,
    `HEADING HIERARCHIE: ${d.headingHierarchyValid ? 'Korrekt ✓' : 'Fehlerhaft ✗'} → Levels: ${(d.headingLevels as number[]).join(',')}`,
    `FORM LABELS: ${d.labeledInputs}/${d.inputCount} Inputs`,
    `VIEWPORT META: ${d.hasViewport ? 'JA ✓' : 'FEHLT ✗'}`,
    `BAD TABINDEX (>0): ${d.badTabindex}`,
  ].join('\n');

  return { baseScore: Math.max(0, Math.min(score, 80)), maxScore: 80, details: d, factBlock };
}

function computeUxFacts(html: string): FactResult {
  let score = 0;
  const d: Record<string, unknown> = {};

  // Viewport
  d.hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  if (d.hasViewport) score += 15;

  // Navigation
  const navElements = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/gi) || [];
  d.hasNav = navElements.length > 0;
  const navLinks = navElements.flatMap((n) => n.match(/<a[^>]+>/gi) || []);
  d.navLinkCount = navLinks.length;
  if (d.hasNav) score += 10;
  if (navLinks.length >= 3 && navLinks.length <= 12) score += 10;
  else if (navLinks.length > 0) score += 5;

  // CTA buttons
  const buttons = html.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
  const ctaLinks = html.match(/<a[^>]+class=["'][^"']*(?:btn|button|cta)[^"']*["']/gi) || [];
  const ctaKeywords =
    /(?:jetzt|starten|buchen|anfragen|kontakt|termin|kaufen|testen|loslegen|registrieren)/gi;
  const ctaTexts = [...buttons, ...ctaLinks]
    .map((b) => b.replace(/<[^>]+>/g, '').trim())
    .filter((t) => ctaKeywords.test(t));
  d.buttonCount = buttons.length;
  d.ctaLinkCount = ctaLinks.length;
  d.ctaCount = ctaTexts.length + ctaLinks.length;
  d.ctaExamples = ctaTexts.slice(0, 5);
  if ((d.ctaCount as number) >= 2) score += 15;
  else if ((d.ctaCount as number) >= 1) score += 8;

  // Trust signals
  const trustKeywords = [
    'partner',
    'vertrau',
    'kunden',
    'referenz',
    'testimonial',
    'bewertung',
    'zertifik',
    'ausgezeichnet',
    'garantie',
    'sicher',
    'datenschutz',
    'ssl',
    'tüv',
    'iso',
  ];
  const lowerHtml = html.toLowerCase();
  const foundTrust = trustKeywords.filter((k) => lowerHtml.includes(k));
  d.trustSignalCount = foundTrust.length;
  d.trustSignalTypes = foundTrust;
  if (foundTrust.length >= 3) score += 10;
  else if (foundTrust.length >= 1) score += 5;

  // Social media links
  const socialPatterns = [
    'facebook',
    'instagram',
    'linkedin',
    'twitter',
    'x.com',
    'youtube',
    'tiktok',
    'xing',
  ];
  const foundSocial = socialPatterns.filter((p) => lowerHtml.includes(p));
  d.socialLinks = foundSocial;
  if (foundSocial.length >= 2) score += 5;

  // Footer
  d.hasFooter = /<footer/i.test(html);
  if (d.hasFooter) score += 5;

  // Forms UX
  const forms = (html.match(/<form/gi) || []).length;
  d.formCount = forms;
  if (forms > 0) score += 5;

  const factBlock = [
    `VIEWPORT: ${d.hasViewport ? 'JA ✓ (Mobile-Ready)' : 'FEHLT ✗'}`,
    `NAVIGATION: ${d.hasNav ? `JA ✓ (${d.navLinkCount} Links)` : 'KEINE <nav> gefunden'}`,
    `CTA ELEMENTE: ${d.ctaCount} (Buttons: ${d.buttonCount}, CTA-Links: ${d.ctaLinkCount})`,
    `CTA BEISPIELE: ${(d.ctaExamples as string[]).length > 0 ? (d.ctaExamples as string[]).join(', ') : 'keine'}`,
    `TRUST SIGNALE: ${d.trustSignalCount} → ${(d.trustSignalTypes as string[]).join(', ') || 'keine'}`,
    `SOCIAL MEDIA: ${(d.socialLinks as string[]).join(', ') || 'keine'}`,
    `FOOTER: ${d.hasFooter ? 'JA ✓' : 'FEHLT'}`,
    `FORMULARE: ${d.formCount}`,
  ].join('\n');

  return { baseScore: Math.max(0, Math.min(score, 75)), maxScore: 75, details: d, factBlock };
}

function computeContentFacts(html: string, visibleText: string): FactResult {
  let score = 0;
  const d: Record<string, unknown> = {};

  // Word count
  const words = visibleText.split(/\s+/).filter((w) => w.length > 1);
  d.wordCount = words.length;
  if (words.length >= 300) score += 15;
  else if (words.length >= 100) score += 8;
  else if (words.length >= 50) score += 3;

  // Sentence analysis
  const sentences = visibleText.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  const avgWords =
    sentences.length > 0
      ? Math.round(
          sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length
        )
      : 0;
  d.sentenceCount = sentences.length;
  d.avgSentenceLength = avgWords;
  if (avgWords > 0 && avgWords <= 20) score += 10;
  else if (avgWords > 0 && avgWords <= 30) score += 5;

  // Sie/Ihr vs Wir focus
  const sieCount = (visibleText.match(/\b(Sie|Ihr|Ihnen|Ihrem|Ihrer|Ihres)\b/g) || []).length;
  const wirCount = (visibleText.match(/\b(Wir|Unser|Unsere|Unserem|Unseren)\b/g) || []).length;
  d.sieCount = sieCount;
  d.wirCount = wirCount;
  d.sieRatio = sieCount + wirCount > 0 ? Math.round((sieCount / (sieCount + wirCount)) * 100) : 50;
  if ((d.sieRatio as number) >= 50) score += 10;
  else if ((d.sieRatio as number) >= 30) score += 5;

  // CTA texts
  const ctaPatterns =
    /(?:jetzt|starten|buchen|anfragen|kontakt|termin|kaufen|testen|loslegen|herunterladen|registrieren|anmelden|entdecken|mehr erfahren|projekt starten|kostenlos)/gi;
  const ctaMatches = visibleText.match(ctaPatterns) || [];
  d.ctaTextCount = ctaMatches.length;
  d.ctaExamples = [...new Set(ctaMatches)].slice(0, 5);
  if (ctaMatches.length >= 3) score += 10;
  else if (ctaMatches.length >= 1) score += 5;

  // Social proof
  const proofPatterns = [
    'kunden',
    'partner',
    'referenz',
    'projekt',
    'testimonial',
    'bewertung',
    'erfahrung',
    'case study',
    'erfolg',
    'zufrieden',
  ];
  const lowerText = visibleText.toLowerCase();
  const foundProof = proofPatterns.filter((p) => lowerText.includes(p));
  d.socialProofCount = foundProof.length;
  d.socialProofTypes = foundProof;
  if (foundProof.length >= 3) score += 10;
  else if (foundProof.length >= 1) score += 5;

  // Copyright year
  const yearMatch = visibleText.match(/©?\s*(20\d{2})/);
  const currentYear = new Date().getFullYear();
  d.copyrightYear = yearMatch?.[1] || 'nicht gefunden';
  d.isCurrent = yearMatch ? parseInt(yearMatch[1]) >= currentYear - 1 : false;
  if (d.isCurrent) score += 5;

  const factBlock = [
    `WORTANZAHL: ${d.wordCount}`,
    `SÄTZE: ${d.sentenceCount}, Ø ${d.avgSentenceLength} Wörter/Satz`,
    `ANSPRACHE: ${d.sieCount}× Sie/Ihr vs ${d.wirCount}× Wir/Unser (${d.sieRatio}% kundenorientiert)`,
    `CTA-TEXTE: ${d.ctaTextCount} → ${(d.ctaExamples as string[]).join(', ') || 'keine'}`,
    `SOCIAL PROOF: ${d.socialProofCount} Signale → ${(d.socialProofTypes as string[]).join(', ') || 'keine'}`,
    `COPYRIGHT: ${d.copyrightYear} ${d.isCurrent ? '✓ aktuell' : '✗ veraltet/fehlt'}`,
  ].join('\n');

  return { baseScore: Math.max(0, Math.min(score, 60)), maxScore: 60, details: d, factBlock };
}

// Dispatcher
function computeFactsForAgent(
  agentId: string,
  html: string,
  content: string,
  headers: Record<string, string>,
  url: string,
  visibleText: string,
  robotsTxt?: string | null,
  sitemapXml?: string | null
): FactResult | null {
  switch (agentId) {
    case 'seo':
      return computeSeoFacts(html, content, robotsTxt, sitemapXml);
    case 'security':
      return computeSecurityFacts(headers, url);
    case 'performance':
      return computePerformanceFacts(html);
    case 'accessibility':
      return computeAccessibilityFacts(html);
    case 'ux':
      return computeUxFacts(html);
    case 'content':
      return computeContentFacts(html, visibleText);
    default:
      return null;
  }
}

// ─── FETCH WEBSITE WITH HEADERS ─────────────────────────
// ─── FETCH WEBSITE WITH HEADERS ─────────────────────────
interface FetchResult {
  html: string;
  headers: Record<string, string>;
  statusCode: number;
  redirectUrl?: string;
  robotsTxt?: string | null;
  sitemapXml?: string | null;
}

async function fetchWebsite(url: string, includeExtraChecks = false): Promise<FetchResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const fetchMain = fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      signal: controller.signal,
    });

    // Parallel fetch for robots.txt and sitemap.xml if requested
    const fetchRobots = includeExtraChecks
      ? fetch(new URL('/robots.txt', url).toString(), { signal: controller.signal }).catch(
          () => null
        )
      : Promise.resolve(null);

    const fetchSitemap = includeExtraChecks
      ? fetch(new URL('/sitemap.xml', url).toString(), { signal: controller.signal }).catch(
          () => null
        )
      : Promise.resolve(null);

    const [response, robotsRes, sitemapRes] = await Promise.all([
      fetchMain,
      fetchRobots,
      fetchSitemap,
    ]);

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
    const robotsTxt = robotsRes?.ok ? await robotsRes.text() : null;
    const sitemapXml = sitemapRes?.ok ? await sitemapRes.text() : null;

    return {
      html,
      headers: capturedHeaders,
      statusCode: response.status,
      redirectUrl: response.url !== url ? response.url : undefined,
      robotsTxt,
      sitemapXml,
    };
  } finally {
    clearTimeout(timeout);
  }
}

// ─── FACT COMPUTATION ENGINES ────────────────────────────

interface FactResult {
  baseScore: number;
  maxScore: number; // Added to calculate percentage
  details: Record<string, unknown>;
  factBlock: string;
}

function computeSeoFacts(
  html: string,
  content: string,
  robotsTxt?: string | null,
  sitemapXml?: string | null
): FactResult {
  let score = 0;
  const d: Record<string, any> = {}; // Changed to any to fix TS errors

  // Title (10 pts max)
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || '';
  d.titleFound = !!title;
  d.titleLength = title.length;
  d.titleValue = title.slice(0, 80);
  if (title) score += 5;
  if (title.length >= 30 && title.length <= 65) score += 5;

  // Meta Description (10 pts max)
  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*?)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']*?)["'][^>]+name=["']description["']/i);
  const desc = descMatch?.[1]?.trim() || '';
  d.descFound = !!desc;
  d.descLength = desc.length;
  d.descValue = desc.slice(0, 180);
  if (desc) score += 5;
  if (desc.length >= 100 && desc.length <= 170) score += 5;

  // H1 Tags (15 pts max — most important on-page signal)
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h1Texts = h1Matches
    .map((h) =>
      h
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean);
  d.h1Count = h1Texts.length;
  d.h1Values = h1Texts.slice(0, 3);
  if (h1Texts.length === 1) score += 15;
  else if (h1Texts.length > 1) score += 5;

  // Images & Alt (10 pts max)
  const imgs = html.match(/<img[^>]+>/gi) || [];
  const withAlt = imgs.filter((i) => /alt=["'][^"']+["']/i.test(i)).length;
  d.imgTotal = imgs.length;
  d.imgWithAlt = withAlt;
  d.imgAltPct = imgs.length > 0 ? Math.round((withAlt / imgs.length) * 100) : 100;
  score += Math.round((d.imgAltPct as number) / 10); // 0-10 points

  // Canonical (5 pts)
  d.hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  if (d.hasCanonical) score += 5;

  // Open Graph (5 pts)
  const ogTags = (html.match(/<meta[^>]+property=["']og:[^"']*["']/gi) || []).length;
  d.ogTagCount = ogTags;
  d.hasOpenGraph = ogTags >= 3;
  if (d.hasOpenGraph) score += 5;

  // JSON-LD (5 pts — reduced from 10)
  const jsonLdBlocks = html.match(/<script[^>]+type=["']application\/ld\+json["']/gi) || [];
  d.jsonLdCount = jsonLdBlocks.length;
  d.hasJsonLd = jsonLdBlocks.length > 0;
  if (d.hasJsonLd) score += 5;

  // Internal Links (15 pts — strong indicator of crawlable content)
  const allLinks = html.match(/<a[^>]+href=["'][^"']*["']/gi) || [];
  const internalLinks = allLinks.filter(
    (l) =>
      !/(http|\/\/)/i.test(l.match(/href=["']([^"']*)/)?.[1] || '') ||
      l.includes(new URL('https://placeholder.com').hostname)
  ).length;
  d.totalLinks = allLinks.length;
  d.internalLinks = Math.min(internalLinks, allLinks.length);
  if (d.internalLinks >= 10) score += 15;
  else if (d.internalLinks >= 5) score += 10;
  else if (d.internalLinks >= 2) score += 5;

  // robots noindex check
  d.hasNoindex = /<meta[^>]+content=["'][^"']*noindex/i.test(html);
  if (d.hasNoindex) score -= 30;

  // Heading hierarchy (10 pts — important for content structure)
  const headingOrder: number[] = [];
  for (let i = 1; i <= 6; i++) {
    if (new RegExp(`<h${i}[^>]*>`, 'i').test(html)) headingOrder.push(i);
  }
  d.headingHierarchyValid = headingOrder.length > 0 && headingOrder[0] === 1;
  d.headingLevelsUsed = headingOrder.length;
  if (d.headingHierarchyValid) score += 10;
  else if (headingOrder.length > 0) score += 3;

  // Viewport meta (5 pts)
  d.hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  if (d.hasViewport) score += 5;

  // Lang attribute (5 pts)
  d.hasLang = /<html[^>]+lang=["'][^"']+["']/i.test(html);
  if (d.hasLang) score += 5;

  // Content richness (15 pts — well-structured page with real content)
  const textContent = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  d.contentLength = textContent.length;
  d.contentWords = textContent.split(/\s+/).length;
  if (d.contentWords >= 500) score += 15;
  else if (d.contentWords >= 200) score += 10;
  else if (d.contentWords >= 50) score += 5;

  // Multiple heading levels used (5 pts — good content structure)
  if (headingOrder.length >= 3) score += 5;
  else if (headingOrder.length >= 2) score += 2;

  // Robots.txt check (5 pts)
  d.hasRobotsTxt = !!robotsTxt;
  let robotsNote = '';
  if (d.hasRobotsTxt && robotsTxt) {
    score += 5;
    // Check for Disallow: /
    // Basic check for blocking user-agent *
    if (/User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/\s*($|[\r\n])/i.test(robotsTxt)) {
      d.robotsBlocksAll = true;
      score -= 20; // Critical issue
      robotsNote = '(WARNUNG: Blockiert alle Crawler!)';
    } else {
      d.robotsBlocksAll = false;
    }
  }

  // Sitemap.xml check (5 pts)
  d.hasSitemapXml = !!sitemapXml;
  let sitemapCount = 0;
  if (d.hasSitemapXml && sitemapXml) {
    score += 5;
    // Simple count of <loc> tags to gauge sitemap size
    const locMatches = sitemapXml.match(/<loc>/gi);
    sitemapCount = locMatches ? locMatches.length : 0;
    d.sitemapUrlCount = sitemapCount;
  }

  // maxScore: 115 + 10 = 125
  const factBlock = [
    `TITLE: ${d.titleFound ? `"${d.titleValue}" (${d.titleLength} Zeichen)` : 'NICHT VORHANDEN'}`,
    `META-DESCRIPTION: ${d.descFound ? `"${d.descValue}" (${d.descLength} Zeichen)` : 'NICHT VORHANDEN'}`,
    `H1-TAGS: ${d.h1Count} gefunden${d.h1Count > 0 ? ` → "${(d.h1Values as string[]).join('", "')}"` : ''}`,
    `BILDER: ${d.imgTotal} total, ${d.imgWithAlt} mit Alt-Text (${d.imgAltPct}%)`,
    `CANONICAL: ${d.hasCanonical ? 'Vorhanden' : 'FEHLT'}`,
    `OPEN GRAPH: ${d.hasOpenGraph ? `${d.ogTagCount} Tags` : 'FEHLT'}`,
    `JSON-LD: ${d.hasJsonLd ? `${d.jsonLdCount} Blöcke` : 'NICHT VORHANDEN'}`,
    `INTERNE LINKS: ${d.internalLinks} (von ${d.totalLinks} total)`,
    `HEADING-HIERARCHIE: ${d.headingHierarchyValid ? 'Korrekt (startet mit H1)' : headingOrder.length > 0 ? 'Teilweise' : 'Fehlerhaft'}, ${headingOrder.length} Ebenen verwendet`,
    `VIEWPORT: ${d.hasViewport ? 'Vorhanden ✓' : 'FEHLT'}`,
    `LANG-ATTRIBUT: ${d.hasLang ? 'Vorhanden ✓' : 'FEHLT'}`,
    `CONTENT: ${d.contentWords} Wörter (${d.contentLength} Zeichen)`,
    `ROBOTS.TXT: ${d.hasRobotsTxt ? 'Vorhanden ✓' : 'FEHLT (Status: ' + (robotsTxt === null ? '404/Error' : 'Leer/Invalid') + ')'} ${robotsNote}`,
    `SITEMAP.XML: ${d.hasSitemapXml ? `Vorhanden (${sitemapCount} URLs)` : 'FEHLT (Status: ' + (sitemapXml === null ? '404/Error' : 'Leer/Invalid') + ')'}`,
    `NOINDEX: ${d.hasNoindex ? 'JA — Seite wird NICHT indexiert!' : 'Nein (gut)'}`,
  ].join('\n');

  return { baseScore: Math.max(0, Math.min(score, 125)), maxScore: 125, details: d, factBlock };
}

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

// ─── AGENT PROMPTS (v3 — Fact-Injected) ─────────────────
// Each prompt receives pre-computed FAKTEN and uses scoreAdjustment ±10
const AGENT_PROMPTS: Record<string, string> = {
  performance: `Du bist ein Senior Performance Engineer.

Du erhältst VORBERECHNETE FAKTEN zur Website. Diese sind bereits deterministisch berechnet und KORREKT.
Ein Basis-Score wurde berechnet. Deine Aufgabe ist es, diesen Score NICHT NEU zu vergeben, sondern einen scoreAdjustment von -10 bis +10 zu geben.

DEINE AUFGABE:
1. Prüfe ob die Fakten korrekt interpretiert wurden
2. Schätze Core Web Vitals (LCP, FID, CLS, TTFB) anhand der Fakten
3. Gib einen scoreAdjustment mit Begründung
4. Erstelle spezifische Issues basierend auf den FAKTEN

ANTWORTE AUSSCHLIESSLICH mit diesem JSON:
{
  "scoreAdjustment": -10 bis +10,
  "adjustmentReason": "Warum Score angepasst",
  "metrics": {
    "lcp": { "value": "geschätzt ~X.Xs", "status": "gut|mittel|schlecht" },
    "fid": { "value": "geschätzt ~Xms", "status": "gut|mittel|schlecht" },
    "cls": { "value": "geschätzt ~X.XX", "status": "gut|mittel|schlecht" },
    "ttfb": { "value": "geschätzt ~Xms", "status": "gut|mittel|schlecht" }
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret mit Zahlen aus FAKTEN", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze, basierend auf FAKTEN."
}

REGELN:
- scoreAdjustment MUSS zwischen -10 und +10 liegen
- Max 5 Issues, basierend auf den FAKTEN
- KEINE generischen Tipps — nur was die Fakten belegen`,

  seo: `Du bist ein Head of SEO.

Du erhältst VORBERECHNETE FAKTEN mit exakten Zahlen (Title, Description, H1, Bilder, Links, Content, etc.).
Ein Basis-Score wurde BEREITS berechnet — fehlende Elemente sind BEREITS eingepreist.
Dein scoreAdjustment reicht von -5 bis +15.

WICHTIG — NICHT DOPPELT BESTRAFEN:
- Der Basis-Score hat BEREITS Abzüge für fehlende Title, Description, Canonical, OG etc.
- Dein scoreAdjustment soll die QUALITÄT bewerten, nicht nochmal das Fehlen bestrafen
- Wenn viele gute On-Page-Signale vorhanden sind (H1, Links, Content, Headings), gib POSITIVE Anpassung
- SPAs/Client-Side-Rendered Seiten ohne SSR-Meta-Tags werden NICHT nochmal bestraft

DEINE AUFGABE:
1. Bewerte die QUALITÄT der vorhandenen Elemente (H1-Texte, Alt-Texte, Link-Struktur, Content-Tiefe)
2. Wenn Title/Description vorhanden: prüfe ob sie keyword-relevant und überzeugend sind
3. Bewerte die Gesamtstruktur: Heading-Hierarchie, interne Verlinkung, Content-Umfang
4. Gib scoreAdjustment — POSITIV wenn gute Content-Qualität, nur negativ bei echten Qualitätsmängeln

ANTWORTE AUSSCHLIESSLICH mit diesem JSON:
{
  "scoreAdjustment": -5 bis +15,
  "adjustmentReason": "Warum Score angepasst",
  "checks": {
    "metaTitle": { "found": true/false, "value": "EXAKTER Title aus FAKTEN", "quality": "gut|mittel|schlecht" },
    "metaDescription": { "found": true/false, "value": "EXAKTE Description", "quality": "gut|mittel|schlecht" },
    "h1": { "count": ZAHL, "values": ["H1 aus FAKTEN"], "quality": "gut|mittel|schlecht" },
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
- Übernimm die EXAKTEN Zahlen aus den FAKTEN für checks
- scoreAdjustment MUSS zwischen -5 und +15 liegen
- Fehlende Elemente NICHT nochmal negativ bewerten (bereits im Basis-Score)
- Gib +5 bis +15 wenn Content-Qualität, H1, Linking, Struktur gut sind
- Max 5 Issues, fokussiere auf umsetzbare Verbesserungen`,

  security: `Du bist ein Security Analyst.

Du erhältst VORBERECHNETE FAKTEN basierend auf ECHTEN HTTP-Response-Headers.
Ein Basis-Score wurde berechnet. Gib einen scoreAdjustment von -10 bis +10.

DEINE AUFGABE:
1. Die FAKTEN zeigen exakt welche Headers vorhanden/fehlend sind
2. Bewerte ob die vorhandenen Headers korrekt konfiguriert sind
3. Prüfe auf weitere Risiken im HTML (Mixed Content, unsichere Links, etc.)

ANTWORTE AUSSCHLIESSLICH mit diesem JSON:
{
  "scoreAdjustment": -10 bis +10,
  "adjustmentReason": "Warum Score angepasst",
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
- checks MÜSSEN die FAKTEN widerspiegeln
- scoreAdjustment MUSS zwischen -10 und +10 liegen
- Max 5 Issues`,

  accessibility: `Du bist ein WCAG 2.2 Accessibility Auditor.

Du erhältst VORBERECHNETE FAKTEN: Lang-Attribut, Skip-Links, Alt-Text-%, ARIA Labels, Heading-Hierarchie, etc.
Ein Basis-Score wurde berechnet. Gib einen scoreAdjustment von -10 bis +10.

DEINE AUFGABE:
1. Bewerte die QUALITÄT der Accessibility-Maßnahmen über die reinen Zahlen hinaus
2. Prüfe ob ARIA korrekt eingesetzt wird (nicht nur ob vorhanden)
3. Schätze das WCAG-Level basierend auf den Fakten

ANTWORTE AUSSCHLIESSLICH mit diesem JSON:
{
  "scoreAdjustment": -10 bis +10,
  "adjustmentReason": "Warum Score angepasst",
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
- scoreAdjustment MUSS zwischen -10 und +10 liegen
- Nutze Zahlen aus FAKTEN für checks
- Max 5 Issues`,

  ux: `Du bist ein preisgekrönter UI/UX Designer.

Du erhältst VORBERECHNETE FAKTEN: Viewport, Navigation, CTAs, Trust-Signale, Social Media, Footer, Formulare.
Ein Basis-Score wurde berechnet. Gib einen scoreAdjustment von -10 bis +15.

DEINE AUFGABE:
1. Bewerte die QUALITÄT und DESIGN-Wirkung über die Zahlen hinaus
2. Prüfe ob die Navigation logisch strukturiert ist
3. Bewerte ob CTAs überzeugend positioniert und formuliert sind
4. UX hat mehr subjektive Elemente — daher darfst du bis ±15 adjustieren

ANTWORTE AUSSCHLIESSLICH mit diesem JSON:
{
  "scoreAdjustment": -15 bis +15,
  "adjustmentReason": "Warum Score angepasst",
  "checks": {
    "mobileResponsive": true/false,
    "navigation": { "quality": "gut|mittel|schlecht", "depth": ZAHL },
    "cta": { "visible": true/false, "count": ZAHL, "quality": "gut|mittel|schlecht" },
    "trustSignals": { "count": ZAHL, "types": ["Typ1"] },
    "visualHierarchy": "gut|mittel|schlecht"
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- scoreAdjustment zwischen -15 und +15
- Max 5 Issues`,

  content: `Du bist ein Conversion Copywriter.

Du erhältst VORBERECHNETE FAKTEN: Wortanzahl, Satzlänge, Sie/Wir-Ratio, CTA-Texte, Social Proof, Copyright.
Ein Basis-Score wurde berechnet. Gib einen scoreAdjustment von -10 bis +20.

DEINE AUFGABE:
1. Bewerte die ÜBERZEUGUNGSKRAFT der Texte (nicht nur Quantität)
2. Hat die H1 ein klares Nutzenversprechen (UVP)?
3. Sind die CTA-Texte handlungsorientiert?
4. Content hat die meisten subjektiven Elemente — daher bis ±20 Adjustment

ANTWORTE AUSSCHLIESSLICH mit diesem JSON:
{
  "scoreAdjustment": -10 bis +20,
  "adjustmentReason": "Warum Score angepasst",
  "checks": {
    "headline": { "quality": "gut|mittel|schlecht", "hasUVP": true/false },
    "readability": { "score": 0-100, "gradeLevel": "einfach|mittel|komplex", "quality": "gut|mittel|schlecht" },
    "socialProof": { "found": true/false, "types": ["Typ1"] },
    "ctaText": { "quality": "gut|mittel|schlecht", "examples": ["CTA 1"] },
    "freshness": "aktuell|veraltet|unbekannt"
  },
  "issues": [
    { "severity": "kritisch|hoch|mittel|niedrig", "title": "Kurz", "description": "Konkret", "fix": "Lösung" }
  ],
  "summary": "Max 2 Sätze."
}

REGELN:
- scoreAdjustment zwischen -10 und +20
- Zitiere echte Texte
- Max 5 Issues`,
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
  rawHtml: string,
  headers?: Record<string, string>,
  payload?: any
): Promise<AgentResultBase> {
  try {
    const prompt = AGENT_PROMPTS[agentId];
    if (!prompt) throw new Error(`Unknown agent: ${agentId}`);
    const schema = AGENT_SCHEMAS[agentId];

    // ── STEP 1: Compute deterministic facts ──
    const facts = computeFactsForAgent(
      agentId,
      rawHtml,
      content,
      headers || {},
      url,
      content,
      payload.robotsTxt,
      payload.sitemapXml
    );
    const baseScore = facts?.baseScore ?? 50;
    const maxScore = facts?.maxScore ?? 100;

    console.log(`[${agentId}] Facts computed: baseScore=${baseScore}/${maxScore}`);

    // ── STEP 2: Build prompt with FACTS injection ──
    let fullPrompt = prompt;

    // Inject pre-computed facts
    if (facts) {
      const scaledBase = Math.round((baseScore / maxScore) * 100);
      fullPrompt += `\n\n=== VORBERECHNETE FAKTEN (DETERMINISTISCH — KORREKT) ===\n${facts.factBlock}\n\nBasis-Score: ${scaledBase}/100 (berechnet aus ${baseScore}/${maxScore} Punkten)`;
    }

    fullPrompt += `\n\n=== WEBSITE ===\nURL: ${url}\n\n${content}`;

    // Security agent also gets raw HTTP headers
    if (agentId === 'security' && headers) {
      const headerBlock = Object.entries(headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      fullPrompt += `\n\n=== HTTP RESPONSE HEADERS (ECHTE DATEN) ===\n${headerBlock}`;
    }

    // ── STEP 3: Call Gemini ──
    const text = await callGemini(fullPrompt, agentId);

    if (!text) {
      console.warn(`[${agentId}] Empty response from Gemini`);
      const scaledBase = Math.round((baseScore / maxScore) * 100);
      return {
        score: scaledBase,
        summary:
          'KI-Agent konnte keine Antwort generieren. Score basiert auf deterministischer Analyse.',
        issues: [],
      };
    }

    // ── STEP 4: Extract AI response and compute final score ──
    const rawJson = extractJson(text);
    const raw = rawJson as Record<string, unknown>;

    // Extract scoreAdjustment from AI response
    let adjustment = 0;
    if (typeof raw?.scoreAdjustment === 'number') {
      adjustment = raw.scoreAdjustment;
    } else if (typeof raw?.scoreAdjustment === 'string') {
      adjustment = parseInt(raw.scoreAdjustment as string, 10) || 0;
    } else if (typeof raw?.score === 'number') {
      // Fallback: if AI still returns a score instead of adjustment, use it as-is weighted 20%
      const scaledBase = Math.round((baseScore / maxScore) * 100);
      adjustment = Math.round(((raw.score as number) - scaledBase) * 0.2);
    }

    // Clamp adjustment based on agent type (asymmetric ranges)
    const adjRange: Record<string, [number, number]> = {
      seo: [-5, 15],
      content: [-10, 20],
      ux: [-10, 15],
      performance: [-10, 10],
      security: [-10, 10],
      accessibility: [-10, 10],
    };
    const [minAdj, maxAdj] = adjRange[agentId] || [-10, 10];
    adjustment = Math.max(minAdj, Math.min(maxAdj, adjustment));

    // Compute final score: scaled base + adjustment
    const scaledBase = Math.round((baseScore / maxScore) * 100);
    const finalScore = Math.max(0, Math.min(100, scaledBase + adjustment));

    console.log(`[${agentId}] Score: base=${scaledBase} + adj=${adjustment} = final=${finalScore}`);

    // Extract summary and issues
    const summary = typeof raw?.summary === 'string' ? raw.summary : 'Analyse abgeschlossen.';
    const issues = Array.isArray(raw?.issues) ? (raw.issues as AgentResultBase['issues']) : [];

    // Build result with agent-specific fields
    const result: AgentResultBase = {
      score: finalScore,
      summary,
      issues,
      ...(raw?.checks ? { checks: raw.checks } : {}),
      ...(raw?.metrics ? { metrics: raw.metrics } : {}),
      ...(raw?.wcagLevel ? { wcagLevel: raw.wcagLevel } : {}),
    };

    // Try Zod validation — if it fails, still return the manually assembled result
    const zodResult = schema.safeParse({ ...result, score: finalScore });
    if (zodResult.success) {
      return { ...zodResult.data, score: finalScore } as AgentResultBase;
    }

    console.warn(`[${agentId}] Zod partial fail, using manual assembly. Score=${finalScore}`);
    return result;
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
      rawHtml?: string;
      headers?: Record<string, string>;
      issues?: Array<{ severity: string; title: string; description: string }>;
      robotsTxt?: string | null;
      sitemapXml?: string | null;
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
        fetchResult = await fetchWebsite(normalizedUrl, true);
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
      const stack = detectTechStack(fetchResult.html, fetchResult.headers);

      return new Response(
        JSON.stringify({
          success: true,
          html: content,
          rawHtml: fetchResult.html,
          url: fetchResult.redirectUrl || normalizedUrl,
          stack,
          headers: fetchResult.headers,
          robotsTxt: fetchResult.robotsTxt,
          sitemapXml: fetchResult.sitemapXml,
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

      const result = await runAgent(
        agent,
        url || 'N/A',
        html,
        payload.rawHtml || html,
        payload.headers,
        payload
      );

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
