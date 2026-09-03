import { describe, it, expect } from 'vitest';
import { leadSubmissionSchema } from '@/features/contact/schema/leadSubmission';
import { calculatePackageLeadScore, HOT_LEAD_THRESHOLD } from '@/features/contact/schema/leadScore';

describe('leadSubmissionSchema', () => {
  it('accepts a minimal payload without a package (newsletter, quick contact)', () => {
    const result = leadSubmissionSchema.safeParse({
      name: 'Newsletter Subscriber',
      email: 'sub@example.com',
      message: 'Source: Newsletter',
      phone: '',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.locale).toBe('de');
      expect(result.data.packageId).toBeNull();
      expect(result.data.addonIds).toEqual([]);
      expect(result.data.phone).toBeUndefined();
    }
  });

  it('normalises package aliases and drops unknown packages and add-ons', () => {
    const result = leadSubmissionSchema.parse({
      name: 'Max Mustermann',
      email: 'max@example.de',
      packageId: 'professional',
      addonIds: ['func-cms', 'func-cms', 'not-a-module', 'basis-starter', 'seo-tech'],
      locale: 'en',
    });
    expect(result.packageId).toBe('business');
    expect(result.addonIds).toEqual(['func-cms', 'seo-tech']);
    expect(result.locale).toBe('en');

    const unknown = leadSubmissionSchema.parse({
      name: 'Max',
      email: 'max@example.de',
      packageId: 'gold-plus',
    });
    expect(unknown.packageId).toBeNull();
  });

  it('keeps the honeypot value so the action can drop bots', () => {
    const result = leadSubmissionSchema.parse({
      name: 'Bot',
      email: 'bot@example.com',
      _bot_trap_field: 'http://spam',
    });
    expect(result._bot_trap_field).toBe('http://spam');
  });

  it('rejects invalid names, e-mails and oversized messages', () => {
    expect(leadSubmissionSchema.safeParse({ name: 'A', email: 'a@b.de' }).success).toBe(false);
    expect(leadSubmissionSchema.safeParse({ name: 'Anna', email: 'nope' }).success).toBe(false);
    expect(
      leadSubmissionSchema.safeParse({ name: 'Anna', email: 'a@b.de', message: 'x'.repeat(4001) })
        .success
    ).toBe(false);
  });
});

describe('calculatePackageLeadScore', () => {
  it('scores an empty lead with 0', () => {
    expect(calculatePackageLeadScore({ packageId: null, addonIds: [] })).toBe(0);
  });

  it('adds tier, capped add-ons, phone, message length and region hints, capped at 10', () => {
    expect(calculatePackageLeadScore({ packageId: 'business', addonIds: ['func-cms'] })).toBe(3);
    expect(
      calculatePackageLeadScore({
        packageId: 'enterprise',
        addonIds: ['a', 'b', 'c', 'd', 'e'],
        phone: '+49 176 1234567',
        message: `${'Wir suchen eine neue Website für unseren Standort in Wetzlar. '.repeat(3)}`,
      })
    ).toBe(10);
  });

  it('marks corporate leads with phone and a real message as hot', () => {
    const score = calculatePackageLeadScore({
      packageId: 'corporate',
      addonIds: ['func-cms', 'design-ui'],
      phone: '06441 123456',
      message:
        'Wir planen einen Relaunch mit rund zwanzig Seiten und brauchen ein Bewerbungsformular für Azubis sowie eine englische Version.',
    });
    expect(score).toBeGreaterThanOrEqual(HOT_LEAD_THRESHOLD);
  });
});
