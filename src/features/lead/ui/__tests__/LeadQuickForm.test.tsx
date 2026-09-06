import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const saveMock = vi.fn();
const trackMock = vi.fn();

vi.mock('@/features/contact/actions/saveLeadInternal', () => ({
  saveLeadInternalAction: (...args: unknown[]) => saveMock(...args),
}));
vi.mock('@/shared/lib/analytics/tracking', () => ({
  trackEvent: (...args: unknown[]) => trackMock(...args),
}));

import { LeadQuickForm } from '@/features/lead/ui/LeadQuickForm';

describe('LeadQuickForm', () => {
  beforeEach(() => {
    saveMock.mockReset();
    trackMock.mockReset();
    saveMock.mockResolvedValue({ success: true, status: 'both_sent:stored' });
  });

  it('blocks submission without a name or a contact detail', async () => {
    render(<LeadQuickForm variant="card" formKind="local" source="test_hero" cityName="Gießen" />);
    fireEvent.click(screen.getByRole('button', { name: /form\.submit/ }));
    await waitFor(() => expect(screen.getByText('form.errors.name')).toBeInTheDocument());
    expect(screen.getByText('form.errors.contact')).toBeInTheDocument();
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('sends a phone-only request with city and tracking events', async () => {
    render(
      <LeadQuickForm variant="inline" formKind="local" source="test_bottom" cityName="Gießen" />
    );
    fireEvent.change(screen.getByPlaceholderText('form.name_placeholder'), {
      target: { value: 'Max Mustermann' },
    });
    fireEvent.change(screen.getByPlaceholderText('form.contact_placeholder'), {
      target: { value: '0170 1234567' },
    });
    fireEvent.click(screen.getByRole('button', { name: /form\.submit/ }));

    await waitFor(() => expect(saveMock).toHaveBeenCalledTimes(1));
    const payload = saveMock.mock.calls[0][0];
    expect(payload).toMatchObject({
      name: 'Max Mustermann',
      phone: '0170 1234567',
      cityName: 'Gießen',
      formKind: 'local',
      source: 'test_bottom',
      locale: 'de',
    });
    expect(payload.email).toBeUndefined();

    await waitFor(() => expect(screen.getByText('form.success.text')).toBeInTheDocument());
    const events = trackMock.mock.calls.map((c) => c[0]);
    expect(events).toContain('form_start');
    expect(events).toContain('form_submit');
    expect(events).toContain('form_success');
  });

  it('drops honeypot submissions silently', async () => {
    const { container } = render(
      <LeadQuickForm variant="card" formKind="quick" source="test_hp" />
    );
    const trap = container.querySelector('input[name="_bot_trap_field"]') as HTMLInputElement;
    fireEvent.change(trap, { target: { value: 'http://spam' } });
    fireEvent.click(screen.getByRole('button', { name: /form\.submit/ }));
    await waitFor(() => expect(screen.getByText('form.success.text')).toBeInTheDocument());
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('shows an error and keeps the values when the action fails', async () => {
    saveMock.mockResolvedValue({ success: false, error: 'DELIVERY_ERROR' });
    render(<LeadQuickForm variant="card" formKind="quick" source="test_err" />);
    fireEvent.change(screen.getByPlaceholderText('form.name_placeholder'), {
      target: { value: 'Anna' },
    });
    fireEvent.change(screen.getByPlaceholderText('form.contact_placeholder'), {
      target: { value: 'anna@example.de' },
    });
    fireEvent.click(screen.getByRole('button', { name: /form\.submit/ }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('form.errors.generic'));
    expect((screen.getByPlaceholderText('form.name_placeholder') as HTMLInputElement).value).toBe(
      'Anna'
    );
    expect(trackMock.mock.calls.map((c) => c[0])).toContain('form_error');
  });
});
