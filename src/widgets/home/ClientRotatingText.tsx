"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import type { RotatingTextProps } from '@/shared/ui/RotatingText';

const RotatingText = dynamic(() => import('@/shared/ui/RotatingText'), { ssr: false });

export function ClientRotatingText(props: RotatingTextProps) {
  return <RotatingText {...props} />;
}
