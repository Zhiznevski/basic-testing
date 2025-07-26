import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => { },
    mockTwo: () => { },
    mockThree: () => { },
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    mockOne()
    mockTwo()
    mockThree()
    expect(consoleSpy).toHaveBeenCalledTimes(0)
    expect(consoleSpy).not.toHaveBeenCalledWith('I am not mocked')
    consoleSpy.mockRestore()
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    unmockedFunction()
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked')
    consoleSpy.mockRestore()
  });
});
