export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    thumbnail: string;
    heroImage: string;
    stats: {
        label: string;
        value: string;
    }[];
    challenge: {
        title: string;
        description: string;
        list: string[];
        quote?: {
            text: string;
            author: string;
        }
    };
    approach: {
        title: string;
        description: string;
        steps: {
            title: string;
            description: string;
        }[];
    };
    solution: {
        title: string;
        description: string;
        images: string[];
    };
    results: {
        title: string;
        description: string;
        metrics: {
            label: string;
            value: string;
            change: string;
        }[];
    };
}

export const workData: Record<string, Project> = {
    "fintech-platform": {
        slug: "fintech-platform",
        title: "FinTech Platform",
        subtitle: "Next.js Banking Dashboard",
        category: "Web Development",
        thumbnail: "account_balance",
        heroImage: "bg-surface-dark",
        stats: [
            { label: "Branche", value: "FinTech" },
            { label: "Tech Stack", value: "Next.js / Node" },
            { label: "Dauer", value: "3 Monate" }
        ],
        challenge: {
            title: "Die Herausforderung",
            description: "Ein Legacy-Bankensystem musste in eine moderne, schnelle Web-Applikation transformiert werden. Sicherheit, Performance und Echtzeit-Daten waren kritisch.",
            list: [
                "Veraltete Java-Architektur ablösen",
                "Echtzeit-Updates für Transaktionen",
                "Höchste Sicherheitsstandards (Banken-Level)"
            ],
            quote: {
                text: "Wir brauchten eine Banken-Software, die sich anfühlt wie Spotify.",
                author: "CTO, FinTech AG"
            }
        },
        approach: {
            title: "Unser Ansatz",
            description: "Entwicklung einer Headless-Architektur mit Next.js im Frontend und Microservices im Backend.",
            steps: [
                { title: "Architecture", description: "Design einer skalierbaren Microservices-Architektur." },
                { title: "Development", description: "Frontend-Entwicklung mit React & TypeScript." },
                { title: "Security", description: "Implementierung von OAuth2 und Verschlüsselung." }
            ]
        },
        solution: {
            title: "Die Lösung",
            description: "Ein hochperformantes Dashboard, das Bankgeschäfte in Echtzeit ermöglicht. Vollständig responsive und barrierefrei.",
            images: []
        },
        results: {
            title: "Die Ergebnisse",
            description: "Drastisch reduzierte Ladezeiten und eine moderne User Experience führten zu höherer Kundenzufriedenheit.",
            metrics: [
                { label: "Ladezeit", value: "< 500ms", change: "-90%" },
                { label: "User Engagement", value: "High", change: "+150%" },
                { label: "Dev Velocity", value: "2x", change: "+100%" }
            ]
        }
    },
    "fashion-commerce": {
        slug: "fashion-commerce",
        title: "Fashion Commerce",
        subtitle: "Headless Shopify Store",
        category: "Web Development",
        thumbnail: "shopping_bag",
        heroImage: "bg-surface-dark",
        stats: [
            { label: "Branche", value: "Fashion" },
            { label: "Tech Stack", value: "Shopify Hydrogen" },
            { label: "Dauer", value: "8 Wochen" }
        ],
        challenge: {
            title: "Die Herausforderung",
            description: "Ein Standard-Shopify-Theme reichte nicht für die brand-driven Experience der Marke. Es wurde maximale Design-Freiheit benötigt.",
            list: [
                "Custom Animations & Transitions",
                "Keine Kompromisse bei Performance",
                "Nahtloser Checkout"
            ]
        },
        approach: {
            title: "Unser Ansatz",
            description: "Einsatz von Shopify Hydrogen (React-basiert) für ein komplett maßgeschneidertes Frontend bei voller Shopify-Backend-Funktionalität.",
            steps: [
                { title: "UX/UI Design", description: "Design einer immersiven Shopping Experience." },
                { title: "Component Dev", description: "Entwicklung wiederverwendbarer Shop-Komponenten." },
                { title: "Integration", description: "Anbindung an Shopify Storefront API." }
            ]
        },
        solution: {
            title: "Die Lösung",
            description: "Ein Online-Store, der sich anfühlt wie eine native App. Flüssige Übergänge und sofortiges Laden der Produktseiten.",
            images: []
        },
        results: {
            title: "Die Ergebnisse",
            description: "Erhöhte Conversion-Rate durch besseres UX und Performance.",
            metrics: [
                { label: "Conversion", value: "3.2%", change: "+45%" },
                { label: "Mobile Speed", value: "98/100", change: "Top" },
                { label: "Avg Order Value", value: "120€", change: "+20%" }
            ]
        }
    },
    "saas-redesign": {
        slug: "saas-redesign",
        title: "SaaS Redesign",
        subtitle: "Product UI Overhaul",
        category: "Web Design",
        thumbnail: "dashboard_customize",
        heroImage: "bg-surface-dark",
        stats: [
            { label: "Branche", value: "B2B SaaS" },
            { label: "Scope", value: "Design System" },
            { label: "Dauer", value: "6 Wochen" }
        ],
        challenge: {
            title: "Die Herausforderung",
            description: "Eine komplexe Software war über Jahre gewachsen und inkonsistent geworden. Nutzer fanden sich nicht mehr zurecht.",
            list: [
                "Inkonsistente UI-Elemente",
                "Veraltetes Visual Design",
                "Schlechte Usability"
            ]
        },
        approach: {
            title: "Unser Ansatz",
            description: "Entwicklung eines neuen, atomaren Design Systems in Figma als 'Single Source of Truth'.",
            steps: [
                { title: "Audit", description: "Bestandsaufnahme aller UI-Elemente." },
                { title: "Design System", description: "Definition von Farben, Typo, Spacing und Komponenten." },
                { title: "Redesign", description: "Anwendung des Systems auf alle Screens." }
            ]
        },
        solution: {
            title: "Die Lösung",
            description: "Eine frische, moderne und vor allem konsistente Benutzeroberfläche, die das Onboarding neuer Nutzer drastisch vereinfacht.",
            images: []
        },
        results: {
            title: "Die Ergebnisse",
            description: "Skalierbares Design-Fundament für die Zukunft und glücklichere Nutzer.",
            metrics: [
                { label: "Time-to-Value", value: "Minimiert", change: "Positiv" },
                { label: "Support-Tickets", value: "Low", change: "-40%" },
                { label: "Consistency", value: "100%", change: "Max" }
            ]
        }
    },
    "luxury-brand": {
        slug: "luxury-brand",
        title: "Luxury Brand Experience",
        subtitle: "Immersive 3D Web Experience",
        category: "Web Design",
        thumbnail: "diamond",
        heroImage: "bg-surface-dark",
        stats: [
            { label: "Branche", value: "Luxury Goods" },
            { label: "Tech Stack", value: "Three.js / WebGL" },
            { label: "Dauer", value: "10 Wochen" }
        ],
        challenge: {
            title: "Die Herausforderung",
            description: "Eine Premium-Marke benötigte eine digitale Präsenz, die die Exklusivität ihrer physischen Produkte widerspiegelt. Standard-Webdesign war keine Option.",
            list: [
                "Übertragung des 'Luxus-Gefühls' ins Digitale",
                "Performante 3D-Produktinszenierung",
                "Storytelling-fokussierte User Journey"
            ]
        },
        approach: {
            title: "Unser Ansatz",
            description: "Einsatz von WebGL und Three.js für eine cineastische Produktpräsentation, kombiniert mit minimalistischem High-End UI Design.",
            steps: [
                { title: "Art Direction", description: "Definition einer visuellen Sprache, die Eleganz ausstrahlt." },
                { title: "3D Development", description: "Erstellung optimierter 3D-Assets und Shader." },
                { title: "Motion", description: "Implementierung flüssiger Scroll-Animationen." }
            ]
        },
        solution: {
            title: "Die Lösung",
            description: "Eine Website als Erlebnis. Produkte können interaktiv erkundet werden, eingebettet in eine emotionale Markenerzählung.",
            images: []
        },
        results: {
            title: "Die Ergebnisse",
            description: "längere Verweildauer und eine signifikante Stärkung der Markenwahrnehmung bei der Zielgruppe.",
            metrics: [
                { label: "Dwell Time", value: "4:30m", change: "+200%" },
                { label: "Brand Image", value: "Premium", change: "Top" },
                { label: "Awards", value: "2", change: "Wins" }
            ]
        }
    },
    "corporate-portal": {
        slug: "corporate-portal",
        title: "Global Corporate Portal",
        subtitle: "Enterprise Intranet & Portal",
        category: "Custom Software",
        thumbnail: "language",
        heroImage: "bg-surface-dark",
        stats: [
            { label: "Branche", value: "Automotive" },
            { label: "Users", value: "50.000+" },
            { label: "Dauer", value: "6 Monate" }
        ],
        challenge: {
            title: "Die Herausforderung",
            description: "Ein global agierender Konzern benötigte ein zentrales Portal für Mitarbeiter und Partner, das verschiedene Legacy-Systeme vereint.",
            list: [
                "Integration von 15+ bestehenden Systemen",
                "Rollout in 12 Ländern & Sprachen",
                "Single-Sign-On (SSO) Implementierung"
            ]
        },
        approach: {
            title: "Unser Ansatz",
            description: "Entwicklung eines modularen Portals auf Basis von React, das als einheitliche Oberfläche über den Altsystemen liegt.",
            steps: [
                { title: "Discovery", description: "Workshops mit Stakeholdern aus verschiedenen Ländern." },
                { title: "Architecture", description: "Design einer skalierbaren Frontend-Architektur." },
                { title: "Rollout", description: "Stufenweiser Rollout nach Regionen." }
            ]
        },
        solution: {
            title: "Die Lösung",
            description: "Ein intuitives, personalisierbares Dashboard, das Mitarbeitern den Zugriff auf alle relevanten Tools und Informationen ermöglicht.",
            images: []
        },
        results: {
            title: "Die Ergebnisse",
            description: "Massive Effizienzsteigerung durch zentralen Zugang und reduzierte IT-Support-Anfragen.",
            metrics: [
                { label: "Efficiency", value: "High", change: "+30%" },
                { label: "Adoption", value: "95%", change: "Rapid" },
                { label: "SSO Login", value: "100%", change: "Secure" }
            ]
        }
    }
};
