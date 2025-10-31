import { describe, it, expect } from 'vitest';
import { classNames } from '../classNames';

describe('classNames', () => {
  it('should join string classes', () => {
    expect(classNames('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('should filter out falsy values', () => {
    expect(classNames('class1', false, 'class2', null, 'class3')).toBe('class1 class2 class3');
  });

  it('should filter out undefined values', () => {
    expect(classNames('class1', undefined, 'class2')).toBe('class1 class2');
  });

  it('should handle empty arguments', () => {
    expect(classNames()).toBe('');
  });

  it('should handle all falsy values', () => {
    expect(classNames(false, null, undefined)).toBe('');
  });

  it('should handle mixed truthy and falsy values', () => {
    const condition = true;
    expect(classNames('a', false, 'b', condition && 'c', undefined, 'd')).toBe('a b c d');
  });
});

