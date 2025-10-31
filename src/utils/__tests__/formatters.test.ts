import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatNumber,
  calculateLanguagePercentages,
  truncateText,
} from '../formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('should format a date string correctly', () => {
      const dateString = '2024-01-15T10:30:00Z';
      const formatted = formatDate(dateString);
      expect(formatted).toMatch(/\w{3} \d{1,2}, \d{4}/); // e.g., "Jan 15, 2024"
    });

    it('should handle different date formats', () => {
      const dateString = '2023-12-25';
      const formatted = formatDate(dateString);
      expect(formatted).toBeTruthy();
      expect(formatted).toContain('2023');
    });
  });

  describe('formatNumber', () => {
    it('should return the original number for values less than 1000', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(100)).toBe('100');
      expect(formatNumber(999)).toBe('999');
    });

    it('should format numbers greater than or equal to 1000 with "k" suffix', () => {
      expect(formatNumber(1000)).toBe('1.0k');
      expect(formatNumber(1500)).toBe('1.5k');
      expect(formatNumber(10000)).toBe('10.0k');
      expect(formatNumber(12345)).toBe('12.3k');
    });

    it('should handle edge cases', () => {
      expect(formatNumber(999.9)).toBe('999.9');
      expect(formatNumber(100000)).toBe('100.0k');
    });
  });

  describe('calculateLanguagePercentages', () => {
    it('should calculate percentages correctly', () => {
      const languages = {
        JavaScript: 100000,
        TypeScript: 50000,
        Python: 25000,
      };

      const result = calculateLanguagePercentages(languages);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('JavaScript');
      expect(result[0].bytes).toBe(100000);
      expect(result[0].percentage).toBeCloseTo(57.14, 2);
    });

    it('should sort languages by bytes descending', () => {
      const languages = {
        Python: 1000,
        JavaScript: 5000,
        TypeScript: 2000,
      };

      const result = calculateLanguagePercentages(languages);

      expect(result[0].name).toBe('JavaScript');
      expect(result[1].name).toBe('TypeScript');
      expect(result[2].name).toBe('Python');
    });

    it('should handle empty object', () => {
      const result = calculateLanguagePercentages({});
      expect(result).toHaveLength(0);
    });

    it('should handle single language', () => {
      const languages = { JavaScript: 1000 };
      const result = calculateLanguagePercentages(languages);

      expect(result).toHaveLength(1);
      expect(result[0].percentage).toBe(100);
    });

    it('should handle languages with zero bytes', () => {
      const languages = {
        JavaScript: 1000,
        TypeScript: 0,
      };

      const result = calculateLanguagePercentages(languages);

      expect(result[0].percentage).toBe(100);
      expect(result[1].percentage).toBe(0);
    });
  });

  describe('truncateText', () => {
    it('should return original text if within max length', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
      expect(truncateText('', 5)).toBe('');
    });

    it('should truncate text and add ellipsis when exceeding max length', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
      expect(truncateText('This is a long text', 10)).toBe('This is a ...');
    });

    it('should handle edge case where maxLength is 0', () => {
      expect(truncateText('Hello', 0)).toBe('...');
    });
  });
});

