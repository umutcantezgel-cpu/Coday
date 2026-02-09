import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';

export interface CaseStudyCardProps {
    title: string;
    excerpt: string;
    client: string;
    industry: string;
    slug: string;
    image: string;
    tags: string[];
    externalLink?: string;
}

const CaseStudyInnerContent: React.FC<Pick<CaseStudyCardProps, 'title' | 'client' | 'industry' | 'image' | 'tags' | 'excerpt'>> = ({
    title,
    client,
    industry,
    image,
    tags,
    excerpt
}) => (
    <article className="bg-white rounded-3xl overflow-hidden shadow-flat border border-gray-100 h-full flex flex-col hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
            <OptimizedImage
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary">
                {industry}
            </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col">
            <div className="mb-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{client}</span>
                <h3 className="font-display font-bold text-2xl text-secondary mt-1 group-hover:text-primary transition-colors">
                    {title}
                </h3>
            </div>

            <p className="text-text-slate mb-6 flex-1 line-clamp-3">
                {excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                    {tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">+{tags.length - 2}</span>
                    )}
                </div>

                <span className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowUpRight size={20} />
                </span>
            </div>
        </div>
    </article>
);

export const CaseStudyCard: React.FC<CaseStudyCardProps> = (props) => {
    const { externalLink, slug, ...contentProps } = props;

    if (externalLink) {
        return (
            <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
            >
                <CaseStudyInnerContent {...contentProps} />
            </a>
        );
    }

    return (
        <Link to={`/work/${slug}`} className="group block h-full">
            <CaseStudyInnerContent {...contentProps} />
        </Link>
    );
};
