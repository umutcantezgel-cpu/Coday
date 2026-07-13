import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getPricingSchema } from '@/lib/schema';
import Packages from '@/features/pricing/ui/Packages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Prices Wetzlar | Transparent Plans',
      description:
        'Clear fixed prices for your web design project in Wetzlar and Central Hesse. No hidden costs and fully transparent packages. Request your free quote.',
      path: '/en/pricing',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Preise Wetzlar | Transparente Pakete',
    description:
      'Klare Festpreise für Ihr Webdesign in Wetzlar und Mittelhessen. Keine versteckten Kosten, faire Pakete. Jetzt unverbindlich Ihr Angebot anfragen.',
    path: '/de/pricing',
    type: 'money',
  });
}

export default function PricingPage() {
  const _locale: string = 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Prices Wetzlar | Transparent Plans | Coday'
      : 'Webdesign Preise Wetzlar | Transparente Pakete | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Clear fixed prices for your web design project in Wetzlar and Central Hesse. No hidden costs and fully transparent packages. Request your free quote.'
      : 'Klare Festpreise für Ihr Webdesign in Wetzlar und Mittelhessen. Keine versteckten Kosten, faire Pakete. Jetzt unverbindlich Ihr Angebot anfragen.';
  return (
    <>
      <script
        id="schema-pricing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [getOrganizationSchema(), getPricingSchema()],
          }),
        }}
      />
      <Packages />
    </>
  );
}
