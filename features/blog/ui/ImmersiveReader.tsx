import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { slugify } from '../lib/utils';
import type { ContentBlock } from '../model/types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Reading Progress Component ---

export const ReadingProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
            style={{ scaleX }}
        />
    );
};

// --- Table of Contents Component ---

interface TableOfContentsProps {
    blocks: ContentBlock[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks }) => {
    const [activeId, setActiveId] = useState<string>('');

    // Filter only blocks with headings
    const headings = blocks.filter(
        (b): b is ContentBlock & { heading: string } =>
            b.type === 'text' && !!(b as any).heading
    ).map((b: any) => ({
        id: slugify(b.heading),
        text: b.heading,
        level: b.level || 'h2'
    }));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-auto custom-scrollbar pl-4">
            <h4 className="font-display font-bold text-secondary mb-4 text-sm uppercase tracking-wider">
                Inhalt
            </h4>
            <ul className="space-y-3 text-sm border-l border-gray-100">
                {headings.map((heading) => (
                    <li key={heading.id} className="-ml-[1px]">
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block pl-4 py-1 border-l-2 transition-all duration-200 hover:text-primary",
                                activeId === heading.id
                                    ? "border-primary text-primary font-medium"
                                    : "border-transparent text-gray-500 hover:border-gray-300"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
