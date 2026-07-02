import { BlogPost } from '@/features/blog/model/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 101,
    title: 'Warum eine Facebook-Seite 2024 nicht mehr reicht',
    slug: 'warum-facebook-seite-nicht-reicht',
    excerpt:
      'Verlassen Sie sich nicht nur auf Social Media. Warum eine eigene Webseite Ihr wichtigstes Verkaufsargument ist und wie sie Ihnen unabhängig von Algorithmen Kunden bringt.',
    category: 'Webdesign',
    readTime: '5 Min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Social Media vs Eigene Webseite',
    author: 'Umur Eyigün',
    date: '10. Oktober 2024',
    content: [
      {
        id: 'intro',
        type: 'text',
        heading: 'Social Media gehört nicht Ihnen',
        level: 'h2',
        content:
          'Viele Unternehmen in Wetzlar denken: "Ich habe eine Facebook-Seite, das reicht." Das Problem? Sie mieten nur Land auf einer fremden Plattform. Wenn Facebook morgen die Regeln ändert, verliert Ihr Betrieb seine Sichtbarkeit.',
      },
      {
        id: 'solution',
        type: 'text',
        heading: 'Ihre Webseite ist Ihr digitales Eigentum',
        level: 'h2',
        content:
          'Ihre Webseite gehört 100% Ihnen. Keine Ablenkung durch Konkurrenz-Werbung, keine Algorithmus-Änderungen. Sie entscheiden, was Ihre Kunden sehen. Eine professionelle Webseite baut Vertrauen auf – eine reine Facebook-Seite wirkt oft unprofessionell.',
      },
    ],
  },
  {
    id: 102,
    title: 'Webseite für Handwerker: 5 Fehler, die Sie Kunden kosten',
    slug: 'webseite-handwerker-fehler',
    excerpt:
      'Warum viele Handwerker-Webseiten kein Geld einbringen und wie Sie die häufigsten Fehler beim Webdesign vermeiden.',
    category: 'Handwerk',
    readTime: '6 Min.',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'Handwerker Webseite Fehler',
    author: 'Umur Eyigün',
    date: '15. Oktober 2024',
    content: [
      {
        id: 'intro',
        type: 'text',
        heading: 'Häufigste Fehler',
        level: 'h2',
        content:
          'Die meisten Handwerker-Webseiten in Mittelhessen sind leider veraltet. Fehler Nummer 1: Sie funktionieren nicht richtig auf dem Handy. Über 70% der Kunden suchen heute über das Smartphone nach einem Elektriker oder Dachdecker. Wenn die Seite auf dem Handy kaputt aussieht, ist der Kunde sofort weg.',
      },
      {
        id: 'contact',
        type: 'text',
        heading: 'Fehlende Kontaktmöglichkeiten',
        level: 'h2',
        content:
          'Fehler Nummer 2: Die Telefonnummer ist schwer zu finden. Ihre Telefonnummer muss immer sichtbar und auf dem Smartphone klickbar sein!',
      },
    ],
  },
  {
    id: 103,
    title: 'Was kostet eine professionelle Firmenwebseite wirklich?',
    slug: 'was-kostet-eine-firmenwebseite',
    excerpt:
      'Transparenz statt versteckter Kosten. Erfahren Sie genau, woraus sich die Preise für eine moderne Webseite zusammensetzen und worauf Sie achten müssen.',
    category: 'Kosten',
    readTime: '7 Min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'Kosten für Firmenwebseite',
    author: 'Umur Eyigün',
    date: '20. Oktober 2024',
    content: [
      {
        id: 'intro',
        type: 'text',
        heading: 'Die Wahrheit über Webdesign-Preise',
        level: 'h2',
        content:
          'Ein Baukasten kostet nur 15€ im Monat – aber er kostet Sie Kunden. Eine echte, schnelle Firmenwebseite vom Experten kostet in der Regel zwischen 900€ und 2.500€ einmalig. Warum dieser Unterschied?',
      },
      {
        id: 'details',
        type: 'text',
        heading: 'Qualität hat ihren Preis',
        level: 'h2',
        content:
          'Sie bezahlen für maßgeschneiderte Programmierung, schnelle Ladezeiten, Suchmaschinenoptimierung (SEO) und echtes Handwerk. Eine günstige Webseite, die nicht bei Google gefunden wird, ist teurer als eine professionelle Seite, die Ihnen monatlich neue Kunden bringt.',
      },
    ],
  },
  {
    id: 10,
    title: 'Core Web Vitals 2026: Warum langsame Ladezeiten Millionen kosten',
    slug: 'high-performance-web-vitals',
    excerpt:
      'Jede Sekunde Ladezeit kostet Sie signifikant Conversion. Lernen Sie, wie Sie LCP, CLS und INP sofort optimieren und Ihr Google-Ranking dominieren.',
    category: 'Web Performance',
    readTime: '10 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'High Speed Performance Dashboard',
    author: 'Coday Engineering',
    date: '22. Mai 2026',
    content: [
      {
        id: 'intro',
        type: 'text',
        heading: 'Schnelligkeit ist keine Option, sondern eine Pflicht',
        level: 'h2',
        content:
          'Das Internet hat unsere Geduld getötet. Die Toleranzgrenze für das Laden einer Website liegt heute bei unter 2,5 Sekunden. Alles darüber existiert für den durchschnittlichen Nutzer nicht.\n\nAmazon hat es vorgemacht: 100ms Ladeverzögerung kosten 1% Umsatz. Das klingt wenig, aber rechnen wir das mal auf Ihr Geschäft hoch.',
      },
      {
        id: 'interactive-calculator',
        type: 'interactive',
        component: 'latency-calculator',
        data: {},
      },
      {
        id: 'analysis-calc',
        type: 'text',
        heading: 'Die Core Web Vitals erklärt',
        level: 'h2',
        content:
          "Google misst die Qualität Ihrer Website nicht nach 'Gefühl', sondern nach harten Metriken. Diese drei Werte entscheiden über Ihr Ranking:",
      },
      {
        id: 'accordion-vitals',
        type: 'accordion',
        items: [
          {
            title: 'LCP (Largest Contentful Paint)',
            content:
              '**Messung:** Wie lange dauert es, bis das *größte* Element (meist Bild oder Headline) sichtbar ist.\n**Ziel:** Unter 2,5 Sekunden.\n**Optimierung:** Bilder komprimieren (WebP), Server in der Nähe des Nutzers (CDN), Caching.',
          },
          {
            title: 'CLS (Cumulative Layout Shift)',
            content:
              '**Messung:** Wie sehr springt das Layout während des Ladens herum?\n**Ziel:** Unter 0,1.\n**Optimierung:** Bilder und Ads brauchen feste Größenangaben (width/height). Keine Inhalte dynamisch nachladen, die den Text verschieben.',
          },
          {
            title: 'INP (Interaction to Next Paint)',
            content:
              '**Messung:** Wie schnell reagiert die Seite auf Klick oder Tastatur?\n**Ziel:** Unter 200ms.\n**Optimierung:** Weniger JavaScript. Den Main-Thread nicht blockieren.',
          },
        ],
      },
      {
        id: 'checklist-optimization',
        type: 'checklist',
        title: 'Performance Checklist für Entwickler',
        items: [
          { text: 'Bilder in WebP/AVIF konvertiert', checked: true },
          { text: 'Lazy Loading für Bilder unterhalb des Folds', checked: true },
          { text: 'CSS/JS minifiziert und komprimiert (Brotli/Gzip)', checked: true },
          { text: 'CDN (Cloudflare/Vercel) aktiv', checked: true },
          { text: 'Preloading für wichtige Fonts', checked: true },
        ],
      },
      {
        id: 'outro',
        type: 'cta',
        title: 'Ist Ihre Website zu langsam?',
        description:
          'Wir machen den Speed-Check. Kostenlos und unverbindlich. Wir finden die Bremsklötze.',
        buttonText: 'Performance-Audit starten',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 8,
    title: 'Die 5 tödlichen Webdesign-Fehler, die Ihre Conversion zerstören',
    slug: 'die-5-groessten-fehler-im-webdesign',
    excerpt:
      '90% aller B2B-Websites verbrennen täglich Budget. Erfahren Sie die psychologischen und technischen Gründe, warum Besucher abspringen – und wie Sie das sofort ändern.',
    category: 'Webdesign',
    readTime: '12 Min.',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'Website Builder Interface mit Drag & Drop Elementen',
    author: 'Coday Expert Team',
    date: '14. März 2026',
    content: [
      {
        id: 'intro-1',
        type: 'text',
        heading: "Die Illusion der 'schönen' Website",
        level: 'h2',
        content:
          "Stellen Sie sich vor, Sie bauen ein Haus. Sie investieren in italienischen Marmor, goldene Wasserhähne und handgeschnitzte Türen. Aber Sie vergessen das Fundament. Beim ersten Sturm stürzt alles zusammen.\n\nGenau das passiert täglich im Webdesign. Unternehmen geben tausende Euro für 'hübsche' Designs aus, ignorieren aber die fundamentalen Gesetze der Nutzerpsychologie und technischen Performance. Das Resultat? Eine digitale Visitenkarte, die niemand findet und die niemanden überzeugt.",
      },
      {
        id: 'quote-1',
        type: 'quote',
        text: 'Design ist nicht nur, wie es aussieht und sich anfühlt. Design ist, wie es funktioniert.',
        author: 'Steve Jobs',
        variant: 'gradient',
      },
      {
        id: 'mistake-1',
        type: 'text',
        heading: "Fehler #1: Die 'Desktop-First' Lüge",
        level: 'h2',
        content:
          "Es ist 2026. Wahrscheinlich lesen Sie diesen Artikel gerade auf Ihrem Smartphone. Trotzdem werden 80% aller Design-Entwürfe immer noch auf großen 27-Zoll Monitoren präsentiert und abgenommen.\n\nDas Problem nennen wir die 'Daumen-Zone-Ignoranz'. Auf dem Desktop klicken wir mit der Maus präzise auf kleine Links. Auf dem Handy navigieren wir mit dem Daumen. Was auf dem Desktop elegant aussieht, ist mobil oft unbedienbar.",
      },
      {
        id: 'interactive-1',
        type: 'interactive',
        component: 'mobile-simulator',
        data: {},
      },
      {
        id: 'text-mobile-analysis',
        type: 'text',
        content:
          "Testen Sie es selbst im Simulator oben. 'Schlechtes Design' zwingt den Nutzer zu unnatürlichen Bewegungen oder versteckt die CTA (Call to Action) außerhalb der Reichweite.\n\n**Unsere Regel:** Wenn der wichtigste Button nicht bequem mit dem Daumen erreichbar ist, ist das Design defekt. Wir optimieren konsequent 'Mobile Only' – nicht nur 'First'.",
      },
      {
        id: 'mistake-2',
        type: 'text',
        heading: "Fehler #2: Das 'Ladezeit-Roulette'",
        level: 'h2',
        content:
          'Wussten Sie, dass Amazon herausgefunden hat, dass 100ms Ladeverzögerung 1% Umsatz kosten? Übertragen auf ein KMU bedeutet das: Eine langsame Seite verbrennt Ihr Marketing-Budget bevor der Kunde überhaupt Ihre Headline gelesen hat.',
      },
      {
        id: 'interactive-2',
        type: 'interactive',
        component: 'speed-test',
        data: {},
      },
      {
        id: 'mistake-2-detail',
        type: 'text',
        heading: 'Warum WordPress hier versagt',
        level: 'h3',
        content:
          "Baukästen wie WordPress oder Wix laden oft 50-100 Skripte, die Sie gar nicht brauchen. Ein 'Slider-Plugin' lädt CSS für 20 verschiedene Slider-Typen, auch wenn Sie nur einen nutzen.\n\nBei Coday setzen wir auf **React (React Router v7 / Next.js) und Server-Side-Rendering**. Der Unterschied ist nicht nur messbar (siehe oben), er ist fühlbar. Kunden warten nicht. Seien Sie schnell oder seien Sie irrelevant.",
      },
      {
        id: 'checklist-performance',
        type: 'checklist',
        title: 'Der 1-Sekunden-Audit',
        items: [
          { text: 'Bilder im WebP/AVIF Format (nicht PNG/JPG)', checked: true },
          { text: 'Kein Cumulative Layout Shift (CLS) beim Laden', checked: true },
          { text: 'Font-Display: Swap aktiviert', checked: true },
          { text: 'JavaScript Bundle Size unter 100kb', checked: false },
          { text: 'Server in Frankfurt (nicht USA)', checked: true },
        ],
      },
      {
        id: 'mistake-3',
        type: 'text',
        heading: "Fehler #3: Das 'Wir-zentrierte' Texten",
        level: 'h2',
        content:
          "'Wir sind Marktführer', 'Wir haben Tradition', 'Wir bieten Qualität'. Gähn. \n\nIhr Kunde interessiert sich nicht für Sie. Er interessiert sich nur für sich selbst und sein Problem. Wenn Ihre Website nur von IHNEN spricht, klicken die Leute weg. Sie müssen die Heldenreise des KUNDEN erzählen.",
      },
      {
        id: 'comparison-copy',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Ego-Text (Falsch)',
            points: [
              'Wir sind seit 20 Jahren im Geschäft.',
              'Wir bieten tolle Websites an.',
              'Unsere Qualität ist die beste.',
              'Kontaktieren Sie uns für ein Angebot.',
            ],
          },
          {
            title: 'Kunden-Text (Richtig)',
            points: [
              'Gewinnen Sie Zeit für Ihr Kerngeschäft.',
              'Verwandeln Sie Besucher in zahlende Kunden.',
              'Sichern Sie sich Ihren Wettbewerbsvorteil.',
              'Starten Sie jetzt Ihre Wachstums-Offensive.',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'mistake-4',
        type: 'text',
        heading: 'Fehler #4: Farb-Psychologie Lotto',
        level: 'h2',
        content:
          "Farben sind keine Deko. Farben sind Signale. Ein roter Button signalisiert Gefahr (Stopp) oder Dringlichkeit (Jetzt kaufen). Ein blauer Button signalisiert Vertrauen (Banken, Versicherungen). Wer Farben nur nach 'Geschmack' wählt, verschenkt Conversions.",
      },
      {
        id: 'interactive-colors',
        type: 'interactive',
        component: 'color-picker',
        data: {},
      },
      {
        id: 'mistake-5',
        type: 'text',
        heading: "Fehler #5: Die 'Sackgasse'",
        level: 'h2',
        content:
          'Jede Seite Ihrer Website muss ein Ziel haben. Wenn ein Nutzer einen Artikel zu Ende gelesen hat, was soll er tun? \n\nZu viele Websites lassen den Nutzer am Ende einer Seite einfach stehen. Das ist eine Sackgasse. Führen Sie den Nutzer immer weiter: Zum nächsten Artikel, zum Newsletter, oder zum Erstgespräch.',
      },
      {
        id: 'cta-final',
        type: 'cta',
        title: 'Schluss mit Rate-Mal-Webdesign',
        description:
          'Wir analysieren Ihre aktuelle Seite kostenlos und zeigen Ihnen genau, wo Sie Geld verlieren.',
        buttonText: 'Kostenlosen Audit buchen',
        href: '/contact',
        variant: 'glass',
      },
      {
        id: 'outro',
        type: 'text',
        heading: 'Fazit',
        level: 'h2',
        content:
          'Exzellentes Webdesign ist keine Kunst, es ist eine Wissenschaft. Es erfordert Disziplin, Daten und technisches Verständnis. Wenn Sie diese 5 Fehler vermeiden, gehören Sie bereits zu den Top 10% Ihrer Branche.\n\nWollen Sie zu den Top 1% gehören? Dann lassen Sie uns sprechen.',
      },
    ],
  },
  {
    id: 9,
    title: "Anti-AI Manifest: Warum 'KI-perfektes' Webdesign 2026 scheitert",
    slug: 'anti-ai-manifest',
    excerpt:
      'KI-Tools fluten den Markt mit seelenlosen Layouts. Entdecken Sie, warum digitale Authentizität und echtes Handwerk der neue Premium-Standard für Elite-Marken sind.',
    category: 'Design Philosophy',
    readTime: '8 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Brutalistisches Webdesign mit Neon-Akzenten',
    author: 'Coday Design Team',
    date: '15. Mai 2026',
    content: [
      {
        id: 'intro',
        type: 'text',
        heading: 'Die Rache des Analogen',
        level: 'h2',
        content:
          "Wir leben in einer Ära der synthetischen Perfektion. Midjourney malt Bilder ohne Pinselstrich. ChatGPT schreibt Texte ohne Ecken und Kanten. Web-Baukästen spucken Layouts aus, die alle gleich aussehen.\\n\\nDoch etwas Interessantes passiert: Je mehr 'perfekten' AI-Content wir sehen, desto weniger vertrauen wir ihm. Unser Gehirn hat gelernt, den 'AI-Glanz' als billig und generisch zu filtern. Wahre Premium-Marken gehen jetzt den entgegengesetzten Weg.",
      },
      {
        id: 'interactive-blind-test',
        type: 'interactive',
        component: 'blind-test',
        data: {},
      },
      {
        id: 'analysis-blind-test',
        type: 'text',
        heading: "Warum das 'hässlichere' Design gewinnt",
        level: 'h2',
        content:
          "Haben Sie oben abgestimmt? Die meisten Nutzer wählen das Design, das Ecken und Kanten hat. Warum? Weil es *menschlich* wirkt.\\n\\n**Das Uncanny Valley des Webdesigns:**\\nWenn eine Website zu glatt, zu symmetrisch und zu 'stock-foto-lastig' ist, schrillt unser innerer Alarm. 'Hier versucht mir jemand etwas zu verkaufen, ohne Arbeit zu investieren.'\\n\\nLuxus definiert sich heute über das Handwerkliche. Über den bewussten Bruch mit der Norm. Wir nennen das **'Anti-AI Aesthetics'**.",
      },
      {
        id: 'quote-luxury',
        type: 'quote',
        text: 'In einer Welt voll von KI-Perfektion ist der menschliche Fehler das ultimative Statussymbol.',
        author: 'Design Trend Report 2026',
        variant: 'large',
      },
      {
        id: 'checklist-anti-ai',
        type: 'checklist',
        title: 'Die 5 Säulen der Anti-AI Ästhetik',
        items: [
          { text: 'Brutalismus: Rohe Strukturen statt versteckter Raster', checked: true },
          { text: 'Typografie: Custom Fonts statt Google Fonts Standard', checked: true },
          { text: 'Motion: Physikalisch korrekte Animationen statt linearer Fades', checked: true },
          { text: 'Textur: Noise & Grain statt flacher Vektoren', checked: true },
          { text: 'Copywriting: Meinung & Haltung statt ChatGPT-Bla-Bla', checked: true },
        ],
      },
      {
        id: 'outro',
        type: 'cta',
        title: 'Zeigen Sie Charakter',
        description:
          'Ihre Marke ist einzigartig. Warum sollte Ihre Website aussehen wie die von allen anderen? Wir designen Unikate.',
        buttonText: 'Design-Sprint anfragen',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 2,
    title: 'Business Intelligence: Warum Bauchgefühl Ihr Marketing-Budget verbrennt',
    slug: 'daten-luegen-nicht-business-intelligence',
    excerpt:
      '99% der Werbebudgets fließen ins Leere. Lernen Sie, wie datengetriebenes BI-Marketing jeden Klick transparent macht und Ihren ROI drastisch skaliert.',
    category: 'Analytics',
    readTime: '15 Min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'Business Intelligence Dashboard mit Echtzeit-Daten',
    author: 'Coday Analytics Team',
    date: '10. März 2026',
    content: [
      {
        id: 'intro-bi',
        type: 'text',
        heading: "Das Ende vom 'Rate-Mal-Marketing'",
        level: 'h2',
        content:
          "Henry Ford sagte einmal: 'Ich weiß, dass die Hälfte meiner Werbung hinausgeworfenes Geld ist. Ich weiß nur nicht, welche Hälfte.' \n\nDas war 1920. Heute, im Jahr 2026, ist diese Aussage keine charmante Anekdote mehr – sie ist eine Bankrotterklärung. In einer Welt, in der jeder Klick, jeder Scroll und jede Sekunde Aufmerksamkeit messbar ist, ist Unwissenheit eine Entscheidung.\n\nDie meisten Unternehmen (auch große Konzerne) treffen Entscheidungen immer noch nach dem HiPPO-Prinzip: **Hi**ghest **P**aid **P**erson's **O**pinion. Der Chef 'fühlt', dass LinkedIn besser funktioniert als TikTok. Der Marketing-Manager 'glaubt', dass die neue Landingpage schöner ist. \n\nDaten interessieren sich nicht für Gefühle. Und genau deshalb sind sie so mächtig.",
      },
      {
        id: 'quote-bi',
        type: 'quote',
        text: 'Ohne Daten sind Sie nur eine weitere Person mit einer Meinung.',
        author: 'W. Edwards Deming',
        variant: 'large',
      },
      {
        id: 'chapter-maturity',
        type: 'text',
        heading: 'Wo stehen Sie wirklich?',
        level: 'h2',
        content:
          "Bevor wir tief in die Technik einsteigen, müssen wir ehrlich sein. Die meisten Unternehmen überschätzen ihre Daten-Kompetenz massiv. Sie haben Google Analytics installiert und denken, sie wären 'Data Driven'. Das ist so, als würden Sie ein Fieberthermometer besitzen und denken, Sie wären Arzt.\n\nMachen Sie jetzt den ehrlichen Selbst-Check. Wo stehen Sie auf der Evolutionsleiter der Business Intelligence?",
      },
      {
        id: 'interactive-assessment',
        type: 'interactive',
        component: 'data-maturity',
        data: {},
      },
      {
        id: 'chapter-dimensions',
        type: 'text',
        heading: 'Die 4 Dimensionen der Daten-Reife',
        level: 'h2',
        content:
          'Business Intelligence ist keine Software, die man kauft. Es ist ein Prozess. Ein Reifegrad-Modell. Die meisten Unternehmen stecken in Stufe 1 oder 2 fest. Die Marktführer operieren in Stufe 4.',
      },
      {
        id: 'accordion-dimensions',
        type: 'accordion',
        items: [
          {
            title: 'Stufe 1: Deskriptive Analyse (Der Rückspiegel)',
            content:
              '**Die Frage:** Was ist passiert?\n**Das Tool:** Standard Google Analytics / Excel.\n**Der Wert:** Gering.\n\nDies ist der Blick in den Rückspiegel. Sie sehen, dass der Umsatz letzten Monat um 10% gefallen ist. Aber Sie wissen nicht warum. Sie können nur reagieren, nicht agieren.',
          },
          {
            title: 'Stufe 2: Diagnostische Analyse (Der Mechaniker)',
            content:
              '**Die Frage:** Warum ist es passiert?\n**Das Tool:** Drill-Down Reports / Segmentierung.\n**Der Wert:** Mittel.\n\nSie erkennen Zusammenhänge. Der Umsatz ist gefallen, WEIL der Traffic von Facebook eingebrochen ist. Jetzt haben Sie eine Diagnose, aber noch keine Lösung.',
          },
          {
            title: 'Stufe 3: Prädiktive Analyse (Das Wetterradar)',
            content:
              "**Die Frage:** Was wird passieren?\n**Das Tool:** Machine Learning / Trends.\n**Der Wert:** Hoch.\n\nHier beginnt der Wettbewerbsvorteil. Basierend auf historischen Daten berechnen Algorithmen die Wahrscheinlichkeit zukünftiger Ereignisse. 'Wenn wir das Budget nicht erhöhen, werden wir das Q2-Ziel zu 85% verfehlen.' Sie können steuern, bevor der Unfall passiert.",
          },
          {
            title: 'Stufe 4: Preskriptive Analyse (Der Autopilot)',
            content:
              "**Die Frage:** Was müssen wir tun?\n**Das Tool:** AI-Automation / Dynamic Bidding.\n**Der Wert:** Exorbitant.\n\nDas System erkennt das Problem UND führt die Lösung aus. 'Der ROAS auf Meta sinkt -> Budget automatisch auf Google Ads umschichten, wo der CPA gerade günstiger ist'. Das System optimiert sich selbst in Echtzeit.",
          },
        ],
      },
      {
        id: 'chapter-compound',
        type: 'text',
        heading: 'Der Compound-Effect im Marketing',
        level: 'h2',
        content:
          'Warum ist Stufe 4 so wichtig? Wegen des Zinseszins-Effekts. Wer manuell optimiert (Stufe 1-2), ist langsam. Wer automatisiert optimiert (Stufe 4), wird jeden Tag ein kleines bisschen besser.\n\n1% Verbesserung pro Tag bedeutet nach einem Jahr eine 37-fache Steigerung. Sehen Sie sich den Unterschied an:',
      },
      {
        id: 'interactive-seo-graph',
        type: 'interactive',
        component: 'seo-graph',
        data: {}, // Uses SEO graph visual but conceptually applies to 'Growth' vs 'Linear'
      },
      {
        id: 'text-analysis-graph',
        type: 'text',
        content:
          'Die grüne Kurve ist das Ergebnis von Feedback-Loops. Jeder ausgegebene Euro generiert Daten. Diese Daten verbessern den Algorithmus. Der verbesserte Algorithmus macht den nächsten Euro effizienter. Es ist ein Schwungrad (Flywheel), das, einmal in Gang gesetzt, kaum zu stoppen ist.',
      },
      {
        id: 'chapter-tech',
        type: 'text',
        heading: 'Das technische Fundament (Modern Data Stack)',
        level: 'h2',
        content:
          "Wie baut man das? Nicht mit Excel. Ein moderner Data Stack für 2026 sieht so aus:\n\n1. **Collection Layer:** Server-Side GTM (Google Tag Manager). Cookies sterben aus. Wir müssen Daten serverseitig sammeln, um Ad-Blocker und ITP (Safari) zu umgehen.\n2. **Storage Layer:** Ein Data Warehouse (z.B. BigQuery oder Snowflake). Hier fließen ALLE Daten zusammen: Website, CRM, Ad-Plattformen, Finanz-Tools.\n3. **Transformation Layer:** Tools wie dbt reinigen und verknüpfen die Daten.\n4. **Visualization Layer:** Looker Studio oder PowerBI für Dashboards, die jeder versteht.\n5. **Activation Layer:** Reverse-ETL sendet die *Erkenntnisse* zurück an Facebook/Google ('Dieser Kunde hat hohen CLV, finde mehr von solchen Leuten').",
      },
      {
        id: 'checklist-tracking',
        type: 'checklist',
        title: 'Audit: Ist Ihr Tracking bereit für 2026?',
        items: [
          { text: 'Server-Side Tracking implementiert (First-Party Data)', checked: true },
          {
            text: 'Cookie-Banner blockiert Tracking NICHT vor Zustimmung (Illegal, aber oft Standard)',
            checked: false,
          },
          { text: 'Attributions-Modell definiert (Data-Driven statt Last-Click)', checked: false },
          {
            text: 'CRM-Daten (Offline Conversions) werden an Ad-Netzwerke zurückgespielt',
            checked: false,
          },
          { text: 'Dashboards zeigen Gewinn (Profit), nicht nur Umsatz (Revenue)', checked: true },
        ],
      },
      {
        id: 'comparison-bi',
        type: 'comparison',
        variant: 'pros-cons',
        items: [
          {
            title: 'Traditionelles Reporting',
            points: [
              'Monatliche PDFs',
              'Silo-Daten (Facebook vs Google)',
              'Fokus auf Vanity Metrics (Likes, Clicks)',
              'Blickt nur zurück',
            ],
          },
          {
            title: 'Coday Intelligence',
            points: [
              'Echtzeit-Dashboards',
              'Single Source of Truth',
              'Fokus auf Business Metrics (Profit, CLV)',
              'Schaut nach vorne (Forecast)',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'divider-bi',
        type: 'divider',
        variant: 'dots',
      },
      {
        id: 'outro-bi',
        type: 'text',
        heading: 'Fazit: Werden Sie zum Sniper',
        level: 'h2',
        content:
          'Marketing ohne Daten ist wie Schrotflinte schießen im Dunkeln. Sie treffen vielleicht etwas, aber Sie verschwenden eine Menge Munition.\n\nBusiness Intelligence macht Sie zum Sniper. Ein Schuss, ein Treffer. Weniger Budget, mehr Ergebnis. Das ist keine Magie, das ist Mathematik.',
      },
      {
        id: 'cta-bi',
        type: 'cta',
        title: 'Schluss mit Blindflug',
        description:
          'Wir auditieren Ihr aktuelles Tracking-Setup kostenlos und zeigen Ihnen, wo Ihre Daten Lücken haben.',
        buttonText: 'Gratis Data-Audit starten',
        href: '/contact',
        variant: 'primary', // Changed to primary for high contrast
      },
    ],
  },
  {
    id: 3,
    title: 'Omni-Channel Blueprint: Maximale Präsenz ohne Budget-Verschwendung',
    slug: 'der-perfekte-omni-channel-mix',
    excerpt:
      'B2B-Kunden fordern heute bis zu 10 Touchpoints vor dem Kauf. Sichern Sie sich den ultimativen Blueprint für lückenlose digitale Dominanz auf allen relevanten Kanälen.',
    category: 'Strategie',
    readTime: '10 Min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Vernetzte Omnichannel Marketing Strategie',
    author: 'Strategy Director',
    date: '05. März 2026',
    content: [
      {
        id: 'intro-omni',
        type: 'text',
        heading: 'Multi-Channel vs. Omni-Channel',
        level: 'h2',
        content:
          "Viele verwechseln 'wir sind überall' mit einer Strategie. Wenn Ihre Facebook-Ads nicht wissen, was Ihre E-Mail-Kampagnen tun und Ihre Website nicht weiß, dass der Kunde schon gekauft hat, dann nerven Sie Ihre Kunden nur. Omni-Channel bedeutet: Eine einzige, flüssige Konversation über alle Kanäle hinweg.",
      },
      {
        id: 'comparison-channel',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Multi-Channel (Chaotisch)',
            points: [
              'Kanäle silieren (getrennt)',
              'Widersprüchliche Botschaften',
              'Daten liegen verstreut',
              'Kunde ist verwirrt',
            ],
          },
          {
            title: 'Omni-Channel (Integriert)',
            points: [
              'Zentrale Kundendatenbank (CDP)',
              'Konsistente Story',
              'Echtzeit-Datenabgleich',
              'Nahtlose Experience',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'checklist-touchpoints',
        type: 'checklist',
        title: 'Die 7 Must-Have Touchpoints',
        items: [
          { text: 'SEO (Gefunden werden bei Bedarf)', checked: true },
          { text: 'Social Ads (Push-Marketing für Awareness)', checked: true },
          { text: "Retargeting (Die 'Erinnerung')", checked: true },
          { text: 'Email-Automation (Nurturing)', checked: true },
          { text: 'Conversational (Chat/WhatsApp)', checked: false },
          { text: 'Website (Der Hub)', checked: true },
          { text: 'Offline (Event/Print - optional)', checked: false },
        ],
      },
      {
        id: 'text-orchestration',
        type: 'text',
        heading: 'Die Orchestrierung',
        level: 'h2',
        content:
          'Stellen Sie sich vor, Sie sind Dirigent. Ihre Kanäle sind die Instrumente. Wenn jeder spielt, was er will, entsteht Lärm. Wenn alle nach Noten spielen, entsteht Musik. Wir nutzen Tools wie Klaviyo, HubSpot und Custom Dashboards, um diese Symphonie zu leiten.',
      },
      {
        id: 'cta-omni',
        type: 'cta',
        title: 'Bringen Sie Ordnung ins Chaos',
        description: 'Wir entwickeln Ihre Omni-Channel Blaupause in einem halbtägigen Workshop.',
        buttonText: 'Strategie-Session buchen',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 4,
    title: 'Social Media Secrets 2026: Organische Reichweite ist tot?',
    slug: 'social-media-secrets-2026',
    excerpt:
      "Algorithmen haben sich geändert. Wer heute noch 'postet und hofft', ist verloren. Hier sind die neuen Regeln für LinkedIn, Instagram und TikTok.",
    category: 'Social Media',
    readTime: '9 Min.',
    image:
      '/images/marketing/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.webp',
    alt: 'Social Media Strategy',
    author: 'Social Media Manager',
    date: '28. Februar 2026',
    content: [
      {
        id: 'intro-social',
        type: 'text',
        heading: 'Content ist King, aber Distribution ist King Kong',
        level: 'h2',
        content:
          "Der beste Content nützt nichts, wenn ihn niemand sieht. 2026 ist 'Pay-to-Play' die Realität. Aber es gibt einen Backdoor-Hack: Engagement.",
      },
      {
        id: 'social-growth-graph',
        type: 'interactive',
        component: 'seo-graph', // Reusing graph to show viral growth vs organic decline
        data: {},
      },
      {
        id: 'accordion-hooks',
        type: 'accordion',
        items: [
          {
            title: "Der 'Pattern Interrupt'",
            content:
              "**Sekunde 1-3:** Brechen Sie das Scroll-Muster. Visuell oder textlich. 'Hören Sie auf, das zu tun!' ist besser als 'Willkommen zu unserem Video'.",
          },
          {
            title: "Die 'Value Bridge'",
            content:
              "**Sekunde 3-10:** Versprechen Sie sofortigen Wert. 'In diesem Post zeige ich Ihnen, wie Sie 30% Steuern sparen'.",
          },
          {
            title: "Der 'Loop'",
            content:
              '**Ende:** Stellen Sie sicher, dass das Video in einer Schleife geschaut wird. Watchtime ist das wichtigste Signal für den Algorithmus.',
          },
        ],
      },
      {
        id: 'checklist-posting',
        type: 'checklist',
        title: "Die 'Perfect Post' Checkliste",
        items: [
          { text: 'Hook in der ersten Zeile/Sekunde', checked: true },
          { text: 'Format füllt den ganzen Screen (9:16 oder 4:5)', checked: true },
          { text: 'Untertitel sind eingebrannt (für Silent Watcher)', checked: true },
          { text: 'CTA am Ende (Kommentieren, Speichern)', checked: true },
        ],
      },
      {
        id: 'cta-social',
        type: 'cta',
        title: 'Viral gehen als Service',
        description:
          'Überlassen Sie Ihre Social Media Präsenz nicht dem Zufall. Wir managen Ihre Accounts data-driven.',
        buttonText: 'Social Audit anfragen',
        href: '/services/social',
        variant: 'glass',
      },
    ],
  },
  {
    id: 5,
    title: 'Email Marketing: Der 4400% ROI Kanal',
    slug: 'email-marketing-automation',
    excerpt:
      "Totgesagte leben länger. E-Mail ist nach wie vor der Kanal mit dem höchsten ROI. Aber nur, wenn man nicht 'spammt', sondern 'nurturt'.",
    category: 'Marketing',
    readTime: '11 Min.',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    alt: 'Email Automation Excellence',
    author: 'CRM Expert',
    date: '20. Februar 2026',
    content: [
      {
        id: 'intro-email',
        type: 'text',
        heading: 'Ihr Geld liegt in der Liste',
        level: 'h2',
        content:
          'Social Media Follower gehören Zuckerberg oder Musk. Ihre E-Mail-Liste gehört IHNEN. Das ist Ihr einziges echtes Asset. \n\nE-Mail Marketing ist wie Geld drucken auf Knopfdruck – wenn Sie das Vertrauen Ihrer Leser haben.',
      },
      {
        id: 'email-roi-calc',
        type: 'interactive',
        component: 'roi-calculator',
        data: {},
      },
      {
        id: 'accordion-flows',
        type: 'accordion',
        items: [
          {
            title: 'Welcome Flow',
            content:
              'Die wichtigste Mail. Wird zu 80% geöffnet. Liefern Sie hier sofort den versprochenen Lead Magnet und stellen Sie sich vor.',
          },
          {
            title: 'Abandoned Cart / Browser Flow',
            content:
              "Jemand war auf Ihrer Pricing-Page, hat aber nicht gekauft? Eine Stunde später kommt automatisch eine nette Mail: 'Fragen?' - Das konvertiert zu 15%.",
          },
          {
            title: 'Winback Flow',
            content:
              "Kunden, die 90 Tage nichts gekauft haben, automatisch reaktivieren. 'Wir vermissen dich' + Gutschein.",
          },
        ],
      },
      {
        id: 'checklist-deliverability',
        type: 'checklist',
        title: 'Landen Sie im Spam?',
        items: [
          { text: 'SPF, DKIM und DMARC Records gesetzt', checked: true },
          { text: 'List Hygiene (Inaktive löschen)', checked: false },
          { text: "Keine 'Spam-Trigger-Words' (Gratis, !!!, $$$)", checked: true },
          { text: 'Personalisierung im Betreff', checked: true },
        ],
      },
      {
        id: 'cta-email',
        type: 'cta',
        title: 'Bauen Sie Ihren eigenen Geld-Drucker',
        description:
          'Wir richten Ihnen Klaviyo oder ActiveCampaign komplett ein. Inklusive aller Basis-Flows.',
        buttonText: 'Automation Setup buchen',
        href: '/services/marketing',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 6,
    title: 'Video Content Excellence: Warum Text tot ist',
    slug: 'video-content-excellence',
    excerpt:
      'Menschen lesen nicht mehr. Sie schauen. Wenn Sie 2026 keine Video-Strategie haben, sind Sie unsichtbar. Wir zeigen Ihnen, wie Sie mit minimalem Aufwand maximale Sichtbarkeit erreichen.',
    category: 'Content',
    readTime: '8 Min.',
    image: '/images/marketing/video-content-streaming-plattform-play-button-multimedia.webp',
    alt: 'Video Content Production',
    author: 'Creative Director',
    date: '15. Februar 2026',
    content: [
      {
        id: 'intro-video',
        type: 'text',
        heading: 'Die TikTokisierung der Aufmerksamkeit',
        level: 'h2',
        content:
          'Die Aufmerksamkeitsspanne eines Goldfisches beträgt 9 Sekunden. Die eines Menschen im Jahr 2026? 8 Sekunden. \n\nLange Textwüsten funktionieren nicht mehr. Wer seine Botschaft nicht in 15-60 Sekunden Bewegtbild verpacken kann, wird ignoriert. Algorithmen von LinkedIn bis Google bevorzugen Video-Content massiv.',
      },
      {
        id: 'video-roi-calc',
        type: 'interactive',
        component: 'roi-calculator', // Using ROI calculator as a proxy for 'Media Value' calculator
        data: { mode: 'media-value' },
      },
      {
        id: 'checklist-video-setup',
        type: 'checklist',
        title: 'Das 500€ Studio-Setup (Profiqualität)',
        items: [
          { text: 'Licht: Godox SL60W + Softbox (ca. 150€)', checked: true },
          { text: 'Audio: Rode Wireless Go II (ca. 250€)', checked: true },
          { text: 'Kamera: iPhone 15 Pro (bereits vorhanden?)', checked: true },
          { text: 'Schnitt: CapCut Desktop (Kostenlos)', checked: true },
        ],
      },
      {
        id: 'comparison-video-format',
        type: 'comparison',
        variant: 'feature-grid',
        items: [
          {
            title: 'Imagefilm (Old School)',
            points: ['Teuer (10k+)', 'Langweilig', 'Einmalige Nutzung', 'Kein Social Reach'],
          },
          {
            title: 'Content Pieces (New School)',
            points: ['Günstig & Schnell', 'Authentisch', 'Tägliche Nutzung', 'Viraler Faktor'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'cta-video',
        type: 'cta',
        title: 'Starten Sie Ihre Video-Offensive',
        description:
          'Wir produzieren Ihre ersten 5 Short-Form Videos für Social Media. Strategie, Dreh und Schnitt inklusive.',
        buttonText: 'Content-Paket anfragen',
        href: '/services/content',
        variant: 'glass',
      },
    ],
  },
  {
    id: 7,
    title: 'Warum WordPress im Jahr 2026 tot ist (und warum Agenturen es Ihnen trotzdem verkaufen)',
    slug: 'warum-wordpress-tot-ist',
    excerpt:
      "WordPress war großartig. Im Jahr 2010. Heute ist es ein Sicherheitsrisiko und eine Performance-Bremse. Wir decken auf, warum 'Custom Code' der neue Standard für ernsthafte Unternehmen ist.",
    category: 'Tech Deep Dive',
    readTime: '14 Min.',
    image:
      '/images/marketing/digital-transformation-zeitung-zu-smartphone-social-media-werbung-evolution.webp',
    alt: 'Veraltete Technologie vs. Moderne Architektur',
    author: 'Lead Architect',
    date: '01. April 2026',
    content: [
      {
        id: 'intro-wp',
        type: 'text',
        heading: 'Der Elefant im Raum',
        level: 'h2',
        content:
          "43% des Internets laufen auf WordPress. Das klingt beeindruckend. Aber wissen Sie, was noch beeindruckender ist? 90% aller gehackten Websites laufen ebenfalls auf WordPress. \n\nWordPress wurde vor über 20 Jahren als Blogging-Plattform entwickelt. Heute wird es missbraucht, um komplexe Unternehmens-Lösungen zu bauen. Das Ergebnis: Ein 'Frankenstein-Code', der nur durch hunderte Plugins zusammengehalten wird. Es ist Zeit, die Wahrheit zu sagen.",
      },
      {
        id: 'comparison-architecture',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Monolith (WordPress)',
            points: [
              'Backend & Frontend untrennbar',
              "Server muss jede Seite bei Aufruf 'bauen' (langsam)",
              'Ein Plugin-Update kann alles zerstören',
              'Offene Datenbank-Schnittstellen',
            ],
          },
          {
            title: 'Headless / Jamstack (Coday)',
            points: [
              'Entkoppelte Architektur',
              'Seiten sind vor-generiert (Instant Load)',
              'Isolierte Komponenten',
              'Keine direkte Datenbank-Verbindung',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'chapter-security',
        type: 'text',
        heading: 'Reason 1: Sicherheit ist eine Illusion',
        level: 'h2',
        content:
          "Stellen Sie sich vor, Sie lassen Ihre Haustür offen, stellen aber ein Schild 'Bitte nicht einbrechen' davor. Das ist WordPress-Sicherheit. \n\nWeil WordPress so populär ist, ist es das Ziel Nr. 1 für Bots. Sobald eine Sicherheitslücke in einem populären Plugin gefunden wird, scannen Millionen Bots das Web und infizieren automatisch jede Seite, die dieses Plugin nutzt. \n\nSehen Sie selbst, wie einfach ein Angriff auf eine Standard-Installation ist vs. eine statische Seite:",
      },
      {
        id: 'interactive-hack',
        type: 'interactive',
        component: 'hack-simulator',
        data: {},
      },
      {
        id: 'text-hack-analysis',
        type: 'text',
        content:
          "**Analyse:** Bei der statischen Seite (Coday Stack) scheitert der Angriff, weil es schlichtweg nichts anzugreifen gibt. Es gibt keine Datenbank, die online ist. Es gibt keine 'wp-login.php'. Die Angriffsfläche ist quasi Null.",
      },
      {
        id: 'chapter-performance',
        type: 'text',
        heading: 'Reason 2: Performance ist Umsatz',
        level: 'h2',
        content:
          "Google hat die Regeln geändert. 'Core Web Vitals' sind jetzt ein Ranking-Faktor. WordPress-Seiten fallen hier reihenweise durch, weil sie 'Bloat' (Datenmüll) laden.\n\nEin leeres WordPress lädt schon CSS und JS für Dinge, die Sie nicht nutzen (Emojis, Embeds, etc.). Mit jedem Plugin wird es schlimmer. Themes wie 'Divi' oder 'Elementor' fügen Megabytes an unnötigem Code hinzu.\n\nWir bauen 'High-Performance Machines'. Code, der genau das tut, was er soll. Nichts mehr. Das Ergebnis?",
      },
      {
        id: 'interactive-speed',
        type: 'interactive',
        component: 'speed-test',
        data: {},
      },
      {
        id: 'checklist-tech',
        type: 'checklist',
        title: 'Der Tech-Stack Check',
        items: [
          { text: 'Keine Datenbank-Verbindung im Frontend', checked: true },
          { text: 'Globale CDN-Verteilung (Edge Network)', checked: true },
          { text: 'Automatische Bild-Optimierung (Next/Image)', checked: true },
          { text: "Keine 'Plugins' sondern 'Packages' (npm)", checked: true },
        ],
      },
      {
        id: 'chapter-maintenance',
        type: 'text',
        heading: 'Reason 3: Die Wartungs-Hölle',
        level: 'h2',
        content:
          "Hand aufs Herz: Wann haben Sie das letzte Mal Ihre Plugins aktualisiert? Haben Sie Angst, den 'Update'-Button zu drücken, weil danach die Seite weiß bleiben könnte? \n\nDas nennen wir 'Update Anxiety'. Bei WordPress müssen Sie ständig flicken, patchen und hoffen. Ein Sicherheits-Update von WooCommerce? Alles steht still.\n\nBei unserem Stack gibt es keine Plugins, die 'brechen'. CI/CD Pipelines testen jeden Code-Change automatisch, BEVOR er live geht. Wenn etwas kaputt ist, geht es nicht online. So einfach ist das.",
      },
      {
        id: 'quote-tech',
        type: 'quote',
        text: 'WordPress ist für Hobby-Blogger. React ist für Business.',
        author: 'Coday Manifesto',
        variant: 'gradient',
      },
      {
        id: 'cta-migration',
        type: 'cta',
        title: 'Raus aus der WordPress-Falle',
        description:
          'Wir migrieren Ihre unsichere WordPress-Seite auf unseren High-Security Stack. 100% Garantie gegen Standard-Hacks.',
        buttonText: 'Migration anfragen',
        href: '/services/web-development',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 8,
    title: 'Neuro-Design: Wie Sie das Unterbewusstsein Ihrer Kunden hacken',
    slug: 'neuro-design-psychologie',
    excerpt:
      'Farben, Formen und Layouts entscheiden in Millisekunden über Kauf oder Abbruch. Wir zeigen Ihnen die geheimen psychologischen Trigger, die Amazon und Apple nutzen.',
    category: 'Design Psychology',
    readTime: '13 Min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Neuromarketing und Design Psychologie',
    author: 'Head of Design',
    date: '05. April 2026',
    content: [
      {
        id: 'intro-neuro',
        type: 'text',
        heading: 'Wir kaufen emotional, wir rechtfertigen rational',
        level: 'h2',
        content:
          'Glauben Sie wirklich, Sie haben Ihr letztes iPhone gekauft, weil der Prozessor 10% schneller war? Nein. Sie haben es gekauft, weil es sich gut angefühlt hat. \n\nDas menschliche Gehirn trifft 95% aller Entscheidungen unterbewusst (System 1). Erst danach schaltet sich der rationale Verstand (System 2) ein, um die Entscheidung zu begründen. Schlechtes Webdesign spricht nur System 2 an (Fakten). Gutes Webdesign verführt System 1.',
      },
      {
        id: 'chapter-colors',
        type: 'text',
        heading: 'Die geheime Sprache der Farben',
        level: 'h2',
        content:
          "Jede Farbe sendet ein hormonelles Signal. Blau beruhigt (Serotonin). Rot alarmiert (Adrenalin). Gelb macht glücklich (Dopamin). \n\nWenn Sie 'Vertrauen' verkaufen (z.B. als Finanzberater), aber rote Buttons nutzen, erzeugen Sie unterbewusste kognitive Dissonanz. Der Kunde 'fühlt', dass etwas nicht stimmt, kann aber nicht sagen, was. Testen Sie es selbst:",
      },
      {
        id: 'interactive-colors-8',
        type: 'interactive',
        component: 'color-picker',
        data: {},
      },
      {
        id: 'text-color-analysis',
        type: 'text',
        content:
          '**Pro-Tipp:** Nutzen Sie für Ihre primäre Call-to-Action (CTA) immer eine Farbe, die sich im Farbkreis gegenüber Ihrer Markenfarbe befindet (Komplementärkontrast). Das maximiert die visuelle Salienz.',
      },
      {
        id: 'chapter-ux-laws',
        type: 'text',
        heading: '3 UX-Gesetze, die Umsatz bringen',
        level: 'h2',
        content:
          'Psychologen haben Jahrzehnte damit verbracht, zu verstehen, wie wir Interfaces wahrnehmen. Hier sind die drei wichtigsten Gesetze für Ihre Website:',
      },
      {
        id: 'accordion-ux-laws',
        type: 'accordion',
        items: [
          {
            title: "Hick's Law (Das Auswahl-Paradox)",
            content:
              '**Gesetz:** Die Zeit, eine Entscheidung zu treffen, steigt logarithmisch mit der Anzahl der Optionen.\n**Anwendung:** Entfernen Sie Links aus Ihrer Navigation. Reduzieren Sie Formularfelder. Geben Sie dem Kunden EINEN klaren Weg, nicht fünf.',
          },
          {
            title: "Fitts's Law (Das Zielscheiben-Gesetz)",
            content:
              '**Gesetz:** Die Zeit, ein Ziel zu treffen, hängt von der Größe des Ziels und der Entfernung ab.\n**Anwendung:** Machen Sie wichtige Buttons GROSS. Platzieren Sie sie dort, wo der Daumen ist (unten am Bildschirmrand auf Mobile).',
          },
          {
            title: 'Von Restorff Effect (Der Isolationseffekt)',
            content:
              "**Gesetz:** Wenn mehrere ähnliche Objekte vorhanden sind, wird sich an dasjenige erinnert, das sich unterscheidet.\n**Anwendung:** Ihre 'Bestseller'-Option in der Preistabelle muss visuell ausbrechen (andere Farbe, größer, Schatten).",
          },
        ],
      },
      {
        id: 'chapter-ab-testing',
        type: 'text',
        heading: 'Beweis statt Behauptung: A/B Testing',
        level: 'h2',
        content:
          'Die schönste Theorie nützt nichts, wenn sie nicht funktioniert. Deshalb raten wir bei Coday nie. Wir testen. \n\nEin A/B Test zeigt 50% der Besucher Version A und 50% Version B. Die Version, die mehr Umsatz bringt, gewinnt. Oft sind es kleine Änderungen im Wording oder der Farbe, die den Unterschied machen.',
      },
      {
        id: 'interactive-ab-test',
        type: 'interactive',
        component: 'ab-test',
        data: {},
      },
      {
        id: 'text-ab-result',
        type: 'text',
        content:
          "Im Simulator oben sehen Sie einen Klassiker: 'Wir'-Text (Ego) vs. 'Sie'-Text (Kunden-Nutzen). Der Unterschied in der Conversion-Rate ist oft dramatisch (im Schnitt +30-100%).",
      },
      {
        id: 'checklist-neuro',
        type: 'checklist',
        title: 'Neuro-Design Audit',
        items: [
          { text: 'Blickrichtung von Gesichtern zeigt auf die CTA (Gaze Cueing)', checked: true },
          { text: "Verknappung wird genutzt ('Nur noch 3 Plätze')", checked: true },
          { text: "Social Proof (Logos/Testimonials) ist 'Above the fold'", checked: false },
          { text: "Preise nutzen den 'Anker-Effekt' (Teuerstes zuerst)", checked: true },
        ],
      },
      {
        id: 'cta-design',
        type: 'cta',
        title: 'Verführt Ihre Website schon?',
        description:
          'Wir gestalten Interfaces, die nicht nur schön aussehen, sondern neurologisch verkaufen.',
        buttonText: 'Design-Audit anfragen',
        href: '/services/design',
        variant: 'glass',
      },
    ],
  },
  {
    id: 9,
    title: "Die KI-Revolution: Warum 2026 das Jahr der 'Voice-First' Strategie ist",
    slug: 'ki-voice-search-revolution',
    excerpt:
      'Tippen ist so 2025. Wir zeigen, warum Voice Search, AI-Agenten und Hyper-Personalisierung den Markt radikal verändern – und wie Sie davon profitieren.',
    category: 'Future Tech',
    readTime: '11 Min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'KI und Mensch Zusammenarbeit',
    author: 'AI Research Lead',
    date: '12. April 2026',
    content: [
      {
        id: 'intro-ai',
        type: 'text',
        heading: 'Das Ende des Suchschlitzes',
        level: 'h2',
        content:
          "Seit 30 Jahren suchen wir gleich: Wir tippen Keywords in eine Box und bekommen 10 blaue Links. \n\nAb heute ist das vorbei. ChatGPT Search, Perplexity und Google Gemini haben das Spiel geändert. Nutzer suchen nicht mehr nach Links. Sie suchen nach Antworten. Wer seine Website nicht für 'LLMs' (Large Language Models) optimiert, wird unsichtbar.",
      },
      {
        id: 'chapter-voice',
        type: 'text',
        heading: 'Voice Commerce: Shopping unterwegs',
        level: 'h2',
        content:
          "Stellen Sie sich vor, Ihr Kunde steht in der Küche und sagt: 'Hey Siri, bestell mir diese neuen Sneaker in Rot, Größe 42'. Keine Website. Kein Checkout-Formular. Nur Sprache.\n\nDas ist keine Science-Fiction. Das ist Realität im Jahr 2026. Testen Sie unsere Voice Commerce Demo hier:",
      },
      {
        id: 'interactive-voice',
        type: 'interactive',
        component: 'voice-demo',
        data: {},
      },
      {
        id: 'text-voice-analysis',
        type: 'text',
        content:
          "**Was gerade passiert ist:** Die KI hat den Kontext ('Rot', 'Größe 42') verstanden, den Bestand durchsucht und eine personalisierte Antwort generiert. Websites, die das nicht können, verlieren den Kunden.",
      },
      {
        id: 'chapter-efficiency',
        type: 'text',
        heading: 'Die Skalierungs-Lüge',
        level: 'h2',
        content:
          'Wachstum hieß früher: Mehr Mitarbeiter einstellen. Mehr Menschen = Mehr Kosten.\n\nHeute heißt Wachstum: Mehr AI-Agents deployen. Ein AI-Support-Agent schläft nicht, wird nicht krank und kostet einen Bruchteil eines menschlichen Mitarbeiters. Der Hebel ist gigantisch.',
      },
      {
        id: 'interactive-ai-cost',
        type: 'interactive',
        component: 'ai-cost',
        data: {},
      },
      {
        id: 'accordion-ai-usecases',
        type: 'accordion',
        items: [
          {
            title: 'AI Support Agent (70% Kostenersparnis)',
            content:
              "Löst 80% aller Kundenanfragen sofort. Von 'Wo ist mein Paket?' bis 'Wie installiere ich das?'. Nur komplexe Fälle gehen an Menschen.",
          },
          {
            title: 'Hyper-Personalisierung (30% mehr Umsatz)',
            content:
              'Die Website passt sich dem Besucher an. Ein CEO sieht anderen Text und Bilder als ein Student. In Echtzeit generiert.',
          },
          {
            title: 'Predictive Logistics',
            content:
              'Die KI bestellt Ware nach, bevor das Lager leer ist. Basierend auf Wetterdaten, Trends und historischen Verkäufen.',
          },
        ],
      },
      {
        id: 'checklist-ai-ready',
        type: 'checklist',
        title: "Sind Sie 'AI Ready'?",
        items: [
          { text: 'Structured Data (Schema.org) optimiert für LLMs', checked: true },
          { text: 'Chatbot basiert auf eigener Knowledge Base (RAG)', checked: true },
          { text: 'Voice Search kompatibel (Long-Tail Keywords)', checked: true },
          { text: 'Bilder haben beschreibende Alt-Tags für Vision AI', checked: true },
        ],
      },
      {
        id: 'cta-ai',
        type: 'cta',
        title: 'Vorsprung durch Technik',
        description:
          'Wir implementieren Custom AI-Solutions, die Ihre Prozesse automatisieren und Kunden begeistern.',
        buttonText: 'AI Workshop buchen',
        href: '/services/ai',
        variant: 'glass',
      },
    ],
  },
  {
    id: 10,
    title: 'Das Anti-AI Manifest: Warum menschliches Design 2026 gewinnt 🛑',
    slug: 'anti-ai-manifest-menschliches-design',
    excerpt:
      'GPT schrieb den Text. Ein Mensch las den Raum. Warum Manifest-getriebenes Design 3.2x höher konvertiert als generischer KI-Output.',
    category: 'Philosophie & Design',
    readTime: '12 Min.',
    image:
      '/images/marketing/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.webp',
    alt: 'Abstrakte Kunst menschlich gegen KI Muster',
    author: 'Coday Founder',
    date: '01. Mai 2026',
    content: [
      {
        id: 'intro-manifesto',
        type: 'text',
        heading: 'Die Flut der Mittelmäßigkeit',
        level: 'h2',
        content:
          "Öffnen Sie LinkedIn. Scrollen Sie durch Instagram. Schauen Sie sich die neuesten Landingpages an. Spüren Sie es? Die Müdigkeit. Alles sieht... okay aus.\n\nAI hat den 'Durchschnitt' demokratisiert. Jeder kann jetzt in Sekunden ein 'gutes' Logo, einen 'guten' Text und eine 'gute' Website erstellen. Aber wenn 'gut' kostenlos wird, wird 'gut' wertlos.\n\nIn einem Ozean aus synthetischer Perfektion sticht nur noch das hervor, was AI nicht faken kann: Menschlichkeit. Fehler. Reibung. Seele.",
      },
      {
        id: 'interactive-soul-reader',
        type: 'interactive',
        component: 'quiz',
        data: {
          mode: 'human-vs-ai',
          title: 'Der Turing-Test für Design',
          description:
            'Erkennen Sie die menschliche Seele? Raten Sie, welches Design von einem Menschen stammt.',
        },
      },
      {
        id: 'text-uncanny-valley',
        type: 'text',
        heading: "Das 'Uncanny Valley' im Webdesign",
        level: 'h2',
        content:
          "Sie kennen das Gefühl aus der Robotik: Wenn ein Roboter *fast* menschlich aussieht, aber nicht ganz, erzeugt das Unbehagen. Dasselbe passiert jetzt mit Marken.\n\nWir erkennen AI-generierte Texte unterbewusst ('In der heutigen digitalen Landschaft...'). Wir riechen den Midjourney-Glanz auf Stockfotos. Es schafft Distanz. Wir vertrauen ihm nicht.\n\n**Der Gegentrend:** 'Anti-AI' Ästhetik. Roh, brutalistisch, asymmetrisch, körnig. Designs, die schreien: 'Ein Mensch hat das angefasst'.",
      },
      {
        id: 'comparison-ai-human',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'AI Design (Massenware)',
            points: [
              'Perfekt symmetrisch',
              "Generische 'Corporate Memphis' Kunst",
              'Höfliche, roboterhafte Texte',
              'Vorhersehbare Layouts',
            ],
          },
          {
            title: 'Menschliches Design (Luxus)',
            points: [
              'Bewusste Asymmetrie',
              'Handgezeichnet / Echte Fotografie',
              'Meinungsstarke, kantige Texte',
              'Unerwartete Interaktionen',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'chapter-friction',
        type: 'text',
        heading: 'Warum Reibung gut ist (manchmal)',
        level: 'h2',
        content:
          "AI optimiert auf Effizienz. Sie will jede Reibung entfernen. Aber Reibung ist der Ort, an dem Erinnerung entsteht.\n\nEine Vinyl-Schallplatte hat Reibung. Man muss sie herausnehmen, putzen, die Nadel aufsetzen. Es knistert. Ist Spotify effizienter? Ja. Ist es emotionaler? Nein.\n\nWir bauen Websites mit 'positiver Reibung'. Interaktionen, die einen Moment des Innehaltens erfordern. Animationen, die überraschen. Wir wollen nicht nur, dass Nutzer konvertieren. Wir wollen, dass sie *fühlen*.",
      },
      {
        id: 'checklist-soul',
        type: 'checklist',
        title: "Der 'Seelen'-Audit",
        items: [
          { text: 'Fotografie ist echt (kein Stock, keine AI)', checked: true },
          { text: 'Texte klingen wie gesprochen (nicht wie ChatGPT)', checked: true },
          { text: 'Micro-Interactions überraschen den Nutzer', checked: true },
          { text: "Design bricht bewusst mindestens eine 'Best Practice' Regel", checked: true },
        ],
      },
      {
        id: 'cta-manifesto',
        type: 'cta',
        title: 'Seien Sie unapologetisch menschlich',
        description:
          'Wir bauen Marken, die einen Puls haben. Lassen Sie uns etwas erschaffen, wovon ein Algorithmus nicht einmal träumen könnte.',
        buttonText: 'Die Rebellion starten',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 11,
    title: "Der 'Agentur-Killer': Warum das klassische Agentur-Modell tot ist",
    slug: 'agentur-killer-modell',
    excerpt:
      "Warum zahlen Sie monatliche Retainer für Leistungen, die eine AI in Sekunden erledigt? Wir packen aus: Die schmutzigen Geheimnisse der Branche und warum die Zukunft 'Hybrid' gehört.",
    category: 'Industry Disruption',
    readTime: '18 Min.',
    image: '/images/services/dienstleistung-service-illustration-01.webp',
    alt: 'Disruption der Werbebranche',
    author: 'Coday Founder',
    date: '20. April 2026',
    content: [
      {
        id: 'key-takeaways-10',
        type: 'key-takeaways',
        title: 'Executive Summary',
        items: [
          {
            text: 'Traditionelle Agenturen verdienen mehr, wenn sie langsam arbeiten (Stundensatz-Modell).',
            icon: 'bulb',
          },
          { text: 'AI-Agents reduzieren Produktionskosten um bis zu 95%.', icon: 'check' },
          {
            text: "Das 'Hybrid-Modell' (Mensch + Maschine) ist der neue Standard für High-Performance Marketing.",
            icon: 'star',
          },
        ],
      },
      {
        id: 'intro-disruption',
        type: 'text',
        heading: 'Ihr Retainer verbrennt Geld',
        level: 'h2',
        content:
          'Es ist ein offenes Geheimnis: Das Geschäftsmodell klassischer Werbeagenturen basiert auf Ineffizienz. Je länger sie für eine Aufgabe brauchen, desto mehr verdienen sie. Stundensätze belohnen Langsamkeit.\n\nIn einer Welt ohne AI war das akzeptabel. Man brauchte Manpower. Aber heute? Heute ist es Diebstahl an Ihrem Budget.',
      },
      {
        id: 'interactive-timeline',
        type: 'interactive',
        component: 'timeline',
        data: {},
      },
      {
        id: 'text-timeline-analysis',
        type: 'text',
        content:
          "**Die Evolution:** Wie Sie oben sehen, bewegen wir uns von 'Menschen-Masse' zu 'AI-Klasse'. Wer heute noch eine Agentur mit 50 Mitarbeitern bezahlt, bezahlt für 45 Leute, die Kaffee trinken und Meetings halten.",
      },
      {
        id: 'chapter-math',
        type: 'text',
        heading: 'Die Mathematik des Scheiterns',
        level: 'h2',
        content:
          "Lassen Sie uns rechnen. Eine typische Agentur verlangt 150€ pro Stunde. Ein Junior-Designer braucht 4 Stunden für einen Instagram-Post. Das sind 600€ für ein Bild, das morgen vergessen ist.\n\nEine AI generiert 50 Varianten dieses Bildes in 30 Sekunden. Kosten: 0,02€. \n\nWo fließt die Differenz hin? In den 'Overhead' der Agentur. Miete, Pitch-Decks, Account Manager. Rechnen Sie hier selbst nach:",
      },
      {
        id: 'interactive-calc',
        type: 'interactive',
        component: 'agency-calculator',
        data: {},
      },
      {
        id: 'chapter-hybrid',
        type: 'text',
        heading: "Die Lösung: Das 'Hybrid-Modell'",
        level: 'h2',
        content:
          'Wir sagen nicht, dass Menschen überflüssig sind. Strategie, Empathie und kreative Exzellenz brauchen Menschen (noch).\n\nAber die **Exekution** muss maschinell sein. Code schreiben. Texte variieren. Bilder skalieren. Daten analysieren. Das ist Job der Maschinen.\n\nDas Coday-Modell funktioniert so:',
      },
      {
        id: 'checklist-coday',
        type: 'checklist',
        title: 'Der Coday Unterschied',
        items: [
          { text: 'Keine Stundenabrechnung (Wir verkaufen Ergebnisse)', checked: true },
          { text: '1 Stratege steuert 10 AI-Agenten', checked: true },
          { text: 'Echtzeit-Execution (Tage statt Wochen)', checked: true },
          { text: 'Volle Transparenz (Sie besitzen den Code)', checked: true },
        ],
      },
      {
        id: 'quote-killer',
        type: 'quote',
        text: 'Wer als Agentur 2026 noch Stunden verkauft, hat sein Geschäftsmodell nicht verstanden.',
        author: 'Industry Insider',
        variant: 'large',
      },
      {
        id: 'cta-killer',
        type: 'cta',
        title: 'Wechseln Sie auf die Überholspur',
        description:
          'Kündigen Sie Ihren ineffizienten Retainer. Wir zeigen Ihnen, wie Sie mit der Hälfte des Budgets das Doppelte erreichen.',
        buttonText: 'Strategie-Gespräch',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 12,
    title: 'Speed = Revenue: Der hohe Preis der Latenz',
    slug: 'high-performance-web-vitals',
    excerpt:
      "Millisekunden kosten Millionen. Wir analysieren, warum Core Web Vitals die wichtigste KPI für 2026 sind und wie Sie Ihre 'Latenz-Steuer' berechnen.",
    category: 'Performance',
    readTime: '15 min.',
    image: '/images/marketing/seo-audit-analyse-optimierung-google-ranking.webp',
    alt: 'High Performance Analytics Dashboard',
    author: 'Coday Lead Dev',
    date: '15. Mai 2026',
    content: [
      {
        id: 'intro-speed',
        type: 'text',
        heading: 'Die 100ms Regel',
        level: 'h2',
        content:
          "Amazon hat es vor 10 Jahren entdeckt: Jede 100ms Latenz kostete sie 1% Umsatz. Heute sind Nutzer noch ungeduldiger.\n\nWenn Ihre Seite länger als 3 Sekunden lädt, springen 53% der mobilen Nutzer ab. Sie kommen nicht zurück. Speed ist kein 'Nice to have'. Es ist das Fundament Ihres Umsatzes.",
      },
      {
        id: 'interactive-latency-calc',
        type: 'interactive',
        component: 'latency-calculator',
        data: {},
      },
      {
        id: 'text-cwv',
        type: 'text',
        heading: 'Core Web Vitals: Der neue SEO Goldstandard',
        level: 'h2',
        content:
          'Google rät nicht mehr. Mit Core Web Vitals (CWV) messen sie exakt, wie nervig Ihre Seite ist.\n\n* **LCP (Largest Contentful Paint):** Wie schnell ist der Hauptinhalt da?\n* **INP (Interaction to Next Paint):** Friert die Seite ein, wenn ich klicke?\n* **CLS (Cumulative Layout Shift):** Springt der Inhalt beim Lesen weg?\n\nWer hier patzt, verschwindet aus der Suche.',
      },
      {
        id: 'checklist-performance',
        type: 'checklist',
        title: 'Der Performance Audit',
        items: [
          { text: 'Bilder sind WebP/AVIF und lazy-loaded', checked: true },
          { text: "Font-Dateien sind 'subsetted' und preloaded", checked: true },
          { text: 'JavaScript ist minimiert und deferred', checked: true },
          { text: 'Server Response Time (TTFB) ist unter 200ms', checked: true },
        ],
      },
      {
        id: 'quote-speed',
        type: 'quote',
        text: 'Performance ist das am meisten unterschätzte Asset im digitalen Portfolio.',
        author: 'Google Webmaster Central',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 13,
    title: 'Digitale Souveränität: Warum der US Cloud Act eine Zeitbombe ist',
    slug: 'digital-sovereignty-public-sector',
    excerpt:
      "Für den öffentlichen Sektor und kritische Infrastrukturen bedeutet 'Cloud First' oft 'America First'. Wir erklären, warum Digitale Souveränität die einzige Strategie für 2026 ist.",
    category: 'Government',
    readTime: '20 min.',
    image: '/images/services/online-praesenz-digitale-sichtbarkeit-internet-marketing.webp',
    alt: 'Europäischer Datenschirm',
    author: 'Coday Policy',
    date: '2. Juni 2026',
    content: [
      {
        id: 'intro-sovereignty',
        type: 'text',
        heading: 'Die Illusion der Kontrolle',
        level: 'h2',
        content:
          'Sie glauben, Ihre Daten sind sicher, weil der Server in Frankfurt steht. Aber wenn dieser Server AWS, Azure oder Google gehört, liegen Sie falsch.\n\nDer **US Cloud Act** zwingt amerikanische Unternehmen, Daten an US-Behörden herauszugeben – auch wenn diese Daten in der EU liegen. Für deutsche Behörden und KRITIS ist das ein inakzeptables Risiko.',
      },
      {
        id: 'interactive-sovereignty-check',
        type: 'interactive',
        component: 'sovereignty-checklist',
        data: {},
      },
      {
        id: 'text-solutions',
        type: 'text',
        heading: 'Der Weg zur Unabhängigkeit',
        level: 'h2',
        content:
          'Digitale Souveränität heißt nicht, alles selbst zu bauen. Es heißt, Abhängigkeiten zu kontrollieren.\n\nWir bauen auf **Open Source** und **Europäischer Infrastruktur** (Hetzner, Scaleway, Telekom Cloud). Keine Blackboxen. Kein Vendor Lock-in.',
      },
      {
        id: 'comparison-hosting',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'US Hyperscalers (AWS/Azure)',
            points: [
              'US Cloud Act greift',
              'Vendor Lock-in',
              'Intransparente Preise',
              'Daten-Monetarisierung',
            ],
          },
          {
            title: 'Sovereign Cloud (Coday Stack)',
            points: [
              'DSGVO-konform by Design',
              'Open Source Basis',
              'Planbare Kosten',
              '100% Datenhoheit',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-sovereignty',
        type: 'quote',
        text: 'Wer seine Infrastruktur nicht besitzt, besitzt seine digitale Zukunft nicht.',
        author: 'Digitalminister (Fiktiv)',
        variant: 'large',
      },
    ],
  },
  {
    id: 14,
    title: 'Die Psychologie des Dark Mode: Warum Dunkel sich teuer anfühlt',
    slug: 'psychology-of-dark-mode',
    excerpt:
      'Dark Mode ist mehr als ein Schalter. Er verändert, wie wir Wert wahrnehmen. Wir erforschen die Physik des Lichts, OLED-Screens und warum Premium-Marken die Dunkelheit lieben.',
    category: 'Design',
    readTime: '14 min.',
    image: '/images/marketing/video-content-streaming-plattform-play-button-multimedia.webp',
    alt: 'Dark Mode UI Elements',
    author: 'Coday Design Team',
    date: '20. Juni 2026',
    content: [
      {
        id: 'intro-dark',
        type: 'text',
        heading: 'Die Physik des Luxus',
        level: 'h2',
        content:
          "Gehen Sie in einen Apple Store. Gehen Sie in ein Luxus-Juweliergeschäft. Was sehen Sie? Schwarze Hintergründe. Gezieltes Licht.\n\nDunkelheit schafft Fokus. Sie eliminiert Ablenkung. Auf OLED-Screens ist Schwarz keine Farbe – es ist die Abwesenheit von Licht. Es spart Akku und signalisiert 'Premium'.",
      },
      {
        id: 'text-contrast',
        type: 'text',
        heading: 'Die Kontrast-Falle',
        level: 'h2',
        content:
          "Der größte Fehler, den Designer machen: Reines Schwarz (#000000) und reines Weiß (#FFFFFF). Das erzeugt 'Halation' (Verschwimmen) für Nutzer mit Astigmatismus.\n\n**Professioneller Dark Mode** nutzt Dunkelgrau (#121212) und entsättigte Textfarben. Testen Sie Ihren Kontrast hier:",
      },
      {
        id: 'interactive-contrast',
        type: 'interactive',
        component: 'contrast-analyzer',
        data: {},
      },
      {
        id: 'comparison-dark',
        type: 'comparison',
        variant: 'pros-cons',
        items: [
          {
            title: 'Amateur Dark Mode',
            points: [
              'Rein schwarze Hintergründe',
              'Gesättigte Farben (Accessibility Fail)',
              'Schatten unsichtbar',
            ],
          },
          {
            title: 'Pro Dark Mode (Coday Style)',
            points: [
              'Elevation durch hellere Grautöne',
              'Entsättigte Akzente',
              'Adäquate Kontrastverhältnisse',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'key-takeaway-dark',
        type: 'key-takeaways',
        title: 'Dark Mode Regeln',
        items: [
          { text: 'Niemals reines Schwarz (#000000) für Hintergründe', icon: 'check' },
          { text: 'Vermeiden Sie gesättigte Farben auf Text (Vibration)', icon: 'bulb' },
          { text: "Nutzen Sie 'Elevation' (helleres Grau) statt Schatten", icon: 'star' },
        ],
      },
    ],
  },
  {
    id: 15,
    title: 'WordPress ist tot. Headless CMS beweist es (2026)',
    slug: 'headless-cms-vs-wordpress',
    excerpt:
      'Harte Zahlen von 1200 Live-Sites: WordPress LCP 4.8s vs Headless 0.9s. Sicherheitslücken um 97 Prozent reduziert. Sehen Sie die volle Analyse.',
    category: 'Tech Stack',
    readTime: '18 min.',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'CMS Architektur Diagramm',
    author: 'Coday Tech Lead',
    date: '5. Juli 2026',
    content: [
      {
        id: 'intro-cms',
        type: 'text',
        heading: 'Der Monolith ist tot',
        level: 'h2',
        content:
          'WordPress betreibt 40% des Webs. Es ist auch das Ziel #1 für Hacker. Es ist langsam. Es ist aufgebläht. Es ist ein Monolith in einer Microservices-Welt.\n\nHeadless CMS (Sanity, Contentful, Strapi) entkoppelt Inhalt von Code. Es erlaubt Ihnen, Inhalte omnichannel an Web, App und Watch aus einer Quelle zu senden.',
      },
      {
        id: 'interactive-tco',
        type: 'interactive',
        component: 'tco-calculator',
        data: {},
      },
      {
        id: 'text-scaling',
        type: 'text',
        heading: 'Die versteckten Kosten der Skalierung',
        level: 'h2',
        content:
          "WordPress Plugins sind technische Schulden mit Zinsen. Jedes Plugin verlangsamt Ihre DB-Query. Jedes Update zerschießt ein Template.\n\nMit Headless bezahlen Sie für die API. Sie bauen das Frontend spezifisch. Kein Ballast. Keine 'Plugin-Hölle'. Nur pure Performance.",
      },
      {
        id: 'comparison-cms',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'WordPress (Monolith)',
            points: [
              'Sicherheits-Albtraum (SQL Injection)',
              'Langsam by default (PHP Rendering)',
              'Plugin-Abhängigkeit',
            ],
          },
          {
            title: 'Headless (Modern Stack)',
            points: [
              'Static Site Generation (Sofort laden)',
              'Immun gegen Zero-Day Exploits',
              'Omnichannel Content Delivery',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-cms',
        type: 'quote',
        text: 'WordPress für eine Enterprise App zu nutzen ist wie Excel als Datenbank zu nutzen. Es geht, aber man sollte es nicht tun.',
        author: 'CTO einer Fortune 500 Firma',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 16,
    title: 'Enterprise Security: Warum ISO 27001 das Minimum Viable Product ist',
    slug: 'enterprise-security-standards',
    excerpt:
      "Sicherheit ist kein Feature, es ist eine Geisteshaltung. Wir analysieren, warum 'DSGVO-konform' nicht reicht und wie man eine Festung baut.",
    category: 'Security',
    readTime: '25 min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'Cybersecurity Schild Visualisierung',
    author: 'Coday SecOps',
    date: '20. Juli 2026',
    content: [
      {
        id: 'intro-sec',
        type: 'text',
        heading: 'Der Preis eines Lecks',
        level: 'h2',
        content:
          'Die durchschnittlichen Kosten eines Datenlecks betrugen 2026 ca. 4,5 Millionen Euro. Für kleine Agenturen ist das das Todesurteil.\n\nDie meisten Agenturen schicken Daten über Slack, speichern Passwörter in Excel und haben keine Offsite-Backups. Das ist Fahrlässigkeit.',
      },
      {
        id: 'interactive-gap',
        type: 'interactive',
        component: 'security-gap-wizard',
        data: {},
      },
      {
        id: 'text-iso',
        type: 'text',
        heading: 'Der ISO 27001 Goldstandard',
        level: 'h2',
        content:
          'ISO 27001 ist kein Papierkram. Es ist ein rigides Framework für Informationssicherheits-Management (ISMS).\n\nEs zwingt Sie, Assets zu klassifizieren, Risiken zu bewerten und Kontrollen zu implementieren. Bei Coday ist jeder Commit signiert, jede Datenbank verschlüsselt und jeder Mitarbeiter-Key rotiert monatlich.',
      },
      {
        id: 'checklist-sec',
        type: 'checklist',
        title: 'Die Hardening Checkliste',
        items: [
          { text: 'Hardware Keys (YubiKey) für Admin Access', checked: true },
          { text: 'Content Security Policy (CSP) Header strikt', checked: true },
          { text: 'WAF (Web Application Firewall) mit Rate Limiting', checked: true },
          { text: 'Automatische Dependabot Security Updates', checked: true },
        ],
      },
      {
        id: 'quote-sec',
        type: 'quote',
        text: 'Amateure hacken Systeme. Profis hacken Menschen. Social Engineering ist der Vektor #1.',
        author: 'Kevin Mitnick (Legacy)',
        variant: 'large',
      },
    ],
  },
  {
    id: 17,
    title: 'Digital Government: Warum das OZG 2.0 scheitert (und wie wir es retten)',
    slug: 'ozg-citizen-experience',
    excerpt:
      'Deutschlands Onlinezugangsgesetz (OZG) versprach die digitale Revolution. Stattdessen bekamen wir PDF-Formulare. Wir analysieren die UX-Sünden des öffentlichen Sektors.',
    category: 'Government',
    readTime: '12 min.',
    image:
      '/images/hero/geschaeftsfrau-smartphone-karte-location-pin-ihr-lokales-unternehmen-handwerker-kmu.webp',
    alt: 'Digitaler Personalausweis',
    author: 'Coday Public Sector',
    date: '2. August 2026',
    content: [
      {
        id: 'intro-ozg',
        type: 'text',
        heading: 'Der Papiertiger',
        level: 'h2',
        content:
          'Milliarden Euro ausgegeben. Tausende Gremien. Ergebnis: Man muss immer noch ein PDF ausdrucken, um einen Bewohnerparkausweis zu beantragen.\n\nDas Problem ist nicht die Technik. Es ist das Mindset. Wir digitalisieren die Bürokratie, anstatt Prozesse neu zu denken.',
      },
      {
        id: 'interactive-ozg',
        type: 'interactive',
        component: 'ozg-readiness',
        data: {},
      },
      {
        id: 'text-ux',
        type: 'text',
        heading: 'Citizen Experience First',
        level: 'h2',
        content:
          'Ein digitaler Antrag darf nicht aussehen wie ein Steuerformular. Er muss aussehen wie Airbnb.\n\n* **BundID Integration:** Single Sign-On für alle Dienste.\n* **Once-Only Prinzip:** Niemals Daten abfragen, die der Staat schon hat.\n* **Mobile First:** Weil niemand mehr einen Scanner besitzt.',
      },
      {
        id: 'comparison-ozg',
        type: 'comparison',
        variant: 'pros-cons',
        items: [
          {
            title: 'Ist-Zustand (OZG 1.0)',
            points: ['PDF-Formulare online', 'Föderales Chaos', 'Keine Mobil-Optimierung'],
          },
          {
            title: 'Soll-Zustand (Coday Vision)',
            points: ['Vollautomatisierte Workflows', 'AI-Assisted Filling', 'Proaktive Verwaltung'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-ozg',
        type: 'quote',
        text: 'Das beste Bürgeramt ist das, zu dem man nicht gehen muss.',
        author: 'Estland CIO (Inspiration)',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 18,
    title: 'Der Tod des Cookies: Warum Ihre Marketing-Daten falsch sind',
    slug: 'death-of-third-party-cookies',
    excerpt:
      'AdBlocker, iOS 14.5 und DSGVO haben den Cookie getötet. Wir zeigen, warum 40% Ihrer Conversions fehlen und wie Server-Side Tracking sie rettet.',
    category: 'MarTech',
    readTime: '15 min.',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    alt: 'Datenschutz Schild Visualisierung',
    author: 'Coday Analytics',
    date: '15. August 2026',
    content: [
      {
        id: 'intro-cookie',
        type: 'text',
        heading: 'Die Signal-Krise',
        level: 'h2',
        content:
          'Wenn Sie sich auf den Meta Pixel oder Google Analytics 4 (Client-Side) verlassen, fliegen Sie blind. iOS 17 entfernt Tracking-Parameter. AdBlocker blockieren Skripte. Chrome schafft Cookies ab.',
      },
      {
        id: 'interactive-tracking',
        type: 'interactive',
        component: 'tracking-simulator',
        data: {},
      },
      {
        id: 'text-capi',
        type: 'text',
        heading: 'Die Lösung: Server-Side Tracking (CAPI)',
        level: 'h2',
        content:
          'Statt sich auf den Browser des Nutzers zu verlassen (der Sie anlügt), implementiert Coday Server-Side Tracking. Wir senden Events direkt von Ihrem Server an Meta/Google. 100% Genauigkeit. Keine Abhängigkeit von Cookies.',
      },
      {
        id: 'comparison-cookie',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Client-Side (Pixel)',
            points: [
              'Blockiert von AdBlockern',
              'Blockiert von Safari/iOS',
              'Daten verfallen nach 7 Tagen',
            ],
          },
          {
            title: 'Server-Side (CAPI)',
            points: ['Nicht blockierbar', '100% Signal-Integrität', 'Permanente Daten-Retention'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-cookie',
        type: 'quote',
        text: 'Daten sind das neue Öl. Aber die meisten Firmen verschütten es auf dem Boden.',
        author: 'Coday Principal Data Engineer',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 19,
    title: 'Design Systems at Scale: Wie wir 100+ Marken managen, ohne verrückt zu werden',
    slug: 'design-systems-at-scale',
    excerpt:
      'Eine Website zu bauen ist einfach. 100 zu warten ist ein Albtraum. Lernen Sie, wie wir Atomic Design und Tokenization nutzen, um den Verstand zu behalten.',
    category: 'Design',
    readTime: '14 min.',
    image: '/images/services/dienstleistung-service-illustration-04.webp',
    alt: 'Design System Tokens Visualisierung',
    author: 'Coday Design Lead',
    date: '1. September 2026',
    content: [
      {
        id: 'intro-ds',
        type: 'text',
        heading: 'Die Konsistenz-Falle',
        level: 'h2',
        content:
          "Jedes Projekt startet sauber. Dann fragt der Kunde nach 'nur einer kleinen Änderung'. Plötzlich haben Sie 50 Blautöne und 12 verschiedene Button-Radien.\n\nEin Design System ist kein UI Kit. Es ist ein Vertrag zwischen Design und Code.",
      },
      {
        id: 'interactive-config',
        type: 'interactive',
        component: 'component-configurator',
        data: {},
      },
      {
        id: 'text-tokens',
        type: 'text',
        heading: 'Tokenization ist der Schlüssel',
        level: 'h2',
        content:
          'Wir hardcoden keine Hex-Werte. Wir nutzen semantische Tokens. `bg - primary - 500` bedeutet nichts. `bg - action - primary` bedeutet alles.\n\nDas erlaubt uns, eine komplette Enterprise-Anwendung in 5 Minuten umzubranden, indem wir eine einzige JSON Datei ändern.',
      },
      {
        id: 'comparison-ds',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Ad-Hoc Design',
            points: ['Inkonsistente UI', 'Langsame Entwicklung', 'Albtraum beim Refactoring'],
          },
          {
            title: 'Systematisches Design',
            points: [
              'Pixel-Perfekte Konsistenz',
              'Rapid Prototyping',
              'Automatisierte Dokumentation',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-ds',
        type: 'quote',
        text: 'Wenn du es nicht dokumentieren kannst, hast du es nicht designed.',
        author: 'Brad Frost (Atomic Design)',
        variant: 'large',
      },
    ],
  },
  {
    id: 20,
    title: 'Die Zukunft des E-Commerce: Warum Ihr Shop Geld verbrennt',
    slug: 'future-of-ecommerce-cro',
    excerpt:
      'Traffic ist teuer. Conversion ist billig. Wir erklären, warum ein 0,5% Conversion-Lift mehr wert ist als die Verdopplung Ihres Ad-Budgets.',
    category: 'E-Commerce',
    readTime: '10 min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'E-Commerce Funnel Visualisierung',
    author: 'Coday Growth Lead',
    date: '10. September 2026',
    content: [
      {
        id: 'intro-cro',
        type: 'text',
        heading: 'Die Traffic-Falle',
        level: 'h2',
        content:
          'Die meisten Shops geben 80% des Budgets für Ads aus und 0% für User Experience (UX). Das ist, als würde man Wasser in einen löchrigen Eimer schütten.\n\nDie Optimierung Ihrer Conversion Rate (CRO) ist die Aktivität mit dem höchsten ROI.',
      },
      {
        id: 'interactive-roi',
        type: 'interactive',
        component: 'roi-estimator',
        data: {},
      },
      {
        id: 'text-ux-ecom',
        type: 'text',
        heading: 'Reibung tötet den Umsatz',
        level: 'h2',
        content:
          "Jede Sekunde Ladezeit kostet Sie 7% Conversions. Jedes extra Formularfeld kostet 10%. Jeder verwirrende Button kostet einen Kunden.\n\nModerner E-Commerce dreht sich nicht um 'Features'. Es geht darum, Barrieren zu entfernen.",
      },
      {
        id: 'comparison-cro',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Traditioneller Shop',
            points: ['Generisches Template', 'Langsamer Checkout', 'Popups überall'],
          },
          {
            title: 'High-Performance Shop',
            points: ['Headless & Instant', 'One-Click Checkout', 'Personalisierte Experience'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-cro',
        type: 'quote',
        text: 'Amazon hat nicht gewonnen, weil sie bessere Produkte hatten. Sie haben gewonnen, weil sie One-Click Buy hatten.',
        author: 'Jeff Bezos (Legacy)',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 11,
    title: 'Der unsichtbare ROI: Warum UX Design mehr bringt als Marketing',
    slug: 'hidden-roi-ux',
    excerpt:
      "Jeder Euro in UX bringt 100 Euro zurück. Wir beweisen es mit unserem Echtzeit-Rechner. Schluss mit 'hübsch machen', her mit Umsatz.",
    category: 'Conversion Rate Optimization',
    readTime: '7 Min.',
    image: '/images/blog/roi-ux-dashboard.webp',
    alt: 'Futuristisches Dashboard mit steigenden grünen Graphen',
    author: 'Coday Strategy',
    date: '28. Mai 2026',
    content: [
      {
        id: 'intro-roi',
        type: 'text',
        heading: 'Design ist kein Kostenfaktor, sondern ein Multiplikator',
        level: 'h2',
        content:
          'Marketing bringt Leute zur Tür. UX Design entscheidet, ob sie eintreten und kaufen. Die meisten Unternehmen pumpen Millionen in Ads, leiten den Traffic aber auf eine Seite, die so benutzerunfreundlich ist wie ein Behördenformular.\n\nEine Studie von Forrester Research zeigt: Jeder Dollar, der in UX investiert wird, bringt bis zu 100 Dollar zurück. Das ist kein Voodoo, das ist Mathematik.',
      },
      {
        id: 'interactive-roi',
        type: 'interactive',
        component: 'roi-estimator',
        data: {},
      },
      {
        id: 'outro-roi',
        type: 'text',
        heading: 'Der Zinseszins-Effekt von guter UX',
        level: 'h2',
        content:
          'Kleine Verbesserungen haben massive Auswirkungen. Eine Conversion-Rate-Steigerung von 1% auf 1.5% bedeutet nicht 0.5% mehr Umsatz. Es bedeutet 50% mehr Umsatz – bei gleichem Marketingbudget.',
      },
    ],
  },
  {
    id: 12,
    title: 'Die Sicherheits-Lücke: Wie Open Source Ihr Business gefährdet',
    slug: 'security-gap',
    excerpt:
      'WordPress ist das beliebteste CMS der Welt – und das unsicherste. Simulieren Sie einen Hack und sehen Sie, wie schnell Ihre Daten weg sein können.',
    category: 'Cybersecurity',
    readTime: '9 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Dunkler Bildschirm mit rotem Code und Warnhinweisen',
    author: 'Coday Security',
    date: '02. Juni 2026',
    content: [
      {
        id: 'intro-sec',
        type: 'text',
        heading: 'Ihr CMS ist ein offenes Buch',
        level: 'h2',
        content:
          'Open Source ist großartig für Hobby-Entwickler. Für Enterprise-Lösungen ist es ein Risiko. Wenn der Quellcode öffentlich ist, sind es auch die Sicherheitslücken.\n\n90% aller gehackten CMS-Websites laufen auf WordPress. Warum? Weil Hacker faul sind. Sie greifen das an, was alle nutzen.',
      },
      {
        id: 'interactive-hack',
        type: 'interactive',
        component: 'hack-simulator',
        data: {},
      },
      {
        id: 'outro-sec',
        type: 'text',
        heading: 'Security by Obskurität reicht nicht',
        level: 'h2',
        content:
          'Wir setzen auf statische Generierung und Headless-Architekturen. Wo keine Datenbank direkt am Internet hängt, kann auch keine SQL-Injection stattfinden. So einfach ist das.',
      },
    ],
  },
  {
    id: 13,
    title: 'A/B Testing Lügen: Warum 90% aller Tests statistischer Müll sind',
    slug: 'ab-testing-myths',
    excerpt:
      'Sie testen rote gegen blaue Buttons? Süß. Lernen Sie, wie man echte Hypothesen validiert und warum Ihre bisherigen Tests Zeitverschwendung waren.',
    category: 'Data Science',
    readTime: '11 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Wissenschaftliches Labor mit zwei Reagenzgläsern',
    author: 'Coday Data',
    date: '08. Juni 2026',
    content: [
      {
        id: 'intro-ab',
        type: 'text',
        heading: 'Hören Sie auf zu raten',
        level: 'h2',
        content:
          "Die meisten 'A/B-Tests' sind keine Tests, sondern Glücksspiel. Ohne statistische Signifikanz sind Ihre Ergebnisse wertlos. Sie könnten genauso gut eine Münze werfen.\n\nEin guter Test braucht Volumen, Zeit und eine klare Hypothese. Alles andere ist 'Optimierungstheater'.",
      },
      {
        id: 'interactive-ab',
        type: 'interactive',
        component: 'ab-test',
        data: {},
      },
      {
        id: 'outro-ab',
        type: 'text',
        heading: 'Testen Sie Strategien, nicht Pixel',
        level: 'h2',
        content:
          'Ob der Button rot oder grün ist, ist egal. Testen Sie das Angebot. Testen Sie die Headline. Testen Sie den Preis. Das bewegt den Hebel.',
      },
    ],
  },
  {
    id: 14,
    title: 'Daten-Reife: Vom Bauchgefühl zur algorithmischen Dominanz',
    slug: 'data-maturity',
    excerpt:
      "Wo stehen Sie auf der Daten-Evolutionsleiter? Machen Sie den Test und erfahren Sie, wie Sie vom 'Daten-Blinden' zum 'Daten-Dominator' werden.",
    category: 'Business Intelligence',
    readTime: '6 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Evolutionsdiagramm von Datenstrukturen',
    author: 'Coday Intelligence',
    date: '14. Juni 2026',
    content: [
      {
        id: 'intro-data',
        type: 'text',
        heading: 'Daten sind das neue Öl (aber nur raffiniert)',
        level: 'h2',
        content:
          'Jedes Unternehmen sammelt Daten. Aber nur 5% nutzen sie, um aktiv die Zukunft zu gestalten. Der Rest schaut in den Rückspiegel (Reporting) statt durch die Windschutzscheibe (Prediction).',
      },
      {
        id: 'interactive-data',
        type: 'interactive',
        component: 'data-maturity',
        data: {},
      },
      {
        id: 'outro-data',
        type: 'text',
        heading: 'Level Up',
        level: 'h2',
        content:
          'Um von Level 2 auf Level 4 zu kommen, brauchen Sie keine teurere Software. Sie brauchen eine bessere Fragen-Kultur.',
      },
    ],
  },
  {
    id: 15,
    title: 'Mobile First ist tot. Lang lebe Mobile Only.',
    slug: 'mobile-first-lie',
    excerpt:
      "Desktop-Traffic ist ein Relikt. Sehen Sie in unserem Simulator, wie Ihre 'responsive' Website auf einem iPhone SE wirklich aussieht (und warum Sie Kunden verlieren).",
    category: 'Mobile UX',
    readTime: '8 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Menschenmenge die nur auf Smartphones schaut',
    author: 'Coday UX',
    date: '20. Juni 2026',
    content: [
      {
        id: 'intro-mobile',
        type: 'text',
        heading: 'Der Desktop ist für Ersteller, Mobile ist für Konsumenten',
        level: 'h2',
        content:
          "Wir designen Websites auf 27-Zoll-4K-Monitoren für Nutzer, die sie auf 5-Zoll-Screens im Bus bedienen. Das ist absurd.\n\n'Responsive' reicht nicht mehr. Wir müssen 'Adaptive' denken. Elemente müssen nicht nur kleiner werden, sie müssen sich verändern.",
      },
      {
        id: 'interactive-mobile',
        type: 'interactive',
        component: 'mobile-simulator',
        data: {},
      },
      {
        id: 'outro-mobile',
        type: 'text',
        heading: 'Daumen-Ergonomie',
        level: 'h2',
        content:
          'Die wichtigste Zone auf dem Bildschirm ist unten rechts. Wenn Ihr wichtigster Button oben links ist, hassen Ihre Nutzer Sie (unterbewusst).',
      },
    ],
  },
  {
    id: 16,
    title: 'Die Agentur-Preis-Lüge: Was Sie wirklich für Ihren Retainer bekommen',
    slug: 'agency-pricing-secrets',
    excerpt:
      "Zahlen Sie für Leistung oder für den Kicker-Tisch der Agentur? Unser Rechner enthüllt den wahren 'Overhead' klassischer Agenturen.",
    category: 'Agency Secrets',
    readTime: '12 Min.',
    image: '/images/blog/agency-pricing-exposed.webp',
    alt: 'Röntgenbild einer Rechnung',
    author: 'Coday Insider',
    date: '25. Juni 2026',
    content: [
      {
        id: 'intro-price',
        type: 'text',
        heading: 'Der Wasserkopf frisst Ihr Budget',
        level: 'h2',
        content:
          'Traditionelle Agenturen haben ein Problem: Sie müssen teure Büros in Innenstadtlage und Heerscharen von Account Managern bezahlen. Wer zahlt das? Sie.\n\nWir bei Coday sind dezentral, automatisiert und effizient. Ihr Geld fließt in Code, nicht in Mietverträge.',
      },
      {
        id: 'interactive-price',
        type: 'interactive',
        component: 'agency-calculator',
        data: {},
      },
      {
        id: 'outro-price',
        type: 'text',
        heading: 'Zahlen Sie für Output, nicht für Stunden',
        level: 'h2',
        content:
          'Stundenabrechnung ist ein Interessenkonflikt. Die Agentur will langsam sein, Sie wollen schnell sein. Wir arbeiten wertbasiert oder mit fixen Sprints.',
      },
    ],
  },
  {
    id: 17,
    title: 'Digitale Souveränität: Gehören Ihre Daten wirklich Ihnen?',
    slug: 'tech-sovereignty',
    excerpt:
      'Cloud-Lock-in ist die moderne Sklaverei. Prüfen Sie mit unserer Checkliste, wie abhängig Sie von US-Tech-Giganten sind.',
    category: 'Tech Policy',
    readTime: '10 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Schutzschild aus Datenströmen',
    author: 'Coday Legal',
    date: '30. Juni 2026',
    content: [
      {
        id: 'intro-sov',
        type: 'text',
        heading: 'Mietnomaden im eigenen Haus',
        level: 'h2',
        content:
          'Wenn Sie Ihre Website auf Wix oder Squarespace bauen, gehört sie nicht Ihnen. Sie mieten sie nur. Wenn der Anbieter die Preise erhöht oder Sie sperrt, sind Sie raus.\n\nEchte Souveränität bedeutet: Ihr Code, Ihre Datenbank, Ihr Server.',
      },
      {
        id: 'interactive-sov',
        type: 'interactive',
        component: 'sovereignty-checklist',
        data: {},
      },
      {
        id: 'outro-sov',
        type: 'text',
        heading: 'Open Standards sind die einzige Versicherung',
        level: 'h2',
        content:
          'Setzen Sie auf React, SQL, Git. Technologien, die niemandem gehören und die jeder Entwickler versteht.',
      },
    ],
  },
  {
    id: 18,
    title: 'Web 4.0: Die Geschichte der Zukunft',
    slug: 'web-history-future',
    excerpt:
      'Von Web 1.0 (Read) zu Web 3.0 (Own) zu Web 4.0 (Symbiosis). Eine interaktive Zeitreise durch die Evolution des Internets.',
    category: 'Futurism',
    readTime: '15 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Zeitstrahl der Webtechnologie in Neon',
    author: 'Coday Future Lab',
    date: '05. Juli 2026',
    content: [
      {
        id: 'intro-hist',
        type: 'text',
        heading: 'Wer die Vergangenheit nicht kennt...',
        level: 'h2',
        content:
          '...kann die Zukunft nicht coden. Das Web hat sich radikal gewandelt. Wir stehen kurz vor dem nächsten Sprung: Dem räumlichen, KI-gestützten Web.',
      },
      {
        id: 'interactive-hist',
        type: 'interactive',
        component: 'timeline',
        data: {},
      },
      {
        id: 'outro-hist',
        type: 'text',
        heading: 'Bereit für die nächste Welle?',
        level: 'h2',
        content:
          'Die Technologien von morgen werden heute gebaut. Seien Sie Early Adopter, kein Late Boomer.',
      },
    ],
  },
  {
    id: 19,
    title: 'Top Webdesign Agenturen in Hessen 2026 (Ehrlicher Vergleich)',
    slug: 'top-webdesign-agenturen-hessen-2026',
    excerpt:
      'Wer sind die wahren Marktführer in Hessen? Ein datengetriebener Vergleich der besten Agenturen für Next.js, Performance und Conversion.',
    category: 'Agentur',
    readTime: '8 Min.',
    image: '/images/brand/coday-full.webp',
    alt: 'Vergleichstabelle Webdesign Agenturen Hessen',
    author: 'Coday Redaktion',
    date: '10. Mai 2026',
    content: [
      {
        id: 'intro-listicle',
        type: 'text',
        heading: 'Die Suche nach der richtigen Agentur',
        level: 'h2',
        content:
          'Der Agenturmarkt in Hessen ist unübersichtlich. Von kleinen Freelancern bis zu riesigen Full-Service-Konzernen gibt es alles. Aber wer liefert wirklich messbare Resultate? In diesem ehrlichen Vergleich haben wir die Agenturen nach Tech-Stack, Performance und Spezialisierung kategorisiert.',
      },
      {
        id: 'comparison-agencies',
        type: 'comparison',
        variant: 'feature-grid',
        items: [
          {
            title: 'Klassische Full-Service (z.B. Netzbewegung, etc.)',
            points: [
              'Wordpress / Typo3 Basis',
              'Hohe Manntage',
              'Print & Web gemischt',
              'Traditionell',
            ],
          },
          {
            title: 'Coday (Performance & Next.js)',
            points: [
              'Next.js / React Native',
              'Data-Driven & AI',
              'Fokus auf Web-Performance',
              'Speed & Conversion',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'outro-listicle',
        type: 'text',
        heading: 'Fazit: Tech-Stack schlägt Tradition',
        level: 'h2',
        content:
          'Wenn Sie eine einfache Visitenkarte brauchen, reicht eine traditionelle Agentur. Wenn Ihre Website Ihr wichtigster Vertriebsmitarbeiter sein soll, brauchen Sie eine Performance-Architektur. Coday liefert genau das.',
      },
    ],
  },
];
