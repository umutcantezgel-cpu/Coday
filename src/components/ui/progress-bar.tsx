'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export function ProgressBar() {
  return (
    <AppProgressBar
      height="3px"
      color="#0d9488" // Tailwind primary-600
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
