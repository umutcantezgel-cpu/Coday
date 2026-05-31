'use client';

import React, { useState, useMemo } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight, Star, MagnifyingGlass } from '@phosphor-icons/react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

import { Link } from '@/i18n/navigation';
import { getBlogPosts } from '@/features/blog/model/data';
import { useTranslation, Trans } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

const Blog: React.FC = () => {
  const { i18n, t } = useTranslation('blog');
  const posts = getBlogPosts(i18n.language);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Extract unique categories
  const categories = useMemo(() => {
    const allCats = posts.map((p) => p.category);
    return ['All', ...Array.from(new Set(allCats))];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, debouncedSearchQuery]);

  // Determine featured post
  const isFiltering = activeCategory !== 'All' || debouncedSearchQuery !== '';
  // Only show featured post if not filtering
  const featuredPost =
    !isFiltering && posts.length > 6
      ? posts[6]
      : !isFiltering && posts.length > 0
        ? posts[0]
        : null;

  // The posts to show in the grid. If showing featured, maybe exclude it from the grid?
  // Let's exclude featuredPost from the grid if we are not filtering, so we don't duplicate it.
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="bg-background-light min-h-dvh pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">{t('hero.subtitle')}</p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <OptimizedIcon
                icon={MagnifyingGlass}
                className="text-slate-400 group-focus-within:text-primary transition-colors motion-reduce:duration-[0.01ms]"
                size="md"
              />
            </div>
            <input
              type="text"
              placeholder={t('searchPlaceholder', 'Suchen Sie nach Artikeln...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm transition-all motion-reduce:duration-[0.01ms] text-slate-700"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <AnimatePresence>
            {categories.map((category) => (
              <motion.button
                key={category}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors motion-reduce:duration-[0.01ms] duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-white text-slate-600 border border-gray-200 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {category === 'All' ? t('categories.all', 'Alle') : category}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Link
              href={`/knowledge/blog/${featuredPost.slug}`}
              className="block relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer h-[500px] hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-glow transition-all motion-reduce:duration-[0.01ms] duration-500 ease-out"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <OptimizedImage
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform motion-reduce:duration-[0.01ms] duration-700"
                priority
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform motion-reduce:duration-[0.01ms] duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-4">
                    {t('highlight')}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 shadow-sm">
                    {featuredPost.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <span className="text-sm font-medium">
                      {t('readTime')}: {featuredPost.readTime}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-sm font-medium">
                      {t('publishedOn')} {featuredPost.date}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Article Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {gridPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full"
              >
                <Link
                  href={`/knowledge/blog/${post.slug}`}
                  className="flex flex-col group cursor-pointer h-full"
                >
                  <article className="flex flex-col h-full bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1.5 hover:scale-[1.02] transition-all motion-reduce:duration-[0.01ms] duration-500 ease-out">
                    <div className="h-56 rounded-2xl bg-slate-100 mb-6 overflow-hidden relative">
                      <OptimizedImage
                        src={post.image}
                        alt={post.alt}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                        {post.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{post.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors motion-reduce:duration-[0.01ms] line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-500 line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                          {/* Placeholder for author image, or initials */}
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500 bg-slate-100">
                            {post.author.charAt(0)}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{post.author}</span>
                      </div>
                      <span className="text-sm font-bold text-primary flex items-center group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]">
                        {t('readMore')}
                        <OptimizedIcon icon={ArrowRight} className="text-sm ml-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <OptimizedIcon
              icon={MagnifyingGlass}
              className="mx-auto text-slate-300 mb-4"
              size="xl"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('noResults', 'Keine Artikel gefunden')}
            </h3>
            <p className="text-slate-500 mb-6">
              {t(
                'noResultsDesc',
                'Versuchen Sie es mit einem anderen Suchbegriff oder einer anderen Kategorie.'
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="active:scale-[0.97] px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors motion-reduce:duration-[0.01ms]"
            >
              {t('resetFilters', 'Filter zurücksetzen')}
            </button>
          </div>
        )}

        {/* Social Proof / Newsletter Teaser */}
        <div className="mt-24">
          <div className="bg-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 lg:w-1/2">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('community.label')}
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
                <Trans i18nKey="community.title" components={{ br: <br /> }} />
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {t('community.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder={t('community.emailPlaceholder')}
                  className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary flex-grow"
                />
                <button className="active:scale-[0.97] px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-primary/50">
                  {t('community.subscribe')}
                </button>
              </div>
            </div>

            <div className="relative z-10 lg:w-5/12">
              <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-800 rotate-2 hover:rotate-0 transition-transform motion-reduce:duration-[0.01ms] duration-500 group">
                <OptimizedImage
                  src="/images/services/drei-kunden-reviews.webp"
                  alt={t('community.socialProofAlt')}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <OptimizedIcon
                          key={i}
                          icon={Star}
                          className="text-sm fill-current"
                          weight="fill"
                        />
                      ))}
                    </div>
                    <span className="text-white font-bold">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-300">"{t('community.socialProof')}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
