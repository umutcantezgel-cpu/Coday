import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../../features/blog/model/data';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import BlurText from '../../components/shared/ui/BlurText';
import { Helmet } from 'react-helmet-async';
import { BlockRenderer } from '../../features/blog/ui/BlockRenderer';
import { ReadingProgress, TableOfContents } from '../../features/blog/ui/ImmersiveReader';
import { RelatedArticles, ShareFAB } from '../../features/blog/ui/NavigationLoop';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/knowledge" replace />;
    }

    return (
        <div className="bg-background-light min-h-screen pb-20">
            <ReadingProgress />

            <Helmet>
                <title>{post.title} | Coday Blog</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            {/* Navigation Overlay */}
            <nav className="fixed top-24 left-4 z-40 md:left-8">
                <Link
                    to="/knowledge"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full text-secondary hover:bg-white hover:shadow-lg transition-all font-medium text-sm shadow-sm"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden md:inline">Zurück zur Übersicht</span>
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
                        <BlurText
                            text={post.title}
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="block"
                        />
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
                                    <Calendar size={16} />
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

                    {/* Sidebar ToC */}
                    <aside className="hidden lg:block lg:col-span-4 sticky top-32">
                        <TableOfContents blocks={post.content} />
                    </aside>
                </div>
            </div>

            <RelatedArticles currentSlug={post.slug} category={post.category} />
            <ShareFAB title={post.title} url={window.location.href} />
        </div>
    );
};

export default BlogPost;
