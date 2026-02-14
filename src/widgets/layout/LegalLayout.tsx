import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Clock } from '@phosphor-icons/react';

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  lastUpdated?: string;
  tocItems?: TocItem[];
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  children,
  title,
  subtitle,
  lastUpdated,
  tocItems = [],
}) => {
  return (
    <div className="bg-background-light min-h-screen pt-24 pb-24">
      <SeoHead
        title={`${title} | Coday`}
        description={typeof subtitle === 'string' ? subtitle : title}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-secondary mb-4">
            {title}
          </h1>
          {subtitle && <div className="text-xl text-slate-600 mb-6">{subtitle}</div>}
          {lastUpdated && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-500 shadow-sm border border-gray-100">
              <OptimizedIcon icon={Clock} className="w-4 h-4" />
              <span>{lastUpdated}</span>
            </div>
          )}
        </header>

        <div className="grid lg:grid-cols-[250px_1fr] gap-12 items-start">
          {/* Table of Contents (Desktop Sticky) */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block sticky top-32">
              <nav className="space-y-1">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4 px-3">
                  Inhalt
                </h3>
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* Content */}
          <main
            className={`prose prose-lg prose-slate max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-secondary
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        bg-white p-8 sm:p-12 rounded-3xl shadow-flat border border-gray-100
                        ${tocItems.length === 0 ? 'mx-auto' : ''}`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
