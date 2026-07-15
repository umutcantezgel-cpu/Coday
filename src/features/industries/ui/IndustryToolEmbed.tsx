'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface IndustryToolEmbedProps {
  toolId?: string;
  industryKey?: string;
  locationKey?: string;
}

export function IndustryToolEmbed({ industryKey }: IndustryToolEmbedProps) {
  const t = useTranslations('industries');
  let url = '';

  if (industryKey?.toLowerCase().includes('handwerk')) {
    url = 'https://www.coday-agency.de/';
  } else if (
    industryKey?.toLowerCase().includes('gesundheit') ||
    industryKey?.toLowerCase().includes('arzt')
  ) {
    url = 'https://praxis-seven-ashy.vercel.app/';
  } else if (
    industryKey?.toLowerCase().includes('automobil') ||
    industryKey?.toLowerCase().includes('kfz') ||
    industryKey?.toLowerCase().includes('auto')
  ) {
    url = 'https://automobile-lac.vercel.app/';
  } else {
    // Other industries coming soon
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 text-center h-64 flex flex-col items-center justify-center">
          <div className="w-12 h-12 mb-4 bg-gray-200 rounded-full animate-pulse" />
          <h2 className="text-xl font-display font-semibold mb-2">
            {t('tool_embed.coming_soon_title')}
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {t('tool_embed.coming_soon_desc')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative z-20 -mt-10">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-display font-black text-secondary-900 mb-4">
          {t('tool_embed.title')}
        </h2>
        <p className="text-lg text-secondary-600 font-medium">{t('tool_embed.subtitle')}</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-2xl p-12 text-center flex flex-col items-center justify-center relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-50 pointer-events-none" />
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
          <svg
            className="w-10 h-10 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
        <p className="text-2xl font-display font-bold text-secondary-900 mb-4 relative z-10">
          {t('tool_embed.demo_heading')}
        </p>
        <p className="text-secondary-600 max-w-md mx-auto mb-8 relative z-10">
          {t('tool_embed.demo_desc')}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary-600 rounded-full hover:bg-primary-700 hover:scale-105 transition-all shadow-lg hover:shadow-primary-600/30 relative z-10"
        >
          {t('tool_embed.cta')}
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
