'use client';

import React from 'react';
import { useConsentStore } from '@/shared/lib/consent/consentStore';

interface FooterPrivacyButtonProps {
  isEn: boolean;
}

export function FooterPrivacyButton({ isEn }: FooterPrivacyButtonProps) {
  const openSettings = useConsentStore((state) => state.openSettings);

  return (
    <button
      type="button"
      onClick={openSettings}
      className="hover:text-slate-900 transition-colors duration-200 relative group cursor-pointer text-xs font-medium text-slate-700 bg-transparent border-none p-0"
      aria-label={
        isEn ? 'Open Privacy & Cookie Settings' : 'Privatsphäre- & Cookie-Einstellungen öffnen'
      }
    >
      <span>{isEn ? 'Privacy Settings' : 'Cookie-Einstellungen'}</span>
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 transition-all duration-200 group-hover:w-full" />
    </button>
  );
}
