import React, { useState } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Info,
  Warning,
  WarningCircle,
  CheckCircle,
  CaretDown,
  Lightbulb,
  Check,
  Circle,
  Cloud,
  MapPin,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================
// LEGAL INFO CARD
// ============================================
interface LegalInfoCardProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'muted';
}

export const LegalInfoCard: React.FC<LegalInfoCardProps> = ({
  title,
  icon: IconComp = Info,
  children,
  variant = 'default',
}) => {
  const variants = {
    default: 'bg-slate-50 border-slate-100',
    highlight: 'bg-primary/5 border-primary/20',
    muted: 'bg-gray-50 border-gray-100',
  };

  return (
    <div className={`rounded-xl border p-6 ${variants[variant]} not-prose`}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            variant === 'highlight' ? 'bg-primary/10 text-primary' : 'bg-white text-gray-600'
          }`}
        >
          <OptimizedIcon icon={IconComp} className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
};

// ============================================
// LEGAL ALERT BOX
// ============================================
interface LegalAlertBoxProps {
  children: React.ReactNode;
  variant?: 'warning' | 'info' | 'important' | 'success';
  title?: string;
}

export const LegalAlertBox: React.FC<LegalAlertBoxProps> = ({
  children,
  variant = 'info',
  title,
}) => {
  const variants = {
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: Warning,
      iconBg: 'bg-amber-100',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconBg: 'bg-blue-100',
    },
    important: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: WarningCircle,
      iconBg: 'bg-red-100',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconBg: 'bg-green-100',
    },
  };

  const v = variants[variant];

  return (
    <div className={`rounded-xl border ${v.bg} ${v.border} p-5 not-prose`}>
      <div className="flex gap-4">
        <div
          className={`w-10 h-10 rounded-lg ${v.iconBg} ${v.text} flex items-center justify-center flex-shrink-0`}
        >
          <OptimizedIcon icon={v.icon} className="w-5 h-5" />
        </div>
        <div>
          {title && <h4 className={`font-bold ${v.text} mb-1`}>{title}</h4>}
          <div className={`text-sm leading-relaxed ${v.text}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXPANDABLE CLAUSE
// ============================================
interface ExpandableClauseProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const ExpandableClause: React.FC<ExpandableClauseProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden not-prose">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <OptimizedIcon icon={CaretDown} className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 py-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// QUICK SUMMARY CARD
// ============================================
interface QuickSummaryProps {
  items: string[];
  title?: string;
}

export const QuickSummary: React.FC<QuickSummaryProps> = ({ items, title = 'Zusammenfassung' }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 not-prose">
      <div className="flex items-center gap-2 mb-4">
        <OptimizedIcon icon={Lightbulb} className="w-5 h-5 text-primary" />
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
            <OptimizedIcon icon={Check} className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================
// LEGAL TIMELINE
// ============================================
interface TimelineItem {
  title: string;
  description: string;
  icon?: React.ElementType;
  status?: 'completed' | 'current' | 'upcoming';
}

interface LegalTimelineProps {
  items: TimelineItem[];
  title?: string;
}

export const LegalTimeline: React.FC<LegalTimelineProps> = ({ items, title }) => {
  return (
    <div className="not-prose">
      {title && <h4 className="font-bold text-gray-900 mb-6">{title}</h4>}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="relative flex gap-4 pl-2">
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${
                  item.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : item.status === 'current'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                <OptimizedIcon icon={item.icon || Circle} className="w-4 h-4" />
              </div>
              <div className="flex-1 pb-6">
                <h5 className="font-medium text-gray-900 mb-1">{item.title}</h5>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// GLOSSARY TOOLTIP
// ============================================
interface GlossaryTooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ term, definition, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-primary/50 cursor-help text-primary">
        {children || term}
      </span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-secondary text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            <strong>{term}:</strong> {definition}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-secondary rotate-45 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// ============================================
// DATA PROCESSOR CARD
// ============================================
interface DataProcessorCardProps {
  name: string;
  purpose: string;
  location: string;
  icon?: React.ElementType;
  gdprCompliant?: boolean;
  privacyUrl?: string;
}

export const DataProcessorCard: React.FC<DataProcessorCardProps> = ({
  name,
  purpose,
  location,
  icon = Cloud,
  gdprCompliant = true,
  privacyUrl,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow not-prose">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <OptimizedIcon icon={icon} className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{name}</h4>
            {gdprCompliant && (
              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                DSGVO
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{purpose}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <OptimizedIcon icon={MapPin} className="w-3 h-3" />
              {location}
            </span>
            {privacyUrl && (
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <OptimizedIcon icon={ArrowSquareOut} className="w-3 h-3" />
                Privacy Policy
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RIGHTS CHECKLIST
// ============================================
interface RightsChecklistProps {
  items: Array<{
    article: string;
    title: string;
    description: string;
  }>;
}

export const RightsChecklist: React.FC<RightsChecklistProps> = ({ items }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 not-prose">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-50/50 to-primary/5 rounded-xl p-5 border border-blue-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
              {item.article}
            </span>
            <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
          </div>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

// ============================================
// SECTION HEADER
// ============================================
interface LegalSectionHeaderProps {
  number?: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
}

export const LegalSectionHeader: React.FC<LegalSectionHeaderProps> = ({
  number,
  title,
  subtitle,
  icon: IconComp,
}) => {
  return (
    <div className="flex items-start gap-4 mb-6 not-prose">
      {(number || IconComp) && (
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
          {IconComp ? <OptimizedIcon icon={IconComp} className="w-6 h-6" /> : number}
        </div>
      )}
      <div>
        <h2 className="font-display font-bold text-2xl text-secondary">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};
