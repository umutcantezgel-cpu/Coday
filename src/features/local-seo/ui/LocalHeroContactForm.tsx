'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { LeadQuickForm } from '@/features/lead/ui/LeadQuickForm';

interface LocalHeroContactFormProps {
  cityName: string;
  sourceTag: string;
  headingText?: string;
  subtitleText?: string;
}

/**
 * Hero form of the city landing pages. Thin wrapper around the site-wide
 * `LeadQuickForm`; the props stay as the 24 city pages already pass them.
 */
export const LocalHeroContactForm: React.FC<LocalHeroContactFormProps> = ({
  cityName,
  sourceTag,
  headingText,
  subtitleText,
}) => {
  const isEn = useLocale() === 'en';
  return (
    <LeadQuickForm
      variant="card"
      formKind="local"
      source={sourceTag}
      cityName={cityName}
      project={`Webdesign ${cityName}`}
      heading={
        headingText ?? (isEn ? `Free quote for ${cityName}` : `Kostenloses Angebot für ${cityName}`)
      }
      subheading={
        subtitleText ??
        (isEn
          ? 'Direct reply from owner Umutcan Emre Tezgel within 24 hours.'
          : 'Direkte Rückmeldung durch Inhaber Umutcan Emre Tezgel innerhalb von 24 Stunden.')
      }
    />
  );
};

export default LocalHeroContactForm;
