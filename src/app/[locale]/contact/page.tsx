import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactClient } from '@/features/contact/ui/ContactClient';
import { SeoHead } from '@/shared/ui/SeoHead';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Kontakt aufnehmen | Coday Webdesign Wetzlar',
    description: 'Sprechen Sie mit Coday aus Wetzlar, Hessen über Ihr nächstes Webprojekt. Wir entwickeln High-Performance Websites und Apps für Ihren digitalen Erfolg.',
    path: `/${locale}`,
    type: 'money',
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return (
    <>
      <SeoHead
        title="Kontakt aufnehmen | Coday Webdesign Wetzlar"
        description="Sprechen Sie mit Coday aus Wetzlar, Hessen über Ihr nächstes Webprojekt. Wir entwickeln High-Performance Websites und Apps für Ihren digitalen Erfolg."
        pageType="contact"
      />
      <ContactClient />
    </>
  );
}
