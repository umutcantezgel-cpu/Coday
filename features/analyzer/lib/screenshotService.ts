/**
 * Screenshot Service
 * Captures website screenshots using a headless browser approach
 * Note: In production, this would use a backend service with Puppeteer
 * For client-side, we use html2canvas or an external API
 */

// Screenshot API configuration (using external service)
const SCREENSHOT_API = 'https://api.screenshotmachine.com';

interface ScreenshotOptions {
    width?: number;
    height?: number;
    fullPage?: boolean;
    format?: 'png' | 'jpg' | 'webp';
}

/**
 * Capture a screenshot of a website
 * Uses screenshot API service for cross-origin capture
 */
export async function captureScreenshot(
    url: string,
    options: ScreenshotOptions = {}
): Promise<string | null> {
    const {
        width = 1280,
        height = 800,
        fullPage = false,
        format = 'png',
    } = options;

    try {
        // Option 1: Use Google PageSpeed Insights screenshot (free)
        const pagespeedUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=desktop&category=performance`;

        const response = await fetch(pagespeedUrl);
        if (!response.ok) {
            throw new Error('PageSpeed API failed');
        }

        const data = await response.json();

        // Extract screenshot from audit results
        const screenshot = data.lighthouseResult?.audits?.['final-screenshot']?.details?.data;

        if (screenshot) {
            return screenshot; // Returns base64 data URL
        }

        // Option 2: Fallback to placeholder
        console.warn('[Screenshot] No screenshot available from PageSpeed');
        return null;
    } catch (error) {
        console.error('[Screenshot] Capture failed:', error);
        return null;
    }
}

/**
 * Generate a screenshot thumbnail
 */
export function generateThumbnail(base64Data: string, maxWidth: number = 400): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ratio = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * ratio;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/webp', 0.8));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = base64Data;
    });
}

export default { captureScreenshot, generateThumbnail };
