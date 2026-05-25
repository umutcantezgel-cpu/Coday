"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { slugify } from '@/features/blog/lib/utils';
import type { ContentBlock, TextBlock } from '@/features/blog/model/types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { List, X } from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence } from 'motion/react';

// --- Reading Progress Component ---

export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
  isMobile?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks, isMobile }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter only blocks with headings
  const headings = blocks
    .filter((b): b is ContentBlock & { heading: string } => b.type === 'text' && !!b.heading)
    .map((b) => {
      const textBlock = b as TextBlock;
      return {
        id: slugify(textBlock.heading || ''),
        text: textBlock.heading || '',
        level: textBlock.level || 'h2',
      };
    });

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

  if (isMobile) {
    return (
      <div className="mb-8 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 font-display font-bold text-secondary text-sm uppercase tracking-wider bg-gray-50/50 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <List size={18} className="text-primary" />
            Inhalt
          </div>
          {isOpen ? (
            <X size={16} className="text-gray-400" />
          ) : (
            <span className="text-xs text-primary font-medium">Anzeigen</span>
          )}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <ul className="p-4 space-y-3 text-sm border-t border-gray-100 bg-white">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={cn(
                        'block py-1 transition-all duration-200 hover:text-primary',
                        activeId === heading.id
                          ? 'text-primary font-bold pl-3 border-l-2 border-primary'
                          : 'text-gray-600 pl-3 border-l-2 border-transparent'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({
                          behavior: 'smooth',
                        });
                        setIsOpen(false);
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <nav className="sticky top-32 max-h-[calc(100dvh-10rem)] overflow-auto custom-scrollbar pl-4">
      <h4 className="font-display font-bold text-secondary mb-4 text-sm uppercase tracking-wider">
        Inhalt
      </h4>
      <ul className="space-y-3 text-sm border-l border-gray-100">
        {headings.map((heading) => (
          <li key={heading.id} className="-ml-[1px]">
            <a
              href={`#${heading.id}`}
              className={cn(
                'block pl-4 py-1 border-l-2 transition-all duration-200 hover:text-primary',
                activeId === heading.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
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
