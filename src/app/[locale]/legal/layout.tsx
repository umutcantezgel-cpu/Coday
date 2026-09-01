import { setRequestLocale } from 'next-intl/server';
import { RouteMessages } from '@/i18n/RouteMessages';

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <RouteMessages family="legal" locale={locale}>
      {children}
    </RouteMessages>
  );
}
