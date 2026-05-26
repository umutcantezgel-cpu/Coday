import type { Metadata } from 'next';
import { getOrganizationSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { draftMode } from 'next/headers';

import '../globals.css';

import { routing } from '@/i18n/routing';
import MainLayout from '@/widgets/layout/MainLayout';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return generatePageMetadata({
      title: 'High-End Web Development with AI Precision',
      description:
        'AI-augmented web development from Wetzlar, Germany. Next.js, TypeScript, Headless CMS. Fixed prices from €2,000.',
      path: '/en',
      type: 'money',
    });
  }

  return generatePageMetadata({
    title: 'High-End Webentwicklung mit AI-Präzision',
    description:
      'AI-augmented Webentwicklung aus Wetzlar. Next.js, TypeScript, Headless CMS. Festpreise ab 2.000 €.',
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
  const nonce = (await headers()).get('x-nonce') ?? '';
  const orgSchema = getOrganizationSchema();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-secondary text-white antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            nonce={nonce}
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
          <GoogleAnalytics />
          <PostHogAnalytics />
          <MetaPixel />
          <LinkedInInsight />
          <ClarityAnalytics />

          {(await draftMode()).isEnabled && (
            <>
              <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">
                Draft Mode Enabled{' '}
                <a href="/api/draft-mode/disable" className="underline hover:text-blue-100 ml-2">
                  Disable
                </a>
              </div>
            </>
          )}
          <div className="flex flex-col min-h-screen">
            <MainLayout>{children}</MainLayout>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
