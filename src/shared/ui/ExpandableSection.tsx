import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface ExpandableSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    variant?: 'default' | 'highlight';
    className?: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    title,
    children,
    defaultOpen = false,
    variant = 'default',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const baseStyles = variant === 'highlight'
        ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20'
        : 'bg-white border-gray-200';

    return (
        <div className={`rounded-2xl border overflow-hidden ${baseStyles} ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {variant === 'highlight' && (
                        <Sparkles className="text-primary" size={18} />
                    )}
                    <span className="font-bold text-secondary">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="text-slate-400" size={20} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed border-t border-gray-100/50">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExpandableSection;
