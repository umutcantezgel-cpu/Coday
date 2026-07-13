import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BrandIdentityClient } from '@/features/services/ui/BrandIdentityClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Corporate Design & Branding Agency | Wetzlar',
      description:
        'Strong brand identity and corporate design by Coday in Wetzlar. Logo, colors and typography for your business in Hesse. Start building your brand now.',
      path: '/en/services/design/brand-identity',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Corporate Design & Branding Agentur | Wetzlar',
    description:
      'Starke Markenidentität und Corporate Design von Coday in Wetzlar. Logo, Farben und Typografie für Ihr Unternehmen in Hessen. Jetzt Marke gestalten.',
    path: '/de/services/design/brand-identity',
    type: 'money',
  });
}

export default async function BrandIdentityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Corporate Design & Branding Agency | Wetzlar | Coday'
      : 'Corporate Design & Branding Agentur | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Strong brand identity and corporate design by Coday in Wetzlar. Logo, colors and typography for your business in Hesse. Start building your brand now.'
      : 'Starke Markenidentität und Corporate Design von Coday in Wetzlar. Logo, Farben und Typografie für Ihr Unternehmen in Hessen. Jetzt Marke gestalten.';
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
      <script
        id="schema-brand-identity"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Corporate Design & Branding Agentur | Wetzlar',
                description:
                  'Starke Markenidentität und Corporate Design von Coday in Wetzlar. Logo, Farben und Typografie für Ihr Unternehmen in Hessen. Jetzt Marke gestalten.',
                url: `${BASE_URL}/de/services/design/brand-identity`,
              }),
            ],
          }),
        }}
      />
      <BrandIdentityClient />
    </>
  );
}
