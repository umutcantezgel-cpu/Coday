import { FAQItem, FAQCategory } from '@/features/faq/model/types';
import {
  faqItems as faqItemsEN,
  faqCategories as faqCategoriesEN,
} from '@/features/faq/model/data.en';
import {
  faqItems as faqItemsDE,
  faqCategories as faqCategoriesDE,
} from '@/features/faq/model/data.de';

export const getFAQs = (locale: string = 'de'): FAQItem[] => {
  return locale.startsWith('en') ? faqItemsEN : faqItemsDE;
};

export const getFAQCategories = (locale: string = 'de'): FAQCategory[] => {
  return locale.startsWith('en') ? faqCategoriesEN : faqCategoriesDE;
};
