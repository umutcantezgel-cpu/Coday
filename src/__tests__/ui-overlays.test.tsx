import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '@/components/ui/modal';
import { Popover } from '@/components/ui/popover';
import { Tooltip } from '@/components/ui/tooltip';
import React, { useState } from 'react';
import '@testing-library/jest-dom';

function TestApp() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div>
      <button data-testid="open-modal-1" onClick={() => setOpen1(true)}>
        Open Modal 1
      </button>
      <button data-testid="open-modal-2" onClick={() => setOpen2(true)}>
        Open Modal 2
      </button>

      <Modal isOpen={open1} onClose={() => setOpen1(false)}>
        <button data-testid="m1-btn">M1 Btn</button>
      </Modal>

      <Modal isOpen={open2} onClose={() => setOpen2(false)}>
        <button data-testid="m2-btn">M2 Btn</button>
      </Modal>

      <Tooltip content="Tooltip Content">
        <button data-testid="tooltip-trigger">Hover me</button>
      </Tooltip>

      <Popover
        trigger={<button data-testid="popover-trigger">Open Popover</button>}
        content={<button data-testid="popover-btn">Popover Btn</button>}
      />
    </div>
  );
}

describe('Overlay Components', () => {
  it('useScrollLock no longer causes layout shifts (padding duplication)', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000,
      configurable: true,
    });

    const { unmount } = render(<TestApp />);

    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px';

    fireEvent.click(screen.getByTestId('open-modal-1'));
    const pad1 = document.body.style.paddingRight;

    fireEvent.click(screen.getByTestId('open-modal-2'));
    const pad2 = document.body.style.paddingRight;

    // As long as pad1 equals pad2 and pad1 is not '0px'
    expect(pad1).not.toBe('0px');
    expect(pad1).toBe(pad2); // Should not duplicate padding

    unmount();
  });

  it('useFocusTrap correctly restores focus to the trigger', async () => {
    const { unmount } = render(<TestApp />);
    const trigger = screen.getByTestId('open-modal-1');
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);

    // Modal opens, focus should move to first element inside modal (close button)
    await waitFor(() => {
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    // Wait for the trap's setTimeout
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.activeElement).toBe(screen.getByLabelText('Close modal'));

    // Close modal
    fireEvent.click(screen.getByLabelText('Close modal'));

    // Focus restored to trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });

    unmount();
  });

  it('Tooltip aria-describedby exists', async () => {
    const { unmount } = render(<TestApp />);
    const trigger = screen.getByTestId('tooltip-trigger');
    const wrapper = trigger.parentElement; // The tooltip wrapper div

    // Initially no aria-describedby
    expect(wrapper).not.toHaveAttribute('aria-describedby');

    fireEvent.mouseEnter(wrapper!);

    // After tooltip open delay
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    expect(wrapper).toHaveAttribute('aria-describedby');
    const describedBy = wrapper!.getAttribute('aria-describedby');
    expect(describedBy).not.toBeNull();
    expect(screen.getByRole('tooltip').id).toBe(describedBy);

    unmount();
  });

  it('Popover focus trap works', async () => {
    const { unmount } = render(<TestApp />);
    const trigger = screen.getByTestId('popover-trigger');
    trigger.focus();

    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Wait for the trap's setTimeout
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.activeElement).toBe(screen.getByTestId('popover-btn'));

    // Close popover
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });

    unmount();
  });
});
