import { generatePageMetadata, generateAlternates } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getBlogPost, getBlogPosts } from '@/features/blog/model/data';
import { routing } from '@/i18n/routing';
import { getArticleSchema, getOrganizationSchema, BASE_URL } from '@/lib/schema';
import BlogPostClient from '@/features/knowledge/ui/BlogPostClient';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of routing.locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(slug, locale);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Coday',
      description: 'The requested blog post could not be found.',
    };
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codayweb.de';

  return {
    title: (() => {
      const seoTitleMap: Record<string, string> = {
        'Business Intelligence: Warum Bauchgefühl Ihr Marketing-Budget verbrennt':
          'Business Intelligence im Marketing',
        'Webseite für Handwerker: 5 Fehler, die Sie Kunden kosten':
          'Webseite für Handwerker: 5 Fehler',
        'Was kostet eine professionelle Firmenwebseite wirklich?':
          'Was kostet eine professionelle Firmenwebseite?',
        'Core Web Vitals 2026: Warum langsame Ladezeiten Millionen kosten': 'Core Web Vitals 2026',
        'Die 5 tödlichen Webdesign-Fehler, die Ihre Conversion zerstören':
          'Die 5 tödlichen Webdesign-Fehler',
        "Anti-AI Manifest: Warum 'KI-perfektes' Webdesign 2026 scheitert":
          'Anti-AI Manifest: Kein KI-Webdesign',
        'Omni-Channel Blueprint: Maximale Präsenz ohne Budget-Verschwendung':
          'Der perfekte Omni-Channel Mix',
        'Social Media Secrets 2026: Organische Reichweite ist tot?': 'Social Media Secrets 2026',
        'Warum WordPress im Jahr 2026 tot ist (und warum Agenturen es Ihnen trotzdem verkaufen)':
          'Warum WordPress 2026 tot ist',
        'Neuro-Design: Wie Sie das Unterbewusstsein Ihrer Kunden hacken':
          'Neuro-Design im Webdesign',
        "Die KI-Revolution: Warum 2026 das Jahr der 'Voice-First' Strategie ist":
          'Voice-First Strategie 2026',
        'Das Anti-AI Manifest: Warum menschliches Design 2026 gewinnt 🛑':
          'Anti-AI Manifest: Menschliches Design',
        "Der 'Agentur-Killer': Warum das klassische Agentur-Modell tot ist":
          'Warum das klassische Agentur-Modell tot ist',
        'Digitale Souveränität: Warum der US Cloud Act eine Zeitbombe ist':
          'Digitale Souveränität & US Cloud Act',
        'Die Psychologie des Dark Mode: Warum Dunkel sich teuer anfühlt':
          'Die Psychologie des Dark Mode',
        'WordPress ist tot. Headless CMS beweist es (2026)': 'WordPress ist tot: Headless CMS',
        'Headless vs WordPress Vergleich: Der CMS Showdown': 'WordPress vs Headless im Vergleich',
        'Enterprise Security: Warum ISO 27001 das Minimum Viable Product ist':
          'Enterprise Security & ISO 27001',
        'Digital Government: Warum das OZG 2.0 scheitert (und wie wir es retten)':
          'Digital Government & OZG 2.0',
        'Der Tod des Cookies: Warum Ihre Marketing-Daten falsch sind':
          'Der Tod des Third-Party Cookies',
        'Design Systems at Scale: Wie wir 100+ Marken managen, ohne verrückt zu werden':
          'Design Systems at Scale',
        'Die Zukunft des E-Commerce: Warum Ihr Shop Geld verbrennt': 'Die Zukunft des E-Commerce',
        'Der unsichtbare ROI: Warum UX Design mehr bringt als Marketing': 'Der ROI von UX Design',
        'Die Sicherheits-Lücke: Wie Open Source Ihr Business gefährdet':
          'Open Source Sicherheitslücken',
        'A/B Testing Lügen: Warum 90% aller Tests statistischer Müll sind':
          'A/B Testing Mythen aufgedeckt',
        'Daten-Reife: Vom Bauchgefühl zur algorithmischen Dominanz':
          'Daten-Reife: Algorithmische Dominanz',
        'Die Agentur-Preis-Lüge: Was Sie wirklich für Ihren Retainer bekommen':
          'Die Agentur-Preis-Lüge',
        'Digitale Souveränität: Gehören Ihre Daten wirklich Ihnen?': 'Gehören Ihre Daten Ihnen?',
        'Top Webdesign Agenturen in Hessen 2026 (Ehrlicher Vergleich)':
          'Top Webdesign Agenturen Hessen 2026',

        // EN titles
        "Neuro-Design: How to Hack Your Customer's Subconscious": 'Neuro-Design for Websites',
        'The 5 Deadly Web Design Mistakes (And How to Survive Them)':
          'The 5 Deadly Web Design Mistakes',
        "Data Doesn't Lie: Why Your Gut Feeling Costs You Millions": "Data Doesn't Lie",
        'The Perfect Omni-Channel Mix: Be Everywhere Without Going Crazy':
          'The Perfect Omni-Channel Mix',
        'Social Media Secrets 2026: Is Organic Reach Dead?': 'Social Media Secrets 2026',
        'Why WordPress is Dying in 2026 (And Why Agencies Still Sell It)':
          'Why WordPress is Dying in 2026',
        "The AI Revolution: Why 2026 is the Year of 'Voice-First'": 'Voice-First Strategy 2026',
        'The Anti-AI Manifesto: Why Human Design Still Wins (2026) ✨':
          'The Anti-AI Manifesto (2026)',
        "The 'Agency Killer': Why the Classic Agency Model is Dead":
          'The Classic Agency Model is Dead',
        'Digital Sovereignty: Why the US Cloud Act is a Ticking Time Bomb':
          'Digital Sovereignty & US Cloud Act',
        'The Psychology of Dark Mode: Why It Feels Expensive': 'The Psychology of Dark Mode',
        'WordPress is Dead. Headless CMS Proves It (2026)': 'WordPress is Dead: Headless CMS',
        'Headless CMS vs WordPress: The CMS Comparison': 'WordPress vs Headless Compared',
        'Enterprise Security: Why ISO 27001 is the Minimum Viable Product':
          'Enterprise Security & ISO 27001',
        'Digital Government: Why OZG 2.0 is Failing (and How to Fix It)':
          'Digital Government & OZG 2.0',
        'The Death of the Cookie: Why Your Marketing Data is Wrong':
          'The Death of the Third-Party Cookie',
        'Design Systems at Scale: How We Manage 100+ Brands Without Going Insane':
          'Design Systems at Scale',
        'The Future of E-Commerce: Why Your Shop is Leaking Money': 'The Future of E-Commerce',
      };

      let mappedTitle = seoTitleMap[post.title] || post.title;
      let finalTitle =
        locale === 'en' ? `${mappedTitle} | Coday Tech Blog` : `${mappedTitle} | Coday Blog`;
      if (finalTitle.length > 65) {
        finalTitle = locale === 'en' ? `${mappedTitle} (EN)` : mappedTitle;
      }
      return finalTitle;
    })(),
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: `${BASE_URL}${post.image}`, alt: post.alt }] : [],
      url: `${BASE_URL}/${locale}/knowledge/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: generateAlternates(`/${locale}/knowledge/blog/${slug}`),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug, locale);

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          getOrganizationSchema(locale),
          getArticleSchema({
            title: post.title,
            excerpt: post.excerpt,
            url: `${BASE_URL}/${locale}/knowledge/blog/${slug}`,
            publishedAt: post.date,
            imageUrl: post.image ? `${BASE_URL}${post.image}` : undefined,
            authorName: post.author,
          }),
        ],
      }
    : null;

  const _seoTitleMap: Record<string, string> = {
    'Business Intelligence: Warum Bauchgefühl Ihr Marketing-Budget verbrennt':
      'Business Intelligence im Marketing',
    'Webseite für Handwerker: 5 Fehler, die Sie Kunden kosten': 'Webseite für Handwerker: 5 Fehler',
    'Was kostet eine professionelle Firmenwebseite wirklich?':
      'Was kostet eine professionelle Firmenwebseite?',
    'Core Web Vitals 2026: Warum langsame Ladezeiten Millionen kosten': 'Core Web Vitals 2026',
    'Die 5 tödlichen Webdesign-Fehler, die Ihre Conversion zerstören':
      'Die 5 tödlichen Webdesign-Fehler',
    "Anti-AI Manifest: Warum 'KI-perfektes' Webdesign 2026 scheitert":
      'Anti-AI Manifest: Kein KI-Webdesign',
    'Omni-Channel Blueprint: Maximale Präsenz ohne Budget-Verschwendung':
      'Der perfekte Omni-Channel Mix',
    'Social Media Secrets 2026: Organische Reichweite ist tot?': 'Social Media Secrets 2026',
    'Warum WordPress im Jahr 2026 tot ist (und warum Agenturen es Ihnen trotzdem verkaufen)':
      'Warum WordPress 2026 tot ist',
    'Neuro-Design: Wie Sie das Unterbewusstsein Ihrer Kunden hacken': 'Neuro-Design im Webdesign',
    "Die KI-Revolution: Warum 2026 das Jahr der 'Voice-First' Strategie ist":
      'Voice-First Strategie 2026',
    'Das Anti-AI Manifest: Warum menschliches Design 2026 gewinnt 🛑':
      'Anti-AI Manifest: Menschliches Design',
    "Der 'Agentur-Killer': Warum das klassische Agentur-Modell tot ist":
      'Warum das klassische Agentur-Modell tot ist',
    'Digitale Souveränität: Warum der US Cloud Act eine Zeitbombe ist':
      'Digitale Souveränität & US Cloud Act',
    'Die Psychologie des Dark Mode: Warum Dunkel sich teuer anfühlt':
      'Die Psychologie des Dark Mode',
    'WordPress ist tot. Headless CMS beweist es (2026)': 'WordPress ist tot: Headless CMS',
    'Enterprise Security: Warum ISO 27001 das Minimum Viable Product ist':
      'Enterprise Security & ISO 27001',
    'Digital Government: Warum das OZG 2.0 scheitert (und wie wir es retten)':
      'Digital Government & OZG 2.0',
    'Der Tod des Cookies: Warum Ihre Marketing-Daten falsch sind':
      'Der Tod des Third-Party Cookies',
    'Design Systems at Scale: Wie wir 100+ Marken managen, ohne verrückt zu werden':
      'Design Systems at Scale',
    'Die Zukunft des E-Commerce: Warum Ihr Shop Geld verbrennt': 'Die Zukunft des E-Commerce',
    'Der unsichtbare ROI: Warum UX Design mehr bringt als Marketing': 'Der ROI von UX Design',
    'Die Sicherheits-Lücke: Wie Open Source Ihr Business gefährdet':
      'Open Source Sicherheitslücken',
    'A/B Testing Lügen: Warum 90% aller Tests statistischer Müll sind':
      'A/B Testing Mythen aufgedeckt',
    'Daten-Reife: Vom Bauchgefühl zur algorithmischen Dominanz':
      'Daten-Reife: Algorithmische Dominanz',
    'Die Agentur-Preis-Lüge: Was Sie wirklich für Ihren Retainer bekommen':
      'Die Agentur-Preis-Lüge',
    'Digitale Souveränität: Gehören Ihre Daten wirklich Ihnen?': 'Gehören Ihre Daten Ihnen?',
    'Top Webdesign Agenturen in Hessen 2026 (Ehrlicher Vergleich)':
      'Top Webdesign Agenturen Hessen 2026',

    // EN titles
    "Neuro-Design: How to Hack Your Customer's Subconscious": 'Neuro-Design for Websites',
    'The 5 Deadly Web Design Mistakes (And How to Survive Them)':
      'The 5 Deadly Web Design Mistakes',
    "Data Doesn't Lie: Why Your Gut Feeling Costs You Millions": "Data Doesn't Lie",
    'The Perfect Omni-Channel Mix: Be Everywhere Without Going Crazy':
      'The Perfect Omni-Channel Mix',
    'Social Media Secrets 2026: Is Organic Reach Dead?': 'Social Media Secrets 2026',
    'Why WordPress is Dying in 2026 (And Why Agencies Still Sell It)':
      'Why WordPress is Dying in 2026',
    "The AI Revolution: Why 2026 is the Year of 'Voice-First'": 'Voice-First Strategy 2026',
    'The Anti-AI Manifesto: Why Human Design Still Wins (2026) ✨': 'The Anti-AI Manifesto (2026)',
    "The 'Agency Killer': Why the Classic Agency Model is Dead": 'The Classic Agency Model is Dead',
    'Digital Sovereignty: Why the US Cloud Act is a Ticking Time Bomb':
      'Digital Sovereignty & US Cloud Act',
    'The Psychology of Dark Mode: Why It Feels Expensive': 'The Psychology of Dark Mode',
    'WordPress is Dead. Headless CMS Proves It (2026)': 'WordPress is Dead: Headless CMS',
    'Enterprise Security: Why ISO 27001 is the Minimum Viable Product':
      'Enterprise Security & ISO 27001',
    'Digital Government: Why OZG 2.0 is Failing (and How to Fix It)':
      'Digital Government & OZG 2.0',
    'The Death of the Cookie: Why Your Marketing Data is Wrong':
      'The Death of the Third-Party Cookie',
    'Design Systems at Scale: How We Manage 100+ Brands Without Going Insane':
      'Design Systems at Scale',
    'The Future of E-Commerce: Why Your Shop is Leaking Money': 'The Future of E-Commerce',
  };

  const _locale = (await params)?.locale || 'de';

  let _seoTitle = _locale === 'en' ? 'Blog Post Not Found | Coday' : 'Blog Post Not Found | Coday';
  let _seoDesc =
    _locale === 'en'
      ? 'The requested blog post could not be found.'
      : 'The requested blog post could not be found.';

  if (post) {
    let mappedTitle = _seoTitleMap[post.title] || post.title;
    _seoTitle =
      _locale === 'en' ? `${mappedTitle} | Coday Tech Blog` : `${mappedTitle} | Coday Blog`;
    if (_seoTitle.length > 65) {
      _seoTitle = _locale === 'en' ? `${mappedTitle} (EN)` : mappedTitle;
    }
    _seoDesc = post.excerpt;
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {locale === 'en'
            ? 'Expert Knowledge & Web Design Insights by Coday'
            : 'Expertenwissen und Webdesign-Insights von Coday'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {locale === 'en' ? (
            <>
              <p>
                Our in-depth blog and ever-growing knowledge base cover every facet of modern web
                design, search engine optimisation, and digital strategy. The digital landscape
                evolves rapidly, and staying ahead is essential for any business that wants to
                compete online. We share hard-won experience and proven best practices to give you
                valuable insights into web development and online marketing. From detailed analyses
                of the latest Core Web Vitals to the psychology behind high-converting landing pages
                and emerging trends in e-commerce and content management — our goal is to deliver
                actionable knowledge you can apply to your own business right away. We demystify
                complex technical concepts and explain them in plain language so you can make
                informed decisions about your digital presence.
              </p>
              <p>
                A key focus of our articles is conversion optimisation and user experience (UX). A
                website may look stunning, but if it is not user-friendly and fails to turn visitors
                into customers, it misses its purpose. We analyse which design elements build trust,
                how navigation should be structured for maximum impact, and why fast load times are
                critical to a site&apos;s success. Beyond that, we dive deep into search engine
                optimisation (SEO), showing you how strategic content marketing, technical
                improvements, and a well-planned link-building approach can sustainably boost your
                visibility on Google and other search engines. Our expertise is rooted in years of
                hands-on practice and hundreds of successful projects across a wide range of
                industries. Leverage this know-how and gain a decisive competitive advantage.
              </p>
              <p>
                In addition to technical and design topics, we explore the strategic side of
                digitalisation. We discuss the pros and cons of different content management systems
                (CMS) — headless CMS versus traditional platforms like WordPress — the importance of
                web accessibility, and the impact of regulations such as the GDPR on your online
                strategy. Our blog is aimed at business owners, marketing professionals, and anyone
                who wants to actively drive their company&apos;s digital success. Subscribe to our
                newsletter to stay up to date with new articles and never miss an important
                development in web design. Dive into our knowledge base and discover how a
                well-crafted digital strategy can generate more reach, more enquiries, and
                ultimately more revenue.
              </p>
            </>
          ) : (
            <>
              <p>
                In unserem umfassenden Blog und der stetig wachsenden Wissensdatenbank beleuchten
                wir alle Facetten des modernen Webdesigns, der Suchmaschinenoptimierung und der
                digitalen Strategie. Die digitale Landschaft entwickelt sich rasant weiter, und es
                ist für Unternehmen unerlässlich, stets auf dem neuesten Stand zu bleiben. Wir
                teilen unsere tiefgreifenden Erfahrungen und Best Practices, um Ihnen wertvolle
                Einblicke in die Welt der Webentwicklung und des Online-Marketings zu geben. Von
                tiefgreifenden Analysen zu den neuesten Core Web Vitals über die Psychologie hinter
                effektiven Landingpages bis hin zu den neuesten Trends im E-Commerce und
                Content-Management – unser Ziel ist es, Ihnen fundiertes Wissen zu vermitteln, das
                Sie direkt in Ihrem eigenen Unternehmen anwenden können. Wir entmystifizieren
                komplexe technische Konzepte und erklären sie in verständlicher Sprache, damit Sie
                fundierte Entscheidungen für Ihre digitale Präsenz treffen können.
              </p>
              <p>
                Ein zentraler Schwerpunkt unserer Artikel liegt auf der Conversion-Optimierung und
                der User Experience (UX). Eine Website kann noch so gut aussehen, wenn sie nicht
                nutzerfreundlich ist und Besucher nicht zu Kunden konvertiert, verfehlt sie ihren
                Zweck. Wir analysieren, welche Design-Elemente Vertrauen schaffen, wie eine optimale
                Navigation strukturiert sein sollte und welche Rolle schnelle Ladezeiten für den
                Erfolg einer Website spielen. Darüber hinaus widmen wir uns intensiv dem Thema
                Suchmaschinenoptimierung (SEO). Wir zeigen Ihnen, wie Sie durch strategisches
                Content-Marketing, technische Optimierungen und einen durchdachten Linkaufbau Ihre
                Sichtbarkeit bei Google und anderen Suchmaschinen nachhaltig steigern können. Unser
                Expertenwissen basiert auf jahrelanger Praxis und hunderten erfolgreichen Projekten
                in unterschiedlichsten Branchen. Profitieren Sie von diesem Know-how und verschaffen
                Sie sich einen entscheidenden Wettbewerbsvorteil.
              </p>
              <p>
                Neben technischen und gestalterischen Themen beleuchten wir auch strategische
                Aspekte der Digitalisierung. Wir diskutieren die Vor- und Nachteile verschiedener
                Content-Management-Systeme (CMS) wie Headless CMS versus traditionelle Systeme wie
                WordPress, die Bedeutung von Barrierefreiheit im Web und die Auswirkungen neuer
                gesetzlicher Vorgaben wie der DSGVO auf Ihre Online-Strategie. Unser Blog richtet
                sich an Geschäftsführer, Marketingverantwortliche und alle, die den digitalen Erfolg
                ihres Unternehmens aktiv vorantreiben wollen. Abonnieren Sie unseren Newsletter, um
                regelmäßig über neue Beiträge informiert zu werden und keine wichtigen Entwicklungen
                im Webdesign zu verpassen. Tauchen Sie ein in unsere Wissensdatenbank und entdecken
                Sie, wie Sie mit einer durchdachten digitalen Strategie mehr Reichweite, mehr
                Anfragen und letztendlich mehr Umsatz generieren können.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
