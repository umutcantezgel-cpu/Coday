'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { Link, useRouter } from '@/i18n/navigation';
import { getLocalizedPath } from '@/shared/lib/navigation';
import { ArrowLeft, CalendarBlank, Clock, ArrowRight, EnvelopeSimple } from '@phosphor-icons/react';
import { getBlogPost, getBlogPosts } from '@/features/blog/model/data';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import BlurText from '@/shared/ui/BlurText';
import { BlockRenderer } from '@/features/blog/ui/BlockRenderer';
import { ReadingProgress, TableOfContents } from '@/features/blog/ui/ImmersiveReader';
import { RelatedArticles, ShareFAB } from '@/features/blog/ui/NavigationLoop';
import { SeoAuthorBlock } from '@/features/knowledge/ui/SeoAuthorBlock';
import { ReadingScore } from '@/features/blog/ui/ReadingScore';
import { useTranslations, useLocale } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';

const BlogPost: React.FC = () => {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const locale = useLocale();
  const t = useTranslations('blog');
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setCurrentUrl(window.location.href), 0);
    return () => clearTimeout(timer);
  }, []);

  const slug = rawSlug?.endsWith('/') ? rawSlug.slice(0, -1) : rawSlug;

  const post = getBlogPost(slug || '', locale);

  const currentLocale = locale.startsWith('en') ? 'en' : 'de';
  const otherLocale = currentLocale === 'en' ? 'de' : 'en';

  const otherPost = React.useMemo(() => {
    if (!post) return null;
    const otherLangPosts = getBlogPosts(otherLocale);
    return otherLangPosts.find((p) => String(p.id) === String(post.id));
  }, [post, otherLocale]);

  const alternateLinks = React.useMemo(() => {
    if (!otherPost) return undefined;
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codayweb.de';
    const path = getLocalizedPath(`/knowledge/blog/${otherPost.slug}`, otherLocale);
    return [{ hreflang: otherLocale, href: `${BASE_URL}${path}` }];
  }, [otherPost, otherLocale]);

  if (!post) {
    const otherLangPost = getBlogPost(slug || '', otherLocale);

    if (otherLangPost) {
      const correctPost = getBlogPosts(currentLocale).find(
        (p) => String(p.id) === String(otherLangPost.id)
      );
      if (correctPost) {
        if (typeof window !== 'undefined') {
          router.replace(`/knowledge/blog/${correctPost.slug}`);
        }
        return null;
      }
    }
    if (typeof window !== 'undefined') {
      router.replace('/knowledge/blog');
    }
    return null;
  }

  return (
    <div className="bg-background-light min-h-dvh pb-20">
      <ReadingProgress />

      <SeoHead
        title={`${post.title} | Coday Blog`}
        description={post.excerpt}
        image={post.image}
        pageType="article"
        alternateLinks={alternateLinks}
        breadcrumbs={[
          { name: 'Home', url: `https://www.codayweb.de/${currentLocale}` },
          { name: 'Knowledge', url: `https://www.codayweb.de/${currentLocale}/knowledge` },
          { name: 'Blog', url: `https://www.codayweb.de/${currentLocale}/knowledge/blog` },
          {
            name: post.title,
            url: `https://www.codayweb.de/${currentLocale}/knowledge/blog/${post.slug}`,
          },
        ]}
        schemaData={{
          article: {
            headline: post.title,
            image: post.image,
            datePublished: post.date || new Date().toISOString(),
            author: post.author,
            description: post.excerpt,
            wordCount:
              post.content.reduce((acc, block) => {
                const text = 'body' in block && typeof block.body === 'string' ? block.body : '';
                return acc + text.split(/\s+/).filter(Boolean).length;
              }, 0) || undefined,
            articleSection: post.category,
            keywords: [post.category, 'Coday', 'Webentwicklung'],
          },
        }}
      />

      {/* Navigation Overlay */}
      <nav className="fixed top-24 left-4 z-40 md:left-8">
        <Link
          href="/knowledge/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full text-secondary hover:bg-white hover:shadow-lg transition motion-reduce:duration-[0.01ms] font-medium text-sm shadow-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden md:inline">{t('backToOverview')}</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[600px] flex items-end pb-16 overflow-hidden mt-24 md:mt-0 rounded-b-[3rem]">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={post.image}
            alt={post.alt}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/90 to-black/30 z-10"></div>
        </div>

        <div className="container mx-auto px-4 z-20 relative max-w-4xl text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
              {post.category}
            </span>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-secondary border border-white/10">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 leading-tight drop-shadow-sm">
            <BlurText text={post.title} delay={50} animateBy="words" className="block" />
          </h1>

          <p className="text-xl md:text-2xl text-content-base font-medium leading-relaxed drop-shadow-sm bg-white/50 backdrop-blur-md p-6 rounded-2xl inline-block border border-white/60 shadow-sm max-w-3xl">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Content Body */}
      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article */}
          <article className="lg:col-span-8 lg:col-start-1">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-12 lg:p-16 shadow-2xl border border-gray-100">
              {/* Meta Data */}
              <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-8 mb-10 text-sm text-gray-500 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-primary overflow-hidden border-2 border-primary/10">
                    <span className="font-bold text-lg">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="font-bold text-secondary block text-base">{post.author}</span>
                    <span className="text-xs text-slate-400">{t('authorRole')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                  <CalendarBlank size={18} className="text-slate-400" aria-hidden="true" />
                  <time dateTime={post.date} className="font-medium text-slate-600">
                    {post.date}
                  </time>
                </div>
              </div>

              {/* Dynamic Sections (Constrained Width for readability) */}
              <div className="max-w-prose mx-auto">
                <div className="lg:hidden">
                  <TableOfContents blocks={post.content} isMobile />
                </div>
                <div className="prose prose-lg text-content-base prose-headings:text-content-base prose-p:text-content-base prose-strong:text-content-base prose-li:text-content-base prose-slate prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-2xl prose-img:shadow-md">
                  {post.content.map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                  ))}
                </div>
              </div>

              {/* Contextual CTA */}
              <div className="max-w-prose mx-auto mt-16 mb-16 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-2">{t('cta.title')}</h2>
                    <p className="text-slate-600">{t('cta.desc')}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="shrink-0 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition motion-reduce:duration-[0.01ms] transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    <EnvelopeSimple size={20} />
                    {t('cta.button')}
                  </Link>
                </div>
              </div>

              {/* Author Box */}
              <div className="max-w-prose mx-auto border-t border-gray-100 pt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-24 h-24 rounded-full bg-surface-light flex items-center justify-center text-primary overflow-hidden shrink-0 shadow-md">
                  <span className="font-bold text-3xl">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary mb-2">{post.author}</h2>
                  <p className="text-slate-500 mb-4 leading-relaxed">{t('authorDesc')}</p>
                  <Link
                    href="/about"
                    className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition motion-reduce:duration-[0.01ms]"
                  >
                    {t('moreAboutAuthor')}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar ToC & Gamification */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32">
            <ReadingScore currentPostId={post.id} />
            <TableOfContents blocks={post.content} />
          </aside>
        </div>
      </div>

      <SeoAuthorBlock />
      <RelatedArticles currentSlug={post.slug} category={post.category} />
      <ShareFAB title={post.title} url={currentUrl} />
    </div>
  );
};

export default BlogPost;
