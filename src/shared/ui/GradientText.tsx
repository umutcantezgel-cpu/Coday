import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}

/**
 * On mobile (< md breakpoint), the gradient is static — no animation.
 * This avoids creating a compositing layer on the LCP H1 text element.
 * On desktop, the gradient animates via `animate-gradient-xy motion-reduce:animate-none`.
 *
 * Implementation: uses CSS `animation: none` on mobile via inline + Tailwind
 * classes; the animation class only applies at md+ via `md:animate-gradient-xy motion-reduce:animate-none`.
 */
export default function GradientText({
  children,
  className = '',
  colors = ['var(--color-primary-600)', 'var(--color-secondary-800)', 'var(--color-primary-600)'],
  animationSpeed = 8,
  showBorder = false,
  direction: _direction = 'horizontal',
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')}, ${colors[0]})`,
    backgroundSize: '200% auto',
  };

  if (!showBorder) {
    return (
      <span
        className={cn(
          'inline-block relative text-transparent bg-clip-text md:animate-gradient-xy pb-0.5 motion-reduce:animate-none',
          className
        )}
        style={{
          ...gradientStyle,
          animationDuration: `${animationSpeed}s`,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'relative mx-auto inline-block rounded-[1.25rem] font-medium py-1 px-2 transition-shadow motion-reduce:duration-[0.01ms] duration-500',
        className
      )}
    >
      <span
        className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem] md:animate-gradient-xy motion-reduce:animate-none"
        style={{
          ...gradientStyle,
          animationDuration: `${animationSpeed}s`,
        }}
      >
        <span
          className="absolute bg-background-light rounded-[1.25rem] z-[-1]"
          style={{
            width: 'calc(100% - 2px)',
            height: 'calc(100% - 2px)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </span>
      <span
        className="inline-block relative z-2 text-transparent bg-clip-text md:animate-gradient-xy pb-0.5 motion-reduce:animate-none"
        style={{
          ...gradientStyle,
          animationDuration: `${animationSpeed}s`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
