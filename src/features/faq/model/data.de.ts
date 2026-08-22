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
    question: 'Was kostet eine Firmenwebseite in Wetzlar?',
    answer:
      'Wir kalkulieren Webprojekte individuell auf Basis Ihres tatsächlichen Anforderungsprofils und erstellen nach einer kostenlosen Bedarfsanalyse ein verbindliches Festpreisangebot auf Anfrage. Sie zahlen ausschließlich für Module und Funktionen, die echten geschäftlichen Mehrwert bringen.',
    category: 'pricing',
    relatedServices: ['web-development', 'web-design'],
  },
  {
    id: 'wordpress',
    question: 'Verwenden Sie WordPress oder Baukästen?',
    answer:
      '**Nein.** Baukästen und Systeme wie WordPress sind oft langsam und anfällig für Hackerangriffe. Wir programmieren Ihre Webseite individuell mit modernen Frameworks wie Next.js. Das garantiert blitzschnelle Ladezeiten und höchste Sicherheit für Ihr Unternehmen.',
    category: 'tech',
    relatedServices: ['web-development'],
  },
  {
    id: 'hidden-costs',
    question: 'Gibt es versteckte Kosten?',
    answer:
      'Wir garantieren 100% Preistransparenz. Vor Projektstart erhalten Sie von uns ein klares Festpreisangebot. Es gibt keine versteckten Gebühren oder unerwarteten Rechnungen im Nachhinein.',
    category: 'pricing',
    relatedServices: ['consulting'],
  },
  {
    id: 'maintenance',
    question: 'Wer kümmert sich nach Fertigstellung um die Seite?',
    answer:
      'Dank unserer modernen Next.js 15 Architektur entfallen die fehleranfälligen Pflichtwartungen herkömmlicher CMS-Systeme wie WordPress. Eine fortlaufende Betreuung, Sicherheits-Checks und Hosting-Unterstützung sind bei uns 100% freiwillig zubuchbar.',
    category: 'services',
    relatedServices: ['web-development', 'app-development'],
  },
  {
    id: 'timeline',
    question: 'Wie lange dauert es, bis meine neue Webseite online ist?',
    answer:
      'In der Regel ist Ihre neue Webseite innerhalb von 3 bis 6 Wochen fertig und online. Wir stimmen den Zeitplan vorher genau mit Ihnen ab und halten uns an unsere Zusagen.',
    category: 'process',
    relatedServices: ['web-development'],
  },
  {
    id: 'seo-guarantee',
    question: 'Werde ich bei Google in Wetzlar auf Platz 1 gefunden?',
    answer:
      'Niemand kann Platz 1 bei Google fest garantieren. Aber wir bauen Ihre Webseite technisch so perfekt auf, dass Sie die bestmöglichen Voraussetzungen haben, um in Wetzlar und Umgebung von Neukunden über Google gefunden zu werden.',
    category: 'services',
    relatedServices: ['seo', 'marketing'],
  },
  {
    id: 'hosting',
    question: 'Wo werden meine Daten und die Webseite gespeichert?',
    answer:
      'Datenschutz ist uns wichtig. Ihre Webseite und alle Kundendaten werden sicher und 100% DSGVO-konform auf Hochleistungsservern in Deutschland gespeichert.',
    category: 'tech',
    relatedServices: ['web-development', 'consulting'],
  },
  {
    id: 'design-revisions',
    question: 'Was passiert, wenn mir der erste Entwurf nicht gefällt?',
    answer:
      'Ihre Zufriedenheit steht an erster Stelle. Bevor wir programmieren, erstellen wir gemeinsam das Design. Wir passen den Entwurf so lange an, bis Sie zu 100% zufrieden sind.',
    category: 'process',
    relatedServices: ['design', 'web-design'],
  },
  {
    id: 'domain',
    question: 'Kümmern Sie sich auch um meine Domain und E-Mails?',
    answer:
      'Ja, absolut. Wir übernehmen den Umzug Ihrer bestehenden Domain (z.B. www.ihr-betrieb.de) oder registrieren eine neue für Sie. Auch um die Einrichtung passender E-Mail-Adressen kümmern wir uns auf Wunsch.',
    category: 'tech',
    relatedServices: ['app-development', 'web-development'],
  },
  {
    id: 'content-creation',
    question: 'Muss ich die Texte für die Webseite selbst schreiben?',
    answer:
      'Nein, das müssen Sie nicht. Wenn Sie möchten, übernehmen wir die Texterstellung für Sie. Wir führen ein kurzes Interview mit Ihnen und unsere Experten schreiben ansprechende Texte, die Ihre Kunden überzeugen.',
    category: 'services',
    relatedServices: ['marketing', 'seo'],
  },
];
