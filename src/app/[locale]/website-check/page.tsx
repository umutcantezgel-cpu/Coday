import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { WebsiteCheckForm } from '@/features/lead/ui/WebsiteCheckForm';
import { CheckCircle, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lead' });
  return generatePageMetadata({
    title: t('website_check.meta_title'),
    description: t('website_check.meta_description'),
    keywords:
      locale === 'en'
        ? ['Free website check', 'Website review', 'Website analysis Wetzlar']
        : ['Kostenloser Website-Check', 'Website prüfen lassen', 'Website Analyse Wetzlar'],
    path: `/${locale}/website-check`,
    type: 'money',
  });
}

interface HowStep {
  title: string;
  text: string;
}

export default async function WebsiteCheckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'lead' });
  const checks = t.raw('website_check.checks') as string[];
  const how = t.raw('website_check.how') as HowStep[];

  const pageUrl = `${BASE_URL}/${locale}/website-check`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getBreadcrumbSchema(
        [
          { name: locale === 'en' ? 'Home' : 'Startseite', url: `/${locale}` },
          { name: t('website_check.heading'), url: `/${locale}/website-check` },
        ],
        pageUrl
      ),
      getWebPageSchema({
        url: pageUrl,
        name: t('website_check.meta_title'),
        description: t('website_check.meta_description'),
        locale,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-website-check"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-[100dvh] bg-[#fafafa] text-slate-900">
        <section className="px-4 pt-4 pb-16 lg:pt-8 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <Breadcrumbs />
            </div>
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  <MagnifyingGlass className="h-4 w-4" />
                  {t('website_check.badge')}
                </span>
                <h1 className="font-display mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                  {t('website_check.heading')}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                  {t('website_check.subheading')}
                </p>

                <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-amber-700">
                  {t('website_check.checks_title')}
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {checks.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle
                        weight="fill"
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
                  {t('website_check.promise')}
                </p>
              </div>

              <div className="lg:col-span-6 lg:pl-6">
                <WebsiteCheckForm source="website_check_page" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-center text-3xl font-bold">
              {t('website_check.how_title')}
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {how.map((step, idx) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 font-display font-black text-white shadow-md">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-display mb-1 text-lg font-bold text-slate-900">
                      {step.title}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}
