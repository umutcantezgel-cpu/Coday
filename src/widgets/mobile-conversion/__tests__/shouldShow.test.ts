import { describe, it, expect } from 'vitest';
import { shouldShowMobileConversionBar } from '@/widgets/mobile-conversion/MobileConversionBar';

describe('shouldShowMobileConversionBar', () => {
  it('shows the bar on landing, industry, service and blog pages', () => {
    for (const p of [
      '/de',
      '/de/webdesign-giessen',
      '/en/branchen/gastronomie',
      '/de/services/seo',
      '/de/blog/foo',
      '/de/website-check',
    ]) {
      expect(shouldShowMobileConversionBar(p), p).toBe(true);
    }
  });

  it('hides it where another bar or a form already owns the bottom edge', () => {
    for (const p of [
      '/de/pricing',
      '/en/booking',
      '/de/contact',
      '/de/dashboard/leads',
      '/de/legal/datenschutz',
      '/de/privacy',
    ]) {
      expect(shouldShowMobileConversionBar(p), p).toBe(false);
    }
  });
});
