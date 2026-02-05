import React from 'react';

const posts = [
    { title: 'The Future of Web Design in 2026', category: 'Design', date: '2 Tage her', image: 'https://images.unsplash.com/photo-1549421263-606bed6e3ceb' },
    { title: 'How to scale your Agency to 1M', category: 'Business', date: '1 Woche her', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
    { title: 'Next.js 16 Features Explained', category: 'Tech', date: '2 Wochen her', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd' },
    { title: 'Why Performance matters for SEO', category: 'SEO', date: '3 Wochen her', image: 'https://images.unsplash.com/photo-1571721795195-ad9a3e6a88b0' },
];

const Blog: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-display font-black text-4xl sm:text-6xl mb-12 text-gray-900 border-b border-gray-200 pb-8">
                    Insights & <span className="text-gradient-vivid">Thoughts</span>
                </h1>

                {/* Featured */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24 items-center group cursor-pointer">
                    <div className="overflow-hidden rounded-3xl h-[400px]">
                        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div>
                        <div className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6"> Featured Story </div>
                        <h2 className="font-display font-black text-3xl sm:text-4xl mb-6 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                            Wie KI die Agenturlandschaft für immer verändert (und wie du profitierst).
                        </h2>
                        <p className="text-xl text-slate-500 mb-8 leading-relaxed">
                            Eine tiefe Analyse der aktuellen Trends und warum jetzt der beste Zeitpunkt für Nischen-Agenturen ist.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="text-sm">
                                <div className="font-bold text-gray-900">Alex Storm</div>
                                <div className="text-slate-500">5 min read</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {posts.map((post) => (
                        <div key={post.title} className="group cursor-pointer">
                            <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
                                <img src={`${post.image}?auto=format&fit=crop&w=400&q=80`} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-gray-900">
                                    {post.category}
                                </div>
                            </div>
                            <div className="text-xs font-bold text-slate-400 mb-2">{post.date}</div>
                            <h3 className="font-display font-bold text-xl leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
