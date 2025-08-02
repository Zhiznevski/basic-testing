
import { throttledGetDataFromApi } from '.';
import axios from 'axios';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => (...args: unknown[]) => fn(...args))
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const path = './todos/1'
    const axiosClient = { get: jest.fn }

    mockedAxios.create.mockReturnValue(axiosClient as never)

    await throttledGetDataFromApi(path)
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
  });

  test('should perform request to correct provided url', async () => {
    const path = './todos/1'
    const axiosClient = { get: jest.fn().mockResolvedValue({ data: "todo" }) }

    mockedAxios.create.mockReturnValue(axiosClient as never)
    await throttledGetDataFromApi(path)

    expect(axiosClient.get).toHaveBeenCalledWith(path)
  });

  test('should return response data', async () => {
    const path = './todos/1'
    const resData = "resTodo"
    const axiosClient = { get: jest.fn().mockResolvedValue({ data: resData }) }

    mockedAxios.create.mockReturnValue(axiosClient as never)
    await expect(throttledGetDataFromApi(path)).resolves.toBe(resData)
  });
});
