// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, action: Action.Add, b: 5 })).toBe(8)
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, action: Action.Subtract, b: 6 })).toBe(4)
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, action: Action.Multiply, b: 8 })).toBe(32)
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 27, action: Action.Divide, b: 3 })).toBe(9)
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, action: Action.Exponentiate, b: 2 })).toBe(9)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 4, action: "#", b: 3 })).toBeNull()
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: "invalid", action: Action.Divide, b: false })).toBeNull()
  });
});
