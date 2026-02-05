import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Die 5 größten Fehler im Webdesign",
        slug: "die-5-groessten-fehler-im-webdesign",
        excerpt: "Viele Unternehmen verbrennen Geld mit Websites, die zwar schön aussehen, aber nicht konvertieren. Hier ist warum.",
        category: "Webdesign",
        readTime: "5 Min.",
        image: "/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.jpeg",
        alt: "Website Builder Interface mit Drag & Drop Elementen",
        author: "Coday Team",
        date: "14. März 2026",
        content: [
            {
                id: "b1-1",
                type: "text",
                heading: "1. Fehlende Mobile Optimierung",
                level: "h2",
                content: "Über 60% des Traffics kommt heute über mobile Endgeräte. Eine Seite, die auf dem Smartphone nicht funktioniert, verliert den Großteil ihrer potenziellen Kunden noch bevor diese überhaupt den ersten Satz gelesen haben."
            },
            {
                id: "b1-2",
                type: "text",
                heading: "2. Unklare Call-to-Actions (CTAs)",
                level: "h2",
                content: "Der Besucher muss zu jeder Zeit wissen, was er als Nächstes tun soll. 'Hier klicken' reicht nicht. Nutzen Sie handlungsorientierte Aufforderungen wie 'Jetzt kostenloses Erstgespräch vereinbaren'."
            },
            {
                id: "b1-cta-1",
                type: "cta",
                title: "Lassen Sie Ihre Website auditieren",
                description: "Finden Sie heraus, wo Sie Kunden verlieren.",
                buttonText: "Kostenlosen Audit buchen",
                href: "/contact",
                variant: "primary"
            },
            {
                id: "b1-3",
                type: "text",
                heading: "3. Zu lange Ladezeiten",
                level: "h2",
                content: "Jede Sekunde Ladezeit kostet Sie 7% Conversion Rate. Optimieren Sie Bilder, nutzen Sie Caching und modernes Hosting, um blitzschnelle Erlebnisse zu garantieren."
            }
        ]
    },
    {
        id: 2,
        title: "Daten lügen nicht: Business Intelligence",
        slug: "daten-luegen-nicht-business-intelligence",
        excerpt: "Wie Sie mit korrekter Datenanalyse Ihre Entscheidungsprozesse revolutionieren und den Markt verstehen.",
        category: "Analytics",
        readTime: "7 Min.",
        image: "/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.jpeg",
        alt: "Business Intelligence Dashboard mit Analysen",
        author: "Analytics Lead",
        date: "10. März 2026",
        content: [
            {
                id: "b2-1",
                type: "text",
                heading: "Daten als Gold des 21. Jahrhunderts",
                level: "h2",
                content: "Ohne Daten fliegen Sie blind. Business Intelligence Tools helfen Ihnen, Muster zu erkennen, Kundenverhalten vorherzusagen und Budgets dort einzusetzen, wo sie den meisten ROI bringen."
            },
            {
                id: "b2-quote-1",
                type: "quote",
                text: "Wer nicht misst, kann nicht managen.",
                author: "Peter Drucker",
                variant: "gradient"
            },
            {
                id: "b2-2",
                type: "text",
                heading: "Reporting vs. Analyse",
                level: "h2",
                content: "Ein Report sagt Ihnen, was passiert ist. Eine Analyse sagt Ihnen, warum es passiert ist und was Sie tun können, um es zu wiederholen oder zu vermeiden."
            }
        ]
    },
    {
        id: 3,
        title: "Der perfekte Omni-Channel Mix",
        slug: "der-perfekte-omni-channel-mix",
        excerpt: "Warum Sie Ihre Kunden überall dort abholen müssen, wo sie sich aufhalten – und wie das effizient geht.",
        category: "Strategie",
        readTime: "6 Min.",
        image: "/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.jpeg",
        alt: "Vernetzte Omnichannel Marketing Strategie",
        author: "Strategy Director",
        date: "05. März 2026",
        content: [
            {
                id: "b3-1",
                type: "text",
                heading: "Konsistenz ist King",
                level: "h2",
                content: "Ihre Marke muss auf Instagram genauso aussehen und klingen wie auf LinkedIn oder Ihrer Website. Ein Bruch in der Kommunikation verwirrt den Kunden und senkt das Vertrauen."
            },
            {
                id: "b3-img-1",
                type: "image",
                src: "/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.jpeg",
                alt: "Omnichannel Diagramm",
                caption: "Ein integrierter Ansatz über alle Kanäle",
                layout: "wide"
            }
        ]
    },
    {
        id: 4,
        title: "Social Media Secrets 2026",
        slug: "social-media-secrets-2026",
        excerpt: "Algorithmus-Updates, Content-Trends und wie man organische Reichweite heute noch aufbaut.",
        category: "Social Media",
        readTime: "4 Min.",
        image: "/images/marketing/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.jpeg",
        alt: "Social Media Feed auf dem Smartphone",
        author: "Social Media Manager",
        date: "28. Februar 2026",
        content: [
            {
                id: "b4-1",
                type: "text",
                heading: "Video First",
                level: "h2",
                content: "Statische Bilder haben kaum noch organische Reichweite. Short-Form Video Content (Reels, TikToks, Shorts) ist der einzige Weg, um heute noch viral zu gehen ohne Ad-Budget."
            }
        ]
    },
    {
        id: 5,
        title: "Email Marketing Automation",
        slug: "email-marketing-automation",
        excerpt: "Der unterschätzte Umsatz-Hebel: Wie Sie Bestandskunden automatisiert zu Fans machen.",
        category: "Marketing",
        readTime: "5 Min.",
        image: "/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.jpeg",
        alt: "E-Mail Marketing Kampagnen Planung",
        author: "CRM Expert",
        date: "20. Februar 2026",
        content: [
            {
                id: "b5-1",
                type: "text",
                heading: "Personalisierung statt Gießkanne",
                level: "h2",
                content: "Niemand liest mehr generische Newsletter. Nutzen Sie Tags und Segmente, um jedem Abonnenten genau die Inhalte zu schicken, die ihn interessieren."
            }
        ]
    },
    {
        id: 6,
        title: "Video Content Excellence",
        slug: "video-content-excellence",
        excerpt: "Warum Video King ist und wie Sie auch ohne Hollywood-Budget professionell produzieren.",
        category: "Content",
        readTime: "8 Min.",
        image: "/images/marketing/video-content-streaming-plattform-play-button-multimedia.jpeg",
        alt: "Video Content und Streaming Plattform",
        author: "Creative Director",
        date: "15. Februar 2026",
        content: [
            {
                id: "b6-1",
                type: "text",
                heading: "Authentizität schlägt Perfektion",
                level: "h2",
                content: "Hochglanz-Imagefilme werden oft ignoriert. Authentische Einblicke, Behind-the-Scenes und ehrliche Experten-Talks bauen viel schneller Vertrauen auf."
            }
        ]
    },
    {
        id: 7,
        title: "Warum 'Standard' Websites tot sind",
        slug: "warum-standard-websites-tot-sind",
        excerpt: "Die Ära der Hyper-Performance hat begonnen. Wer nicht schnell ist, verliert.",
        category: "Tech",
        readTime: "8 Min.",
        image: "/images/marketing/digital-transformation-zeitung-zu-smartphone-social-media-werbung-evolution.jpeg",
        alt: "Digitale Transformation",
        author: "CTO",
        date: "01.04.2026",
        content: [
            {
                id: "b7-1",
                type: "text",
                heading: "Performance ist ein Feature",
                level: "h2",
                content: "Google bestraft langsame Seiten gnadenlos. Nutzer sind noch härter. Performance ist heute kein technisches Detail mehr, sondern ein zentrales Produkt-Feature."
            },
            {
                id: "b7-code-1",
                type: "code",
                language: "javascript",
                filename: "lazy-loading.js",
                code: `// Modernes Lazy Loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
});`
            }
        ]
    }
];

