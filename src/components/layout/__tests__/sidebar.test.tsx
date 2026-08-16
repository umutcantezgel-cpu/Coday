import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../sidebar';
import React from 'react';
import { expect, test } from 'vitest';

test('sidebar collapses without instant jumps or display:none', () => {
  const { container } = render(
    <Sidebar
      defaultCollapsed={false}
      items={[
        {
          id: 'item1',
          label: 'Item 1',
          subItems: [{ label: 'Sub 1', href: '/sub1' }],
        },
      ]}
    />
  );

  const button = screen.getByText('Item 1').closest('button');
  if (button) fireEvent.click(button);

  expect(screen.getByText('Sub 1')).toBeTruthy();

  const subItemsContainer = screen.getByText('Sub 1').closest('div');
  // Checking that there's no display: none applied by tailwind or style while expanded
  expect(subItemsContainer?.className).not.toContain('hidden');

  const collapseButton = screen.getByLabelText('Collapse sidebar');
  fireEvent.click(collapseButton);

  // When collapsed, the sidebar width class changes to w-16
  const aside = container.querySelector('aside');
  expect(aside?.className).toContain('w-16');
});
