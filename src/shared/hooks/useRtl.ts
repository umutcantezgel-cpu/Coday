import { useLocale } from 'next-intl';

export const useRtl = () => {
  const locale = useLocale();
  const isRtl = ['ar', 'he', 'fa', 'ur'].includes(locale);

  return {
    isRtl,
    direction: isRtl ? 'rtl' : 'ltr',
    // Animation constants
    xIn: isRtl ? -100 : 100, // Slide in from the "end" (right in LTR, left in RTL)
    xOut: isRtl ? 100 : -100, // Slide out to the "start" (left in LTR, right in RTL)
    originX: isRtl ? 1 : 0,
  };
};
