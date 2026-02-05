/**
 * Email Report Service
 * Sends analysis reports via email using a backend API
 */

interface EmailReportData {
    recipientEmail: string;
    recipientName: string;
    reportUrl: string;
    domain: string;
    overallScore: number;
    urgencyScore: number;
}

/**
 * Send an analysis report via email
 */
export async function sendEmailReport(data: EmailReportData): Promise<{ success: boolean; error?: string }> {
    try {
        // In production, this would call a backend API endpoint
        // For now, we'll use a mailto fallback

        const subject = encodeURIComponent(`Website-Analyse Report: ${data.domain}`);
        const body = encodeURIComponent(`
Hallo ${data.recipientName},

Hier ist dein Website-Analyse Report für ${data.domain}.

Gesamtscore: ${data.overallScore}/100
Dringlichkeit: ${data.urgencyScore}/100

Vollständiger Report: ${data.reportUrl}

Mit freundlichen Grüßen,
Das Coday Team

---
Coday Digital | The Agency Killer
kontakt@coday.de | coday.de
    `.trim());

        // Open mailto link as fallback
        const mailtoUrl = `mailto:${data.recipientEmail}?subject=${subject}&body=${body}`;

        // Try to open in new window
        window.open(mailtoUrl, '_blank');

        return { success: true };
    } catch (error) {
        console.error('[EmailReport] Send failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unbekannter Fehler'
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
