import { fromParams, toQueryParams } from './query-builder';
import { FlickrRequest } from '../model/flickr-request';

describe('toQueryParam', () => {
  it('should convert object to query params', () => {
    const testObj = {
      prop: 1,
      anotherProp: 'anotherProp',
    };
    const expectedResult = 'prop=1&anotherProp=anotherProp';

    const result = toQueryParams(testObj);
    expect(result).toBe(expectedResult);
  });

  it('should omit null values in object', () => {
    const testObj = {
      prop: 1,
      anotherProp: null,
    };
    const expectedResult = 'prop=1';

    const result = toQueryParams(testObj);
    expect(result).toBe(expectedResult);
  });

  it('should omit undefined values in object', () => {
    const testObj = {
      prop: 1,
      anotherProp: undefined,
    };
    const expectedResult = 'prop=1';

    const result = toQueryParams(testObj);
    expect(result).toBe(expectedResult);
  });
});

describe('fromParams', () => {
  it('should accept empty object', () => {
    const testObj: FlickrRequest = {};

    const result = fromParams(testObj);
    expect(result).toBeTruthy();
  });

  it('should return default values', () => {
    const testObj: FlickrRequest = {};

    const result = fromParams(testObj);

    expect(result).toBeTruthy();
    expect(result.per_page).toBe(20);
    expect(result.page).toBe(0);
    expect(result.format).toBe('json');
    expect(result.nojsoncallback).toBe(1);
  });

  it('should assign only passed values', () => {
    const testObj = { page: 1, per_page: 10 };

    const result = fromParams(testObj);
    expect(result).toBeTruthy();
    expect(result.per_page).toBe(10);
    expect(result.page).toBe(1);
    expect(result.format).toBe('json');
    expect(result.nojsoncallback).toBe(1);
  });
});
