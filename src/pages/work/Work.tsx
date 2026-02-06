import React, { useState, useCallback } from 'react';
import BlurText from '../../shared/ui/BlurText';
import { CaseStudyCard } from '../../features/case-studies/ui/CaseStudyCard';

const Work: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const handleFilterChange = useCallback((index: number) => {
        const filters = ['all', 'design', 'development', 'marketing'];
        setFilter(filters[index]);
    }, []);

    // Placeholder data - in a real app this would be fetched or statically generated
    const projects = [
        {
            id: 'batherm',
            title: "Batherm",
            client: "Batherm",
            industry: "Sanitär & Heizung",
            slug: "batherm",
            image: "/images/portfolio/batherm-illustration.jpg",
            excerpt: "Vom lokalen Handwerk zur digitalen Autorität. Ein Meisterwerk für meisterhafte Installationen.",
            tags: ["Next.js", "Tailwind", "Lokale Suchmaschinen"],
            category: "development",
            externalLink: "https://www.batherm.de"
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);



    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                            Unser Portfolio
                        </span>
                        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-secondary leading-tight mb-6">
                            Ausgewählte Arbeiten.
                        </h1>
                        <div className="max-w-2xl">
                            <p className="text-xl md:text-2xl text-text-slate font-light leading-relaxed">
                                Digitale Erlebnisse, die Marken transformieren. Design, das Nutzer begeistert. Programmcode, der Geschwindigkeit liefert.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Static Filter Nav */}
            <section className="container mx-auto px-4 mb-16">
                <div className="flex flex-wrap gap-4">
                    {[
                        { label: 'Alle Projekte', id: 0 },
                        { label: 'Design', id: 1 },
                        { label: 'Entwicklung', id: 2 },
                        { label: 'Marketing', id: 3 },
                    ].map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleFilterChange(index)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${['all', 'design', 'development', 'marketing'][index] === filter
                                ? 'bg-primary text-white'
                                : 'bg-white text-secondary hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Projects Grid - Static */}
            <section className="container mx-auto px-4 pb-32">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="h-full">
                            <div className="h-full bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <CaseStudyCard {...project} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Work;

