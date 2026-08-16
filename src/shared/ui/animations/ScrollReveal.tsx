import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function ScrollReveal({ children, className = '', index = 0 }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
