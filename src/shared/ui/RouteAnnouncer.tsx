"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Announces route changes to screen readers via an aria-live region.
 * This ensures keyboard/screen-reader users are informed when the page changes
 * during client-side navigation (SPA behavior).
 *
 * @example Place once in the root layout: <RouteAnnouncer />
 */
export const RouteAnnouncer: React.FC = () => {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Wait for DOM to settle after navigation, then read the page title
    const timer = setTimeout(() => {
      const pageTitle = document.title || 'Neue Seite geladen';
      setAnnouncement(pageTitle);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div role="status" aria-live="assertive" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );
};
