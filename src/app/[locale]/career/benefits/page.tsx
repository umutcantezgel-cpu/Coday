import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/career/ui/BenefitsClient';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Benefits & Working at Coday | Web Developer Jobs Wetzlar',
      description:
        'Explore benefits of working at Coday: M-Series gear, 100% remote, fair pay & learning budget. Discover rewarding web developer jobs in Wetzlar & Hesse.',
      keywords: [
        'Benefits',
        'Working at Coday',
        'Web Developer Jobs Wetzlar',
        'Developer Benefits Wetzlar',
        'Remote Web Development Hesse',
        'Next.js Developer Jobs',
      ],
      path: '/en/career/benefits',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Benefits & Arbeiten bei Coday | Webentwickler Jobs Wetzlar',
    description:
      'Attraktive Benefits & Arbeiten bei Coday: High-End Hardware, Remote-Work & Weiterbildungsbudget. Jetzt Webentwickler Jobs Wetzlar & Mittelhessen entdecken!',
    keywords: [
      'Benefits',
      'Arbeiten bei Coday',
      'Webentwickler Jobs Wetzlar',
      'Entwickler Benefits Wetzlar',
      'Remote Webentwicklung Hessen',
      'Next.js Entwickler Jobs',
    ],
    path: '/de/career/benefits',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Careers' : 'Karriere', url: `/${_locale}/career` },
    { name: 'Benefits', url: `/${_locale}/career/benefits` },
  ]);

  const faqs = isEn
    ? [
        {
          question: 'How does the hardware order process work before my first day?',
          answer:
            'Once your employment contract is finalized, we consult with you on your preferred machine specifications (MacBook Pro M-Series or Dell XPS, monitor setups, and audio peripherals). All gear is ordered brand new, preconfigured, and delivered straight to your home address before your official start date.',
        },
        {
          question: 'Can I apply for Web Developer Jobs in Wetzlar if I live completely remotely?',
          answer:
            'Yes, absolutely! All our web developer jobs, UI/UX design positions, and growth roles are 100% remote-compatible for candidates residing in Germany or the European Union. If you live near Central Hesse (Wetzlar, Giessen, Marburg), our physical studio is always accessible for voluntary co-working and team days.',
        },
        {
          question: 'How is the €2,500 learning budget approved and utilized?',
          answer:
            'Seamlessly and without bureaucratic hurdles. Simply share the course, conference pass (e.g. Next.js Conf, React Summit), or technical book with the team—expenses are either directly covered by Coday or reimbursed immediately.',
        },
        {
          question: 'What career progression opportunities exist at Coday?',
          answer:
            'We provide structured, transparent growth tracks from Junior Engineer through Senior Developer to Tech Lead and Architecture Partner, backed by clearly defined salary tiers and increasing profit-share allocations.',
        },
      ]
    : [
        {
          question: 'Wie funktioniert die Hardware-Bestellung vor dem ersten Arbeitstag?',
          answer:
            'Sobald Ihr Arbeitsvertrag unterzeichnet ist, stimmen wir Ihre Wunschkonfiguration (MacBook Pro M-Series oder Dell XPS, Monitore, Audio-Equipment) detailliert ab. Alle Geräte werden vor Ihrem Start neu bestellt, vorinstalliert und direkt zu Ihnen nach Hause geliefert.',
        },
        {
          question:
            'Kann ich mich auf Webentwickler Jobs in Wetzlar bewerben, wenn ich komplett remote wohne?',
          answer:
            'Ja, absolut! Alle unsere Webentwickler Jobs und Design-Stellen sind voll remote-fähig für Bewerber mit Wohnsitz in Deutschland oder der EU. Wenn Sie in Mittelhessen (Wetzlar, Gießen, Marburg) wohnen, steht Ihnen unser Office jederzeit zusätzlich offen.',
        },
        {
          question: 'Wie wird das Weiterbildungsbudget von 2.500 € freigegeben?',
          answer:
            'Unkompliziert und ohne bürokratische Anträge. Reichen Sie einfach den Kurs, das Konferenzticket oder das Fachbuch kurz im Team ein – die Kosten werden direkt von Coday übernommen oder umgehend erstattet.',
        },
        {
          question: 'Welche Aufstiegsmöglichkeiten und Karrierepfade gibt es bei Coday?',
          answer:
            'Wir bieten transparente Karrierepfade vom Junior Engineer über Senior Developer bis zum Tech Lead oder Architecture Partner mit klar definierten Gehaltsstufen und wachsender Gewinnbeteiligung.',
        },
      ];

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization node already ships from the root layout, so it stays out of this graph.
    '@graph': [
      breadcrumbs,
      faqSchema,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/career/benefits#webpage`,
        name: isEn
          ? 'Benefits & Working at Coday | Web Developer Jobs Wetzlar'
          : 'Benefits & Arbeiten bei Coday | Webentwickler Jobs Wetzlar',
        description: isEn
          ? 'Explore benefits of working at Coday: M-Series gear, 100% remote, fair pay & learning budget. Discover rewarding web developer jobs in Wetzlar & Hesse.'
          : 'Attraktive Benefits & Arbeiten bei Coday: High-End Hardware, Remote-Work & Weiterbildungsbudget. Jetzt Webentwickler Jobs Wetzlar & Mittelhessen entdecken!',
        url: `${BASE_URL}/${_locale}/career/benefits`,
        inLanguage: _locale,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />

      {/* Semantic Long-Form Guide Section for SEO & Content Depth */}
      <section className="border-t border-slate-200/80 bg-slate-50/70 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-slate-800">
          {isEn ? (
            <div className="space-y-16">
              {/* Introduction */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                  Comprehensive Guide to Benefits & Working at Coday
                </h2>
                <p className="text-lg leading-relaxed text-slate-700">
                  <strong className="text-slate-900 font-semibold">Working at Coday</strong> means
                  joining a high-performance web engineering and digital design studio based in
                  Wetzlar and Central Hesse that pairs uncompromising code craftsmanship with
                  world-class working conditions. We firmly believe that elite digital products—such
                  as sub-second Next.js web applications, headless architectures, and fully
                  accessible enterprise portals—can only be built in an environment that grants
                  developers and designers maximal autonomy, top-tier hardware, and authentic
                  appreciation.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Whether you are exploring our open vacancies as a Senior Frontend Developer, UI/UX
                  Designer, or Full-Stack Engineer on our{' '}
                  <Link href="/career/jobs" className="text-primary-700 underline font-semibold">
                    Open Positions page
                  </Link>
                  , discovering our collaborative{' '}
                  <Link href="/career/culture" className="text-primary-700 underline font-semibold">
                    Team Culture & Philosophy
                  </Link>
                  , or looking into{' '}
                  <strong className="text-slate-900 font-semibold">
                    Web Developer Jobs in Wetzlar
                  </strong>
                  : At Coday, you will find comprehensive benefits engineered to empower your
                  continuous professional growth, work-life balance, and personal well-being.
                </p>
              </div>

              {/* Topic 1: Apple Silicon M-Series Hardware */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  1. Apple Silicon M-Series Hardware & Ergonomic High-End Workstations
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  A truly exceptional development workflow begins with elite equipment. At Coday, we
                  make zero compromises when it comes to technology. Before your very first day, you
                  choose your personalized dream hardware setup, fully funded and shipped directly
                  to your door. Our engineering baseline features the latest Apple Silicon M-Series
                  chips (MacBook Pro 16&quot; with M3/M4 Max processors, 64 GB to 128 GB Unified
                  Memory, and 2 TB to 4 TB NVMe SSDs) or flagship Dell XPS 15 machines for Windows
                  and Linux specialists.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  We pair your machine with razor-sharp 5K Apple Studio Displays or expansive
                  49-inch LG Curved Ultrawide monitors with 144 Hz refresh rates for an optimal
                  multi-window overview. To safeguard your physical well-being, we furnish your home
                  workspace with ergonomic office chairs by Herman Miller or Steelcase, motorized
                  standing desks, and industry-leading active noise-cancelling headphones (Sony
                  WH-1000XM5 or AirPods Pro 2). After 24 months with Coday, the entire hardware
                  bundle becomes your permanent personal property at zero extra cost.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Hardware Highlights & Ergonomics Package:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>MacBook Pro 16&quot; M3/M4 Max with up to 128GB RAM</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>5K Retina Apple Studio Display or 49&quot; Ultrawide 144Hz</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Herman Miller seating & motorized standing desk budget</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Full hardware buyout: Equipment is 100% yours after 24 months</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 2: 100% Remote & Hybrid Work */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  2. 100% Remote & Hybrid Work in Central Hesse (Wetzlar / Giessen)
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Workplace flexibility is not an empty marketing buzzword at Coday—it is the
                  foundation of our culture. We operate as a 100% remote-first team across Germany.
                  You enjoy complete freedom to work from your home office in Berlin, Munich, or
                  Hamburg, code while on a European workation (up to 60 days per year), or utilize
                  our modern agency hub in the Wetzlar / Giessen area for in-person collaboration
                  and whiteboarding sessions.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  We never force our engineers into grueling highway commutes or rigid office
                  quotas. At Coday, the only metrics that matter are code craftsmanship, reliable
                  communication, and outstanding project outcomes. For personal bonding, we organize
                  regular team dinners, local hackathons, and two fully paid team retreats per year
                  at inspiring international locations.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Remote & Location Flexibility:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>100% remote-first philosophy with complete location freedom in DE</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Up to 60 days of annual European workation (e.g. Spain, Portugal)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Modern Wetzlar/Giessen studio hub for voluntary co-working</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Two fully funded international team offsites per year</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 3: Unlimited Learning Budget */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  3. Unlimited Learning Budget & International Tech Conferences
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Stagnation is the ultimate enemy of cutting-edge software engineering. The web
                  development landscape—spanning React, Next.js, TypeScript, and AI-augmented
                  toolchains—evolves at breakneck speed. That is why we provide every team member
                  with a dedicated annual learning budget of at least €2,500. You can invest this
                  budget in technical books, premier online masterclasses (such as Frontend Masters,
                  Egghead, Kent C. Dodds pro courses), or in-person tickets to leading global
                  conferences including Next.js Conf, React Summit Amsterdam, Smashing Conference,
                  or JSWorld.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  In addition to financial backing, we dedicate 10% of weekly paid working hours to
                  exploratory &quot;Lab-Time,&quot; allowing you to test emerging frameworks,
                  contribute to open-source software, or optimize internal workflows. We also cover
                  all premium AI subscriptions, including Claude Pro, OpenAI ChatGPT Plus, GitHub
                  Copilot, and Cursor AI.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Education & Growth Perks:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>€2,500+ annual personal budget for courses, books & coaching</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Full ticket, flight & hotel coverage for European conferences</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>10% weekly paid Lab-Time for open-source & tech experiments</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Pro subscriptions for GitHub Copilot, Cursor AI, Claude & ChatGPT</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 4: Profit Sharing & Salaries */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  4. Profit Sharing, Transparent Salaries & Performance Bonuses
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  We believe that engineers and creators who deliver world-class digital solutions
                  deserve direct and substantial participation in the company&apos;s financial
                  success. At Coday, there are no opaque behind-closed-doors salary negotiations. We
                  maintain transparent salary bands tied directly to technical mastery,
                  architectural ownership, and code quality.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  On top of a competitive base salary, we distribute a meaningful portion of our
                  annual agency profits back to the entire team through our profit-sharing program.
                  Furthermore, you receive 30 paid vacation days, paid leave for personal
                  milestones, an employer-subsidized pension plan (bAV) with an extra 20% match, and
                  fully covered Urban Sports Club L memberships for your physical fitness and
                  recovery.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Compensation & Security Benefits:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Transparent salary tiers based on engineering skill and impact</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Direct annual profit-sharing bonus linked to agency revenue</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>30 days of paid annual vacation plus flexible bridge days</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Subsidized company pension plan & full Urban Sports Club pass</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 5: Flexible Working Hours & Async Culture */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  5. Flexible Working Hours & Asynchronous Communication Culture
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  High engineering velocity is achieved through deep, uninterrupted focus—not by
                  clocking rigid hours in front of a webcam. That is why Coday champions an
                  asynchronous-first communication methodology. Instead of disruptive status
                  meetings and endless video calls, we rely on structured documentation in Notion,
                  clear sprint tracking in Linear, concise async video briefs via Loom, and thorough
                  code reviews on GitHub.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  We have slashed synchronous meetings to less than 3 hours per week across the
                  entire organization. With full trust-based working hours, you decide when you
                  enter your peak productivity state—whether you prefer coding at 6:00 AM or late in
                  the evening. We protect your evenings and weekends with a strict
                  zero-after-hours-messaging policy.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Work Culture & Focus Standards:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>100% trust-based working hours with zero arbitrary clock-ins</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Asynchronous communication via GitHub, Notion, Linear & Loom</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Radical protection of Deep Work with under 3h total weekly meetings
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Zero after-hours messaging expectations or emergency calls</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 6: Modern Toolstacks */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  6. Modern Tech Stack: Next.js 15, TypeScript, Tailwind 4 & Vercel Edge
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  At Coday, you build with a clean, bleeding-edge tech stack free from legacy
                  ballast or monolithic CMS hurdles. Our web architecture is 100% built on Next.js
                  15 with React Server Components, Server Actions, and Partial Prerendering (PPR),
                  strictly typed with TypeScript in Strict Mode, and styled using Tailwind CSS v4.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  For content management, we leverage modern headless platforms like Sanity.io or
                  Payload CMS, paired with cloud-native PostgreSQL databases via Supabase and Prisma
                  ORM. Deployments run globally on the Vercel Edge Network with automated CI/CD
                  pipelines, Playwright end-to-end testing suites, and Biome / ESLint linting.
                  Across every single build, we target a flawless 100/100 score on Google PageSpeed
                  and Core Web Vitals.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Our Engineering Toolchain:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Next.js 15 App Router, React Server Components & PPR</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Strict TypeScript Mode & modern Tailwind CSS v4 styling</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Headless CMS (Sanity / Payload) & Supabase PostgreSQL</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Global Vercel Edge hosting with automated Playwright CI/CD</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 7: FAQ */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  7. Frequently Asked Questions (FAQ) About Benefits & Working at Coday
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs"
                    >
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed text-base">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic 8: Internal Links & Career Hub Navigation */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Explore More About Careers & Opportunities at Coday
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Interested in joining our team or learning more about our development standards?
                  Explore our core career sections:
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/career/jobs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800 transition-colors shadow-sm text-sm"
                  >
                    View Open Positions →
                  </Link>
                  <Link
                    href="/career/culture"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Team Culture & Values →
                  </Link>
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Career Hub Overview →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Introduction */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                  Umfassender Leitfaden zu Benefits & Arbeiten bei Coday
                </h2>
                <p className="text-lg leading-relaxed text-slate-700">
                  <strong className="text-slate-900 font-semibold">Arbeiten bei Coday</strong>{' '}
                  bedeutet, Teil einer technologiegetriebenen Webdesign- und Performance-Agentur in
                  Wetzlar und Mittelhessen zu sein, die kompromisslose Code-Qualität mit
                  erstklassigen Arbeitsbedingungen vereint. Wir glauben fest daran, dass
                  außergewöhnliche digitale Produkte wie hochperformante Next.js-Websites und
                  barrierefreie Webanwendungen nur in einem Arbeitsumfeld entstehen können, das
                  Entwicklern und Designern maximale Autonomie, modernstes Equipment und echte
                  Wertschätzung bietet.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Ob Sie als erfahrener Senior Frontend Engineer, UI/UX Designer oder Full-Stack
                  Entwickler auf unserer{' '}
                  <Link href="/career/jobs" className="text-primary-700 underline font-semibold">
                    Stellenangebote-Seite
                  </Link>{' '}
                  nach neuen Herausforderungen suchen, unsere{' '}
                  <Link href="/career/culture" className="text-primary-700 underline font-semibold">
                    Teamkultur & Arbeitsphilosophie
                  </Link>{' '}
                  kennenlernen möchten oder gezielt nach{' '}
                  <strong className="text-slate-900 font-semibold">
                    Webentwickler Jobs in Wetzlar
                  </strong>{' '}
                  suchen: Bei Coday finden Sie Benefits, die weit über das branchenübliche Niveau
                  hinausgehen und darauf ausgelegt sind, Ihre persönliche und fachliche Entfaltung
                  nachhaltig zu fördern.
                </p>
              </div>

              {/* Topic 1: Apple Silicon M-Series Hardware */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  1. Apple Silicon M-Series Hardware & Ergonomischer High-End Arbeitsplatz
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Ein erstklassiges Entwicklungserlebnis beginnt beim Arbeitsgerät. Bei Coday machen
                  wir keine Kompromisse bei der technischen Ausstattung. Jeder neue Mitarbeiter
                  wählt vor seinem ersten Arbeitstag sein persönliches Traum-Setup aus, das
                  vollständig von uns finanziert und direkt zu Ihnen nach Hause geliefert wird.
                  Standardmäßig setzen wir auf die neuesten Apple Silicon M-Series Prozessoren
                  (MacBook Pro 16&quot; mit M3/M4 Max, 64 GB bis 128 GB Unified Memory und 2 TB bis
                  4 TB NVMe-SSD) oder auf leistungsstarke Dell XPS 15 High-End Laptops für Windows-
                  und Linux-Enthusiasten.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Ergänzt wird die Hardware durch brillante 5K Apple Studio Displays oder
                  ultra-breite 49-Zoll LG Curved Monitore mit 144 Hz Bildwiederholrate für maximalen
                  Überblick bei komplexen Codebasen. Zur Schonung Ihrer Gesundheit statten wir Ihr
                  Home-Office mit ergonomischen Bürostühlen von Herman Miller oder Steelcase,
                  elektrisch höhenverstellbaren Schreibtischen und aktiven
                  Noise-Cancelling-Kopfhörern (Sony WH-1000XM5 oder AirPods Pro 2) aus. Nach 24
                  Monaten Betriebszugehörigkeit geht das gesamte Hardware-Paket ohne Zuzahlung in
                  Ihr persönliches Eigentum über.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Hardware-Highlights & Ergonomie-Paket:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Neueste MacBook Pro 16&quot; Modelle mit Apple Silicon M3/M4 Max</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>5K Retina Apple Studio Displays oder 49-Zoll Ultrawide 144Hz</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Herman Miller Bürostühle & elektrisch verstellbare Schreibtische</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Volles Hardware-Buyout: Alle Geräte gehören nach 24 Monaten Ihnen</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 2: 100% Remote & Hybrid Work */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  2. 100% Remote-Work & Flexible Hybrid-Optionen in Wetzlar und Gießen
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Flexibilität ist bei uns kein leeres Marketingversprechen, sondern gelebte
                  Realität. Wir arbeiten als 100% Remote-First Team über ganz Deutschland hinweg.
                  Sie entscheiden frei, ob Sie vom heimischen Schreibtisch in Berlin, Hamburg oder
                  München aus arbeiten, während einer Workation aus dem europäischen Ausland (bis zu
                  60 Tage pro Jahr) coden oder unser modernes Agentur-Büro im Raum Wetzlar / Gießen
                  für persönliche Team-Meetings und Brainstorming-Sessions nutzen möchten.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Wir zwingen niemanden zu zeitraubenden Pendelstrecken auf der Autobahn oder
                  starren Büro-Anwesenheitsquoten. Bei Coday zählen ausschließlich die Qualität
                  Ihres Codes, die Zuverlässigkeit Ihrer Absprachen und der gemeinsame
                  Produkterfolg. Für lokale Treffen veranstalten wir regelmäßige Team-Lunches,
                  Hackathons und zwei exklusive Offsite-Retreats pro Jahr an inspirierenden
                  Locations.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Remote-Vorteile & Standort-Freiheit:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>100% Remote-First Philosophie mit freier Wahl des Wohnortes in DE</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Bis zu 60 Tage jährliche Workation im europäischen Ausland</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Modernes Kreativ-Hub in Wetzlar / Gießen für freiwillige Teamtage</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Zwei voll finanzierte internationale Team-Retreats pro Jahr</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 3: Unlimited Learning Budget */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  3. Unbegrenztes Weiterbildungsbudget & Besuch internationaler Fachkonferenzen
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Stillstand ist der größte Feind exzellenter Softwareentwicklung. Das Web-Ökosystem
                  rund um React, Next.js, TypeScript und KI-gestützte Entwicklungstools entwickelt
                  sich rasant weiter. Deshalb stellen wir jedem Teammitglied ein jährliches
                  Weiterbildungsbudget von mindestens 2.500 Euro zur freien Verfügung. Nutzen Sie
                  dieses Budget für Fachbücher, renommierte Online-Masterclasses (wie Frontend
                  Masters, Egghead, Kent C. Dodds Pro-Kurse) oder für Besuche führender
                  internationaler Konferenzen wie der Next.js Conf, React Summit in Amsterdam,
                  Smashing Conference oder JSWorld.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Neben dem finanziellen Budget gewähren wir Ihnen wöchentlich 10% bezahlte
                  Forschungszeit (Lab-Time), in der Sie neue Technologien ausprobieren, eigene
                  Open-Source-Projekte vorantreiben oder interne Toolchains optimieren können. Wir
                  übernehmen zusätzlich sämtliche Kosten für professionelle KI-Abonnements wie
                  Claude Pro, OpenAI ChatGPT Plus, GitHub Copilot und Cursor AI.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Weiterbildungs- & Entwicklungs-Benefits:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>2.500 €+ jährliches Individualbudget für Bücher, Kurse & Coaching</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Volle Kostenübernahme für Tickets, Flüge & Hotels bei Konferenzen</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>10% bezahlte wöchentliche Lab-Time für eigene Tech-Experimente</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Vollständige Übernahme von GitHub Copilot, Cursor, Claude & ChatGPT
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 4: Profit Sharing & Salaries */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  4. Gewinnbeteiligung, transparente Festgehälter & Attraktive Bonussysteme
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Wir sind überzeugt: Wer herausragende Ergebnisse für anspruchsvolle Kunden
                  liefert, muss direkt und überdurchschnittlich am wirtschaftlichen Erfolg beteiligt
                  werden. Bei Coday gibt es keine willkürlichen Gehaltsverhandlungen hinter
                  verschlossenen Türen. Wir arbeiten mit transparenten Gehaltsbändern, die an Ihre
                  technische Erfahrung, Architekturverantwortung und Code-Qualität gekoppelt sind.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Neben einem attraktiven Grundgehalt schütten wir einen signifikanten Anteil des
                  jährlichen Agenturgewinns über unser Profit-Sharing-Modell an das gesamte Team
                  aus. Darüber hinaus profitieren Sie von 30 Tagen bezahltem Jahresurlaub,
                  Sonderurlaubstagen bei privaten Lebensereignissen, einer arbeitgeberfinanzierten
                  betrieblichen Altersvorsorge (bAV) mit 20% Extra-Zuschuss und einer voll bezahlten
                  Urban Sports Club L-Mitgliedschaft für Ihre sportliche Fitness und Regeneration.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Vergütung & Vorsorge-Vorteile:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Transparente Gehaltsstufen nach Erfahrungslevel und Verantwortung</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Jährliche direkte Gewinnbeteiligung (Profit Share) am Agenturertrag
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>30 Tage bezahlter Erholungsurlaub plus flexible Brückentage</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        Betriebliche Altersvorsorge mit 20% Zuschuss & Urban Sports Flatrate
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 5: Flexible Working Hours & Async Culture */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  5. Flexible Arbeitszeiten, Vertrauensarbeitszeit & Asynchrone Kommunikation
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Produktivität entsteht nicht durch das Absitzen von Stunden vor der Webcam,
                  sondern durch ungestörten Fokus und tiefe Konzentrationsphasen (Deep Work). Aus
                  diesem Grund pflegen wir bei Coday eine konsequent asynchrone Arbeits- und
                  Kommunikationskultur. Anstelle von zeitraubenden Status-Meetings, endlosen
                  Video-Calls und permanenter Erreichbarkeit setzen wir auf strukturierte
                  Dokumentation in Notion, transparente Task-Boards in Linear, präzise
                  Video-Briefings via Loom und saubere Pull-Request-Reviews auf GitHub.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Wir haben unsere synchronen Meetings auf ein absolutes Minimum reduziert (unter 3
                  Stunden pro Woche im gesamten Team). Dank flexibler Vertrauensarbeitszeit
                  bestimmen Sie selbst, wann Sie am produktivsten coden – ob frühmorgens um 6:00 Uhr
                  oder im ruhigen Spätabend. Wir respektieren Ihren Feierabend und verzichten strikt
                  auf Nachrichten außerhalb der vereinbarten Arbeitsfenster.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Arbeitskultur & Deep-Work-Standards:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        100% Vertrauensarbeitszeit ohne Stechuhr oder erzwungene Kernzeiten
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Asynchron-First Kommunikation über GitHub, Notion, Linear & Loom</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Radikaler Fokus auf Deep Work mit unter 3h Meetingzeit pro Woche</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Keine Erreichbarkeitspflicht nach Feierabend oder an Wochenenden</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 6: Modern Toolstacks */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  6. Moderner Toolstack: Next.js 15, TypeScript, Tailwind 4, Sanity CMS & Vercel
                  Edge
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Bei Coday schreiben Sie modernen, sauberen Code ohne frustrierende Altlasten oder
                  veraltete CMS-Monster. Unsere Architektur basiert zu 100% auf dem modernsten
                  Web-Stack: Next.js 15 mit React Server Components, Server Actions und Partial
                  Prerendering (PPR), getypt mit TypeScript im Strict Mode und gestylt mit Tailwind
                  CSS Version 4.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  Als Content-Plattform setzen wir auf flexible Headless-CMS wie Sanity.io oder
                  Payload CMS, kombiniert mit skalierbaren Cloud-Datenbanken wie Supabase
                  (PostgreSQL) und Prisma ORM. Das weltweite Deployment erfolgt automatisiert über
                  das globale Vercel Edge Network mit CI/CD-Pipelines, automatisierten Playwright
                  E2E-Tests und Biome / ESLint Formatierung. Bei jedem Projekt streben wir den
                  perfekten 100/100 Google PageSpeed- und Core Web Vitals Score an.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    Unser Entwicklungs-Toolstack:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Next.js 15 App Router mit React Server Components & PPR</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>100% TypeScript Strict Mode & Tailwind CSS v4 Styling</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Headless CMS (Sanity / Payload) & Supabase PostgreSQL</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <OptimizedIcon
                        icon={CheckCircle}
                        className="text-emerald-500 w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <span>Globales Vercel Edge Hosting mit Playwright E2E CI/CD-Pipelines</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Topic 7: FAQ */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  7. Häufig gestellte Fragen (FAQ) zu Benefits & Arbeiten bei Coday
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs"
                    >
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed text-base">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic 8: Interne Navigation & Karriere-Hub */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Mehr über Karriere & Zusammenarbeit bei Coday erfahren
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Möchten Sie Teil unseres Teams werden oder mehr über unsere Arbeitsweise erfahren?
                  Nutzen Sie die folgenden Einstiegspunkte:
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/career/jobs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800 transition-colors shadow-sm text-sm"
                  >
                    Offene Stellen ansehen →
                  </Link>
                  <Link
                    href="/career/culture"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Teamkultur & Werte →
                  </Link>
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Karriere-Hauptseite →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
