import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { NotFoundUI } from '@/shared/ui/NotFoundUI';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export default async function GlobalNotFound() {
  const locale = routing.defaultLocale;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${inter.variable}`}>
      <body className="bg-secondary text-white antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NotFoundUI />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
