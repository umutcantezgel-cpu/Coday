/**
 * Client references and testimonials.
 * Used for the References section on Home page.
 */
export interface ClientReference {
    id: string;
    name: string;
    company: string;
    industry: string;
    image: string;
    quote: string;
}

export const clientReferences: ClientReference[] = [
    {
        id: 'client-1',
        name: 'Sarah Weber',
        company: 'Weber Consulting',
        industry: 'Unternehmensberatung',
        image: '/images/team/ceo.webp',
        quote: 'Unsere neue Website hat die Anfragen verdreifacht.'
    },
    {
        id: 'client-2',
        name: 'Michael Schneider',
        company: 'TechVentures GmbH',
        industry: 'IT & Software',
        image: '/images/team/cto.webp',
        quote: 'Endlich eine Agentur, die versteht, was wir brauchen.'
    },
    {
        id: 'client-3',
        name: 'Anna Müller',
        company: 'Growth Marketing AG',
        industry: 'Marketing',
        image: '/images/team/marketing-lead.webp',
        quote: 'Die beste Investition in unser digitales Wachstum.'
    },
    {
        id: 'client-4',
        name: 'Lisa Schmidt',
        company: 'DesignStudio Berlin',
        industry: 'Kreativagentur',
        image: '/images/team/design-lead.webp',
        quote: 'Professionell, schnell und auf den Punkt.'
    },
    {
        id: 'client-5',
        name: 'Tom Fischer',
        company: 'Fischer Handwerk',
        industry: 'Handwerk & Bau',
        image: '/images/team/tech-lead.webp',
        quote: 'Jetzt kommen die Kunden zu uns, nicht umgekehrt.'
    },
    {
        id: 'client-6',
        name: 'Klaus Bergmann',
        company: 'Bergmann Immobilien',
        industry: 'Immobilien',
        image: '/images/team/advisor.webp',
        quote: 'Unsere Exposés sehen jetzt erstklassig aus.'
    }
];
