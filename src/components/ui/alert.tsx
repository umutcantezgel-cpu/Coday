'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export type AlertVariant = 'default' | 'destructive' | 'success';

/**
 * Props for the Alert component.
 */
export interface AlertProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
> {
  /**
   * The variant style of the alert.
   * @default 'default'
   */
  variant?: AlertVariant;
  /**
   * Optional callback when the alert is dismissed.
   * If provided, a dismiss button will be rendered.
   */
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  default:
    'bg-neutral-50 text-neutral-900 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-50 dark:border-neutral-800',
  destructive:
    'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900',
  success:
    'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/50 dark:text-green-200 dark:border-green-900',
};

/**
 * An Alert component to display important messages.
 * Uses Framer Motion for entrance and exit animations.
 *
 * @param {AlertProps} props - The properties for the Alert component.
 * @returns {JSX.Element} The rendered Alert component.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', onDismiss, children, ...props }, ref) => {
    const [isShowing, setIsShowing] = React.useState(true);

    const handleDismiss = () => {
      setIsShowing(false);
    };

    return (
      <AnimatePresence>
        {isShowing && (
          <motion.div
            ref={ref}
            role="alert"
            initial={{ opacity: 0, transform: 'scale(0.95)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{
              opacity: 0,
              transform: 'scale(0.95)',
              transition: { duration: 0.15, ease: 'easeOut' },
            }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={() => {
              if (!isShowing && onDismiss) {
                onDismiss();
              }
            }}
            className={cn(
              'relative w-full rounded-xl border p-4 shadow-sm',
              variantStyles[variant],
              className
            )}
            {...props}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">{children}</div>
              {onDismiss && (
                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Dismiss alert"
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-md', // 44x44 min tap target
                    'transition-[transform,colors] duration-[160ms] ease-out hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.97]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Alert.displayName = 'Alert';
