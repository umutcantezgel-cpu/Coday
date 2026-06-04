import type { Metadata } from 'next';
import { getOrganizationSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Outfit } from 'next/font/google';
import { headers } from 'next/headers';
import { draftMode } from 'next/headers';

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
      title: 'Premium Web Design & Development Agency in Wetzlar & Hessen',
      description:
        'The leading web agency in Wetzlar and Hessen. We build high-performance, modern websites using Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Results that speak for themselves.',
      path: '/en',
      type: 'money',
    });
  }

  return generatePageMetadata({
    title: 'Die führende Webagentur in Wetzlar & Hessen | Coday',
    description:
      'Ihre beste Webdesign und Webentwicklungsagentur im Raum Wetzlar und Hessen. Hochperformante Next.js, React, TypeScript, Tailwind & Framer Motion Webseiten. Unvergleichbare Ergebnisse.',
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
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
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

          {(await draftMode()).isEnabled && (
            <>
              <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">
                Draft Mode Enabled{' '}
                <a
                  href="/api/draft-mode/disable"
                  className="underline hover:text-blue-100 ml-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
                  aria-label="Disable draft mode"
                >
                  Disable
                </a>
              </div>
            </>
          )}
          <MotionProvider>
            <div className="flex flex-col min-h-screen">
              <MainLayout>{children}</MainLayout>
            </div>
          </MotionProvider>
        </NextIntlClientProvider>

        <GoogleAnalytics />
        <PostHogAnalytics />
        <MetaPixel />
        <LinkedInInsight />
        <ClarityAnalytics />
      </body>
    </html>
  );
}
