'use client';

import React, { useState, useRef, useEffect, ReactNode, useId } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

// Global state to track if ANY tooltip is currently open
// This allows skipping the delay for subsequent tooltips as per the standard
let isAnyTooltipOpen = false;
let globalTooltipTimeout: NodeJS.Timeout | null = null;

/**
 * A reusable Tooltip component using Framer Motion.
 */
export function Tooltip({ content, children, className, position = 'top' }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const openTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (globalTooltipTimeout) clearTimeout(globalTooltipTimeout);

    // If another tooltip is open, open immediately. Otherwise delay.
    const delay = isAnyTooltipOpen ? 0 : 300;

    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      isAnyTooltipOpen = true;
    }, delay);
  };

  const closeTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);

    if (globalTooltipTimeout) clearTimeout(globalTooltipTimeout);
    globalTooltipTimeout = setTimeout(() => {
      isAnyTooltipOpen = false;
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      isAnyTooltipOpen = false;
    };
  }, []);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const originStyles = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  return (
    <div
      className="relative inline-block"
      ref={containerRef}
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
      onFocus={openTooltip}
      onBlur={closeTooltip}
      aria-describedby={isOpen ? tooltipId : undefined}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="tooltip-content"
            id={tooltipId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: isAnyTooltipOpen ? 0.1 : 0.15,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ transformOrigin: originStyles[position] }}
            className={cn(
              'absolute z-50 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-md',
              positionStyles[position],
              className
            )}
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
