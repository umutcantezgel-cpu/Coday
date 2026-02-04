export interface NavLink {
    label: string;
    href: string;
    ariaLabel?: string;
    description?: string; // For Mega Menu
}

export interface NavItem {
    label: string;
    bgColor: string;
    textColor: string;
    links: NavLink[];
}

export const navItems: NavItem[] = [
    {
        label: "Leistungen",
        bgColor: "#ffffff",
        textColor: "#2D3748",
        links: [
            { label: "Web Entwicklung", href: "/services/web-development", description: "Moderne Tech-Stacks für maximale Performance." },
            { label: "Web Design", href: "/services/web-design", description: "Award-Verdächtige UIs und Brand Experiences." },
            { label: "E-Commerce", href: "/services/web-development/e-commerce", description: "Scalable Shops mit Shopify & Headless." },
            { label: "Web Apps", href: "/services/web-development/web-apps", description: "Komplexe Applikationen, einfach bedienbar." },
            { label: "UI/UX Design", href: "/services/web-design/ui-ux", description: "Nutzerzentrierte Interfaces, die konvertieren." },
            { label: "Alle Leistungen", href: "/services", description: "Unser gesamtes Portfolio auf einen Blick." },
        ]
    },
    {
        label: "Projekte",
        bgColor: "#F7FAFC",
        textColor: "#2D3748",
        links: [
            { label: "Case Studies", href: "/work", description: "Echte Ergebnisse aus der Praxis." },
            { label: "Prozess", href: "/process", description: "Wie wir arbeiten und liefern." },
            { label: "Kontakt", href: "/contact", description: "Starten wir Ihr nächstes Projekt." },
        ]
    },
    {
        label: "Preise",
        bgColor: "#E6FFFA",
        textColor: "#2D3748",
        links: [
            { label: "Pakete", href: "/packages", description: "Transparente Festpreise für jeden Bedarf." },
            { label: "Kalkulator", href: "/calculator", description: "Projektpreis in 2 Min berechnen." },
            { label: "Termin buchen", href: "/booking", description: "Kostenloses Erstgespräch vereinbaren." },
        ]
    },
    {
        label: "Wissen",
        bgColor: "#F0FDFA",
        textColor: "#2D3748",
        links: [
            { label: "Academy", href: "/knowledge/academy", description: "Lernen Sie von unseren Experten." },
            { label: "Blog", href: "/knowledge/blog", description: "Deep Dives in Tech & Design." },
            { label: "Newsletter", href: "/knowledge/newsletter", description: "Weekly Insights direkt ins Postfach." },
            { label: "Whitepapers", href: "/knowledge/whitepapers", description: "Kostenlose Guides und Reports." },
        ]
    },
    {
        label: "Karriere",
        bgColor: "#2D3748",
        textColor: "#fff",
        links: [
            { label: "Jobs", href: "/career/jobs", description: "Werde Teil der Resistance." },
            { label: "Kultur", href: "/career/culture", description: "Wie wir ticken und arbeiten." },
            { label: "Benefits", href: "/career/benefits", description: "Was wir dir bieten." },
        ]
    },
    {
        label: "Rechtliches",
        bgColor: "#1A202C",
        textColor: "#fff",
        links: [
            { label: "AGB", href: "/legal/agb", description: "Das Kleingedruckte." },
            { label: "Datenschutz", href: "/legal/datenschutz", description: "Ihre Daten sind sicher." },
            { label: "Impressum", href: "/legal/impressum", description: "Rechtliche Informationen." },
        ]
    }
];
