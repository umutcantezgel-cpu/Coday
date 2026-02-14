export interface FAQItem {
    id: string;
    question: string;
    answer: string; // Markdown supported
    category: string;
    relatedServices?: string[]; // IDs for contextual injection
    slug?: string;
}

export interface FAQCategory {
    id: string;
    title: string;
    description?: string;
    icon?: string;
}
