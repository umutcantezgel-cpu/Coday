import React from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { getBlogPosts } from '@/features/blog/model/data';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { useTranslations, useLocale } from 'next-intl';

export { ShareFAB } from './ShareFAB';

export const RelatedArticles: React.FC<{ currentSlug: string; category: string }> = ({
  currentSlug,
  category,
}) => {
  const t = useTranslations('blog');
  const locale = useLocale();
  const allPosts = getBlogPosts(locale);

  // Find up to 2 posts in the same category, excluding current
  const related = allPosts
    .filter((post) => post.category === category && post.slug !== currentSlug)
    .slice(0, 2);

  // If not enough, fill with latest posts
  if (related.length < 2) {
    const others = allPosts
      .filter((post) => post.slug !== currentSlug && !related.find((r) => r.slug === post.slug))
      .slice(0, 2 - related.length);
    related.push(...others);
  }

  if (related.length === 0) return null;

  return (
    <section className="py-[var(--space-section)] border-t border-gray-100 bg-surface-light/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h3 className="text-2xl font-display font-bold text-secondary mb-10">
          {t('relatedArticles')}
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {related.map((post) => (
            <Link
              key={post.id}
              href={`/knowledge/blog/${post.slug}`}
              className="group block bg-white rounded-3xl p-2 shadow-sm hover:shadow-xl transition-all motion-reduce:duration-[0.01ms] duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="flex gap-6 items-center h-full">
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden relative">
                  <OptimizedImage
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] duration-500"
                  />
                </div>
                <div className="flex-1 py-2 pr-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                    {post.category}
                  </span>
                  <h4 className="font-bold text-secondary text-lg leading-snug mb-2 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms] line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-400 font-medium group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                    {t('readArticle')}
                    <ArrowRight
                      size={14}
                      className="ml-1 group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
