import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Terminal,
  Quotes as QuoteIcon,
  CheckSquare,
  Plus,
  Minus,
  ArrowsLeftRight,
} from '@phosphor-icons/react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
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
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';

// Typed module resolution for lazy-loaded interactive widgets
interface WidgetModule {
  default?: React.ComponentType;
  [key: string]: React.ComponentType | undefined;
}

type LazyWidget = React.LazyExoticComponent<React.ComponentType>;

/** Resolve a named or default export from a dynamically imported widget module */
function resolveDefault(m: WidgetModule, name: string): { default: React.ComponentType } {
  const resolved = m[name] || m.default;
  if (!resolved) throw new Error(`Widget module missing export: ${name}`);
  return { default: resolved };
}

// Interactive Components (Lazy Loaded)
const ROI_Calculator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/ROI_Calculator').then((m) =>
    resolveDefault(m as WidgetModule, 'ROI_Calculator')
  )
);
const SpeedComparison: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/SpeedComparison').then((m) =>
    resolveDefault(m as WidgetModule, 'SpeedComparison')
  )
);
const DesignPsychologyPicker: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/DesignPsychologyPicker').then((m) =>
    resolveDefault(m as WidgetModule, 'DesignPsychologyPicker')
  )
);
const SEOTrafficGraph: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/SEOTrafficGraph').then((m) =>
    resolveDefault(m as WidgetModule, 'SEOTrafficGraph')
  )
);
const MobileSimulator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/MobileSimulator').then((m) =>
    resolveDefault(m as WidgetModule, 'MobileSimulator')
  )
);
const DataMaturityAssessment: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/DataMaturityAssessment').then((m) =>
    resolveDefault(m as WidgetModule, 'DataMaturityAssessment')
  )
);
const HackSimulator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/HackSimulator').then((m) =>
    resolveDefault(m as WidgetModule, 'HackSimulator')
  )
);
const ABTestSimulator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/ABTestSimulator').then((m) =>
    resolveDefault(m as WidgetModule, 'ABTestSimulator')
  )
);
const VoiceDemo: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/VoiceDemo').then((m) =>
    resolveDefault(m as WidgetModule, 'VoiceDemo')
  )
);
const AICostGraph: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/AICostGraph').then((m) =>
    resolveDefault(m as WidgetModule, 'AICostGraph')
  )
);
const WebHistoryTimeline: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/WebHistoryTimeline').then((m) =>
    resolveDefault(m as WidgetModule, 'WebHistoryTimeline')
  )
);
const AgencyCostCalculator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/AgencyCostCalculator').then((m) =>
    resolveDefault(m as WidgetModule, 'AgencyCostCalculator')
  )
);
const SoulReader: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/SoulReader').then((m) =>
    resolveDefault(m as WidgetModule, 'SoulReader')
  )
);
const LatencyCostCalculator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/LatencyCostCalculator').then((m) =>
    resolveDefault(m as WidgetModule, 'LatencyCostCalculator')
  )
);
const SovereigntyChecklist: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/SovereigntyChecklist').then((m) =>
    resolveDefault(m as WidgetModule, 'SovereigntyChecklist')
  )
);
const ContrastRatioAnalyzer: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/ContrastRatioAnalyzer').then((m) =>
    resolveDefault(m as WidgetModule, 'ContrastRatioAnalyzer')
  )
);
const TCOCalculator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/TCOCalculator').then((m) =>
    resolveDefault(m as WidgetModule, 'TCOCalculator')
  )
);
const SecurityGapWizard: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/SecurityGapWizard').then((m) =>
    resolveDefault(m as WidgetModule, 'SecurityGapWizard')
  )
);
const OZGReadiness: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/OZGReadiness').then((m) =>
    resolveDefault(m as WidgetModule, 'OZGReadiness')
  )
);
const TrackingSimulator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/TrackingSimulator').then((m) =>
    resolveDefault(m as WidgetModule, 'TrackingSimulator')
  )
);
const ComponentConfigurator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/ComponentConfigurator').then((m) =>
    resolveDefault(m as WidgetModule, 'ComponentConfigurator')
  )
);
const ROIEstimator: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/ROIEstimator').then((m) =>
    resolveDefault(m as WidgetModule, 'ROIEstimator')
  )
);
const BlindTestQuiz: LazyWidget = React.lazy(() =>
  import('@/features/blog/ui/interactive/BlindTestQuiz').then((m) =>
    resolveDefault(m as WidgetModule, 'BlindTestQuiz')
  )
);

import { KeyTakeaways } from '@/features/blog/ui/KeyTakeaways';
import { GlossaryTerm } from '@/features/blog/ui/GlossaryTerm';
import { getGlossaryTerms } from '@/features/blog/model/glossary';
import { useTranslation } from 'react-i18next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Block Components ---

const TextBlockRenderer: React.FC<{ block: TextBlock }> = ({ block }) => {
  const HeadingTag = block.level || 'h2';
  const id = block.heading ? slugify(block.heading) : undefined;
  const { i18n } = useTranslation();

  // Glossary Injection Logic
  const renderContentWithGlossary = (text: string) => {
    const terms = getGlossaryTerms(i18n.language);
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
      <div className="prose prose-lg prose-slate leading-relaxed text-gray-600 whitespace-pre-wrap">
        {renderContentWithGlossary(block.content)}
      </div>
    </div>
  );
};

const ImageBlockRenderer: React.FC<{ block: ImageBlock }> = ({ block }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <figure
      ref={ref}
      className={cn(
        'my-12 relative z-0',
        block.layout === 'wide' ? '-mx-4 md:-mx-12' : '',
        block.layout === 'fullscreen' ? 'w-screen relative left-1/2 -translate-x-1/2' : ''
      )}
    >
      <div
        className={cn(
          'overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-video relative',
          block.layout === 'fullscreen' ? '' : 'rounded-3xl'
        )}
      >
        <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0 w-full h-full">
          <OptimizedImage src={block.src} alt={block.alt} className="w-full h-full object-cover" />
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="my-16 relative"
    >
      <div
        className={cn(
          'relative p-10 md:p-14 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5',
          block.variant === 'gradient'
            ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border border-white/50 backdrop-blur-sm'
            : 'bg-surface-light border-l-8 border-primary'
        )}
      >
        <QuoteIcon className="absolute top-8 left-8 text-primary/10 w-20 h-20 -z-0 rotate-12 transition-transform duration-700 group-hover:rotate-0" />

        <blockquote className="relative z-10 text-center md:text-left">
          <p
            className={cn(
              'font-display font-bold text-secondary mb-8 leading-snug',
              block.variant === 'large' ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl italic'
            )}
          >
            "{block.text}"
          </p>
          {block.author && (
            <footer className="flex items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
              <span className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
              <span>
                <strong className="text-secondary block md:inline text-base">{block.author}</strong>
                {block.cite && (
                  <span className="font-normal opacity-80 block md:inline"> — {block.cite}</span>
                )}
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
            <ArrowRight
              size={20}
              className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          </Link>
        </div>
      </div>
    </motion.div>
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
        <SyntaxHighlighter
          language={block.language || 'typescript'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.7',
          }}
          showLineNumbers={true}
        >
          {block.code}
        </SyntaxHighlighter>
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

const AccordionItem: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 px-6 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        {title}
        {isOpen ? (
          <Minus size={18} className="text-primary" />
        ) : (
          <Plus size={18} className="text-gray-400" />
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
            <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InteractiveBlockRenderer: React.FC<{ block: InteractiveBlock }> = ({ block }) => {
  const { t } = useTranslation('blog');
  const COMPONENT_MAP: Record<
    string,
    React.LazyExoticComponent<React.ComponentType> | React.ComponentType
  > = {
    'roi-calculator': ROI_Calculator,
    'speed-test': SpeedComparison,
    'color-picker': DesignPsychologyPicker,
    'seo-graph': SEOTrafficGraph,
    'mobile-simulator': MobileSimulator,
    'data-maturity': DataMaturityAssessment,
    'hack-simulator': HackSimulator,
    'ab-test': ABTestSimulator,
    'voice-demo': VoiceDemo,
    'ai-cost': AICostGraph,
    timeline: WebHistoryTimeline,
    'agency-calculator': AgencyCostCalculator,
    quiz: SoulReader,
    'latency-calculator': LatencyCostCalculator,
    'sovereignty-checklist': SovereigntyChecklist,
    'contrast-analyzer': ContrastRatioAnalyzer,
    'tco-calculator': TCOCalculator,
    'security-gap-wizard': SecurityGapWizard,
    'ozg-readiness': OZGReadiness,
    'tracking-simulator': TrackingSimulator,
    'component-configurator': ComponentConfigurator,
    'roi-estimator': ROIEstimator,
    'blind-test': BlindTestQuiz,
  };

  const SpecificComponent = COMPONENT_MAP[block.component] || null;

  if (!SpecificComponent) {
    return (
      <div className="my-8 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
        <Terminal className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm font-mono text-gray-500">
          {t('blog:interactiveComponent')}: {block.component}
        </p>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="my-12 h-64 bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center border border-gray-100">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm font-medium">{t('blog:loadingModule')}</span>
          </div>
        </div>
      }
    >
      <SpecificComponent />
    </React.Suspense>
  );
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
