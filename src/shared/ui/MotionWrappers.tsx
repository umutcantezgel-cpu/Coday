'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  layout?: boolean | 'position' | 'size' | 'preserve-aspect';
}

export const FadeInUp: React.FC<MotionWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  once = true,
  layout = false,
}) => {
  return <div className={className}>{children}</div>;
};

export const ScaleIn: React.FC<MotionWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  once = true,
  layout = false,
}) => {
  return <div className={className}>{children}</div>;
};

export const StaggerContainer: React.FC<Omit<MotionWrapperProps, 'delay' | 'duration'>> = ({
  children,
  className = '',
  once = true,
}) => {
  return <div className={`group/stagger ${className}`}>{children}</div>;
};

export const StaggerItem: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`stagger-item ${className}`}>{children}</div>;
};
