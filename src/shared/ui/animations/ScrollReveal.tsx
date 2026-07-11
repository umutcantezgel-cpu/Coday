'use client';

import React, { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function ScrollReveal({ children, className = '', index = 0 }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
