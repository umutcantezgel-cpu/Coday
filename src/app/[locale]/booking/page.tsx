import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/booking/ui/BookingClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Book Free Consultation | Web Design Wetzlar',
      description:
        'Book your free 30-minute consultation with Coday in Wetzlar. Web design, SEO and development for local businesses in Hesse. Personal and no obligation.',
      path: '/en/booking',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Erstgespräch buchen | Webdesigner Wetzlar Hessen',
    description:
      'Buchen Sie Ihr kostenloses 30-Minuten-Beratungsgespräch mit Coday in Wetzlar. Webdesign, SEO und Entwicklung. Persönlich und unverbindlich anfragen.',
    path: '/de/booking',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Book Free Consultation | Web Design Wetzlar | Coday'
      : 'Erstgespräch buchen | Webdesigner Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Book your free 30-minute consultation with Coday in Wetzlar. Web design, SEO and development for local businesses in Hesse. Personal and no obligation.'
      : 'Buchen Sie Ihr kostenloses 30-Minuten-Beratungsgespräch mit Coday in Wetzlar. Webdesign, SEO und Entwicklung. Persönlich und unverbindlich anfragen.';
  return (
    <>
      <SeoHead
        title="Termin buchen | Coday"
        description="Kostenloses 30-minütiges Beratungsgespräch mit Coday aus Wetzlar buchen."
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
