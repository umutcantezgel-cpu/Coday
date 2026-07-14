import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from '@/shared/lib/pick';

export default async function IndustriesLayout({ children }: { children: React.ReactNode }) {
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
