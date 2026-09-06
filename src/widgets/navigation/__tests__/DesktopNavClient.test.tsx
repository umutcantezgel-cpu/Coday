import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { DesktopNavClient, type DesktopNavItem } from '@/widgets/navigation/DesktopNavClient';

const grid = (labels: string[]) => (
  <div className="dropdown-links-grid">
    {labels.map((label) => (
      <a key={label} href={`/${label.toLowerCase()}`} className="link-label">
        {label}
      </a>
    ))}
  </div>
);

const items: DesktopNavItem[] = [
  {
    key: 'nav.services.label',
    label: 'Leistungen',
    bgColor: 'var(--color-primary-700)',
    textColor: 'var(--color-text-inverse)',
    sectionsLabel: 'Abschnitte in Leistungen',
    groups: [
      { title: 'Überblick', grid: grid(['Alle Leistungen']) },
      { title: 'Entwicklung', grid: grid(['Webentwicklung', 'Web Apps']) },
    ],
  },
  {
    key: 'nav.industries.label',
    label: 'Branchen',
    bgColor: 'var(--color-primary-800)',
    textColor: 'var(--color-text-inverse)',
    sectionsLabel: 'Abschnitte in Branchen',
    groups: [{ title: 'Branchen', grid: grid(['Automobil', 'Handwerk']) }],
  },
];

function getTrigger(name: string): HTMLElement {
  return screen.getByRole('button', { name });
}

describe('DesktopNavClient', () => {
  it('renders every server-provided link and marks all triggers collapsed', () => {
    render(<DesktopNavClient items={items} />);

    expect(getTrigger('Leistungen')).toHaveAttribute('aria-expanded', 'false');
    expect(getTrigger('Branchen')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('link', { name: 'Webentwicklung' })).toHaveAttribute(
      'href',
      '/webentwicklung'
    );
    expect(screen.getByRole('link', { name: 'Handwerk' })).toHaveAttribute('href', '/handwerk');
  });

  it('opens an item on click and closes it on Escape', () => {
    render(<DesktopNavClient items={items} />);
    const trigger = getTrigger('Leistungen');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.className).toContain('active');
    expect(getTrigger('Branchen')).toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.className).not.toContain('active');
  });

  it('toggles the same item closed on a second click', () => {
    render(<DesktopNavClient items={items} />);
    const trigger = getTrigger('Leistungen');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders sidebar buttons only for panels with more than one group', () => {
    const { container } = render(<DesktopNavClient items={items} />);

    const sidebars = container.querySelectorAll('.dropdown-sidebar');
    expect(sidebars).toHaveLength(1);
    expect(sidebars[0]).toHaveAttribute('aria-label', 'Abschnitte in Leistungen');

    const sidebarButtons = sidebars[0].querySelectorAll('.dropdown-sidebar-item');
    expect(sidebarButtons).toHaveLength(2);
    expect(sidebarButtons[0]).toHaveAttribute('aria-controls', 'dd-grp-nav-services-label-0');
    expect(sidebarButtons[0]).toHaveAttribute('aria-current', 'true');
    expect(sidebarButtons[1]).not.toHaveAttribute('aria-current');

    // The group shells the sidebar points at are in the DOM with stable ids.
    expect(container.querySelector('#dd-grp-nav-services-label-1')).toHaveAttribute(
      'aria-labelledby',
      'dd-grp-nav-services-label-1-title'
    );
    expect(container.querySelector('#dd-grp-nav-industries-label-0')).not.toBeNull();
  });

  it('moves the sidebar highlight when a sidebar button is clicked', () => {
    const { container } = render(<DesktopNavClient items={items} />);
    const sidebarButtons = container.querySelectorAll('.dropdown-sidebar-item');

    fireEvent.click(sidebarButtons[1]);
    expect(sidebarButtons[1]).toHaveAttribute('aria-current', 'true');
    expect(sidebarButtons[0]).not.toHaveAttribute('aria-current');
  });

  it('closes the open panel when one of its links is clicked', () => {
    render(<DesktopNavClient items={items} />);
    const trigger = getTrigger('Leistungen');

    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('link', { name: 'Web Apps' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
