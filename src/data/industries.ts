
export interface IndustryData {
    slug: string;
    title: string;
    icon: string;
    hero: {
        headline: string;
        subheadline: string;
    };
    challenges: { title: string; description: string }[];
    solutions: { title: string; description: string; icon: string }[];
    customFeatures: { title: string; description: string }[];
}

export const industriesData: Record<string, IndustryData> = {
    "handwerk-bau": {
        slug: "handwerk-bau",
        title: "Handwerk & Bau",
        icon: "hammer",
        hero: {
            headline: "Digitale Dominanz für Ihr Handwerk",
            subheadline: "Mehr qualifizierte Mitarbeiter und lukrative Aufträge durch eine Webseite, die Ihre Qualität widerspiegelt."
        },
        challenges: [
            { title: "Fachkräftemangel", description: "Schwierigkeiten, qualifizierte Gesellen und Meister zu finden." },
            { title: "Falsche Anfragen", description: "Zu viele Preisanfragen oder Aufträge, die nicht zu Ihrem Profil passen." },
            { title: "Veralteter Auftritt", description: "Die Webseite spiegelt nicht die hohe Qualität Ihrer Arbeit wider." }
        ],
        solutions: [
            { title: "Mitarbeiter-Funnel", description: "Automatisierte Bewerbungsprozesse, die Kandidaten vorqualifizieren.", icon: "group" },
            { title: "Projekt-Showcase", description: "Hochwertige Galerien Ihrer besten Referenzen, die Vertrauen schaffen.", icon: "collections" },
            { title: "Lokale SEO", description: "Gefunden werden, wenn in Ihrer Region nach Ihren Leistungen gesucht wird.", icon: "location_on" }
        ],
        customFeatures: [
            { title: "Projekt-Kalkulator", description: "Interaktive Tools für erste Preisschätzungen (optional für Kunden)." },
            { title: "Terminbuchung", description: "Direkte Schnittstelle für Erstberatungen oder Aufmaß-Termine." },
            { title: "CMS für Referenzen", description: "Einfaches Hochladen neuer Baustellen-Bilder per Smartphone." }
        ]
    },
    "immobilien-makler": {
        slug: "immobilien-makler",
        title: "Immobilien & Makler",
        icon: "apartment",
        hero: {
            headline: "Exklusive Objekte, exklusiv präsentiert",
            subheadline: "Überzeugen Sie Eigentümer und Käufer mit einer digitalen Präsenz, die Kompetenz und Klasse ausstrahlt."
        },
        challenges: [
            { title: "Objektakquise", description: "Eigentümer davon überzeugen, Ihnen den Alleinauftrag zu geben." },
            { title: "Vergleichbarkeit", description: "Sich von der Masse der Makler in der Region abheben." },
            { title: "Mobile Darstellung", description: "Exposés müssen auf dem Smartphone perfekt aussehen." }
        ],
        solutions: [
            { title: "Digitales Exposé", description: "Interaktive Landingpages für Top-Objekte statt langweiliger PDFs.", icon: "web" },
            { title: "Eigentümer-Flow", description: "Funnel zur Wertermittlung für die Lead-Generierung von Verkäufern.", icon: "currency_exchange" },
            { title: "Branding", description: "Ein Design, das Seriosität und Marktwissen vermittelt.", icon: "verified" }
        ],
        customFeatures: [
            { title: "Immobilien-Bewertungstool", description: "Lead-Magnet für Eigentümer auf Ihrer Seite." },
            { title: "Virtuelle Touren", description: "Integration von 360-Grad Rundgängen." },
            { title: "Objekt-Filter", description: "Schnelle Suche nach Traumimmobilien." }
        ]
    },
    "aerzte-gesundheit": {
        slug: "aerzte-gesundheit",
        title: "Ärzte & Gesundheitswesen",
        icon: "local_hospital",
        hero: {
            headline: "Vertrauen beginnt vor dem ersten Termin",
            subheadline: "Entlasten Sie Ihr Praxis-Team und gewinnen Sie die richtigen Patienten durch moderne digitale Prozesse."
        },
        challenges: [
            { title: "Telefon-Überlastung", description: "Das Telefon steht nicht still, Terminvereinbarungen binden viel Zeit." },
            { title: "Sichtbarkeit", description: "Bei Google Maps und in der Suche nicht optimal platziert." },
            { title: "Vertrauensaufbau", description: "Neue Patienten sind unsicher über Leistungen und Spezialisierungen." }
        ],
        solutions: [
            { title: "Online-Terminbuchung", description: "Nahtlose Integration (Doctolib, Jameda oder Custom) zur Entlastung.", icon: "calendar_month" },
            { title: "Leistungs-Darstellung", description: "Verständliche Erklärung von IGeL-Leistungen und Spezialgebieten.", icon: "medical_services" },
            { title: "Team-Vorstellung", description: "Sympathisches Praxis-Branding schafft Nähe vor dem Besuch.", icon: "groups" }
        ],
        customFeatures: [
            { title: "Digitaler Anamnesebogen", description: "Patienten füllen Daten schon zuhause sicher aus." },
            { title: "Recall-System", description: "Automatisierte Erinnerungen für Vorsorge." },
            { title: "Rezept-Bestellung", description: "Modul für Folgerezept-Anforderungen." }
        ]
    },
    "anwaelte-kanzleien": {
        slug: "anwaelte-kanzleien",
        title: "Anwälte & Kanzleien",
        icon: "gavel",
        hero: {
            headline: "Rechtssichere Mandanten-Akquise",
            subheadline: "Positionieren Sie Ihre Kanzlei als erste Anlaufstelle für Ihre Spezialgebiete."
        },
        challenges: [
            { title: "Mandanten-Qualität", description: "Anfragen, die nicht zum Fachgebiet oder Honorarrahmen passen." },
            { title: "Konservatives Image", description: "Veraltetes Webdesign wirkt eingestaubt statt kompetent." },
            { title: "Content-Pflege", description: "Aktuelle Urteile und News werden nicht publiziert." }
        ],
        solutions: [
            { title: "Mandats-Anfrage", description: "Strukturierte Formulare zur Vorprüfung des Sachverhalts.", icon: "assignment" },
            { title: "Expertise-Showcase", description: "Inhalte, die Ihre Kompetenz in Nischen beweisen.", icon: "workspace_premium" },
            { title: "Modernes Seriöses Design", description: "Die perfekte Balance zwischen Tradition und Moderne.", icon: "balance" }
        ],
        customFeatures: [
            { title: "Kostenrechner", description: "Transparenz bei Standard-Fällen (z.B. Scheidung, Bußgeld)." },
            { title: "Download-Center", description: "Bereitstellung von Vollmachten und Infoblättern." },
            { title: "Blog-System", description: "Einfaches Publizieren von Rechts-Updates." }
        ]
    },
    "gastronomie-hotellerie": {
        slug: "gastronomie-hotellerie",
        title: "Gastronomie & Hotellerie",
        icon: "restaurant",
        hero: {
            headline: "Geschmack beginnt beim ersten Klick",
            subheadline: "Verwandeln Sie Webseiten-Besucher in Gäste. Machen Sie Lust auf Ihren Service."
        },
        challenges: [
            { title: "Hohe Provisionen", description: "Abhängigkeit von Lieferdiensten und Buchungsportalen." },
            { title: "Personalmangel", description: "Schwierige Suche nach Service- und Küchenpersonal." },
            { title: "Veraltete Karten", description: "Speisekarten auf der Webseite sind oft veraltete PDFs." }
        ],
        solutions: [
            { title: "Direktbuchung", description: "Kommissionsfreie Tisch- und Zimmerreservierung.", icon: "bookmark_add" },
            { title: "Event-Marketing", description: "Promoten Sie Veranstaltungen und Aktionen effektiv.", icon: "celebration" },
            { title: "Visual Storytelling", description: "Hochwertige Bilder und Videos, die das Ambiente transportieren.", icon: "camera_alt" }
        ],
        customFeatures: [
            { title: "Digitale Speisekarte", description: "Einfach änderbar, filterbar nach Allergenen." },
            { title: "Gutschein-Shop", description: "Zusatzumsatz druch Online-Verkauf von Gutscheinen." },
            { title: "Bewerber-Video-Integration", description: "Job-Seite mit Atmosphäre." }
        ]
    },
    "ecommerce-retail": {
        slug: "ecommerce-retail",
        title: "E-Commerce & Retail",
        icon: "shopping_cart",
        hero: {
            headline: "Vom Besucher zum Stammkunden",
            subheadline: "Skalierbare Online-Shops und Retail-Erlebnisse, die verkaufen."
        },
        challenges: [
            { title: "Warenkorb-Abbrüche", description: "Kunden springen kurz vor dem Kauf ab." },
            { title: "Performance", description: "Langsame Ladezeiten kosten Umsatz, besonders mobil." },
            { title: "Marken-Erlebnis", description: "Der Shop sieht aus wie jedes 08/15 Template." }
        ],
        solutions: [
            { title: "High-Speed Frontend", description: "Next.js Lösungen für blitzschnelles Shopping.", icon: "bolt" },
            { title: "Conversion Optimierung", description: "UX-Design, das den Nutzer psychologisch zum Kauf führt.", icon: "trending_up" },
            { title: "Omnichannel", description: "Verbindung von Online-Shop und lokalem Laden.", icon: "storefront" }
        ],
        customFeatures: [
            { title: "Produkt-Konfigurator", description: "Individualisierbare Produkte live visualisieren." },
            { title: "Cross-Selling Module", description: "Intelligente Empfehlungen im Warenkorb." },
            { title: "Loyalty-Integration", description: "Punktesammeln und Kundenbindung." }
        ]
    },
    "unternehmensberatung": {
        slug: "unternehmensberatung",
        title: "Unternehmensberatung",
        icon: "business_center",
        hero: {
            headline: "Expertise sichtbar machen",
            subheadline: "Gewinnen Sie High-Ticket Kunden durch eine Positionierung als Thought Leader."
        },
        challenges: [
            { title: "Erklärungsbedarf", description: "Komplexe Dienstleistungen sind schwer greifbar." },
            { title: "Vertrauen", description: "Lange Sales-Zyklen erfordern viel Vertrauensaufbau." },
            { title: "Differenzierung", description: "Abgrenzung von 'Schwarzen Schafen' im Coaching-Markt." }
        ],
        solutions: [
            { title: "Whitepaper Funnels", description: "Lead-Generierung durch hochwertigen Content.", icon: "description" },
            { title: "Case Studies", description: "Tiefgehende Erfolgsgeschichten statt oberflächlicher Logos.", icon: "cases" },
            { title: "Webinare", description: "Integration von Video-Content und Live-Events.", icon: "video_camera_front" }
        ],
        customFeatures: [
            { title: "Termin-Kalender", description: "Qualifizierte Erstgespräche direkt buchen." },
            { title: "Podcast-Integration", description: "Audio-Content direkt auf der Seite." },
            { title: "Mitgliederbereich", description: "Exklusive Inhalte für Mandanten." }
        ]
    },
    "startups-tech": {
        slug: "startups-tech",
        title: "Startups & Tech",
        icon: "rocket_launch",
        hero: {
            headline: "Scale fast, look global",
            subheadline: "Webseiten für Tech-Companies, die Investoren und Early Adopters überzeugen."
        },
        challenges: [
            { title: "Time-to-Market", description: "Die Webseite muss gestern fertig sein." },
            { title: "Talent War", description: "Attraktivität für Top-Developer muss hoch sein." },
            { title: "Internationalisierung", description: "Mehrsprachigkeit und globale Ausrichtung von Tag 1." }
        ],
        solutions: [
            { title: "Skalierbare Tech-Stacks", description: "React/Next.js Basis, die mitwächst.", icon: "code" },
            { title: "Modernstes Design", description: "Look & Feel wie im Silicon Valley.", icon: "computer" },
            { title: "Investor Relations", description: "Bereiche speziell für Kapitalgeber und Presse.", icon: "attach_money" }
        ],
        customFeatures: [
            { title: "SaaS-Integration", description: "Nahtloser Übergang von Marketing-Site zu App." },
            { title: "Dark Mode", description: "Beliebt bei Tech-Zielgruppen." },
            { title: "Mehrsprachigkeit (i18n)", description: "Automatische Spracherkennung und Switch." }
        ]
    }
};
