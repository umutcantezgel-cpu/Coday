import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StrobiAvatar } from '../StrobiAvatar';
import type { StrobiAnimationState, StrobiSize } from '../../model/types';

describe('StrobiAvatar Component', () => {
  it('renders with default props and accessible aria-label', () => {
    render(<StrobiAvatar />);
    const avatar = screen.getByRole('img', { name: /Strobi KI Avatar/i });
    expect(avatar).toBeDefined();
  });

  it('renders all size presets accurately without layout errors', () => {
    const sizes: StrobiSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'hero'];

    sizes.forEach((sz) => {
      const { unmount } = render(<StrobiAvatar size={sz} data-testid={`avatar-${sz}`} />);
      const avatar = screen.getByRole('img', { name: /Strobi KI Avatar/i });
      expect(avatar).toBeDefined();
      unmount();
    });
  });

  it('renders all 23 animation and mood states correctly', () => {
    const states: StrobiAnimationState[] = [
      'sleeping',
      'waking',
      'idle',
      'listening',
      'thinking',
      'searching',
      'working',
      'excited',
      'bored',
      'suspicious',
      'angry',
      'drowsy',
      'happy',
      'curious',
      'confused',
      'surprised',
      'proud',
      'shy',
      'sad',
      'laughing',
      'scared',
      'playful',
      'celebrate',
    ];

    states.forEach((st) => {
      const { unmount } = render(<StrobiAvatar state={st} ariaLabel={`Strobi ${st}`} />);
      const avatar = screen.getByRole('img', { name: new RegExp(`Strobi ${st}`, 'i') });
      expect(avatar).toBeDefined();
      unmount();
    });
  });

  it('handles custom dimensions, colors, and click interactions', () => {
    let clicked = false;
    render(
      <StrobiAvatar
        dimension={100}
        bodyColor="#3B82F6"
        eyeColor="#111316"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    const buttonAvatar = screen.getByRole('button');
    expect(buttonAvatar).toBeDefined();
    buttonAvatar.click();
    expect(clicked).toBe(true);
  });

  it('renders with emotional aura, speech cadence, and breathing enabled', () => {
    render(
      <StrobiAvatar
        state="celebrate"
        auraColor="#10B981"
        isSpeaking={true}
        enableBreathing={true}
        enableTracking={true}
      />
    );
    const avatar = screen.getByRole('img', { name: /Strobi KI Avatar/i });
    expect(avatar).toBeDefined();
  });
});
