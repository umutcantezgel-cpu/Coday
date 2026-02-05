export type BlockType = 'text' | 'image' | 'gallery' | 'video' | 'code' | 'cta' | 'quote' | 'divider';

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

// Union Type
export type ContentBlock =
    | TextBlock
    | ImageBlock
    | GalleryBlock
    | VideoBlock
    | CodeBlock
    | CTABlock
    | QuoteBlock
    | DividerBlock;

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
