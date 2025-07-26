import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const inputValue = "testValue"
    await expect(resolveValue(inputValue)).resolves.toBe(inputValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = "errorMessage"
    expect(() => throwError(msg)).toThrow(msg)
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!')
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow('This is my awesome custom error!')
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const error = new MyAwesomeError();
    console.log(error.message)
    try {
      await rejectCustomError()

    } catch (err) {
      if (err instanceof MyAwesomeError) expect(err.message).toBe(error.message)
    }
  });
});
