import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from '@/shared/lib/pick';

export default async function CareerLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const pageMessages = pick(messages as any, ['careers']);

  return <NextIntlClientProvider messages={pageMessages}>{children}</NextIntlClientProvider>;
}
