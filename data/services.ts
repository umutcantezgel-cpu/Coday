import { ReactNode } from 'react';

export interface ServiceData {
    title: string;
    description: string;
    icon: string;
    slug: string;
    category: string;
    longDescription?: string;
    benefits: string[];
    processSteps?: { number: string; title: string; description: string }[];
    advantages?: { title: string; description: string; icon: string }[];
    testimonials?: { company: string; name: string; role: string; text: string }[];
    faqs?: { question: string; answer: string }[];
}

const techProcess = [
    {
        number: "01",
        title: "Discovery & Architektur",
        description: "Wir analysieren Ihre Anforderungen, wählen den optimalen Tech-Stack (Next.js, Node.js, Supabase) und entwerfen eine skalierbare Systemarchitektur."
    },
    {
        number: "02",
        title: "UX/UI Design Phase",
        description: "Bevor wir eine Zeile Code schreiben, visualisieren wir das Nutzererlebnis. Wireframes, Prototypen und High-Fidelity Designs sorgen für Klarheit."
    },
    {
        number: "03",
        title: "Agile Entwicklung",
        description: "Wir entwickeln in kurzen Sprints mit regelmäßigen Updates. Sie sehen den Fortschritt live und können frühzeitig Feedback geben."
    },
    {
        number: "04",
        title: "Quality Assurance",
        description: "Automatisierte Tests, Code Reviews und Performance-Audits stellen sicher, dass Ihre Anwendung fehlerfrei und blitzschnell läuft."
    },
    {
        number: "05",
        title: "Deployment & Scaling",
        description: "Wir bringen Ihre Anwendung live (Vercel/AWS) und sorgen für das nötige Monitoring, damit sie auch bei hohen Nutzerzahlen stabil bleibt."
    }
];

const designProcess = [
    {
        number: "01",
        title: "Research & Strategy",
        description: "Wir verstehen Ihre Marke, Ihre Nutzer und Ihre Ziele. Wir analysieren Wettbewerber und definieren die visuelle Stoßrichtung."
    },
    {
        number: "02",
        title: "Wireframing & UX",
        description: "Wir entwickeln die Struktur und den Flow Ihrer Website. Fokus liegt auf Usability und Conversion-Rate-Optimierung."
    },
    {
        number: "03",
        title: "Visual Design (UI)",
        description: "Wir gestalten das Interface mit modernsten Tools (Figma). Pixelperfekt, ästhetisch und im Einklang mit Ihrem Branding."
    },
    {
        number: "04",
        title: "Prototyping & Animation",
        description: "Wir erwecken das Design zum Leben. Interaktive Prototypen und Micro-Animations zeigen, wie sich die Seite anfühlen wird."
    },
    {
        number: "05",
        title: "Design System & Handoff",
        description: "Wir dokumentieren alle Komponenten in einem Design System und bereiten alles für die nahtlose Entwicklung vor."
    }
];

const techAdvantages = [
    {
        title: "High Performance",
        description: "Ladezeiten unter 1 Sekunde und perfekter Lighthouse Score sind unser Standard, nicht das Ziel.",
        icon: "speed"
    },
    {
        title: "Scalability First",
        description: "Wir bauen Architekturen, die mit Ihrem Erfolg wachsen. Von 100 bis 100.000 Nutzern ohne Neuentwicklung.",
        icon: "trending_up"
    },
    {
        title: "Modern Tech Stack",
        description: "Wir setzen auf Next.js, React, TypeScript und Tailwind – den Goldstandard der modernen Webentwicklung.",
        icon: "code"
    },
    {
        title: "Security by Design",
        description: "Sicherheit ist kein Feature, sondern Basis. DSGVO-konform, verschlüsselt und sicher vor Bedrohungen.",
        icon: "security"
    },
    {
        title: "Transparenter Code",
        description: "Kein Vendor-Lock-in. Sie erhalten sauberen, gut dokumentierten Code, der Ihnen gehört.",
        icon: "lock_open"
    },
    {
        title: "Erfahrenes Team",
        description: "Ihr Projekt wird von Senior-Entwicklern umgesetzt, die komplexe Herausforderungen lieben.",
        icon: "groups"
    }
];

const designAdvantages = [
    {
        title: "User-Centric",
        description: "Design, das funktioniert. Wir stellen den Nutzer in den Mittelpunkt für intuitive Erlebnisse.",
        icon: "person"
    },
    {
        title: "Modern Aesthetics",
        description: "Wir gestalten Interfaces, die begeistern. State-of-the-Art Design, das Ihre Marke premium positioniert.",
        icon: "palette"
    },
    {
        title: "Conversion-Optimized",
        description: "Schönheit allein reicht nicht. Unsere Designs führen den Nutzer gezielt zur Handlung.",
        icon: "ads_click"
    },
    {
        title: "Responsive First",
        description: "Perfekte Darstellung auf allen Geräten. Vom Smartphone bis zum 4K Monitor.",
        icon: "devices"
    },
    {
        title: "Design Systems",
        description: "Konsistenz und Skalierbarkeit durch modulare Design-Systeme.",
        icon: "widgets"
    },
    {
        title: "Motion Design",
        description: "Interaktion und Feedback durch subtile Animationen werten das Erlebnis auf.",
        icon: "animation"
    }
];

const techTestimonials = [
    {
        company: "Trobolo GmbH",
        name: "Malek Arab",
        role: "Geschäftsführer",
        text: "Top Performance und sehr hohe technische Kompetenz in Sachen WordPress Entwicklung und Webhosting. Wir sind zu 100% zufrieden."
    },
    {
        company: "Automate365 GmbH",
        name: "Andreas Ahlert",
        role: "Geschäftsführer",
        text: "Coday hat unsere Website auf das nächste Level gehoben! Mit einem Auge fürs Detail und Verständnis für neueste Trends."
    },
    {
        company: "Licht Technik GmbH",
        name: "Niklas Bünning",
        role: "QM & Vertrieb",
        text: "Das Performance Hosting für die neue Webseite läuft stabil und bietet gute Ladezeiten. Die Webseite wird zuverlässig Full-Service gewartet."
    },
    {
        company: "Q-SURE projects GmbH",
        name: "Felix Faustmann",
        role: "Geschäftsführer",
        text: "Sehr gute Zusammenarbeit, sehr gutes Ergebnis. Auch nach dem Go-Live war der Support hervorragend."
    }
];

const standardFaqs = [
    {
        question: "Welchen Tech-Stack nutzt ihr?",
        answer: "Wir setzen primär auf Next.js, React, TypeScript und Tailwind CSS. Für Datenbanken nutzen wir Supabase (PostgreSQL) und für CMS-Lösungen headless Systeme wie Sanity oder Strapi."
    },
    {
        question: "Wie lange dauert ein Web-Projekt?",
        answer: "Das hängt stark vom Umfang ab. Eine Corporate Website dauert ca. 4-8 Wochen, komplexere Web-Apps oder E-Commerce Lösungen 3-6 Monate."
    },
    {
        question: "Bietet ihr auch Hosting an?",
        answer: "Wir setzen Hosting-Infrastrukturen auf (meist Vercel oder AWS), die auf Ihren Namen laufen. Wir kümmern uns um das Setup, die Wartung und Skalierung."
    },
    {
        question: "Was kostet eine Website bei euch?",
        answer: "Unsere Projekte starten typischerweise ab 10.000€. Für komplexe Web-Apps oder Shops liegen wir meist zwischen 25.000€ und 50.000€."
    }
];

export const servicesData: Record<string, Record<string, ServiceData>> = {
    "web-development": {
        "react-nextjs-agentur": {
            category: "Web Development",
            slug: "react-nextjs-agentur",
            icon: "code",
            title: "React & Next.js Entwicklung",
            description: "Wir bauen skalierbare Frontends mit modernsten Frameworks für maximale Performance und User Experience.",
            longDescription: "In der modernen Webentwicklung sind Geschwindigkeit und Benutzerfreundlichkeit entscheidend. Mit React und Next.js setzen wir auf den Industriestandard für performante, skalierbare und wartbare Webanwendungen. Wir entwickeln maßgeschneiderte Lösungen, die technische Exzellenz mit herausragendem Design verbinden.",
            benefits: ["Blitzschnelle Ladezeiten", "SEO-optimiertes Server-Side Rendering", "Skalierbare Komponentenarchitektur", "Zukunftssichere Technologie"],
            processSteps: techProcess,
            advantages: techAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        },
        "e-commerce-shops": {
            category: "Web Development",
            slug: "e-commerce-shops",
            icon: "shopping_cart",
            title: "E-Commerce & Shops",
            description: "High-Performance Online-Shops mit Shopify oder Custom Headless Lösungen für maximale Conversion.",
            longDescription: "Wir entwickeln Online-Shops, die nicht nur gut aussehen, sondern verkaufen. Ob Shopify Plus oder Headless Commerce mit Shopify Hydrogen – wir bauen Einkaufserlebnisse, die Ihre Kunden lieben und Ihren Umsatz steigern.",
            benefits: ["Optimierter Checkout-Funnel", "Headless Commerce Architektur", "ERP-Integration", "High-Performance Frontend"],
            processSteps: techProcess,
            advantages: techAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        },
        "full-stack-entwicklung": {
            category: "Web Development",
            slug: "full-stack-entwicklung",
            icon: "layers",
            title: "Full-Stack Web-Apps",
            description: "Robuste Backends und APIs mit Node.js, TypeScript und Edge-Computing Lösungen.",
            longDescription: "Ein starkes Frontend braucht ein leistungsfähiges Backend. Wir entwickeln sichere und skalierbare Server-Architekturen, APIs und Datenbanken, die das Rückgrat Ihrer digitalen Produkte bilden.",
            benefits: ["Hochperformante APIs", "Sichere Datenverarbeitung", "Echtzeit-Funktionalitäten", "Nahtlose Integrationen"],
            processSteps: techProcess,
            advantages: techAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        },
        "cloud-infrastructure": {
            category: "Web Development",
            slug: "cloud-infrastructure",
            icon: "cloud",
            title: "Cloud Infrastructure",
            description: "High-Performance Hosting und Deployment auf Vercel oder AWS für globale Verfügbarkeit.",
            longDescription: "Die richtige Cloud-Strategie entscheidet über Geschwindigkeit und Verfügbarkeit. Wir setzen auf Serverless-Architekturen und Edge-Networks, um Ihre Inhalte weltweit in Millisekunden auszuliefern.",
            benefits: ["Globale Verfügbarkeit", "Automatische Skalierung", "DDoS-Schutz", "Kosteneffiziente Architektur"],
            processSteps: techProcess,
            advantages: techAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        }
    },
    "web-design": {
        "ux-ui-design": {
            category: "Web Design",
            slug: "ux-ui-design",
            icon: "palette",
            title: "UX/UI Design",
            description: "Markenerlebnis im Digitalen. Nutzerzentriertes Design, das Ihre Marke erlebbar macht.",
            longDescription: "Ihre digitale Präsenz ist oft der erste Kontaktpunkt. Wir übertragen Ihre Marke in digitale Interfaces, die nicht nur funktional sind, sondern Ihre Markenidentität bei jedem Klick spürbar machen.",
            benefits: ["Markenkonforme Interfaces", "Intuitive User Journeys", "Emotionale digitale Erlebnisse", "Conversion-fokussiert"],
            processSteps: designProcess,
            advantages: designAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        },
        "design-systems": {
            category: "Web Design",
            slug: "design-systems",
            icon: "widgets",
            title: "Design Systems",
            description: "Konsistente Komponenten-Bibliotheken für skalierbare Produkte und schnelle Entwicklung.",
            longDescription: "Ein Design System ist die Single Source of Truth für Ihr Produkt. Wir entwickeln modulare Komponentensysteme, die Konsistenz sichern und die Entwicklung beschleunigen.",
            benefits: ["Konsistente UI", "Schnellere Entwicklung", "Vereinfachte Wartung", "Skalierbarkeit"],
            processSteps: designProcess,
            advantages: designAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        },
        "website-relaunch": {
            category: "Web Design",
            slug: "website-relaunch",
            icon: "rocket",
            title: "Website Relaunch",
            description: "Von der Strategie bis zum neuen Design. Wir modernisieren Ihre Webpräsenz grundlegend.",
            longDescription: "Veraltete Websites kosten Umsatz und Reputation. Wir begleiten Ihren Relaunch ganzheitlich: Strategie, UX-Konzept, Design und technische Umsetzung aus einer Hand.",
            benefits: ["Modernes Look & Feel", "Optimierte User Experience", "Mobile First", "SEO-Relaunch-Begleitung"],
            processSteps: designProcess,
            advantages: designAdvantages,
            testimonials: techTestimonials,
            faqs: standardFaqs
        }
    }
};
