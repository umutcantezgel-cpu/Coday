'use client';

import dynamic from 'next/dynamic';

export const LazyQuickContactForm = dynamic(
  () => import('./QuickContactForm').then((mod) => mod.QuickContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-slate-100 shadow-xl min-h-[480px] animate-pulse" />
    ),
  }
);
