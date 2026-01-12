// ============================================
// TYPE DEFINITIONS - STRICT TYPING
// ============================================

export interface ProjectImage {
    src: string;
    alt: string;
    caption?: string;
}

export interface Project {
    id: string;
    category: string;
    title: string;
    description: string;
    summary: string; // 2-line summary for card
    bullets: string[];
    technologies: string[];
    link?: string;
    github?: string;
    images?: ProjectImage[];
    content?: string; // Detailed markdown content
}

export interface Experience {
    id: string;
    date: string;
    title: string;
    company: string;
    location: string;
    description: string;
    type: 'work' | 'education' | 'personal';
}

export interface LocationMemory {
    image: string;
    caption: string;
    year: string;
}

export interface Location {
    id: string;
    name: string;
    city?: string;
    country: string;
    period?: string;
    coordinates: [number, number]; // [longitude, latitude]
    description?: string;
    memories?: LocationMemory[];
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
}

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    url: string;
}

export interface Reference {
    id: string;
    name: string;
    title: string;
    company: string;
    quote: string;
    linkedin?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
}

// ============================================
// ANIMATION CONSTANTS - DRY
// ============================================

export const FADE_IN_UP = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
} as const;

export const FADE_IN = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
} as const;

// ============================================
// SOCIAL LINKS - SINGLE SOURCE OF TRUTH
// ============================================

export const SOCIAL_LINKS = {
    github: 'https://github.com/muasevim',
    linkedin: 'https://linkedin.com/in/muasevim',
    email: 'hello@muasevim.com',
} as const;

export const PERSONAL_INFO = {
    name: 'Mua Sevim',
    fullName: 'Muhammed Sevim',
    title: 'Computer Engineer',
    logo: 'MUA',
} as const;
