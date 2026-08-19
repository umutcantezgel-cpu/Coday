/**
 * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
 * Generator: scripts/generate-reviews.cjs
 * Generated at: 2026-05-14T23:15:16.055Z
 */

export interface IndividualReview {
  author: string;
  date: string;
  rating: number;
  body: string;
}

export interface ReviewAggregate {
  slug: string;
  platformName: string;
  sourceUrl: string;
  aggregateScore: number;
  totalReviews: number;
  lastSynced: string;
  topReviews: IndividualReview[];
}

export const aiReviewAggregates: ReviewAggregate[] = [
  {
    slug: 'google',
    platformName: 'Google Business',
    sourceUrl: 'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
    aggregateScore: 5.0,
    totalReviews: 4,
    lastSynced: '2026-02-18T12:00:00.000Z',
    topReviews: [
      {
        author: 'Behzad Aydin',
        date: '2026-02-17',
        rating: 5,
        body: 'Coday Web ist die beste Webagentur, mit der ich bisher zusammengearbeitet habe. Die Mitarbeiter sind kompetent, schnell erreichbar und unterstützen Anliegen zügig und engagiert. Die Arbeitsweise dieser Agentur ist makellos, und ich bin mit dem Ergebnis für mein Unternehmen vollkommen zufrieden.',
      },
      {
        author: 'Zeynep',
        date: '2026-02-17',
        rating: 5,
        body: 'Wir haben unsere neue Website von Coday erstellen lassen und sind absolut begeistert. Wer eine kompetente Webdesign Agentur in Wetzlar sucht, ist hier genau richtig. Die Beratung war von Beginn an professionell, die Umsetzung extrem schnell und das Design wirkt modern sowie hochwertig.',
      },
      {
        author: 'Baris Aydin',
        date: '2026-02-17',
        rating: 5,
        body: 'Sehr zufrieden mit der Erstellung unserer Homepage! Professionelle Arbeit, schnelle Umsetzung und eine tolle Kommunikation. Absolut empfehlenswert.',
      },
      {
        author: 'I I',
        date: '2026-02-17',
        rating: 5,
        body: 'Absolute Empfehlung! Ich bin mit der Arbeit mehr als zufrieden. Meine Webseite wurde professionell, modern und genau nach meinen Vorstellungen umgesetzt. Besonders hervorheben möchte ich die zuverlässige Kommunikation, die schnelle Umsetzung und dass auch auf kleine Änderungswünsche immer direkt eingegangen wurde.',
      },
    ],
  },
  {
    slug: 'provenexpert',
    platformName: 'ProvenExpert',
    sourceUrl: 'https://www.provenexpert.com/de-de/coday-webagentur/',
    aggregateScore: 5.0,
    totalReviews: 4,
    lastSynced: '2026-08-18T12:00:00.000Z',
    topReviews: [
      {
        author: 'Verifizierter Kunde',
        date: '2026-08-18',
        rating: 5,
        body: 'Ich bin mit der Arbeit der Coday-Webagentur rundum zufrieden. Meine Internetseite wurde professionell, modern und genau nach meinen Vorstellungen umgesetzt. Besonders hervorheben möchte ich die persönliche Beratung, die schnelle Erreichbarkeit und die zuverlässige Umsetzung meiner Wünsche.',
      },
      {
        author: 'Mina Saad',
        date: '2026-08-17',
        rating: 5,
        body: 'Hervorragende Zusammenarbeit von der ersten Idee bis zur fertigen Internetseite. Für mich die beste Webdesign Agentur in Wetzlar und Umgebung. Alle Wünsche wurden präzise umgesetzt und technisch läuft die Website blitzschnell auf allen mobilen Endgeräten.',
      },
      {
        author: 'Zeynep Hilaloglu',
        date: '2026-08-17',
        rating: 5,
        body: '5,00 von 5 Sternen — Sehr Gut & 100% Weiterempfehlung für die Coday Webagentur.',
      },
      {
        author: 'Batherm Haustechnik',
        date: '2026-08-17',
        rating: 5,
        body: '5,00 von 5 Sternen — Sehr Gut & Uneingeschränkte Weiterempfehlung. Exzellente Umsetzung und professionelle Betreuung.',
      },
    ],
  },
];
