import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getBlogPost, getBlogPosts } from '@/features/blog/model/data';
import { routing } from '@/i18n/routing';
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
    title: `${post.title} | Coday Blog`,
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
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogPostClient />;
}
