import { describe, it, expect } from 'vitest';
import { calculateLevel } from './levelCalculator';

describe('calculateLevel', () => {
  it('should return level 0 for 0 page views', () => {
    const result = calculateLevel(0);
    expect(result.level).toBe(0);
    expect(result.expPercent).toBe(0);
  });

  it('should return level 0 with 50% exp for 5 page views', () => {
    const result = calculateLevel(5);
    expect(result.level).toBe(0);
    expect(result.expPercent).toBe(50);
  });

  it('should return level 1 for 10 page views', () => {
    const result = calculateLevel(10);
    expect(result.level).toBe(1);
    expect(result.expPercent).toBe(0);
  });

  it('should return level 2 for 30 page views (10 + 20)', () => {
    const result = calculateLevel(30);
    expect(result.level).toBe(2);
    expect(result.expPercent).toBe(0);
  });

  it('should calculate correct exp percent for partial level', () => {
    const result = calculateLevel(25);
    expect(result.level).toBe(1);
    expect(result.expPercent).toBe(75);
  });
});
