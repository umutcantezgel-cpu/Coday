'use client';

import dynamic from 'next/dynamic';
import React, { useSyncExternalStore } from 'react';

const QuickContactForm = dynamic(
  () => import('./QuickContactForm').then((mod) => mod.QuickContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-slate-100 shadow-xl min-h-[480px] animate-pulse" />
    ),
  }
);

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia('(min-width: 1024px)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getSnapshot = () => window.matchMedia('(min-width: 1024px)').matches;
const getServerSnapshot = () => false;

interface LazyQuickContactFormProps {
  /**
   * Skip the form entirely below 1024px.
   *
   * Only for placements that already hide it with `hidden lg:flex` — the home
   * page hero, which gives mobile its own CTAs instead. There the media query
   * merely hid the markup; this drops the DOM and its hydration as well.
   *
   * It must stay opt-in: /landingpages/nextjsmigration and the automobil pages
   * render the form inside a visible card with a heading above it, so gating
   * every placement would leave mobile visitors looking at an empty box.
   */
  desktopOnly?: boolean;
}

export function LazyQuickContactForm({ desktopOnly = false }: LazyQuickContactFormProps = {}) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (desktopOnly && !isDesktop) return null;

  return <QuickContactForm />;
}
