import React from 'react';

const papers = [
    { title: 'The 2026 Agency Report', type: 'Report', pages: 45, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40' },
    { title: 'Ultimate SEO Checklist', type: 'Checklist', pages: 12, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
    { title: 'Design Systems Guide', type: 'E-Book', pages: 80, image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d4f' },
];

const Whitepapers: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen bg-aurora-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 text-gray-900">
                        Whitepapers & <span className="text-gradient-vivid">Guides</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Tiefgehendes Wissen zum Downloaden. Kostenlos für Mitglieder.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {papers.map((paper) => (
                        <div key={paper.title} className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm hover:shadow-aurora-lg transition-all group">
                            <div className="bg-slate-50 rounded-2xl h-64 overflow-hidden relative mb-4">
                                <img src={`${paper.image}?auto=format&fit=crop&w=500&q=80`} alt={paper.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                    {paper.type}
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <h3 className="font-display font-bold text-xl mb-2 text-gray-900">{paper.title}</h3>
                                <div className="flex justify-between items-center text-sm text-slate-500">
                                    <span>{paper.pages} Seiten PDF</span>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Whitepapers;
