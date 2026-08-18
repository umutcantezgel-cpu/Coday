/**
 * Verified Google Reviews for Coday.
 *
 * Source: Google Business Profile (5.0 / 5.0 Stars, 4 Reviews)
 * All entries are verified customer feedback.
 */

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  authorPosition: string;
  authorCompany?: string;
  badge?: string;
  rating: number;
  datePublished: string;
  relativeTime: string;
  quote: {
    de: string;
    en: string;
  };
  highlightQuote?: {
    de: string;
    en: string;
  };
  verified: boolean;
  source: 'Google';
}

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'google-review-1',
    authorName: 'Behzad Aydin',
    authorPosition: 'Verifizierte Google-Rezension',
    authorCompany: 'Unternehmer',
    badge: 'Neu',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 8 Stunden',
    quote: {
      de: 'Coday Web ist die beste Webagentur, mit der ich bisher zusammengearbeitet habe. Die Mitarbeiter sind kompetent, schnell erreichbar und unterstützen Anliegen zügig und engagiert. Die Arbeitsweise dieser Agentur ist makellos, und ich bin mit dem Ergebnis für mein Unternehmen vollkommen zufrieden. Ich kann sie uneingeschränkt weiterempfehlen und freue mich auf zukünftige Geschäftsbeziehungen mit diesen kompetenten Partnern.',
      en: 'Coday Web is the best web agency I have worked with so far. The team is competent, quickly reachable, and supports requests swiftly and dedicatedly. The agency’s way of working is flawless, and I am completely satisfied with the result for my company. I can unreservedly recommend them and look forward to future business relationships.',
    },
    highlightQuote: {
      de: 'Coday Web ist die beste Webagentur, mit der ich bisher zusammengearbeitet habe. Die Arbeitsweise dieser Agentur ist makellos!',
      en: 'Coday Web is the best web agency I have worked with so far. The agency’s way of working is flawless!',
    },
    verified: true,
    source: 'Google',
  },
  {
    id: 'google-review-2',
    authorName: 'Zeynep',
    authorPosition: 'Verifizierte Google-Rezension',
    authorCompany: 'Wetzlar',
    badge: 'Neu',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 10 Stunden',
    quote: {
      de: 'Wir haben unsere neue Website von Coday erstellen lassen und sind absolut begeistert. Wer eine kompetente Webdesign Agentur in Wetzlar sucht, ist hier genau richtig. Die Beratung war von Beginn an professionell, die Umsetzung extrem schnell und das Ergebnis hat unsere Erwartungen weit übertroffen.',
      en: 'We had our new website built by Coday and are absolutely thrilled. If you are looking for a competent web design agency in Wetzlar, this is exactly the right place. The consultation was professional right from the start, the implementation extremely fast, and the result far exceeded our expectations.',
    },
    highlightQuote: {
      de: 'Wer eine kompetente Webdesign Agentur in Wetzlar sucht, ist hier genau richtig. Die Umsetzung war extrem schnell!',
      en: 'If you are looking for a competent web design agency in Wetzlar, this is the place. Implementation was extremely fast!',
    },
    verified: true,
    source: 'Google',
  },
  {
    id: 'google-review-3',
    authorName: 'Baris Aydin',
    authorPosition: 'Local Guide · 4 Rezensionen',
    authorCompany: 'Unternehmer',
    badge: 'Local Guide',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 12 Stunden',
    quote: {
      de: 'Sehr zufrieden mit der Erstellung unserer Homepage! Professionelle Arbeit, schnelle Umsetzung und eine tolle Kommunikation. Absolut empfehlenswert.',
      en: 'Very satisfied with the creation of our homepage! Professional work, fast implementation and great communication. Highly recommended.',
    },
    highlightQuote: {
      de: 'Sehr zufrieden mit der Erstellung unserer Homepage! Professionelle Arbeit und tolle Kommunikation.',
      en: 'Very satisfied with our homepage! Professional work and great communication.',
    },
    verified: true,
    source: 'Google',
  },
  {
    id: 'google-review-4',
    authorName: 'I I',
    authorPosition: 'Local Guide · 9 Rezensionen · 3 Fotos',
    authorCompany: 'Verifizierter Kunde',
    badge: 'Top Local Guide',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 17 Stunden',
    quote: {
      de: 'Absolute Empfehlung! Ich bin mit der Arbeit mehr als zufrieden. Meine Webseite wurde professionell, modern und genau nach meinen Vorstellungen umgesetzt. Besonders hervorheben möchte ich die zuverlässige Kommunikation, die schnelle Umsetzung und dass auch auf kleine Änderungswünsche immer direkt eingegangen wurde.\n\nMan merkt sofort, dass hier jemand arbeitet, der sein Handwerk versteht und nicht einfach nur irgendeine Webseite zusammenbaut, sondern sich wirklich Gedanken darüber macht, wie der Internetauftritt für das jeweilige Unternehmen funktionieren soll.\n\nAuch nach Fertigstellung der Webseite ist er weiterhin erreichbar und hilft bei Fragen oder Anpassungen schnell und unkompliziert weiter. Genau so stelle ich mir eine gute und langfristige Zusammenarbeit vor.\n\nIch kann ihn wirklich uneingeschränkt weiterempfehlen und würde meine Webseite jederzeit wieder von ihm erstellen lassen. Vielen Dank für die hervorragende Arbeit absolut verdiente 5 Sterne!',
      en: 'Absolute recommendation! I am more than satisfied with the work. My website was implemented professionally, modernly, and exactly according to my vision. I would especially like to emphasize the reliable communication, the fast implementation, and that even small change requests were always addressed directly.\n\nYou immediately notice that someone is working here who understands their craft and does not just assemble any website, but genuinely thinks about how the internet presence should work for the respective company.\n\nEven after the website was completed, he continues to be available and helps quickly and straightforwardly with questions or adjustments. That is exactly how I envision a great, long-term cooperation.\n\nI can truly recommend him without reservation and would have my website built by him again at any time. Thank you very much for the outstanding work – absolutely deserved 5 stars!',
    },
    highlightQuote: {
      de: 'Man merkt sofort, dass hier jemand arbeitet, der sein Handwerk versteht. Zuverlässige Kommunikation und absolut verdiente 5 Sterne!',
      en: 'You immediately notice someone working here who understands their craft. Reliable communication and well-deserved 5 stars!',
    },
    verified: true,
    source: 'Google',
  },
];

export const REVIEWS_SUMMARY = {
  ratingValue: 5.0,
  reviewCount: 4,
  bestRating: 5,
  worstRating: 1,
  ratingText: '5,0 / 5,0',
  stars: 5,
  provider: 'Google Rezensionen & ProvenExpert',
};

export const REVIEW_PROFILES = {
  googleMaps: {
    url: 'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
    name: 'Google Maps Rezensionen',
    ratingValue: 5.0,
    reviewCount: 4,
    ratingText: '5,0 / 5,0 Sterne',
    label: 'Google Maps (5.0 ★★★★★)',
    badgeText: '4 verifizierte Google-Rezensionen',
  },
  provenExpert: {
    url: 'https://www.provenexpert.com/de-de/coday-webagentur/',
    name: 'ProvenExpert',
    ratingValue: 5.0,
    ratingText: '5,0 / 5,0 Sterne',
    label: 'ProvenExpert (5.0 ★★★★★)',
    badgeText: '100% Weiterempfehlung auf ProvenExpert',
  },
};
