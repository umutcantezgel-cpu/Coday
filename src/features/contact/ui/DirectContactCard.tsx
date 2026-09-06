'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Phone, WhatsappLogo, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { trackEvent } from '@/shared/lib/analytics/tracking';
import { buildWhatsAppUrl, whatsAppMessageFor } from '@/shared/lib/whatsapp';
import { PHONE_DISPLAY, PHONE_HREF } from '@/shared/config/ctaLabels';

/**
 * "Lieber direkt?" card on the contact page: call, WhatsApp and the free
 * website check, so nobody has to fill a form who would rather talk.
 */
export const DirectContactCard: React.FC = () => {
  const locale = useLocale() === 'en' ? 'en' : 'de';
  const isEn = locale === 'en';
  const whatsappHref = buildWhatsAppUrl(whatsAppMessageFor('/contact', locale));
  const item =
    'flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-amber-400 hover:bg-amber-50/40';

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5" data-direct-contact>
      <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
        {isEn ? 'Prefer to talk?' : 'Lieber direkt?'}
      </p>
      <p className="mt-1 text-sm text-slate-600">
        {isEn
          ? 'Mon–Fri 9:00–18:00. Outside these hours I call back the next business day.'
          : 'Mo–Fr 9:00–18:00 Uhr. Außerhalb dieser Zeiten rufe ich am nächsten Werktag zurück.'}
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <a
          href={PHONE_HREF}
          onClick={() => trackEvent('phone_click', { cta_position: 'contact_direct_card' })}
          className={item}
        >
          <OptimizedIcon icon={Phone} className="h-5 w-5 text-amber-600" />
          <span>
            {isEn ? 'Call' : 'Anrufen'} <span className="font-normal">{PHONE_DISPLAY}</span>
          </span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { cta_position: 'contact_direct_card' })}
          className={item}
        >
          <OptimizedIcon icon={WhatsappLogo} className="h-5 w-5 text-emerald-600" />
          <span>{isEn ? 'Message on WhatsApp' : 'Per WhatsApp schreiben'}</span>
        </a>
      </div>
      <NavLink
        href="/website-check"
        onClick={() =>
          trackEvent('cta_click', {
            cta_label: 'website_check',
            cta_position: 'contact_direct_card',
          })
        }
        className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-700 hover:border-amber-400 hover:text-slate-900"
      >
        <OptimizedIcon icon={MagnifyingGlass} className="h-5 w-5 text-slate-500" />
        <span>
          {isEn
            ? 'Not sure yet? Get a free website check first.'
            : 'Noch unsicher? Erst einen kostenlosen Website-Check anfordern.'}
        </span>
      </NavLink>
    </div>
  );
};

export default DirectContactCard;
