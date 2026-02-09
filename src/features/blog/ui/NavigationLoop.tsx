import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShareNetwork, ArrowRight, TwitterLogo, LinkedinLogo, Copy, Check } from '@phosphor-icons/react';
import { getBlogPosts } from '../model/data';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const RelatedArticles: React.FC<{ currentSlug: string; category: string }> = ({ currentSlug, category }) => {
    const { i18n, t } = useTranslation('blog');
    const allPosts = getBlogPosts(i18n.language);

    // Find up to 2 posts in the same category, excluding current
    const related = allPosts
        .filter(post => post.category === category && post.slug !== currentSlug)
        .slice(0, 2);

    // If not enough, fill with latest posts
    if (related.length < 2) {
        const others = allPosts
            .filter(post => post.slug !== currentSlug && !related.find(r => r.slug === post.slug))
            .slice(0, 2 - related.length);
        related.push(...others);
    }

    if (related.length === 0) return null;

    return (
        <section className="py-20 border-t border-gray-100 bg-surface-light/30">
            <div className="container mx-auto px-4 max-w-4xl">
                <h3 className="text-2xl font-display font-bold text-secondary mb-10">
                    {t('relatedArticles')}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    {related.map((post) => (
                        <Link
                            key={post.id}
                            to={`/knowledge/blog/${post.slug}`}
                            className="group block bg-white rounded-3xl p-2 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                        >
                            <div className="flex gap-6 items-center h-full">
                                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden relative">
                                    <OptimizedImage
                                        src={post.image}
                                        alt={post.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 py-2 pr-4">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                                        {post.category}
                                    </span>
                                    <h4 className="font-bold text-secondary text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center text-sm text-gray-400 font-medium group-hover:text-primary transition-colors">
                                        {t('readArticle')}
                                        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
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

export const ShareFAB: React.FC<{ title: string; url: string }> = ({ title, url = window.location.href }) => {
    const { t } = useTranslation('blog');
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
        const text = `${t('shareTitle')}: "${title}"`;

        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-full mb-4 right-0 flex flex-col gap-2"
                    >
                        <button
                            onClick={() => handleShare('twitter')}
                            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            aria-label="Share on Twitter"
                        >
                            <TwitterLogo size={20} />
                        </button>
                        <button
                            onClick={() => handleShare('linkedin')}
                            className="w-12 h-12 bg-[#0077b5] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            aria-label="Share on LinkedIn"
                        >
                            <LinkedinLogo size={20} />
                        </button>
                        <button
                            onClick={() => handleShare('copy')}
                            className="w-12 h-12 bg-white text-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            aria-label="Copy Link"
                        >
                            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 z-50"
            >
                <ShareNetwork size={24} />
            </motion.button>
        </div>
    );
};
