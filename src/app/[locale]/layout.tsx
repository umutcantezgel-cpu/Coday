import type { Metadata } from 'next';

import { generatePageMetadata } from '@/lib/metadata';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Outfit } from 'next/font/google';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

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
  display: 'optional',
  preload: true,
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'optional',
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design & Development Wetzlar | Fixed Price',
      description:
        'Coday is your web design agency in Wetzlar and Central Hesse. Fast, modern websites at a fixed price with personal support. Get your free consultation.',
      path: '/en',
      type: 'money',
    });
  }

  return generatePageMetadata({
    title: 'Webdesign & Webentwicklung Wetzlar | Festpreis',
    description:
      'Coday ist Ihre Webdesign Agentur in Wetzlar und Mittelhessen. Schnelle, moderne Webseiten zum Festpreis mit persönlicher Betreuung. Jetzt beraten lassen.',
    path: '/de',
    type: 'money',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { pick } from '@/shared/lib/pick';

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

  // Only pass global namespaces to the root Client Provider
  // Page-specific components will receive their own Provider
  const globalMessages = pick(messages as any, [
    'common',
    'error',
    'nav',
    'footer',
    'social',
    'faq',
    'form',
    'cookie',
    'blog',
    'industries',
    'career',
    'booking',
    'public-sector',
  ]);

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head />

      <body className="bg-secondary text-white antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={globalMessages} locale={locale}>
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
