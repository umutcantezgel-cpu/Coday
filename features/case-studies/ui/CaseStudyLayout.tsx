import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurText from '../../../components/shared/ui/BlurText';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';

interface CaseStudyLayoutProps {
    title: string;
    subtitle: string;
    client: string;
    industry: string;
    services: string[];
    year: string;
    heroImage: string;
    children: React.ReactNode;
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
    title,
    subtitle,
    client,
    industry,
    services,
    year,
    heroImage,
    children
}) => {
    return (
        <div className="bg-background-light min-h-screen">
            {/* Navigation */}
            <nav className="absolute top-0 w-full z-50 p-6 md:p-8">
                <Link to="/work" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all font-medium text-sm">
                    <ArrowLeft size={16} />
                    <span>Zurück zur Übersicht</span>
                </Link>
            </nav>

            {/* Hero */}
            <header className="relative h-[80vh] min-h-[600px] flex items-end pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <OptimizedImage
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/50 to-transparent z-10"></div>
                </div>

                <div className="container mx-auto px-4 z-20 relative">
                    <div className="max-w-4xl">
                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                            {industry} Case Study
                        </span>
                        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-secondary mb-6 leading-tight">
                            <BlurText
                                text={title}
                                delay={100}
                                animateBy="words"
                                direction="top"
                                className="block"
                            />
                        </h1>
                        <p className="text-xl md:text-2xl text-text-slate max-w-2xl font-light">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </header>

            {/* Meta Grid */}
            <section className="container mx-auto px-4 -mt-12 relative z-30 mb-24">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">Kunde</h3>
                        <p className="text-lg font-bold text-secondary">{client}</p>
                    </div>
                    <div>
                        <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">Branche</h3>
                        <p className="text-lg font-bold text-secondary">{industry}</p>
                    </div>
                    <div>
                        <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">Services</h3>
                        <ul className="text-lg font-bold text-secondary space-y-1">
                            {services.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm uppercase font-bold text-gray-400 mb-2 tracking-wider">Jahr</h3>
                        <p className="text-lg font-bold text-secondary">{year}</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <article className="container mx-auto px-4 max-w-4xl prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-headings:text-secondary prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-flat mb-32">
                {children}
            </article>

            {/* Next Project CTA */}
            <section className="bg-secondary text-white py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/3"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="font-display font-black text-4xl md:text-6xl mb-8">Bereit für den nächsten Schritt?</h2>
                    <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-glow hover:-translate-y-1 transition-all">
                        <span>Projekt anfragen</span>
                        <ArrowUpRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};
