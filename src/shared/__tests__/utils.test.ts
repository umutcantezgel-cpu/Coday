import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn (className merge utility)', () => {
    it('merges class names with clsx', () => {
        expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
        const isActive = true;
        expect(cn('base', isActive && 'active')).toBe('base active');
    });

    it('handles falsy values', () => {
        expect(cn('base', false && 'hidden', null, undefined, '')).toBe('base');
    });

    it('resolves Tailwind conflicts with twMerge', () => {
        expect(cn('px-4', 'px-8')).toBe('px-8');
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('handles array inputs', () => {
        expect(cn(['foo', 'bar'])).toBe('foo bar');
    });

    it('handles empty inputs', () => {
        expect(cn()).toBe('');
    });
});
