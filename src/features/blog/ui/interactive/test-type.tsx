'use client';
import { useTranslations } from 'next-intl';

export function Test() {
  const t = useTranslations('blog');
  t('dataMaturity.levels.0');
}
