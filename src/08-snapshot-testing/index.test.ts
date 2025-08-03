import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = { value: 1, next: { value: 2, next: { value: null, next: null } } }
    expect(generateLinkedList([1, 2])).toStrictEqual(list)
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(list).toMatchSnapshot();
  });
});
