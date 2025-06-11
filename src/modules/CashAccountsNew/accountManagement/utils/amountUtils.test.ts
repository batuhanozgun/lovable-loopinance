import { describe, it, expect } from 'vitest';
import { combineAmountParts } from './amountUtils';

describe('combineAmountParts', () => {
  it("combines '1' and '5' to 1.50", () => {
    expect(combineAmountParts('1', '5')).toBe(1.5);
  });

  it('returns 0 when both parts are empty', () => {
    expect(combineAmountParts('', '')).toBe(0);
  });

  it('ignores thousand separators', () => {
    expect(combineAmountParts('1.000', '50')).toBe(1000.5);
    expect(combineAmountParts('2,500', '00')).toBe(2500);
    expect(combineAmountParts('3 000', '75')).toBe(3000.75);
  });
});
