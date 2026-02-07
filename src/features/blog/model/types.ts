export type BlockType =
    | 'text' | 'image' | 'gallery' | 'video' | 'code' | 'cta' | 'quote' | 'divider'
    | 'comparison' | 'checklist' | 'accordion' | 'interactive' | 'key-takeaways';

export interface BaseBlock {
    id: string;
    type: BlockType;
}

export interface TextBlock extends BaseBlock {
    type: 'text';
    content: string; // Markdown support
    heading?: string;
    level?: 'h2' | 'h3' | 'h4';
}

export interface ImageBlock extends BaseBlock {
    type: 'image';
    src: string;
    alt: string;
    caption?: string;
    layout: 'default' | 'wide' | 'fullscreen';
}

export interface GalleryBlock extends BaseBlock {
    type: 'gallery';
    images: Array<{
        src: string;
        alt: string;
    }>;
}

export interface VideoBlock extends BaseBlock {
    type: 'video';
    src: string; // URL or local path
    poster?: string;
    caption?: string;
    autoPlay?: boolean;
}

export interface CodeBlock extends BaseBlock {
    type: 'code';
    code: string;
    language: string;
    filename?: string;
}

export interface CTABlock extends BaseBlock {
    type: 'cta';
    title: string;
    description: string;
    buttonText: string;
    href: string;
    variant: 'primary' | 'secondary' | 'glass';
}

export interface QuoteBlock extends BaseBlock {
    type: 'quote';
    text: string;
    author?: string;
    cite?: string;
    variant?: 'default' | 'large' | 'gradient';
}

export interface DividerBlock extends BaseBlock {
    type: 'divider';
    variant: 'line' | 'dots' | 'gradient';
}

// New Interactive Types

export interface ComparisonBlock extends BaseBlock {
    type: 'comparison';
    variant: 'pros-cons' | 'versus' | 'feature-grid';
    items: Array<{
        title: string;
        points: string[];
        isHighlight?: boolean; // e.g. "My Solution" vs "Competitor"
    }>;
}

export interface ChecklistBlock extends BaseBlock {
    type: 'checklist';
    title?: string;
    items: Array<{
        text: string;
        checked?: boolean; // default state
    }>;
}

export interface AccordionBlock extends BaseBlock {
    type: 'accordion';
    items: Array<{
        title: string;
        content: string; // supports limited markdown
    }>;
}

export interface KeyTakeawaysBlock extends BaseBlock {
    type: 'key-takeaways';
    title?: string;
    items: Array<{
        text: string;
        icon?: 'bulb' | 'check' | 'star';
    }>;
}

// Universal container for React interactive components
export interface InteractiveBlock extends BaseBlock {
    type: 'interactive';
    component: 'roi-calculator' | 'speed-test' | 'quiz' | 'timeline' | 'mobile-simulator' | 'color-picker' | 'seo-graph' | 'traffic-estimator' | 'tech-stack-explorer' | 'data-maturity' | 'hack-simulator' | 'ab-test' | 'voice-demo' | 'ai-cost' | 'agency-calculator';
    data?: Record<string, unknown>; // Flexible props for the specific component
}

// Union Type
export type ContentBlock =
    | TextBlock
    | ImageBlock
    | GalleryBlock
    | VideoBlock
    | CodeBlock
    | CTABlock
    | QuoteBlock
    | DividerBlock
    | ComparisonBlock
    | ChecklistBlock
    | AccordionBlock
    | InteractiveBlock
    | KeyTakeawaysBlock;

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    image: string; // Hero image
    alt: string;
    author: string;
    date: string;
    content: ContentBlock[];
}
