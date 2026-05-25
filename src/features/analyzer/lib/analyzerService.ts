/**
 * Website Analyzer API Service — v2.0
 * Handles website analysis using Supabase Edge Function
 */

import type { AnalysisResult, ActionPlanStep, AgentIssue } from '@/features/analyzer/model/types';
import { saveAuditResultAction } from '@/features/analyzer/actions/saveAudit';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Step 1: Scan the website — returns extracted content, headers, and tech stack
 */
export async function scanWebsite(url: string): Promise<{
  success: boolean;
  html: string;
  rawHtml?: string;
  url: string;
  stack?: string[];
  headers?: Record<string, string>;
  robotsTxt?: string | null;
  sitemapXml?: string | null;
}> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ url, action: 'scan' }),
  });

  if (!response.ok) {
    let errorMsg = 'Scan fehlgeschlagen';
    try {
      const data = await response.json();
      errorMsg = data.error || errorMsg;
    } catch {
      errorMsg = `Service Fehler: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return data;
}

/**
 * Step 2: Run a specific agent against the pre-fetched content
 * Now accepts optional headers for the security agent
 */
export async function analyzeAgent<T = unknown>(
  agent: string,
  url: string,
  html: string,
  headers?: Record<string, string>,
  rawHtml?: string,
  robotsTxt?: string | null,
  sitemapXml?: string | null
): Promise<T> {
  const body: Record<string, unknown> = { action: 'analyze', agent, url, html };

  // Pass raw HTML for deterministic fact computation
  if (rawHtml) {
    body.rawHtml = rawHtml;
  }

  // Pass real HTTP headers for all agents (security uses them most)
  if (headers) {
    body.headers = headers;
  }

  // Pass SEO files check results
  if (typeof robotsTxt !== 'undefined') {
    body.robotsTxt = robotsTxt;
  }

  if (typeof sitemapXml !== 'undefined') {
    body.sitemapXml = sitemapXml;
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Agent ${agent} fehlgeschlagen`);
  }

  return data as T;
}

/**
 * Step 3: Generate Action Plan based on found issues
 */
export async function generateActionPlan(
  url: string,
  issues: AgentIssue[]
): Promise<ActionPlanStep[]> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-website`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
    const res = await saveAuditResultAction(result);
    if (!res.success) {
      console.error('[Analyzer] Failed to save history:', res.error);
    }
  } catch (e) {
    console.error('[Analyzer] Save error:', e);
  }
}

export default { scanWebsite, analyzeAgent, generateActionPlan, saveAuditResult };
