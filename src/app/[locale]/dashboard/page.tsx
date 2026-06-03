import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return generatePageMetadata({
    title: t('nav.resources.dashboard', { defaultValue: 'Dashboard | Coday' }),
    description: 'Coday Client Dashboard',
    path: `/${locale}/dashboard`,
    type: 'money',
  });
}

export default async function DashboardPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  // For now, we redirect the dashboard to the analyzer or a coming-soon page.
  // The user can implement a real auth-gated dashboard later.
  redirect(`/${params.locale}/analyzer`);
  
  return null;
}
