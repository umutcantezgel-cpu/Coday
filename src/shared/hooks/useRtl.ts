import { useTranslation } from 'react-i18next';

export const useRtl = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return {
    isRtl,
    direction: isRtl ? 'rtl' : 'ltr',
    // Animation constants
    xIn: isRtl ? -100 : 100, // Slide in from the "end" (right in LTR, left in RTL)
    xOut: isRtl ? 100 : -100, // Slide out to the "start" (left in LTR, right in RTL)
    originX: isRtl ? 1 : 0,
  };
};
