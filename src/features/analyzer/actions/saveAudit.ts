'use server';

import { createAdminClient } from '@/shared/lib/supabase/server';
import type { AnalysisResult } from '@/features/analyzer/model/types';

export async function saveAuditResultAction(result: AnalysisResult) {
  try {
    const supabase = createAdminClient();
    
    const { error } = await supabase.from('website_audits').insert({
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
      tech_stack: result.techStack || [],
    });

    if (error) {
      console.error('[Analyzer] Failed to save history:', error);
      return { success: false, error: 'Database error' };
    }

    return { success: true };
  } catch (error) {
    console.error('[Analyzer] Save error:', error);
    return { success: false, error: 'Unexpected error' };
  }
}
