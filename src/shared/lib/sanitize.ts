/**
 * SEQ-26: Input sanitization utilities for DSGVO-compliant form handling.
 * Prevents XSS and injection attacks on client-submitted data.
 *
 * @example
 * const safe = sanitizeInput(userInput);
 * const safeHtml = stripHtml(dangerousHtml);
 */

/**
 * Strip all HTML tags from a string. Prevents XSS in user-submitted content.
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize user input: trim whitespace, strip HTML, normalize whitespace.
 */
export function sanitizeInput(input: string): string {
  return stripHtml(input).trim().replace(/\s+/g, ' '); // collapse multiple spaces
}

/**
 * Validate email format (basic RFC 5322 subset).
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate German phone number format.
 */
export function isValidPhone(phone: string): boolean {
  // Allows: +49..., 0049..., 0..., spaces, dashes, parens
  return /^(\+49|0049|0)[\s\-/()0-9]{6,20}$/.test(phone.trim());
}

/**
 * Escape special characters for safe inclusion in HTML attributes.
 */
export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return input.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Rate limiter for form submissions (client-side).
 * Prevents rapid-fire submissions.
 */
export function createSubmitThrottle(minIntervalMs: number = 3000) {
  let lastSubmit = 0;

  return {
    canSubmit(): boolean {
      const now = Date.now();
      return now - lastSubmit >= minIntervalMs;
    },
    markSubmitted(): void {
      lastSubmit = Date.now();
    },
  };
}
