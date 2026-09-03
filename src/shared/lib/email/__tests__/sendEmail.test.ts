import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { sendEmail, classifyFailure, FALLBACK_FROM } from '@/shared/lib/email/sendEmail';

const input = {
  kind: 'test',
  to: 'someone@example.com',
  subject: 'Hello',
  html: '<p>Hello <a href="https://codayweb.de">Coday</a></p>',
};

describe('sendEmail', () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env.RESEND_API_KEY = 're_test';
    process.env.EMAIL_FROM = 'Coday <umut@codayweb.de>';
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('sends with the configured sender and a plain-text alternative', async () => {
    sendMock.mockResolvedValue({ data: { id: 'em_1' }, error: null });
    const result = await sendEmail(input, { retryDelayMs: 0 });
    expect(result).toMatchObject({
      ok: true,
      id: 'em_1',
      attempts: 1,
      from: 'Coday <umut@codayweb.de>',
    });
    const call = sendMock.mock.calls[0][0];
    expect(call.to).toEqual(['someone@example.com']);
    expect(call.text).toContain('Hello Coday (https://codayweb.de)');
  });

  it('retries transient failures and succeeds', async () => {
    sendMock
      .mockResolvedValueOnce({
        data: null,
        error: { name: 'rate_limit_exceeded', message: 'Too many requests', statusCode: 429 },
      })
      .mockRejectedValueOnce(new Error('fetch failed'))
      .mockResolvedValueOnce({ data: { id: 'em_2' }, error: null });
    const result = await sendEmail(input, { retryDelayMs: 0 });
    expect(result.ok).toBe(true);
    expect(result.attempts).toBe(3);
  });

  it('falls back to the onboarding sender when the domain is rejected', async () => {
    sendMock
      .mockResolvedValueOnce({
        data: null,
        error: {
          name: 'validation_error',
          message: 'The codayweb.de domain is not verified',
          statusCode: 403,
        },
      })
      .mockResolvedValueOnce({ data: { id: 'em_3' }, error: null });
    const result = await sendEmail(input, { retryDelayMs: 0 });
    expect(result.ok).toBe(true);
    expect(result.from).toBe(FALLBACK_FROM);
    expect(sendMock.mock.calls[1][0].from).toBe(FALLBACK_FROM);
  });

  it('gives up on fatal errors without trying the fallback sender', async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'Invalid `to` field', statusCode: 422 },
    });
    const result = await sendEmail(input, { retryDelayMs: 0 });
    expect(result.ok).toBe(false);
    expect(result.attempts).toBe(1);
    expect(result.error).toContain('Invalid');
  });

  it('exhausts retries on both senders for persistent outages', async () => {
    sendMock.mockRejectedValue(new Error('socket hang up'));
    const result = await sendEmail(input, { retryDelayMs: 0, maxAttempts: 2 });
    expect(result.ok).toBe(false);
    expect(result.attempts).toBe(4);
  });

  it('reports a skipped send when no API key is configured', async () => {
    delete process.env.RESEND_API_KEY;
    const result = await sendEmail(input);
    expect(result).toMatchObject({ ok: false, skipped: 'not_configured', attempts: 0 });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('classifies failures', () => {
    expect(classifyFailure({ statusCode: 500, message: 'Internal' })).toBe('transient');
    expect(classifyFailure(new Error('ETIMEDOUT'))).toBe('transient');
    expect(classifyFailure({ message: 'Sender not verified' })).toBe('sender');
    expect(classifyFailure({ statusCode: 422, message: 'Invalid to' })).toBe('fatal');
  });
});
