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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Community Calendar | Web Design Agency Wetzlar | Coday'
      : 'Community Kalender | Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Current events and dates from the Coday community in Wetzlar. Networking and knowledge sharing for entrepreneurs and web design enthusiasts in Hesse.'
      : 'Aktuelle Events und Termine der Coday Community in Wetzlar. Networking und Wissensaustausch für Unternehmer und Webdesign Interessierte in Hessen.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
      <SeoHead
        title="Coday | calendar"
        description="Erfahren Sie mehr über calendar"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
