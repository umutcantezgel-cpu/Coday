'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LeadQuickForm } from '@/features/lead/ui/LeadQuickForm';

/**
 * Desktop hero form of the home page. A thin wrapper around the site-wide
 * `LeadQuickForm` so every quick request looks, validates and tracks the same.
 */
export const QuickContactForm: React.FC = () => {
  const t = useTranslations('home');
  return (
    <LeadQuickForm
      variant="card"
      formKind="quick"
      source="quick_contact"
      heading={t('quick_contact.title')}
      subheading={t('quick_contact.subtitle')}
    />
  );
};

export default QuickContactForm;
