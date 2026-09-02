import { permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default async function WikiRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  // Permanent: this path has no page of its own and never will.
  permanentRedirect(`/${_locale}/knowledge/wikihub`);
}
