import { NextResponse } from 'next/server';
import { sendEmail, getAdminEmail, isEmailConfigured } from '@/shared/lib/email/sendEmail';
import {
  renderShell,
  renderParagraph,
  renderKeyValue,
  renderPanel,
} from '@/shared/lib/email/layout';

/**
 * E-mail health check. Sends one test message to ADMIN_EMAIL and reports the
 * delivery result. Protected by EMAIL_TEST_TOKEN: without a matching
 * `?token=` the route behaves like a 404.
 *
 * Usage: GET /api/test-resend-live?token=<EMAIL_TEST_TOKEN>
 */
export async function GET(request: Request) {
  const expected = process.env.EMAIL_TEST_TOKEN;
  const token = new URL(request.url).searchParams.get('token');
  if (!expected || !token || token !== expected) {
    return new NextResponse('Not found', { status: 404 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'RESEND_API_KEY is not configured' },
      { status: 500 }
    );
  }

  const now = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
  const html = renderShell({
    lang: 'de',
    title: 'E-Mail-Check',
    badge: 'Systemtest',
    badgeTone: 'blue',
    headline: 'Der E-Mail-Versand funktioniert',
    intro: 'Diese Nachricht wurde vom Health-Check der Website ausgelöst.',
    body:
      renderParagraph(
        'Wenn Sie diese E-Mail lesen, erreichen Lead- und Terminbenachrichtigungen Ihr Postfach.'
      ) +
      renderPanel(
        renderKeyValue([
          { label: 'Zeitpunkt', value: now },
          { label: 'Umgebung', value: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown' },
        ]),
        'neutral',
        'Details'
      ),
  });

  const result = await sendEmail({
    kind: 'health_check',
    to: getAdminEmail(),
    subject: `E-Mail-Check · Coday · ${now}`,
    html,
  });

  return NextResponse.json(
    { ok: result.ok, attempts: result.attempts, from: result.from, error: result.error },
    { status: result.ok ? 200 : 500 }
  );
}
