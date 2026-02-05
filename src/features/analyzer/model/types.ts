/**
 * Website Analyzer Types
 */

// Agent Result Types
export interface AgentIssue {
    severity: 'kritisch' | 'hoch' | 'mittel' | 'niedrig';
    title: string;
    description: string;
    fix: string;
}

export interface PerformanceResult {
    score: number;
    metrics: {
        lcp: { value: string; status: 'gut' | 'mittel' | 'schlecht' };
        fid: { value: string; status: 'gut' | 'mittel' | 'schlecht' };
        cls: { value: string; status: 'gut' | 'mittel' | 'schlecht' };
        ttfb: { value: string; status: 'gut' | 'mittel' | 'schlecht' };
    };
    issues: AgentIssue[];
    summary: string;
}

export interface SeoResult {
    score: number;
    checks: {
        metaTitle: { found: boolean; value: string; quality: 'gut' | 'mittel' | 'schlecht' };
        metaDescription: { found: boolean; value: string; quality: 'gut' | 'mittel' | 'schlecht' };
        h1: { count: number; values: string[]; quality: 'gut' | 'mittel' | 'schlecht' };
        images: { total: number; withAlt: number; percentage: number };
        internalLinks: number;
        schemaMarkup: boolean;
    };
    issues: AgentIssue[];
    summary: string;
}

export interface SecurityResult {
    score: number;
    checks: {
        https: { enabled: boolean; valid: boolean };
        headers: {
            csp: boolean;
            xFrameOptions: boolean;
            hsts: boolean;
            xContentType: boolean;
        };
        cookies: { secure: boolean; httpOnly: boolean };
    };
    issues: AgentIssue[];
    summary: string;
}

export interface AccessibilityResult {
    score: number;
    wcagLevel: 'A' | 'AA' | 'AAA' | 'nicht erfüllt';
    checks: {
        colorContrast: { passed: number; failed: number };
        keyboardNav: boolean;
        ariaLabels: { used: boolean; quality: 'gut' | 'mittel' | 'schlecht' };
        formLabels: { total: number; labeled: number };
    };
    issues: AgentIssue[];
    summary: string;
}

export interface UxResult {
    score: number;
    checks: {
        mobileResponsive: boolean;
        navigation: { quality: 'gut' | 'mittel' | 'schlecht'; depth: number };
        cta: { visible: boolean; count: number; quality: 'gut' | 'mittel' | 'schlecht' };
        trustSignals: { count: number; types: string[] };
        visualHierarchy: 'gut' | 'mittel' | 'schlecht';
    };
    issues: AgentIssue[];
    summary: string;
}

export interface ContentResult {
    score: number;
    checks: {
        headline: { quality: 'gut' | 'mittel' | 'schlecht'; hasUVP: boolean };
        readability: { score: number; gradeLevel: string; quality: 'gut' | 'mittel' | 'schlecht' };
        socialProof: { found: boolean; types: string[] };
        ctaText: { quality: 'gut' | 'mittel' | 'schlecht'; examples: string[] };
        freshness: 'aktuell' | 'veraltet' | 'unbekannt';
    };
    issues: AgentIssue[];
    summary: string;
}

// Combined Analysis Result
export interface AnalysisResult {
    id: string;
    url: string;
    domain: string;
    overallScore: number;
    urgencyScore: number;

    performance: PerformanceResult;
    seo: SeoResult;
    security: SecurityResult;
    accessibility: AccessibilityResult;
    ux: UxResult;
    content: ContentResult;

    screenshotUrl?: string;
    analyzedAt: string;
    duration: number;
    techStack?: string[];
    actionPlan?: ActionPlanStep[];
}

export interface ActionPlanStep {
    step: number;
    title: string;
    description: string;
    impact: 'hoch' | 'mittel' | 'niedrig';
    effort: 'hoch' | 'mittel' | 'niedrig';
    role: 'dev' | 'marketing' | 'seo' | 'design';
}

// Analysis Status
export type AnalysisStatus = 'idle' | 'validating' | 'analyzing' | 'completed' | 'error';

export interface AnalysisProgress {
    status: AnalysisStatus;
    currentAgent?: string;
    completedAgents: string[];
    progress: number; // 0-100
    error?: string;
}

// Urgency Score Breakdown
export interface UrgencyBreakdown {
    score: number;
    factors: Array<{
        name: string;
        weight: number;
        value: number;
        description: string;
    }>;
    recommendation: string;
}

// Chat Types
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
}

export interface ChatSession {
    id: string;
    visitorId: string;
    messages: ChatMessage[];
    context: {
        currentPage?: string;
        analysisId?: string;
    };
    isActive: boolean;
    createdAt: string;
}
