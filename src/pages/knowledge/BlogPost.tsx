import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { getLocalizedPath } from '../../shared/lib/navigation';
import { ArrowLeft, CalendarBlank, Clock, User } from '@phosphor-icons/react';
import { getBlogPost, getBlogPosts } from '../../features/blog/model/data';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import BlurText from '../../shared/ui/BlurText';
import { BlockRenderer } from '../../features/blog/ui/BlockRenderer';
import { ReadingProgress, TableOfContents } from '../../features/blog/ui/ImmersiveReader';
import { RelatedArticles, ShareFAB } from '../../features/blog/ui/NavigationLoop';
import { ReadingScore } from '../../features/blog/ui/ReadingScore';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/shared/ui/SeoHead';

const BlogPost: React.FC = () => {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const { i18n, t } = useTranslation('blog');
  const [currentUrl, setCurrentUrl] = React.useState('');

  React.useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Remove potential trailing slash
  const slug = rawSlug?.endsWith('/') ? rawSlug.slice(0, -1) : rawSlug;

  // 1. Try finding the post in the current language
  const post = getBlogPost(slug || '', i18n.language);

  // 2. If not found, it might be a slug from another language (e.g. user utilized language switcher)
  const currentLocale = i18n.language.startsWith('en') ? 'en' : 'de';
  const otherLocale = currentLocale === 'en' ? 'de' : 'en';

  // Find the alternate language post for SEO

  const otherPost = React.useMemo(() => {
    if (!post) return null;
    const otherLangPosts = getBlogPosts(otherLocale);
    return otherLangPosts.find((p) => String(p.id) === String(post.id));
  }, [post, otherLocale]);

  const alternateLinks = React.useMemo(() => {
    if (!otherPost) return undefined;

    // Construct absolute URL for the alternate link
    const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://www.codayweb.de';
    const path = getLocalizedPath(`/knowledge/blog/${otherPost.slug}`, otherLocale);

    return [
      {
        hreflang: otherLocale,
        href: `${BASE_URL}${path}`,
      },
    ];
  }, [otherPost, otherLocale]);

  if (!post) {
    const otherLangPost = getBlogPost(slug || '', otherLocale);

    if (otherLangPost) {
      const correctPost = getBlogPosts(currentLocale).find(
        (p) => String(p.id) === String(otherLangPost.id)
      );
      if (correctPost) {
        return (
          <Navigate
            to={getLocalizedPath(`/knowledge/blog/${correctPost.slug}`, i18n.language)}
            replace
          />
        );
      }
    }
    return <Navigate to={getLocalizedPath('/knowledge/blog', i18n.language)} replace />;
  }

  return (
    <div className="bg-background-light min-h-screen pb-20">
      <ReadingProgress />

      <SeoHead
        title={`${post.title} | Coday Blog`}
        description={post.excerpt}
        image={post.image}
        pageType="article"
        alternateLinks={alternateLinks}
        schemaData={{
          article: {
            headline: post.title,
            image: post.image,
            datePublished: new Date().toISOString(), // Fallback as date isn't ISO. Ideally should parse post.date
            author: post.author,
            description: post.excerpt,
          },
        }}
      />

      {/* Navigation Overlay */}
      <nav className="fixed top-24 left-4 z-40 md:left-8">
        <Link
          to="/knowledge/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full text-secondary hover:bg-white hover:shadow-lg transition-all font-medium text-sm shadow-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden md:inline">{t('blog:backToOverview')}</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden mt-24 md:mt-0 rounded-b-[3rem]">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={post.image}
            alt={post.alt}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/80 to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-4 z-20 relative max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
              {post.category}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-secondary border border-white/10">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl text-secondary mb-6 leading-tight drop-shadow-sm">
            <BlurText text={post.title} delay={50} animateBy="words" className="block" />
          </h1>

          <p className="text-xl md:text-2xl text-text-slate font-light leading-relaxed drop-shadow-sm bg-white/30 backdrop-blur-sm p-4 rounded-xl inline-block border border-white/40">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Content Body */}
      <div className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article */}
          <main className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              {/* Meta Data */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-primary">
                    <User size={16} />
                  </span>
                  <span className="font-medium text-secondary">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarBlank size={16} />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Dynamic Sections */}
              <div className="md:px-4">
                {post.content.map((block) => (
                  <BlockRenderer key={block.id} block={block} />
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar ToC & Gamification */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32">
            <ReadingScore currentPostId={post.id} />
            <TableOfContents blocks={post.content} />
          </aside>
        </div>
      </div>

      <RelatedArticles currentSlug={post.slug} category={post.category} />
      <ShareFAB title={post.title} url={currentUrl} />
    </div>
  );
};

export default BlogPost;
