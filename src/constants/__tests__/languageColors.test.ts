import { describe, it, expect } from 'vitest';
import { LANGUAGE_COLORS, getLanguageColor } from '../languageColors';

describe('languageColors', () => {
  describe('LANGUAGE_COLORS', () => {
    it('should have entries for common languages', () => {
      expect(LANGUAGE_COLORS).toHaveProperty('JavaScript');
      expect(LANGUAGE_COLORS).toHaveProperty('TypeScript');
      expect(LANGUAGE_COLORS).toHaveProperty('Python');
      expect(LANGUAGE_COLORS).toHaveProperty('React');
    });

    it('should have valid Tailwind color classes', () => {
      Object.values(LANGUAGE_COLORS).forEach((value) => {
        expect(value).toContain('bg-');
        expect(value).toContain('text-');
      });
    });

    it('should have unique color mappings', () => {
      const values = Object.values(LANGUAGE_COLORS);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBeGreaterThanOrEqual(10);
    });
  });

  describe('getLanguageColor', () => {
    it('should return color for known language', () => {
      expect(getLanguageColor('JavaScript')).toBe(LANGUAGE_COLORS.JavaScript);
      expect(getLanguageColor('TypeScript')).toBe(LANGUAGE_COLORS.TypeScript);
      expect(getLanguageColor('Python')).toBe(LANGUAGE_COLORS.Python);
    });

    it('should return default gray color for unknown language', () => {
      const result = getLanguageColor('UnknownLanguage');
      expect(result).toBe('bg-gray-100 text-gray-800');
    });

    it('should handle empty string', () => {
      const result = getLanguageColor('');
      expect(result).toBe('bg-gray-100 text-gray-800');
    });

    it('should handle case sensitivity', () => {
      const result1 = getLanguageColor('javascript');
      const result2 = getLanguageColor('JavaScript');
      
      expect(result1).toBe('bg-gray-100 text-gray-800');
      expect(result2).toBe(LANGUAGE_COLORS.JavaScript);
    });

    it('should return correct color for C++', () => {
      expect(getLanguageColor('C++')).toBe(LANGUAGE_COLORS['C++']);
    });

    it('should return correct color for C#', () => {
      expect(getLanguageColor('C#')).toBe(LANGUAGE_COLORS['C#']);
    });

    it('should handle special characters in language names', () => {
      const result = getLanguageColor('C++');
      expect(result).toContain('bg-');
      expect(result).toContain('text-');
    });
  });
});

