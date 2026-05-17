import { PassThrough } from 'stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { renderToPipeableStream } from 'react-dom/server';
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';
import { createI18n } from '@/i18n.server';
import { I18nextProvider } from 'react-i18next';
import { convertHtmlToMarkdown } from '@/shared/lib/markdown-handler';

// Regex to match AI crawlers — kept as named export for unit testing
export const AI_CRAWLER_REGEX =
  /(OAI-SearchBot|PerplexityBot|ClaudeBot|ChatGPT-User|Google-Extended|Amazonbot|Applebot-Extended|CCBot|Bytespider|FacebookBot|Gemini-Bot|cohere-ai)/i;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: unknown
) {
  // Simple language detection from URL
  const url = new URL(request.url);
  const lng = url.pathname.startsWith('/en') ? 'en' : 'de';
  const i18n = await createI18n(lng);

  const userAgent = request.headers.get('user-agent') || '';
  const acceptHeader = request.headers.get('accept') || '';
  const isMarkdownRequest = url.pathname.endsWith('.md');
  const isAiCrawler = AI_CRAWLER_REGEX.test(userAgent);
  const expectsMarkdown =
    acceptHeader.includes('text/markdown') || isMarkdownRequest || isAiCrawler;

  // Browser Fallback (Teilaufgabe 03.2)
  // If a .md URL is hit by a normal browser (not AI crawler, not requesting markdown),
  // 301-redirect to the clean URL to prevent Google from indexing markdown paths.
  if (isMarkdownRequest && !isAiCrawler && !acceptHeader.includes('text/markdown')) {
    const cleanUrl = url.pathname.replace(/\.md$/, '');
    return Response.redirect(new URL(cleanUrl || '/', url.origin).toString(), 301);
  }

  // AI Crawler Hit Logging (Teilaufgabe 07.1)
  // Vercel captures stdout — queryable via Vercel Logs dashboard
  if (isAiCrawler) {
    console.log(
      `[GEO] AI Crawler Hit | UA: ${userAgent.slice(0, 80)} | Path: ${url.pathname} | Time: ${new Date().toISOString()}`
    );
  }

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let htmlBuffer = '';

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18n}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>,
      {
        onShellReady() {
          shellRendered = true;
          // If expecting markdown, we DO NOT resolve here. We wait for onAllReady.
          if (!expectsMarkdown) {
            const body = new PassThrough();
            const stream = createReadableStreamFromReadable(body);

            responseHeaders.set('Content-Type', 'text/html');

            resolve(
              new Response(stream, {
                headers: responseHeaders,
                status: responseStatusCode,
              })
            );

            pipe(body);
          }
        },
        onAllReady() {
          // If we are expecting markdown, wait until EVERYTHING is ready, buffer it, then convert
          if (expectsMarkdown) {
            const body = new PassThrough();

            body.on('data', (chunk) => {
              htmlBuffer += chunk.toString();
            });

            body.on('end', () => {
              try {
                // Determine original URL path
                const originalUrlPath = url.pathname.replace(/\.md$/, '');

                // Convert to Markdown
                const markdown = convertHtmlToMarkdown(htmlBuffer, originalUrlPath);

                // SEO Protection Headers (Teilaufgabe 03.1)
                responseHeaders.set('Content-Type', 'text/markdown; charset=utf-8');
                responseHeaders.set(
                  'Link',
                  `<https://www.codayweb.de${originalUrlPath}>; rel="canonical"`
                );
                responseHeaders.set('X-Robots-Tag', 'noindex, noarchive');
                responseHeaders.set(
                  'Cache-Control',
                  'public, s-maxage=3600, stale-while-revalidate=86400'
                );
                responseHeaders.set('Vary', 'Accept, User-Agent');

                resolve(
                  new Response(markdown, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                  })
                );
              } catch (error) {
                // Graceful degradation: serve raw HTML on conversion failure
                console.error('[GEO] Markdown conversion failed, falling back to HTML', error);
                responseHeaders.set('Content-Type', 'text/html');
                resolve(
                  new Response(htmlBuffer, {
                    headers: responseHeaders,
                    status: 200,
                  })
                );
              }
            });

            pipe(body);
          }
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered && !expectsMarkdown) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, 10000);
  });
}
