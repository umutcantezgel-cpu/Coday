"use client";
import { useTranslations } from 'next-intl';

export function Test() {
  const t = useTranslations();
  t('blog:dataMaturity.levels.0');
}
