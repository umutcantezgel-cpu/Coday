import type { TFunction } from 'i18next';

interface EmailReportData {
  recipientEmail: string;
  recipientName: string;
  reportUrl: string;
  domain: string;
  overallScore: number;
  urgencyScore: number;
  t: TFunction;
}

/**
 * Send an analysis report via email
 */
export async function sendEmailReport(
  data: EmailReportData
): Promise<{ success: boolean; error?: string }> {
  try {
    // In production, this would call a backend API endpoint
    // For now, we'll use a mailto fallback
    const { t } = data;

    const subject = encodeURIComponent(t('email.subject', { domain: data.domain }));
    const body = encodeURIComponent(
      `
${t('email.body_greeting', { name: data.recipientName })}

${t('email.body_intro', { domain: data.domain })}

${t('email.body_score', { score: data.overallScore })}
${t('email.body_urgency', { score: data.urgencyScore })}

${t('email.body_link', { url: data.reportUrl })}

${t('email.signature')}
    `.trim()
    );

    // Open mailto link as fallback
    const mailtoUrl = `mailto:${data.recipientEmail}?subject=${subject}&body=${body}`;

    // Try to open in new window
    window.open(mailtoUrl, '_blank');

    return { success: true };
  } catch (error) {
    console.error('[EmailReport] Send failed:', error);
    return {
      success: false,
      // We can't use t here easily if it fails before t is available, but data.t should be available
      error: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default { sendEmailReport, isValidEmail };
