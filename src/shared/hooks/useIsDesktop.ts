import { useSyncExternalStore } from 'react';

const DESKTOP_QUERY = '(min-width: 1024px)';

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getSnapshot = () => window.matchMedia(DESKTOP_QUERY).matches;

// The server (and the first client render) assume desktop, so server HTML and
// hydration stay identical; phones switch to the mobile tree right after.
const getServerSnapshot = () => true;

/**
 * True at Tailwind's `lg` breakpoint (min-width: 1024px) and above.
 * Server snapshot is `true` so SSR output matches the desktop tree.
 */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
