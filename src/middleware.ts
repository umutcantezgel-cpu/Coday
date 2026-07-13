import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 410 Gone für alle /ai/ Pfade (SEO Cleanup)
  if (pathname.match(/^\/(de|en)\/ai\//) || pathname.match(/^\/ai\//)) {
    return new NextResponse('Gone - This page has been permanently removed.', { status: 410 });
  }

  // Redirect /en/ local pages to /de/ to avoid duplicate content (as they are German targeted)
  const localPathsRegex =
    /^\/en\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker)(\/.*)?$/;
  const match = pathname.match(localPathsRegex);
  if (match) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/en\//, '/de/');
    return NextResponse.redirect(newUrl);
  }

  const response = handleI18nRouting(request);

  // Remove the `Link` header (injected by next-intl with hreflang alternates) for local paths
  // to avoid exposing the /en/ URLs to search engines, as they redirect back to /de/
  const localPathsRegexDe =
    /^\/de\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker)(\/.*)?$/;
  if (pathname.match(localPathsRegexDe)) {
    response.headers.delete('Link');
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(de|en)/:path*', '/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
