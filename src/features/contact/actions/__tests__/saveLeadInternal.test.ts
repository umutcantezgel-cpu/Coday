import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.fn();
const insertMock = vi.fn();
let ipCounter = 0;

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock('next/headers', () => ({
  headers: async () => ({
    get: (key: string) => (key === 'x-forwarded-for' ? `10.0.0.${++ipCounter}` : null),
  }),
}));

vi.mock('@/shared/lib/supabase/server', () => ({
  createAdminClient: () => ({
    from: () => ({ insert: insertMock }),
  }),
}));

import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';

describe('saveLeadInternalAction', () => {
  beforeEach(() => {
    sendMock.mockReset();
    insertMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: 'email_1' }, error: null });
    insertMock.mockResolvedValue({ error: null });
    process.env.RESEND_API_KEY = 're_test';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';
    delete process.env.SLACK_WEBHOOK_URL;
  });

  it('derives package and add-on names on the server, even for aliases and junk ids', async () => {
    const result = await saveLeadInternalAction({
      name: 'Max Mustermann',
      email: 'max@example.de',
      phone: '+49 170 1234567',
      message: 'Bitte um Angebot.',
      packageId: 'professional',
      addonIds: ['func-cms', 'totally-fake', 'basis-enterprise'],
      locale: 'de',
      source: 'Package & Add-ons Configurator',
    });

    expect(result.success).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(2);

    const [agencyCall, customerCall] = sendMock.mock.calls;
    expect(agencyCall[0].subject).toContain('Der Kundenmagnet');
    expect(agencyCall[0].subject).toMatch(/Score \d+\/10/);
    expect(agencyCall[0].html).toContain('Der Kundenmagnet');
    expect(agencyCall[0].html).toContain('Texte &amp; Bilder selbst ändern');
    expect(agencyCall[0].html).not.toContain('totally-fake');
    expect(agencyCall[0].html).toContain('~21 Werktage');

    expect(customerCall[0].to).toEqual(['max@example.de']);
    expect(customerCall[0].subject).toBe('Ihre Anfrage bei Coday: Der Kundenmagnet');
    expect(customerCall[0].html).not.toContain('€');

    expect(insertMock).toHaveBeenCalledTimes(1);
    const row = insertMock.mock.calls[0][0][0];
    expect(row.selected_package_id).toBe('business');
    expect(row.package_name).toBe('Der Kundenmagnet');
    expect(row.selected_module_ids).toEqual(['basis-business', 'func-cms']);
    expect(row.delivery_days).toBe(21);
    expect(typeof row.score).toBe('number');
  });

  it('sends an English confirmation for English visitors', async () => {
    await saveLeadInternalAction({
      name: 'Jane Doe',
      email: 'jane@example.com',
      packageId: 'starter',
      addonIds: ['seo-tech'],
      locale: 'en',
    });
    const customerCall = sendMock.mock.calls[1][0];
    expect(customerCall.subject).toBe('Your request at Coday: The Business Card');
    expect(customerCall.html).toContain('Get found on Google');
    expect(customerCall.html).toContain('https://codayweb.de/en/booking');
  });

  it('silently drops honeypot submissions without sending or storing anything', async () => {
    const result = await saveLeadInternalAction({
      name: 'Spam Bot',
      email: 'bot@example.com',
      _bot_trap_field: 'http://spam.example',
    });
    expect(result).toEqual({ success: true, status: 'honeypot_dropped' });
    expect(sendMock).not.toHaveBeenCalled();
    expect(insertMock).not.toHaveBeenCalled();
  });

  it('still succeeds when the database insert fails', async () => {
    insertMock.mockResolvedValue({ error: { message: 'relation "leads" does not exist' } });
    const result = await saveLeadInternalAction({
      name: 'Erika Musterfrau',
      email: 'erika@example.de',
      packageId: 'corporate',
    });
    expect(result.success).toBe(true);
    expect(result.status).toContain('failed');
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it('accepts payloads without a package from the other contact forms', async () => {
    const result = await saveLeadInternalAction({
      name: 'Newsletter Subscriber',
      email: 'sub@example.com',
      message: 'Source: Newsletter',
      source: 'newsletter',
    });
    expect(result.success).toBe(true);
    expect(sendMock.mock.calls[0][0].subject).toContain('Newsletter Subscriber');
  });

  it('maps direct contact form project types to friendly names', async () => {
    const result = await saveLeadInternalAction({
      name: 'Umut Tester',
      email: 'umut@codayweb.de',
      project: 'webdesign',
      message: 'Brauche ein Redesign.',
      locale: 'de',
      source: 'Direct Contact Form',
    });
    expect(result.success).toBe(true);
    const [agencyCall, customerCall] = sendMock.mock.calls;
    expect(agencyCall[0].subject).toContain('Webdesign & Corporate Website');
    expect(customerCall[0].subject).toBe('Ihre Anfrage bei Coday: Webdesign & Corporate Website');
  });

  it('rejects invalid payloads before touching Resend', async () => {
    const result = await saveLeadInternalAction({ name: 'X', email: 'not-an-email' });
    expect(result.success).toBe(false);
    expect(result.error).toContain('VALIDATION_ERROR');
    expect(sendMock).not.toHaveBeenCalled();
  });
});
