/**
 * Website Analyzer API Service
 * Handles website analysis using Supabase Edge Function (to avoid CORS issues)
 */

import type { AnalysisResult, ActionPlanStep, AgentIssue } from '../../../features/analyzer/model/types';
import { supabase } from '@/shared/lib/supabase/client';

// Get Supabase URL from env for Edge Functions (keep for direct fetch if needed, but client is better)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Step 1: Scan the website (Fetch & Simplify HTML)
 */
export async function scanWebsite(url: string): Promise<{ success: boolean; html: string; url: string; stack?: string[] }> {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ url, action: 'scan' }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Scan fehlgeschlagen');
    }

    return data;
}

/**
 * Step 2: Run a specific agent against the pre-fetched HTML
 */
export async function analyzeAgent<T = unknown>(agent: string, url: string, html: string): Promise<T> {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ action: 'analyze', agent, url, html }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `Agent ${agent} fehlgeschlagen`);
    }

    return data as T;
}

/**
 * Step 3: Generate Action Plan (Optional, Post-Analysis)
 */
export async function generateActionPlan(url: string, issues: AgentIssue[]): Promise<ActionPlanStep[]> {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ action: 'plan', url, issues }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Planung fehlgeschlagen');
    }

    return data;
}



/**
 * Step 4: Save Result to Supabase History
 */
export async function saveAuditResult(result: AnalysisResult): Promise<void> {
    try {
        const { error } = await supabase
            .from('website_audits')
            .insert({
                url: result.url,
                domain: result.domain,
                overall_score: result.overallScore,
                urgency_score: result.urgencyScore,
                performance_data: result.performance,
                seo_data: result.seo,
                security_data: result.security,
                accessibility_data: result.accessibility,
                ux_data: result.ux,
                content_data: result.content,
                status: 'completed',
                analysis_duration_ms: result.duration,
                screenshot_url: result.screenshotUrl,
                tech_stack: result.techStack || []
            });

        if (error) {
            console.error('[Analyzer] Failed to save history:', error);
        } else {
            console.log('[Analyzer] Analysis saved to history');
        }
    } catch (e) {
        console.error('[Analyzer] Save error:', e);
    }
}

export default { scanWebsite, analyzeAgent, generateActionPlan, saveAuditResult };
