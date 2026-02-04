import React, { useRef, useState } from 'react';
import { m, useScroll } from 'motion/react';
import BlurText from '../../components/shared/ui/BlurText';
import { CaseStudyCard } from '../../features/case-studies/ui/CaseStudyCard';

const Work: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [filter, setFilter] = useState('all');

    const handleFilterChange = (filter: string) => {
        setFilter(filter);
    };

    // Placeholder data - in a real app this would be fetched or statically generated
    const projects = [
        {
            id: 'batherm',
            title: "Batherm",
            client: "Batherm",
            industry: "Sanitär & Heizung",
            slug: "batherm",
            image: "/images/portfolio/batherm-real.png",
            excerpt: "Vom lokalen Handwerk zur digitalen Autorität. Ein Meisterwerk für meisterhafte Installationen.",
            tags: ["Next.js", "Tailwind", "Local SEO"],
            category: "development",
            externalLink: "https://www.batherm.de"
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div ref={containerRef} className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                            Unser Portfolio
                        </span>
                        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-secondary mb-8 leading-tight">
                            <BlurText
                                text="Ausgewählte"
                                delay={100}
                                animateBy="words"
                                direction="top"
                                className="block"
                            />
                            <span className="text-primary">Arbeiten.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-slate max-w-2xl font-light">
                            Digitale Erlebnisse, die Marken transformieren und Nutzer begeistern.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="container mx-auto px-4 mb-16">
                <div className="flex flex-wrap gap-4">
                    {['all', 'design', 'development', 'marketing'].map((f) => (
                        <button
                            key={f}
                            onClick={() => handleFilterChange(f)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${filter === f
                                ? 'bg-secondary text-white shadow-lg'
                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {f === 'all' ? 'Alle Projekte' : f}
                        </button>
                    ))}
                </div>
            </section>

            {/* Projects Grid */}
            <section className="container mx-auto px-4 pb-32">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <m.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                        >
                            <CaseStudyCard {...project} />
                        </m.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Work;
