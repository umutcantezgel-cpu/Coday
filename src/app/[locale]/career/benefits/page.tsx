import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/BenefitsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Career & Benefits | Web Design Agency Wetzlar',
      description:
        'Work at Coday in Wetzlar. Attractive benefits, modern work environment and exciting web design projects in Central Hesse. Meet the team today.',
      path: '/en/career/benefits',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Karriere & Benefits | Webdesign Agentur Wetzlar',
    description:
      'Arbeiten bei Coday in Wetzlar. Attraktive Benefits, modernes Arbeitsumfeld und spannende Webdesign Projekte in Mittelhessen. Jetzt Team kennenlernen.',
    path: '/de/career/benefits',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Career & Benefits | Web Design Agency Wetzlar | Coday'
      : 'Karriere & Benefits | Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Work at Coday in Wetzlar. Attractive benefits, modern work environment and exciting web design projects in Central Hesse. Meet the team today.'
      : 'Arbeiten bei Coday in Wetzlar. Attraktive Benefits, modernes Arbeitsumfeld und spannende Webdesign Projekte in Mittelhessen. Jetzt Team kennenlernen.';
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
        title="Coday | benefits"
        description="Erfahren Sie mehr über benefits"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
