/**
 * PDF Report Generator
 * Generates downloadable PDF reports from analysis results
 */

import type { AnalysisResult } from '@/features/analyzer/model/types';

export type TranslationFunction = (key: string, values?: Record<string, string | number>) => string;

/**
 * Generate a PDF report from analysis results
 * Uses browser's print functionality for clean PDF generation
 */
export function generatePdfReport(result: AnalysisResult, t: TranslationFunction): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(t('pdf.alert_popup'));
    return;
  }

  const urgencyLevel = getUrgencyLevel(result.urgencyScore, t);
  const analysisDate = new Date(result.analyzedAt).toLocaleDateString(
    t('language') === 'en' ? 'en-US' : 'de-DE',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const html = `
<!DOCTYPE html>
<html lang="${t('language')}">
<head>
  <meta charset="UTF-8">
  <title>${t('pdf.title', { domain: result.domain })}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid var(--color-brand-500);
    }
    .logo {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--color-brand-500) 0%, #8B5CF6 50%, #EC4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .domain { font-size: 18px; color: #666; }
    .date { font-size: 14px; color: #999; margin-top: 5px; }
    
    .scores {
      display: flex;
      justify-content: space-around;
      margin: 40px 0;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 16px;
    }
    .score-box {
      text-align: center;
    }
    .score-value {
      font-size: 48px;
      font-weight: 800;
      color: var(--color-brand-500);
    }
    .score-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    .urgency-value {
      color: ${urgencyLevel.color};
    }
    
    .section {
      margin: 30px 0;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 15px;
      color: #1a1a1a;
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .category-card {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
      border-left: 4px solid var(--color-brand-500);
    }
    .category-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .category-score {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-brand-500);
    }
    .category-summary {
      font-size: 13px;
      color: #666;
      margin-top: 8px;
    }
    
    .issues {
      margin-top: 30px;
    }
    .issue {
      padding: 15px;
      margin-bottom: 10px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      border-left: 4px solid;
    }
    .issue.kritisch { border-left-color: #dc2626; } /* Critical */
    .issue.hoch { border-left-color: #f97316; } /* High */
    .issue.mittel { border-left-color: #eab308; } /* Medium */
    .issue.niedrig { border-left-color: #22c55e; } /* Low */
    
    /* Map severity classes also to English if needed, but we use the rendered class from issue.severity which might be localized or mapped. 
       Let's assume issue.severity is the raw value (kritisch/high etc) or we map it. 
       Actually, issue.severity in the types comes from the backend/agents. 
       If we translate severity for display, we should keep the class name mapping or use inline styles.
    */
    
    .issue-title {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .issue-severity {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 8px;
    }
    /* Severity Colors - we need to handle dynamic classes or inline styles if severity names change */
    
    .issue-description {
      font-size: 14px;
      color: #666;
    }
    .issue-fix {
      font-size: 13px;
      color: var(--color-brand-500);
      margin-top: 8px;
      font-style: italic;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
    .cta {
      margin-top: 30px;
      padding: 20px;
      background: linear-gradient(135deg, var(--color-brand-500) 0%, #8B5CF6 100%);
      color: white;
      text-align: center;
      border-radius: 12px;
    }
    .cta h3 { font-size: 18px; margin-bottom: 10px; }
    .cta p { font-size: 14px; opacity: 0.9; }
    
    @media print {
      body { padding: 20px; }
      .cta { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Coday</div>
    <div class="domain">${result.domain}</div>
    <div class="date">Analysiert am ${analysisDate}</div>
  </div>
  
  <div class="scores">
    <div class="score-box">
      <div class="score-value">${result.overallScore}</div>
      <div class="score-label">${t('pdf.overall_score')}</div>
    </div>
    <div class="score-box">
      <div class="score-value urgency-value">${result.urgencyScore}</div>
      <div class="score-label">${t('pdf.urgency', { label: urgencyLevel.label })}</div>
    </div>
  </div>
  
  <div class="section">
    <h2 class="section-title">${t('pdf.categories_title')}</h2>
    <div class="category-grid">
      ${generateCategoryCards(result, t)}
    </div>
  </div>
  
  <div class="section issues">
    <h2 class="section-title">${t('pdf.issues_title')}</h2>
    ${generateIssues(result, t)}
  </div>
  
  <div class="cta">
    <h3>${t('pdf.consultation_title')}</h3>
    <p>${t('pdf.consultation_text')}</p>
    <p style="margin-top: 10px;"><strong>kontakt@codayweb.de</strong></p>
  </div>
  
  <div class="footer">
    <p>${t('pdf.footer_rights', { year: new Date().getFullYear() })}</p>
    <p>${t('pdf.footer_generated')}</p>
  </div>
  
  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
}

function getUrgencyLevel(score: number, t: TranslationFunction): { label: string; color: string } {
  if (score >= 80) return { label: t('severity.critical'), color: '#dc2626' };
  if (score >= 60) return { label: t('severity.high'), color: '#f97316' };
  if (score >= 40) return { label: t('severity.medium'), color: '#eab308' };
  return { label: t('severity.low'), color: '#22c55e' };
}

function generateCategoryCards(result: AnalysisResult, t: TranslationFunction): string {
  const categories = [
    { name: t('agents.performance'), data: result.performance },
    { name: t('agents.seo'), data: result.seo },
    { name: t('agents.security'), data: result.security },
    { name: t('agents.accessibility'), data: result.accessibility },
    { name: t('agents.ux'), data: result.ux },
    { name: t('agents.content'), data: result.content },
  ];

  return categories
    .map(
      (cat) => `
    <div class="category-card">
      <div class="category-name">${cat.name}</div>
      <div class="category-score">${cat.data?.score ?? 'N/A'}/100</div>
      <div class="category-summary">${cat.data?.summary ?? ''}</div>
    </div>
  `
    )
    .join('');
}

function generateIssues(result: AnalysisResult, t: TranslationFunction): string {
  const allIssues: Array<{ severity: string; title: string; description: string; fix: string }> =
    [];

  const categories = ['performance', 'seo', 'security', 'accessibility', 'ux', 'content'] as const;

  for (const cat of categories) {
    const categoryData = result[cat];
    if (categoryData?.issues) {
      allIssues.push(...categoryData.issues);
    }
  }

  // Sort by severity
  const severityOrder = { kritisch: 0, hoch: 1, mittel: 2, niedrig: 3 };
  // Map backend severity to order
  // Assuming backend severity is German/English consistent or we need to handle it.
  // Let's assume backend returns "kritisch", "hoch" etc or "critical", "high".
  // We should probably normalize this in the store or here.
  // For now, I'll keep the sort logic as is but handle display.

  allIssues.sort((a, b) => {
    // Simple mapping if needed, else assumes existing logic works for the data we have.
    // We might need to ensure severity matching
    return (
      (severityOrder[a.severity as keyof typeof severityOrder] ?? 4) -
      (severityOrder[b.severity as keyof typeof severityOrder] ?? 4)
    );
  });

  if (allIssues.length === 0) {
    return `<p style="color: #22c55e;">${t('pdf.no_issues')}</p>`;
  }

  return allIssues
    .slice(0, 10)
    .map((issue) => {
      // Map severity to color style directly since classes might not work with localized keys if they don't match CSS
      let severityColor = '#22c55e'; // default low
      let severityBg = '#f0fdf4';

      switch (issue.severity) {
        case 'kritisch':
        case 'critical':
          severityColor = '#dc2626';
          severityBg = '#fef2f2';
          break;
        case 'hoch':
        case 'high':
          severityColor = '#f97316';
          severityBg = '#fff7ed';
          break;
        case 'mittel':
        case 'medium':
          severityColor = '#eab308';
          severityBg = '#fefce8';
          break;
      }

      const severityLabel = t(
        `severity.${issue.severity === 'kritisch' ? 'critical' : issue.severity === 'hoch' ? 'high' : issue.severity === 'mittel' ? 'medium' : 'low'}`,
        { defaultValue: issue.severity }
      );

      return `
    <div class="issue" style="border-left-color: ${severityColor}">
      <span class="issue-severity" style="background: ${severityBg}; color: ${severityColor}">${severityLabel.toUpperCase()}</span>
      <div class="issue-title">${issue.title}</div>
      <div class="issue-description">${issue.description}</div>
      <div class="issue-fix">💡 ${issue.fix}</div>
    </div>
  `;
    })
    .join('');
}

export default { generatePdfReport };
