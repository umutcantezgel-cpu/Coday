'use client';
import React, { useRef, useState, useId } from 'react';
import { Link } from '@/i18n/navigation';
import {
  ArrowRight,
  Terminal,
  Quotes as QuoteIcon,
  Plus,
  Minus,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { useTranslations } from 'next-intl';

import type {
  ImageBlock,
  QuoteBlock,
  CTABlock,
  InteractiveBlock,
} from '@/features/blog/model/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { m, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';

// Typed module resolution for lazy-loaded interactive widgets
interface WidgetModule {
  default?: React.ComponentType;
  [key: string]: React.ComponentType | undefined;
}

type LazyWidget = React.LazyExoticComponent<React.ComponentType>;

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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ImageBlockRenderer: React.FC<{ block: ImageBlock }> = ({ block }) => {
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
        <m.div style={{ y, scale: 1.1 }} className="absolute inset-0 w-full h-full">
          <OptimizedImage
            src={block.src}
            alt={block.alt}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </m.div>
      </div>
      {block.caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-4 font-medium italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
};

export const QuoteBlockRenderer: React.FC<{ block: QuoteBlock }> = ({ block }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="my-16 relative"
    >
      <div
        className={cn(
          'relative p-10 md:p-14 rounded-[2rem] overflow-hidden group transition motion-reduce:duration-[0.01ms] duration-500 hover:shadow-2xl hover:shadow-primary/5',
          block.variant === 'gradient'
            ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border border-white/50 backdrop-blur-sm'
            : 'bg-surface-light border-l-8 border-primary'
        )}
      >
        <QuoteIcon className="absolute top-8 left-8 text-primary/10 w-20 h-20 -z-0 rotate-12 transition-transform motion-reduce:duration-[0.01ms] duration-700 group-hover:rotate-0" />

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
    </m.div>
  );
};

export const CTABlockRenderer: React.FC<{ block: CTABlock }> = ({ block }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16 relative overflow-hidden rounded-[2.5rem] group"
    >
      <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors motion-reduce:duration-[0.01ms] duration-500" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition motion-reduce:duration-[0.01ms] duration-700" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-secondary/10 blur-[80px] rounded-full" />

      <div className="relative p-10 md:p-14 border border-white/20 rounded-[2.5rem] backdrop-blur-xl bg-white/10 shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
          <div className="text-center md:text-left md:flex-1">
            <h3 className="text-3xl font-bold text-secondary mb-3 md:mb-4">{block.title}</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-light">{block.description}</p>
          </div>
          <Link
            href={block.href}
            className="group/btn relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition motion-reduce:duration-[0.01ms] duration-300 transform-gpu"
          >
            <span className="relative z-10">{block.buttonText}</span>
            <ArrowRight
              size={20}
              className="relative z-10 group-hover/btn:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]"
            />
            <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 motion-reduce:animate-none" />
          </Link>
        </div>
      </div>
    </m.div>
  );
};

export const AccordionItem: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]">
      <h3>
        <button
          id={triggerId}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="active:scale-[0.97] w-full flex items-center justify-between p-4 px-6 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors motion-reduce:duration-[0.01ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {title}
          {isOpen ? (
            <Minus size={18} className="text-primary" aria-hidden="true" />
          ) : (
            <Plus size={18} className="text-gray-400" aria-hidden="true" />
          )}
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50"
            >
              {content}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const InteractiveBlockRenderer: React.FC<{ block: InteractiveBlock }> = ({ block }) => {
  const t = useTranslations('blog');
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
          {t('interactiveComponent')}: {block.component}
        </p>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="my-12 h-64 bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center border border-gray-100 motion-reduce:animate-none">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin motion-reduce:animate-none" />
            <span className="text-sm font-medium">{t('loadingModule')}</span>
          </div>
        </div>
      }
    >
      <SpecificComponent />
    </React.Suspense>
  );
};
