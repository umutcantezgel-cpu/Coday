import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/CalendarClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Community Calendar | Web Design Agency Wetzlar',
      description:
        'Current events and dates from the Coday community in Wetzlar. Networking and knowledge sharing for entrepreneurs and web design enthusiasts in Hesse.',
      path: '/en/community/calendar',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Community Kalender | Webdesign Agentur Wetzlar',
    description:
      'Aktuelle Events und Termine der Coday Community in Wetzlar. Networking und Wissensaustausch für Unternehmer und Webdesign Interessierte in Hessen.',
    path: '/de/community/calendar',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | calendar"
        description="Erfahren Sie mehr über calendar"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
