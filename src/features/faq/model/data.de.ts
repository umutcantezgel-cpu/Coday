import { FAQItem, FAQCategory } from '@/features/faq/model/types';

export const faqCategories: FAQCategory[] = [
  { id: 'general', title: 'Allgemein', icon: 'info' },
  { id: 'pricing', title: 'Preise & Modelle', icon: 'coins' },
  { id: 'services', title: 'Leistungen', icon: 'layers' },
  { id: 'tech', title: 'Technologie', icon: 'cpu' },
  { id: 'process', title: 'Prozess', icon: 'workflow' },
];

export const faqItems: FAQItem[] = [
  {
    id: 'cost-website',
    question: 'Was kostet eine Website?',
    answer:
      'Unsere Preise sind transparent und fair. Der Einstieg (Starter-Paket) beginnt bei einmalig **939€** zzgl. **49€** monatlich. Unser beliebtes Professional-Paket liegt bei **1.619€** (einmalig) + **99€** / Monat. Für komplexe Enterprise-Lösungen bieten wir maßgeschneiderte Pakete ab **2.219€** Setup an.',
    category: 'pricing',
    relatedServices: ['web-development', 'web-design'],
  },
  {
    id: 'wordpress',
    question: 'Arbeiten Sie mit WordPress?',
    answer:
      '**Nein.** Wir glauben, dass WordPress ein Sicherheitsrisiko und Performance-Flaschenhals für moderne Unternehmen ist. Wir bauen mit React (React Router v7 / Next.js) und Headless CMS (Sanity/Strapi), um 100/100 Performance-Scores und maximale Sicherheit zu garantieren.',
    category: 'tech',
    relatedServices: ['web-development'],
  },
  {
    id: 'hourly-rate',
    question: 'Was ist Ihr Stundensatz?',
    answer:
      'Wir verkaufen keine Stunden. Wir verkaufen Ergebnisse. Unsere Preise basieren auf dem Projektumfang oder einem Retainer. Das richtet unsere Anreize auf Ihre aus: Wir wollen hochwertige Arbeit effizient liefern, nicht den Prozess in die Länge ziehen, um mehr Stunden abzurechnen.',
    category: 'pricing',
    relatedServices: ['consulting'],
  },
  {
    id: 'maintenance',
    question: 'Bieten Sie Wartung an?',
    answer:
      "Ja. Digitale Produkte brauchen Pflege. Wir bieten 'Growth Retainer', die nicht nur Updates und Sicherheitspatches beinhalten, sondern kontinuierliche Optimierung (CRO), A/B-Tests und Feature-Erweiterungen.",
    category: 'services',
    relatedServices: ['web-development', 'app-development'],
  },
  {
    id: 'timeline',
    question: 'Wie lange dauert ein Projekt?',
    answer:
      'Eine typische High-Performance Website dauert 4-8 Wochen. Eine komplexe Web-Applikation dauert 3-6 Monate. Wir arbeiten in 2-Wochen-Sprints und liefern alle 14 Tage funktionierenden Code.',
    category: 'process',
    relatedServices: ['web-development'],
  },
  {
    id: 'seo-guarantee',
    question: 'Garantieren Sie Platz 1 bei Google?',
    answer:
      'Keine seriöse Agentur kann Platz 1 garantieren. Wir garantieren jedoch das bestmögliche technische Fundament (100/100 Lighthouse Scores, Semantisches HTML, Schema.org), welches die Voraussetzung für Rankings ist. Unsere Content-Strategien haben eine nachweisliche Erfolgsbilanz für verbesserte Sichtbarkeit.',
    category: 'services',
    relatedServices: ['seo', 'marketing'],
  },
  {
    id: 'hosting',
    question: 'Wo werden die Daten gehostet?',
    answer:
      'Wir priorisieren Digitale Souveränität. Standardmäßig deployen wir auf europäischer Infrastruktur (Managed Vercel/Netlify Nodes in Frankfurt oder Hetzner Cloud), um strikte DSGVO-Konformität sicherzustellen. Wir vermeiden US-Only Datencenter für sensible Projekte.',
    category: 'tech',
    relatedServices: ['web-development', 'consulting'],
  },
  {
    id: 'design-revisions',
    question: 'Wie viele Design-Korrekturschleifen erhalte ich?',
    answer:
      "Wir limitieren Korrekturen nicht strikt, aber wir arbeiten kollaborativ, um 'Überraschungen' zu vermeiden. Wir binden Sie in Wireframing und Prototyping ein, sodass wir uns beim High-Fidelity UI nur noch über Details unterhalten, nicht über die Richtung.",
    category: 'process',
    relatedServices: ['design', 'web-design'],
  },
  {
    id: 'mobile-app',
    question: 'Brauche ich eine App oder Web App?',
    answer:
      '90% der Unternehmen brauchen keine native App-Store-App. Eine Progressive Web App (PWA) bietet dieselben Funktionen (Offline-Modus, Push-Nachrichten, Installierbarkeit) zu einem Bruchteil der Kosten und mit besserer SEO. Wir empfehlen Native nur für High-Performance Games oder spezifischen Hardware-Zugriff.',
    category: 'tech',
    relatedServices: ['app-development', 'web-development'],
  },
  {
    id: 'content-creation',
    question: 'Schreiben Sie den Content oder ich?',
    answer:
      'Wir können beides. Wir empfehlen jedoch unseren AI-Assisted Content Service. Wir interviewen Sie, um Ihre Expertise einzufangen, und nutzen dann unsere AI-Agenten, um sie zu strukturieren und zu polieren. Das spart Ihnen Zeit und sichert SEO-Optimierung.',
    category: 'services',
    relatedServices: ['marketing', 'seo'],
  },
];
