'use client';

import dynamic from 'next/dynamic';

const InteractivePhilosophyVisual = dynamic(
  () => import('./InteractivePhilosophyVisual').then((mod) => mod.InteractivePhilosophyVisual),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[340px] h-[360px] rounded-2xl bg-white/50 animate-pulse" />
    ),
  }
);

export function LazyInteractivePhilosophyVisual() {
  return <InteractivePhilosophyVisual />;
}
