import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { workData } from '@/shared/data/work';
import { Link } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Work — Client Projects & Case Studies',
      description:
        'See real client projects by Coday: Batherm, Schlüssel Schmiede Wetzlar, Lindener Ratsstuben, and more.',
      path: '/en/work',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Referenzen — Kundenprojekte & Case Studies',
    description:
      'Echte Kundenprojekte von Coday: Batherm, Schlüssel Schmiede Wetzlar, Lindener Ratsstuben und mehr.',
    path: '/de/work',
    type: 'money',
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const lang = isEn ? 'en' : 'de';

  const projects = Object.values(workData);
  const caseStudies = projects.filter((p) => p.type === 'case_study');
  const inProgress = projects.filter((p) => p.type === 'in_progress');

  return (
    <div className="min-h-dvh bg-bg-primary">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-3 block">
            {isEn ? 'Portfolio' : 'Referenzen'}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-secondary-900 mb-6 leading-tight">
            {isEn ? 'Real Projects.' : 'Echte Projekte.'}
            <br />
            <span className="text-primary-700">{isEn ? 'Real Results.' : 'Echte Ergebnisse.'}</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {isEn
              ? 'Every project tells a story of transformation. From concept to launch — always with measurable impact.'
              : 'Jedes Projekt erzählt eine Geschichte der Transformation. Vom Konzept bis zum Launch — immer mit messbarem Impact.'}
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((project) => {
            const content = project.content[lang];
            const heroImage = content.solution.images[0];

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition motion-reduce:duration-[0.01ms] duration-500"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  {heroImage ? (
                    <OptimizedImage
                      src={heroImage}
                      alt={content.solution.imageAlts?.[0] || content.title}
                      className="w-full h-full object-cover transition-transform motion-reduce:duration-[0.01ms] duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary-800 to-secondary-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status Badge */}
                  {project.status === 'live' && project.liveUrl && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full border border-white/50 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Live
                    </div>
                  )}

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    {content.stats.slice(0, 2).map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-center flex-1"
                      >
                        <div className="text-white/60 text-[10px] font-medium uppercase tracking-wider">
                          {stat.label}
                        </div>
                        <div className="text-white font-bold text-sm">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-bold text-xs uppercase tracking-widest mb-3">
                    {content.category}
                  </div>
                  <h2 className="font-display font-bold text-xl text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors motion-reduce:duration-[0.01ms]">
                    {content.title}
                  </h2>
                  <p className="text-secondary-600 text-sm line-clamp-2 mb-4">{content.subtitle}</p>
                  <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
                    {isEn ? 'View Case Study' : 'Case Study ansehen'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* In Progress Section */}
      {inProgress.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <h2 className="font-display font-bold text-2xl text-secondary-900 mb-8 text-center">
            {isEn ? 'Currently in Development' : 'Aktuell in Entwicklung'}
          </h2>
          <div className="max-w-2xl mx-auto">
            {inProgress.map((project) => {
              const content = project.content[lang];
              const Wrapper = project.liveUrl ? 'a' : 'div';
              const wrapperProps = project.liveUrl
                ? {
                    href: project.liveUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'block mb-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 border-dashed hover:border-primary-300 hover:bg-white hover:shadow-sm transition-all cursor-pointer',
                  }
                : {
                    className:
                      'block mb-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 border-dashed',
                  };

              return (
                <Wrapper key={project.slug} {...(wrapperProps as any)}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-secondary-900">
                        {content.title}
                      </h3>
                      <p className="text-secondary-500 text-sm">{content.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-primary-600 font-bold text-lg">
                        {project.completion ?? 0}%
                      </div>
                      <div className="text-secondary-400 text-xs uppercase font-medium">
                        {isEn ? 'Progress' : 'Fortschritt'}
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full transition motion-reduce:duration-[0.01ms] duration-1000"
                      style={{ width: `${project.completion ?? 0}%` }}
                    />
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
