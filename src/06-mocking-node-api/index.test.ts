
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path', () => {
  const originalModule = jest.requireActual<typeof import('path')>('path');
  return {
    __esModule: true,
    ...originalModule,
    join: jest.fn(),
  };
});

jest.mock('fs', () => {
  const originalModule = jest.requireActual<typeof import('fs')>('fs');
  return {
    __esModule: true,
    ...originalModule,
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  const originalModule = jest.requireActual<typeof import('fs/promises')>('fs/promises');
  return {
    __esModule: true,
    ...originalModule,
    readFile: jest.fn(),
  };
});


const mockedJoin = join as jest.MockedFunction<typeof join>
const mockedExistsSync = existsSync as jest.MockedFunction<typeof existsSync>
const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 5)
    expect(setTimeout).toHaveBeenCalledWith(callback, 5)
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 5)
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 4)
    expect(setInterval).toHaveBeenCalledWith(callback, 4)
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1)
    jest.advanceTimersByTime(3);
    expect(callback).toHaveBeenCalledTimes(3)
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = 'README.md';
    await readFileAsynchronously(filePath)
    expect(join).toHaveBeenCalledWith(__dirname, filePath)
  });

  test('should return null if file does not exist', async () => {
    const filePath = 'index.ts';
    mockedJoin.mockReturnValue(__dirname + "/index.ts")
    mockedExistsSync.mockReturnValue(false)
    const res = await readFileAsynchronously(filePath)
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = 'index.ts';
    const fileContent = 'content'
    mockedJoin.mockReturnValue(__dirname + "/index.ts")
    mockedExistsSync.mockReturnValue(true)
    mockedReadFile.mockResolvedValue("content");
    const res = await readFileAsynchronously(filePath)
    expect(res).toBe(fileContent)
  });
});
