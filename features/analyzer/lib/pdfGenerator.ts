/**
 * PDF Report Generator
 * Generates downloadable PDF reports from analysis results
 */

import type { AnalysisResult } from '../model/types';

/**
 * Generate a PDF report from analysis results
 * Uses browser's print functionality for clean PDF generation
 */
export function generatePdfReport(result: AnalysisResult): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Bitte erlaube Pop-ups für diese Seite um den PDF-Report zu generieren.');
        return;
    }

    const urgencyLevel = getUrgencyLevel(result.urgencyScore);
    const analysisDate = new Date(result.analyzedAt).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Website-Analyse: ${result.domain}</title>
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
      border-bottom: 3px solid #5227FF;
    }
    .logo {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #5227FF 0%, #8B5CF6 50%, #EC4899 100%);
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
      color: #5227FF;
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
      border-left: 4px solid #5227FF;
    }
    .category-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .category-score {
      font-size: 24px;
      font-weight: 700;
      color: #5227FF;
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
    .issue.kritisch { border-left-color: #dc2626; }
    .issue.hoch { border-left-color: #f97316; }
    .issue.mittel { border-left-color: #eab308; }
    .issue.niedrig { border-left-color: #22c55e; }
    
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
    .issue-severity.kritisch { background: #fef2f2; color: #dc2626; }
    .issue-severity.hoch { background: #fff7ed; color: #f97316; }
    .issue-severity.mittel { background: #fefce8; color: #eab308; }
    .issue-severity.niedrig { background: #f0fdf4; color: #22c55e; }
    
    .issue-description {
      font-size: 14px;
      color: #666;
    }
    .issue-fix {
      font-size: 13px;
      color: #5227FF;
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
      background: linear-gradient(135deg, #5227FF 0%, #8B5CF6 100%);
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
      <div class="score-label">Gesamtscore</div>
    </div>
    <div class="score-box">
      <div class="score-value urgency-value">${result.urgencyScore}</div>
      <div class="score-label">Dringlichkeit: ${urgencyLevel.label}</div>
    </div>
  </div>
  
  <div class="section">
    <h2 class="section-title">Kategorien im Überblick</h2>
    <div class="category-grid">
      ${generateCategoryCards(result)}
    </div>
  </div>
  
  <div class="section issues">
    <h2 class="section-title">Identifizierte Probleme</h2>
    ${generateIssues(result)}
  </div>
  
  <div class="cta">
    <h3>🚀 Kostenloses Beratungsgespräch</h3>
    <p>Lassen Sie uns gemeinsam Ihre Website optimieren. Buchen Sie jetzt Ihr kostenloses 30-Minuten-Gespräch.</p>
    <p style="margin-top: 10px;"><strong>kontakt@coday.de</strong></p>
  </div>
  
  <div class="footer">
    <p>© ${new Date().getFullYear()} Coday Digital | coday.de</p>
    <p>Dieser Report wurde automatisch durch KI-Analyse generiert.</p>
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

function getUrgencyLevel(score: number): { label: string; color: string } {
    if (score >= 80) return { label: 'Kritisch', color: '#dc2626' };
    if (score >= 60) return { label: 'Hoch', color: '#f97316' };
    if (score >= 40) return { label: 'Mittel', color: '#eab308' };
    return { label: 'Niedrig', color: '#22c55e' };
}

function generateCategoryCards(result: AnalysisResult): string {
    const categories = [
        { name: 'Performance', data: result.performance },
        { name: 'SEO', data: result.seo },
        { name: 'Sicherheit', data: result.security },
        { name: 'Barrierefreiheit', data: result.accessibility },
        { name: 'UX/Design', data: result.ux },
        { name: 'Content', data: result.content },
    ];

    return categories.map(cat => `
    <div class="category-card">
      <div class="category-name">${cat.name}</div>
      <div class="category-score">${cat.data?.score ?? 'N/A'}/100</div>
      <div class="category-summary">${cat.data?.summary ?? ''}</div>
    </div>
  `).join('');
}

function generateIssues(result: AnalysisResult): string {
    const allIssues: Array<{ severity: string; title: string; description: string; fix: string }> = [];

    const categories = ['performance', 'seo', 'security', 'accessibility', 'ux', 'content'] as const;

    for (const cat of categories) {
        const categoryData = result[cat];
        if (categoryData?.issues) {
            allIssues.push(...categoryData.issues);
        }
    }

    // Sort by severity
    const severityOrder = { kritisch: 0, hoch: 1, mittel: 2, niedrig: 3 };
    allIssues.sort((a, b) =>
        (severityOrder[a.severity as keyof typeof severityOrder] ?? 4) -
        (severityOrder[b.severity as keyof typeof severityOrder] ?? 4)
    );

    if (allIssues.length === 0) {
        return '<p style="color: #22c55e;">Keine kritischen Probleme gefunden! 🎉</p>';
    }

    return allIssues.slice(0, 10).map(issue => `
    <div class="issue ${issue.severity}">
      <span class="issue-severity ${issue.severity}">${issue.severity.toUpperCase()}</span>
      <div class="issue-title">${issue.title}</div>
      <div class="issue-description">${issue.description}</div>
      <div class="issue-fix">💡 ${issue.fix}</div>
    </div>
  `).join('');
}

export default { generatePdfReport };
