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
  return generatePageMetadata({
    title:
      locale === 'de'
        ? 'Termin buchen | Kostenloses Erstgespräch | Coday Wetzlar'
        : 'Book Appointment | Free Consultation | Coday Wetzlar',
    description:
      locale === 'de'
        ? 'Buchen Sie jetzt Ihr kostenloses 30-minütiges Beratungsgespräch mit Coday aus Wetzlar. Webdesign, Entwicklung und SEO — persönlich und unverbindlich.'
        : 'Book your free 30-minute consultation with Coday from Wetzlar, Germany. Web design, development and SEO — personal and no obligation.',
    path: `/${locale}/booking`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Termin buchen | Coday"
        description="Kostenloses 30-minütiges Beratungsgespräch mit Coday aus Wetzlar buchen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
