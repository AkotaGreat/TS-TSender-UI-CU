import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
  it('should calculate total from newline-separated values', () => {
    const input = "100\n100\n200";
    expect(calculateTotal(input)).toBe(400);
  });

  it('should calculate total from comma-separated values', () => {
    const input = "100,100,200";
    expect(calculateTotal(input)).toBe(400);
  });

  it('should calculate total from mixed separators', () => {
    const input = "100\n100,200";
    expect(calculateTotal(input)).toBe(400);
  });

  it('should handle values with spaces', () => {
    const input = "100, 100, 200";
    expect(calculateTotal(input)).toBe(400);
  });

  it('should ignore empty lines', () => {
    const input = "100\n\n200";
    expect(calculateTotal(input)).toBe(300);
  });

  it('should handle empty input', () => {
    expect(calculateTotal("")).toBe(0);
    expect(calculateTotal("   ")).toBe(0);
  });

  it('should ignore invalid values', () => {
    const input = "100\nabc\n200";
    expect(calculateTotal(input)).toBe(300);
  });

  it('should handle decimal numbers', () => {
    const input = "100.5\n200.5\n300";
    expect(calculateTotal(input)).toBe(601);
  });

  it('should handle single value', () => {
    expect(calculateTotal("500")).toBe(500);
  });

  it('should handle trailing commas and newlines', () => {
    const input = "100,200,\n";
    expect(calculateTotal(input)).toBe(300);
  });

  it('should handle multiple consecutive separators', () => {
    const input = "100,,\n\n200";
    expect(calculateTotal(input)).toBe(300);
  });

  it('should handle negative numbers', () => {
    const input = "-100\n200\n300";
    expect(calculateTotal(input)).toBe(400);
  });
});