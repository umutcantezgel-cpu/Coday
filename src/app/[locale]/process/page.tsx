import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/process/ui/ProcessClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Web Design Process | How We Work in Wetzlar',
      description:
        'From first meeting to launch. Learn how Coday in Wetzlar delivers your web project. Personal, structured and always at the agreed fixed price point.',
      path: '/en/process',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unser Webdesign Prozess | So arbeiten wir in Wetzlar',
    description:
      'Vom Erstgespräch bis zum Launch. Erfahren Sie wie Coday in Wetzlar Ihr Webprojekt umsetzt. Persönlich, strukturiert und immer zum vereinbarten Festpreis.',
    path: '/de/process',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | process"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
