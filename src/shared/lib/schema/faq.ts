import { FAQPage, Question } from 'schema-dts';

export interface FAQInput {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQInput[]): FAQPage | null {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }) as Question),
  };
}
