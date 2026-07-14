import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/EventsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Events | Web Design Community Wetzlar Hesse',
      description:
        'Web design events and digital meetups by Coday in Wetzlar. Workshops, meetups and talks for the business community across Central Hesse region.',
      path: '/en/community/events',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Events & Veranstaltungen | Webdesign Wetzlar',
    description:
      'Webdesign Events und digitale Veranstaltungen von Coday in Wetzlar. Workshops, Meetups und Vorträge für die Business Community in Mittelhessen.',
    path: '/de/community/events',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Events | Web Design Community Wetzlar Hesse | Coday'
      : 'Events & Veranstaltungen | Webdesign Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Web design events and digital meetups by Coday in Wetzlar. Workshops, meetups and talks for the business community across Central Hesse region.'
      : 'Webdesign Events und digitale Veranstaltungen von Coday in Wetzlar. Workshops, Meetups und Vorträge für die Business Community in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | events"
        description="Erfahren Sie mehr über events"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="sr-only">{_seoTitle}</p>
      </div>
    </>
  );
}
