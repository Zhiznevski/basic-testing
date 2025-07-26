import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
];

describe('simpleCalculator', () => {
  it.each(testCases)('$a $action $b = $expected', ({ a, action, b, expected }) => {
    expect(simpleCalculator({ a, action, b })).toBe(expected)
  })
});
