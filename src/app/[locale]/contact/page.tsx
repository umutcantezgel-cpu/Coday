import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactClient } from '@/features/contact/ui/ContactClient';
import { SeoHead } from '@/shared/ui/SeoHead';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Contact Us | Web Design Agency Wetzlar Hesse',
      description:
        'Get in touch with Coday, your web design agency in Wetzlar, Hesse. Free initial consultation on-site or via video call. We reply within 24 hours.',
      path: '/en/contact',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Kontakt | Webdesign Agentur Wetzlar Mittelhessen',
    description:
      'Nehmen Sie Kontakt zu Coday auf, Ihrer Webdesign Agentur in Wetzlar. Kostenloses Erstgespräch vor Ort oder per Video. Antwort innerhalb von 24 Stunden.',
    path: '/de/contact',
    type: 'money',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Contact Us | Web Design Agency Wetzlar Hesse | Coday'
      : 'Kontakt | Webdesign Agentur Wetzlar Mittelhessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Get in touch with Coday, your web design agency in Wetzlar, Hesse. Free initial consultation on-site or via video call. We reply within 24 hours.'
      : 'Nehmen Sie Kontakt zu Coday auf, Ihrer Webdesign Agentur in Wetzlar. Kostenloses Erstgespräch vor Ort oder per Video. Antwort innerhalb von 24 Stunden.';
  return (
    <>
      <SeoHead
        title="Kontakt aufnehmen | Coday Webdesign Wetzlar"
        description="Sprechen Sie mit Coday aus Wetzlar, Hessen über Ihr nächstes Webprojekt. Wir entwickeln High-Performance Websites und Apps für Ihren digitalen Erfolg."
        pageType="contact"
      />
      <ContactClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
