import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from '@/shared/lib/pick';

export default async function ServicesLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const pageMessages = pick(messages as any, [
    'services',
    'consulting',
    'common',
    'faq',
    'form',
    'cookie',
    'blog',
    'industries',
    'career',
    'booking',
    'public-sector',
  ]);

  return <NextIntlClientProvider messages={pageMessages}>{children}</NextIntlClientProvider>;
}
