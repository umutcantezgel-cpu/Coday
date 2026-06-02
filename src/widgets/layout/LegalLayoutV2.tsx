'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Gavel,
  Shield,
  Buildings,
  Clock,
  FileText,
  CalendarCheck,
  Code,
  List,
  CaretLeft,
  EnvelopeSimple,
} from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';

interface TocItem {
  id: string;
  label: string;
  icon?: React.ElementType;
}

interface LegalLayoutV2Props {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  lastUpdated?: string;
  tocItems?: TocItem[];
  pageType: 'terms' | 'privacy' | 'impressum';
  version?: string;
}

const legalPages = [
  { key: 'terms', path: '/legal/agb', icon: Gavel, labelKey: 'nav.terms' },
  { key: 'privacy', path: '/legal/datenschutz', icon: Shield, labelKey: 'nav.privacy' },
  { key: 'impressum', path: '/legal/impressum', icon: Buildings, labelKey: 'nav.impressum' },
];

export const LegalLayoutV2: React.FC<LegalLayoutV2Props> = ({
  children,
  title,
  subtitle,
  lastUpdated,
  tocItems = [],
  pageType,
  version = '2.0',
}) => {
  const t = useTranslations('legal');
  const [activeSection, setActiveSection] = useState<string>('');
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(progress, 100));
      setShowBackToTop(scrollTop > 500);

      // Update active section based on scroll position
      if (tocItems.length > 0) {
        for (let i = tocItems.length - 1; i >= 0; i--) {
          const section = document.getElementById(tocItems[i]!.id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(tocItems[i]!.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const estimatedReadTime = useMemo(() => {
    // Rough estimate based on content length
    const wordCount = 1500; // Approximate for legal docs
    return Math.ceil(wordCount / 200); // 200 words per minute
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-dvh">
      <SeoHead
        title={`${title} | Coday`}
        description={typeof subtitle === 'string' ? subtitle : title}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/80"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Legal Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav role="navigation" className="flex items-center gap-1">
              {legalPages.map((page) => (
                <NavLink
                  key={page.key}
                  href={page.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition motion-reduce:duration-[0.01ms]
                    ${
                      pageType === page.key
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <OptimizedIcon icon={page.icon} className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {t(page.labelKey, { defaultValue: page.key })}
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="hidden md:flex items-center gap-1.5">
                <OptimizedIcon icon={Clock} className="w-4 h-4" />
                {estimatedReadTime} min
              </span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors motion-reduce:duration-[0.01ms]"
              >
                <OptimizedIcon icon={FileText} className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header role="banner" className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <OptimizedIcon
                  icon={
                    pageType === 'terms' ? FileText : pageType === 'privacy' ? Shield : Buildings
                  }
                  className="w-4 h-4"
                />
                {t('common.legal_document', { defaultValue: 'Legal Document' })}
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-secondary mb-4">
                {title}
              </h1>

              {subtitle && (
                <div className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto">{subtitle}</div>
              )}

              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                {lastUpdated && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                    <OptimizedIcon icon={CalendarCheck} className="w-4 h-4" />
                    <span>{lastUpdated}</span>
                  </div>
                )}
                {version && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                    <OptimizedIcon icon={Code} className="w-4 h-4" />
                    <span>v{version}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </header>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Table of Contents (Desktop Sticky) */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block sticky top-36">
                <nav
                  role="navigation"
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <OptimizedIcon icon={List} className="w-4 h-4" />
                    {t('common.contents', { defaultValue: 'Contents' })}
                  </h3>
                  <div className="space-y-1">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition motion-reduce:duration-[0.01ms]
                          ${
                            activeSection === item.id
                              ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                              : 'text-slate-600 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'
                          }`}
                      >
                        {item.icon && (
                          <OptimizedIcon icon={item.icon} className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="truncate">{item.label}</span>
                      </a>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                    <button
                      onClick={() => window.print()}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors motion-reduce:duration-[0.01ms]"
                    >
                      <OptimizedIcon icon={FileText} className="w-4 h-4" />
                      {t('common.download_pdf', { defaultValue: 'Download PDF' })}
                    </button>
                    <a
                      href="mailto:umut@codayweb.de?subject=Legal Question"
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors motion-reduce:duration-[0.01ms]"
                    >
                      <OptimizedIcon icon={EnvelopeSimple} className="w-4 h-4" />
                      {t('common.contact', { defaultValue: 'Contact Us' })}
                    </a>
                  </div>
                </nav>
              </aside>
            )}

            {/* Content */}
            <main
              role="main"
              className={`prose prose-lg prose-slate max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:text-secondary
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100
                ${tocItems.length === 0 ? 'mx-auto max-w-4xl' : ''}`}
            >
              {children}
            </main>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors motion-reduce:duration-[0.01ms] z-40"
          >
            <OptimizedIcon icon={CaretLeft} className="w-5 h-5 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Print Styles */}
      <style>{`
        @media print {
          .sticky, aside, button, nav {
            display: none !important;
          }
          main {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LegalLayoutV2;
