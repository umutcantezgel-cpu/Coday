import React from 'react';

/**
 * SEQ-13: Reusable Typography component with variant-based styling.
 * Applies type scale, line height, letter spacing, and max-width
 * automatically based on the selected variant.
 *
 * @example
 * <Typography variant="h1">Headline</Typography>
 * <Typography variant="lead" align="center">Intro text</Typography>
 * <Typography variant="body" as="span">Inline text</Typography>
 */

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'lead' | 'small' | 'tiny';

interface TypographyProps {
  variant?: TypographyVariant;
  as?: React.ElementType;
  weight?: 'regular' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  maxWidth?: string;
  className?: string;
  children: React.ReactNode;
}

/** Default HTML element per variant */
const defaultElements: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  lead: 'p',
  small: 'span',
  tiny: 'span',
};

/** CSS variable-driven styles per variant */
const variantStyles: Record<TypographyVariant, React.CSSProperties> = {
  display: {
    fontSize: 'var(--text-display)',
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: 'var(--tracking-tighter)',
    fontWeight: 700,
  },
  h1: {
    fontSize: 'var(--text-h1)',
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: 'var(--tracking-tight)',
    fontWeight: 700,
  },
  h2: {
    fontSize: 'var(--text-h2)',
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: 'var(--tracking-tight)',
    fontWeight: 700,
  },
  h3: {
    fontSize: 'var(--text-h3)',
    lineHeight: 'var(--line-height-snug)',
    letterSpacing: 'var(--tracking-normal)',
    fontWeight: 700,
  },
  h4: {
    fontSize: 'var(--text-h4)',
    lineHeight: 'var(--line-height-snug)',
    letterSpacing: 'var(--tracking-wide)',
    fontWeight: 600,
  },
  body: {
    fontSize: 'var(--text-body)',
    lineHeight: 'var(--line-height-normal)',
    letterSpacing: 'var(--tracking-normal)',
    fontWeight: 400,
  },
  lead: {
    fontSize: 'var(--text-lead)',
    lineHeight: 'var(--line-height-relaxed)',
    letterSpacing: 'var(--tracking-normal)',
    fontWeight: 400,
  },
  small: {
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--line-height-normal)',
    letterSpacing: 'var(--tracking-normal)',
    fontWeight: 400,
  },
  tiny: {
    fontSize: 'var(--text-tiny)',
    lineHeight: 'var(--line-height-normal)',
    letterSpacing: 'var(--tracking-normal)',
    fontWeight: 400,
  },
};

const weightMap: Record<string, number> = {
  regular: 400,
  semibold: 600,
  bold: 700,
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  weight,
  align,
  maxWidth,
  className = '',
  children,
}) => {
  const Component = as || defaultElements[variant];
  const style: React.CSSProperties = {
    ...variantStyles[variant],
    ...(weight ? { fontWeight: weightMap[weight] } : {}),
    ...(align ? { textAlign: align } : {}),
    ...(maxWidth ? { maxWidth } : {}),
  };

  return (
    <Component style={style} className={className}>
      {children}
    </Component>
  );
};

export default Typography;
