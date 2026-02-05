import { AnalysisResult } from './types';

export const DEMO_RESULT: AnalysisResult = {
    id: 'demo-audit-123',
    url: 'https://example-agency.com',
    domain: 'example-agency.com',
    overallScore: 42,
    urgencyScore: 85,
    analyzedAt: new Date().toISOString(),
    duration: 1240,
    techStack: ['WordPress', 'jQuery', 'Apache'],
    screenshotUrl: 'https://via.placeholder.com/1200x630.png?text=Website+Preview',

    performance: {
        score: 35,
        summary: "Die Ladezeiten sind kritisch. LCP liegt bei >4.5s durch unkomprimierte Bilder.",
        metrics: {
            lcp: { value: "4.8s", status: "schlecht" },
            fid: { value: "240ms", status: "schlecht" },
            cls: { value: "0.25", status: "mittel" },
            ttfb: { value: "1.2s", status: "mittel" }
        },
        issues: [
            { severity: 'kritisch', title: 'Bilder nicht optimiert', description: '3 Bilder sind >2MB groß. Das verlangsamt die Seite massiv.', fix: 'WebP Format nutzen' },
            { severity: 'hoch', title: 'Server antwortet langsam', description: 'TTFB ist mit 1.2s zu hoch.', fix: 'Caching aktivieren' }
        ]
    },

    seo: {
        score: 65,
        summary: "Grundlagen sind da, aber wichtige Keywords im Title fehlen.",
        checks: {
            metaTitle: { found: true, value: "Home - Example Agency", quality: "mittel" },
            metaDescription: { found: true, value: "Wir machen Webdesign.", quality: "schlecht" },
            h1: { count: 1, values: ["Willkommen"], quality: "schlecht" },
            images: { total: 12, withAlt: 5, percentage: 41 },
            internalLinks: 5,
            schemaMarkup: false
        },
        issues: [
            { severity: 'hoch', title: 'Meta-Description zu kurz', description: 'Nur 3 Wörter. Klickrate verschenkt.', fix: 'USP integrieren' },
            { severity: 'mittel', title: 'H1 ist nichtssagend', description: '"Willkommen" ist kein Ranking-Keyword.', fix: 'Keyword in H1 nutzen' }
        ]
    },

    security: {
        score: 20,
        summary: "Sicherheitsrisiko! Kein HTTPS und veraltete Software.",
        checks: {
            https: { enabled: false, valid: false },
            headers: { csp: false, xFrameOptions: false, hsts: false, xContentType: true },
            cookies: { secure: false, httpOnly: true }
        },
        issues: [
            { severity: 'kritisch', title: 'Kein HTTPS', description: 'Daten werden unverschlüsselt übertragen.', fix: 'SSL Zertifikat installieren' },
            { severity: 'hoch', title: 'WordPress Version veraltet', description: 'Version 5.8 hat bekannte Lücken.', fix: 'Auf 6.x updaten' }
        ]
    },

    accessibility: {
        score: 80,
        summary: "Gute Zugänglichkeit, Kontraste passen meistens.",
        wcagLevel: 'AA',
        checks: {
            colorContrast: { passed: 15, failed: 2 },
            keyboardNav: true,
            ariaLabels: { used: true, quality: 'gut' },
            formLabels: { total: 4, labeled: 4 }
        },
        issues: [
            { severity: 'niedrig', title: 'Leichter Kontrastfehler', description: 'Grau auf Weiß im Footer schwer lesbar.', fix: 'Farbe abdunkeln' }
        ]
    },

    ux: {
        score: 45,
        summary: "Mobilansicht bricht, Buttons sind zu klein.",
        checks: {
            mobileResponsive: false,
            navigation: { quality: 'mittel', depth: 3 },
            cta: { visible: true, count: 1, quality: 'schlecht' },
            trustSignals: { count: 0, types: [] },
            visualHierarchy: 'mittel'
        },
        issues: [
            { severity: 'hoch', title: 'Nicht Mobile-Optimiert', description: 'User müssen zoomen um Texte zu lesen.', fix: 'Responsive CSS prüfen' },
            { severity: 'mittel', title: 'CTA kaum sichtbar', description: 'Button hebt sich farblich nicht ab.', fix: 'Akzentfarbe nutzen' }
        ]
    },

    content: {
        score: 60,
        summary: "Texte sind okay, aber wenig überzeugend.",
        checks: {
            headline: { quality: 'mittel', hasUVP: false },
            readability: { score: 60, gradeLevel: '10. Klasse', quality: 'gut' },
            socialProof: { found: false, types: [] },
            ctaText: { quality: 'schlecht', examples: ["Hier klicken"] },
            freshness: 'unbekannt'
        },
        issues: [
            { severity: 'mittel', title: 'Kein Social Proof', description: 'Keine Kundenstimmen oder Logos.', fix: 'Testimonials einfügen' }
        ]
    },

    actionPlan: [
        { step: 1, title: 'HTTPS aktivieren', description: 'SSL Zertifikat installieren um Abmahnungen zu vermeiden.', impact: 'hoch', effort: 'niedrig', role: 'dev' },
        { step: 2, title: 'Bilder komprimieren', description: 'Alle Bilder in Next-Gen Formate wandeln.', impact: 'hoch', effort: 'mittel', role: 'dev' },
        { step: 3, title: 'Verkaufsstarke H1', description: 'Klare Positionierung statt "Willkommen".', impact: 'mittel', effort: 'niedrig', role: 'marketing' }
    ]
};
