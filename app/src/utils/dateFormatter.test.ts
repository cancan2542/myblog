import { describe, it, expect } from 'vitest';
import { formatDate } from './dateFormatter';

describe('formatDate', () => {
  it('should format ISO date string to YYYY.MM.DD format', () => {
    const result = formatDate('2024-01-15T00:00:00.000Z');
    expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
  });

  it('should handle date string without time', () => {
    const result = formatDate('2024-12-25');
    expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
  });
});
