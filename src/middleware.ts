import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 410 Gone für alle /ai/ Pfade (SEO Cleanup)
  if (pathname.match(/^\/(de|en)\/ai(\/.*)?$/) || pathname.match(/^\/ai(\/.*)?$/)) {
    return new NextResponse('Gone - This page has been permanently removed.', { status: 410 });
  }

  // Redirect double locales (e.g., /de/en -> /en, /en/de -> /de)
  const doubleLocaleMatch = pathname.match(/^\/(de|en)\/(de|en)(\/.*)?$/);
  if (doubleLocaleMatch) {
    const targetLocale = doubleLocaleMatch[2];
    const rest = doubleLocaleMatch[3] || '';
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${targetLocale}${rest}`;
    return NextResponse.redirect(newUrl);
  }

  // next-intl alternate links are disabled in routing.ts (alternateLinks: false),
  // so no Link-header cleanup is needed here anymore.
  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(de|en)/:path*', '/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
