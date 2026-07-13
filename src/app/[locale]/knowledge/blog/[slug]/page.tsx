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
      let finalTitle =
        locale === 'en' ? `${mappedTitle} | Coday Tech Blog` : `${mappedTitle} | Coday Blog`;
      if (finalTitle.length > 65) {
        finalTitle = locale === 'en' ? `${mappedTitle} (EN)` : mappedTitle;
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';

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
    </>
  );
}
