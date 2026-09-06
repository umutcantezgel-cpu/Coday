import { useSyncExternalStore } from 'react';

const DESKTOP_QUERY = '(min-width: 1024px)';

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getSnapshot = (): boolean | null => window.matchMedia(DESKTOP_QUERY).matches;

// The server (and the hydrating client render) do not know the viewport, so the
// snapshot is `null`: callers render BOTH trees, each hidden by its Tailwind
// breakpoint class, and the server HTML matches the first client render exactly.
// Right after hydration useSyncExternalStore swaps in the real match, and the
// tree that does not fit the viewport unmounts.
const getServerSnapshot = (): boolean | null => null;

/**
 * True at Tailwind's `lg` breakpoint (min-width: 1024px) and above, false
 * below it, and `null` while the viewport is unknown (SSR and the hydration
 * render). Treat `null` as "render both trees".
 */
export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
