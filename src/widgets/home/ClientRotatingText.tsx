'use client';
import React, { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import type { RotatingTextProps } from '@/shared/ui/RotatingText';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const DynamicRotatingText = dynamic(() => import('@/shared/ui/RotatingText'), {
  ssr: false,
  loading: () => null,
});

export function ClientRotatingText(props: RotatingTextProps) {
  const isHydrated = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  if (!isHydrated) {
    return <span className={props.mainClassName}>{props.texts[0]}</span>;
  }

  return <DynamicRotatingText {...props} />;
}
