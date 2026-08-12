'use client';

import React, { createContext, useContext, ReactNode } from 'react';

const NextIntlContext = createContext<{ messages?: Record<string, unknown>; locale?: string }>({});

export const NextIntlClientProvider = ({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages?: Record<string, unknown>;
  locale?: string;
}) => {
  return (
    <NextIntlContext.Provider value={{ messages, locale }}>{children}</NextIntlContext.Provider>
  );
};

export const useTranslations = (namespace: string) => {
  const { messages } = useContext(NextIntlContext);
  return (key: string) => {
    const msgs = messages as Record<string, Record<string, string>> | undefined;
    return msgs?.[namespace]?.[key] || `${namespace}.${key}`;
  };
};

export const useLocale = () => {
  const { locale } = useContext(NextIntlContext);
  return locale || 'de';
};
