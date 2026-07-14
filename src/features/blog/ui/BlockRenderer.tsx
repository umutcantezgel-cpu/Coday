import React from 'react';
import { CheckSquare, ArrowsLeftRight } from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { KeyTakeaways } from '@/features/blog/ui/KeyTakeaways';
import { GlossaryTerm } from '@/features/blog/ui/GlossaryTerm';
import { getGlossaryTerms } from '@/features/blog/model/glossary';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

const LazyCodeBlock = dynamic(() => import('./LazyCodeBlock'), {
  ssr: false,
  loading: () => (
    <div className="p-8 text-center text-gray-500 font-mono text-sm animate-pulse">
      Loading code block...
    </div>
  ),
});

import type {
  ContentBlock,
  TextBlock,
  ImageBlock,
  QuoteBlock,
  CTABlock,
  CodeBlock,
  DividerBlock,
  ComparisonBlock,
  ChecklistBlock,
  AccordionBlock,
  InteractiveBlock,
  KeyTakeawaysBlock,
} from '@/features/blog/model/types';
import { slugify } from '@/features/blog/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  ImageBlockRenderer,
  QuoteBlockRenderer,
  CTABlockRenderer,
  InteractiveBlockRenderer,
  AccordionItem,
} from './ClientBlocks';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Block Components ---

const TextBlockRenderer: React.FC<{ block: TextBlock }> = ({ block }) => {
  const HeadingTag = block.level || 'h2';
  const id = block.heading ? slugify(block.heading) : undefined;
  const locale = useLocale();

  // Glossary Injection Logic
  const renderContentWithGlossary = (text: string) => {
    const terms = getGlossaryTerms(locale);
    // Simple regex to find terms that match keys in GLOSSARY_TERMS (case insensitive or exact?)
    // For simplicity and performance, we'll check for exact matches of defined terms.
    // To avoid replacing inside existing tags or partial words, we use word boundaries.
    // However, React replacement is tricky. We'll split the string.

    let parts: (string | React.ReactNode)[] = [text];

    Object.entries(terms).forEach(([term, definition]) => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          // Split by the term, allow case insensitive match? Let's stick to sensitive for now or simple loose match.
          // Doing exact case match for now to avoid "Digital" matching inside "Digitally" incorrectly if not careful.
          const regex = new RegExp(`\\b(${term})\\b`, 'g');
          const split = part.split(regex);

          split.forEach((str, i) => {
            // every odd index is a match because split captures the group
            if (i % 2 === 1) {
              newParts.push(
                <GlossaryTerm key={`${term}-${i}`} term={str} definition={definition}>
                  {str}
                </GlossaryTerm>
              );
            } else {
              newParts.push(str);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div className="mb-8">
      {block.heading && (
        <HeadingTag
          id={id}
          className={cn(
            'font-display font-bold text-secondary mb-4 scroll-mt-32',
            block.level === 'h3'
              ? 'text-2xl mt-8'
              : block.level === 'h4'
                ? 'text-xl mt-6'
                : 'text-3xl mt-12'
          )}
        >
          {block.heading}
        </HeadingTag>
      )}
      <div className="prose prose-lg prose-slate leading-relaxed text-gray-600">
        {block.content
          .split('\n\n')
          .filter((p) => p.trim() !== '')
          .map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h4 key={index} className="text-xl font-bold text-secondary mt-6 mb-4">
                  {renderContentWithGlossary(paragraph.replace(/^### /, ''))}
                </h4>
              );
            } else if (paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="text-2xl font-bold text-secondary mt-8 mb-4">
                  {renderContentWithGlossary(paragraph.replace(/^## /, ''))}
                </h3>
              );
            } else if (paragraph.startsWith('# ')) {
              return (
                <h2 key={index} className="text-3xl font-bold text-secondary mt-10 mb-6">
                  {renderContentWithGlossary(paragraph.replace(/^# /, ''))}
                </h2>
              );
            }
            return (
              <p key={index} className="mb-5">
                {renderContentWithGlossary(paragraph)}
              </p>
            );
          })}
      </div>
    </div>
  );
};

const CodeBlockRenderer: React.FC<{ block: CodeBlock }> = ({ block }) => {
  return (
    <div className="my-10 rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800 text-neutral-300">
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
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
      <div className="text-sm">
        <LazyCodeBlock code={block.code} language={block.language || 'typescript'} />
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

// --- New Components ---

const ComparisonBlockRenderer: React.FC<{ block: ComparisonBlock }> = ({ block }) => {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {block.items.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'rounded-2xl p-6 border',
              item.isHighlight
                ? 'bg-service-light border-primary/20 ring-1 ring-primary/10 shadow-lg'
                : 'bg-gray-50 border-gray-100'
            )}
          >
            <h4
              className={cn(
                'font-bold mb-4 flex items-center gap-2 text-xl',
                item.isHighlight ? 'text-primary' : 'text-gray-700'
              )}
            >
              {item.isHighlight && <ArrowsLeftRight size={20} className="text-primary" />}
              {item.title}
            </h4>
            <ul className="space-y-3">
              {item.points.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-sm font-medium text-gray-600">
                  <span
                    className={cn(
                      'mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]',
                      item.isHighlight ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChecklistBlockRenderer: React.FC<{ block: ChecklistBlock }> = ({ block }) => {
  return (
    <div className="my-10 bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 shadow-sm">
      {block.title && <h3 className="font-bold text-xl text-green-900 mb-6">{block.title}</h3>}
      <div className="space-y-4">
        {block.items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <CheckSquare
              className={cn(
                'shrink-0 mt-0.5',
                item.checked ? 'text-green-600 fill-green-100' : 'text-gray-300'
              )}
              size={20}
            />
            <span
              className={cn(
                'text-lg',
                item.checked ? 'text-gray-800 font-medium' : 'text-gray-500'
              )}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccordionBlockRenderer: React.FC<{ block: AccordionBlock }> = ({ block }) => {
  return (
    <div className="my-10 space-y-3">
      {block.items.map((item, idx) => (
        <AccordionItem key={idx} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

const KeyTakeawaysBlockRenderer: React.FC<{ block: KeyTakeawaysBlock }> = ({ block }) => {
  return <KeyTakeaways title={block.title} items={block.items} />;
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
    case 'comparison':
      return <ComparisonBlockRenderer block={block} />;
    case 'checklist':
      return <ChecklistBlockRenderer block={block} />;
    case 'accordion':
      return <AccordionBlockRenderer block={block} />;
    case 'interactive':
      return <InteractiveBlockRenderer block={block} />;
    case 'key-takeaways':
      return <KeyTakeawaysBlockRenderer block={block} />;
    case 'gallery':
    case 'video':
      return (
        <div className="p-4 bg-red-50 text-red-500 my-4 rounded border border-red-100 text-sm font-mono">
          Block type '{block.type}' not fully implemented yet.
        </div>
      );
    default:
      return null;
  }
};
