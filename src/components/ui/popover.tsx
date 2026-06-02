'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

/**
 * A reusable Popover component.
 */
export function Popover({
  trigger,
  content,
  className,
  position = 'bottom',
  align = 'center',
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trapRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const positionStyles = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignStyles = {
    start: position === 'top' || position === 'bottom' ? 'left-0' : 'top-0',
    center: position === 'top' || position === 'bottom' ? 'left-1/2' : 'top-1/2',
    end: position === 'top' || position === 'bottom' ? 'right-0' : 'bottom-0',
  };

  const originStyles = {
    top: align === 'start' ? 'bottom left' : align === 'end' ? 'bottom right' : 'bottom',
    bottom: align === 'start' ? 'top left' : align === 'end' ? 'top right' : 'top',
    left: align === 'start' ? 'top right' : align === 'end' ? 'bottom right' : 'right',
    right: align === 'start' ? 'top left' : align === 'end' ? 'bottom left' : 'left',
  };

  const getBaseTransform = () => {
    if (align !== 'center') return '';
    if (position === 'top' || position === 'bottom') return 'translateX(-50%) ';
    return 'translateY(-50%) ';
  };
  const baseTransform = getBaseTransform();

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} aria-haspopup="dialog" aria-expanded={isOpen}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="popover-content"
            // @ts-expect-error - Framer Motion generic ref types can be tricky
            ref={trapRef}
            initial={{ opacity: 0, transform: `${baseTransform}scale(0.95)` }}
            animate={{ opacity: 1, transform: `${baseTransform}scale(1)` }}
            exit={{
              opacity: 0,
              transform: `${baseTransform}scale(0.95)`,
              transition: { duration: 0.15, ease: 'easeOut' },
            }}
            transition={{
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ transformOrigin: originStyles[position] }}
            className={cn(
              'absolute z-50 min-w-48 rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5',
              positionStyles[position],
              alignStyles[align],
              className
            )}
            role="dialog"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
