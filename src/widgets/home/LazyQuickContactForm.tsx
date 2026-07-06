'use client';

import dynamic from 'next/dynamic';

const QuickContactForm = dynamic(
  () => import('./QuickContactForm').then((mod) => mod.QuickContactForm),
  {
    ssr: false,
    loading: () => <div className="w-full max-w-md h-96 rounded-3xl bg-white/50 animate-pulse" />,
  }
);

export function LazyQuickContactForm() {
  return <QuickContactForm />;
}
