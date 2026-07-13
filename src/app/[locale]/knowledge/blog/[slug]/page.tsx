import { generatePageMetadata } from '@/lib/metadata';
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
      let finalTitle = `${mappedTitle} | Coday Blog`;
      if (finalTitle.length > 65) {
        finalTitle = mappedTitle;
      }
      return finalTitle;
    })(),
    description: post.excerpt,
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
    alternates: {
      canonical: `${BASE_URL}/${locale}/knowledge/blog/${slug}`,
    },
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
          getOrganizationSchema(),
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en' ? 'Blog Post Not Found | Coday' : 'Blog Post Not Found | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'The requested blog post could not be found.'
      : 'The requested blog post could not be found.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? `Coday is your professional web design agency from Wetzlar (Hesse) and your reliable partner for digital excellence, UI/UX design, and technical web development at the highest level. We specialize in designing and developing custom, high-performance, and future-proof digital solutions for small and medium-sized enterprises, innovative startups, as well as established corporations. Our extensive portfolio of services ranges from the conceptualization and implementation of modern web applications, complex corporate websites, B2B and B2C e-commerce platforms, to the integration of flexible headless CMS systems and robust API connections. For the technical execution, we consistently rely on state-of-the-art and proven technologies such as Next.js, React, TypeScript, Vercel, and Tailwind CSS to ensure unparalleled quality, security, and scalability. We deeply understand that a successful digital presence in today's highly competitive landscape requires much more than just an appealing visual design. It must function as a powerful sales channel, build lasting customer trust, and deliver measurable business results. For this reason, we place an extremely strong focus on comprehensive search engine optimization (SEO), lightning-fast loading times (Performance & Core Web Vitals), strict digital accessibility (Accessibility Standards), and an outstanding, user-centric user experience (UX) in every single project we undertake. Our highly experienced web developers and designers will guide you as your dedicated digital partners throughout the entire project lifecycle: starting with initial strategic consulting, through detailed prototyping and wireframing, all the way to a seamless launch, ongoing hosting, and long-term technical maintenance. Thanks to our data-driven approach and our extensive expertise across various industries – including automotive, construction, hospitality, real estate, healthcare, professional services, and consulting – we create digital brand experiences that sustainably inspire your demanding target audience and measurably increase your conversion rates. Coday stands for transparent communication, premium code quality, and genuine partnership. Let us drive your digital transformation forward together, digitize your business processes, and successfully translate your entrepreneurial vision into the digital age.`
            : `Coday ist Ihre professionelle Webdesign Agentur aus Wetzlar (Hessen) und Ihr verlässlicher Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung auf höchstem Niveau. Wir haben uns darauf spezialisiert, maßgeschneiderte, hochperformante und zukunftssichere digitale Lösungen für kleine und mittelständische Unternehmen, innovative Startups sowie etablierte Konzerne zu konzipieren und zu entwickeln. Unser umfangreiches Leistungsportfolio reicht von der Konzeption und Umsetzung moderner Webanwendungen, komplexer Corporate Websites, B2B und B2C E-Commerce Plattformen, bis hin zur Integration flexibler Headless CMS Systeme und API-Schnittstellen. Bei der technischen Umsetzung setzen wir konsequent auf modernste und bewährte Technologien wie Next.js, React, TypeScript, Vercel und Tailwind CSS, um höchste Qualität und Skalierbarkeit zu gewährleisten. Wir verstehen tiefgründig, dass eine erfolgreiche digitale Präsenz in der heutigen Zeit weit mehr als nur ein ansprechendes visuelles Design benötigt. Sie muss als starker Vertriebskanal fungieren, Vertrauen aufbauen und messbare geschäftliche Ergebnisse liefern. Aus diesem Grund legen wir bei jedem Projekt einen extrem starken Fokus auf ganzheitliche Suchmaschinenoptimierung (SEO), blitzschnelle Ladezeiten (Performance & Core Web Vitals), strikte Barrierefreiheit (Accessibility Standards) sowie eine herausragende, nutzerzentrierte User Experience (UX). Unsere erfahrenen Webentwickler und Designer begleiten Sie als digitale Partner durch den gesamten Prozess: angefangen bei der initialen Strategieberatung, über detailliertes Prototyping und Wireframing, bis hin zum nahtlosen Launch, fortlaufendem Hosting und langfristiger technischer Wartung. Dank unseres datengetriebenen Ansatzes und unserer weitreichenden Expertise in diversen Branchen – darunter Automobil, Handwerk, Gastronomie, Immobilien, Gesundheitswesen, Dienstleistung und Unternehmensberatung – kreieren wir digitale Markenerlebnisse, die Ihre anspruchsvolle Zielgruppe nachhaltig begeistern und Ihre Konversionsraten messbar steigern. Coday steht für transparente Kommunikation, erstklassige Code-Qualität und echte Partnerschaft. Lassen Sie uns gemeinsam Ihre digitale Transformation vorantreiben, Prozesse digitalisieren und Ihre unternehmerische Vision erfolgreich ins digitale Zeitalter übersetzen.`}
        </p>
      </div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient />
    </>
  );
}
