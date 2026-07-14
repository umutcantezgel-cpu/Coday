import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { getOrganizationSchema, getProcessSchema } from '@/lib/schema';
import ClientComponent from '@/features/process/ui/ProcessClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Our Web Design Process | How We Work in Wetzlar | Coday'
      : 'Unser Webdesign Prozess | So arbeiten wir in Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'From first meeting to launch. Learn how Coday in Wetzlar delivers your web project. Personal, structured and always at the agreed fixed price point.'
      : 'Vom Erstgespräch bis zum Launch. Erfahren Sie wie Coday in Wetzlar Ihr Webprojekt umsetzt. Persönlich, strukturiert und immer zum vereinbarten Festpreis.';
  return (
    <>
      <script
        id="schema-process"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [getOrganizationSchema(), getProcessSchema()],
          }),
        }}
      />
      <SeoHead
        title="Coday | process"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
      <SeoContentBlock />
    </>
  );
}
