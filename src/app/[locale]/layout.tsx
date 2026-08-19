import type { Metadata } from 'next';

import { generatePageMetadata } from '@/lib/metadata';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Outfit } from 'next/font/google';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { pick } from '@/shared/lib/pick';

import '../globals.css';

import { routing } from '@/i18n/routing';
import MainLayout from '@/widgets/layout/MainLayout';
import { MotionProvider } from '@/shared/ui/providers/MotionProvider';
import { GoogleAnalytics } from '@/shared/lib/analytics/GoogleAnalytics';
import { PostHogAnalytics } from '@/shared/lib/analytics/PostHogAnalytics';
import { MetaPixel } from '@/shared/lib/analytics/MetaPixel';
import { LinkedInInsight } from '@/shared/lib/analytics/LinkedInInsight';
import { ClarityAnalytics } from '@/shared/lib/analytics/ClarityAnalytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Wetzlar | Web Development Wetzlar | Coday Web',
      description:
        'Coday is your web design agency in Wetzlar and Central Hesse. Fast, modern websites at a fixed price with personal support. Get your free consultation.',
      path: '/en',
      type: 'money',
    });
  }

  return generatePageMetadata({
    title: 'Webdesign Wetzlar | Webentwicklung Wetzlar | Coday Web',
    description:
      'Coday ist Ihre Webdesign Agentur in Wetzlar und Mittelhessen. Schnelle, moderne Webseiten zum Festpreis mit persönlicher Betreuung. Jetzt beraten lassen.',
    path: '/de',
    type: 'money',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.trustedTypes && trustedTypes.createPolicy) {
                trustedTypes.createPolicy('default', {
                  createHTML: (string) => string,
                  createScript: (string) => string,
                  createScriptURL: (string) => string,
                });
              }
            `,
          }}
        />
      </head>

      <body
        className="bg-[#fafafa] text-slate-900 antialiased font-sans selection:bg-amber-500/20 selection:text-amber-900"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MotionProvider>
            <div className="flex flex-col min-h-screen">
              <MainLayout>{children}</MainLayout>
            </div>
          </MotionProvider>
        </NextIntlClientProvider>

        <Suspense fallback={null}>
          <GoogleAnalytics />
          <PostHogAnalytics />
          <MetaPixel />
          <LinkedInInsight />
          <ClarityAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
