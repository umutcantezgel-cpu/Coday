
import React, { useState } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { Helmet } from 'react-helmet-async';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';

import { Link } from 'react-router-dom';
import { getBlogPosts } from '../../features/blog/model/data';
import { useTranslation } from 'react-i18next';

const Blog: React.FC = () => {
    const { i18n, t } = useTranslation('blog');
    const posts = getBlogPosts(i18n.language);
    const featuredPost = posts[6]; // Highlight post

    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <Helmet>
                <title>{t('hero.title')} | Coday</title>
                <meta name="description" content={t('hero.subtitle')} />
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <Link to={`/ knowledge / blog / ${featuredPost.slug} `} className="block relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                        <OptimizedImage
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            priority
                        />

                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-4">
                                    {t('highlight')}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 shadow-sm">
                                    {featuredPost.title}
                                </h2>
                                <div className="flex items-center space-x-4 text-slate-300">
                                    <span className="text-sm font-medium">{t('readTime')}: {featuredPost.readTime}</span>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-sm font-medium">{t('publishedOn')} {featuredPost.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.slice(0, 6).map((post) => (
                        <Link key={post.id} to={`/ knowledge / blog / ${post.slug} `} className="flex flex-col group cursor-pointer h-full">
                            <article className="flex flex-col h-full">
                                <div className="h-64 rounded-2xl bg-slate-100 mb-6 overflow-hidden relative shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <OptimizedImage
                                        src={post.image}
                                        alt={post.alt}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>

                                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
                                    <span>{post.category}</span>
                                    <span className="text-slate-300">•</span>
                                    <span>{post.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-slate-500 line-clamp-3 mb-4 flex-grow">
                                    {post.excerpt}
                                </p>

                                <span className="text-sm font-bold text-gray-900 flex items-center group-hover:translate-x-1 transition-transform mt-auto">
                                    {t('readMore')}
                                    <Icon name="arrow_forward" className="text-sm ml-1" />
                                </span>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Social Proof / Newsletter Teaser */}
                <div className="mt-24">
                    <div className="bg-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Background Gradients */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 lg:w-1/2">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">{t('community.label')}</span>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6" dangerouslySetInnerHTML={{ __html: t('community.title') }} />
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                {t('community.description')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder={t('community.emailPlaceholder')}
                                    className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary flex-grow"
                                />
                                <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-primary/50">
                                    {t('community.subscribe')}
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:w-5/12">
                            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-800 rotate-2 hover:rotate-0 transition-transform duration-500 group">
                                <OptimizedImage
                                    src="/images/services/drei-kunden-reviews.webp"
                                    alt="Zufriedene Community Mitglieder"
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex text-yellow-500">
                                            {[1, 2, 3, 4, 5].map(i => <Icon key={i} name="star" className="text-sm fill-current" />)}
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
