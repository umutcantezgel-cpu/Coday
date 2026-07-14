import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/GesundheitClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Doctors & Practices | Wetzlar Area',
      description:
        'Professional practice websites for doctors in Wetzlar and Hesse. Patient acquisition through modern web design and local search optimization. Inquire.',
      path: '/en/industries/gesundheit',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen | Raum Wetzlar',
    description:
      'Professionelle Praxis-Webseiten für Ärzte in Wetzlar und Hessen. Patientengewinnung durch modernes Webdesign und lokale Suchoptimierung. Jetzt anfragen.',
    path: '/de/industries/gesundheit',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors & Practices | Wetzlar Area | Coday'
      : 'Webdesign für Ärzte & Praxen | Raum Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional practice websites for doctors in Wetzlar and Hesse. Patient acquisition through modern web design and local search optimization. Inquire.'
      : 'Professionelle Praxis-Webseiten für Ärzte in Wetzlar und Hessen. Patientengewinnung durch modernes Webdesign und lokale Suchoptimierung. Jetzt anfragen.';
  return (
    <>
      <SeoHead
        title="Coday | gesundheit"
        description="Erfahren Sie mehr über gesundheit"
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
