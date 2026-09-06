'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { trackEvent } from '@/shared/lib/analytics/tracking';
import { buildWhatsAppUrl, whatsAppMessageFor } from '@/shared/lib/whatsapp';
import { PHONE_HREF } from '@/shared/config/ctaLabels';

/**
 * Phone and WhatsApp icon buttons for the collapsed mobile header, so a
 * visitor can reach the owner without opening the menu.
 */
export const HeaderContactActions: React.FC = () => {
  const t = useTranslations('lead');
  const locale = useLocale() === 'en' ? 'en' : 'de';
  const pathname = usePathname() || '/';
  const whatsappHref = buildWhatsAppUrl(whatsAppMessageFor(pathname, locale));
  const base =
    'flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm active:scale-[0.94] transition-transform motion-reduce:duration-[0.01ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500';

  return (
    <div className="flex items-center gap-2" data-header-contact-actions>
      <a
        href={PHONE_HREF}
        aria-label={t('header.call')}
        title={t('header.call')}
        onClick={() => trackEvent('phone_click', { cta_position: 'header_mobile' })}
        className={base}
      >
        <OptimizedIcon icon={Phone} className="h-5 w-5 text-amber-600" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('header.whatsapp')}
        title={t('header.whatsapp')}
        onClick={() => trackEvent('whatsapp_click', { cta_position: 'header_mobile' })}
        className={base}
      >
        <OptimizedIcon icon={WhatsappLogo} className="h-5 w-5 text-emerald-600" />
      </a>
    </div>
  );
};

export default HeaderContactActions;
