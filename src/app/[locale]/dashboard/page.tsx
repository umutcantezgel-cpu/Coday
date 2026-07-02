import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Client Portal & Dashboard | Web Design Wetzlar',
      description:
        'Your personal Coday client portal. Project progress, files and communication in one place. For web design clients in Wetzlar and Central Hesse.',
      path: '/en/dashboard',
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Kundenportal & Dashboard | Webdesign Agentur Wetzlar',
    description:
      'Ihr persönliches Coday Kundenportal. Projektfortschritt, Dateien und Kommunikation an einem Ort. Für Webdesign Kunden in Wetzlar und Mittelhessen.',
    path: '/de/dashboard',
    type: 'noindex',
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
