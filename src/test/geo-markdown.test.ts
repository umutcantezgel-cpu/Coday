import { describe, it, expect } from 'vitest';
import { convertHtmlToMarkdown } from '@/shared/lib/markdown-handler';

// Import the AI crawler regex from entry.server
// We duplicate it here since entry.server.tsx is JSX and harder to import in vitest
const AI_CRAWLER_REGEX =
  /(OAI-SearchBot|PerplexityBot|ClaudeBot|ChatGPT-User|Google-Extended|Amazonbot|Applebot-Extended|CCBot|Bytespider|FacebookBot|Gemini-Bot|cohere-ai)/i;

describe('Phase 24: GEO Markdown Mirror', () => {
  // ────────────────────────────────────────────────────────────
  // AI Crawler Detection (5 tests)
  // ────────────────────────────────────────────────────────────
  describe('AI Crawler Regex', () => {
    it('matches OAI-SearchBot', () => {
      expect(AI_CRAWLER_REGEX.test('Mozilla/5.0 (compatible; OAI-SearchBot/1.0)')).toBe(true);
    });

    it('matches PerplexityBot', () => {
      expect(AI_CRAWLER_REGEX.test('Mozilla/5.0 PerplexityBot/2.0')).toBe(true);
    });

    it('matches ClaudeBot', () => {
      expect(AI_CRAWLER_REGEX.test('ClaudeBot/1.0 (Anthropic)')).toBe(true);
    });

    it('matches Google-Extended', () => {
      expect(
        AI_CRAWLER_REGEX.test(
          'Mozilla/5.0 (compatible; Google-Extended; +http://www.google.com/bot.html)'
        )
      ).toBe(true);
    });

    it('does NOT match normal Chrome user-agent', () => {
      expect(
        AI_CRAWLER_REGEX.test(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        )
      ).toBe(false);
    });
  });

  // ────────────────────────────────────────────────────────────
  // Markdown Conversion (5 tests)
  // ────────────────────────────────────────────────────────────
  describe('convertHtmlToMarkdown', () => {
    it('strips nav, footer, script, and style elements', () => {
      const html = `
        <html><body>
          <nav>Navigation</nav>
          <h1>Hello</h1>
          <footer>Footer</footer>
          <script>alert('x')</script>
          <style>.x{color:red}</style>
        </body></html>
      `;
      const md = convertHtmlToMarkdown(html, '/test');
      expect(md).toContain('# Hello');
      expect(md).not.toContain('Navigation');
      expect(md).not.toContain('Footer');
      expect(md).not.toContain('alert');
      expect(md).not.toContain('color:red');
    });

    it('replaces <form> with interactive component fallback', () => {
      const html = `
        <html><body>
          <h1>Contact</h1>
          <form aria-label="Contact Form"><input type="text" /></form>
        </body></html>
      `;
      const md = convertHtmlToMarkdown(html, '/contact');
      expect(md).toContain('Interaktive Komponente');
      expect(md).toContain('Contact Form');
      expect(md).toContain('codayweb.de/contact');
    });

    it('replaces <canvas> with aria-label fallback text', () => {
      const html = `
        <html><body>
          <canvas aria-label="Performance Chart 2026"></canvas>
        </body></html>
      `;
      const md = convertHtmlToMarkdown(html, '/benchmarks');
      expect(md).toContain('Performance Chart 2026');
      expect(md).toContain('Canvas');
    });

    it('converts relative URLs to absolute codayweb.de URLs', () => {
      const html = `
        <html><body>
          <a href="/de/services">Services</a>
          <img src="/images/logo.png" alt="Logo" />
        </body></html>
      `;
      const md = convertHtmlToMarkdown(html, '/');
      expect(md).toContain('https://www.codayweb.de/de/services');
      expect(md).toContain('https://www.codayweb.de/images/logo.png');
    });

    it('produces metadata preamble with source and license', () => {
      const html = `<html><body><h1>Test</h1></body></html>`;
      const md = convertHtmlToMarkdown(html, '/de/services');
      expect(md).toContain('---');
      expect(md).toContain('source: https://www.codayweb.de/de/services');
      expect(md).toContain('license: CC BY-ND 4.0');
      expect(md).toContain('attribution:');
    });
  });
});
