import { FAQItem, FAQCategory } from './types';
import { faqItems as faqItemsEN, faqCategories as faqCategoriesEN } from './data.en';
import { faqItems as faqItemsDE, faqCategories as faqCategoriesDE } from './data.de';

export const getFAQs = (locale: string = 'de'): FAQItem[] => {
  return locale.startsWith('en') ? faqItemsEN : faqItemsDE;
};

export const getFAQCategories = (locale: string = 'de'): FAQCategory[] => {
  return locale.startsWith('en') ? faqCategoriesEN : faqCategoriesDE;
};
