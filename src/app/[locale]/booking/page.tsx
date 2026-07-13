import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/booking/ui/BookingClient';

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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
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
        title="Termin buchen | Coday"
        description="Kostenloses 30-minütiges Beratungsgespräch mit Coday aus Wetzlar buchen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
