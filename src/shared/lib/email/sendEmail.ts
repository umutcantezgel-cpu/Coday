import { Resend } from 'resend';
import { htmlToText } from './layout';

/**
 * One robust entry point for every transactional e-mail.
 *
 * - Retries transient failures (rate limits, 5xx, network) with backoff.
 * - Falls back from the custom domain sender to Resend's onboarding sender
 *   when the domain is rejected, so a lapsed DNS record never loses a lead.
 * - Always ships a plain-text alternative.
 * - Never throws: callers get a result object and decide what "success" means.
 */

export interface EmailAttachment {
  filename: string;
  /** Base64 string or raw Buffer. */
  content: string | Buffer;
  contentType?: string;
}

export interface SendEmailInput {
  /** Short label for logs, e.g. "lead_agency". */
  kind: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
  tags?: Array<{ name: string; value: string }>;
}

export interface SendEmailOptions {
  maxAttempts?: number;
  retryDelayMs?: number;
}

export interface SendEmailResult {
  ok: boolean;
  id?: string;
  from?: string;
  attempts: number;
  error?: string;
  skipped?: 'not_configured';
}

export const FALLBACK_FROM = 'Coday <onboarding@resend.dev>';

export function getDefaultFrom(): string {
  return process.env.EMAIL_FROM || 'Coday <umut@codayweb.de>';
}

export function getPrimaryAdminEmail(): string {
  return process.env.PRIMARY_ADMIN_EMAIL || 'umut@codayweb.de';
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'umut@codayweb.de';
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

type FailureKind = 'transient' | 'sender' | 'fatal';

interface ResendLikeError {
  name?: string;
  message?: string;
  statusCode?: number;
}

function describe(err: unknown): string {
  if (!err) return 'unknown error';
  if (err instanceof Error) return err.message;
  const e = err as ResendLikeError;
  return [e.name, e.message, e.statusCode ? `(${e.statusCode})` : ''].filter(Boolean).join(' ');
}

export function classifyFailure(err: unknown): FailureKind {
  const e = (err ?? {}) as ResendLikeError;
  const status = typeof e.statusCode === 'number' ? e.statusCode : undefined;
  const text =
    `${e.name ?? ''} ${e.message ?? ''} ${err instanceof Error ? err.message : ''}`.toLowerCase();

  if (
    status === 429 ||
    (status !== undefined && status >= 500) ||
    /rate.?limit|too many|timeout|timed.?out|network|fetch failed|econn|socket|unavailable|temporar/.test(
      text
    )
  ) {
    return 'transient';
  }
  if (/domain|sender|from address|from_address|not verified|unverified|verify/.test(text)) {
    return 'sender';
  }
  return 'fatal';
}

function sleep(ms: number): Promise<void> {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

export async function sendEmail(
  input: SendEmailInput,
  options: SendEmailOptions = {}
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`[email:${input.kind}] RESEND_API_KEY missing, e-mail not sent.`);
    return { ok: false, attempts: 0, skipped: 'not_configured', error: 'RESEND_API_KEY missing' };
  }

  const maxAttempts = Math.max(1, options.maxAttempts ?? 3);
  const retryDelayMs = options.retryDelayMs ?? (process.env.NODE_ENV === 'test' ? 0 : 400);
  const senders = Array.from(new Set([getDefaultFrom(), FALLBACK_FROM]));
  const resend = new Resend(apiKey);
  const to = Array.isArray(input.to) ? input.to : [input.to];
  const text = input.text ?? htmlToText(input.html);

  let attempts = 0;
  let lastError = 'unknown error';

  for (const from of senders) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      attempts++;
      try {
        const res = await resend.emails.send({
          from,
          to,
          subject: input.subject,
          html: input.html,
          text,
          replyTo: input.replyTo,
          attachments: input.attachments?.map((a) => ({
            filename: a.filename,
            content: a.content,
            contentType: a.contentType,
          })),
          tags: input.tags,
        });
        if (res.error) throw res.error;
        return { ok: true, id: res.data?.id, from, attempts };
      } catch (err) {
        const kind = classifyFailure(err);
        lastError = describe(err);
        console.warn(
          `[email:${input.kind}] attempt ${attempt}/${maxAttempts} via ${from} failed (${kind}): ${lastError}`
        );

        if (kind === 'transient' && attempt < maxAttempts) {
          await sleep(retryDelayMs * attempt);
          continue;
        }
        if (kind === 'fatal') {
          return { ok: false, attempts, from, error: lastError };
        }
        // 'sender' or transient retries exhausted → try the next sender
        break;
      }
    }
  }

  console.error(`[email:${input.kind}] giving up after ${attempts} attempt(s): ${lastError}`);
  return { ok: false, attempts, error: lastError };
}
