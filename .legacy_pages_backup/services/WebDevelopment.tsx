import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedNavLink as NavLink } from '@/shared/ui/LocalizedLink';
import { servicesData } from '@/shared/data/services';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { webDevImages } from '@/shared/data/serviceImages';
import BlurText from '@/shared/ui/BlurText';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { TechItem } from '@/widgets/services/TechStackShowcase';
import {
  Stack,
  Code,
  Database,
  PaintBrush,
  ArrowRight,
  RocketLaunch,
  CheckCircle,
  ShoppingCart,
  Cloud,
  Palette,
  SquaresFour,
  MagnifyingGlass,
  Gauge,
  Lightbulb,
  Lightning,
  ChartBar,
  ShieldCheck,
  Users,
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ElementType> = {
  layers: Stack,
  code: Code,
  database: Database,
  brush: PaintBrush,
  shopping_cart: ShoppingCart,
  cloud: Cloud,
  palette: Palette,
  widgets: SquaresFour,
  rocket: RocketLaunch,
  search: MagnifyingGlass,
  speed: Gauge,
  lightbulb: Lightbulb,
  lightning: Lightning,
  chart_bar: ChartBar,
  shield_check: ShieldCheck,
  users: Users,
};
import { SeoHead } from '@/shared/ui/SeoHead';

// Lazy load below-the-fold components
const ArchitectureVisualizer = React.lazy(
  () => import('@/features/web-dev/ArchitectureVisualizer')
);
const CodeQualitySimulator = React.lazy(() => import('@/features/web-dev/CodeQualitySimulator'));
const SecurityGrid = React.lazy(() => import('@/features/web-dev/SecurityGrid'));
const RelevantFAQs = React.lazy(() =>
  import('@/features/faq/ui/RelevantFAQs').then((m) => ({ default: m.RelevantFAQs }))
);
const TechStackShowcase = React.lazy(() =>
  import('@/widgets/services/TechStackShowcase').then((m) => ({ default: m.TechStackShowcase }))
);
const TestimonialCard = React.lazy(() =>
  import('@/shared/ui/TestimonialCard').then((m) => ({ default: m.TestimonialCard }))
);

const WebDevelopment: React.FC = () => {
  const { t } = useTranslation(['services', 'common']);
  const categoryData = servicesData['web-development'];
  // @ts-expect-error
  const features = Object.values(categoryData);

  const webDevTechStack: TechItem[] = [
    { name: 'Next.js', category: 'Frontend', iconNode: <OptimizedIcon icon={Stack} size="lg" /> },
    { name: 'React', category: 'Frontend', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      iconNode: <OptimizedIcon icon={PaintBrush} size="lg" />,
    },
    { name: 'TypeScript', category: 'Frontend', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
    { name: 'Node.js', category: 'Backend', iconNode: <OptimizedIcon icon={Database} size="lg" /> },
    {
      name: 'Supabase',
      category: 'Backend',
      iconNode: <OptimizedIcon icon={Database} size="lg" />,
    },
    {
      name: 'PostgreSQL',
      category: 'Backend',
      iconNode: <OptimizedIcon icon={Database} size="lg" />,
    },
    { name: 'Sanity', category: 'CMS', iconNode: <OptimizedIcon icon={Stack} size="lg" /> },
    { name: 'Vercel', category: 'Deployment', iconNode: <OptimizedIcon icon={Cloud} size="lg" /> },
    { name: 'GitHub', category: 'Tools', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
  ];

  return (
    <div className="bg-background-light pt-24 pb-16">
      <SeoHead
        title={t('web_development_page.meta.title')}
        description={t('web_development_page.meta.description')}
        pageType="service"
        schemaData={{
          service: {
            name: 'Web Development',
            description: t('web_development_page.meta.description'),
            serviceType: 'Web Development',
          },
        }}
      />
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center lg:text-start">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('web_development_page.hero.label')}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6">
              <BlurText
                text={t('web_development_page.hero.title_anim')}
                delay={100}
                animateBy="words"
                className="block"
              />
              <span className="text-primary">{t('web_development_page.hero.title_static')}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl lg:mx-0 mx-auto">
              {t('web_development_page.hero.description')}
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-2 scale-105"></div>
            <OptimizedImage
              src={webDevImages.hero!.src}
              alt={t(webDevImages.hero!.alt)}
              className="relative rounded-3xl shadow-flat-lg w-full transform -rotate-1 hover:rotate-0 transition-all duration-500 bg-white p-2"
              priority
            />
          </div>
        </div>
      </section>

      {/* Problem & Solution - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Problem */}
          <div className="bg-white p-10 lg:p-12 rounded-3xl border border-red-100 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.problem.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-secondary mb-6">
              {t('web_development_page.problem.title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
              {t('web_development_page.problem.description')}
            </p>
          </div>
          {/* Solution */}
          <div className="bg-primary/5 p-10 lg:p-12 rounded-3xl border border-primary/20 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.solution.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-secondary mb-6">
              {t('web_development_page.solution.title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
              {t('web_development_page.solution.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Dive Tech Stack */}
      <React.Suspense fallback={<div className="min-h-[400px]" />}>
        <TechStackShowcase
          technologies={webDevTechStack}
          title={t('web_development_page.tech_stack.title')}
          subtitle={t('web_development_page.tech_stack.description')}
        />
      </React.Suspense>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <NavLink
              key={index}
              to={`/services/web-development/${feature.slug}`}
              className="bg-white p-8 rounded-2xl shadow-flat border border-gray-100 hover:shadow-flat-lg transition-all duration-300 group hover:-translate-y-1 block relative overflow-hidden h-full"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-bl-full -me-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                <OptimizedIcon icon={iconMap[feature.icon] || Code} />
              </div>
              <h3 className="font-display font-bold text-xl text-secondary mb-3 group-hover:text-primary transition-colors relative z-10">
                {t(feature.titleKey)}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4 relative z-10">
                {t(feature.descriptionKey)}
              </p>
              <div className="text-primary font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 relative z-10">
                {t('actions.read_more', 'Mehr erfahren')}{' '}
                <OptimizedIcon icon={ArrowRight} className="ms-1 text-sm" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Performance Metrics Visual - NEW HIGH COMPLEXITY SECTION */}
      <section className="bg-gray-50 py-24 mb-24 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
                {t('web_development_page.performance.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                <BlurText
                  text={t('web_development_page.performance.title')}
                  delay={100}
                  animateBy="words"
                />
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {t('web_development_page.performance.description')}
              </p>

              <div className="space-y-6">
                {[
                  {
                    label: t('web_development_page.performance.metrics.lcp.label'),
                    val: t('web_development_page.performance.metrics.lcp.value'),
                    bar: 'w-[95%]',
                  },
                  {
                    label: t('web_development_page.performance.metrics.fid.label'),
                    val: t('web_development_page.performance.metrics.fid.value'),
                    bar: 'w-[98%]',
                  },
                  {
                    label: t('web_development_page.performance.metrics.cls.label'),
                    val: t('web_development_page.performance.metrics.cls.value'),
                    bar: 'w-[100%]',
                  },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-bold text-secondary mb-2">
                      <span>{metric.label}</span>
                      <span className="text-primary">{metric.val}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary rounded-full ${metric.bar}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Visual */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 relative">
              <div className="absolute top-4 end-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex justify-center items-center h-[300px]">
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-4">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 36 36"
                      className="w-full h-full transform -rotate-90"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#1A9A9A"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="animate-[dash_1.5s_ease-out_forwards]"
                      />
                    </svg>
                    <span className="absolute text-5xl font-black text-secondary">100</span>
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                    {t('web_development_page.performance.visual.score_label')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Visual - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.architecture.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
              <BlurText
                text={t('web_development_page.architecture.title')}
                delay={100}
                animateBy="words"
              />
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('web_development_page.architecture.description')}
            </p>
            <ul className="space-y-4 mb-8">
              {(() => {
                const list = t('web_development_page.architecture.list', {
                  returnObjects: true,
                }) as string[];
                return Array.isArray(list)
                  ? list.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                        <OptimizedIcon icon={CheckCircle} className="text-primary" />
                        {item}
                      </li>
                    ))
                  : null;
              })()}
            </ul>
          </div>
          <React.Suspense fallback={<div className="min-h-[300px]" />}>
            <ArchitectureVisualizer />
          </React.Suspense>
        </div>
      </section>

      {/* Comparison Table - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50 text-center">
            <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
              {t('web_development_page.comparison.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-gray-900">
              {t('web_development_page.comparison.title')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-6 text-start text-sm font-semibold text-gray-500 w-1/3">
                    {t('web_development_page.comparison.headers.feature')}
                  </th>
                  <th className="p-6 text-center text-sm font-bold text-gray-900 w-1/3 bg-gray-50">
                    {t('web_development_page.comparison.headers.wordpress')}
                  </th>
                  <th className="p-6 text-center text-sm font-bold text-white bg-secondary w-1/3">
                    {t('web_development_page.comparison.headers.coday')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const rows = t('web_development_page.comparison.rows', {
                    returnObjects: true,
                  }) as { feat: string; bad: string; good: string }[];
                  return Array.isArray(rows)
                    ? rows.map((row: { feat: string; bad: string; good: string }, idx: number) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/30">
                          <td className="p-6 text-sm font-bold text-gray-700">{row.feat}</td>
                          <td className="p-6 text-center text-sm text-gray-500 bg-gray-50/50">
                            {row.bad}
                          </td>
                          <td className="p-6 text-center text-sm text-primary font-bold bg-secondary/5 border-s border-e border-gray-100">
                            {row.good}
                          </td>
                        </tr>
                      ))
                    : null;
                })()}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Grid Insertion */}
        <div className="mt-16 text-center">
          <h3 className="font-display font-bold text-2xl text-secondary mb-8">
            {t('web_development_page.security.title')}
          </h3>
          <React.Suspense fallback={<div className="min-h-[200px]" />}>
            <SecurityGrid />
          </React.Suspense>
        </div>
      </section>

      {/* Process Section with Visual */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-surface-light rounded-3xl p-8 lg:p-12 shadow-flat border border-gray-100 overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">
                {t('web_development_page.process.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                <BlurText
                  text={t('web_development_page.process.title')}
                  delay={100}
                  animateBy="words"
                />
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {t('web_development_page.process.description')}
              </p>

              <ul className="space-y-4 mb-8">
                {(() => {
                  const steps = t('web_development_page.process.steps', {
                    returnObjects: true,
                  }) as { title: string; desc: string }[];
                  return Array.isArray(steps)
                    ? steps.map((step: { title: string; desc: string }, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary font-bold me-4 mt-1 shrink-0 shadow-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary">{step.title}</h4>
                            <p className="text-sm text-slate-500">{step.desc}</p>
                          </div>
                        </li>
                      ))
                    : null;
                })()}
              </ul>

              <React.Suspense fallback={<div className="min-h-[200px]" />}>
                <CodeQualitySimulator />
              </React.Suspense>
            </div>
            <div className="hidden md:block relative ps-12">
              {/* Decorative Code Snippet */}
              <div className="rounded-2xl bg-secondary shadow-flat-lg p-6 overflow-hidden relative rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-700">
                <div className="font-mono text-xs text-slate-300 opacity-90 leading-relaxed">
                  <span className="text-accent">const</span>{' '}
                  <span className="text-primary">App</span> = () ={'>'} {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="text-accent">const</span> [state, setState] ={' '}
                  <span className="text-primary">useState</span>(null);
                  <br />
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-slate-500">
                    {t('web_development_page.process.code_snippet.loading_comment')}
                  </span>
                  <br />
                  &nbsp;&nbsp;<span className="text-accent">return</span> (<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Suspense</span>{' '}
                  fallback={'<'}
                  <span className="text-primary">Loader</span> /&gt;&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-primary">HeroSection</span> visualize=
                  <span className="text-accent">"true"</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">Suspense</span>&gt;
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  {'}'};
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-24">
        <React.Suspense fallback={<div className="min-h-[200px]" />}>
          <TestimonialCard
            quote="Die technische Kompetenz und Performance-Orientierung von Coday hat unsere Plattform auf ein neues Level gehoben. Ladezeiten wurden extrem minimiert und die Architektur ist jetzt komplett zukunftssicher aufgebaut. Ein echter Gamechanger für unser Team."
            authorName="Sarah W."
            authorPosition="CTO"
            authorCompany="InnovateHealth"
            rating={5}
          />
        </React.Suspense>
      </section>

      {/* Relevant FAQs */}
      <React.Suspense fallback={<div className="min-h-[200px]" />}>
        <RelevantFAQs serviceId="web-development" />
      </React.Suspense>

      {/* Case Study Teaser - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-secondary text-[color:var(--color-text-inverse)] rounded-3xl p-10 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
          <div className="md:w-1/2 relative z-10">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.case_study.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
              {t('web_development_page.case_study.title')}
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              {t('web_development_page.case_study.description')}
            </p>
            <NavLink
              to="/cases"
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-secondary rounded-xl bg-primary hover:bg-white transition-all shadow-glow"
            >
              {t('actions.read_more', 'Case Study ansehen')}
              <OptimizedIcon icon={ArrowRight} className="ms-2" />
            </NavLink>
          </div>
          <div className="md:w-1/2 relative z-10 w-full">
            <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 p-2 shadow-2xl backdrop-blur-sm transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              {/* Replace with actual case study image if available */}
              <div className="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center">
                <OptimizedIcon
                  icon={ChartBar}
                  size="xl"
                  className="text-primary/50"
                  weight="duotone"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-sapphire rounded-3xl p-12 shadow-flat-lg text-white">
          <h2 className="font-display font-bold text-3xl mb-6">
            {t('web_development_page.cta.title')}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t('web_development_page.cta.description')}
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary rounded-xl bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
          >
            {t('web_development_page.cta.button')}
            <OptimizedIcon icon={RocketLaunch} className="ms-2" />
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;
