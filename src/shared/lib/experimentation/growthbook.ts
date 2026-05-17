import { GrowthBook } from '@growthbook/growthbook-react';

const GROWTHBOOK_API_HOST = import.meta.env.VITE_GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io';
const GROWTHBOOK_CLIENT_KEY = import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY || 'dummy_gb_key_dev';

// Window type extensions are centralized in src/@types/global.d.ts

export const growthbook = new GrowthBook({
  apiHost: GROWTHBOOK_API_HOST,
  clientKey: GROWTHBOOK_CLIENT_KEY,
  enableDevMode: import.meta.env.DEV,
  trackingCallback: (experiment, result) => {
    // Only track if we have a global posthog or gtag instance
    if (typeof window !== 'undefined') {
      if (window.posthog) {
        window.posthog.capture('$experiment_started', {
          'Experiment name': experiment.key,
          'Variant name': result.variationId,
        });
      }
      if (window.gtag) {
        window.gtag('event', 'experiment_viewed', {
          event_category: 'experiment',
          experiment_id: experiment.key,
          variant_id: result.variationId,
        });
      }
    }
  },
});
