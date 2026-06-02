import { render, screen } from '@testing-library/react';
import { Tabs } from '../tabs';
import React from 'react';
import { expect, test } from 'vitest';

test('tabs render with id', () => {
  render(<Tabs id="test-tabs" tabs={[{ id: 't1', label: 'Tab 1', content: 'Content 1' }]} />);
  expect(screen.getByText('Tab 1')).toBeTruthy();
});
