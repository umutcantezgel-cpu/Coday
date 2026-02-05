import React from 'react';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';

const WHITEPAPERS = [
    {
        id: 1,
        title: "Der ultimative Web-Relaunch Guide 2026",
        description: "Alles was du wissen musst, bevor du deine neue Website planst. Inklusive Checkliste und Budget-Planer.",
        tag: "Guide",
        image: "/images/marketing/marketing-strategie-planung-konzept-01.webp",
        alt: "Strategie Planung Konzept",
        fileUrl: "/documents/web-relaunch-guide-2026.pdf"
    },
    {
        id: 2,
        title: "SEO Domination: Ranking Faktoren",
        description: "Die 200 wichtigsten Google Ranking Faktoren analysiert und priorisiert für lokales Business.",
        tag: "Checkliste",
        image: "/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp",
        alt: "SEO Datenanalyse Report",
        fileUrl: "/documents/seo-domination-guide-2026_1.pdf"
    },
    {
        id: 3,
        title: "Conversion Rate Optimierung (CRO)",
        description: "Wie du Besucher in zahlende Kunden verwandelst. Psychologische Trigger und Layout-Hacks.",
        tag: "Template",
        image: "/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp",
        alt: "Conversion Optimierung",
        fileUrl: "/documents/cro-guide-2026.pdf"
    }
];

const Whitepapers: React.FC = () => {
    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
                        Ratgeber & Ressourcen
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Kostenlose Anleitungen, Checklisten und Vorlagen für deinen Erfolg.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {WHITEPAPERS.map((paper) => (
                        <div key={paper.id} className="flex flex-col bg-white rounded-2xl border border-aurora-mist overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                            <div className="h-64 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                <OptimizedImage
                                    src={paper.image}
                                    alt={paper.alt}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <div className="w-12 h-16 bg-white shadow-lg rounded-sm transform -rotate-6 border border-gray-200 flex items-center justify-center">
                                        <span className="text-[8px] font-bold text-gray-400 rotate-90">PDF</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{paper.tag}</span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {paper.title}
                                </h3>
                                <p className="text-slate-500 mb-8 flex-1">
                                    {paper.description}
                                </p>

                                <a
                                    href={paper.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 rounded-xl border-2 border-slate-100 text-gray-900 font-bold hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center group-hover:bg-blue-50"
                                >
                                    <span className="material-symbols-outlined mr-2">download</span>
                                    Kostenlos herunterladen
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Whitepapers;
