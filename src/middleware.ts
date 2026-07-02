import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith('/en')) {
    url.pathname = url.pathname.replace(/^\/en/, '/de');
    return NextResponse.redirect(url, 301);
  }
  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(de|en)/:path*', '/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
