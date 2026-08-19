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
  authorProfileUrl?: string;
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
  source: 'Google' | 'ProvenExpert';
}

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'google-review-1',
    authorName: 'Behzad Aydin',
    authorPosition: 'Verifizierte Google-Rezension',
    authorCompany: 'Unternehmer',
    authorProfileUrl: 'https://www.google.com/maps/contrib/102746428216698261932/reviews?hl=de',
    badge: 'Neu',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 2 Tagen',
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
    authorProfileUrl: 'https://www.google.com/maps/contrib/104651476918702962940/reviews?hl=de',
    badge: 'Neu',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 2 Tagen',
    quote: {
      de: 'Wir haben unsere neue Website von Coday erstellen lassen und sind absolut begeistert. Wer eine kompetente Webdesign Agentur in Wetzlar sucht, ist hier genau richtig. Die Beratung war von Beginn an professionell, die Umsetzung extrem schnell und das Design wirkt modern sowie hochwertig. Auch bei der Suchmaschinenoptimierung wurden wir perfekt unterstützt, sodass wir regional direkt deutlich besser bei Google gefunden werden. Eine uneingeschränkte Empfehlung und verdiente fünf Sterne.',
      en: 'We had our new website built by Coday and are absolutely thrilled. If you are looking for a competent web design agency in Wetzlar, this is exactly the right place. The consultation was professional right from the start, the implementation extremely fast, and the design looks modern and high-quality. We were also perfectly supported with search engine optimization, so that we are directly found much better on Google regionally. An unreserved recommendation and well-deserved five stars.',
    },
    highlightQuote: {
      de: 'Wer eine kompetente Webdesign Agentur in Wetzlar sucht, ist hier genau richtig. Die Umsetzung war extrem schnell und das Design wirkt modern sowie hochwertig!',
      en: 'If you are looking for a competent web design agency in Wetzlar, this is the place. Implementation was extremely fast and the design looks modern and premium!',
    },
    verified: true,
    source: 'Google',
  },
  {
    id: 'google-review-3',
    authorName: 'Baris Aydin',
    authorPosition: 'Local Guide · 4 Rezensionen',
    authorCompany: 'Unternehmer',
    authorProfileUrl: 'https://www.google.com/maps/contrib/102121581454089696362/reviews?hl=de',
    badge: 'Local Guide',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 2 Tagen',
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
    authorProfileUrl: 'https://www.google.com/maps/contrib/107842521372070049357/reviews?hl=de',
    badge: 'Top Local Guide',
    rating: 5,
    datePublished: '2026-02-17',
    relativeTime: 'Vor 2 Tagen',
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

export const PROVENEXPERT_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'provenexpert-review-1',
    authorName: 'Verifizierter Kunde',
    authorPosition: 'Erfahrungsbericht auf ProvenExpert',
    authorCompany: 'Wetzlar & Hessen',
    authorProfileUrl: 'https://www.provenexpert.com/de-de/coday-webagentur/',
    badge: 'Verifiziert',
    rating: 5,
    datePublished: '2026-08-18',
    relativeTime: '18.08.2026',
    quote: {
      de: 'Ich bin mit der Arbeit der Coday-Webagentur rundum zufrieden. Meine Internetseite wurde professionell, modern und genau nach meinen Vorstellungen umgesetzt. Besonders hervorheben möchte ich die persönliche Beratung, die schnelle Erreichbarkeit und die zuverlässige Umsetzung meiner Wünsche. Auch bei Fragen oder nachträglichen Anpassungen wurde mir jederzeit schnell und kompetent weitergeholfen. Man merkt sofort, dass hier mit viel Erfahrung, Engagement und einem hohen Qualitätsanspruch gearbeitet wird. Das Preis-Leistungs-Verhältnis ist ebenfalls hervorragend. Ich kann die Coday-Webagentur uneingeschränkt weiterempfehlen und würde mich jederzeit wieder für eine Zusammenarbeit entscheiden!',
      en: 'I am completely satisfied with the work of Coday Web Agency. My website was implemented professionally, modernly and exactly according to my expectations. I would especially like to emphasize the personal advice, quick reachability, and reliable implementation of my wishes.',
    },
    highlightQuote: {
      de: 'Man merkt sofort, dass hier mit viel Erfahrung, Engagement und einem hohen Qualitätsanspruch gearbeitet wird!',
      en: 'You immediately notice high experience, dedication, and quality standards!',
    },
    verified: true,
    source: 'ProvenExpert',
  },
  {
    id: 'provenexpert-review-2',
    authorName: 'Mina Saad',
    authorPosition: 'Erfahrungsbericht auf ProvenExpert',
    authorCompany: 'Wetzlar & Umgebung',
    authorProfileUrl: 'https://www.provenexpert.com/de-de/coday-webagentur/',
    badge: 'Verifiziert',
    rating: 5,
    datePublished: '2026-08-17',
    relativeTime: '17.08.2026',
    quote: {
      de: 'Hervorragende Zusammenarbeit von der ersten Idee bis zur fertigen Internetseite. Für mich die beste Webdesign Agentur in Wetzlar und Umgebung. Alle Wünsche wurden präzise umgesetzt und technisch läuft die Website blitzschnell auf allen mobilen Endgeräten. Besonders geschätzt habe ich die direkte Kommunikation, das moderne Design und die spürbare Steigerung unserer lokalen Sichtbarkeit. Vielen Dank für die starke Arbeit und den erstklassigen Service.',
      en: 'Outstanding collaboration from the initial idea to the finished website. For me the best web design agency in Wetzlar and the surrounding area. All requests were precisely implemented and technically the website runs lightning fast on all mobile devices.',
    },
    highlightQuote: {
      de: 'Für mich die beste Webdesign Agentur in Wetzlar und Umgebung. Technisch läuft die Website blitzschnell!',
      en: 'For me the best web design agency in Wetzlar. Technically the website runs lightning fast!',
    },
    verified: true,
    source: 'ProvenExpert',
  },
  {
    id: 'provenexpert-review-3',
    authorName: 'Zeynep Hilaloglu',
    authorPosition: 'Empfehlung auf ProvenExpert',
    authorCompany: 'Wetzlar',
    authorProfileUrl: 'https://www.provenexpert.com/de-de/coday-webagentur/',
    badge: 'Empfehlung',
    rating: 5,
    datePublished: '2026-08-17',
    relativeTime: '17.08.2026',
    quote: {
      de: '5,00 von 5 Sternen — Sehr Gut & 100% Weiterempfehlung für die Coday Webagentur.',
      en: '5.00 out of 5 stars — Very Good & 100% recommendation for Coday Web Agency.',
    },
    verified: true,
    source: 'ProvenExpert',
  },
  {
    id: 'provenexpert-review-4',
    authorName: 'Batherm Haustechnik',
    authorPosition: 'Referenzkunde & Bewertung auf ProvenExpert',
    authorCompany: 'Batherm Haustechnik',
    authorProfileUrl: 'https://www.provenexpert.com/de-de/coday-webagentur/',
    badge: 'Referenz',
    rating: 5,
    datePublished: '2026-08-17',
    relativeTime: '17.08.2026',
    quote: {
      de: '5,00 von 5 Sternen — Sehr Gut & Uneingeschränkte Weiterempfehlung. Exzellente Umsetzung und professionelle Betreuung.',
      en: '5.00 out of 5 stars — Very Good & unreserved recommendation. Excellent implementation and professional support.',
    },
    verified: true,
    source: 'ProvenExpert',
  },
];

export const REVIEWS_SUMMARY = {
  ratingValue: 5.0,
  reviewCount: 8,
  googleReviewCount: 4,
  provenExpertReviewCount: 4,
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
    reviewCount: 4,
    ratingText: '5,0 / 5,0 Sterne',
    label: 'ProvenExpert (5.0 ★★★★★)',
    badgeText: 'Verifiziertes ProvenExpert Profil',
  },
};
