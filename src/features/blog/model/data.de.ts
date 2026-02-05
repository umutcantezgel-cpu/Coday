import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Die 5 tödlichen Fehler im Webdesign (und wie man sie überlebt)",
        slug: "die-5-groessten-fehler-im-webdesign",
        excerpt: "90% aller Websites verbrennen Geld. Sie sehen nett aus, aber konvertieren nicht. In diesem Deep-Dive analysieren wir die psychologischen und technischen Gründe für das Scheitern digitaler Produkte.",
        category: "Webdesign",
        readTime: "12 Min.",
        image: "/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.jpeg",
        alt: "Website Builder Interface mit Drag & Drop Elementen",
        author: "Coday Expert Team",
        date: "14. März 2026",
        content: [
            {
                id: "intro-1",
                type: "text",
                heading: "Die Illusion der 'schönen' Website",
                level: "h2",
                content: "Stellen Sie sich vor, Sie bauen ein Haus. Sie investieren in italienischen Marmor, goldene Wasserhähne und handgeschnitzte Türen. Aber Sie vergessen das Fundament. Beim ersten Sturm stürzt alles zusammen.\n\nGenau das passiert täglich im Webdesign. Unternehmen geben tausende Euro für 'hübsche' Designs aus, ignorieren aber die fundamentalen Gesetze der Nutzerpsychologie und technischen Performance. Das Resultat? Eine digitale Visitenkarte, die niemand findet und die niemanden überzeugt."
            },
            {
                id: "quote-1",
                type: "quote",
                text: "Design ist nicht nur, wie es aussieht und sich anfühlt. Design ist, wie es funktioniert.",
                author: "Steve Jobs",
                variant: "gradient"
            },
            {
                id: "mistake-1",
                type: "text",
                heading: "Fehler #1: Die 'Desktop-First' Lüge",
                level: "h2",
                content: "Es ist 2026. Wahrscheinlich lesen Sie diesen Artikel gerade auf Ihrem Smartphone. Trotzdem werden 80% aller Design-Entwürfe immer noch auf großen 27-Zoll Monitoren präsentiert und abgenommen.\n\nDas Problem nennen wir die 'Daumen-Zone-Ignoranz'. Auf dem Desktop klicken wir mit der Maus präzise auf kleine Links. Auf dem Handy navigieren wir mit dem Daumen. Was auf dem Desktop elegant aussieht, ist mobil oft unbedienbar."
            },
            {
                id: "interactive-1",
                type: "interactive",
                component: "mobile-simulator",
                data: {}
            },
            {
                id: "text-mobile-analysis",
                type: "text",
                content: "Testen Sie es selbst im Simulator oben. 'Schlechtes Design' zwingt den Nutzer zu unnatürlichen Bewegungen oder versteckt die CTA (Call to Action) außerhalb der Reichweite.\n\n**Unsere Regel:** Wenn der wichtigste Button nicht bequem mit dem Daumen erreichbar ist, ist das Design defekt. Wir optimieren konsequent 'Mobile Only' – nicht nur 'First'."
            },
            {
                id: "mistake-2",
                type: "text",
                heading: "Fehler #2: Das 'Ladezeit-Roulette'",
                level: "h2",
                content: "Wussten Sie, dass Amazon herausgefunden hat, dass 100ms Ladeverzögerung 1% Umsatz kosten? Übertragen auf ein KMU bedeutet das: Eine langsame Seite verbrennt Ihr Marketing-Budget bevor der Kunde überhaupt Ihre Headline gelesen hat."
            },
            {
                id: "interactive-2",
                type: "interactive",
                component: "speed-test",
                data: {}
            },
            {
                id: "mistake-2-detail",
                type: "text",
                heading: "Warum WordPress hier versagt",
                level: "h3",
                content: "Baukästen wie WordPress oder Wix laden oft 50-100 Skripte, die Sie gar nicht brauchen. Ein 'Slider-Plugin' lädt CSS für 20 verschiedene Slider-Typen, auch wenn Sie nur einen nutzen.\n\nBei Coday setzen wir auf **Next.js und Server-Side-Rendering**. Der Unterschied ist nicht nur messbar (siehe oben), er ist fühlbar. Kunden warten nicht. Seien Sie schnell oder seien Sie irrelevant."
            },
            {
                id: "checklist-performance",
                type: "checklist",
                title: "Der 1-Sekunden-Audit",
                items: [
                    { text: "Bilder im WebP/AVIF Format (nicht PNG/JPG)", checked: true },
                    { text: "Kein Cumulative Layout Shift (CLS) beim Laden", checked: true },
                    { text: "Font-Display: Swap aktiviert", checked: true },
                    { text: "JavaScript Bundle Size unter 100kb", checked: false },
                    { text: "Server in Frankfurt (nicht USA)", checked: true }
                ]
            },
            {
                id: "mistake-3",
                type: "text",
                heading: "Fehler #3: Das 'Wir-zentrierte' Texten",
                level: "h2",
                content: "'Wir sind Marktführer', 'Wir haben Tradition', 'Wir bieten Qualität'. Gähn. \n\nIhr Kunde interessiert sich nicht für Sie. Er interessiert sich nur für sich selbst und sein Problem. Wenn Ihre Website nur von IHNEN spricht, klicken die Leute weg. Sie müssen die Heldenreise des KUNDEN erzählen."
            },
            {
                id: "comparison-copy",
                type: "comparison",
                variant: "versus",
                items: [
                    {
                        title: "Ego-Text (Falsch)",
                        points: [
                            "Wir sind seit 20 Jahren im Geschäft.",
                            "Wir bieten tolle Websites an.",
                            "Unsere Qualität ist die beste.",
                            "Kontaktieren Sie uns für ein Angebot."
                        ]
                    },
                    {
                        title: "Kunden-Text (Richtig)",
                        points: [
                            "Gewinnen Sie Zeit für Ihr Kerngeschäft.",
                            "Verwandeln Sie Besucher in zahlende Kunden.",
                            "Sichern Sie sich Ihren Wettbewerbsvorteil.",
                            "Starten Sie jetzt Ihre Wachstums-Offensive.",
                        ],
                        isHighlight: true
                    }
                ]
            },
            {
                id: "mistake-4",
                type: "text",
                heading: "Fehler #4: Farb-Psychologie Lotto",
                level: "h2",
                content: "Farben sind keine Deko. Farben sind Signale. Ein roter Button signalisiert Gefahr (Stopp) oder Dringlichkeit (Jetzt kaufen). Ein blauer Button signalisiert Vertrauen (Banken, Versicherungen). Wer Farben nur nach 'Geschmack' wählt, verschenkt Conversions."
            },
            {
                id: "interactive-colors",
                type: "interactive",
                component: "color-picker",
                data: {}
            },
            {
                id: "mistake-5",
                type: "text",
                heading: "Fehler #5: Die 'Sackgasse'",
                level: "h2",
                content: "Jede Seite Ihrer Website muss ein Ziel haben. Wenn ein Nutzer einen Artikel zu Ende gelesen hat, was soll er tun? \n\nZu viele Websites lassen den Nutzer am Ende einer Seite einfach stehen. Das ist eine Sackgasse. Führen Sie den Nutzer immer weiter: Zum nächsten Artikel, zum Newsletter, oder zum Erstgespräch."
            },
            {
                id: "cta-final",
                type: "cta",
                title: "Schluss mit Rate-Mal-Webdesign",
                description: "Wir analysieren Ihre aktuelle Seite kostenlos und zeigen Ihnen genau, wo Sie Geld verlieren.",
                buttonText: "Kostenlosen Audit buchen",
                href: "/contact",
                variant: "glass"
            },
            {
                id: "outro",
                type: "text",
                heading: "Fazit",
                level: "h2",
                content: "Exzellentes Webdesign ist keine Kunst, es ist eine Wissenschaft. Es erfordert Disziplin, Daten und technisches Verständnis. Wenn Sie diese 5 Fehler vermeiden, gehören Sie bereits zu den Top 10% Ihrer Branche.\n\nWollen Sie zu den Top 1% gehören? Dann lassen Sie uns sprechen."
            }
        ]
    },
    // ... Placeholder for remaining posts to be expanded in next steps
    {
        id: 2,
        title: "Daten lügen nicht: Warum Ihr Bauchgefühl Sie Millionen kostet",
        slug: "daten-luegen-nicht-business-intelligence",
        excerpt: "99% aller Marketing-Budgets werden 'blind' ausgegeben. In diesem Artikel zeigen wir, wie Sie durch Business Intelligence (BI) endlich Licht ins Dunkel bringen und jeden Euro profitabel machen.",
        category: "Analytics",
        readTime: "15 Min.",
        image: "/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.jpeg",
        alt: "Business Intelligence Dashboard mit Echtzeit-Daten",
        author: "Coday Analytics Team",
        date: "10. März 2026",
        content: [
            {
                id: "intro-bi",
                type: "text",
                heading: "Das Ende vom 'Rate-Mal-Marketing'",
                level: "h2",
                content: "Henry Ford sagte einmal: 'Ich weiß, dass die Hälfte meiner Werbung hinausgeworfenes Geld ist. Ich weiß nur nicht, welche Hälfte.' \n\nDas war 1920. Heute, im Jahr 2026, ist diese Aussage keine charmante Anekdote mehr – sie ist eine Bankrotterklärung. In einer Welt, in der jeder Klick, jeder Scroll und jede Sekunde Aufmerksamkeit messbar ist, ist Unwissenheit eine Entscheidung.\n\nDie meisten Unternehmen (auch große Konzerne) treffen Entscheidungen immer noch nach dem HiPPO-Prinzip: **Hi**ghest **P**aid **P**erson's **O**pinion. Der Chef 'fühlt', dass LinkedIn besser funktioniert als TikTok. Der Marketing-Manager 'glaubt', dass die neue Landingpage schöner ist. \n\nDaten interessieren sich nicht für Gefühle. Und genau deshalb sind sie so mächtig."
            },
            {
                id: "quote-bi",
                type: "quote",
                text: "Ohne Daten sind Sie nur eine weitere Person mit einer Meinung.",
                author: "W. Edwards Deming",
                variant: "large"
            },
            {
                id: "chapter-maturity",
                type: "text",
                heading: "Wo stehen Sie wirklich?",
                level: "h2",
                content: "Bevor wir tief in die Technik einsteigen, müssen wir ehrlich sein. Die meisten Unternehmen überschätzen ihre Daten-Kompetenz massiv. Sie haben Google Analytics installiert und denken, sie wären 'Data Driven'. Das ist so, als würden Sie ein Fieberthermometer besitzen und denken, Sie wären Arzt.\n\nMachen Sie jetzt den ehrlichen Selbst-Check. Wo stehen Sie auf der Evolutionsleiter der Business Intelligence?"
            },
            {
                id: "interactive-assessment",
                type: "interactive",
                component: "data-maturity",
                data: {}
            },
            {
                id: "chapter-dimensions",
                type: "text",
                heading: "Die 4 Dimensionen der Daten-Reife",
                level: "h2",
                content: "Business Intelligence ist keine Software, die man kauft. Es ist ein Prozess. Ein Reifegrad-Modell. Die meisten Unternehmen stecken in Stufe 1 oder 2 fest. Die Marktführer operieren in Stufe 4."
            },
            {
                id: "accordion-dimensions",
                type: "accordion",
                items: [
                    {
                        title: "Stufe 1: Deskriptive Analyse (Der Rückspiegel)",
                        content: "**Die Frage:** Was ist passiert?\n**Das Tool:** Standard Google Analytics / Excel.\n**Der Wert:** Gering.\n\nDies ist der Blick in den Rückspiegel. Sie sehen, dass der Umsatz letzten Monat um 10% gefallen ist. Aber Sie wissen nicht warum. Sie können nur reagieren, nicht agieren."
                    },
                    {
                        title: "Stufe 2: Diagnostische Analyse (Der Mechaniker)",
                        content: "**Die Frage:** Warum ist es passiert?\n**Das Tool:** Drill-Down Reports / Segmentierung.\n**Der Wert:** Mittel.\n\nSie erkennen Zusammenhänge. Der Umsatz ist gefallen, WEIL der Traffic von Facebook eingebrochen ist. Jetzt haben Sie eine Diagnose, aber noch keine Lösung."
                    },
                    {
                        title: "Stufe 3: Prädiktive Analyse (Das Wetterradar)",
                        content: "**Die Frage:** Was wird passieren?\n**Das Tool:** Machine Learning / Trends.\n**Der Wert:** Hoch.\n\nHier beginnt der Wettbewerbsvorteil. Basierend auf historischen Daten berechnen Algorithmen die Wahrscheinlichkeit zukünftiger Ereignisse. 'Wenn wir das Budget nicht erhöhen, werden wir das Q2-Ziel zu 85% verfehlen.' Sie können steuern, bevor der Unfall passiert."
                    },
                    {
                        title: "Stufe 4: Preskriptive Analyse (Der Autopilot)",
                        content: "**Die Frage:** Was müssen wir tun?\n**Das Tool:** AI-Automation / Dynamic Bidding.\n**Der Wert:** Exorbitant.\n\nDas System erkennt das Problem UND führt die Lösung aus. 'Der ROAS auf Meta sinkt -> Budget automatisch auf Google Ads umschichten, wo der CPA gerade günstiger ist'. Das System optimiert sich selbst in Echtzeit."
                    }
                ]
            },
            {
                id: "chapter-compound",
                type: "text",
                heading: "Der Compound-Effect im Marketing",
                level: "h2",
                content: "Warum ist Stufe 4 so wichtig? Wegen des Zinseszins-Effekts. Wer manuell optimiert (Stufe 1-2), ist langsam. Wer automatisiert optimiert (Stufe 4), wird jeden Tag ein kleines bisschen besser.\n\n1% Verbesserung pro Tag bedeutet nach einem Jahr eine 37-fache Steigerung. Sehen Sie sich den Unterschied an:"
            },
            {
                id: "interactive-seo-graph",
                type: "interactive",
                component: "seo-graph",
                data: {} // Uses SEO graph visual but conceptually applies to 'Growth' vs 'Linear'
            },
            {
                id: "text-analysis-graph",
                type: "text",
                content: "Die grüne Kurve ist das Ergebnis von Feedback-Loops. Jeder ausgegebene Euro generiert Daten. Diese Daten verbessern den Algorithmus. Der verbesserte Algorithmus macht den nächsten Euro effizienter. Es ist ein Schwungrad (Flywheel), das, einmal in Gang gesetzt, kaum zu stoppen ist."
            },
            {
                id: "chapter-tech",
                type: "text",
                heading: "Das technische Fundament (Modern Data Stack)",
                level: "h2",
                content: "Wie baut man das? Nicht mit Excel. Ein moderner Data Stack für 2026 sieht so aus:\n\n1. **Collection Layer:** Server-Side GTM (Google Tag Manager). Cookies sterben aus. Wir müssen Daten serverseitig sammeln, um Ad-Blocker und ITP (Safari) zu umgehen.\n2. **Storage Layer:** Ein Data Warehouse (z.B. BigQuery oder Snowflake). Hier fließen ALLE Daten zusammen: Website, CRM, Ad-Plattformen, Finanz-Tools.\n3. **Transformation Layer:** Tools wie dbt reinigen und verknüpfen die Daten.\n4. **Visualization Layer:** Looker Studio oder PowerBI für Dashboards, die jeder versteht.\n5. **Activation Layer:** Reverse-ETL sendet die *Erkenntnisse* zurück an Facebook/Google ('Dieser Kunde hat hohen CLV, finde mehr von solchen Leuten')."
            },
            {
                id: "checklist-tracking",
                type: "checklist",
                title: "Audit: Ist Ihr Tracking bereit für 2026?",
                items: [
                    { text: "Server-Side Tracking implementiert (First-Party Data)", checked: true },
                    { text: "Cookie-Banner blockiert Tracking NICHT vor Zustimmung (Illegal, aber oft Standard)", checked: false },
                    { text: "Attributions-Modell definiert (Data-Driven statt Last-Click)", checked: false },
                    { text: "CRM-Daten (Offline Conversions) werden an Ad-Netzwerke zurückgespielt", checked: false },
                    { text: "Dashboards zeigen Gewinn (Profit), nicht nur Umsatz (Revenue)", checked: true }
                ]
            },
            {
                id: "comparison-bi",
                type: "comparison",
                variant: "pros-cons",
                items: [
                    {
                        title: "Traditionelles Reporting",
                        points: [
                            "Monatliche PDFs",
                            "Silo-Daten (Facebook vs Google)",
                            "Fokus auf Vanity Metrics (Likes, Clicks)",
                            "Blickt nur zurück"
                        ]
                    },
                    {
                        title: "Coday Intelligence",
                        points: [
                            "Echtzeit-Dashboards",
                            "Single Source of Truth",
                            "Fokus auf Business Metrics (Profit, CLV)",
                            "Schaut nach vorne (Forecast)",
                        ],
                        isHighlight: true
                    }
                ]
            },
            {
                id: "divider-bi",
                type: "divider",
                variant: "dots"
            },
            {
                id: "outro-bi",
                type: "text",
                heading: "Fazit: Werden Sie zum Sniper",
                level: "h2",
                content: "Marketing ohne Daten ist wie Schrotflinte schießen im Dunkeln. Sie treffen vielleicht etwas, aber Sie verschwenden eine Menge Munition.\n\nBusiness Intelligence macht Sie zum Sniper. Ein Schuss, ein Treffer. Weniger Budget, mehr Ergebnis. Das ist keine Magie, das ist Mathematik."
            },
            {
                id: "cta-bi",
                type: "cta",
                title: "Schluss mit Blindflug",
                description: "Wir auditieren Ihr aktuelles Tracking-Setup kostenlos und zeigen Ihnen, wo Ihre Daten Lücken haben.",
                buttonText: "Gratis Data-Audit starten",
                href: "/contact",
                variant: "primary" // Changed to primary for high contrast
            }
        ]
    },
    {
        id: 3,
        title: "Der perfekte Omni-Channel Mix: Überall sein, ohne durchzudrehen",
        slug: "der-perfekte-omni-channel-mix",
        excerpt: "Kunden nutzen heute 6-10 Touchpoints vor dem Kauf. Wer nur auf einem Kanal spielt, verliert. Wir zeigen die Blaupause für echte Omnipräsenz.",
        category: "Strategie",
        readTime: "10 Min.",
        image: "/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.jpeg",
        alt: "Vernetzte Omnichannel Marketing Strategie",
        author: "Strategy Director",
        date: "05. März 2026",
        content: [
            {
                id: "intro-omni",
                type: "text",
                heading: "Multi-Channel vs. Omni-Channel",
                level: "h2",
                content: "Viele verwechseln 'wir sind überall' mit einer Strategie. Wenn Ihre Facebook-Ads nicht wissen, was Ihre E-Mail-Kampagnen tun und Ihre Website nicht weiß, dass der Kunde schon gekauft hat, dann nerven Sie Ihre Kunden nur. Omni-Channel bedeutet: Eine einzige, flüssige Konversation über alle Kanäle hinweg."
            },
            {
                id: "comparison-channel",
                type: "comparison",
                variant: "versus",
                items: [
                    {
                        title: "Multi-Channel (Chaotisch)",
                        points: ["Kanäle silieren (getrennt)", "Widersprüchliche Botschaften", "Daten liegen verstreut", "Kunde ist verwirrt"]
                    },
                    {
                        title: "Omni-Channel (Integriert)",
                        points: ["Zentrale Kundendatenbank (CDP)", "Konsistente Story", "Echtzeit-Datenabgleich", "Nahtlose Experience"],
                        isHighlight: true
                    }
                ]
            },
            {
                id: "checklist-touchpoints",
                type: "checklist",
                title: "Die 7 Must-Have Touchpoints",
                items: [
                    { text: "SEO (Gefunden werden bei Bedarf)", checked: true },
                    { text: "Social Ads (Push-Marketing für Awareness)", checked: true },
                    { text: "Retargeting (Die 'Erinnerung')", checked: true },
                    { text: "Email-Automation (Nurturing)", checked: true },
                    { text: "Conversational (Chat/WhatsApp)", checked: false },
                    { text: "Website (Der Hub)", checked: true },
                    { text: "Offline (Event/Print - optional)", checked: false }
                ]
            },
            {
                id: "text-orchestration",
                type: "text",
                heading: "Die Orchestrierung",
                level: "h2",
                content: "Stellen Sie sich vor, Sie sind Dirigent. Ihre Kanäle sind die Instrumente. Wenn jeder spielt, was er will, entsteht Lärm. Wenn alle nach Noten spielen, entsteht Musik. Wir nutzen Tools wie Klaviyo, HubSpot und Custom Dashboards, um diese Symphonie zu leiten."
            },
            {
                id: "cta-omni",
                type: "cta",
                title: "Bringen Sie Ordnung ins Chaos",
                description: "Wir entwickeln Ihre Omni-Channel Blaupause in einem halbtägigen Workshop.",
                buttonText: "Strategie-Session buchen",
                href: "/contact",
                variant: "primary"
            }
        ]
    },
    {
        id: 4,
        title: "Social Media Secrets 2026: Organische Reichweite ist tot?",
        slug: "social-media-secrets-2026",
        excerpt: "Algorithmen haben sich geändert. Wer heute noch 'postet und hofft', ist verloren. Hier sind die neuen Regeln für LinkedIn, Instagram und TikTok.",
        category: "Social Media",
        readTime: "9 Min.",
        image: "/images/marketing/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.jpeg",
        alt: "Social Media Strategy",
        author: "Social Media Manager",
        date: "28. Februar 2026",
        content: [
            {
                id: "intro-social",
                type: "text",
                heading: "Content ist King, aber Distribution ist King Kong",
                level: "h2",
                content: "Der beste Content nützt nichts, wenn ihn niemand sieht. 2026 ist 'Pay-to-Play' die Realität. Aber es gibt einen Backdoor-Hack: Engagement."
            },
            {
                id: "social-growth-graph",
                type: "interactive",
                component: "seo-graph", // Reusing graph to show viral growth vs organic decline
                data: {}
            },
            {
                id: "accordion-hooks",
                type: "accordion",
                items: [
                    {
                        title: "Der 'Pattern Interrupt'",
                        content: "**Sekunde 1-3:** Brechen Sie das Scroll-Muster. Visuell oder textlich. 'Hören Sie auf, das zu tun!' ist besser als 'Willkommen zu unserem Video'."
                    },
                    {
                        title: "Die 'Value Bridge'",
                        content: "**Sekunde 3-10:** Versprechen Sie sofortigen Wert. 'In diesem Post zeige ich Ihnen, wie Sie 30% Steuern sparen'."
                    },
                    {
                        title: "Der 'Loop'",
                        content: "**Ende:** Stellen Sie sicher, dass das Video in einer Schleife geschaut wird. Watchtime ist das wichtigste Signal für den Algorithmus."
                    }
                ]
            },
            {
                id: "checklist-posting",
                type: "checklist",
                title: "Die 'Perfect Post' Checkliste",
                items: [
                    { text: "Hook in der ersten Zeile/Sekunde", checked: true },
                    { text: "Format füllt den ganzen Screen (9:16 oder 4:5)", checked: true },
                    { text: "Untertitel sind eingebrannt (für Silent Watcher)", checked: true },
                    { text: "CTA am Ende (Kommentieren, Speichern)", checked: true }
                ]
            },
            {
                id: "cta-social",
                type: "cta",
                title: "Viral gehen als Service",
                description: "Überlassen Sie Ihre Social Media Präsenz nicht dem Zufall. Wir managen Ihre Accounts data-driven.",
                buttonText: "Social Audit anfragen",
                href: "/services/social",
                variant: "glass"
            }
        ]
    },
    {
        id: 5,
        title: "Email Marketing: Der 4400% ROI Kanal",
        slug: "email-marketing-automation",
        excerpt: "Totgesagte leben länger. E-Mail ist nach wie vor der Kanal mit dem höchsten ROI. Aber nur, wenn man nicht 'spammt', sondern 'nurturt'.",
        category: "Marketing",
        readTime: "11 Min.",
        image: "/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.jpeg",
        alt: "Email Automation Excellence",
        author: "CRM Expert",
        date: "20. Februar 2026",
        content: [
            {
                id: "intro-email",
                type: "text",
                heading: "Ihr Geld liegt in der Liste",
                level: "h2",
                content: "Social Media Follower gehören Zuckerberg oder Musk. Ihre E-Mail-Liste gehört IHNEN. Das ist Ihr einziges echtes Asset. \n\nE-Mail Marketing ist wie Geld drucken auf Knopfdruck – wenn Sie das Vertrauen Ihrer Leser haben."
            },
            {
                id: "email-roi-calc",
                type: "interactive",
                component: "roi-calculator",
                data: {}
            },
            {
                id: "accordion-flows",
                type: "accordion",
                items: [
                    {
                        title: "Welcome Flow",
                        content: "Die wichtigste Mail. Wird zu 80% geöffnet. Liefern Sie hier sofort den versprochenen Lead Magnet und stellen Sie sich vor."
                    },
                    {
                        title: "Abandoned Cart / Browser Flow",
                        content: "Jemand war auf Ihrer Pricing-Page, hat aber nicht gekauft? Eine Stunde später kommt automatisch eine nette Mail: 'Fragen?' - Das konvertiert zu 15%."
                    },
                    {
                        title: "Winback Flow",
                        content: "Kunden, die 90 Tage nichts gekauft haben, automatisch reaktivieren. 'Wir vermissen dich' + Gutschein."
                    }
                ]
            },
            {
                id: "checklist-deliverability",
                type: "checklist",
                title: "Landen Sie im Spam?",
                items: [
                    { text: "SPF, DKIM und DMARC Records gesetzt", checked: true },
                    { text: "List Hygiene (Inaktive löschen)", checked: false },
                    { text: "Keine 'Spam-Trigger-Words' (Gratis, !!!, $$$)", checked: true },
                    { text: "Personalisierung im Betreff", checked: true }
                ]
            },
            {
                id: "cta-email",
                type: "cta",
                title: "Bauen Sie Ihren eigenen Geld-Drucker",
                description: "Wir richten Ihnen Klaviyo oder ActiveCampaign komplett ein. Inklusive aller Basis-Flows.",
                buttonText: "Automation Setup buchen",
                href: "/services/marketing",
                variant: "secondary"
            }
        ]
    },
    {
        id: 6,
        title: "Video Content Excellence: Warum Text tot ist",
        slug: "video-content-excellence",
        excerpt: "Menschen lesen nicht mehr. Sie schauen. Wenn Sie 2026 keine Video-Strategie haben, sind Sie unsichtbar. Wir zeigen Ihnen, wie Sie mit minimalem Aufwand maximale Sichtbarkeit erreichen.",
        category: "Content",
        readTime: "8 Min.",
        image: "/images/marketing/video-content-streaming-plattform-play-button-multimedia.jpeg",
        alt: "Video Content Production",
        author: "Creative Director",
        date: "15. Februar 2026",
        content: [
            {
                id: "intro-video",
                type: "text",
                heading: "Die TikTokisierung der Aufmerksamkeit",
                level: "h2",
                content: "Die Aufmerksamkeitsspanne eines Goldfisches beträgt 9 Sekunden. Die eines Menschen im Jahr 2026? 8 Sekunden. \n\nLange Textwüsten funktionieren nicht mehr. Wer seine Botschaft nicht in 15-60 Sekunden Bewegtbild verpacken kann, wird ignoriert. Algorithmen von LinkedIn bis Google bevorzugen Video-Content massiv."
            },
            {
                id: "video-roi-calc",
                type: "interactive",
                component: "roi-calculator", // Using ROI calculator as a proxy for 'Media Value' calculator
                data: { mode: 'media-value' }
            },
            {
                id: "checklist-video-setup",
                type: "checklist",
                title: "Das 500€ Studio-Setup (Profiqualität)",
                items: [
                    { text: "Licht: Godox SL60W + Softbox (ca. 150€)", checked: true },
                    { text: "Audio: Rode Wireless Go II (ca. 250€)", checked: true },
                    { text: "Kamera: iPhone 15 Pro (bereits vorhanden?)", checked: true },
                    { text: "Schnitt: CapCut Desktop (Kostenlos)", checked: true }
                ]
            },
            {
                id: "comparison-video-format",
                type: "comparison",
                variant: "feature-grid",
                items: [
                    {
                        title: "Imagefilm (Old School)",
                        points: ["Teuer (10k+)", "Langweilig", "Einmalige Nutzung", "Kein Social Reach"]
                    },
                    {
                        title: "Content Pieces (New School)",
                        points: ["Günstig & Schnell", "Authentisch", "Tägliche Nutzung", "Viraler Faktor"],
                        isHighlight: true
                    }
                ]
            },
            {
                id: "cta-video",
                type: "cta",
                title: "Starten Sie Ihre Video-Offensive",
                description: "Wir produzieren Ihre ersten 5 Short-Form Videos für Social Media. Strategie, Dreh und Schnitt inklusive.",
                buttonText: "Content-Paket anfragen",
                href: "/services/content",
                variant: "glass"
            }
        ]
    },
    {
        id: 7,
        title: "Warum WordPress im Jahr 2026 tot ist (und warum Agenturen es Ihnen trotzdem verkaufen)",
        slug: "warum-wordpress-tot-ist",
        excerpt: "WordPress war großartig. Im Jahr 2010. Heute ist es ein Sicherheitsrisiko und eine Performance-Bremse. Wir decken auf, warum 'Custom Code' der neue Standard für ernsthafte Unternehmen ist.",
        category: "Tech Deep Dive",
        readTime: "14 Min.",
        image: "/images/marketing/digital-transformation-zeitung-zu-smartphone-social-media-werbung-evolution.jpeg",
        alt: "Veraltete Technologie vs. Moderne Architektur",
        author: "Lead Architect",
        date: "01. April 2026",
        content: [
            {
                id: "intro-wp",
                type: "text",
                heading: "Der Elefant im Raum",
                level: "h2",
                content: "43% des Internets laufen auf WordPress. Das klingt beeindruckend. Aber wissen Sie, was noch beeindruckender ist? 90% aller gehackten Websites laufen ebenfalls auf WordPress. \n\nWordPress wurde vor über 20 Jahren als Blogging-Plattform entwickelt. Heute wird es missbraucht, um komplexe Unternehmens-Lösungen zu bauen. Das Ergebnis: Ein 'Frankenstein-Code', der nur durch hunderte Plugins zusammengehalten wird. Es ist Zeit, die Wahrheit zu sagen."
            },
            {
                id: "comparison-architecture",
                type: "comparison",
                variant: "versus",
                items: [
                    {
                        title: "Monolith (WordPress)",
                        points: [
                            "Backend & Frontend untrennbar",
                            "Server muss jede Seite bei Aufruf 'bauen' (langsam)",
                            "Ein Plugin-Update kann alles zerstören",
                            "Offene Datenbank-Schnittstellen"
                        ]
                    },
                    {
                        title: "Headless / Jamstack (Coday)",
                        points: [
                            "Entkoppelte Architektur",
                            "Seiten sind vor-generiert (Instant Load)",
                            "Isolierte Komponenten",
                            "Keine direkte Datenbank-Verbindung",
                        ],
                        isHighlight: true
                    }
                ]
            },
            {
                id: "chapter-security",
                type: "text",
                heading: "Reason 1: Sicherheit ist eine Illusion",
                level: "h2",
                content: "Stellen Sie sich vor, Sie lassen Ihre Haustür offen, stellen aber ein Schild 'Bitte nicht einbrechen' davor. Das ist WordPress-Sicherheit. \n\nWeil WordPress so populär ist, ist es das Ziel Nr. 1 für Bots. Sobald eine Sicherheitslücke in einem populären Plugin gefunden wird, scannen Millionen Bots das Web und infizieren automatisch jede Seite, die dieses Plugin nutzt. \n\nSehen Sie selbst, wie einfach ein Angriff auf eine Standard-Installation ist vs. eine statische Seite:"
            },
            {
                id: "interactive-hack",
                type: "interactive",
                component: "hack-simulator",
                data: {}
            },
            {
                id: "text-hack-analysis",
                type: "text",
                content: "**Analyse:** Bei der statischen Seite (Coday Stack) scheitert der Angriff, weil es schlichtweg nichts anzugreifen gibt. Es gibt keine Datenbank, die online ist. Es gibt keine 'wp-login.php'. Die Angriffsfläche ist quasi Null."
            },
            {
                id: "chapter-performance",
                type: "text",
                heading: "Reason 2: Performance ist Umsatz",
                level: "h2",
                content: "Google hat die Regeln geändert. 'Core Web Vitals' sind jetzt ein Ranking-Faktor. WordPress-Seiten fallen hier reihenweise durch, weil sie 'Bloat' (Datenmüll) laden.\n\nEin leeres WordPress lädt schon CSS und JS für Dinge, die Sie nicht nutzen (Emojis, Embeds, etc.). Mit jedem Plugin wird es schlimmer. Themes wie 'Divi' oder 'Elementor' fügen Megabytes an unnötigem Code hinzu.\n\nWir bauen 'High-Performance Machines'. Code, der genau das tut, was er soll. Nichts mehr. Das Ergebnis?"
            },
            {
                id: "interactive-speed",
                type: "interactive",
                component: "speed-test",
                data: {}
            },
            {
                id: "checklist-tech",
                type: "checklist",
                title: "Der Tech-Stack Check",
                items: [
                    { text: "Keine Datenbank-Verbindung im Frontend", checked: true },
                    { text: "Globale CDN-Verteilung (Edge Network)", checked: true },
                    { text: "Automatische Bild-Optimierung (Next/Image)", checked: true },
                    { text: "Keine 'Plugins' sondern 'Packages' (npm)", checked: true }
                ]
            },
            {
                id: "chapter-maintenance",
                type: "text",
                heading: "Reason 3: Die Wartungs-Hölle",
                level: "h2",
                content: "Hand aufs Herz: Wann haben Sie das letzte Mal Ihre Plugins aktualisiert? Haben Sie Angst, den 'Update'-Button zu drücken, weil danach die Seite weiß bleiben könnte? \n\nDas nennen wir 'Update Anxiety'. Bei WordPress müssen Sie ständig flicken, patchen und hoffen. Ein Sicherheits-Update von WooCommerce? Alles steht still.\n\nBei unserem Stack gibt es keine Plugins, die 'brechen'. CI/CD Pipelines testen jeden Code-Change automatisch, BEVOR er live geht. Wenn etwas kaputt ist, geht es nicht online. So einfach ist das."
            },
            {
                id: "quote-tech",
                type: "quote",
                text: "WordPress ist für Hobby-Blogger. React ist für Business.",
                author: "Coday Manifesto",
                variant: "gradient"
            },
            {
                id: "cta-migration",
                type: "cta",
                title: "Raus aus der WordPress-Falle",
                description: "Wir migrieren Ihre unsichere WordPress-Seite auf unseren High-Security Stack. 100% Garantie gegen Standard-Hacks.",
                buttonText: "Migration anfragen",
                href: "/services/web-development",
                variant: "secondary"
            }
        ]
    },
    {
        id: 8,
        title: "Neuro-Design: Wie Sie das Unterbewusstsein Ihrer Kunden hacken",
        slug: "neuro-design-psychologie",
        excerpt: "Farben, Formen und Layouts entscheiden in Millisekunden über Kauf oder Abbruch. Wir zeigen Ihnen die geheimen psychologischen Trigger, die Amazon und Apple nutzen.",
        category: "Design Psychology",
        readTime: "13 Min.",
        image: "/images/marketing/design-psychologie-neuromarketing-farbwirkung-user-experience.jpeg",
        alt: "Neuromarketing und Design Psychologie",
        author: "Head of Design",
        date: "05. April 2026",
        content: [
            {
                id: "intro-neuro",
                type: "text",
                heading: "Wir kaufen emotional, wir rechtfertigen rational",
                level: "h2",
                content: "Glauben Sie wirklich, Sie haben Ihr letztes iPhone gekauft, weil der Prozessor 10% schneller war? Nein. Sie haben es gekauft, weil es sich gut angefühlt hat. \n\nDas menschliche Gehirn trifft 95% aller Entscheidungen unterbewusst (System 1). Erst danach schaltet sich der rationale Verstand (System 2) ein, um die Entscheidung zu begründen. Schlechtes Webdesign spricht nur System 2 an (Fakten). Gutes Webdesign verführt System 1."
            },
            {
                id: "chapter-colors",
                type: "text",
                heading: "Die geheime Sprache der Farben",
                level: "h2",
                content: "Jede Farbe sendet ein hormonelles Signal. Blau beruhigt (Serotonin). Rot alarmiert (Adrenalin). Gelb macht glücklich (Dopamin). \n\nWenn Sie 'Vertrauen' verkaufen (z.B. als Finanzberater), aber rote Buttons nutzen, erzeugen Sie unterbewusste kognitive Dissonanz. Der Kunde 'fühlt', dass etwas nicht stimmt, kann aber nicht sagen, was. Testen Sie es selbst:"
            },
            {
                id: "interactive-colors-8",
                type: "interactive",
                component: "color-picker",
                data: {}
            },
            {
                id: "text-color-analysis",
                type: "text",
                content: "**Pro-Tipp:** Nutzen Sie für Ihre primäre Call-to-Action (CTA) immer eine Farbe, die sich im Farbkreis gegenüber Ihrer Markenfarbe befindet (Komplementärkontrast). Das maximiert die visuelle Salienz."
            },
            {
                id: "chapter-ux-laws",
                type: "text",
                heading: "3 UX-Gesetze, die Umsatz bringen",
                level: "h2",
                content: "Psychologen haben Jahrzehnte damit verbracht, zu verstehen, wie wir Interfaces wahrnehmen. Hier sind die drei wichtigsten Gesetze für Ihre Website:"
            },
            {
                id: "accordion-ux-laws",
                type: "accordion",
                items: [
                    {
                        title: "Hick's Law (Das Auswahl-Paradox)",
                        content: "**Gesetz:** Die Zeit, eine Entscheidung zu treffen, steigt logarithmisch mit der Anzahl der Optionen.\n**Anwendung:** Entfernen Sie Links aus Ihrer Navigation. Reduzieren Sie Formularfelder. Geben Sie dem Kunden EINEN klaren Weg, nicht fünf."
                    },
                    {
                        title: "Fitts's Law (Das Zielscheiben-Gesetz)",
                        content: "**Gesetz:** Die Zeit, ein Ziel zu treffen, hängt von der Größe des Ziels und der Entfernung ab.\n**Anwendung:** Machen Sie wichtige Buttons GROSS. Platzieren Sie sie dort, wo der Daumen ist (unten am Bildschirmrand auf Mobile)."
                    },
                    {
                        title: "Von Restorff Effect (Der Isolationseffekt)",
                        content: "**Gesetz:** Wenn mehrere ähnliche Objekte vorhanden sind, wird sich an dasjenige erinnert, das sich unterscheidet.\n**Anwendung:** Ihre 'Bestseller'-Option in der Preistabelle muss visuell ausbrechen (andere Farbe, größer, Schatten)."
                    }
                ]
            },
            {
                id: "chapter-ab-testing",
                type: "text",
                heading: "Beweis statt Behauptung: A/B Testing",
                level: "h2",
                content: "Die schönste Theorie nützt nichts, wenn sie nicht funktioniert. Deshalb raten wir bei Coday nie. Wir testen. \n\nEin A/B Test zeigt 50% der Besucher Version A und 50% Version B. Die Version, die mehr Umsatz bringt, gewinnt. Oft sind es kleine Änderungen im Wording oder der Farbe, die den Unterschied machen."
            },
            {
                id: "interactive-ab-test",
                type: "interactive",
                component: "ab-test",
                data: {}
            },
            {
                id: "text-ab-result",
                type: "text",
                content: "Im Simulator oben sehen Sie einen Klassiker: 'Wir'-Text (Ego) vs. 'Sie'-Text (Kunden-Nutzen). Der Unterschied in der Conversion-Rate ist oft dramatisch (im Schnitt +30-100%)."
            },
            {
                id: "checklist-neuro",
                type: "checklist",
                title: "Neuro-Design Audit",
                items: [
                    { text: "Blickrichtung von Gesichtern zeigt auf die CTA (Gaze Cueing)", checked: true },
                    { text: "Verknappung wird genutzt ('Nur noch 3 Plätze')", checked: true },
                    { text: "Social Proof (Logos/Testimonials) ist 'Above the fold'", checked: false },
                    { text: "Preise nutzen den 'Anker-Effekt' (Teuerstes zuerst)", checked: true }
                ]
            },
            {
                id: "cta-design",
                type: "cta",
                title: "Verführt Ihre Website schon?",
                description: "Wir gestalten Interfaces, die nicht nur schön aussehen, sondern neurologisch verkaufen.",
                buttonText: "Design-Audit anfragen",
                href: "/services/design",
                variant: "glass"
            }
        ]
    },
    {
        id: 9,
        title: "Die KI-Revolution: Warum 2026 das Jahr der 'Voice-First' Strategie ist",
        slug: "ki-voice-search-revolution",
        excerpt: "Tippen ist so 2025. Wir zeigen, warum Voice Search, AI-Agenten und Hyper-Personalisierung den Markt radikal verändern – und wie Sie davon profitieren.",
        category: "Future Tech",
        readTime: "11 Min.",
        image: "/images/marketing/chatgpt-ai-kuenstliche-intelligenz-roboter-hand-mensch-verbindung-zukunft.jpeg",
        alt: "KI und Mensch Zusammenarbeit",
        author: "AI Research Lead",
        date: "12. April 2026",
        content: [
            {
                id: "intro-ai",
                type: "text",
                heading: "Das Ende des Suchschlitzes",
                level: "h2",
                content: "Seit 30 Jahren suchen wir gleich: Wir tippen Keywords in eine Box und bekommen 10 blaue Links. \n\nAb heute ist das vorbei. ChatGPT Search, Perplexity und Google Gemini haben das Spiel geändert. Nutzer suchen nicht mehr nach Links. Sie suchen nach Antworten. Wer seine Website nicht für 'LLMs' (Large Language Models) optimiert, wird unsichtbar."
            },
            {
                id: "chapter-voice",
                type: "text",
                heading: "Voice Commerce: Einkaufen im Vorbeigehen",
                level: "h2",
                content: "Stellen Sie sich vor, Ihr Kunde steht in der Küche und sagt: 'Hey Siri, bestelle mir diese neuen Sneaker in Rot, Größe 42'. Keine Website. Kein Checkout-Formular. Nur Sprache. \n\nDas ist keine Science-Fiction. Das ist die Realität in 2026. Testen Sie hier unsere Voice-Commerce-Demo:"
            },
            {
                id: "interactive-voice",
                type: "interactive",
                component: "voice-demo",
                data: {}
            },
            {
                id: "text-voice-analysis",
                type: "text",
                content: "**Was gerade passiert ist:** Die AI hat den Kontext verstanden ('Rot', 'Größe 42'), im Inventar gesucht und eine personalisierte Antwort generiert. Websites, die das nicht können, verlieren den Kunden."
            },
            {
                id: "chapter-efficiency",
                type: "text",
                heading: "Die Skalierungs-Lüge",
                level: "h2",
                content: "Früher hieß Wachstum: Mehr Mitarbeiter einstellen. Mehr Leute = Mehr Kosten. \n\nHeute bedeutet Wachstum: Mehr AI-Agenten einsetzen. Ein AI-Support-Agent schläft nicht, wird nicht krank und kostet einen Bruchteil eines menschlichen Mitarbeiters. Der Hebel ist gigantisch."
            },
            {
                id: "interactive-ai-cost",
                type: "interactive",
                component: "ai-cost",
                data: {}
            },
            {
                id: "accordion-ai-usecases",
                type: "accordion",
                items: [
                    {
                        title: "AI Support Agent (70% Kostenersparnis)",
                        content: "Löst 80% aller Kundenanfragen sofort. Von 'Wo ist mein Paket?' bis 'Wie installiere ich das?'. Nur komplexe Fälle gehen an Menschen."
                    },
                    {
                        title: "Hyper-Personalisierung (30% mehr Umsatz)",
                        content: "Die Website passt sich dem Besucher an. Ein CEO sieht andere Texte und Bilder als ein Student. In Echtzeit generiert."
                    },
                    {
                        title: "Predictive Logistics",
                        content: "Die AI bestellt Ware nach, bevor das Lager leer ist. Basierend auf Wetterdaten, Trends und historischen Verkäufen."
                    }
                ]
            },
            {
                id: "checklist-ai-ready",
                type: "checklist",
                title: "Sind Sie 'AI Ready'?",
                items: [
                    { text: "Strukturierte Daten (Schema.org) für LLMs optimiert", checked: true },
                    { text: "Chatbot basiert auf eigener Knowledge Base (RAG)", checked: true },
                    { text: "Voice Search kompatibel (Long-Tail Keywords)", checked: true },
                    { text: "Bilder haben Descriptive Alt-Tags für Vision AI", checked: true }
                ]
            },
            {
                id: "cta-ai",
                type: "cta",
                title: "Vorsprung durch Technik",
                description: "Wir implementieren Custom AI Lösungen, die Ihre Prozesse automatisieren und Kunden begeistern.",
                buttonText: "AI-Workshop buchen",
                href: "/services/web-development",
                variant: "primary"
            }
        ]
    },
    {
        id: 10,
        title: "Der 'Agentur-Killer': Warum das klassische Agentur-Modell tot ist",
        slug: "agentur-killer-modell",
        excerpt: "Warum zahlen Sie monatliche Retainer für Leistungen, die eine AI in Sekunden erledigt? Wir packen aus: Die schmutzigen Geheimnisse der Branche und warum die Zukunft 'Hybrid' gehört.",
        category: "Industry Disruption",
        readTime: "18 Min.",
        image: "/images/marketing/digital-marketing-metrics-dashboard-tablet-analysis.jpeg",
        alt: "Disruption der Werbebranche",
        author: "Coday Founder",
        date: "20. April 2026",
        content: [
            {
                id: "key-takeaways-10",
                type: "key-takeaways",
                title: "Executive Summary",
                items: [
                    { text: "Traditionelle Agenturen verdienen mehr, wenn sie langsam arbeiten (Stundensatz-Modell).", icon: "bulb" },
                    { text: "AI-Agents reduzieren Produktionskosten um bis zu 95%.", icon: "check" },
                    { text: "Das 'Hybrid-Modell' (Mensch + Maschine) ist der neue Standard für High-Performance Marketing.", icon: "star" }
                ]
            },
            {
                id: "intro-disruption",
                type: "text",
                heading: "Ihr Retainer verbrennt Geld",
                level: "h2",
                content: "Es ist ein offenes Geheimnis: Das Geschäftsmodell klassischer Werbeagenturen basiert auf Ineffizienz. Je länger sie für eine Aufgabe brauchen, desto mehr verdienen sie. Stundensätze belohnen Langsamkeit.\n\nIn einer Welt ohne AI war das akzeptabel. Man brauchte Manpower. Aber heute? Heute ist es Diebstahl an Ihrem Budget."
            },
            {
                id: "interactive-timeline",
                type: "interactive",
                component: "timeline",
                data: {}
            },
            {
                id: "text-timeline-analysis",
                type: "text",
                content: "**Die Evolution:** Wie Sie oben sehen, bewegen wir uns von 'Menschen-Masse' zu 'AI-Klasse'. Wer heute noch eine Agentur mit 50 Mitarbeitern bezahlt, bezahlt für 45 Leute, die Kaffee trinken und Meetings halten."
            },
            {
                id: "chapter-math",
                type: "text",
                heading: "Die Mathematik des Scheiterns",
                level: "h2",
                content: "Lassen Sie uns rechnen. Eine typische Agentur verlangt 150€ pro Stunde. Ein Junior-Designer braucht 4 Stunden für einen Instagram-Post. Das sind 600€ für ein Bild, das morgen vergessen ist.\n\nEine AI generiert 50 Varianten dieses Bildes in 30 Sekunden. Kosten: 0,02€. \n\nWo fließt die Differenz hin? In den 'Overhead' der Agentur. Miete, Pitch-Decks, Account Manager. Rechnen Sie hier selbst nach:"
            },
            {
                id: "interactive-calc",
                type: "interactive",
                component: "agency-calculator",
                data: {}
            },
            {
                id: "chapter-hybrid",
                type: "text",
                heading: "Die Lösung: Das 'Hybrid-Modell'",
                level: "h2",
                content: "Wir sagen nicht, dass Menschen überflüssig sind. Strategie, Empathie und kreative Exzellenz brauchen Menschen (noch).\n\nAber die **Exekution** muss maschinell sein. Code schreiben. Texte variieren. Bilder skalieren. Daten analysieren. Das ist Job der Maschinen.\n\nDas Coday-Modell funktioniert so:"
            },
            {
                id: "checklist-coday",
                type: "checklist",
                title: "Der Coday Unterschied",
                items: [
                    { text: "Keine Stundenabrechnung (Wir verkaufen Ergebnisse)", checked: true },
                    { text: "1 Stratege steuert 10 AI-Agenten", checked: true },
                    { text: "Echtzeit-Execution (Tage statt Wochen)", checked: true },
                    { text: "Volle Transparenz (Sie besitzen den Code)", checked: true }
                ]
            },
            {
                id: "quote-killer",
                type: "quote",
                text: "Wer als Agentur 2026 noch Stunden verkauft, hat sein Geschäftsmodell nicht verstanden.",
                author: "Industry Insider",
                variant: "large"
            },
            {
                id: "cta-killer",
                type: "cta",
                title: "Wechseln Sie auf die Überholspur",
                description: "Kündigen Sie Ihren ineffizienten Retainer. Wir zeigen Ihnen, wie Sie mit der Hälfte des Budgets das Doppelte erreichen.",
                buttonText: "Strategie-Gespräch",
                href: "/contact",
                variant: "primary"
            }
        ]
    }
];
