import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from '@/shared/lib/pick';

import { setRequestLocale } from 'next-intl/server';

export default async function IndustriesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const pageMessages = pick(messages as any, [
    'industries',
    'public-sector',
    'common',
    'faq',
    'form',
    'cookie',
    'blog',
    'career',
    'booking',
  ]);

  return <NextIntlClientProvider messages={pageMessages}>{children}</NextIntlClientProvider>;
}
