import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
// @ts-expect-error — turndown-plugin-gfm has no type declarations
import { gfm } from 'turndown-plugin-gfm';

const BASE_URL = 'https://www.codayweb.de';

/**
 * Generates a YAML-style metadata preamble for AI crawlers.
 * Provides source attribution, licensing, and canonical origin.
 */
function buildPreamble(originalUrlPath: string): string {
  const canonicalUrl = `${BASE_URL}${originalUrlPath || '/'}`;
  return [
    '---',
    `source: ${canonicalUrl}`,
    'generator: Coday GEO Markdown Mirror',
    'license: CC BY-ND 4.0',
    `attribution: "Source: Coday (${BASE_URL})"`,
    '---',
    '',
    '',
  ].join('\n');
}

/**
 * Converts rendered HTML to clean, LLM-optimized Markdown.
 *
 * Pipeline:
 *   1. Parse HTML via Cheerio
 *   2. Replace interactive elements with descriptive blockquote fallbacks
 *   3. Sanitize non-content DOM nodes (nav, footer, scripts, modals, etc.)
 *   4. Resolve all relative URLs to absolute codayweb.de paths
 *   5. Convert clean HTML subtree to GFM via Turndown
 *   6. Prepend metadata preamble
 */
export function convertHtmlToMarkdown(html: string, originalUrlPath: string): string {
  // 1. Parse HTML via Cheerio
  const $ = cheerio.load(html);

  // 2. Interactive Component Fallbacks (Edge-Case Substitution)
  // Forms, charts, calculators, iframes, select, video, audio
  $('form, iframe, .rechner, .chart, select, video, audio').each((_, el) => {
    const $el = $(el);
    const tagName = el.tagName.toLowerCase();
    const name = $el.attr('aria-label') || $el.attr('title') || tagName;
    const fallbackText = `\n> **Interaktive Komponente:** ${name}. Im reinen Textformat nicht ausführbar. Siehe Original: ${BASE_URL}${originalUrlPath}\n`;
    $el.replaceWith(fallbackText);
  });

  // Canvas / WebGL fallback
  $('canvas').each((_, el) => {
    const $el = $(el);
    const ariaLabel = $el.attr('aria-label') || $el.attr('alt') || 'Canvas / WebGL Element';
    const fallbackText = `\n> **Interaktive Komponente:** Canvas — ${ariaLabel}. Siehe Original: ${BASE_URL}${originalUrlPath}\n`;
    $el.replaceWith(fallbackText);
  });

  // Details/Summary — expand inline instead of hiding
  $('details').each((_, el) => {
    const $el = $(el);
    const summary = $el.find('summary').text() || 'Details';
    const content = $el.find('summary').remove().end().text().trim();
    $el.replaceWith(`\n**${summary}**\n\n${content}\n`);
  });

  // 3. Sanitization: Remove non-content elements
  $(
    'nav, footer, aside, script, style, .cookie-banner, .sr-only, ' +
      '[role="dialog"], [aria-modal="true"], button, .floating-action, ' +
      'noscript, [data-nomarkdown]'
  ).remove();

  // 4. Path Resolver: Set all href and src to absolute URLs
  $('a[href]').each((_, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    if (href && href.startsWith('/')) {
      $el.attr('href', `${BASE_URL}${href}`);
    }
  });
  $('img[src]').each((_, el) => {
    const $el = $(el);
    const src = $el.attr('src');
    if (src && src.startsWith('/')) {
      $el.attr('src', `${BASE_URL}${src}`);
    }
    // Ensure all images have alt text
    if (!$el.attr('alt')) {
      $el.attr('alt', 'Image');
    }
  });

  // Extract clean body HTML
  const cleanHtml = $('body').html() || '';

  // 5. Convert to Markdown using Turndown with GFM support
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  });

  // Register GFM plugin (tables, strikethrough, task lists)
  turndownService.use(gfm);

  // Custom rule: skip empty links
  turndownService.addRule('skipEmptyLinks', {
    filter: (node) => node.nodeName === 'A' && !node.textContent?.trim(),
    replacement: () => '',
  });

  const markdown = turndownService.turndown(cleanHtml);

  // 6. Prepend metadata preamble
  return buildPreamble(originalUrlPath) + markdown;
}
