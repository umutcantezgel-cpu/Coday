import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Quote as QuoteIcon, MessageCircle } from 'lucide-react';
import { OptimizedImage } from '../../../shared/ui/OptimizedImage';
import type {
    ContentBlock,
    TextBlock,
    ImageBlock,
    QuoteBlock,
    CTABlock,
    CodeBlock,
    DividerBlock,
    GalleryBlock,
    VideoBlock
} from '../model/types';
import { slugify } from '../lib/utils';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, useScroll, useTransform, useInView } from 'motion/react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Block Components ---

const TextBlockRenderer: React.FC<{ block: TextBlock }> = ({ block }) => {
    const HeadingTag = block.level || 'h2';
    const id = block.heading ? slugify(block.heading) : undefined;

    return (
        <div className="mb-8">
            {block.heading && (
                <HeadingTag
                    id={id}
                    className={cn(
                        "font-display font-bold text-secondary mb-4 scroll-mt-32",
                        block.level === 'h3' ? 'text-2xl' :
                            block.level === 'h4' ? 'text-xl' : 'text-3xl'
                    )}
                >
                    {block.heading}
                </HeadingTag>
            )}
            <div className="prose prose-lg prose-slate leading-relaxed text-gray-600 whitespace-pre-wrap">
                {block.content}
            </div>
        </div>
    );
};

const ImageBlockRenderer: React.FC<{ block: ImageBlock }> = ({ block }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <figure
            ref={ref}
            className={cn(
                "my-12 relative z-0",
                block.layout === 'wide' ? '-mx-4 md:-mx-12' : '',
                block.layout === 'fullscreen' ? 'w-screen relative left-1/2 -translate-x-1/2' : ''
            )}
        >
            <div className={cn(
                "overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-video relative",
                block.layout === 'fullscreen' ? '' : 'rounded-3xl'
            )}>
                <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0 w-full h-full">
                    <OptimizedImage
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
            {block.caption && (
                <figcaption className="text-center text-sm text-gray-400 mt-4 font-medium italic">
                    {block.caption}
                </figcaption>
            )}
        </figure>
    );
};

const QuoteBlockRenderer: React.FC<{ block: QuoteBlock }> = ({ block }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="my-16 relative"
        >
            <div className={cn(
                "relative p-10 md:p-14 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5",
                block.variant === 'gradient'
                    ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border border-white/50 backdrop-blur-sm'
                    : 'bg-surface-light border-l-8 border-primary'
            )}>
                {/* Decorative Icon */}
                <QuoteIcon className="absolute top-8 left-8 text-primary/10 w-20 h-20 -z-0 rotate-12 transition-transform duration-700 group-hover:rotate-0" />

                <blockquote className="relative z-10 text-center md:text-left">
                    <p className={cn(
                        "font-display font-bold text-secondary mb-8 leading-snug",
                        block.variant === 'large' ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl italic'
                    )}>
                        "{block.text}"
                    </p>
                    {block.author && (
                        <footer className="flex items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
                            <span className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
                            <span>
                                <strong className="text-secondary block md:inline text-base">{block.author}</strong>
                                {block.cite && <span className="font-normal opacity-80 block md:inline"> — {block.cite}</span>}
                            </span>
                        </footer>
                    )}
                </blockquote>
            </div>
        </motion.div>
    );
};

const CTABlockRenderer: React.FC<{ block: CTABlock }> = ({ block }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-16 relative overflow-hidden rounded-[2.5rem] group"
        >
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-500" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-secondary/10 blur-[80px] rounded-full" />

            <div className="relative p-10 md:p-14 border border-white/20 rounded-[2.5rem] backdrop-blur-xl bg-white/10 shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                    <div className="text-center md:text-left md:flex-1">
                        <h3 className="text-3xl font-bold text-secondary mb-3 md:mb-4">{block.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">{block.description}</p>
                    </div>
                    <Link
                        to={block.href}
                        className="group/btn relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 transform-gpu"
                    >
                        <span className="relative z-10">{block.buttonText}</span>
                        <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const CodeBlockRenderer: React.FC<{ block: CodeBlock }> = ({ block }) => {
    return (
        <div className="my-10 rounded-2xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-gray-800 text-gray-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {block.filename && (
                        <span className="ml-3 text-xs font-mono text-gray-400">{block.filename}</span>
                    )}
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase">{block.language}</div>
            </div>

            {/* Content */}
            <div className="p-5 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                    <code>{block.code}</code>
                </pre>
            </div>
        </div>
    );
};

const DividerBlockRenderer: React.FC<{ block: DividerBlock }> = ({ block }) => {
    if (block.variant === 'dots') {
        return (
            <div className="flex items-center justify-center gap-4 my-16 text-gray-200">
                <div className="w-2 h-2 rounded-full bg-current" />
                <div className="w-2 h-2 rounded-full bg-current" />
                <div className="w-2 h-2 rounded-full bg-current" />
            </div>
        );
    }

    return <hr className="my-12 border-gray-100" />;
};

// --- Main Factory ---

export const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
    switch (block.type) {
        case 'text':
            return <TextBlockRenderer block={block} />;
        case 'image':
            return <ImageBlockRenderer block={block} />;
        case 'quote':
            return <QuoteBlockRenderer block={block} />;
        case 'cta':
            return <CTABlockRenderer block={block} />;
        case 'code':
            return <CodeBlockRenderer block={block} />;
        case 'divider':
            return <DividerBlockRenderer block={block} />;
        // Fallback for types not fully implemented but typed
        case 'gallery':
        case 'video':
            return <div className="p-4 bg-red-50 text-red-500 my-4 rounded border border-red-100 text-sm font-mono">
                Block type '{block.type}' not fully implemented yet.
            </div>;
        default:
            return null;
    }
};
