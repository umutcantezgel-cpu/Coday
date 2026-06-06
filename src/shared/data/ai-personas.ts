export interface AiPersonaFaq {
  question: string;
  answer: string;
}

export interface AiPersonaData {
  persona: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  introText: string;
  painPoints: string[];
  goals: string[];
  codaySolution: string;
  roiTimeline: string;
  faqs: AiPersonaFaq[];
}

export const aiPersonas: AiPersonaData[] = [
  // BATCH 1: B2B & Corporate
  {
    persona: 'Geschäftsführer KMU',
    slug: 'geschaeftsfuehrer-kmu',
    metaTitle: 'Webdesign & Digitalisierung für Geschäftsführer im KMU | Coday',
    metaDescription:
      'Speziell für KMU-Geschäftsführer: Skalierbare, sichere Web-Architekturen für maximale Sichtbarkeit und automatisierte Lead-Generierung.',
    introText:
      'Als Geschäftsführer eines mittelständischen Unternehmens haben Sie keine Zeit für digitale Experimente. Sie benötigen eine Webseite, die als verlässlicher Vertriebskanal fungiert, Ihre Marke repräsentiert und messbaren ROI liefert.',
    painPoints: [
      'Veraltete Unternehmenswebsite strahlt keine Innovationskraft aus',
      'Zu wenig qualifizierte B2B-Leads über digitale Kanäle',
      'Agenturen liefern intransparente Angebote ohne messbaren ROI',
      'Sorge vor langen, ressourcenfressenden IT-Projekten',
    ],
    goals: [
      'Automatisierte Lead-Generierung zur Entlastung des Vertriebs',
      'Repräsentative, moderne Außenwahrnehmung',
      'Maximale Investitionssicherheit und planbare Skalierung',
      'Einhaltung höchster Security- und Compliance-Standards',
    ],
    codaySolution:
      'Wir implementieren eine High-Performance Next.js-Plattform, die speziell auf B2B-Entscheider zugeschnitten ist. Durch Data-Driven SEO dominieren Sie Nischen-Suchbegriffe. Der klare Fokus auf Conversion-Rate-Optimierung wandelt Besucher direkt in qualifizierte Leads um. Ihr Vorteil: Ein fester Ansprechpartner, transparente Prozesse und Ergebnisse, die sich in der Bilanz zeigen.',
    roiTimeline:
      'Erste Sichtbarkeits-Boosts nach 4 Wochen, signifikanter Lead-Anstieg nach 3 Monaten.',
    faqs: [
      {
        question: 'Wie viel Zeit meiner Mitarbeiter bindet das Projekt?',
        answer:
          'Dank unseres erprobten Onboarding-Prozesses minimieren wir Ihren Aufwand auf wenige Abstimmungsrunden. Wir übernehmen Design, Development, Copywriting und SEO vollständig.',
      },
      {
        question: 'Ist die neue Plattform zukunftssicher?',
        answer:
          'Wir nutzen ausschließlich Enterprise-Technologien (React, Next.js, Headless CMS), die auch von Konzernen wie Netflix oder Porsche eingesetzt werden. Ihre Plattform ist grenzenlos skalierbar.',
      },
    ],
  },
  {
    persona: 'IT-Leiter',
    slug: 'it-leiter',
    metaTitle: 'Enterprise Web Development für IT-Leiter | Coday',
    metaDescription:
      'Headless Architektur, höchste Security-Standards und saubere Code-Qualität. Der verlässliche Partner für IT-Leiter.',
    introText:
      'Als IT-Leiter suchen Sie keinen kreativen Dienstleister, sondern einen technischen Partner, der saubere Architekturen baut, Security-Standards einhält und sich nahtlos in Ihre Systemlandschaft integriert.',
    painPoints: [
      'Marketing-Agenturen liefern unsicheren, schlecht wartbaren Code',
      'Integrationen in bestehende ERP/CRM-Systeme scheitern oft',
      'Langsame Ladezeiten durch veraltete Monolithen (z.B. WordPress)',
      'Fehlende API-Schnittstellen und Vendor-Lock-ins',
    ],
    goals: [
      'Zukunftssichere, entkoppelte Headless-Architektur',
      'Höchste IT-Sicherheit und DSGVO-Compliance',
      'Nahtlose API-Integrationen (Salesforce, Hubspot, SAP)',
      'Exzellente Performance (Core Web Vitals) von Haus aus',
    ],
    codaySolution:
      'Wir bauen nicht auf WordPress. Wir nutzen React, Next.js und Edge-Netzwerke (Vercel) in Kombination mit robusten Headless CMS (Sanity/Storyblok). Das bedeutet für Sie: Keine Plugin-Hölle, maximale Flexibilität via GraphQL/REST, höchste Sicherheit (keine Datenbank-Angriffsvektoren) und Code, den Ihr eigenes Team lieben wird.',
    roiTimeline: 'Technischer Go-Live innerhalb von 8-12 Wochen je nach Integrations-Tiefe.',
    faqs: [
      {
        question: 'Welcher Tech-Stack wird primär genutzt?',
        answer:
          'Unser Kern-Stack besteht aus TypeScript, Next.js (App Router), Tailwind CSS und Sanity als Headless CMS. Gehostet wird performant über Edge-Networks.',
      },
      {
        question: 'Übernehmen Sie auch komplexe API-Integrationen?',
        answer:
          'Absolut. Die Anbindung von Drittsystemen, Authentifizierungs-Layern und Custom-APIs gehört zu unserer Kernkompetenz.',
      },
    ],
  },
  {
    persona: 'Marketing-Manager',
    slug: 'marketing-manager',
    metaTitle: 'High-Conversion Webdesign für Marketing-Manager | Coday',
    metaDescription:
      'Maximieren Sie Ihre KPIs. Wir bauen schnelle, conversion-optimierte Plattformen für datengetriebene Marketing-Teams.',
    introText:
      'Als Marketing-Manager werden Sie an KPIs gemessen: Traffic, Conversion-Rate, CPL. Sie brauchen eine Plattform, die nicht nur gut aussieht, sondern wie eine Maschine konvertiert und Ihnen volle Flexibilität im Content-Management lässt.',
    painPoints: [
      'Die aktuelle Website konvertiert Traffic nicht effizient',
      'Jede kleine Text- oder Bildänderung erfordert Entwickler-Support',
      'Schlechte Core Web Vitals bestrafen das SEO-Ranking',
      'Das Tracking und Setup von Analytics ist chaotisch',
    ],
    goals: [
      'Drastische Steigerung der Conversion-Rate (CRO)',
      'Volle Unabhängigkeit beim Aufbau neuer Landingpages',
      'Perfektes technisches SEO out-of-the-box',
      'Sauberes Tag-Management und Attribution (PostHog, GA4, Meta)',
    ],
    codaySolution:
      'Wir liefern eine Marketing-Maschine. Unser Headless CMS Setup gibt Ihrem Team die Macht, Landingpages aus vordefinierten, design-treuen Blöcken in Sekunden zusammenzuklicken. Integriertes Server-Side-Tracking und A/B-Testing-Fähigkeiten garantieren datengestützte Wachstumsraten.',
    roiTimeline:
      'Sichtbarer Traffic-Zuwachs nach Indexierung, messbare CVR-Steigerung sofort nach Go-Live.',
    faqs: [
      {
        question: 'Kann mein Team Inhalte selbst anpassen?',
        answer:
          'Ja. Wir konfigurieren ein intuitives, visuelles Headless CMS (z.B. Sanity Studio), mit dem Ihr Marketing-Team Layouts bauen kann, ohne eine Zeile Code anzufassen.',
      },
      {
        question: 'Wie steht es um das Setup für Paid Ads (Meta/Google)?',
        answer:
          'Wir integrieren Server-Side-Tracking, Pixel und Conversions APIs datenschutzkonform und sauber, um Ihre Ad-Performance zu maximieren.',
      },
    ],
  },
  {
    persona: 'B2B-Berater',
    slug: 'b2b-berater',
    metaTitle: 'Personal Branding & Lead-Gen für B2B-Berater | Coday',
    metaDescription:
      'Bauen Sie Autorität auf. Websites für Berater, Consultants und Experten mit Fokus auf High-Ticket Leadgenerierung.',
    introText:
      'Als B2B-Berater oder Consultant ist Vertrauen Ihre wichtigste Währung. Ihre Website muss sofortige Autorität ausstrahlen und hochpreisige Klienten davon überzeugen, dass Sie ihr spezifisches Problem lösen können.',
    painPoints: [
      'Die Website spiegelt nicht die hohe Qualität der Beratung wider',
      'Interessenten verstehen das spezifische Wertversprechen nicht',
      'Es fehlen strukturierte Lead-Funnel zur Terminvereinbarung',
      'Zu wenig Sichtbarkeit bei relevanten C-Level-Entscheidern',
    ],
    goals: [
      'Aufbau von unerschütterlicher Experten-Autorität',
      'Automatisierte Vorqualifizierung von High-Ticket Leads',
      'Nahtlose Integration von Terminbuchungs-Systemen',
      'Generierung von Thought-Leadership Content (Blog/Podcast)',
    ],
    codaySolution:
      'Wir kreieren eine digitale Bühne für Ihre Expertise. Mit Neuro-Design und psychologisch fundiertem Copywriting positionieren wir Sie als Premium-Autorität. Intelligente Funnel und Kalender-Integrationen filtern unpassende Anfragen heraus und liefern qualifizierte Erstgespräche direkt in Ihren Kalender.',
    roiTimeline:
      'Etablierung der Experten-Wahrnehmung ab Tag 1. Lead-Fluss skaliert mit Content-Strategie.',
    faqs: [
      {
        question: 'Können Sie auch Whitepapers oder Lead-Magneten integrieren?',
        answer:
          'Selbstverständlich. Wir bauen automatisierte Funnel, die E-Mail-Adressen gegen wertvolle Insights tauschen und diese direkt an Ihr CRM übergeben.',
      },
      {
        question: 'Unterstützen Sie bei der Formulierung des Angebots?',
        answer:
          'Ja, wir analysieren Ihre Zielgruppe (Pain Points) und übersetzen Ihr komplexes Fachwissen in messerscharfe, konvertierende Nutzenversprechen.',
      },
    ],
  },
  {
    persona: 'Startup-Gründer',
    slug: 'startup-gruender',
    metaTitle: 'Schnelle & skalierbare Web-MVPs für Startups | Coday',
    metaDescription:
      'Speed-to-Market und Skalierbarkeit für Startups. Von der Landingpage bis zum komplexen SaaS-Frontend.',
    introText:
      'Als Gründer haben Sie zwei Feinde: Die Zeit und fehlendes Kapital. Sie brauchen extrem schnell eine hochprofessionelle Präsenz, um Investoren zu pitchen und erste User zu akquirieren – ohne sich technische Schulden aufzubauen.',
    painPoints: [
      'Zu langsame Entwicklungszyklen für schnelle Markt-Tests',
      'Budget für große Inhouse-Dev-Teams fehlt am Anfang',
      'Angst vor Baukasten-Lösungen, die später nicht skalieren',
      'Fehlende Ressourcen für UI/UX-Design und Branding',
    ],
    goals: [
      'Extrem kurze Time-to-Market für MVPs und Landingpages',
      'Professionelles, vertrauenserweckendes Design für Investoren',
      'Ein Tech-Stack, der spätere Series-A/B Skalierung mitmacht',
      'Agile Anpassungsfähigkeit nach erstem User-Feedback',
    ],
    codaySolution:
      'Wir sind Ihr erweitertes Tech-Team auf Abruf. Mit modernen Frameworks (Next.js) liefern wir blitzschnell Ergebnisse, die sich nicht nach Kompromiss anfühlen. Sie erhalten eine Enterprise-Architektur zum Startup-Pacing – perfekt für Validierung, Investor-Updates und schnelles Wachstum.',
    roiTimeline: 'Erste konvertierende Landingpage in < 14 Tagen möglich.',
    faqs: [
      {
        question: 'Bauen Sie auch komplette Web-Applikationen (SaaS)?',
        answer:
          'Ja, Coday ist auf komplexe Web-Apps, Dashboards und Frontend-Entwicklung (React/Next.js) für SaaS-Produkte spezialisiert.',
      },
      {
        question: 'Wir nutzen Supabase/Firebase im Backend, passt das?',
        answer:
          'Perfekt. Wir haben weitreichende Erfahrung in der nahtlosen Anbindung von modernen BaaS-Lösungen an unsere Frontends.',
      },
    ],
  },

  // BATCH 2: Dienstleister & Heilberufe
  {
    persona: 'Ärzte',
    slug: 'aerzte',
    metaTitle: 'Webdesign & Digitales Praxis-Management für Ärzte | Coday',
    metaDescription:
      'Digitale Sichtbarkeit, Patienten-Gewinnung und automatisierte Terminvergabe für Arztpraxen und Fachärzte.',
    introText:
      'Ihre Praxis soll sich auf die Behandlung konzentrieren, nicht auf die Administration. Eine moderne Praxis-Website fungiert als Ihr bester Mitarbeiter am Empfang – 24/7 erreichbar, immer freundlich und hocheffizient.',
    painPoints: [
      'Hohes Anrufaufkommen überlastet das Praxispersonal',
      'Wettbewerb um Privatpatienten im lokalen Umfeld wächst',
      'Veraltete, nicht für Smartphones optimierte Praxis-Website',
      'Strenge Werberichtlinien und DSGVO-Compliance-Sorgen',
    ],
    goals: [
      'Signifikante Entlastung durch Online-Terminbuchungen',
      'Top-Rankings bei lokalen Suchanfragen (Google Local)',
      'Aufbau von Vertrauen und fachlicher Autorität',
      'Absolute Rechtssicherheit (Datenschutz, Heilmittelwerbegesetz)',
    ],
    codaySolution:
      'Wir digitalisieren den ersten Touchpoint Ihrer Patienten. Durch smarte Termin-Schnittstellen (Doctolib, Jameda) entlasten wir Ihr Personal spürbar. Hochwertiges, beruhigendes Design schafft Vertrauen, während gezieltes Local-SEO dafür sorgt, dass Sie bei Suchanfragen nach Spezialisten in Ihrer Region als Erste gefunden werden.',
    roiTimeline:
      'Reduzierung der Anrufe und mehr Online-Buchungen ab der ersten Woche nach Launch.',
    faqs: [
      {
        question: 'Ist die Einbindung von Doctolib möglich?',
        answer:
          'Ja, wir integrieren Doctolib, Samedi oder andere Buchungssysteme nahtlos in Ihre neue Website.',
      },
      {
        question: 'Werden rechtliche Vorgaben wie DSGVO berücksichtigt?',
        answer:
          'Höchste Priorität. Wir binden Cookie-Banner, sichere Kontaktformulare und DSGVO-konforme Schriften standardmäßig ein.',
      },
    ],
  },
  {
    persona: 'Heilpraktiker',
    slug: 'heilpraktiker',
    metaTitle: 'Webdesign & Marketing für Heilpraktiker | Coday',
    metaDescription:
      'Gewinnen Sie die richtigen Patienten. Authentische Websites und messbares SEO für Heilpraktiker und Therapeuten.',
    introText:
      'Als Heilpraktiker arbeiten Sie sehr nah und persönlich mit Ihren Patienten. Ihre Website muss genau diese Empathie, Kompetenz und den ganzheitlichen Ansatz digital transportieren, um die richtigen Menschen anzusprechen.',
    painPoints: [
      'Schwierigkeit, den Wert der eigenen Methoden digital zu kommunizieren',
      'Starker Wettbewerb in der alternativen Medizin',
      'Fehlendes Wissen über rechtssichere Texte (Heilmittelwerbegesetz)',
      'Unregelmäßiger Patienten-Zulauf',
    ],
    goals: [
      'Authentische, vertrauensvolle digitale Präsenz',
      'Aufklärung und Information der Patienten vor dem ersten Termin',
      'Stetiger Strom an passenden Neupatienten',
      'Lokale Sichtbarkeit in der eigenen Stadt',
    ],
    codaySolution:
      'Wir schaffen eine digitale Wohlfühlatmosphäre. Mit sanften Animationen, authentischer Bildsprache und klaren Therapie-Beschreibungen holen wir Ihre Patienten emotional ab. Durch lokale SEO-Strategien werden Sie genau von den Menschen gefunden, die aktiv nach Ihren Therapiemethoden suchen.',
    roiTimeline: 'Steigerung lokaler Suchanfragen innerhalb von 4-8 Wochen.',
    faqs: [
      {
        question: 'Helfen Sie bei den Inhalten und Texten?',
        answer:
          'Ja, wir strukturieren Ihre Behandlungsangebote verständlich und achten auf vertrauensbildende Formulierungen.',
      },
      {
        question: 'Brauche ich Social Media, oder reicht die Website?',
        answer:
          'Die Website ist das Fundament. Wer Sie auf Social Media findet, wird sich immer auf Ihrer Website ein finales Bild machen. Sie muss überzeugen.',
      },
    ],
  },
  {
    persona: 'Rechtsanwälte',
    slug: 'rechtsanwaelte',
    metaTitle: 'Kanzlei-Webdesign & Mandantengewinnung | Coday',
    metaDescription:
      'Repräsentative Kanzlei-Websites. Gewinnen Sie lukrative Mandate durch digitale Souveränität und gezieltes SEO.',
    introText:
      'Mandanten in Rechtsfragen suchen vor allem eines: Souveränität, Diskretion und Durchsetzungskraft. Ihre Kanzlei-Website muss diese Werte vom ersten Klick an ausstrahlen.',
    painPoints: [
      'Mangelhafte Positionierung gegenüber Großkanzleien',
      'Mandanten-Anfragen passen nicht zur gewünschten Spezialisierung',
      'Veraltete, textlastige Websites schrecken moderne Mandanten ab',
      'Compliance- und Berufsrecht-Bedenken bei der Außendarstellung',
    ],
    goals: [
      'Souveränes, kompetentes und modernes Markenbild',
      'Filterung und Generierung von passenden, lukrativen Mandaten',
      'Sichtbarkeit in den priorisierten Rechtsgebieten (Local SEO)',
      'Sichere, verschlüsselte Kommunikationswege für Erstkontakte',
    ],
    codaySolution:
      "Wir designen Premium-Websites für Kanzleien. Klare Strukturen, überzeugende Profile der Partner und fokussierte Rechtsgebiet-Seiten. Wir optimieren Ihr Kanzlei-SEO exakt auf Suchanfragen wie 'Fachanwalt Arbeitsrecht [Stadt]', um genau die Mandanten anzuziehen, die Ihre Expertise benötigen.",
    roiTimeline: 'Messbarer Anstieg von qualifizierten Mandatsanfragen nach Indexierung.',
    faqs: [
      {
        question: 'Werden berufsrechtliche Vorgaben eingehalten?',
        answer:
          'Wir arbeiten eng mit Ihnen zusammen, um sicherzustellen, dass alle Texte und Darstellungen dem anwaltlichen Berufsrecht entsprechen.',
      },
      {
        question: 'Können Mandanten sicher Dokumente hochladen?',
        answer:
          'Ja, wir können verschlüsselte Upload-Portale oder Anbindungen an Ihre bestehende Kanzleisoftware (z.B. RA-MICRO) integrieren.',
      },
    ],
  },
  {
    persona: 'Steuerberater',
    slug: 'steuerberater',
    metaTitle: 'Digitalisierung & Webdesign für Steuerberater | Coday',
    metaDescription:
      'Fachkräftegewinnung und digitale Mandantenakquise. Die moderne Kanzlei für die Steuerberater von morgen.',
    introText:
      'Die Steuerberatungsbranche ist im Wandel. Wer keine moderne digitale Infrastruktur bietet, verliert heute nicht nur Mandanten, sondern vor allem auch qualifizierte Fachkräfte an die Konkurrenz.',
    painPoints: [
      'Enormer Fachkräftemangel (Steuerfachangestellte, Bilanzbuchhalter)',
      'Zeitaufwändiges Onboarding neuer Mandanten',
      'Die Kanzlei wirkt nach außen verstaubt und analog',
      'Mandanten nutzen die digitalen DATEV-Schnittstellen nicht',
    ],
    goals: [
      'Attraktives Employer Branding zur Mitarbeitergewinnung',
      'Filterung unprofitabler Mandatsanfragen',
      'Digitale Vorreiterrolle in der Region ausstrahlen',
      'Zentrale Anlaufstelle für Mandanten-Logins (DATEV Unternehmen online)',
    ],
    codaySolution:
      'Wir wandeln Ihre Kanzlei-Website in ein Recruiting- und Automatisierungswerkzeug. Mit gezielten Employer-Branding-Seiten ziehen Sie Talente an. Klare Schnittstellen-Verweise (DATEV) erziehen Mandanten zur Digitalisierung, während unser UX-Design Kompetenz und Zukunftsfähigkeit demonstriert.',
    roiTimeline:
      'Sofortige Verbesserung des Kanzlei-Images; beschleunigtes Recruiting je nach Traffic.',
    faqs: [
      {
        question: 'Helfen Sie bei der Erstellung der Stellenanzeigen?',
        answer:
          'Ja, wir gestalten interaktive Karriere-Seiten, die die Benefits Ihrer Kanzlei modern und ansprechend in Szene setzen.',
      },
      {
        question: 'Kann DATEV Unternehmen online eingebunden werden?',
        answer:
          'Wir schaffen klare Login-Portale auf Ihrer Startseite, um Ihren Mandanten den Zugang so einfach wie möglich zu machen.',
      },
    ],
  },
  {
    persona: 'Coaches',
    slug: 'coaches',
    metaTitle: 'Webdesign & Conversion-Funnel für Coaches | Coday',
    metaDescription:
      'Skalieren Sie Ihr Coaching-Business. Automatisierte Lead-Funnel, Personal Branding und Verkaufsseiten, die konvertieren.',
    introText:
      'Als Coach verkaufen Sie Transformation. Ihre Website muss Ihre Persönlichkeit transportieren, Vertrauen aufbauen und aus stillen Mitlesern zahlende Klienten machen.',
    painPoints: [
      'Abhängigkeit von ständiger Content-Produktion (Social Media)',
      'Unklarheit, wie man Premium-Preise digital rechtfertigt',
      'Kalte Interessenten buchen keine Erstgespräche',
      'Technik-Chaos mit verschiedenen Tools (WordPress, Terminbuchung, Digistore)',
    ],
    goals: [
      'Aufbau eines hochkonvertierenden Lead-Funnels',
      'Premium-Positionierung, die hohe Preise rechtfertigt',
      'Automatisierte Buchungen für Discovery-Calls',
      'Klare, fokussierte User Experience ohne Ablenkungen',
    ],
    codaySolution:
      'Wir konsolidieren Ihr Technik-Chaos in eine nahtlose Premium-Plattform. Wir designen Verkaufsseiten (Sales Pages), die psychologisch optimiert sind, binden Ihre Kalender und Payment-Provider ein und schaffen eine digitale Präsenz, die exakt so wirkungsvoll ist wie Ihr Coaching selbst.',
    roiTimeline: 'Messbare Steigerung der Discovery-Call-Buchungsrate sofort nach Launch.',
    faqs: [
      {
        question: 'Bauen Sie auch Mitgliederbereiche für Online-Kurse?',
        answer:
          'Ja, wir können exklusive Memberships anbinden oder Custom-Dashboards für Ihre Coachees entwickeln.',
      },
      {
        question: 'Wie generiere ich Traffic auf die neue Seite?',
        answer:
          'Die Seite ist perfekt für SEO und Performance Marketing (Ads) optimiert. Traffic wird durch die hohe Ladegeschwindigkeit effizient verwertet.',
      },
    ],
  },

  // BATCH 3: Lokal & Handel
  {
    persona: 'Handwerker',
    slug: 'handwerker',
    metaTitle: 'Handwerk-Webdesign & Digitalisierung | Coday',
    metaDescription:
      'Die Handwerk-Dominanz OS: Automatisierte Kundenanfragen, Top Google Rankings und Employer Branding für Handwerksbetriebe.',
    introText:
      'Die Auftragsbücher sind vielleicht voll, aber bekommen Sie auch die lukrativen Aufträge? Und finden Sie noch gutes Personal? Eine starke digitale Präsenz sichert die Zukunft Ihres Handwerksbetriebs.',
    painPoints: [
      'Schlechte Auffindbarkeit bei Google in der eigenen Region',
      'Bewerbermangel bei Fachkräften und Azubis',
      'Zeitraubende telefonische Beratung für unqualifizierte Anfragen',
      'Unmoderne Website, die das handwerkliche Können nicht zeigt',
    ],
    goals: [
      'Dominanz in den lokalen Suchergebnissen (Local SEO)',
      'Digitale Vorqualifizierung von lukrativen Aufträgen',
      'Moderne Karriere-Seiten zur Mitarbeitergewinnung',
      'Professionelle Präsentation von Referenzprojekten',
    ],
    codaySolution:
      "Mit unserer 'Handwerk-Dominanz OS' bauen wir Betriebe digital neu auf. Eine rasante Website, die auf Handys perfekt funktioniert, fängt lokale Suchanfragen ab. Intelligente Kontaktformulare filtern Kleinkram heraus. Vor allem: Wir machen Ihren Betrieb als modernen Arbeitgeber sichtbar.",
    roiTimeline: 'Steigerung der Sichtbarkeit in der Region (Local Pack) nach 4-6 Wochen.',
    faqs: [
      {
        question: 'Brauchen wir professionelle Fotos?',
        answer:
          'Ja, Bilder Ihrer echten Arbeit und Ihres Teams sind essenziell. Wir können auf Wunsch Fotografen aus unserem Netzwerk vermitteln.',
      },
      {
        question: 'Wir haben keine Zeit für die Pflege der Seite. Übernehmen Sie das?',
        answer:
          'Absolut. Wir bieten Full-Service-Betreuung, damit Sie sich aufs Handwerk konzentrieren können.',
      },
    ],
  },
  {
    persona: 'Restaurantbesitzer',
    slug: 'restaurantbesitzer',
    metaTitle: 'Webdesign & Digitales Marketing für Gastronomie | Coday',
    metaDescription:
      'Mehr Reservierungen, besseres Local-SEO und ansprechende digitale Speisekarten für Restaurants, Cafés und Bars.',
    introText:
      'Das Auge isst mit – auch online. Bevor ein Gast Ihr Restaurant betritt, besucht er Ihre Website. Wenn diese veraltet ist oder auf dem Smartphone nicht funktioniert, gehen Ihnen täglich Tische verloren.',
    painPoints: [
      'Speisekarten sind nur als schlecht lesbare PDFs verfügbar',
      'Fehlende oder umständliche Online-Tischreservierung',
      'Abhängigkeit von teuren Lieferportalen',
      'Konkurrenten stehen bei Google Maps weiter oben',
    ],
    goals: [
      'Appetitanregendes, visuell beeindruckendes Webdesign',
      'Digitale, leicht pflegbare und responsive Speisekarte',
      'Direkte Integration von Reservierungssystemen (OpenTable, Quandoo)',
      "Maximale Auffindbarkeit bei Suchanfragen wie 'Restaurant in der Nähe'",
    ],
    codaySolution:
      'Wir kreieren digitale Erlebnisse, die Hunger machen. Eine blitzschnelle, mobile-first Website mit perfekt integrierten Speisekarten (keine PDFs!) und direkten Reservierungs-Widgets. Gepaart mit Google Business Optimierung machen wir Ihr Lokal zum Platzhirsch in Ihrer Stadt.',
    roiTimeline: 'Erhöhte Auslastung durch nahtlose Reservierungsmöglichkeiten vom ersten Tag an.',
    faqs: [
      {
        question: 'Wie aktualisiere ich die Speisekarte?',
        answer:
          'Sie erhalten Zugang zu einem intuitiven Dashboard. Tagesgerichte oder Preise ändern Sie in Sekunden vom Smartphone aus.',
      },
      {
        question: 'Bieten Sie auch Lösungen für Lieferdienste?',
        answer:
          'Ja, wir können Click & Collect oder eigene Liefersysteme integrieren, um Provisionen an Drittanbieter zu sparen.',
      },
    ],
  },
  {
    persona: 'E-Commerce Händler',
    slug: 'e-commerce-haendler',
    metaTitle: 'Headless E-Commerce & Shop-Optimierung | Coday',
    metaDescription:
      'Skalierbare Shopify & Headless E-Commerce Lösungen. Mehr Speed, bessere UX und maximale Conversion-Rates für Online-Shops.',
    introText:
      'Im E-Commerce zählt jede Millisekunde Ladezeit und jeder überflüssige Klick im Checkout. Wenn Ihr Shop nicht auf Conversion getrimmt ist, verbrennen Sie täglich bares Geld.',
    painPoints: [
      'Shop lädt zu langsam (hohe Absprungraten auf Mobile)',
      'Standard-Themes stoßen an ihre Grenzen',
      'Schlechtes Ranking von Produkt- und Kategorienseiten',
      'Ungenaues Tracking führt zu falschen Marketing-Entscheidungen',
    ],
    goals: [
      'Sub-Second Ladezeiten durch moderne Architektur',
      'Individuelle, markenkonforme User Experience (UI/UX)',
      'Technische SEO-Dominanz für das gesamte Produktsortiment',
      'Server-Side Tracking für präzise ROAS-Messung',
    ],
    codaySolution:
      'Wir heben Ihr E-Commerce aufs Enterprise-Level. Ob tiefgehende Shopify-Theme-Optimierung oder ein komplett entkoppeltes Headless Commerce Setup (Next.js + Shopify Plus). Wir beseitigen Ladezeiten-Flaschenhälse, optimieren den Funnel und setzen das technische SEO auf, das Ihre Kategorien an die Google-Spitze treibt.',
    roiTimeline: 'Messbarer Umsatz-Uplift durch bessere CVR und Ladezeiten nach Launch.',
    faqs: [
      {
        question: 'Ist Headless E-Commerce das Richtige für mich?',
        answer:
          'Headless lohnt sich bei hohem Traffic, wenn extreme Performance und absolute Design-Freiheit gefordert sind. Wir beraten Sie objektiv.',
      },
      {
        question: 'Können Sie bestehende Shops migrieren?',
        answer:
          'Ja, wir begleiten reibungslose Migrationen (z.B. WooCommerce zu Shopify oder Headless) ohne Ranking-Verluste.',
      },
    ],
  },
  {
    persona: 'Immobilienmakler',
    slug: 'immobilienmakler',
    metaTitle: 'Webdesign für Immobilienmakler & Objektvermarktung | Coday',
    metaDescription:
      'Generieren Sie Verkäufer-Leads und vermarkten Sie Objekte exklusiv. Webdesign für die moderne Immobilienbranche.',
    introText:
      'Der Immobilienmarkt ist hart umkämpft. Um Alleinaufträge zu gewinnen, müssen Sie Verkäufern beweisen, dass Sie Immobilien moderner, hochwertiger und schneller vermarkten als die Konkurrenz.',
    painPoints: [
      'Zu wenig Anfragen von potenziellen Verkäufern (Objektakquise)',
      'Website wirkt wie ein Standard-Template von Immobilien-Portalen',
      'Schnittstellen zu Makler-Software (FlowFact, onOffice) fehlen',
      'Hohe Abhängigkeit von ImmoScout & Co.',
    ],
    goals: [
      'Leadgenerierung für Immobilienbewertungen und Verkäufe',
      'Nahtlose Integration der eigenen Objekte via API',
      'Hochwertige Darstellung der Exposés zur Stärkung der Marke',
      'Lokale Autorität als Marktkenner der Region',
    ],
    codaySolution:
      'Wir bauen Plattformen, die Vertrauen schaffen. Integrierte Lead-Funnel (Online-Immobilienbewertung) generieren Verkäufer-Kontakte. Über direkte API-Anbindungen (z.B. onOffice) synchronisieren sich Ihre Objekte automatisch auf eine Website, die exklusiv und hochprofessionell wirkt – Ihr bestes Argument im Akquise-Gespräch.',
    roiTimeline: 'Steigerung der Immobilienbewertungs-Leads kontinuierlich nach SEO-Indexierung.',
    faqs: [
      {
        question: 'Werden unsere Objekte automatisch auf der Website angezeigt?',
        answer:
          'Ja, wir nutzen die APIs Ihrer Maklersoftware, sodass Sie Objekte wie gewohnt pflegen und sie in Echtzeit auf der Website erscheinen.',
      },
      {
        question: 'Helfen Sie auch bei der Lead-Generierung?',
        answer:
          'Wir bauen interaktive Wertermittlungs-Rechner und Formulare, die speziell darauf ausgelegt sind, Verkäufer-Leads zu sammeln.',
      },
    ],
  },
  {
    persona: 'Vereine',
    slug: 'vereine',
    metaTitle: 'Webdesign & Digitalisierung für Vereine & Verbände | Coday',
    metaDescription:
      'Mitgliedergewinnung, Spenden-Tools und modernes Management. Websites, die Vereine zukunftsfähig machen.',
    introText:
      'Ob Sportverein, Verband oder NGO: Um neue Mitglieder zu gewinnen und Sponsoren zu überzeugen, braucht Ihr Verein heute mehr als eine unübersichtliche Website aus den 2000ern.',
    painPoints: [
      'Schwierige Pflege der Website durch Ehrenamtliche',
      'Komplizierte, analoge Prozesse bei der Mitgliederanmeldung',
      'Veraltetes Erscheinungsbild schreckt junge Zielgruppen ab',
      'Mangelnde Integration von News, Spielplänen oder Spenden-Tools',
    ],
    goals: [
      'Modernes, dynamisches Image zur Nachwuchsgewinnung',
      'Einfaches CMS, das jeder im Vorstand bedienen kann',
      'Digitale Mitgliederanträge und reibungslose Spenden-Prozesse',
      'Strukturierte Präsentation von Teams, Abteilungen und News',
    ],
    codaySolution:
      'Wir bringen Vereine in die Neuzeit. Ein klares Design, das Emotionen weckt, gepaart mit einem narrensicheren Headless CMS, mit dem Vorstandsmitglieder oder Trainer News in Sekunden publizieren können. Digitale Formulare reduzieren den Papierkram im Büro drastisch.',
    roiTimeline:
      'Reduzierung des Verwaltungsaufwands sofort; Steigerung der Online-Anmeldungen zeitnah.',
    faqs: [
      {
        question: 'Ist das System leicht für Laien zu bedienen?',
        answer:
          'Ja, wir richten das CMS so ein, dass man keine Vorkenntnisse benötigt. Texte und Bilder lassen sich intuitiv anpassen.',
      },
      {
        question: 'Können wir Spendenformulare einbinden?',
        answer:
          'Absolut. Wir binden sichere Zahlungsdienstleister ein, um einmalige oder wiederkehrende Spenden digital abzuwickeln.',
      },
    ],
  },
];

export function getAiPersonaBySlug(slug: string): AiPersonaData | undefined {
  return aiPersonas.find((p) => p.slug === slug);
}
