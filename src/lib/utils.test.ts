import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges multiple class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('ignores falsy values', () => {
    expect(cn('a', { b: false, c: true })).toBe('a c');
  });

  it('handles tailwind overrides', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
