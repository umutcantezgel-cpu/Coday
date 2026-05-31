export const buttonVariants: Record<string, string> = {
  primary:
    'bg-primary-700 text-white shadow-md hover:bg-primary-800 hover:shadow-glow motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98]',
  secondary:
    'bg-secondary-800 text-white shadow-md hover:bg-secondary-900 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]',
  outline:
    'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] shadow-sm hover:shadow-glow',
  ghost:
    'text-secondary-600 hover:bg-secondary-100 hover:text-primary-600 motion-safe:active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-primary-50 hover:before:translate-x-0 before:transition-transform motion-reduce:duration-[0.01ms] before:duration-300 before:ease-out before:-z-10',
};

export const buttonSizes: Record<string, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-[48px] px-6 text-base',
  lg: 'h-[56px] px-8 text-lg',
  icon: 'h-[48px] w-[48px] p-0',
  xl: 'h-[64px] px-10 text-xl',
};

export const baseButtonStyles =
  'inline-flex items-center justify-center rounded-xl font-medium transition-all motion-reduce:duration-[0.01ms] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed motion-safe:active:scale-[0.98] motion-safe:hover:-translate-y-1 hover:shadow-md min-h-[44px] touch-manipulation isolate';
